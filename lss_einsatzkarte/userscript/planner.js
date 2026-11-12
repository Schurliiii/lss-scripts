/*
 * LSS Wachenplaner Österreich: alle amtlichen Feuerwehr-, Rettungs- und Polizeistandorte
 * sowie Akutspitäler Österreichs direkt in Leitstellenspiel.de – abgeglichen mit den eigenen
 * Gebäuden, fehlende Wachen per Bau-Dialog. Eigenständig; läuft auch neben „LSS Verwaltung“.
 *
 * Auf normalen Spielseiten entsteht nur das Symbol in der Navigationsleiste. Karte, Daten
 * (eingebettet als JSON-Text) und Stylesheets werden erst beim ersten Öffnen ausgewertet.
 */

const kit = createKit({
  prefix: "lsswp",
  styles: LSS_STYLES,
  leafletCss: "lsswpLeafletCss",
  requests: { concurrency: 2, gap: 250 },
  onEscape: () => {
    if (!state.open) return false;
    close();
    return true;
  },
  onNativeBuild: () => close(),
});
const { escapeHtml: esc, formatNumber, formatDistance, plural, icon, collator } = kit;

const CLASS_META = {
  "fire-professional": { label: "Berufsfeuerwehr", hint: "Haupt-, Zug- und Gruppenwachen", short: "BF", color: "#d70015", kind: "fire", game: "Feuerwache · größerer Fuhrpark", prefix: "BF" },
  "fire-volunteer": { label: "Freiwillige Feuerwehr", hint: "Orts- und Gemeindefeuerwehren", short: "FF", color: "#ff6a00", kind: "fire", game: "Feuerwache · regionaler Fuhrpark", prefix: "FF" },
  "fire-other": { label: "Betriebsfeuerwehr & weitere", hint: "BTF, Kommandos und Verbände", short: "F", color: "#a2384a", kind: "fire", game: "Feuerwache" },
  "rescue-redcross": { label: "Rotes Kreuz", hint: "ÖRK-Dienststellen", short: "✚", color: "#ff3b30", kind: "rescue", game: "Rettungswache", prefix: "RK" },
  "rescue-johanniter": { label: "Johanniter", hint: "Rettungs- und Einsatzstellen", short: "J", color: "#e0a100", kind: "rescue", game: "Rettungswache", prefix: "JUH" },
  "rescue-samariter": { label: "Samariterbund", hint: "ASBÖ", short: "S", color: "#0a6cdf", kind: "rescue", game: "Rettungswache", prefix: "ASB" },
  "rescue-other": { label: "Weitere Rettung", hint: "Wiener Rettung, Malteser u. a.", short: "R", color: "#636366", kind: "rescue", game: "Rettungswache" },
  hospital: { label: "Krankenhäuser", hint: "Öffentliche Akutspitäler und Unfallkrankenhäuser", short: "H", color: "#0a84ff", kind: "hospital", game: "Krankenhaus" },
  police: { label: "Polizeiinspektionen", hint: "Bundespolizei, Stand BMI", short: "P", color: "#1c3f94", kind: "police", game: "Polizeiwache" },
  "police-special": { label: "Autobahn-, Verkehrs- & Grenzpolizei", hint: "API, VI und GPI", short: "A", color: "#4b6cb7", kind: "police", game: "Polizeiwache" },
};
const CLASS_KEYS = Object.keys(CLASS_META);
// LSS-Gebäudetypen, die einen echten Standort abdecken (Komplexe zählen für Feuer und Rettung).
const COMPLEX_TYPES = [22, 23];
const COVERING = Object.fromEntries(Object.entries(kit.KINDS).map(([kind, meta]) => [kind, new Set([...meta.types, ...(kind === "fire" || kind === "rescue" ? COMPLEX_TYPES : [])])]));
const AUSTRIA = [[46.37, 9.53], [49.02, 17.16]];
const PAGE_SIZE = 80;
const BUILDINGS_FRESH = 5 * 60 * 1000;
const isPhone = () => window.matchMedia("(max-width: 760px)").matches;

const settings = kit.store("lsswp-settings-v1", { status: "all", radius: 300, effects: "auto", theme: "auto" });
if (!["auto", "dark", "light"].includes(settings.values.theme)) settings.values.theme = "auto";
if (!["auto", "full", "reduced"].includes(settings.values.effects)) settings.values.effects = "auto";
kit.setAppearance({ theme: settings.values.theme, effects: settings.values.effects });

// Neu hinzugekommene Klassen (z. B. Krankenhäuser) sind auch bei gespeicherten Einstellungen sichtbar.
function initialEnabled() {
  const stored = settings.values.enabled;
  if (!Array.isArray(stored)) return new Set(CLASS_KEYS);
  const known = Array.isArray(settings.values.known) ? settings.values.known : CLASS_KEYS.filter((key) => !["hospital", "police", "police-special"].includes(key));
  return new Set([...stored.filter((key) => CLASS_META[key]), ...CLASS_KEYS.filter((key) => !known.includes(key))]);
}

