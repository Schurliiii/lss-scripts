/* global L, OFFICIAL_STATIONS, STATION_DISTRICTS, REGION_META */

const CONFIG = {
  austriaBounds: [[46.37, 9.53], [49.02, 17.16]],
  gameUrl: "https://www.leitstellenspiel.de/",
  gameOrigin: /^https:\/\/(?:www\.)?leitstellenspiel\.de$/,
  storageKey: "lss-planner-v1",
  missingPageSize: 80,
};

const CLASS_META = {
  "fire-professional": { label: "Berufsfeuerwehr", hint: "Haupt-, Zug- und Gruppenwachen", short: "BF", color: "#d70015", kind: "fire", game: "Feuerwache · größerer Fuhrpark" },
  "fire-volunteer": { label: "Freiwillige Feuerwehr", hint: "Orts- und Gemeindefeuerwehren", short: "FF", color: "#ff6a00", kind: "fire", game: "Feuerwache · regionaler Fuhrpark" },
  "fire-other": { label: "Betriebsfeuerwehr & weitere", hint: "BTF, Kommandos und Verbände", short: "F", color: "#a2384a", kind: "fire", game: "Feuerwache" },
  "rescue-redcross": { label: "Rotes Kreuz", hint: "ÖRK-Dienststellen", short: "✚", color: "#ff3b30", kind: "rescue", game: "Rettungswache" },
  "rescue-johanniter": { label: "Johanniter", hint: "Rettungs- und Einsatzstellen", short: "J", color: "#e0a100", kind: "rescue", game: "Rettungswache" },
  "rescue-samariter": { label: "Samariterbund", hint: "ASBÖ", short: "S", color: "#0a6cdf", kind: "rescue", game: "Rettungswache" },
  "rescue-other": { label: "Weitere Rettung", hint: "Wiener Rettung, Malteser u. a.", short: "R", color: "#636366", kind: "rescue", game: "Rettungswache" },
};

// LSS-Gebäudetypen, die einen echten Standort im Spiel abdecken.
const FIRE_TYPES = new Set([0, 18]);
const RESCUE_TYPES = new Set([2, 20]);
const COMPLEX_TYPES = new Set([22, 23]);

const $ = (selector) => document.querySelector(selector);
const sidebar = $("#sidebar");
const stateFilter = $("#stateFilter");
const districtFilter = $("#districtFilter");
const popupTemplate = $("#popupTemplate");
const isPhone = () => window.matchMedia("(max-width: 760px)").matches;

const stored = readStorage();
const state = {
  enabled: new Set(Object.keys(CLASS_META)),
  status: ["missing", "built"].includes(stored.status) ? stored.status : "all",
  radius: Number(stored.radius) || 300,
  buildings: Array.isArray(stored.buildings) ? stored.buildings : [],
  syncedAt: stored.syncedAt || null,
  missingLimit: CONFIG.missingPageSize,
};

const records = [];
let regionRecords = [];
let activeRecords = [];
let viewportFrame = 0;
let gameWindow = null;
let gameOrigin = "";
let gameReady = false;
let pendingMessages = [];
let gameTimeout = 0;

/* ---------- Karte ---------- */

const map = L.map("map", {
  zoomControl: false,
  minZoom: isPhone() ? 5 : 7,
  maxBounds: [[45.3, 8.1], [50.2, 18.5]],
  maxBoundsViscosity: 0.7,
});
// Ganzzahlige Zoomstufen halten die Kacheln unskaliert; der Puffer lädt
// Nachbarkacheln vor, damit beim Verschieben keine leeren Flächen entstehen.
L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}", {
  maxZoom: 19,
  keepBuffer: 4,
  updateWhenZooming: false,
  attribution: 'Basemap &copy; Esri · Standorte: <a href="https://www.bev.gv.at/">BEV</a>, CC BY 4.0',
}).addTo(map);

const clusters = L.markerClusterGroup({
  showCoverageOnHover: false,
  maxClusterRadius: 48,
  spiderfyOnMaxZoom: true,
  disableClusteringAtZoom: 15,
  chunkedLoading: true,
  removeOutsideVisibleBounds: true,
  iconCreateFunction: createClusterIcon,
});
map.addLayer(clusters);

