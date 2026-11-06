// LSS Wachenplaner Österreich (Userscript): zeigt alle amtlichen Feuerwehr- und
// Rettungsstandorte Österreichs direkt in Leitstellenspiel.de, gleicht sie mit den
// eigenen Gebäuden ab und baut fehlende Wachen über einen Bau-Dialog.
// Eigenständig – benötigt kein weiteres Script. Alle Namen tragen das Präfix
// "lsswp", damit es neben anderen LSS-Scripts laufen kann.
(() => {
  "use strict";

  if (window.top !== window.self || document.getElementById("lsswp-layer")) return;

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
  // Je Art: LSS-Gebäudetyp, Farbe und Bezeichnung im Bau-Dialog.
  const KIND_META = {
    fire: { type: "0", color: "#ff6a00", label: "Feuerwache", headline: "NEUE FEUERWACHE", pattern: /feuerwache/i, exact: /^feuerwache$/i },
    rescue: { type: "2", color: "#ff3b30", label: "Rettungswache", headline: "NEUE RETTUNGSWACHE", pattern: /rettungswache/i, exact: /^rettungswache$/i },
    hospital: { type: "4", color: "#0a84ff", label: "Krankenhaus", headline: "NEUES KRANKENHAUS", pattern: /krankenhaus/i, exact: /^krankenhaus$/i },
    police: { type: "6", color: "#1c3f94", label: "Polizeiwache", headline: "NEUE POLIZEIWACHE", pattern: /polizeiwache/i, exact: /^polizeiwache$/i },
  };
  const CLASS_KEYS = Object.keys(CLASS_META);
  // LSS-Gebäudetypen, die einen echten Standort abdecken.
  const FIRE_TYPES = new Set([0, 18]);
  const RESCUE_TYPES = new Set([2, 20]);
  const COMPLEX_TYPES = new Set([22, 23]);
  const HOSPITAL_TYPES = new Set([4]);
  const POLICE_TYPES = new Set([6, 19]);
  const DISPATCH_TYPE = 7;
  const AUSTRIA = [[46.37, 9.53], [49.02, 17.16]];
  const SETTINGS_KEY = "lsswp-settings-v1";
  const PAGE_SIZE = 80;
  // Brücke zur eigenständigen Webversion (lss_einsatzkarte/index.html).
  const BRIDGE_SESSION_KEY = "lsswp-bridge";
  const BRIDGE_CONSENT_KEY = "lsswp-bridge-consent";

  const settings = loadSettings();
  const state = {
    open: false,
    loading: false,
    enabled: initialEnabled(),
    status: ["missing", "built"].includes(settings.status) ? settings.status : "all",
    radius: Number(settings.radius) || 300,
    effects: ["full", "reduced"].includes(settings.effects) ? settings.effects : "auto",
    buildings: [],
    syncedAt: 0,
    missingLimit: PAGE_SIZE,
    dialog: null,
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
  let toastTimer = 0;
  let selectStatus = () => {};

  // Ebene für Bau-Dialog, Hinweise und Brücke – liegt über dem Planer und
  // funktioniert auch, wenn der Planer geschlossen ist.
  const layer = document.createElement("div");
  layer.id = "lsswp-layer";
  layer.innerHTML = '<div class="wp-modal" data-ref="dialog" hidden></div><div class="wp-bridge-pill" data-ref="bridgePill" hidden><i></i><span>Wachenplaner-Webseite verbunden</span></div><div class="wp-toast" data-ref="toast" role="status" aria-live="polite"></div>';
  document.body.appendChild(layer);
  layer.addEventListener("click", handleDialogClick);
  layer.addEventListener("input", (event) => {
    if (!event.target.closest('[data-ref="dialog"]')) return;
    readBuildInputs();
    // Anderer Gebäudetyp → passende Zusatzfelder (z. B. Startfahrzeug) einblenden.
    if (event.target.matches('[data-field="type"]')) renderDialog();
  });
  layer.addEventListener("toggle", (event) => {
    if (state.dialog && event.target.matches?.(".wp-more")) state.dialog.moreOpen = event.target.open;
  }, true);
  layer.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") event.stopPropagation();
  });

  const launcher = document.createElement("button");
  launcher.id = "lsswp-launcher";
  launcher.type = "button";
  launcher.title = "Wachenplaner Österreich öffnen";
  launcher.setAttribute("aria-label", "Wachenplaner Österreich öffnen");
  launcher.innerHTML = '<svg class="wp-launcher-glyph" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill-rule="evenodd" d="M12 2a7.5 7.5 0 0 0-7.5 7.5c0 5.3 6.2 11.4 6.9 12a.9.9 0 0 0 1.2 0c.7-.6 6.9-6.7 6.9-12A7.5 7.5 0 0 0 12 2Zm-.9 4.2h1.8v2.4h2.4v1.8h-2.4v2.4h-1.8v-2.4H8.7V8.6h2.4Z"/></svg><span>Wachenplaner</span>';
  launcher.addEventListener("click", open);
  // Das Symbol gehört nur in die Navigationsleiste der Hauptseite. Unterseiten wie
  // /buildings/… oder /vehicles/…/zuweisung haben eine andere Leiste (oder keine).
  if (location.pathname === "/" || globalThis.LSS_TEST_PAGE) mountLauncher();

  applyTheme();
  // LSS ändert Klassen und Stile an <html>/<body> häufig; die Theme-Erkennung
  // läuft deshalb höchstens einmal pro Frame.
  // Eigene Klassen (auch die der LSS Verwaltung) und Leaflets Zieh-Klasse ändern das Theme nicht und
  // lösen keine erneute, teure Stilberechnung aus.
  let themeFrame = 0;
  const ownClasses = /\b(?:lsswp-open|lssfo-open|lssfo-standalone|leaflet-dragging)\b/g;
  const themeObserver = new MutationObserver((mutations) => {
    const relevant = mutations.some((mutation) => mutation.attributeName !== "class"
      || String(mutation.oldValue || "").replace(ownClasses, "").trim() !== String(mutation.target.getAttribute("class") || "").replace(ownClasses, "").trim());
    if (!relevant || themeFrame) return;
    themeFrame = requestAnimationFrame(() => {
      themeFrame = 0;
      applyTheme();
    });
  });
  const themeAttributes = { attributes: true, attributeOldValue: true, attributeFilter: ["class", "style", "data-theme", "data-bs-theme"] };
  themeObserver.observe(document.documentElement, themeAttributes);
  themeObserver.observe(document.body, themeAttributes);
  window.matchMedia?.("(prefers-color-scheme: dark)").addEventListener?.("change", applyTheme);

  // In der Capture-Phase, damit Esc nur die oberste Ebene schließt und nicht
  // zusätzlich Fenster anderer LSS-Scripts darunter.
  window.addEventListener("keydown", (event) => {
    if (event.key !== "Escape" || (!state.dialog && !state.open)) return;
    event.stopPropagation();
    if (state.dialog) closeDialog();
    else close();
  }, true);

  const bridgeOpener = detectBridgeOpener();
  // LSS Verwaltung 1.2.0 bringt dieselbe Webseiten-Brücke mit (#lssfo-planner).
  // Ist sie installiert, übernimmt sie die Brücke, damit nichts doppelt erscheint.
  if (bridgeOpener) {
    setTimeout(() => {
      if (document.getElementById("lssfo-planner")) return;
      layer.querySelector('[data-ref="bridgePill"]').hidden = false;
      window.addEventListener("message", handleBridgeMessage);
      postToBridge({ type: "lssfo-ready" });
    }, 1000);
  }
  if (new URLSearchParams(location.search).get("lsswp") === "open") setTimeout(open, 0);

  /* ---------- Allgemeine Hilfsfunktionen ---------- */

  function loadSettings() {
    try {
      const raw = typeof GM_getValue === "function" ? GM_getValue(SETTINGS_KEY, "{}") : localStorage.getItem(SETTINGS_KEY);
      return JSON.parse(raw || "{}") || {};
    } catch {
      return {};
    }
  }

  // Neu hinzugekommene Klassen (z. B. Krankenhäuser) sind auch bei gespeicherten Einstellungen sichtbar.
  function initialEnabled() {
    if (!Array.isArray(settings.enabled)) return new Set(CLASS_KEYS);
    const known = Array.isArray(settings.known) ? settings.known : CLASS_KEYS.filter((key) => !["hospital", "police", "police-special"].includes(key));
    return new Set([...settings.enabled.filter((key) => CLASS_META[key]), ...CLASS_KEYS.filter((key) => !known.includes(key))]);
  }

  function saveSettings() {
    const value = JSON.stringify({ enabled: [...state.enabled], known: CLASS_KEYS, status: state.status, radius: state.radius, effects: state.effects });
    try {
      if (typeof GM_setValue === "function") GM_setValue(SETTINGS_KEY, value);
      else localStorage.setItem(SETTINGS_KEY, value);
    } catch { /* Einstellungen gelten dann nur für diese Sitzung. */ }
  }

  function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[char]);
  }

  function formatNumber(value) {
    return Number(value || 0).toLocaleString("de-AT");
  }

  function formatDistance(meters) {
    return meters < 1000 ? `${Math.round(meters)} m` : `${(meters / 1000).toLocaleString("de-AT", { maximumFractionDigits: 1 })} km`;
  }

  function haversine(lat1, lon1, lat2, lon2) {
    if (![lat1, lon1, lat2, lon2].every(Number.isFinite)) return NaN;
    const rad = Math.PI / 180;
    const a = Math.sin(((lat2 - lat1) * rad) / 2) ** 2 + Math.cos(lat1 * rad) * Math.cos(lat2 * rad) * Math.sin(((lon2 - lon1) * rad) / 2) ** 2;
    return 12742000 * Math.asin(Math.sqrt(a));
  }

  function isPhone() {
    return window.matchMedia("(max-width: 760px)").matches;
  }

  function icon(name) {
    const paths = {
      pin: '<path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.5"/>',
      close: '<path d="m6 6 12 12M18 6 6 18"/>',
      search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
      plus: '<path d="M12 5v14M5 12h14"/>',
      minus: '<path d="M5 12h14"/>',
      home: '<path d="M3 11.5 12 4l9 7.5M5.5 9.5V20h13V9.5"/>',
      building: '<path d="M4 21V7l8-4 8 4v14"/><path d="M8 10h2m4 0h2m-8 4h2m4 0h2M9 21v-4h6v4"/>',
      map: '<path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3V6Z"/><path d="M9 3v15m6-12v15"/>',
      check: '<path d="m5 12 5 5 9-10"/>',
      alert: '<path d="M10.3 4.4 2.5 18a2 2 0 0 0 1.7 3h15.6a2 2 0 0 0 1.7-3L13.7 4.4a2 2 0 0 0-3.4 0Z"/><path d="M12 9v4m0 4h.01"/>',
      info: '<circle cx="12" cy="12" r="9"/><path d="M12 8v5M12 16h.01"/>',
      external: '<path d="M14 4h6v6M20 4l-9 9"/><path d="M18 13v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h6"/>',
    };
    return `<svg class="wp-svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${paths[name] || paths.pin}</svg>`;
  }

  function toast(message) {
    const element = layer.querySelector('[data-ref="toast"]');
    element.textContent = message;
    element.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => element.classList.remove("is-visible"), 3600);
  }

  // Folgt dem hellen bzw. dunklen Design von Leitstellenspiel.
  function detectTheme() {
    const marks = `${document.documentElement.dataset.theme || ""} ${document.documentElement.dataset.bsTheme || ""} ${document.body.dataset.theme || ""} ${document.body.dataset.bsTheme || ""}`;
    if (/dark/i.test(marks) || document.documentElement.classList.contains("dark") || document.body.classList.contains("dark")) return "dark";
    const color = getComputedStyle(document.body).backgroundColor.match(/[\d.]+/g)?.slice(0, 3).map(Number);
    if (color?.length === 3 && (color[0] * 0.299 + color[1] * 0.587 + color[2] * 0.114) < 105) return "dark";
    return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function applyTheme() {
    const theme = detectTheme();
    const lite = state.effects === "reduced" || (state.effects === "auto" && isLowEndDevice());
    layer.dataset.theme = theme;
    layer.classList.toggle("wp-lite", lite);
    if (root) {
      root.dataset.theme = theme;
      root.classList.toggle("wp-lite", lite);
    }
  }

  // Schwächere Geräte: wenige Kerne, wenig Speicher oder ausdrücklich
  // gewünschte reduzierte Transparenz im Betriebssystem.
  function isLowEndDevice() {
    return (navigator.hardwareConcurrency || 8) <= 4
      || (navigator.deviceMemory || 8) <= 4
      || Boolean(window.matchMedia?.("(prefers-reduced-transparency: reduce)").matches);
  }

  function mountLauncher(attempt = 0) {
    const navRoots = [...document.querySelectorAll("nav, header, .navbar, #navbar-main-collapse, #navbar-collapse")];
    const forumLink = navRoots.flatMap((navRoot) => [...navRoot.querySelectorAll("a")]).find((anchor) => {
      const label = `${anchor.textContent || ""} ${anchor.title || ""} ${anchor.getAttribute("aria-label") || ""}`;
      return /forum/i.test(label) || /forum/i.test(anchor.href || "");
    });
    // Neben der LSS Verwaltung einreihen, falls diese ebenfalls installiert ist.
    const reference = document.getElementById("lssfo-launcher-host") || forumLink?.closest("li.dropdown") || forumLink?.closest("li") || forumLink;
    const parent = reference?.parentElement || document.querySelector("#navbar-main-collapse .navbar-right, #navbar-collapse .navbar-right, nav .navbar-right, .navbar .navbar-nav");
    if (parent) {
      const host = document.getElementById("lsswp-launcher-host") || document.createElement(parent.tagName === "UL" || parent.tagName === "OL" ? "li" : "span");
      host.id = "lsswp-launcher-host";
      if (reference?.parentElement === parent) reference.insertAdjacentElement("afterend", host);
      else parent.appendChild(host);
      host.appendChild(launcher);
      return;
    }
    // Kein schwebender Ersatzknopf: lieber warten, bis die Leiste da ist.
    if (attempt < 40) setTimeout(() => mountLauncher(attempt + 1), 250);
  }

  async function fetchJson(url) {
    if (/^https?:/.test(url) && typeof GM_xmlhttpRequest === "function") {
      return new Promise((resolve, reject) => {
        GM_xmlhttpRequest({
          method: "GET",
          url,
          responseType: "json",
          timeout: 20000,
          anonymous: true,
          onload: (response) => {
            if (response.status < 200 || response.status >= 300) {
              reject(new Error(`${response.status} ${response.statusText || "Fehler"}`));
              return;
            }
            try {
              resolve(response.response ?? JSON.parse(response.responseText));
            } catch (error) {
              reject(new Error(`Ungültige Antwort: ${error.message}`));
            }
          },
          ontimeout: () => reject(new Error("Zeitüberschreitung")),
          onerror: () => reject(new Error("Netzwerkfehler")),
        });
      });
    }
    const response = await fetch(url, { credentials: /^https?:/.test(url) ? "omit" : "include", headers: { Accept: "application/json" } });
    if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
    return response.json();
  }

  async function fetchPage(url) {
    const response = await fetch(url, { credentials: "include", headers: { Accept: "text/html" } });
    if (!response.ok) throw new Error(`${response.status} ${response.statusText} (${url})`);
    return response.text();
  }

  async function fetchBuildings() {
    const result = await fetchJson(`/api/buildings?_=${Date.now()}`);
    return Array.isArray(result) ? result : result?.result || [];
  }

  /* ---------- Planer öffnen und schließen ---------- */

  function open() {
    clearTimeout(closeTimer);
    if (!root && !create()) return;
    state.open = true;
    // Theme bestimmen, solange der Planer noch verborgen ist – sonst erzwingt das
    // Auslesen der Seitenfarbe eine Stilberechnung für tausende neue Elemente.
    applyTheme();
    root.hidden = false;
    root.classList.remove("is-closing");
    document.documentElement.classList.add("lsswp-open");
    requestAnimationFrame(() => map.invalidateSize({ pan: false }));
    if (!state.loading && Date.now() - state.syncedAt > 60000) void sync(false);
  }

  function close() {
    if (!state.open) return;
    state.open = false;
    map?.closePopup();
    root.classList.add("is-closing");
    document.documentElement.classList.remove("lsswp-open");
    closeTimer = setTimeout(() => {
      if (state.open) return;
      root.hidden = true;
      root.classList.remove("is-closing");
    }, 240);
  }

  function create() {
    const Leaflet = globalThis.L;
    if (!Leaflet?.markerClusterGroup || typeof globalThis.LSSPlannerData !== "function") {
      toast("Der Wachenplaner konnte nicht geladen werden (Kartenbibliothek fehlt). Bitte die Seite neu laden.");
      return false;
    }
    root = document.createElement("div");
    root.id = "lsswp";
    root.hidden = true;
    root.innerHTML = template();
    document.body.appendChild(root);

    map = Leaflet.map(ref("map"), {
      zoomControl: false,
      minZoom: isPhone() ? 5 : 7,
      maxBounds: [[45.3, 8.1], [50.2, 18.5]],
      maxBoundsViscosity: 0.7,
    });
    // Ganzzahlige Zoomstufen halten die Kacheln unskaliert; der Puffer lädt
    // Nachbarkacheln vor, damit beim Verschieben keine leeren Flächen entstehen.
    Leaflet.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}", {
      maxZoom: 19,
      keepBuffer: 4,
      updateWhenZooming: false,
      attribution: 'Basemap &copy; Esri · Standorte: <a href="https://www.bev.gv.at/" target="_blank" rel="noopener">BEV</a> (CC BY 4.0), BMI, BMASGPK, teils &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OSM</a>',
    }).addTo(map);
    clusters = Leaflet.markerClusterGroup({
      showCoverageOnHover: false,
      maxClusterRadius: 48,
      spiderfyOnMaxZoom: true,
      disableClusteringAtZoom: 15,
      chunkedLoading: true,
      removeOutsideVisibleBounds: true,
      iconCreateFunction: clusterIcon,
    });
    map.addLayer(clusters);

    const data = globalThis.LSSPlannerData();
    dataVersion = data.version;
    for (const row of data.stations) addStation(row, data);

    ref("orgs").innerHTML = CLASS_KEYS.map((key) => {
      const meta = CLASS_META[key];
      return `<label class="wp-org"><span class="wp-glyph" style="background:${meta.color}">${meta.short}</span><span><strong>${escapeHtml(meta.label)}</strong><small>${escapeHtml(meta.hint)}</small></span><output data-count="${key}">0</output><input class="wp-switch" type="checkbox" value="${key}"${state.enabled.has(key) ? " checked" : ""}></label>`;
    }).join("");
    const states = [...new Set(records.map((record) => record.stateName))].sort((a, b) => a.localeCompare(b, "de-AT"));
    ref("state").insertAdjacentHTML("beforeend", states.map((name) => `<option value="${escapeHtml(name)}">${escapeHtml(name)}</option>`).join(""));
    ref("radius").value = state.radius;
    ref("radiusLabel").textContent = formatDistance(state.radius);
    updateSelectAllLabel();

    setupSegmented(ref("views"), (button) => {
      for (const panel of root.querySelectorAll("[data-panel]")) panel.classList.toggle("is-active", panel.dataset.panel === button.dataset.view);
      if (isPhone()) ref("sheet").classList.add("is-expanded");
    });
    selectStatus = setupSegmented(ref("status"), (button) => setBuildStatus(button.dataset.status));
    bindEvents();
    showAustria(false);
    updateStatusAvailability();
    refreshMarkers();
    renderSync();
    setLoadState(`${formatNumber(records.length)} amtliche Standorte · ${dataVersion}`);
    return true;
  }

  function template() {
    return `
      <div class="wp-map" data-ref="map" aria-label="Karte der Feuerwehr- und Rettungsstandorte"></div>
      <aside class="wp-sheet wp-glass" data-ref="sheet" aria-label="Wachenplaner">
        <button class="wp-handle" type="button" data-action="toggle-sheet" aria-label="Bereich ein- oder ausklappen"><span></span></button>
        <header class="wp-head">
          <span class="wp-app-icon" aria-hidden="true"><i></i><i></i><i></i></span>
          <div><h1>Wachenplaner</h1><p>Einsatzstandorte · Österreich</p></div>
          <button class="wp-icon-button" type="button" data-action="close" aria-label="Wachenplaner schließen">${icon("close")}</button>
        </header>
        <form class="wp-search" data-ref="searchForm" role="search">
          ${icon("search")}
          <input data-ref="search" type="search" placeholder="Ort oder Adresse suchen" autocomplete="off" enterkeyhint="search" aria-label="Ort oder Adresse suchen">
        </form>
        <div class="wp-segmented" data-ref="views" role="tablist">
          <span class="wp-thumb" aria-hidden="true"></span>
          <button type="button" class="is-active" data-view="filters">Filter</button>
          <button type="button" data-view="missing">Noch nicht gebaut <b data-ref="missingBadge" hidden>0</b></button>
        </div>
        <div class="wp-scroll">
          <section class="wp-view is-active" data-panel="filters">
            <div class="wp-card wp-sync">
              <div class="wp-sync-head">
                <span class="wp-sync-dot" data-ref="syncDot"></span>
                <div><strong data-ref="syncTitle">Gebäude werden geladen …</strong><small data-ref="syncHint"></small></div>
              </div>
              <button class="wp-button primary wide" type="button" data-action="sync" data-ref="syncButton">Mit meinen Gebäuden abgleichen</button>
              <label class="wp-range">
                <span>Als gebaut gilt eine Wache im Umkreis von <b data-ref="radiusLabel">300 m</b></span>
                <input data-ref="radius" type="range" min="100" max="1500" step="50" value="300">
              </label>
            </div>
            <div class="wp-group">Status</div>
            <div class="wp-segmented small" data-ref="status">
              <span class="wp-thumb" aria-hidden="true"></span>
              <button type="button" class="is-active" data-status="all">Alle</button>
              <button type="button" data-status="missing">Fehlt</button>
              <button type="button" data-status="built">Gebaut</button>
            </div>
            <div class="wp-group">Gebiet <button class="wp-link" type="button" data-action="clear-area">Zurücksetzen</button></div>
            <div class="wp-card wp-list">
              <label class="wp-select"><span>Bundesland</span><select data-ref="state"><option value="">Alle</option></select></label>
              <label class="wp-select"><span>Bezirk</span><select data-ref="district" disabled><option value="">Alle</option></select></label>
            </div>
            <div class="wp-group">Organisationen <button class="wp-link" type="button" data-action="select-all" data-ref="selectAll">Alle aus</button></div>
            <div class="wp-card wp-list" data-ref="orgs"></div>
            <div class="wp-group">Darstellung</div>
            <div class="wp-card wp-list">
              <label class="wp-select"><span>Effekte</span><select data-ref="effects"><option value="auto">Automatisch</option><option value="full">Voll</option><option value="reduced">Sparsam</option></select></label>
            </div>
            <p class="wp-footnote">„Sparsam“ schaltet Glas-Unschärfe und Animationen ab und entlastet schwächere Rechner. „Automatisch“ wählt das selbst.</p>
          </section>
          <section class="wp-view" data-panel="missing">
            <div class="wp-missing-head"><strong data-ref="missingTitle">Noch nicht abgeglichen</strong><small data-ref="missingHint"></small></div>
            <div class="wp-coverage" data-ref="coverage" hidden><div class="wp-bar"><span data-ref="coverageBar"></span></div><small data-ref="coverageText"></small></div>
            <ul class="wp-missing" data-ref="missingList"></ul>
            <button class="wp-button ghost wide" type="button" data-action="more" data-ref="more" hidden>Mehr anzeigen</button>
          </section>
        </div>
        <footer class="wp-foot"><span class="wp-dot" data-ref="loadDot"></span><span data-ref="loadState">Karte wird vorbereitet …</span></footer>
      </aside>
      <div class="wp-controls">
        <button class="wp-icon-button wp-glass" type="button" data-action="zoom-in" aria-label="Hineinzoomen">${icon("plus")}</button>
        <button class="wp-icon-button wp-glass" type="button" data-action="zoom-out" aria-label="Herauszoomen">${icon("minus")}</button>
        <button class="wp-icon-button wp-glass" type="button" data-action="home" aria-label="Ganz Österreich anzeigen">${icon("home")}</button>
      </div>
      <label class="wp-map-switch wp-glass" data-ref="hideBuiltControl" hidden><span>Nur fehlende</span><input class="wp-switch" data-ref="hideBuilt" type="checkbox" aria-label="Gebaute Wachen ausblenden"></label>
      <div class="wp-pill wp-glass" aria-live="polite"><span><strong data-ref="visibleCount">0</strong> sichtbar</span><span class="wp-pill-missing" data-ref="pillMissing" hidden><i></i><strong data-ref="visibleMissing">0</strong> fehlen</span></div>`;
  }

  function ref(name) {
    return root.querySelector(`[data-ref="${name}"]`);
  }

  function setLoadState(message, type = "ready") {
    ref("loadDot").className = `wp-dot ${type}`;
    ref("loadState").textContent = message;
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

  function suggestedName(record) {
    const prefix = CLASS_META[record.className].prefix;
    if (record.className === "fire-other" && /betriebsfeuerwehr/i.test(record.operator)) return `BtF ${record.name}`;
    if (!prefix || new RegExp(`^${prefix}\\b|feuerwehr|rotes kreuz|johanniter|samariter`, "i").test(record.name)) return record.name;
    return `${prefix} ${record.name}`;
  }

  /* ---------- Standorte und Marker ---------- */

  function addStation(row, data) {
    const [id, lat, lon, classIndex, districtId, name, operator, street, houseNumber, postcode, city] = row;
    const className = data.classes[classIndex] || "rescue-other";
    const [stateName = "Nicht zugeordnet", districtName = "Nicht zugeordnet"] = data.regions[String(districtId)] || [];
    const record = {
      key: `bev-${id}`,
      className,
      kind: CLASS_META[className].kind,
      name: name || operator || KIND_META[CLASS_META[className].kind].label,
      operator,
      address: [[street, houseNumber].filter(Boolean).join(" "), [postcode, city].filter(Boolean).join(" ")].filter(Boolean).join(", "),
      districtId: String(districtId || ""),
      districtName,
      stateName,
      lat,
      lon,
      match: null,
    };
    record.marker = globalThis.L.marker([lat, lon], { icon: stationIcon(record), title: record.name, riseOnHover: true });
    record.marker.record = record;
    record.marker.bindPopup(() => popupContent(record), { maxWidth: 320, autoPanPaddingTopLeft: globalThis.L.point(isPhone() ? 20 : 400, 20) });
    records.push(record);
    recordsByKey.set(record.key, record);
  }

  const iconCache = new Map();
  function stationIcon(record) {
    const status = state.syncedAt ? (record.match ? "is-built" : "is-missing") : "";
    const key = `${record.className}:${status}`;
    if (!iconCache.has(key)) {
      const meta = CLASS_META[record.className];
      iconCache.set(key, globalThis.L.divIcon({
        className: "wp-station",
        html: `<div class="wp-pin ${status}" style="--c:${meta.color}">${meta.short}</div>`,
        iconSize: [30, 36],
        iconAnchor: [15, 36],
        popupAnchor: [0, -34],
      }));
    }
    return iconCache.get(key);
  }

  function clusterIcon(cluster) {
    const markers = cluster.getAllChildMarkers();
    const count = markers.length;
    const size = count < 10 ? 36 : count < 100 ? 42 : count < 1000 ? 50 : 58;
    let ring = "rgba(255,255,255,.92)";
    if (state.syncedAt) {
      const built = markers.reduce((sum, marker) => sum + (marker.record.match ? 1 : 0), 0);
      ring = `conic-gradient(#34c759 0 ${(built / count) * 360}deg, #ff3b30 0)`;
    }
    return globalThis.L.divIcon({
      className: "wp-cluster-icon",
      html: `<div class="wp-cluster" style="--ring:${ring}"><span>${count >= 1000 ? `${(count / 1000).toFixed(1)}k` : count}</span></div>`,
      iconSize: [size, size],
    });
  }

  function popupContent(record) {
    const meta = CLASS_META[record.className];
    const element = document.createElement("article");
    element.className = "wp-popup";
    let status = "";
    if (record.match) {
      status = `<div class="wp-popup-status built">${icon("check")}<span>Gebaut: <b>${escapeHtml(record.match.building.caption)}</b> · ${formatDistance(record.match.distance)}</span></div>`;
    } else if (state.syncedAt) {
      status = `<div class="wp-popup-status missing">${icon("info")}<span>Noch nicht gebaut</span></div>`;
    }
    element.innerHTML = `
      <header><span class="wp-popup-glyph" style="background:${meta.color}">${meta.short}</span><div><p>${escapeHtml(meta.label)}</p><h3>${escapeHtml(record.name)}</h3></div></header>
      ${status}
      <dl>
        <div><dt>Adresse</dt><dd>${escapeHtml(record.address || "Keine Adresse hinterlegt")}</dd></div>
        <div><dt>Gebiet</dt><dd>${escapeHtml(`${record.districtName}, ${record.stateName}`)}</dd></div>
        <div><dt>Im Spiel</dt><dd>${escapeHtml(meta.game)}</dd></div>
      </dl>
      <div class="wp-popup-actions">
        <button class="wp-button ${record.match ? "ghost" : "primary"} wide" type="button" data-action="build" data-key="${escapeHtml(record.key)}">${record.match ? "Trotzdem zusätzlich bauen" : `${KIND_META[record.kind].label} bauen`}</button>
        <div><button class="wp-button ghost" type="button" data-action="copy" data-key="${escapeHtml(record.key)}">Koordinaten kopieren</button><a class="wp-button ghost" href="https://www.openstreetmap.org/?mlat=${record.lat}&mlon=${record.lon}#map=17/${record.lat}/${record.lon}" target="_blank" rel="noopener">Karte ↗</a></div>
      </div>`;
    return element;
  }

  /* ---------- Abgleich mit den eigenen Gebäuden ---------- */

  function buildingKinds(type) {
    if (FIRE_TYPES.has(type)) return ["fire"];
    if (RESCUE_TYPES.has(type)) return ["rescue"];
    if (COMPLEX_TYPES.has(type)) return ["fire", "rescue"];
    if (HOSPITAL_TYPES.has(type)) return ["hospital"];
    if (POLICE_TYPES.has(type)) return ["police"];
    return [];
  }

  function normalizeBuildings(list) {
    return (Array.isArray(list) ? list : []).map((building) => ({
      id: Number(building.id),
      caption: String(building.caption ?? ""),
      type: Number(building.building_type),
      lat: Number(building.latitude),
      lon: Number(building.longitude),
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

  async function sync(manual) {
    if (state.loading) return;
    state.loading = true;
    renderSync();
    setLoadState("Eigene Gebäude werden geladen …", "loading");
    try {
      state.buildings = normalizeBuildings(await fetchBuildings());
      state.syncedAt = Date.now();
      matchStations();
      updateStatusAvailability();
      refreshMarkers();
      setLoadState(`${formatNumber(records.length)} amtliche Standorte · ${dataVersion}`);
      if (manual) toast(`${formatNumber(state.buildings.length)} Gebäude abgeglichen · ${formatNumber(records.filter((record) => !record.match).length)} Standorte fehlen noch`);
    } catch (error) {
      setLoadState(`Gebäude konnten nicht geladen werden: ${error.message}`, "error");
    } finally {
      state.loading = false;
      renderSync();
    }
  }

  function onBuildingBuilt(building) {
    if (!root || !state.syncedAt) return;
    const [normalized] = normalizeBuildings([building]);
    if (!normalized || state.buildings.some((entry) => entry.id === normalized.id)) return;
    state.buildings = [...state.buildings, normalized];
    matchStations();
    refreshMarkers();
    renderSync();
  }

  function renderSync() {
    const synced = Boolean(state.syncedAt);
    ref("syncDot").className = `wp-sync-dot${state.loading ? " is-waiting" : synced ? " is-connected" : ""}`;
    ref("syncButton").disabled = state.loading;
    ref("syncButton").textContent = state.loading ? "Wird abgeglichen …" : synced ? "Erneut abgleichen" : "Mit meinen Gebäuden abgleichen";
    if (state.loading && !synced) {
      ref("syncTitle").textContent = "Gebäude werden geladen …";
      ref("syncHint").textContent = "Deine Wachen werden mit den echten Standorten verglichen.";
    } else if (synced) {
      const built = records.filter((record) => record.match).length;
      ref("syncTitle").textContent = `${formatNumber(built)} von ${formatNumber(records.length)} Standorten gebaut`;
      ref("syncHint").textContent = `${formatNumber(state.buildings.length)} eigene Gebäude · Stand ${new Date(state.syncedAt).toLocaleTimeString("de-AT", { hour: "2-digit", minute: "2-digit" })} Uhr`;
    } else {
      ref("syncTitle").textContent = "Noch nicht abgeglichen";
      ref("syncHint").textContent = "Gleiche deine Wachen ab, um zu sehen, was noch fehlt.";
    }
  }

  /* ---------- Filter ---------- */

  function matchesStatus(record) {
    if (!state.syncedAt) return true;
    if (state.status === "missing") return !record.match;
    if (state.status === "built") return Boolean(record.match);
    return true;
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
    for (const record of regionRecords) {
      if (bounds.contains([record.lat, record.lon])) counts[record.className] += 1;
    }
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

  // Status-Filter in der Seitenleiste und Kartenschalter „Nur fehlende“ teilen
  // sich denselben Zustand.
  function setBuildStatus(status, refresh = true) {
    state.status = status;
    const buttons = [...ref("status").querySelectorAll("button")];
    selectStatus(Math.max(0, buttons.findIndex((button) => button.dataset.status === status)));
    ref("hideBuilt").checked = status === "missing";
    saveSettings();
    if (refresh) refreshMarkers();
  }

  function updateStatusAvailability() {
    const synced = Boolean(state.syncedAt);
    for (const button of ref("status").querySelectorAll("button")) button.disabled = !synced && button.dataset.status !== "all";
    ref("hideBuiltControl").hidden = !synced;
    if (synced) setBuildStatus(state.status, false);
    else {
      selectStatus(0);
      ref("hideBuilt").checked = false;
    }
  }

  function renderMissing() {
    const list = ref("missingList");
    const more = ref("more");
    const synced = Boolean(state.syncedAt);
    const scope = regionRecords.filter((record) => state.enabled.has(record.className));
    const missing = scope.filter((record) => !record.match)
      .sort((a, b) => a.stateName.localeCompare(b.stateName, "de-AT")
        || a.districtName.localeCompare(b.districtName, "de-AT")
        || CLASS_KEYS.indexOf(a.className) - CLASS_KEYS.indexOf(b.className)
        || a.name.localeCompare(b.name, "de-AT"));
    const badge = ref("missingBadge");
    badge.hidden = !synced || !missing.length;
    badge.textContent = missing.length >= 1000 ? `${(missing.length / 1000).toLocaleString("de-AT", { maximumFractionDigits: 1 })}k` : missing.length;
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
    ref("missingTitle").textContent = `${formatNumber(missing.length)} fehlen in ${area}`;
    ref("missingHint").textContent = "Tippe auf eine Wache, um sie auf der Karte zu sehen.";
    ref("coverageBar").style.width = `${scope.length ? (built / scope.length) * 100 : 0}%`;
    ref("coverageText").textContent = `${formatNumber(built)} von ${formatNumber(scope.length)} gebaut (${scope.length ? Math.round((built / scope.length) * 100) : 0} %)`;
    if (!missing.length) {
      list.innerHTML = '<li class="wp-empty"><strong>Alles gebaut 🎉</strong>In diesem Gebiet fehlt kein Standort der gewählten Organisationen.</li>';
      more.hidden = true;
      return;
    }
    const visible = missing.slice(0, state.missingLimit);
    list.innerHTML = visible.map((record, index) => {
      const meta = CLASS_META[record.className];
      return `<li class="wp-missing-item" style="--i:${Math.min(index, 20)}">
        <span class="wp-glyph" style="background:${meta.color}">${meta.short}</span>
        <button class="wp-missing-main" type="button" data-action="focus" data-key="${escapeHtml(record.key)}"><strong>${escapeHtml(record.name)}</strong><small>${escapeHtml(record.districtName)} · ${escapeHtml(meta.label)}</small></button>
        <button class="wp-button ghost small" type="button" data-action="build" data-key="${escapeHtml(record.key)}">Bauen</button>
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
    const districts = [...new Map(records.filter((record) => record.stateName === stateValue).map((record) => [record.districtId, record.districtName]))]
      .sort((a, b) => a[1].localeCompare(b[1], "de-AT"));
    districtSelect.innerHTML = '<option value="">Alle</option>' + districts.map(([id, name]) => `<option value="${escapeHtml(id)}">${escapeHtml(name)}</option>`).join("");
    districtSelect.disabled = false;
    if (districts.some(([id]) => id === current)) districtSelect.value = current;
  }

  function focusArea(maxZoom) {
    if (!regionRecords.length) return;
    map.flyToBounds(globalThis.L.latLngBounds(regionRecords.map((record) => [record.lat, record.lon])), { ...mapPadding(), maxZoom, duration: 0.8 });
  }

  function focusRecord(record) {
    if (!activeRecords.includes(record)) setBuildStatus("all");
    if (isPhone()) ref("sheet").classList.remove("is-expanded");
    clusters.zoomToShowLayer(record.marker, () => {
      map.flyTo([record.lat, record.lon], Math.max(map.getZoom(), 15), { duration: 0.6 });
      map.once("moveend", () => record.marker.openPopup());
    });
  }

  function updateSelectAllLabel() {
    ref("selectAll").textContent = state.enabled.size ? "Alle aus" : "Alle an";
  }

  function stationForBuild(record) {
    return {
      key: record.key,
      name: suggestedName(record),
      lat: record.lat,
      lon: record.lon,
      kind: record.kind,
      label: CLASS_META[record.className].label,
      address: record.address,
      district: record.districtName,
    };
  }

  function setupSegmented(container, onSelect) {
    const buttons = [...container.querySelectorAll("button")];
    container.style.setProperty("--count", buttons.length);
    const select = (index) => {
      buttons.forEach((button, buttonIndex) => button.classList.toggle("is-active", buttonIndex === index));
      container.style.setProperty("--index", index);
    };
    buttons.forEach((button, index) => button.addEventListener("click", () => {
      if (button.disabled) return;
      select(index);
      onSelect(button, index);
    }));
    return select;
  }

  async function searchPlace(query) {
    setLoadState(`Suche nach „${query}“ …`, "loading");
    try {
      const url = `https://nominatim.openstreetmap.org/search?${new URLSearchParams({ q: query, format: "json", limit: "1", countrycodes: "at" })}`;
      const [result] = await fetchJson(url);
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

  function bindEvents() {
    root.addEventListener("click", async (event) => {
      const control = event.target.closest("[data-action]");
      if (!control || !root.contains(control)) return;
      const action = control.dataset.action;
      const record = control.dataset.key ? recordsByKey.get(control.dataset.key) : null;
      if (action === "close") close();
      if (action === "toggle-sheet") ref("sheet").classList.toggle("is-expanded");
      if (action === "sync") void sync(true);
      if (action === "zoom-in") map.zoomIn(1);
      if (action === "zoom-out") map.zoomOut(1);
      if (action === "home") showAustria();
      if (action === "more") {
        state.missingLimit += PAGE_SIZE;
        renderMissing();
      }
      if (action === "focus" && record) focusRecord(record);
      if (action === "build" && record) {
        map.closePopup();
        void openBuildDialog(stationForBuild(record));
      }
      if (action === "copy" && record) {
        try {
          await navigator.clipboard.writeText(`${record.lat.toFixed(6)}, ${record.lon.toFixed(6)}`);
          control.textContent = "Kopiert ✓";
        } catch {
          control.textContent = "Nicht möglich";
        }
      }
      if (action === "clear-area") {
        ref("state").value = "";
        updateDistrictOptions();
        refreshMarkers();
        showAustria();
      }
      if (action === "select-all") {
        const enable = state.enabled.size === 0;
        for (const input of ref("orgs").querySelectorAll(".wp-switch")) {
          input.checked = enable;
          if (enable) state.enabled.add(input.value);
          else state.enabled.delete(input.value);
        }
        updateSelectAllLabel();
        saveSettings();
        refreshMarkers();
      }
    });
    ref("orgs").addEventListener("change", (event) => {
      if (!event.target.matches(".wp-switch")) return;
      if (event.target.checked) state.enabled.add(event.target.value);
      else state.enabled.delete(event.target.value);
      updateSelectAllLabel();
      saveSettings();
      refreshMarkers();
    });
    ref("hideBuilt").addEventListener("change", (event) => setBuildStatus(event.target.checked ? "missing" : "all"));
    ref("effects").value = state.effects;
    ref("effects").addEventListener("change", (event) => {
      state.effects = event.target.value;
      saveSettings();
      applyTheme();
    });
    ref("state").addEventListener("change", () => {
      updateDistrictOptions();
      refreshMarkers();
      if (ref("state").value) focusArea(10);
      else showAustria();
    });
    ref("district").addEventListener("change", () => {
      refreshMarkers();
      focusArea(ref("district").value ? 12 : 10);
    });
    let radiusTimer = 0;
    ref("radius").addEventListener("input", (event) => {
      state.radius = Number(event.target.value);
      ref("radiusLabel").textContent = formatDistance(state.radius);
      clearTimeout(radiusTimer);
      radiusTimer = setTimeout(() => {
        saveSettings();
        if (!state.syncedAt) return;
        matchStations();
        refreshMarkers();
        renderSync();
      }, 180);
    });
    ref("searchForm").addEventListener("submit", (event) => {
      event.preventDefault();
      const query = ref("search").value.trim();
      ref("search").blur();
      if (query) void searchPlace(query);
    });
    ref("search").addEventListener("focus", () => {
      if (isPhone()) ref("sheet").classList.add("is-expanded");
    });
    // LSS reagiert auf Tastenkürzel im Spiel; Eingaben im Planer bleiben hier.
    root.addEventListener("keydown", (event) => {
      if (event.key !== "Escape") event.stopPropagation();
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
    map.on("movestart zoomstart", () => {
      clearTimeout(settleTimer);
      root.classList.add("is-moving");
    });
    map.on("moveend zoomend", () => {
      clearTimeout(settleTimer);
      settleTimer = setTimeout(() => root.classList.remove("is-moving"), 200);
    });
    window.addEventListener("resize", () => {
      if (state.open) map.invalidateSize();
    });
  }

  /* ---------- Bau-Dialog ---------- */

  async function openBuildDialog(station) {
    const lat = Number(station?.lat);
    const lon = Number(station?.lon);
    if (!Number.isFinite(lat) || !Number.isFinite(lon)) return;
    closeDialog();
    const build = {
      mode: "build",
      station: {
        key: String(station.key || ""),
        name: String(station.name || "Neue Wache").slice(0, 120),
        kind: KIND_META[station.kind] ? station.kind : "fire",
        label: String(station.label || ""),
        address: String(station.address || ""),
        district: String(station.district || ""),
      },
      lat,
      lon,
      originLat: lat,
      originLon: lon,
      name: String(station.name || "Neue Wache").slice(0, 120),
      loading: true,
      submitting: false,
      error: "",
      form: null,
      fields: {},
      typeOptions: [],
      typeValue: "",
      dispatchOptions: [],
      dispatchValue: "",
      extraSelects: [],
      submit: null,
      buildings: [],
      done: null,
    };
    state.dialog = build;
    renderDialog();
    const [formResult, buildingsResult] = await Promise.allSettled([fetchPage("/buildings/new"), fetchBuildings()]);
    if (state.dialog !== build) return;
    build.buildings = buildingsResult.status === "fulfilled" ? buildingsResult.value : [];
    if (formResult.status === "fulfilled") parseBuildForm(formResult.value, build);
    if (!build.form) build.error = build.error || "Das Bauformular des Spiels wurde nicht erkannt. Nutze „Im Spielformular öffnen“.";
    build.loading = false;
    renderDialog();
  }

  function parseBuildForm(html, build) {
    const doc = new DOMParser().parseFromString(html, "text/html");
    const form = doc.querySelector("form#new_building")
      || doc.querySelector('[name="building[latitude]"]')?.closest("form")
      || doc.querySelector('form[action$="/buildings"]');
    if (!form) return;
    const field = (name) => form.querySelector(`[name="building[${name}]"]`);
    const fields = { name: field("name"), type: field("building_type"), dispatch: field("leitstelle_building_id"), lat: field("latitude"), lon: field("longitude"), address: field("address") };
    if (!fields.lat || !fields.lon || !fields.type) return;
    // Gebaut wird ausschließlich mit Credits, nie mit Coins.
    const buttons = [...form.querySelectorAll('input[type="submit"], button[type="submit"], button:not([type])')];
    const buttonText = (button) => `${button.name} ${button.value} ${button.className} ${button.textContent}`.toLowerCase();
    const submit = buttons.find((button) => /credit/.test(buttonText(button)) && !/coin/.test(buttonText(button)))
      || buttons.find((button) => !/coin/.test(buttonText(button)))
      || null;
    if (buttons.length && !submit) {
      build.error = "Im Bauformular wurde kein Bau-Knopf für Credits erkannt.";
      return;
    }
    const options = (select) => select?.tagName === "SELECT" ? [...select.options].map((option) => ({ value: option.value, label: option.textContent.trim() })) : [];
    build.form = form;
    build.fields = fields;
    build.submit = submit;
    build.typeOptions = options(fields.type);
    const kindMeta = KIND_META[build.station.kind];
    const preferredType = build.typeOptions.find((option) => kindMeta.exact.test(option.label))
      || build.typeOptions.find((option) => option.value === kindMeta.type)
      || build.typeOptions.find((option) => kindMeta.pattern.test(option.label));
    build.typeValue = preferredType?.value ?? fields.type.value;
    build.dispatchOptions = options(fields.dispatch);
    const nearest = build.buildings
      .filter((building) => Number(building.building_type) === DISPATCH_TYPE)
      .map((building) => ({ building, distance: haversine(build.lat, build.lon, Number(building.latitude), Number(building.longitude)) }))
      .filter((entry) => Number.isFinite(entry.distance))
      .sort((a, b) => a.distance - b.distance)[0];
    build.dispatchValue = nearest && build.dispatchOptions.some((option) => option.value === String(nearest.building.id))
      ? String(nearest.building.id)
      : fields.dispatch?.value ?? "";
    build.extraSelects = [...form.querySelectorAll("select[name]")]
      .filter((select) => select !== fields.type && select !== fields.dispatch)
      .map((select) => ({
        name: select.name,
        label: (select.id && doc.querySelector(`label[for="${CSS.escape(select.id)}"]`)?.textContent.trim()) || select.closest(".form-group")?.querySelector("label")?.textContent.trim() || select.name,
        options: options(select),
        value: select.value,
        types: fieldBuildingTypes(select, form),
        hidden: hiddenInForm(select, form),
      }));
  }

  // Das Spielformular enthält z. B. je Wachentyp ein eigenes „Start Fahrzeug“-Feld
  // und blendet per Skript nur das passende ein. Die Zuordnung ergibt sich aus
  // Name, ID und Klassen des Feldes und seiner Umgebung.
  function fieldBuildingTypes(select, form) {
    const parts = [select.name, select.id];
    for (let node = select.parentElement; node && node !== form; node = node.parentElement) {
      parts.push(node.id, typeof node.className === "string" ? node.className : "", ...Object.values(node.dataset || {}));
    }
    const text = parts.join(" ").toLowerCase();
    const explicit = text.match(/building[_-]?type[_-]?(\d+)/);
    if (explicit) return [Number(explicit[1])];
    const small = /kleinwache|small/.test(text);
    if (/feuer|fire/.test(text)) return [small ? 18 : 0];
    if (/rettung|rescue|ambulance/.test(text)) return [small ? 20 : 2];
    if (/polizei|police/.test(text)) return [small ? 19 : 6];
    return null;
  }

  function hiddenInForm(select, form) {
    for (let node = select; node && node !== form; node = node.parentElement) {
      if (node.hidden || /display\s*:\s*none/i.test(node.getAttribute("style") || "") || /(?:^|\s)(?:hidden|d-none)(?:\s|$)/.test(typeof node.className === "string" ? node.className : "")) return true;
    }
    return false;
  }

  // Felder, die für den gewählten Gebäudetyp gelten. Nie zwei Felder mit derselben
  // Beschriftung gleichzeitig: passende Typzuordnung vor sichtbaren vor versteckten.
  function applicableExtras(build) {
    const type = Number(build.typeValue);
    const ranked = build.extraSelects
      .map((extra, index) => ({ extra, index, rank: extra.types ? 0 : extra.hidden ? 2 : 1 }))
      .filter(({ extra }) => !extra.types || extra.types.includes(type))
      .sort((a, b) => a.rank - b.rank || a.index - b.index);
    const labels = new Set();
    return ranked.filter(({ extra }) => {
      const label = extra.label.toLocaleLowerCase("de");
      if (labels.has(label)) return false;
      labels.add(label);
      return true;
    }).sort((a, b) => a.index - b.index);
  }

  function readBuildInputs() {
    const build = state.dialog;
    if (build?.mode !== "build") return;
    const element = layer.querySelector('[data-ref="dialog"]');
    const name = element.querySelector('[data-field="name"]');
    if (name) build.name = name.value;
    const type = element.querySelector('[data-field="type"]');
    if (type) build.typeValue = type.value;
    const dispatch = element.querySelector('[data-field="dispatch"]');
    if (dispatch) build.dispatchValue = dispatch.value;
    for (const select of element.querySelectorAll("[data-extra]")) {
      const extra = build.extraSelects[Number(select.dataset.extra)];
      if (extra) extra.value = select.value;
    }
  }

  function closeDialog() {
    const dialog = state.dialog;
    if (!dialog) return;
    dialog.resolve?.(false);
    dialog.map?.remove();
    state.dialog = null;
    const element = layer.querySelector('[data-ref="dialog"]');
    element.hidden = true;
    element.innerHTML = "";
  }

  function handleDialogClick(event) {
    const action = event.target.closest("[data-action]")?.dataset.action;
    const dialog = state.dialog;
    if (!action || !dialog) return;
    if (action === "consent-allow") {
      try { sessionStorage.setItem(BRIDGE_CONSENT_KEY, "1"); } catch { /* Zustimmung gilt nur für diese Anfrage. */ }
      const { resolve } = dialog;
      dialog.resolve = null;
      closeDialog();
      resolve(true);
    }
    if (action === "dialog-close" || action === "consent-deny") closeDialog();
    if (action === "build-submit") void submitBuild();
    if (action === "build-native") void openNativeBuildForm();
  }

  function buildingKindMatches(building, kind) {
    const type = Number(building.building_type);
    if (kind === "hospital") return HOSPITAL_TYPES.has(type);
    if (kind === "police") return POLICE_TYPES.has(type);
    return kind === "rescue" ? RESCUE_TYPES.has(type) : FIRE_TYPES.has(type);
  }

  function renderDialog() {
    const element = layer.querySelector('[data-ref="dialog"]');
    const dialog = state.dialog;
    if (!dialog) {
      element.hidden = true;
      return;
    }
    dialog.map?.remove();
    dialog.map = null;
    element.hidden = false;
    const closeAction = dialog.mode === "consent" ? "consent-deny" : "dialog-close";
    const header = (kicker, title, glyph) => `<header class="wp-dialog-head"><div class="wp-dialog-title">${glyph}<div><span>${escapeHtml(kicker)}</span><h2>${escapeHtml(title)}</h2></div></div><button type="button" class="wp-icon-button" data-action="${closeAction}" aria-label="Schließen">${icon("close")}</button></header>`;
    const wrap = (inner) => `<div class="wp-backdrop" data-action="${closeAction}"></div><aside class="wp-dialog" role="dialog" aria-modal="true">${inner}</aside>`;
    if (dialog.mode === "consent") {
      element.innerHTML = wrap(`${header("WACHENPLANER-WEBSEITE", "Abgleich erlauben?", `<span class="wp-dialog-icon" style="background:#007aff">${icon("map")}</span>`)}
        <div class="wp-dialog-body"><p class="wp-dialog-text">Die Wachenplaner-Webseite möchte deine Gebäude abgleichen. Übertragen werden nur <b>Name, Typ und Position</b> deiner Gebäude – an den Tab, der dieses Fenster geöffnet hat.</p>
        <div class="wp-dialog-actions"><button type="button" class="wp-button ghost" data-action="consent-deny">Ablehnen</button><button type="button" class="wp-button primary" data-action="consent-allow">Erlauben</button></div></div>`);
      return;
    }
    const station = dialog.station;
    const glyph = `<span class="wp-dialog-icon" style="background:${KIND_META[station.kind].color}">${icon("building")}</span>`;
    if (dialog.done) {
      element.innerHTML = wrap(`${header(KIND_META[station.kind].headline, dialog.done.caption || station.name, glyph)}
        <div class="wp-dialog-body wp-center"><div class="wp-success">${icon("check")}</div><p class="wp-dialog-text"><b>${escapeHtml(dialog.done.caption || station.name)}</b> wurde gebaut und ist im Wachenplaner als erledigt markiert.</p>
        <div class="wp-dialog-actions center"><a class="wp-button ghost" href="/buildings/${Number(dialog.done.id)}" target="_blank" rel="noopener">Wache öffnen ${icon("external")}</a><button type="button" class="wp-button primary" data-action="dialog-close">Fertig</button></div></div>`);
      return;
    }
    if (dialog.loading) {
      element.innerHTML = wrap(`${header("WACHE BAUEN", station.name, glyph)}<div class="wp-dialog-body"><div class="wp-loading"><span class="wp-spinner"></span> Bauformular wird geladen …</div></div>`);
      return;
    }
    const nearby = dialog.buildings
      .filter((building) => buildingKindMatches(building, station.kind))
      .map((building) => ({ building, distance: haversine(dialog.lat, dialog.lon, Number(building.latitude), Number(building.longitude)) }))
      .filter((entry) => entry.distance <= 400)
      .sort((a, b) => a.distance - b.distance)[0];
    const selectHtml = (field, options, value, extra = "") => `<select ${field}${extra}>${options.map((option) => `<option value="${escapeHtml(option.value)}"${String(option.value) === String(value) ? " selected" : ""}>${escapeHtml(option.label || "–")}</option>`).join("")}</select>`;
    const typeField = dialog.typeOptions.length ? `<label class="wp-field">Gebäudetyp${selectHtml('data-field="type"', dialog.typeOptions, dialog.typeValue)}</label>` : "";
    const dispatchField = dialog.dispatchOptions.length ? `<label class="wp-field">Leitstelle${selectHtml('data-field="dispatch"', dialog.dispatchOptions, dialog.dispatchValue)}</label>` : "";
    const shownExtras = applicableExtras(dialog).filter(({ extra }) => extra.options.length > 1);
    const extraFields = shownExtras.length
      ? `<details class="wp-more"${dialog.moreOpen ? " open" : ""}><summary>Weitere Optionen</summary><div>${shownExtras.map(({ extra, index }) => `<label class="wp-field">${escapeHtml(extra.label)}${selectHtml(`data-extra="${index}"`, extra.options, extra.value)}</label>`).join("")}</div></details>`
      : "";
    const maxLength = Number(dialog.fields.name?.maxLength) > 0 ? Number(dialog.fields.name.maxLength) : 120;
    element.innerHTML = wrap(`${header(`WACHE BAUEN${station.label ? ` · ${station.label.toUpperCase()}` : ""}`, station.name, glyph)}
      <div class="wp-dialog-body">
        ${dialog.error ? `<div class="wp-note error">${icon("alert")}<span>${escapeHtml(dialog.error)}</span></div>` : ""}
        ${nearby ? `<div class="wp-note warn">${icon("alert")}<span>In ${formatNumber(Math.round(nearby.distance))} m Entfernung steht bereits <b>${escapeHtml(nearby.building.caption)}</b>.</span></div>` : ""}
        <div class="wp-build-form">
          <div class="wp-build-map" data-ref="buildMap" aria-label="Bauposition – Marker kann verschoben werden"></div>
          <div class="wp-build-meta"><span>Position <b data-ref="buildPosition">${dialog.lat.toFixed(5)}, ${dialog.lon.toFixed(5)}</b></span>${station.address ? `<span>Adresse <b>${escapeHtml(station.address)}</b></span>` : ""}${station.district ? `<span>Bezirk <b>${escapeHtml(station.district)}</b></span>` : ""}</div>
          ${dialog.form ? `<label class="wp-field">Name<input data-field="name" type="text" maxlength="${maxLength}" value="${escapeHtml(dialog.name)}"></label>
          <div class="wp-build-row">${typeField}${dispatchField}</div>${extraFields}` : ""}
          <div class="wp-dialog-actions">
            <button type="button" class="wp-button ghost" data-action="build-native">Im Spielformular öffnen</button>
            <button type="button" class="wp-button ghost" data-action="dialog-close">Abbrechen</button>
            ${dialog.form ? `<button type="button" class="wp-button primary" data-action="build-submit"${dialog.submitting ? " disabled" : ""}>${dialog.submitting ? '<span class="wp-spinner"></span> Wird gebaut …' : "Mit Credits bauen"}</button>` : ""}
          </div>
        </div>
      </div>`);
    initializeBuildMap(dialog);
  }

  function initializeBuildMap(dialog) {
    const Leaflet = globalThis.L;
    const container = layer.querySelector('[data-ref="buildMap"]');
    if (!container) return;
    if (!Leaflet) {
      container.remove();
      return;
    }
    const miniMap = Leaflet.map(container, { zoomControl: false, attributionControl: false }).setView([dialog.lat, dialog.lon], 16);
    Leaflet.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 19 }).addTo(miniMap);
    if (dialog.lat !== dialog.originLat || dialog.lon !== dialog.originLon) {
      Leaflet.circleMarker([dialog.originLat, dialog.originLon], { radius: 5, color: "#8e8e93", fillOpacity: 0.6, weight: 1 }).addTo(miniMap);
    }
    const marker = Leaflet.marker([dialog.lat, dialog.lon], {
      draggable: true,
      icon: Leaflet.divIcon({ className: "wp-drag-icon", html: `<div style="--c:${KIND_META[dialog.station.kind].color}"></div>`, iconSize: [26, 26], iconAnchor: [13, 13] }),
    }).addTo(miniMap);
    marker.on("dragend", () => {
      const position = marker.getLatLng();
      dialog.lat = position.lat;
      dialog.lon = position.lng;
      const shift = haversine(dialog.originLat, dialog.originLon, dialog.lat, dialog.lon);
      const label = layer.querySelector('[data-ref="buildPosition"]');
      if (label) label.textContent = `${dialog.lat.toFixed(5)}, ${dialog.lon.toFixed(5)}${shift >= 5 ? ` · ${formatNumber(Math.round(shift))} m verschoben` : ""}`;
    });
    dialog.map = miniMap;
    setTimeout(() => miniMap.invalidateSize(), 60);
  }

  async function submitForm(form, extraEntries) {
    const body = new URLSearchParams();
    for (const [key, value] of new FormData(form).entries()) {
      if (typeof value === "string") body.append(key, value);
    }
    for (const [key, value] of extraEntries) body.append(key, value);
    const csrf = form.querySelector('input[name="authenticity_token"]')?.value || document.querySelector('meta[name="csrf-token"]')?.content || "";
    const response = await fetch(new URL(form.getAttribute("action") || "/buildings", location.origin).href, {
      method: (form.getAttribute("method") || "post").toUpperCase(),
      credentials: "include",
      redirect: "follow",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        "X-CSRF-Token": csrf,
        "X-Requested-With": "XMLHttpRequest",
      },
      body,
    });
    if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
    return response.text();
  }

  async function submitBuild() {
    const build = state.dialog;
    if (build?.mode !== "build" || !build.form || build.submitting) return;
    readBuildInputs();
    if (!build.name.trim()) {
      build.error = "Bitte einen Namen eingeben.";
      renderDialog();
      return;
    }
    build.submitting = true;
    build.error = "";
    renderDialog();
    try {
      const { form, fields } = build;
      if (fields.name) fields.name.value = build.name.trim();
      if (fields.type && build.typeValue !== "") fields.type.value = build.typeValue;
      if (fields.dispatch) fields.dispatch.value = build.dispatchValue;
      fields.lat.value = build.lat.toFixed(7);
      fields.lon.value = build.lon.toFixed(7);
      if (fields.address && build.station.address) fields.address.value = build.station.address;
      // Nur die Felder des gewählten Typs mitsenden; deaktivierte Felder lässt FormData weg.
      const applicable = new Set(applicableExtras(build).map(({ extra }) => extra.name));
      for (const extra of build.extraSelects) {
        const select = form.querySelector(`select[name="${CSS.escape(extra.name)}"]`);
        if (!select) continue;
        select.disabled = !applicable.has(extra.name);
        select.value = extra.value;
      }
      const knownIds = new Set(build.buildings.map((building) => Number(building.id)));
      const responseText = await submitForm(form, build.submit?.name ? [[build.submit.name, build.submit.value || "1"]] : []);
      // Erfolg gilt erst, wenn die neue Wache tatsächlich in der Gebäudeliste steht.
      const created = await findCreatedBuilding(knownIds, build.lat, build.lon);
      if (!created) throw new Error(formErrorText(responseText) || "Das Spiel hat keine neue Wache bestätigt. Prüfe deine Credits oder nutze „Im Spielformular öffnen“.");
      if (state.dialog !== build) return;
      build.done = created;
      onBuildingBuilt(created);
      postToBridge({ type: "lssfo-built", stationKey: build.station.key, building: bridgeBuilding(created) });
    } catch (error) {
      build.error = `Bauen fehlgeschlagen: ${error.message}`;
    } finally {
      build.submitting = false;
      if (state.dialog === build) renderDialog();
    }
  }

  async function findCreatedBuilding(knownIds, lat, lon) {
    for (const wait of [400, 1200, 2500]) {
      await new Promise((resolve) => setTimeout(resolve, wait));
      const created = (await fetchBuildings().catch(() => []))
        .find((building) => !knownIds.has(Number(building.id)) && haversine(lat, lon, Number(building.latitude), Number(building.longitude)) <= 250);
      if (created) return created;
    }
    return null;
  }

  function formErrorText(html) {
    const doc = new DOMParser().parseFromString(html || "", "text/html");
    return [...doc.querySelectorAll(".alert-danger, .alert-error, #error_explanation, .has-error .help-block, .help-block.error")]
      .map((element) => element.textContent.replace(/\s+/g, " ").trim())
      .filter(Boolean)
      .join(" · ")
      .slice(0, 260);
  }

  // Ausweichweg: füllt das originale Bauformular des Spiels aus; gebaut wird
  // dann über den Knopf des Spiels.
  async function openNativeBuildForm() {
    const build = state.dialog;
    if (build?.mode !== "build") return;
    readBuildInputs();
    const { lat, lon, name, typeValue, dispatchValue, station } = build;
    closeDialog();
    close();
    const trigger = document.querySelector('#build_new_building, a[href="/buildings/new"], a[href$="/buildings/new"]');
    if (!trigger) {
      try { await navigator.clipboard.writeText(`${lat.toFixed(6)}, ${lon.toFixed(6)}`); } catch { /* Kopieren ist optional. */ }
      toast("Knopf „Neues Gebäude bauen“ nicht gefunden – Koordinaten wurden kopiert.");
      return;
    }
    trigger.click();
    let form = null;
    for (let attempt = 0; attempt < 40 && !form; attempt += 1) {
      await new Promise((resolve) => setTimeout(resolve, 150));
      form = document.querySelector('[name="building[latitude]"]')?.closest("form") || null;
    }
    if (!form) {
      toast("Das Spielformular wurde nicht rechtzeitig geladen.");
      return;
    }
    const setField = (fieldName, value) => {
      const field = form.querySelector(`[name="building[${fieldName}]"]`);
      if (!field || value === undefined || value === "") return;
      field.value = value;
      field.dispatchEvent(new Event("input", { bubbles: true }));
      field.dispatchEvent(new Event("change", { bubbles: true }));
    };
    setField("building_type", typeValue);
    setField("name", name);
    setField("leitstelle_building_id", dispatchValue);
    setField("latitude", lat.toFixed(7));
    setField("longitude", lon.toFixed(7));
    setField("address", station.address);
    try {
      const pageWindow = typeof unsafeWindow !== "undefined" ? unsafeWindow : null;
      pageWindow?.map?.setView?.([lat, lon], 17);
    } catch { /* Die Karte des Spiels ist optional. */ }
    form.scrollIntoView({ block: "center", behavior: "smooth" });
    toast("Spielformular ausgefüllt – Position prüfen und im Spiel bauen.");
  }

  /* ---------- Brücke zur Wachenplaner-Webseite ---------- */
  // Die Webversion öffnet das Spiel mit ?lssfo=planner. Nachrichten werden nur
  // vom öffnenden Fenster angenommen; Gebäudedaten gehen erst nach Zustimmung hinaus.

  function detectBridgeOpener() {
    let active = new URLSearchParams(location.search).get("lssfo") === "planner";
    try {
      if (active) sessionStorage.setItem(BRIDGE_SESSION_KEY, "1");
      else active = sessionStorage.getItem(BRIDGE_SESSION_KEY) === "1";
    } catch { /* Ohne sessionStorage gilt nur der URL-Parameter. */ }
    try {
      return active && window.opener && !window.opener.closed ? window.opener : null;
    } catch {
      return null;
    }
  }

  function postToBridge(message) {
    // Die Webversion läuft oft als lokale Datei (Origin "null"), daher "*".
    // Empfänger ist ausschließlich das Fenster, das diesen Tab geöffnet hat.
    try { bridgeOpener?.postMessage({ source: "lssfo-game", ...message }, "*"); } catch { /* Webseite wurde geschlossen. */ }
  }

  function bridgeBuilding(building) {
    return { id: Number(building.id), caption: building.caption, building_type: Number(building.building_type), latitude: Number(building.latitude), longitude: Number(building.longitude) };
  }

  function handleBridgeMessage(event) {
    if (event.source !== bridgeOpener || event.data?.source !== "lssfo-planner") return;
    if (event.data.type === "lssfo-sync") void syncBridge();
    if (event.data.type === "lssfo-build") void openBuildDialog(event.data.station);
  }

  function requestBridgeConsent() {
    try {
      if (sessionStorage.getItem(BRIDGE_CONSENT_KEY) === "1") return Promise.resolve(true);
    } catch { /* Dann wird jedes Mal gefragt. */ }
    return new Promise((resolve) => {
      closeDialog();
      state.dialog = { mode: "consent", resolve };
      renderDialog();
    });
  }

  async function syncBridge() {
    if (!(await requestBridgeConsent())) {
      postToBridge({ type: "lssfo-denied" });
      return;
    }
    try {
      const buildings = await fetchBuildings();
      postToBridge({ type: "lssfo-buildings", buildings: buildings.map(bridgeBuilding) });
      toast(`${formatNumber(buildings.length)} Gebäude an die Wachenplaner-Webseite übertragen`);
    } catch (error) {
      toast(`Abgleich fehlgeschlagen: ${error.message}`);
    }
  }
})();