const state = {
  open: false,
  loading: false,
  enabled: initialEnabled(),
  status: ["missing", "built"].includes(settings.values.status) ? settings.values.status : "all",
  radius: Number(settings.values.radius) || 300,
  buildings: [],
  rawBuildings: [],
  syncedAt: 0,
  missingLimit: PAGE_SIZE,
};

const records = [];
const recordsByKey = new Map();
let regionRecords = [];
let activeRecords = [];
let root = null;
let map = null;
let clusters = null;
let dataVersion = "";
let closeTimer = 0;
let settleTimer = 0;
let viewportFrame = 0;
let radiusTimer = 0;

const saveSettings = () => settings.set({ enabled: [...state.enabled], known: CLASS_KEYS, status: state.status, radius: state.radius });
const ref = (name) => root.querySelector(`[data-ref="${name}"]`);

/* ---------- Öffnen und Schließen ---------- */

function open() {
  clearTimeout(closeTimer);
  if (!root && !create()) return;
  if (!state.open) {
    state.open = true;
    kit.activate();
  }
  root.hidden = false;
  root.classList.remove("is-closing");
  document.documentElement.classList.add("lsswp-open");
  requestAnimationFrame(() => map.invalidateSize({ pan: false }));
  if (!state.loading && Date.now() - state.syncedAt > 60000) void sync(false);
}

function close() {
  if (!state.open) return;
  state.open = false;
  kit.deactivate();
  map?.closePopup();
  root.classList.add("is-closing");
  document.documentElement.classList.remove("lsswp-open");
  closeTimer = setTimeout(() => {
    if (state.open) return;
    root.hidden = true;
    root.classList.remove("is-closing");
  }, 220);
}

function create() {
  const L = kit.Leaflet();
  if (!L?.markerClusterGroup) {
    kit.toast("Der Wachenplaner konnte nicht geladen werden (Kartenbibliothek fehlt). Bitte die Seite neu laden.");
    return false;
  }
  root = kit.createRoot("lsswp", "lsswp-app");
  root.hidden = true;
  root.innerHTML = template();

  map = L.map(root.querySelector(".lsswp-map"), { zoomControl: false, minZoom: isPhone() ? 5 : 7, maxBounds: [[45.3, 8.1], [50.2, 18.5]], maxBoundsViscosity: 0.7 });
  // Ganzzahlige Zoomstufen halten die Kacheln unskaliert; der Puffer lädt Nachbarkacheln vor.
  kit.tileLayer({ keepBuffer: 4, attribution: 'Kartenbasis &copy; Esri · Standorte: <a href="https://www.bev.gv.at/" target="_blank" rel="noopener">BEV</a> (CC BY 4.0), BMI, BMASGPK, teils &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OSM</a>' }).addTo(map);
  clusters = L.markerClusterGroup({ showCoverageOnHover: false, maxClusterRadius: 48, spiderfyOnMaxZoom: true, disableClusteringAtZoom: 15, chunkedLoading: true, removeOutsideVisibleBounds: true, iconCreateFunction: clusterIcon });
  map.addLayer(clusters);

  const data = LSS_PLANNER_DATA();
  dataVersion = data.version;
  for (const row of data.stations) addStation(row, data);
  // Einmal in Anzeigereihenfolge sortieren: Gebiet, Bezirk, Organisation, Name.
  records.sort((a, b) => collator.compare(a.stateName, b.stateName) || collator.compare(a.districtName, b.districtName) || CLASS_KEYS.indexOf(a.className) - CLASS_KEYS.indexOf(b.className) || collator.compare(a.name, b.name));

  ref("orgs").innerHTML = CLASS_KEYS.map((key) => {
    const meta = CLASS_META[key];
    return `<label class="lsswp-org"><span class="lsswp-glyph" style="--c:${meta.color}">${meta.short}</span><span><strong>${esc(meta.label)}</strong><small>${esc(meta.hint)}</small></span><output data-count="${key}">0</output><input class="lsswp-switch" type="checkbox" data-change="org" value="${key}"${state.enabled.has(key) ? " checked" : ""} aria-label="${esc(meta.label)}"></label>`;
  }).join("");
  const states = [...new Set(records.map((record) => record.stateName))].sort(collator.compare);
  ref("state").insertAdjacentHTML("beforeend", states.map((name) => `<option value="${esc(name)}">${esc(name)}</option>`).join(""));
  ref("radius").value = state.radius;
  ref("radiusLabel").textContent = formatDistance(state.radius);
  updateSelectAllLabel();
  bindMap();
  ref("searchForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const query = ref("search").value.trim();
    ref("search").blur();
    if (query) void searchPlace(query);
  });
  ref("search").addEventListener("focus", () => isPhone() && ref("sheet").classList.add("is-expanded"));
  showAustria(false);
  updateStatusAvailability();
  refreshMarkers();
  renderSync();
  setLoadState(`${formatNumber(records.length)} amtliche Standorte · ${dataVersion}`);
  return true;
}