function mapPadding() {
  if (isPhone()) return { paddingTopLeft: [12, 64], paddingBottomRight: [12, 190] };
  return { paddingTopLeft: [sidebar.offsetWidth + 40, 30], paddingBottomRight: [70, 30] };
}

function showAustria(animate = true) {
  const options = { ...mapPadding(), maxZoom: 9 };
  if (animate) map.flyToBounds(CONFIG.austriaBounds, { ...options, duration: 0.9 });
  else map.fitBounds(CONFIG.austriaBounds, options);
}

/* ---------- Hilfsfunktionen ---------- */

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[char]);
}

function formatNumber(value) {
  return Number(value || 0).toLocaleString("de-AT");
}

function formatDistance(meters) {
  return meters < 1000 ? `${Math.round(meters)} m` : `${(meters / 1000).toLocaleString("de-AT", { maximumFractionDigits: 1 })} km`;
}

function readStorage() {
  try {
    return JSON.parse(localStorage.getItem(CONFIG.storageKey) || "{}") || {};
  } catch {
    return {};
  }
}

function writeStorage() {
  try {
    localStorage.setItem(CONFIG.storageKey, JSON.stringify({ buildings: state.buildings, syncedAt: state.syncedAt, radius: state.radius, status: state.status }));
  } catch { /* Ohne Speicher gilt der Abgleich nur für diese Sitzung. */ }
}

let toastTimer = 0;
function toast(message) {
  const element = $("#toast");
  element.textContent = message;
  element.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => element.classList.remove("is-visible"), 3200);
}

function setStatus(message, type = "ready") {
  $("#loadDot").className = `status-dot ${type}`;
  $("#loadState").textContent = message;
}

function haversine(lat1, lon1, lat2, lon2) {
  const rad = Math.PI / 180;
  const dLat = (lat2 - lat1) * rad;
  const dLon = (lon2 - lon1) * rad;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * rad) * Math.cos(lat2 * rad) * Math.sin(dLon / 2) ** 2;
  return 12742000 * Math.asin(Math.sqrt(a));
}

function addressText(tags) {
  const street = [tags["addr:street"], tags["addr:housenumber"]].filter(Boolean).join(" ");
  const city = [tags["addr:postcode"], tags["addr:city"]].filter(Boolean).join(" ");
  return [street, city].filter(Boolean).join(", ");
}

function suggestedName(record) {
  const name = record.name;
  const prefix = {
    "fire-volunteer": "FF",
    "fire-professional": "BF",
    "rescue-redcross": "RK",
    "rescue-johanniter": "JUH",
    "rescue-samariter": "ASB",
  }[record.className];
  if (record.className === "fire-other" && /betriebsfeuerwehr/i.test(record.tags.operator || "")) return `BtF ${name}`;
  if (!prefix || new RegExp(`^${prefix}\\b|feuerwehr|rotes kreuz|johanniter|samariter`, "i").test(name)) return name;
  return `${prefix} ${name}`;
}

/* ---------- Datensätze ---------- */

const iconCache = new Map();
function stationIcon(record) {
  const synced = state.buildings.length > 0;
  const status = synced ? (record.match ? "is-built" : "is-missing") : "";
  const key = `${record.className}:${status}`;
  if (!iconCache.has(key)) {
    const meta = CLASS_META[record.className];
    iconCache.set(key, L.divIcon({
      className: "station-icon",
      html: `<div class="pin ${status}" style="--c:${meta.color}">${meta.short}</div>`,
      iconSize: [30, 36],
      iconAnchor: [15, 36],
      popupAnchor: [0, -34],
    }));
  }
  return iconCache.get(key);
}

function createClusterIcon(cluster) {
  const markers = cluster.getAllChildMarkers();
  const count = markers.length;
  const size = count < 10 ? 36 : count < 100 ? 42 : count < 1000 ? 50 : 58;
  let ring = "rgba(255,255,255,.92)";
  if (state.buildings.length) {
    const built = markers.reduce((sum, marker) => sum + (marker.record.match ? 1 : 0), 0);
    ring = `conic-gradient(#34c759 0 ${(built / count) * 360}deg, #ff3b30 0)`;
  }
  return L.divIcon({
    className: "cluster-icon",
    html: `<div class="cluster" style="--ring:${ring}"><span>${count >= 1000 ? `${(count / 1000).toFixed(1)}k` : count}</span></div>`,
    iconSize: [size, size],
  });
}