function template() {
  const segmented = (refName, action, items) => `<div class="lsswp-segmented" data-ref="${refName}" style="--count:${items.length};--index:0"><span class="lsswp-thumb" aria-hidden="true"></span>${items.map(([value, label], index) => `<button type="button" data-action="${action}" data-value="${value}" data-index="${index}"${index ? "" : ' class="is-active"'}>${label}</button>`).join("")}</div>`;
  const select = (change, options, value) => kit.selectHtml(`data-change="${change}"`, options, value);
  return `
    <div class="lsswp-map" aria-label="Karte der Einsatzstandorte"></div>
    <aside class="lsswp-sheet lsswp-glass" data-ref="sheet" aria-label="Wachenplaner">
      <button class="lsswp-handle" type="button" data-action="toggle-sheet" aria-label="Bereich ein- oder ausklappen"><span></span></button>
      <header class="lsswp-head">
        <span class="lsswp-app-icon" aria-hidden="true"><i></i><i></i><i></i></span>
        <div><h1>Wachenplaner</h1><p>Einsatzstandorte · Österreich</p></div>
        <button class="lsswp-icon-btn" type="button" data-action="close" aria-label="Wachenplaner schließen" title="Schließen (Esc)">${icon("close")}</button>
      </header>
      <form class="lsswp-search lsswp-place" data-ref="searchForm" role="search">${icon("search")}<input data-ref="search" type="search" placeholder="Ort oder Adresse suchen" autocomplete="off" enterkeyhint="search" aria-label="Ort oder Adresse suchen"></form>
      ${segmented("views", "view", [["filters", "Filter"], ["missing", 'Noch nicht gebaut <b data-ref="missingBadge" hidden>0</b>']])}
      <div class="lsswp-scroll">
        <section class="lsswp-view is-active" data-panel="filters">
          <div class="lsswp-card lsswp-sync">
            <div class="lsswp-sync-head"><span class="lsswp-sync-dot" data-ref="syncDot"></span><div><strong data-ref="syncTitle">Gebäude werden geladen …</strong><small data-ref="syncHint"></small></div></div>
            <button class="lsswp-btn is-primary is-wide" type="button" data-action="sync" data-ref="syncButton">Mit meinen Gebäuden abgleichen</button>
            <label class="lsswp-range"><span>Als gebaut gilt eine Wache im Umkreis von <b data-ref="radiusLabel">300 m</b></span><input data-ref="radius" data-input="radius" type="range" min="100" max="1500" step="50" value="300" aria-label="Umkreis"></label>
          </div>
          <div class="lsswp-group">Status</div>
          ${segmented("status", "status", [["all", "Alle"], ["missing", "Fehlt"], ["built", "Gebaut"]])}
          <div class="lsswp-group">Gebiet <button class="lsswp-link" type="button" data-action="clear-area">Zurücksetzen</button></div>
          <div class="lsswp-card lsswp-list">
            <label class="lsswp-row"><span>Bundesland</span><select data-ref="state" data-change="state"><option value="">Alle</option></select></label>
            <label class="lsswp-row"><span>Bezirk</span><select data-ref="district" data-change="district" disabled><option value="">Alle</option></select></label>
          </div>
          <div class="lsswp-group">Organisationen <button class="lsswp-link" type="button" data-action="select-all" data-ref="selectAll">Alle aus</button></div>
          <div class="lsswp-card lsswp-list" data-ref="orgs"></div>
          <div class="lsswp-group">Darstellung</div>
          <div class="lsswp-card lsswp-list">
            <label class="lsswp-row"><span>Design</span>${select("theme", [{ value: "auto", label: "LSS-Design" }, { value: "dark", label: "Dunkel" }, { value: "light", label: "Hell" }], settings.values.theme)}</label>
            <label class="lsswp-row"><span>Effekte</span>${select("effects", [{ value: "auto", label: "Automatisch" }, { value: "full", label: "Voll" }, { value: "reduced", label: "Sparsam" }], settings.values.effects)}</label>
          </div>
          <p class="lsswp-footnote">„Sparsam“ schaltet Glas-Unschärfe und Animationen ab und entlastet schwächere Rechner. „Automatisch“ wählt das selbst.</p>
        </section>
        <section class="lsswp-view" data-panel="missing">
          <div class="lsswp-missing-head"><strong data-ref="missingTitle">Noch nicht abgeglichen</strong><small data-ref="missingHint"></small></div>
          <div class="lsswp-coverage" data-ref="coverage" hidden><div class="lsswp-bar"><span data-ref="coverageBar"></span></div><small data-ref="coverageText"></small></div>
          <ul class="lsswp-missing" data-ref="missingList"></ul>
          <button class="lsswp-btn is-wide" type="button" data-action="more" data-ref="more" hidden>Mehr anzeigen</button>
        </section>
      </div>
      <footer class="lsswp-foot"><span class="lsswp-dot" data-ref="loadDot"></span><span data-ref="loadState">Karte wird vorbereitet …</span></footer>
    </aside>
    <div class="lsswp-controls">
      <button class="lsswp-icon-btn lsswp-glass" type="button" data-action="zoom-in" aria-label="Hineinzoomen">${icon("plus")}</button>
      <button class="lsswp-icon-btn lsswp-glass" type="button" data-action="zoom-out" aria-label="Herauszoomen">${icon("minus")}</button>
      <button class="lsswp-icon-btn lsswp-glass" type="button" data-action="home" aria-label="Ganz Österreich anzeigen">${icon("home")}</button>
    </div>
    <label class="lsswp-map-switch lsswp-glass" data-ref="hideBuiltControl" hidden><span>Nur fehlende</span><input class="lsswp-switch" data-ref="hideBuilt" data-change="hide-built" type="checkbox" aria-label="Gebaute Wachen ausblenden"></label>
    <div class="lsswp-pill-count lsswp-glass" aria-live="polite"><span><strong data-ref="visibleCount">0</strong> sichtbar</span><span class="lsswp-pill-missing" data-ref="pillMissing" hidden><i></i><strong data-ref="visibleMissing">0</strong> fehlen</span></div>`;
}

function setLoadState(message, type = "ready") {
  ref("loadDot").className = `lsswp-dot is-${type}`;
  ref("loadState").textContent = message;
}

function selectSegment(container, value) {
  const buttons = [...container.querySelectorAll("button")];
  const index = Math.max(0, buttons.findIndex((button) => button.dataset.value === value));
  buttons.forEach((button, buttonIndex) => button.classList.toggle("is-active", buttonIndex === index));
  container.style.setProperty("--index", index);
}

function mapPadding() {
  if (isPhone()) return { paddingTopLeft: [12, 64], paddingBottomRight: [12, 190] };
  return { paddingTopLeft: [ref("sheet").offsetWidth + 40, 30], paddingBottomRight: [70, 30] };
}

function showAustria(animate = true) {
  const options = { ...mapPadding(), maxZoom: 9 };
  if (animate) map.flyToBounds(AUSTRIA, { ...options, duration: 0.9 });
  else map.fitBounds(AUSTRIA, options);
}

/* ---------- Standorte und Marker ---------- */

function addStation(row, data) {
  const [id, lat, lon, classIndex, districtId, name, operator, street, houseNumber, postcode, city] = row;
  const className = data.classes[classIndex] || "rescue-other";
  const meta = CLASS_META[className];
  const [stateName = "Nicht zugeordnet", districtName = "Nicht zugeordnet"] = data.regions[String(districtId)] || [];
  const record = {
    key: `bev-${id}`,
    className,
    kind: meta.kind,
    name: name || operator || kit.KINDS[meta.kind].label,
    operator,
    address: [[street, houseNumber].filter(Boolean).join(" "), [postcode, city].filter(Boolean).join(" ")].filter(Boolean).join(", "),
    districtId: String(districtId || ""),
    districtName,
    stateName,
    lat,
    lon,
    match: null,
  };
  record.marker = kit.Leaflet().marker([lat, lon], { icon: stationIcon(record), title: record.name, riseOnHover: true, keyboard: false });
  record.marker.record = record;
  record.marker.bindPopup(() => popupContent(record), { maxWidth: 320, autoPanPaddingTopLeft: kit.Leaflet().point(isPhone() ? 20 : 400, 20) });
  records.push(record);
  recordsByKey.set(record.key, record);
}

const iconCache = new Map();
function stationIcon(record) {
  const status = state.syncedAt ? (record.match ? "is-built" : "is-missing") : "";
  const key = `${record.className}:${status}`;
  if (!iconCache.has(key)) {
    const meta = CLASS_META[record.className];
    iconCache.set(key, kit.Leaflet().divIcon({ className: "lsswp-station", html: `<div class="lsswp-pin ${status}" style="--c:${meta.color}">${meta.short}</div>`, iconSize: [30, 36], iconAnchor: [15, 36], popupAnchor: [0, -34] }));
  }
  return iconCache.get(key);
}

function clusterIcon(cluster) {
  const markers = cluster.getAllChildMarkers();
  const count = markers.length;
  const size = count < 10 ? 36 : count < 100 ? 42 : count < 1000 ? 50 : 58;
  let ring = "rgba(255,255,255,.92)";
  if (state.syncedAt) {
    let built = 0;
    for (const marker of markers) if (marker.record.match) built += 1;
    ring = `conic-gradient(#34c759 0 ${(built / count) * 360}deg, #ff3b30 0)`;
  }
  return kit.Leaflet().divIcon({ className: "lsswp-cluster-icon", html: `<div class="lsswp-cluster" style="--ring:${ring}"><span>${count >= 1000 ? `${(count / 1000).toFixed(1)}k` : count}</span></div>`, iconSize: [size, size] });
}