function addStation(element) {
  const lat = Number(element.lat);
  const lon = Number(element.lon);
  if (!Number.isFinite(lat) || !Number.isFinite(lon)) return;
  const tags = element.tags || {};
  const className = CLASS_META[tags["bev:class"]] ? tags["bev:class"] : (tags.amenity === "fire_station" ? "fire-other" : "rescue-other");
  const [stateName = "Nicht zugeordnet", districtName = "Nicht zugeordnet"] = REGION_META[String(STATION_DISTRICTS[element.id] || "")] || [];
  const record = {
    key: `${element.type}-${element.id}`,
    tags,
    className,
    kind: CLASS_META[className].kind,
    name: tags.name || tags.operator || (className.startsWith("fire") ? "Feuerwache" : "Rettungswache"),
    districtId: String(STATION_DISTRICTS[element.id] || ""),
    districtName,
    stateName,
    lat,
    lon,
    match: null,
  };
  record.marker = L.marker([lat, lon], { icon: stationIcon(record), title: record.name, riseOnHover: true });
  record.marker.record = record;
  record.marker.bindPopup(() => makePopup(record), { maxWidth: 320, autoPanPaddingTopLeft: L.point(isPhone() ? 20 : 400, 20) });
  records.push(record);
}

/* ---------- Abgleich mit den eigenen Gebäuden ---------- */

function buildingKinds(type) {
  if (FIRE_TYPES.has(type)) return ["fire"];
  if (RESCUE_TYPES.has(type)) return ["rescue"];
  if (COMPLEX_TYPES.has(type)) return ["fire", "rescue"];
  return [];
}

function normalizeBuildings(raw) {
  const list = Array.isArray(raw) ? raw : raw?.result || raw?.buildings || [];
  return list.map((building) => ({
    id: Number(building.id),
    caption: String(building.caption ?? building.name ?? ""),
    type: Number(building.building_type ?? building.type),
    lat: Number(building.latitude ?? building.lat),
    lon: Number(building.longitude ?? building.lon),
  })).filter((building) => Number.isFinite(building.lat) && Number.isFinite(building.lon) && Number.isFinite(building.type));
}