function popupContent(record) {
  const meta = CLASS_META[record.className];
  const element = document.createElement("article");
  element.className = "lsswp-popup";
  const status = record.match
    ? `<div class="lsswp-popup-status is-built">${icon("check")}<span>Gebaut: <b>${esc(record.match.building.caption)}</b> · ${formatDistance(record.match.distance)}</span></div>`
    : state.syncedAt ? `<div class="lsswp-popup-status is-missing">${icon("info")}<span>Noch nicht gebaut</span></div>` : "";
  element.innerHTML = `
    <header><span class="lsswp-popup-glyph" style="--c:${meta.color}">${meta.short}</span><div><p>${esc(meta.label)}</p><h3>${esc(record.name)}</h3></div></header>
    ${status}
    <dl>
      <div><dt>Adresse</dt><dd>${esc(record.address || "Keine Adresse hinterlegt")}</dd></div>
      <div><dt>Gebiet</dt><dd>${esc(`${record.districtName}, ${record.stateName}`)}</dd></div>
      <div><dt>Im Spiel</dt><dd>${esc(meta.game)}</dd></div>
    </dl>
    <div class="lsswp-popup-actions">
      <button class="lsswp-btn${record.match ? "" : " is-primary"} is-wide" type="button" data-action="build" data-key="${esc(record.key)}">${record.match ? "Trotzdem zusätzlich bauen" : `${kit.KINDS[record.kind].label} bauen`}</button>
      <div><button class="lsswp-btn" type="button" data-action="copy" data-key="${esc(record.key)}">Koordinaten kopieren</button><a class="lsswp-btn" href="https://www.openstreetmap.org/?mlat=${record.lat}&mlon=${record.lon}#map=17/${record.lat}/${record.lon}" target="_blank" rel="noopener">Karte ${icon("external")}</a></div>
    </div>`;
  return element;
}

function suggestedName(record) {
  const prefix = CLASS_META[record.className].prefix;
  if (record.className === "fire-other" && /betriebsfeuerwehr/i.test(record.operator)) return `BtF ${record.name}`;
  if (!prefix || new RegExp(`^${prefix}\\b|feuerwehr|rotes kreuz|johanniter|samariter`, "i").test(record.name)) return record.name;
  return `${prefix} ${record.name}`;
}

const stationForBuild = (record) => ({ key: record.key, name: suggestedName(record), lat: record.lat, lon: record.lon, kind: record.kind, label: CLASS_META[record.className].label, address: record.address, district: record.districtName });

/* ---------- Abgleich mit den eigenen Gebäuden ---------- */

function normalizeBuildings(list) {
  return (Array.isArray(list) ? list : [])
    .map((building) => ({ id: Number(building.id), caption: String(building.caption ?? ""), type: Number(building.building_type), lat: Number(building.latitude), lon: Number(building.longitude) }))
    .filter((building) => Number.isFinite(building.lat) && Number.isFinite(building.lon) && Number.isFinite(building.type));
}

// Jede eigene Wache deckt höchstens einen echten Standort ab: Paare (Rasterzellen von
// rund 1 km) werden nach Entfernung sortiert und gierig zugeordnet.
function matchStations() {
  const cell = (value) => Math.floor(value * 100);
  const grid = new Map();
  for (const building of state.buildings) {
    if (!Object.values(COVERING).some((types) => types.has(building.type))) continue;
    const key = `${cell(building.lat)}:${cell(building.lon)}`;
    if (!grid.has(key)) grid.set(key, []);
    grid.get(key).push(building);
  }
  const latSpan = Math.ceil(state.radius / 1100);
  const lonSpan = Math.ceil(state.radius / 700);
  const pairs = [];
  for (const record of records) {
    record.match = null;
    const types = COVERING[record.kind];
    const baseLat = cell(record.lat);
    const baseLon = cell(record.lon);
    for (let dLat = -latSpan; dLat <= latSpan; dLat += 1) {
      for (let dLon = -lonSpan; dLon <= lonSpan; dLon += 1) {
        for (const building of grid.get(`${baseLat + dLat}:${baseLon + dLon}`) || []) {
          if (!types.has(building.type)) continue;
          const distance = kit.haversine(record.lat, record.lon, building.lat, building.lon);
          if (distance <= state.radius) pairs.push({ record, building, distance });
        }
      }
    }
  }
  pairs.sort((a, b) => a.distance - b.distance);
  const used = new Set();
  for (const pair of pairs) {
    if (pair.record.match || used.has(pair.building.id)) continue;
    pair.record.match = { building: pair.building, distance: pair.distance };
    used.add(pair.building.id);
  }
  for (const record of records) record.marker.setIcon(stationIcon(record));
}

async function sync(manual) {
  if (state.loading) return;
  state.loading = true;
  renderSync();
  setLoadState("Eigene Gebäude werden geladen …", "loading");
  try {
    state.rawBuildings = (await kit.fetchBuildings({ priority: manual })).map(kit.bridgeBuilding);
    state.buildings = normalizeBuildings(state.rawBuildings);
    state.syncedAt = Date.now();
    matchStations();
    updateStatusAvailability();
    refreshMarkers();
    setLoadState(`${formatNumber(records.length)} amtliche Standorte · ${dataVersion}`);
    if (manual) kit.toast(`${plural(state.buildings.length, "Gebäude", "Gebäude")} abgeglichen · ${plural(records.filter((record) => !record.match).length, "Standort fehlt", "Standorte fehlen")} noch`);
  } catch (error) {
    setLoadState(`Gebäude konnten nicht geladen werden: ${error.message}`, "error");
  } finally {
    state.loading = false;
    renderSync();
  }
}

function onBuildingBuilt(building) {
  if (!root || !state.syncedAt) return;
  const raw = kit.bridgeBuilding(building);
  const [normalized] = normalizeBuildings([raw]);
  if (!normalized || state.buildings.some((entry) => entry.id === normalized.id)) return;
  state.rawBuildings.push(raw);
  state.buildings.push(normalized);
  matchStations();
  refreshMarkers();
  renderSync();
}

function renderSync() {
  const synced = Boolean(state.syncedAt);
  ref("syncDot").className = `lsswp-sync-dot${state.loading ? " is-waiting" : synced ? " is-connected" : ""}`;
  ref("syncButton").disabled = state.loading;
  ref("syncButton").textContent = state.loading ? "Wird abgeglichen …" : synced ? "Erneut abgleichen" : "Mit meinen Gebäuden abgleichen";
  if (state.loading && !synced) {
    ref("syncTitle").textContent = "Gebäude werden geladen …";
    ref("syncHint").textContent = "Deine Wachen werden mit den echten Standorten verglichen.";
  } else if (synced) {
    const built = records.filter((record) => record.match).length;
    ref("syncTitle").textContent = `${formatNumber(built)} von ${formatNumber(records.length)} Standorten gebaut`;
    ref("syncHint").textContent = `${plural(state.buildings.length, "eigenes Gebäude", "eigene Gebäude")} · Stand ${new Date(state.syncedAt).toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" })} Uhr`;
  } else {
    ref("syncTitle").textContent = "Noch nicht abgeglichen";
    ref("syncHint").textContent = "Gleiche deine Wachen ab, um zu sehen, was noch fehlt.";
  }
}

/* ---------- Filter und Listen ---------- */

function matchesStatus(record) {
  if (!state.syncedAt || state.status === "all") return true;
  return state.status === "missing" ? !record.match : Boolean(record.match);
}

function refreshMarkers() {
  const stateValue = ref("state").value;
  const districtValue = ref("district").value;
  regionRecords = records.filter((record) => (!stateValue || record.stateName === stateValue) && (!districtValue || record.districtId === districtValue));
  activeRecords = regionRecords.filter((record) => state.enabled.has(record.className) && matchesStatus(record));
  clusters.clearLayers();
  clusters.addLayers(activeRecords.map((record) => record.marker));
  state.missingLimit = PAGE_SIZE;
  renderMissing();
  updateViewportStats();
}

function updateViewportStats() {
  const bounds = map.getBounds();
  const counts = Object.fromEntries(CLASS_KEYS.map((key) => [key, 0]));
  for (const record of regionRecords) if (bounds.contains([record.lat, record.lon])) counts[record.className] += 1;
  for (const [key, count] of Object.entries(counts)) {
    const output = root.querySelector(`[data-count="${key}"]`);
    if (output) output.textContent = formatNumber(count);
  }
  let visible = 0;
  let missing = 0;
  for (const record of activeRecords) {
    if (!bounds.contains([record.lat, record.lon])) continue;
    visible += 1;
    if (!record.match) missing += 1;
  }
  ref("visibleCount").textContent = formatNumber(visible);
  ref("visibleMissing").textContent = formatNumber(missing);
  ref("pillMissing").hidden = !state.syncedAt;
}

// Statusfilter in der Seitenleiste und Kartenschalter „Nur fehlende“ teilen sich einen Zustand.
function setBuildStatus(status, refresh = true) {
  state.status = status;
  selectSegment(ref("status"), status);
  ref("hideBuilt").checked = status === "missing";
  saveSettings();
  if (refresh) refreshMarkers();
}

function updateStatusAvailability() {
  const synced = Boolean(state.syncedAt);
  for (const button of ref("status").querySelectorAll("button")) button.disabled = !synced && button.dataset.value !== "all";
  ref("hideBuiltControl").hidden = !synced;
  if (synced) setBuildStatus(state.status, false);
  else {
    selectSegment(ref("status"), "all");
    ref("hideBuilt").checked = false;
  }
}