// Jede eigene Wache deckt höchstens einen echten Standort ab: Paare werden
// nach Entfernung sortiert und gierig zugeordnet.
function matchStations() {
  const cell = (value) => Math.floor(value * 100);
  const grid = new Map();
  for (const building of state.buildings) {
    if (!buildingKinds(building.type).length) continue;
    const key = `${cell(building.lat)}:${cell(building.lon)}`;
    if (!grid.has(key)) grid.set(key, []);
    grid.get(key).push(building);
  }
  const latSpan = Math.ceil(state.radius / 1100);
  const lonSpan = Math.ceil(state.radius / 700);
  const pairs = [];
  for (const record of records) {
    record.match = null;
    const baseLat = cell(record.lat);
    const baseLon = cell(record.lon);
    for (let dLat = -latSpan; dLat <= latSpan; dLat += 1) {
      for (let dLon = -lonSpan; dLon <= lonSpan; dLon += 1) {
        for (const building of grid.get(`${baseLat + dLat}:${baseLon + dLon}`) || []) {
          if (!buildingKinds(building.type).includes(record.kind)) continue;
          const distance = haversine(record.lat, record.lon, building.lat, building.lon);
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

function applyBuildings(buildings, source) {
  state.buildings = buildings;
  state.syncedAt = Date.now();
  writeStorage();
  matchStations();
  updateStatusAvailability();
  refreshMarkers();
  renderSync();
  const missing = records.filter((record) => !record.match).length;
  toast(`${formatNumber(buildings.length)} Gebäude ${source} · ${formatNumber(missing)} Standorte fehlen noch`);
}

function renderSync() {
  const synced = state.buildings.length > 0;
  const waiting = Boolean(pendingMessages.length) && !gameReady;
  $("#syncDot").className = `sync-dot${synced ? " is-connected" : ""}${waiting ? " is-waiting" : ""}`;
  if (waiting) {
    $("#syncTitle").textContent = "Warte auf Leitstellenspiel …";
    $("#syncHint").textContent = "Bestätige im Spiel-Tab den Abgleich.";
  } else if (synced) {
    const built = records.filter((record) => record.match).length;
    $("#syncTitle").textContent = `${formatNumber(built)} von ${formatNumber(records.length)} Standorten gebaut`;
    $("#syncHint").textContent = `${formatNumber(state.buildings.length)} eigene Gebäude · Stand ${new Date(state.syncedAt).toLocaleString("de-AT", { dateStyle: "short", timeStyle: "short" })}`;
  } else {
    $("#syncTitle").textContent = "Nicht mit dem Spiel verbunden";
    $("#syncHint").textContent = "Gleiche deine Wachen ab, um zu sehen, was noch fehlt.";
  }
  $("#syncButton").textContent = synced ? "Erneut abgleichen" : "Mit Leitstellenspiel abgleichen";
}

/* ---------- Kommunikation mit dem Userscript im Spiel ---------- */

function openGame() {
  const url = new URL(CONFIG.gameUrl);
  url.searchParams.set("lssfo", "planner");
  gameReady = false;
  gameWindow = window.open(url.href, "lssfo-game");
  if (!gameWindow) {
    pendingMessages = [];
    renderSync();
    toast("Der Spiel-Tab wurde blockiert. Bitte Pop-ups für diese Seite erlauben.");
    return;
  }
  clearTimeout(gameTimeout);
  gameTimeout = setTimeout(() => {
    if (gameReady) return;
    pendingMessages = [];
    renderSync();
    setStatus("Keine Antwort vom Spiel – ist das Userscript „LSS Wachenplaner Österreich“ installiert und bist du eingeloggt?", "error");
  }, 25000);
}

function sendToGame(message) {
  if (gameWindow && !gameWindow.closed && gameReady) {
    gameWindow.postMessage({ source: "lssfo-planner", ...message }, gameOrigin);
    try { gameWindow.focus(); } catch { /* Fokus ist nur ein Komfort. */ }
    return;
  }
  pendingMessages.push(message);
  renderSync();
  if (!gameWindow || gameWindow.closed || !gameReady) openGame();
}

window.addEventListener("message", (event) => {
  if (!CONFIG.gameOrigin.test(event.origin) || event.data?.source !== "lssfo-game") return;
  const data = event.data;
  gameWindow = event.source;
  gameOrigin = event.origin;
  if (data.type === "lssfo-ready") {
    gameReady = true;
    clearTimeout(gameTimeout);
    const queue = pendingMessages;
    pendingMessages = [];
    for (const message of queue) gameWindow.postMessage({ source: "lssfo-planner", ...message }, gameOrigin);
    renderSync();
    setStatus("Mit Leitstellenspiel verbunden");
  }
  if (data.type === "lssfo-buildings") applyBuildings(normalizeBuildings(data.buildings), "abgeglichen");
  if (data.type === "lssfo-denied") {
    renderSync();
    toast("Abgleich wurde im Spiel abgelehnt.");
  }
  if (data.type === "lssfo-built") {
    const [building] = normalizeBuildings([data.building]);
    if (building && !state.buildings.some((entry) => entry.id === building.id)) {
      state.buildings = [...state.buildings, building];
      state.syncedAt = Date.now();
      writeStorage();
      matchStations();
      refreshMarkers();
      renderSync();
    }
    toast(`✓ ${data.building?.caption || "Wache"} wurde gebaut`);
  }
});

function buildInGame(record) {
  sendToGame({
    type: "lssfo-build",
    station: {
      key: record.key,
      name: suggestedName(record),
      lat: record.lat,
      lon: record.lon,
      kind: record.kind,
      label: CLASS_META[record.className].label,
      address: addressText(record.tags),
      district: record.districtName,
    },
  });
  toast(gameReady ? "Bau-Dialog im Spiel-Tab geöffnet" : "Leitstellenspiel wird geöffnet …");
}

/* ---------- Popup ---------- */

function makePopup(record) {
  const fragment = popupTemplate.content.cloneNode(true);
  const meta = CLASS_META[record.className];
  const glyph = fragment.querySelector(".popup-glyph");
  glyph.style.background = meta.color;
  glyph.textContent = meta.short;
  fragment.querySelector(".popup-kicker").textContent = meta.label;
  fragment.querySelector(".popup-title").textContent = record.name;
  fragment.querySelector(".popup-address").textContent = addressText(record.tags) || "Keine Adresse hinterlegt";
  fragment.querySelector(".popup-region").textContent = `${record.districtName}, ${record.stateName}`;
  fragment.querySelector(".popup-game").textContent = meta.game;
  const status = fragment.querySelector(".popup-status");
  const buildButton = fragment.querySelector(".popup-build");
  if (record.match) {
    status.className = "popup-status built";
    status.innerHTML = `<svg viewBox="0 0 24 24"><path d="m5 12 5 5 9-10"/></svg><span>Gebaut: <b>${escapeHtml(record.match.building.caption)}</b> · ${formatDistance(record.match.distance)}</span>`;
    buildButton.textContent = "Trotzdem zusätzlich bauen";
    buildButton.classList.replace("primary", "ghost");
  } else if (state.buildings.length) {
    status.className = "popup-status missing";
    status.innerHTML = '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 8v5M12 16h.01"/></svg><span>Noch nicht gebaut</span>';
  }
  buildButton.addEventListener("click", () => buildInGame(record));
  fragment.querySelector(".osm-link").href = `https://www.openstreetmap.org/?mlat=${record.lat}&mlon=${record.lon}#map=17/${record.lat}/${record.lon}`;
  fragment.querySelector(".copy-button").addEventListener("click", async (event) => {
    const button = event.currentTarget;
    try {
      await navigator.clipboard.writeText(`${record.lat.toFixed(6)}, ${record.lon.toFixed(6)}`);
      button.textContent = "Kopiert ✓";
    } catch {
      button.textContent = "Nicht möglich";
    }
  });
  return fragment;
}

function focusRecord(record) {
  if (!activeRecords.includes(record)) setBuildStatus("all");
  if (isPhone()) sidebar.classList.remove("is-expanded");
  clusters.zoomToShowLayer(record.marker, () => {
    map.flyTo([record.lat, record.lon], Math.max(map.getZoom(), 15), { duration: 0.6 });
    map.once("moveend", () => record.marker.openPopup());
  });
}

/* ---------- Filter ---------- */

function matchesArea(record) {
  if (stateFilter.value && record.stateName !== stateFilter.value) return false;
  if (districtFilter.value && record.districtId !== districtFilter.value) return false;
  return state.enabled.has(record.className);
}

function matchesStatus(record) {
  if (state.status === "missing") return !record.match;
  if (state.status === "built") return Boolean(record.match);
  return true;
}

function refreshMarkers() {
  regionRecords = records.filter((record) => (!stateFilter.value || record.stateName === stateFilter.value)
    && (!districtFilter.value || record.districtId === districtFilter.value));
  activeRecords = regionRecords.filter((record) => state.enabled.has(record.className) && matchesStatus(record));
  clusters.clearLayers();
  clusters.addLayers(activeRecords.map((record) => record.marker));
  state.missingLimit = CONFIG.missingPageSize;
  renderMissing();
  updateViewportStats();
}

function updateViewportStats() {
  const bounds = map.getBounds();
  const counts = Object.fromEntries(Object.keys(CLASS_META).map((key) => [key, 0]));
  for (const record of regionRecords) {
    if (bounds.contains([record.lat, record.lon])) counts[record.className] += 1;
  }
  for (const [key, count] of Object.entries(counts)) {
    const output = document.querySelector(`[data-count="${key}"]`);
    if (output) output.textContent = formatNumber(count);
  }
  let visible = 0;
  let missing = 0;
  for (const record of activeRecords) {
    if (!bounds.contains([record.lat, record.lon])) continue;
    visible += 1;
    if (!record.match) missing += 1;
  }
  $("#visibleCount").textContent = formatNumber(visible);
  $("#visibleMissing").textContent = formatNumber(missing);
  $("#pillMissing").hidden = !state.buildings.length;
}

// Status-Filter in der Seitenleiste und Kartenschalter „Nur fehlende“ teilen
// sich denselben Zustand.
function setBuildStatus(status, refresh = true) {
  state.status = status;
  const buttons = [...document.querySelectorAll("#statusFilter button[data-status]")];
  selectStatus(Math.max(0, buttons.findIndex((button) => button.dataset.status === status)));
  $("#hideBuiltToggle").checked = status === "missing";
  writeStorage();
  if (refresh) refreshMarkers();
}

function updateStatusAvailability() {
  const synced = state.buildings.length > 0;
  for (const button of document.querySelectorAll("#statusFilter button[data-status]")) {
    button.disabled = !synced && button.dataset.status !== "all";
  }
  $("#hideBuiltControl").hidden = !synced;
  setBuildStatus(synced ? state.status : "all", false);
}

function renderMissing() {
  const list = $("#missingList");
  const more = $("#missingMore");
  const synced = state.buildings.length > 0;
  const scope = regionRecords.filter((record) => state.enabled.has(record.className));
  const classOrder = Object.keys(CLASS_META);
  const missing = scope.filter((record) => !record.match)
    .sort((a, b) => a.stateName.localeCompare(b.stateName, "de-AT")
      || a.districtName.localeCompare(b.districtName, "de-AT")
      || classOrder.indexOf(a.className) - classOrder.indexOf(b.className)
      || a.name.localeCompare(b.name, "de-AT"));
  const badge = $("#missingBadge");
  badge.hidden = !synced || !missing.length;
  badge.textContent = missing.length >= 1000 ? `${(missing.length / 1000).toLocaleString("de-AT", { maximumFractionDigits: 1 })}k` : missing.length;
  $("#coverageRow").hidden = !synced;
  if (!synced) {
    $("#missingTitle").textContent = "Noch nicht abgeglichen";
    $("#missingHint").textContent = "Starte zuerst den Abgleich mit dem Spiel.";
    list.innerHTML = '<li class="empty-state"><strong>Was fehlt noch?</strong>Tippe unter „Filter“ auf „Mit Leitstellenspiel abgleichen“. Danach siehst du hier jede echte Wache, die du noch nicht gebaut hast.</li>';
    more.hidden = true;
    return;
  }
  const area = districtFilter.value ? districtFilter.selectedOptions[0].textContent : stateFilter.value || "Österreich";
  const built = scope.length - missing.length;
  $("#missingTitle").textContent = `${formatNumber(missing.length)} fehlen in ${area}`;
  $("#missingHint").textContent = "Tippe auf eine Wache, um sie auf der Karte zu sehen.";
  $("#coverageBar").style.width = `${scope.length ? (built / scope.length) * 100 : 0}%`;
  $("#coverageText").textContent = `${formatNumber(built)} von ${formatNumber(scope.length)} gebaut (${scope.length ? Math.round((built / scope.length) * 100) : 0} %)`;
  if (!missing.length) {
    list.innerHTML = '<li class="empty-state"><strong>Alles gebaut 🎉</strong>In diesem Gebiet fehlt keine Wache der gewählten Organisationen.</li>';
    more.hidden = true;
    return;
  }
  const visible = missing.slice(0, state.missingLimit);
  list.innerHTML = visible.map((record, index) => {
    const meta = CLASS_META[record.className];
    return `<li class="missing-item" style="--i:${Math.min(index, 20)}" data-key="${escapeHtml(record.key)}">
      <span class="glyph" style="background:${meta.color}">${meta.short}</span>
      <button class="main" type="button" data-action="focus"><strong>${escapeHtml(record.name)}</strong><small>${escapeHtml(record.districtName)} · ${escapeHtml(meta.label)}</small></button>
      <button class="button ghost build" type="button" data-action="build">Bauen</button>
    </li>`;
  }).join("");
  more.hidden = missing.length <= visible.length;
  more.textContent = `Weitere ${formatNumber(Math.min(CONFIG.missingPageSize, missing.length - visible.length))} anzeigen`;
}

/* ---------- Bedienelemente ---------- */

function setupSegmented(container, onSelect) {
  const buttons = [...container.querySelectorAll("button")];
  container.style.setProperty("--count", buttons.length);
  const select = (index) => {
    buttons.forEach((button, buttonIndex) => {
      button.classList.toggle("is-active", buttonIndex === index);
      button.setAttribute("aria-selected", String(buttonIndex === index));
    });
    container.style.setProperty("--index", index);
  };
  buttons.forEach((button, index) => button.addEventListener("click", () => {
    if (button.disabled) return;
    select(index);
    onSelect(button, index);
  }));
  return select;
}

setupSegmented(document.querySelector(".segmented[role=tablist]"), (button) => {
  for (const panel of document.querySelectorAll("[data-view-panel]")) {
    panel.classList.toggle("is-active", panel.dataset.viewPanel === button.dataset.view);
  }
  if (isPhone()) sidebar.classList.add("is-expanded");
});

const selectStatus = setupSegmented($("#statusFilter"), (button) => setBuildStatus(button.dataset.status));
$("#hideBuiltToggle").addEventListener("change", (event) => setBuildStatus(event.target.checked ? "missing" : "all"));

$("#orgFilters").innerHTML = Object.entries(CLASS_META).map(([key, meta]) => `
  <label class="org-row">
    <span class="glyph" style="background:${meta.color}">${meta.short}</span>
    <span><strong>${escapeHtml(meta.label)}</strong><small>${escapeHtml(meta.hint)}</small></span>
    <output data-count="${key}">0</output>
    <input class="switch" type="checkbox" value="${key}" checked />
  </label>`).join("");

$("#orgFilters").addEventListener("change", (event) => {
  if (!event.target.matches(".switch")) return;
  if (event.target.checked) state.enabled.add(event.target.value);
  else state.enabled.delete(event.target.value);
  $("#selectAll").textContent = state.enabled.size ? "Alle aus" : "Alle an";
  refreshMarkers();
});

$("#selectAll").addEventListener("click", () => {
  const enable = state.enabled.size === 0;
  for (const input of document.querySelectorAll("#orgFilters .switch")) {
    input.checked = enable;
    if (enable) state.enabled.add(input.value);
    else state.enabled.delete(input.value);
  }
  $("#selectAll").textContent = enable ? "Alle aus" : "Alle an";
  refreshMarkers();
});

function focusArea(maxZoom) {
  if (!regionRecords.length) return;
  map.flyToBounds(L.latLngBounds(regionRecords.map((record) => [record.lat, record.lon])), { ...mapPadding(), maxZoom, duration: 0.8 });
}

function updateDistrictOptions() {
  const current = districtFilter.value;
  if (!stateFilter.value) {
    districtFilter.innerHTML = '<option value="">Alle</option>';
    districtFilter.disabled = true;
    return;
  }
  const districts = [...new Map(records.filter((record) => record.stateName === stateFilter.value).map((record) => [record.districtId, record.districtName]))]
    .sort((a, b) => a[1].localeCompare(b[1], "de-AT"));
  districtFilter.innerHTML = '<option value="">Alle</option>' + districts.map(([id, name]) => `<option value="${escapeHtml(id)}">${escapeHtml(name)}</option>`).join("");
  districtFilter.disabled = false;
  if (districts.some(([id]) => id === current)) districtFilter.value = current;
}

stateFilter.addEventListener("change", () => {
  updateDistrictOptions();
  refreshMarkers();
  if (stateFilter.value) focusArea(10);
  else showAustria();
});
districtFilter.addEventListener("change", () => {
  refreshMarkers();
  focusArea(districtFilter.value ? 12.5 : 10);
});
$("#clearArea").addEventListener("click", () => {
  stateFilter.value = "";
  updateDistrictOptions();
  refreshMarkers();
  showAustria();
});

$("#missingList").addEventListener("click", (event) => {
  const action = event.target.closest("[data-action]")?.dataset.action;
  const key = event.target.closest("[data-key]")?.dataset.key;
  const record = key && records.find((entry) => entry.key === key);
  if (!record) return;
  if (action === "focus") focusRecord(record);
  if (action === "build") buildInGame(record);
});
$("#missingMore").addEventListener("click", () => {
  state.missingLimit += CONFIG.missingPageSize;
  renderMissing();
});

$("#syncButton").addEventListener("click", () => sendToGame({ type: "lssfo-sync" }));
$("#importInput").addEventListener("change", async (event) => {
  const [file] = event.target.files;
  event.target.value = "";
  if (!file) return;
  try {
    const buildings = normalizeBuildings(JSON.parse(await file.text()));
    if (!buildings.length) throw new Error("keine Gebäude gefunden");
    applyBuildings(buildings, "importiert");
  } catch (error) {
    toast(`Import fehlgeschlagen: ${error.message}`);
  }
});

const radiusInput = $("#radiusInput");
radiusInput.value = state.radius;
$("#radiusLabel").textContent = formatDistance(state.radius);
let radiusTimer = 0;
radiusInput.addEventListener("input", () => {
  state.radius = Number(radiusInput.value);
  $("#radiusLabel").textContent = formatDistance(state.radius);
  clearTimeout(radiusTimer);
  radiusTimer = setTimeout(() => {
    writeStorage();
    if (!state.buildings.length) return;
    matchStations();
    refreshMarkers();
    renderSync();
  }, 180);
});

$("#zoomIn").addEventListener("click", () => map.zoomIn(1));
$("#zoomOut").addEventListener("click", () => map.zoomOut(1));
$("#homeButton").addEventListener("click", () => showAustria());
$("#sheetHandle").addEventListener("click", () => sidebar.classList.toggle("is-expanded"));
$("#searchInput").addEventListener("focus", () => { if (isPhone()) sidebar.classList.add("is-expanded"); });

const infoDialog = $("#infoDialog");
$("#infoButton").addEventListener("click", () => infoDialog.showModal());
$("#closeInfo").addEventListener("click", () => infoDialog.close());
infoDialog.addEventListener("click", (event) => { if (event.target === infoDialog) infoDialog.close(); });

$("#searchForm").addEventListener("submit", async (event) => {
  event.preventDefault();
  const input = $("#searchInput");
  const query = input.value.trim();
  if (!query) return;
  input.blur();
  setStatus(`Suche nach „${query}“ …`, "loading");
  try {
    const url = new URL("https://nominatim.openstreetmap.org/search");
    url.search = new URLSearchParams({ q: query, format: "json", limit: "1", countrycodes: "at" });
    const response = await fetch(url, { headers: { Accept: "application/json" } });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const [result] = await response.json();
    if (!result) {
      setStatus("Ort oder Adresse wurde nicht gefunden", "error");
      return;
    }
    if (isPhone()) sidebar.classList.remove("is-expanded");
    map.flyTo([Number(result.lat), Number(result.lon)], 14, { duration: 0.9 });
    setStatus(result.display_name.split(",").slice(0, 2).join(","));
  } catch (error) {
    console.error(error);
    setStatus("Adresssuche momentan nicht verfügbar", "error");
  }
});

map.on("moveend", () => {
  if (viewportFrame) cancelAnimationFrame(viewportFrame);
  viewportFrame = requestAnimationFrame(() => {
    viewportFrame = 0;
    updateViewportStats();
  });
});

// Glas-Unschärfe muss bei bewegter Karte in jedem Frame neu berechnet werden.
// Während Verschieben und Zoomen werden die Glasflächen daher kurz deckend.
const appElement = $("#app");
let settleTimer = 0;
map.on("movestart zoomstart", () => {
  clearTimeout(settleTimer);
  appElement.classList.add("is-moving");
});
map.on("moveend zoomend", () => {
  clearTimeout(settleTimer);
  settleTimer = setTimeout(() => appElement.classList.remove("is-moving"), 200);
});
window.addEventListener("resize", () => map.invalidateSize());

/* ---------- Start ---------- */

OFFICIAL_STATIONS.forEach(addStation);
const states = [...new Set(records.map((record) => record.stateName))].sort((a, b) => a.localeCompare(b, "de-AT"));
stateFilter.insertAdjacentHTML("beforeend", states.map((name) => `<option value="${escapeHtml(name)}">${escapeHtml(name)}</option>`).join(""));
showAustria(false);
if (state.buildings.length) matchStations();
updateStatusAvailability();
refreshMarkers();
renderSync();
setStatus(`${formatNumber(records.length)} amtliche Standorte · BEV-DLM 23.03.2026`);
requestAnimationFrame(() => requestAnimationFrame(() => map.invalidateSize({ pan: false })));