function renderMissing() {
  const list = ref("missingList");
  const more = ref("more");
  const synced = Boolean(state.syncedAt);
  // records ist bereits in Anzeigereihenfolge sortiert – Filtern genügt.
  const scope = regionRecords.filter((record) => state.enabled.has(record.className));
  const missing = scope.filter((record) => !record.match);
  const badge = ref("missingBadge");
  badge.hidden = !synced || !missing.length;
  badge.textContent = missing.length >= 1000 ? `${(missing.length / 1000).toLocaleString("de-DE", { maximumFractionDigits: 1 })}k` : missing.length;
  ref("coverage").hidden = !synced;
  if (!synced) {
    ref("missingTitle").textContent = "Noch nicht abgeglichen";
    ref("missingHint").textContent = "Deine Gebäude werden beim Öffnen automatisch geladen.";
    list.innerHTML = "";
    more.hidden = true;
    return;
  }
  const districtSelect = ref("district");
  const area = districtSelect.value ? districtSelect.selectedOptions[0].textContent : ref("state").value || "Österreich";
  const built = scope.length - missing.length;
  const percent = scope.length ? Math.round((built / scope.length) * 100) : 0;
  ref("missingTitle").textContent = `${formatNumber(missing.length)} fehlen in ${area}`;
  ref("missingHint").textContent = "Tippe auf eine Wache, um sie auf der Karte zu sehen.";
  ref("coverageBar").style.width = `${percent}%`;
  ref("coverageText").textContent = `${formatNumber(built)} von ${formatNumber(scope.length)} gebaut (${percent} %)`;
  if (!missing.length) {
    list.innerHTML = '<li class="lsswp-missing-empty"><strong>Alles gebaut 🎉</strong>In diesem Gebiet fehlt kein Standort der gewählten Organisationen.</li>';
    more.hidden = true;
    return;
  }
  const visible = missing.slice(0, state.missingLimit);
  list.innerHTML = visible.map((record, index) => {
    const meta = CLASS_META[record.className];
    return `<li class="lsswp-missing-item" style="--i:${Math.min(index, 20)}">
      <span class="lsswp-glyph" style="--c:${meta.color}">${meta.short}</span>
      <button class="lsswp-missing-main" type="button" data-action="focus" data-key="${esc(record.key)}"><strong>${esc(record.name)}</strong><small>${esc(record.districtName)} · ${esc(meta.label)}</small></button>
      <button class="lsswp-btn is-small" type="button" data-action="build" data-key="${esc(record.key)}">Bauen</button>
    </li>`;
  }).join("");
  more.hidden = missing.length <= visible.length;
  more.textContent = `Weitere ${formatNumber(Math.min(PAGE_SIZE, missing.length - visible.length))} anzeigen`;
}

function updateDistrictOptions() {
  const districtSelect = ref("district");
  const stateValue = ref("state").value;
  const current = districtSelect.value;
  if (!stateValue) {
    districtSelect.innerHTML = '<option value="">Alle</option>';
    districtSelect.disabled = true;
    return;
  }
  const districts = [...new Map(records.filter((record) => record.stateName === stateValue).map((record) => [record.districtId, record.districtName]))].sort((a, b) => collator.compare(a[1], b[1]));
  districtSelect.innerHTML = `<option value="">Alle</option>${districts.map(([id, name]) => `<option value="${esc(id)}">${esc(name)}</option>`).join("")}`;
  districtSelect.disabled = false;
  if (districts.some(([id]) => id === current)) districtSelect.value = current;
}

function focusArea(maxZoom) {
  if (!regionRecords.length) return;
  map.flyToBounds(kit.Leaflet().latLngBounds(regionRecords.map((record) => [record.lat, record.lon])), { ...mapPadding(), maxZoom, duration: 0.8 });
}

function focusRecord(record) {
  if (!activeRecords.includes(record)) setBuildStatus("all");
  if (isPhone()) ref("sheet").classList.remove("is-expanded");
  clusters.zoomToShowLayer(record.marker, () => {
    map.flyTo([record.lat, record.lon], Math.max(map.getZoom(), 15), { duration: 0.6 });
    map.once("moveend", () => record.marker.openPopup());
  });
}

const updateSelectAllLabel = () => { ref("selectAll").textContent = state.enabled.size ? "Alle aus" : "Alle an"; };

// Adresssuche über Nominatim (OpenStreetMap): nur auf ausdrückliche Suche, ein Ergebnis.
async function searchPlace(query) {
  setLoadState(`Suche nach „${query}“ …`, "loading");
  try {
    const [result] = await kit.externalJson(`https://nominatim.openstreetmap.org/search?${new URLSearchParams({ q: query, format: "json", limit: "1", countrycodes: "at" })}`);
    if (!result) {
      setLoadState("Ort oder Adresse wurde nicht gefunden", "error");
      return;
    }
    if (isPhone()) ref("sheet").classList.remove("is-expanded");
    map.flyTo([Number(result.lat), Number(result.lon)], 14, { duration: 0.9 });
    setLoadState(String(result.display_name || "").split(",").slice(0, 2).join(","));
  } catch (error) {
    setLoadState(`Adresssuche momentan nicht verfügbar: ${error.message}`, "error");
  }
}

function bindMap() {
  map.on("moveend", () => {
    if (viewportFrame) cancelAnimationFrame(viewportFrame);
    viewportFrame = requestAnimationFrame(() => {
      viewportFrame = 0;
      updateViewportStats();
    });
  });
  // Glas-Unschärfe müsste bei bewegter Karte in jedem Bild neu berechnet werden –
  // während Verschieben und Zoomen sind die Glasflächen daher kurz deckend.
  map.on("movestart zoomstart", () => {
    clearTimeout(settleTimer);
    root.classList.add("is-moving");
  });
  map.on("moveend zoomend", () => {
    clearTimeout(settleTimer);
    settleTimer = setTimeout(() => root.classList.remove("is-moving"), 200);
  });
  window.addEventListener("resize", () => state.open && map.invalidateSize());
}

const recordOf = (element) => recordsByKey.get(element.dataset.key);

kit.on({
  click: {
    close,
    "toggle-sheet": () => ref("sheet").classList.toggle("is-expanded"),
    view: (element) => {
      selectSegment(ref("views"), element.dataset.value);
      for (const panel of root.querySelectorAll("[data-panel]")) panel.classList.toggle("is-active", panel.dataset.panel === element.dataset.value);
      if (isPhone()) ref("sheet").classList.add("is-expanded");
    },
    status: (element) => setBuildStatus(element.dataset.value),
    sync: () => void sync(true),
    "zoom-in": () => map.zoomIn(1),
    "zoom-out": () => map.zoomOut(1),
    home: () => showAustria(),
    more: () => {
      state.missingLimit += PAGE_SIZE;
      renderMissing();
    },
    focus: (element) => {
      const record = recordOf(element);
      if (record) focusRecord(record);
    },
    build: (element) => {
      const record = recordOf(element);
      if (!record) return;
      map.closePopup();
      // Frisch abgeglichene Gebäude mitgeben: spart dem Bau-Dialog eine Abfrage.
      void kit.build.open(stationForBuild(record), { buildings: Date.now() - state.syncedAt < BUILDINGS_FRESH ? state.rawBuildings : undefined });
    },
    copy: async (element) => {
      const record = recordOf(element);
      if (!record) return;
      try {
        await navigator.clipboard.writeText(`${record.lat.toFixed(6)}, ${record.lon.toFixed(6)}`);
        element.textContent = "Kopiert ✓";
      } catch {
        element.textContent = "Nicht möglich";
      }
    },
    "clear-area": () => {
      ref("state").value = "";
      updateDistrictOptions();
      refreshMarkers();
      showAustria();
    },
    "select-all": () => {
      const enable = state.enabled.size === 0;
      for (const input of ref("orgs").querySelectorAll(".lsswp-switch")) {
        input.checked = enable;
        if (enable) state.enabled.add(input.value);
        else state.enabled.delete(input.value);
      }
      updateSelectAllLabel();
      saveSettings();
      refreshMarkers();
    },
  },
  change: {
    org: (element) => {
      if (element.checked) state.enabled.add(element.value);
      else state.enabled.delete(element.value);
      updateSelectAllLabel();
      saveSettings();
      refreshMarkers();
    },
    "hide-built": (element) => setBuildStatus(element.checked ? "missing" : "all"),
    state: () => {
      updateDistrictOptions();
      refreshMarkers();
      if (ref("state").value) focusArea(10);
      else showAustria();
    },
    district: () => {
      refreshMarkers();
      focusArea(ref("district").value ? 12 : 10);
    },
    theme: (element) => {
      settings.set({ theme: element.value });
      kit.setAppearance({ theme: element.value });
    },
    effects: (element) => {
      settings.set({ effects: element.value });
      kit.setAppearance({ effects: element.value });
    },
  },
  input: {
    radius: (element) => {
      state.radius = Number(element.value);
      ref("radiusLabel").textContent = formatDistance(state.radius);
      clearTimeout(radiusTimer);
      radiusTimer = setTimeout(() => {
        saveSettings();
        if (!state.syncedAt) return;
        matchStations();
        refreshMarkers();
        renderSync();
      }, 180);
    },
  },
});

/* ---------- Start ---------- */

kit.mountLauncher({
  id: "lsswp-launcher",
  title: "Wachenplaner Österreich öffnen",
  label: "Wachenplaner",
  glyph: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill-rule="evenodd" d="M12 2a7.5 7.5 0 0 0-7.5 7.5c0 5.3 6.2 11.4 6.9 12a.9.9 0 0 0 1.2 0c.7-.6 6.9-6.7 6.9-12A7.5 7.5 0 0 0 12 2Zm-.9 4.2h1.8v2.4h2.4v1.8h-2.4v2.4h-1.8v-2.4H8.7V8.6h2.4Z"/></svg>',
  onClick: open,
  // Neben der LSS Verwaltung einreihen, falls diese ebenfalls installiert ist.
  after: ["lssfo-launcher-host"],
});

kit.build.onBuilt((building) => onBuildingBuilt(building));

// Verbindung zur Webversion (index.html). Ist die LSS Verwaltung installiert, übernimmt sie
// die Verbindung, damit Erlaubnis- und Bau-Dialog nicht doppelt erscheinen.
kit.startBridge({
  sessionKey: "lsswp-bridge",
  consentKey: "lsswp-bridge-consent",
  pill: "Wachenplaner-Webseite verbunden",
  kicker: "Wachenplaner-Webseite",
  consentText: "Die Wachenplaner-Webseite möchte deine Gebäude abgleichen. Übertragen werden nur <b>Name, Typ und Position</b> deiner Gebäude – an den Tab, der dieses Fenster geöffnet hat.",
  delay: 1000,
  shouldYield: () => Boolean(document.documentElement.dataset.lssPlannerBridge || document.getElementById("lssfo-planner")),
});

if (new URLSearchParams(location.search).get("lsswp") === "open") setTimeout(open, 0);
