(() => {
  "use strict";

  if (window.top !== window.self || document.getElementById("lssfo-launcher")) return;

  const Core = globalThis.LSSFleetCore;
  const CACHE_KEY = "lssfo-cache-v2";
  const SETTINGS_KEY = "lssfo-settings-v1";
  const DB_NAME = "lssfo-database-v2";
  const DB_STORE = "cache";
  const CACHE_TTL = 5 * 60 * 1000;
  const CATALOG_TTL = 12 * 60 * 60 * 1000;
  const standaloneMode = new URLSearchParams(location.search).get("lssfo") === "dashboard";
  const initialSettings = loadSettings();
  const state = {
    open: false,
    loading: false,
    tab: "dashboard",
    query: "",
    onlyMissing: false,
    sorts: {},
    crewMode: initialSettings.crewMode,
    theme: initialSettings.theme,
    effects: ["full", "reduced"].includes(initialSettings.effects) ? initialSettings.effects : "auto",
    buildings: [],
    vehicles: [],
    vehicleTypes: {},
    buildingTypes: {},
    schoolingTypes: {},
    schoolings: [],
    vehicleDistances: [],
    scans: {},
    personnelScans: {},
    personnelScanController: null,
    analyzed: [],
    buildingSummary: [],
    operationalModel: null,
    scanController: null,
    scanProgress: null,
    manager: null,
    courseAssistant: null,
    nativeManager: null,
    build: null,
    mapInstance: null,
    mapMarkers: new Map(),
    mapVehicleType: "all",
    mapBuildingType: "all",
    mapDistrict: "all",
    mapDispatchCenter: "all",
    districtsEnabled: initialSettings.districtsEnabled !== false,
    coverageEnabled: initialSettings.coverageEnabled !== false,
    readinessEnabled: initialSettings.readinessEnabled !== false,
    extensionStatus: initialSettings.extensionStatus || "owned",
    extensionLimit: initialSettings.extensionLimit === "all" ? Infinity : Number(initialSettings.extensionLimit) || 100,
    districtGeoJson: undefined,
    districtDisplayGeoJson: undefined,
    buildingStatusSaving: null,
    updatedAt: null,
    error: "",
    tableLimits: {},
  };
  const districtBoxes = new WeakMap();
  const districtCache = new Map();
  const TABLE_PAGE_SIZE = 200;
  // Formatierer einmal anlegen: Neu erzeugte Intl-Objekte je Tabellenzelle sind teuer.
  const textCollator = new Intl.Collator("de", { numeric: true, sensitivity: "base" });
  const numberFormat = new Intl.NumberFormat("de-DE");
  const decimalFormat = new Intl.NumberFormat("de-DE", { maximumFractionDigits: 1 });

  // Entfernt nur den veralteten Cache dieser Erweiterung. Große Datensätze
  // werden seit Version 1.0.0 in IndexedDB statt im knappen localStorage abgelegt.
  try { localStorage.removeItem(CACHE_KEY); } catch { /* Speicher kann gesperrt sein. */ }

  const launcher = document.createElement("button");
  launcher.id = "lssfo-launcher";
  launcher.type = "button";
  launcher.title = "LSS Verwaltung öffnen";
  launcher.setAttribute("aria-label", "LSS Verwaltung öffnen");
  launcher.innerHTML = `${icon("app")}<span>LSS Verwaltung</span>`;
  launcher.addEventListener("click", openDashboard);
  mountLauncher();

  const shell = document.createElement("div");
  shell.id = "lssfo-shell";
  shell.hidden = true;
  shell.innerHTML = `
    <div class="lssfo-backdrop" data-action="close"></div>
    <section class="lssfo-panel" role="dialog" aria-modal="true" aria-label="LSS Fuhrpark- und Personalübersicht">
      <header class="lssfo-header">
        <div class="lssfo-header-copy">
          <span class="lssfo-brand-mark" aria-hidden="true">${icon("app")}</span>
          <div><h1>Fuhrpark &amp; Personal</h1><p id="lssfo-subtitle">Noch keine Daten geladen</p></div>
        </div>
        <div class="lssfo-header-actions">
          <label class="lssfo-theme-control">${icon("theme")}<select id="lssfo-theme-mode" aria-label="Darstellung"><option value="auto">LSS-Design</option><option value="dark">Dunkel</option><option value="light">Hell</option></select></label>
          <label class="lssfo-theme-control" title="Glas-Unschärfe und Animationen. „Sparsam“ entlastet schwächere Rechner.">${icon("gauge")}<select id="lssfo-effects-mode" aria-label="Effekte"><option value="auto">Effekte: Auto</option><option value="full">Effekte: Voll</option><option value="reduced">Effekte: Sparsam</option></select></label>
          <button type="button" class="lssfo-btn lssfo-popout-btn" data-action="popout">${icon("external")}<span>Eigenes Fenster</span></button>
          <button type="button" class="lssfo-btn lssfo-btn-primary" data-action="refresh">${icon("refresh")}<span>Aktualisieren</span></button>
          <button type="button" class="lssfo-icon-btn" data-action="close" aria-label="Schließen">${icon("close")}</button>
        </div>
      </header>
      <div id="lssfo-status" class="lssfo-status" hidden></div>
      <div id="lssfo-kpis" class="lssfo-kpis"></div>
      <nav id="lssfo-tabs" class="lssfo-tabs" aria-label="Bereiche">
        <span class="lssfo-tab-indicator" aria-hidden="true"></span>
        <button type="button" data-tab="dashboard"><span class="lssfo-tab-symbol" aria-hidden="true">${icon("dashboard")}</span><span>Übersicht</span><b data-tab-count="dashboard">0</b></button>
        <button type="button" data-tab="vehicles"><span class="lssfo-tab-symbol" aria-hidden="true">${icon("vehicle")}</span><span>Fahrzeuge</span><b data-tab-count="vehicles">0</b></button>
        <button type="button" data-tab="buildings"><span class="lssfo-tab-symbol" aria-hidden="true">${icon("building")}</span><span>Wachen</span><b data-tab-count="buildings">0</b></button>
        <button type="button" data-tab="regions"><span class="lssfo-tab-symbol" aria-hidden="true">${icon("region")}</span><span>Gebiete</span><b data-tab-count="regions">0</b></button>
        <button type="button" data-tab="extensions"><span class="lssfo-tab-symbol" aria-hidden="true">${icon("extension")}</span><span>Ausbauten</span><b data-tab-count="extensions">0</b></button>
        <button type="button" data-tab="utilization"><span class="lssfo-tab-symbol" aria-hidden="true">${icon("gauge")}</span><span>Auslastung</span><b data-tab-count="utilization">0</b></button>
        <button type="button" data-tab="personnel"><span class="lssfo-tab-symbol" aria-hidden="true">${icon("users")}</span><span>Personalplanung</span><b data-tab-count="personnel">0</b></button>
        <button type="button" data-tab="training"><span class="lssfo-tab-symbol" aria-hidden="true">${icon("training")}</span><span>Ausbildungen</span><b data-tab-count="training">0</b></button>
        <button type="button" data-tab="courses"><span class="lssfo-tab-symbol" aria-hidden="true">${icon("calendar")}</span><span>Lehrgänge</span><b data-tab-count="courses">0</b></button>
        <button type="button" data-tab="map"><span class="lssfo-tab-symbol" aria-hidden="true">${icon("map")}</span><span>Karte</span><b data-tab-count="map">0</b></button>
      </nav>
      <div class="lssfo-toolbar">
        <label class="lssfo-search"><span aria-hidden="true">${icon("search")}</span><input id="lssfo-search" type="search" aria-label="Übersicht durchsuchen" placeholder="Fahrzeug, Wache oder Typ suchen …"></label>
        <label class="lssfo-check"><input id="lssfo-only-missing" type="checkbox"> Nur Fehlbedarf</label>
        <label class="lssfo-select">Soll-Besatzung
          <select id="lssfo-crew-mode">
            <option value="max">Maximal</option>
            <option value="min">Minimum</option>
          </select>
        </label>
        <button type="button" class="lssfo-btn" data-action="scan">${icon("scan")}<span>Ausbildungen prüfen</span></button>
        <button type="button" class="lssfo-btn" data-action="export">${icon("download")}<span>CSV exportieren</span></button>
      </div>
      <main id="lssfo-content" class="lssfo-content"></main>
      <footer class="lssfo-footer">
        <span>Auswertung läuft lokal in deinem Browser.</span>
        <span id="lssfo-source-note">Fahrzeuganforderungen: LSS-Manager-Katalog</span>
      </footer>
    </section>
    <div id="lssfo-manager" class="lssfo-manager" hidden></div>
    <div id="lssfo-course-assistant" class="lssfo-manager" hidden></div>
    <div id="lssfo-native-manager" class="lssfo-manager" hidden></div>`;
  document.body.appendChild(shell);
  let shellCloseTimer = 0;
  if (standaloneMode) document.documentElement.classList.add("lssfo-standalone");

  // Eigene Ebene für die Wachenplaner-Brücke, damit der Bau-Dialog auch bei
  // geschlossener Übersicht erscheinen kann.
  const plannerRoot = document.createElement("div");
  plannerRoot.id = "lssfo-planner";
  plannerRoot.innerHTML = '<div id="lssfo-build" class="lssfo-manager" hidden></div><div class="lssfo-planner-pill" hidden><i></i><span>Wachenplaner verbunden</span></div><div class="lssfo-toast" role="status" aria-live="polite"></div>';
  document.body.appendChild(plannerRoot);
  applyTheme();
  window.addEventListener("resize", positionTabIndicator);

  shell.addEventListener("click", handleClick);
  // Große Tabellen werden erst neu aufgebaut, wenn kurz nicht mehr getippt wird.
  let searchTimer = 0;
  shell.querySelector("#lssfo-search").addEventListener("input", (event) => {
    state.query = event.target.value.trim().toLocaleLowerCase("de");
    state.tableLimits = {};
    clearTimeout(searchTimer);
    searchTimer = setTimeout(renderContent, 180);
  });
  shell.querySelector("#lssfo-only-missing").addEventListener("change", (event) => {
    state.onlyMissing = event.target.checked;
    renderContent();
  });
  shell.querySelector("#lssfo-crew-mode").value = state.crewMode;
  shell.querySelector("#lssfo-crew-mode").addEventListener("change", (event) => {
    state.crewMode = event.target.value;
    saveSettings({ crewMode: state.crewMode });
    analyze();
    render();
  });
  shell.addEventListener("input", (event) => {
    if (event.target.id !== "lssfo-manager-person-search") return;
    const query = event.target.value.trim().toLocaleLowerCase("de");
    if (state.manager) state.manager.personQuery = query;
    for (const row of shell.querySelectorAll("[data-person-row]")) {
      row.hidden = !row.dataset.search.includes(query);
    }
  });
  shell.addEventListener("change", (event) => {
    if (event.target.id === "lssfo-theme-mode") {
      state.theme = event.target.value;
      saveSettings({ theme: state.theme });
      applyTheme();
      return;
    }
    if (event.target.id === "lssfo-effects-mode") {
      state.effects = event.target.value;
      saveSettings({ effects: state.effects });
      applyTheme();
      return;
    }
    if (event.target.id === "lssfo-map-vehicle-filter") {
      state.mapVehicleType = event.target.value;
      renderContent();
      return;
    }
    if (event.target.id === "lssfo-map-building-filter") {
      state.mapBuildingType = event.target.value;
      renderContent();
      return;
    }
    if (event.target.id === "lssfo-map-district-filter") {
      state.mapDistrict = event.target.value;
      renderContent();
      return;
    }
    if (event.target.id === "lssfo-map-dispatch-filter") {
      state.mapDispatchCenter = event.target.value;
      renderContent();
      return;
    }
    if (event.target.id === "lssfo-map-coverage-toggle") {
      state.coverageEnabled = event.target.checked;
      saveSettings({ coverageEnabled: state.coverageEnabled });
      renderContent();
      return;
    }
    if (event.target.id === "lssfo-map-readiness-toggle") {
      state.readinessEnabled = event.target.checked;
      saveSettings({ readinessEnabled: state.readinessEnabled });
      renderContent();
      return;
    }
    if (event.target.id === "lssfo-extension-status") {
      state.extensionStatus = event.target.value;
      saveSettings({ extensionStatus: state.extensionStatus });
      renderContent();
      return;
    }
    if (event.target.id === "lssfo-extension-limit") {
      state.extensionLimit = event.target.value === "all" ? Infinity : Math.max(25, Number(event.target.value) || 100);
      saveSettings({ extensionLimit: Number.isFinite(state.extensionLimit) ? state.extensionLimit : "all" });
      renderContent();
      return;
    }
    if (event.target.id === "lssfo-map-district-toggle") {
      state.districtsEnabled = event.target.checked;
      if (!state.districtsEnabled) state.mapDistrict = "all";
      saveSettings({ districtsEnabled: state.districtsEnabled });
      renderContent();
      return;
    }
    if (event.target.id !== "lssfo-course-school") return;
    if (state.courseAssistant) {
      state.courseAssistant.schoolId = Number(event.target.value) || null;
      renderCourseAssistant();
    }
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && state.build) closeBuildDialog();
    else if (event.key === "Escape" && state.nativeManager) closeNativeManager();
    else if (event.key === "Escape" && state.courseAssistant) closeCourseAssistant();
    else if (event.key === "Escape" && state.manager) closeManager();
    else if (event.key === "Escape" && state.open) closeDashboard();
  });
  if (standaloneMode) setTimeout(openDashboard, 0);
  // LSS ändert Klassen und Stile an <html>/<body> häufig; die Theme-Erkennung
  // läuft deshalb höchstens einmal pro Frame.
  let themeFrame = 0;
  const ownClasses = /\b(?:lssfo-open|lssfo-standalone|lsswp-open|leaflet-dragging)\b/g;
  const themeObserver = new MutationObserver((mutations) => {
    // Eigene Klassen (auch die des Wachenplaners) und Leaflets Zieh-Klasse ändern das Theme nicht.
    const relevant = mutations.some((mutation) => mutation.attributeName !== "class"
      || String(mutation.oldValue || "").replace(ownClasses, "").trim() !== String(mutation.target.getAttribute("class") || "").replace(ownClasses, "").trim());
    if (!relevant || state.theme !== "auto" || themeFrame) return;
    themeFrame = requestAnimationFrame(() => {
      themeFrame = 0;
      applyTheme();
    });
  });
  const themeAttributes = { attributes: true, attributeOldValue: true, attributeFilter: ["class", "style", "data-theme", "data-bs-theme"] };
  themeObserver.observe(document.documentElement, themeAttributes);
  themeObserver.observe(document.body, themeAttributes);
  window.matchMedia?.("(prefers-color-scheme: dark)").addEventListener?.("change", () => {
    if (state.theme === "auto") applyTheme();
  });

  // Wachenplaner-Brücke: Der Wachenplaner (lss_einsatzkarte) öffnet das Spiel
  // mit ?lssfo=planner. Nachrichten werden nur vom öffnenden Fenster angenommen,
  // Gebäudedaten gehen erst nach ausdrücklicher Zustimmung hinaus.
  const PLANNER_SESSION_KEY = "lssfo-planner";
  const PLANNER_CONSENT_KEY = "lssfo-planner-consent";
  const FIRE_BUILDING_TYPES = new Set([0, 18]);
  const RESCUE_BUILDING_TYPES = new Set([2, 20]);
  const plannerOpener = detectPlannerOpener();
  plannerRoot.addEventListener("click", handlePlannerClick);
  plannerRoot.addEventListener("input", (event) => {
    if (!event.target.closest("#lssfo-build")) return;
    readBuildInputs();
    // Anderer Gebäudetyp → passende Zusatzfelder (z. B. Startfahrzeug) einblenden.
    if (event.target.id === "lssfo-build-type") renderBuild();
  });
  plannerRoot.addEventListener("toggle", (event) => {
    if (state.build && event.target.matches?.(".lssfo-build-more")) state.build.moreOpen = event.target.open;
  }, true);
  if (plannerOpener) {
    plannerRoot.querySelector(".lssfo-planner-pill").hidden = false;
    window.addEventListener("message", handlePlannerMessage);
    postToPlanner({ type: "lssfo-ready" });
  }

  function mountLauncher(attempt = 0) {
    const navRoots = [...document.querySelectorAll("nav, header, .navbar, #navbar-main-collapse, #navbar-collapse")];
    const forumLink = navRoots.flatMap((root) => [...root.querySelectorAll("a")]).find((anchor) => {
      const label = `${anchor.textContent || ""} ${anchor.title || ""} ${anchor.getAttribute("aria-label") || ""}`;
      return /forum/i.test(label) || /forum/i.test(anchor.href || "");
    });
    const forumItem = forumLink?.closest("li.dropdown") || forumLink?.closest("li") || forumLink;
    const fallbackList = document.querySelector("#navbar-main-collapse .navbar-right, #navbar-collapse .navbar-right, nav .navbar-right, .navbar .navbar-nav");
    const reference = forumItem || null;
    const parent = reference?.parentElement || fallbackList;
    if (parent) {
      let host = document.getElementById("lssfo-launcher-host");
      if (!host) {
        host = document.createElement(parent.tagName === "UL" || parent.tagName === "OL" ? "li" : "span");
        host.id = "lssfo-launcher-host";
        host.className = "lssfo-navbar-item";
      }
      if (reference?.parentElement === parent) reference.insertAdjacentElement("afterend", host);
      else parent.appendChild(host);
      host.appendChild(launcher);
      launcher.classList.add("lssfo-navbar-launcher");
      return;
    }
    if (!launcher.isConnected) document.body.appendChild(launcher);
    if (attempt < 20) setTimeout(() => mountLauncher(attempt + 1), 250);
  }

  function loadSettings() {
    if (typeof GM_getValue === "function") {
      try {
        return { crewMode: "max", theme: "auto", ...JSON.parse(GM_getValue(SETTINGS_KEY, "{}")) };
      } catch {
        return { crewMode: "max", theme: "auto" };
      }
    }
    try {
      return { crewMode: "max", theme: "auto", ...JSON.parse(localStorage.getItem(SETTINGS_KEY) || "{}") };
    } catch {
      return { crewMode: "max", theme: "auto" };
    }
  }

  function saveSettings(settings) {
    const serialized = JSON.stringify({ crewMode: state.crewMode, theme: state.theme, effects: state.effects, districtsEnabled: state.districtsEnabled, coverageEnabled: state.coverageEnabled, readinessEnabled: state.readinessEnabled, extensionStatus: state.extensionStatus, extensionLimit: Number.isFinite(state.extensionLimit) ? state.extensionLimit : "all", ...settings });
    if (typeof GM_setValue === "function") {
      try { GM_setValue(SETTINGS_KEY, serialized); } catch { /* Einstellung gilt für diese Sitzung. */ }
      return;
    }
    try { localStorage.setItem(SETTINGS_KEY, serialized); } catch { /* Einstellung gilt für diese Sitzung. */ }
  }

  function applyTheme() {
    const effectiveTheme = state.theme === "auto" ? detectLssTheme() : state.theme;
    shell.dataset.theme = effectiveTheme;
    plannerRoot.dataset.theme = effectiveTheme;
    const lite = state.effects === "reduced" || (state.effects === "auto" && isLowEndDevice());
    shell.classList.toggle("lssfo-lite", lite);
    plannerRoot.classList.toggle("lssfo-lite", lite);
    const select = shell.querySelector("#lssfo-theme-mode");
    if (select) select.value = state.theme;
    const effectsSelect = shell.querySelector("#lssfo-effects-mode");
    if (effectsSelect) effectsSelect.value = state.effects;
  }

  // Schwächere Geräte: wenige Kerne, wenig Speicher oder ausdrücklich
  // gewünschte reduzierte Transparenz im Betriebssystem.
  function isLowEndDevice() {
    return (navigator.hardwareConcurrency || 8) <= 4
      || (navigator.deviceMemory || 8) <= 4
      || Boolean(window.matchMedia?.("(prefers-reduced-transparency: reduce)").matches);
  }

  function detectLssTheme() {
    const rootTheme = `${document.documentElement.dataset.theme || ""} ${document.documentElement.dataset.bsTheme || ""}`;
    const bodyTheme = `${document.body.dataset.theme || ""} ${document.body.dataset.bsTheme || ""}`;
    if (/dark/i.test(`${rootTheme} ${bodyTheme}`) || document.documentElement.classList.contains("dark") || document.body.classList.contains("dark")) return "dark";
    const color = getComputedStyle(document.body).backgroundColor.match(/[\d.]+/g)?.slice(0, 3).map(Number);
    if (color?.length === 3 && (color[0] * .299 + color[1] * .587 + color[2] * .114) < 105) return "dark";
    return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  async function openDashboard() {
    clearTimeout(shellCloseTimer);
    state.open = true;
    // Theme bestimmen, solange die Übersicht noch verborgen ist – das Auslesen
    // der Seitenfarbe erzwingt sonst eine Stilberechnung für das ganze Fenster.
    applyTheme();
    shell.classList.remove("is-closing");
    shell.hidden = false;
    document.documentElement.classList.add("lssfo-open");
    render();
    animateContent();
    if (!state.vehicles.length) await loadData(false);
  }

  function closeDashboard() {
    if (standaloneMode) {
      window.close();
      return;
    }
    closeManager();
    closeCourseAssistant();
    closeNativeManager();
    state.open = false;
    shell.classList.add("is-closing");
    document.documentElement.classList.remove("lssfo-open");
    shellCloseTimer = setTimeout(() => {
      if (state.open) return;
      destroyOverviewMap();
      shell.hidden = true;
      shell.classList.remove("is-closing");
    }, 260);
  }

  // Spielt die Einblendung nur beim Bereichswechsel ab, nicht bei jeder Suche.
  // Klasse im nächsten Frame setzen statt per offsetWidth ein Zusatz-Layout zu erzwingen.
  function animateContent() {
    const content = shell.querySelector("#lssfo-content");
    content.classList.remove("lssfo-enter");
    requestAnimationFrame(() => content.classList.add("lssfo-enter"));
  }

  function revealActiveTab() {
    requestAnimationFrame(() => {
      const nav = shell.querySelector("#lssfo-tabs");
      const active = nav?.querySelector(`[data-tab="${state.tab}"]`);
      if (!active) return;
      const left = active.offsetLeft;
      const right = left + active.offsetWidth;
      if (left < nav.scrollLeft) nav.scrollTo({ left: left - 12, behavior: "smooth" });
      else if (right > nav.scrollLeft + nav.clientWidth) nav.scrollTo({ left: right - nav.clientWidth + 12, behavior: "smooth" });
    });
  }

  function positionTabIndicator() {
    const indicator = shell.querySelector(".lssfo-tab-indicator");
    const active = shell.querySelector(`#lssfo-tabs [data-tab="${state.tab}"]`);
    if (!indicator || !active || !active.offsetWidth) return;
    indicator.style.width = `${active.offsetWidth}px`;
    indicator.style.transform = `translateX(${active.offsetLeft}px)`;
  }

  function handleClick(event) {
    const tab = event.target.closest("[data-tab]");
    if (tab) {
      const changed = state.tab !== tab.dataset.tab;
      state.tab = tab.dataset.tab;
      render();
      if (changed) {
        animateContent();
        revealActiveTab();
      }
      return;
    }
    const action = event.target.closest("[data-action]")?.dataset.action;
    if (action === "close") closeDashboard();
    if (action === "refresh") loadData(true);
    if (action === "popout") openStandaloneDashboard();
    if (action === "scan") state.scanController ? stopScan() : scanEducations();
    if (action === "scan-personnel") state.personnelScanController ? state.personnelScanController.abort() : scanStationPersonnel();
    if (action === "export") exportCsv();
    if (action === "manage-vehicle") openManager("vehicle", Number(event.target.closest("[data-id]").dataset.id));
    if (action === "manage-building") openManager("building", Number(event.target.closest("[data-id]").dataset.id));
    if (action === "manager-close") closeManager();
    if (action === "manager-save") saveManager();
    if (action === "building-status-toggle") toggleBuildingStatus(Number(event.target.closest("[data-building-id]").dataset.buildingId));
    if (action === "person-toggle") togglePersonnel(Number(event.target.closest("[data-person-id]").dataset.personId));
    if (action === "map-focus") focusMapBuilding(Number(event.target.closest("[data-building-id]").dataset.buildingId));
    if (action === "map-filter-reset") {
      state.mapVehicleType = "all";
      state.mapBuildingType = "all";
      state.mapDistrict = "all";
      state.mapDispatchCenter = "all";
      renderContent();
    }
    if (action === "course-open") openCourseAssistant();
    if (action === "course-close") closeCourseAssistant();
    if (action === "native-building") {
      const control = event.target.closest("[data-building-id]");
      openNativeManager(Number(control.dataset.buildingId), control.dataset.buildingName || "Wache", control.dataset.nativeSection || "extensions");
    }
    if (action === "native-close") closeNativeManager();
    if (action === "table-sort") {
      const control = event.target.closest("[data-sort-table]");
      changeTableSort(control.dataset.sortTable, Number(control.dataset.sortColumn));
    }
    if (action === "table-more" || action === "table-all") {
      const tableKey = event.target.closest("[data-table]").dataset.table;
      state.tableLimits[tableKey] = action === "table-all" ? Infinity : (state.tableLimits[tableKey] || TABLE_PAGE_SIZE) + TABLE_PAGE_SIZE;
      renderContent();
    }
  }

  function openStandaloneDashboard() {
    if (standaloneMode) return;
    const url = new URL("/", location.origin);
    url.searchParams.set("lssfo", "dashboard");
    window.open(url.href, "_blank", "noopener");
  }

  function changeTableSort(tableKey, column) {
    const current = state.sorts[tableKey];
    state.sorts[tableKey] = {
      column,
      direction: current?.column === column && current.direction === "asc" ? "desc" : "asc",
    };
    if (tableKey === "personnel") renderManager();
    else renderContent();
  }

  async function fetchJson(url) {
    if (/^https:\/\/api\.lss-manager\.de\//.test(url) && typeof GM_xmlhttpRequest === "function") {
      return new Promise((resolve, reject) => {
        GM_xmlhttpRequest({
          method: "GET",
          url,
          responseType: "json",
          timeout: 20000,
          anonymous: true,
          onload: (response) => {
            if (response.status < 200 || response.status >= 300) {
              reject(new Error(`${response.status} ${response.statusText || "Fehler"} (${url})`));
              return;
            }
            try {
              resolve(response.response ?? JSON.parse(response.responseText));
            } catch (error) {
              reject(new Error(`Ungültige Antwort (${url}): ${error.message}`));
            }
          },
          ontimeout: () => reject(new Error(`Zeitüberschreitung (${url})`)),
          onerror: () => reject(new Error(`Netzwerkfehler (${url})`)),
        });
      });
    }
    const response = await fetch(url, { credentials: "include", headers: { Accept: "application/json" } });
    if (!response.ok) {
      const error = new Error(`${response.status} ${response.statusText} (${url})`);
      error.status = response.status;
      throw error;
    }
    return response.json();
  }

  // Überlastung (429/5xx) ist bei der LSS-API meist vorübergehend: mit wachsender Pause erneut versuchen.
  async function fetchJsonWithRetry(url, attempts = 4) {
    for (let attempt = 1; ; attempt += 1) {
      try {
        return await fetchJson(url);
      } catch (error) {
        const retryable = error.status === 429 || error.status >= 500;
        if (!retryable || attempt >= attempts) throw error;
        await new Promise((resolve) => setTimeout(resolve, 1000 * 2 ** (attempt - 1)));
      }
    }
  }

  // Fahrzeuge seitenweise laden: große Seiten (limit=10000) beantwortet der Server bei vielen
  // Fahrzeugen mit 503. Die API liefert in paging.next_page die URL der Folgeseite.
  const VEHICLE_PAGE_SIZE = 1000;

  async function fetchAllVehicles() {
    let url = `/api/v2/vehicles?limit=${VEHICLE_PAGE_SIZE}`;
    const seenUrls = new Set();
    const vehiclesById = new Map();
    while (url && !seenUrls.has(url)) {
      seenUrls.add(url);
      const page = await fetchJsonWithRetry(url);
      for (const vehicle of page.result || []) vehiclesById.set(vehicle.id, vehicle);
      url = page.paging?.next_page || "";
      if (url) await new Promise((resolve) => setTimeout(resolve, 150));
    }
    return [...vehiclesById.values()];
  }

  function openDatabase() {
    return new Promise((resolve, reject) => {
      if (!globalThis.indexedDB) {
        reject(new Error("IndexedDB ist nicht verfügbar"));
        return;
      }
      const request = indexedDB.open(DB_NAME, 1);
      request.onupgradeneeded = () => {
        if (!request.result.objectStoreNames.contains(DB_STORE)) request.result.createObjectStore(DB_STORE);
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error || new Error("IndexedDB konnte nicht geöffnet werden"));
    });
  }

  async function readCache() {
    try {
      const database = await openDatabase();
      return await new Promise((resolve, reject) => {
        const transaction = database.transaction(DB_STORE, "readonly");
        const request = transaction.objectStore(DB_STORE).get(CACHE_KEY);
        request.onsuccess = () => resolve(request.result || null);
        request.onerror = () => reject(request.error);
        transaction.oncomplete = () => database.close();
      });
    } catch {
      return null;
    }
  }

  async function writeCache(value) {
    const database = await openDatabase();
    return new Promise((resolve, reject) => {
      const transaction = database.transaction(DB_STORE, "readwrite");
      transaction.objectStore(DB_STORE).put(value, CACHE_KEY);
      transaction.oncomplete = () => { database.close(); resolve(); };
      transaction.onerror = () => { database.close(); reject(transaction.error); };
      transaction.onabort = () => { database.close(); reject(transaction.error || new Error("Cache konnte nicht gespeichert werden")); };
    });
  }

  async function persistCurrentCache() {
    try {
      const previous = await readCache();
      await writeCache({
        buildings: state.buildings,
        vehicles: state.vehicles,
        schoolings: state.schoolings,
        vehicleDistances: state.vehicleDistances,
        vehicleTypes: state.vehicleTypes,
        buildingTypes: state.buildingTypes,
        schoolingTypes: state.schoolingTypes,
        updatedAt: state.updatedAt || Date.now(),
        catalogUpdatedAt: previous?.catalogUpdatedAt || Date.now(),
      });
    } catch (error) {
      console.warn("LSS Fuhrparkübersicht: Änderungen konnten nicht zwischengespeichert werden.", error);
    }
  }

  async function loadData(force) {
    if (state.loading) return;
    state.loading = true;
    state.error = "";
    render();
    try {
      const cached = await readCache();
      const useMainCache = !force && cached && Date.now() - cached.updatedAt < CACHE_TTL;
      const useCatalogCache = cached && Date.now() - (cached.catalogUpdatedAt || 0) < CATALOG_TTL;
      const mainPromise = useMainCache
        ? Promise.resolve([cached.buildings, cached.vehicles, cached.schoolings || [], cached.vehicleDistances || []])
        : Promise.all([fetchJson("/api/buildings"), fetchAllVehicles(), fetchJson("/api/schoolings").catch(() => []), fetchJson("/api/v1/vehicle_distances.json").catch(() => ({ result: [] }))]);
      const catalogPromise = useCatalogCache
        ? Promise.resolve([cached.vehicleTypes, cached.buildingTypes, cached.schoolingTypes || {}])
        : Promise.all([
            fetchJson("https://api.lss-manager.de/de_DE/vehicles"),
            fetchJson("https://api.lss-manager.de/de_DE/buildings"),
            fetchJson("https://api.lss-manager.de/de_DE/schoolings"),
          ]).catch(() => [cached?.vehicleTypes || {}, cached?.buildingTypes || {}, cached?.schoolingTypes || {}]);
      const [[buildings, vehicles, schoolings, vehicleDistances], [vehicleTypes, buildingTypes, schoolingTypes]] = await Promise.all([mainPromise, catalogPromise]);
      state.buildings = Array.isArray(buildings) ? buildings : buildings?.result || [];
      state.vehicles = Array.isArray(vehicles) ? vehicles : vehicles?.result || [];
      state.schoolings = Array.isArray(schoolings) ? schoolings : schoolings?.result || [];
      state.vehicleDistances = Array.isArray(vehicleDistances) ? vehicleDistances : vehicleDistances?.result || [];
      state.vehicleTypes = vehicleTypes || {};
      state.buildingTypes = buildingTypes || {};
      state.schoolingTypes = schoolingTypes || {};
      state.updatedAt = useMainCache ? cached.updatedAt : Date.now();
      const cacheValue = {
        buildings: state.buildings,
        vehicles: state.vehicles,
        schoolings: state.schoolings,
        vehicleDistances: state.vehicleDistances,
        vehicleTypes: state.vehicleTypes,
        buildingTypes: state.buildingTypes,
        schoolingTypes: state.schoolingTypes,
        updatedAt: state.updatedAt,
        catalogUpdatedAt: useCatalogCache ? cached.catalogUpdatedAt : Date.now(),
      };
      try {
        await writeCache(cacheValue);
      } catch (cacheError) {
        console.warn("LSS Fuhrparkübersicht: Cache konnte nicht gespeichert werden.", cacheError);
      }
      analyze();
    } catch (error) {
      state.error = `Daten konnten nicht geladen werden: ${error.message}`;
    } finally {
      state.loading = false;
      render();
    }
  }

  function analyze() {
    const buildingMap = new Map(state.buildings.map((building) => {
      const type = state.buildingTypes[String(building.building_type)] || {};
      return [Number(building.id), { ...building, schoolingTypes: type.schoolingTypes || [] }];
    }));
    state.analyzed = state.vehicles.map((vehicle) => Core.analyzeVehicle(
      vehicle,
      state.vehicleTypes[String(vehicle.vehicle_type)],
      buildingMap.get(Number(vehicle.building_id)),
      state.crewMode,
      state.scans[String(vehicle.id)] || null,
    ));
    state.buildingSummary = Core.summarizeBuildings(state.buildings, state.analyzed);
    state.operationalModel = buildOperationalModel();
  }

  function render() {
    renderStatus();
    renderKpis();
    for (const button of shell.querySelectorAll("#lssfo-tabs [data-tab]")) {
      button.classList.toggle("active", button.dataset.tab === state.tab);
    }
    positionTabIndicator();
    shell.querySelector(".lssfo-panel")?.classList.toggle("lssfo-map-mode", state.tab === "map");
    const popoutButton = shell.querySelector('[data-action="popout"]');
    if (popoutButton) popoutButton.hidden = standaloneMode;
    const tabCounts = {
      dashboard: state.operationalModel?.alerts.length || 0,
      vehicles: state.vehicles.length,
      buildings: state.buildings.length,
      regions: state.operationalModel?.regions.length || 0,
      extensions: state.operationalModel?.extensions.filter((entry) => entry.status !== "missing").length || 0,
      utilization: state.vehicleDistances.length,
      personnel: state.operationalModel?.personnelRows.length || 0,
      training: Core.summarizeTraining(state.analyzed).length,
      courses: state.schoolings.length,
      map: state.buildings.filter((building) => Number.isFinite(Number(building.latitude)) && Number.isFinite(Number(building.longitude))).length,
    };
    for (const counter of shell.querySelectorAll("[data-tab-count]")) {
      counter.textContent = formatNumber(tabCounts[counter.dataset.tabCount] || 0);
    }
    const scanButton = shell.querySelector('[data-action="scan"]');
    scanButton.innerHTML = state.scanController
      ? `${icon("stop")}<span>Prüfung stoppen</span>`
      : `${icon("scan")}<span>Ausbildungen prüfen</span>`;
    shell.querySelector("#lssfo-subtitle").textContent = state.updatedAt
      ? `Stand ${new Date(state.updatedAt).toLocaleString("de-DE")} · ${state.crewMode === "max" ? "Maximalbesatzung" : "Mindestbesatzung"}`
      : "Noch keine Daten geladen";
    renderContent();
  }

  function renderStatus() {
    const element = shell.querySelector("#lssfo-status");
    if (state.error) {
      element.hidden = false;
      element.className = "lssfo-status error";
      element.textContent = state.error;
    } else if (state.scanProgress) {
      element.hidden = false;
      element.className = "lssfo-status";
      element.innerHTML = `<span class="lssfo-spinner"></span> ${escapeHtml(state.scanProgress)}`;
    } else if (state.loading) {
      element.hidden = false;
      element.className = "lssfo-status";
      element.innerHTML = '<span class="lssfo-spinner"></span> Wachen, Fahrzeuge und Lehrgänge werden geladen …';
    } else {
      element.hidden = true;
    }
  }

  function renderKpis() {
    const missingCrew = state.analyzed.reduce((sum, item) => sum + item.missingCrew, 0);
    const affected = state.analyzed.filter((item) => item.missingCrew || item.missingTraining).length;
    const dispatchCount = state.operationalModel?.dispatchCenters.length || 0;
    const stationCount = Math.max(0, state.buildings.length - dispatchCount);
    const personnel = (state.operationalModel?.stationBuildings || []).reduce((sum, building) => sum + Number(building.personal_count || 0), 0);
    shell.querySelector("#lssfo-kpis").innerHTML = [
      kpi("Fahrzeuge", formatNumber(state.vehicles.length), "im Fuhrpark"),
      kpi("Gebäude", formatNumber(state.buildings.length), `${formatNumber(stationCount)} weitere · ${formatNumber(dispatchCount)} ${dispatchCount === 1 ? "Leitstelle" : "Leitstellen"}`),
      kpi("Personal", formatNumber(personnel), "an personalführenden Wachen"),
      kpi("Fehlende Besatzung", formatNumber(missingCrew), affected ? `${formatNumber(affected)} Fahrzeuge auffällig` : "alles vollständig", missingCrew > 0),
    ].join("");
  }

  function kpi(label, value, hint, danger = false) {
    const icons = { Fahrzeuge: "vehicle", Wachen: "building", Gebäude: "building", Personal: "users", "Fehlende Besatzung": "alert" };
    return `<article class="lssfo-kpi${danger ? " danger" : ""}"><div class="lssfo-kpi-label"><i aria-hidden="true">${icon(icons[label] || "app")}</i><span>${escapeHtml(label)}</span></div><strong>${escapeHtml(value)}</strong><small>${escapeHtml(hint)}</small></article>`;
  }

  function renderContent() {
    const content = shell.querySelector("#lssfo-content");
    destroyOverviewMap();
    if (!state.vehicles.length && state.loading) {
      content.innerHTML = '<div class="lssfo-empty">Daten werden vorbereitet …</div>';
      return;
    }
    if (!state.vehicleTypes || !Object.keys(state.vehicleTypes).length) {
      content.innerHTML = '<div class="lssfo-empty">Der Fahrzeugkatalog konnte nicht geladen werden. Bitte prüfe die Internetverbindung und aktualisiere erneut.</div>';
      return;
    }
    if (state.tab === "dashboard") renderDashboard(content);
    if (state.tab === "vehicles") renderVehicles(content);
    if (state.tab === "buildings") renderBuildings(content);
    if (state.tab === "regions") renderRegions(content);
    if (state.tab === "extensions") renderExtensions(content);
    if (state.tab === "utilization") renderUtilization(content);
    if (state.tab === "personnel") renderPersonnelPlanning(content);
    if (state.tab === "training") renderTraining(content);
    if (state.tab === "courses") renderCourses(content);
    if (state.tab === "map") renderMap(content);
  }

  function matchesQuery(...values) {
    return !state.query || values.some((value) => String(value ?? "").toLocaleLowerCase("de").includes(state.query));
  }

  function normalizedDispatchId(value) {
    if (value === null || value === undefined || value === "") return null;
    const id = Number(value);
    return Number.isFinite(id) && id > 0 ? id : null;
  }

  function isDispatchCenterBuilding(building, type, referencedIds) {
    const id = Number(building.id);
    return referencedIds.has(id)
      || Number(building.building_type) === 7
      || type?.isDispatchCenter === true
      || type?.is_dispatch_center === true
      || /leitstell|dispatch/i.test(type?.caption || "");
  }

  function isOperationalBuilding(building) {
    if (building.isDispatchCenter) return false;
    if (building.vehicles.length || Number(building.personal_count || 0) > 0 || Number(building.personal_count_target || 0) > 0) return true;
    return !/schule|akademie|leitstell|dispatch|krankenhaus|hospital|bereitstellungsraum|verband/i.test(building.typeCaption || "");
  }

  function buildOperationalModel() {
    const buildingById = new Map(state.buildings.map((building) => [Number(building.id), building]));
    const summaryById = new Map(state.buildingSummary.map((building) => [Number(building.id), building]));
    const vehiclesByBuilding = new Map();
    const distanceByVehicle = new Map(state.vehicleDistances.map((entry) => [Number(entry.vehicle_id), entry]));
    const districtGeoJson = getDistrictGeoJson();
    for (const vehicle of state.analyzed) {
      if (!vehiclesByBuilding.has(vehicle.buildingId)) vehiclesByBuilding.set(vehicle.buildingId, []);
      vehiclesByBuilding.get(vehicle.buildingId).push(vehicle);
    }
    const referencedDispatchIds = new Set(state.buildings.map((building) => normalizedDispatchId(building.leitstelle_building_id)).filter((id) => id !== null));
    const dispatchCenters = state.buildings.filter((building) => isDispatchCenterBuilding(building, state.buildingTypes[String(building.building_type)] || {}, referencedDispatchIds));
    const dispatchById = new Map(dispatchCenters.map((building) => [Number(building.id), building]));
    const buildings = state.buildings.map((building) => {
      const id = Number(building.id);
      const type = state.buildingTypes[String(building.building_type)] || {};
      const districtFeature = districtFeatureAtPoint(Number(building.longitude), Number(building.latitude), districtGeoJson);
      const district = formatDistrictName(districtFeature?.properties?.name);
      const federalState = federalStateFromFeature(districtFeature);
      const dispatchCenterId = normalizedDispatchId(building.leitstelle_building_id);
      return {
        ...building,
        id,
        typeCaption: type.caption || `Typ ${building.building_type}`,
        summary: summaryById.get(id) || {},
        vehicles: vehiclesByBuilding.get(id) || [],
        district,
        federalState,
        dispatchCenterId,
        dispatchCenterCaption: dispatchCenterId ? dispatchById.get(dispatchCenterId)?.caption || `Leitstelle ${dispatchCenterId}` : "Ohne Leitstelle",
        isDispatchCenter: dispatchById.has(id),
      };
    });
    const stationBuildings = buildings.filter((building) => !building.isDispatchCenter);
    const operationalBuildings = stationBuildings.filter(isOperationalBuilding);
    const referenceVehicleTypes = new Map();
    const referenceBuildingTypes = new Map();
    for (const building of stationBuildings) {
      if (!/schule|akademie|krankenhaus|bereitstellungsraum|verband/i.test(building.typeCaption)) {
        referenceBuildingTypes.set(String(building.building_type), building.typeCaption);
      }
      for (const vehicle of building.vehicles) referenceVehicleTypes.set(String(vehicle.typeId), vehicle.typeCaption);
    }
    const regionGroups = new Map();
    for (const building of operationalBuildings) {
      const key = building.dispatchCenterId === null ? "none" : String(building.dispatchCenterId);
      if (!regionGroups.has(key)) regionGroups.set(key, { key, caption: building.dispatchCenterCaption, buildings: [] });
      regionGroups.get(key).buildings.push(building);
    }
    const regions = [...regionGroups.values()].map((region) => {
      const vehicleTypes = new Set(region.buildings.flatMap((building) => building.vehicles.map((vehicle) => String(vehicle.typeId))));
      const buildingTypes = new Set(region.buildings.map((building) => String(building.building_type)));
      const vehicles = region.buildings.flatMap((building) => building.vehicles);
      const personnel = region.buildings.reduce((sum, building) => sum + Number(building.summary.personnel || 0), 0);
      const targetCrew = region.buildings.reduce((sum, building) => sum + Number(building.summary.targetCrew || 0), 0);
      const missingCrew = vehicles.reduce((sum, vehicle) => sum + Number(vehicle.missingCrew || 0), 0);
      const missingTraining = vehicles.reduce((sum, vehicle) => sum + Number(vehicle.missingTraining || 0), 0);
      const inactive = region.buildings.filter((building) => building.enabled === false).length;
      const readiness = readinessScore({ targetCrew, missingCrew, missingTraining, buildings: region.buildings.length, inactive });
      return {
        ...region,
        vehicles,
        personnel,
        targetCrew,
        missingCrew,
        missingTraining,
        inactive,
        readiness,
        districts: [...new Set(region.buildings.map((building) => building.district).filter(Boolean))].sort((a, b) => a.localeCompare(b, "de")),
        federalStates: [...new Set(region.buildings.map((building) => building.federalState).filter(Boolean))].sort((a, b) => a.localeCompare(b, "de")),
        missingVehicleTypes: [...referenceVehicleTypes].filter(([id]) => !vehicleTypes.has(id)).map(([, caption]) => caption),
        missingBuildingTypes: [...referenceBuildingTypes].filter(([id]) => !buildingTypes.has(id)).map(([, caption]) => caption),
      };
    }).sort((a, b) => a.caption.localeCompare(b.caption, "de", { numeric: true }));
    const extensions = stationBuildings.flatMap((building) => normalizeBuildingExtensions(building));
    const personnelRows = operationalBuildings.map((building) => {
      const targetCrew = Number(building.summary.targetCrew || 0);
      const personnel = Number(building.summary.personnel || 0);
      const assigned = Number(building.summary.assigned || 0);
      const scan = state.personnelScans[String(building.id)] || null;
      const requiredQualifications = {};
      for (const vehicle of building.vehicles) for (const training of vehicle.training) requiredQualifications[training.key] = (requiredQualifications[training.key] || 0) + training.required;
      const qualificationBalance = Object.keys({ ...requiredQualifications, ...(scan?.counts || {}) }).map((key) => {
        const required = Number(requiredQualifications[key] || 0);
        const available = Number(scan?.counts?.[key] || 0);
        return { key, required, available, difference: available - required, names: scan?.names?.[key] || [] };
      });
      const scannedTrainingGap = qualificationBalance.reduce((sum, entry) => sum + Math.max(0, -entry.difference), 0);
      return {
        ...building,
        personnel,
        targetCrew,
        assigned,
        unassigned: Math.max(0, personnel - assigned),
        reserve: Math.max(0, personnel - targetCrew),
        shortage: Math.max(0, targetCrew - personnel),
        assignmentGap: Number(building.summary.missingCrew || 0),
        trainingGap: scan ? scannedTrainingGap : Number(building.summary.missingTraining || 0),
        personnelScan: scan,
        qualificationBalance,
      };
    });
    const transferSuggestions = suggestPersonnelTransfers(personnelRows);
    const modelBuildingById = new Map(buildings.map((building) => [building.id, building]));
    const utilizationRows = state.analyzed.map((vehicle) => {
      const distance = distanceByVehicle.get(vehicle.id) || {};
      const building = modelBuildingById.get(vehicle.buildingId);
      return { ...vehicle, district: building?.district || "", dispatchCenterCaption: building?.dispatchCenterCaption || "Ohne Leitstelle", distanceTotal: Number(distance.distance_km || 0), distance30d: Number(distance.distance_km_30d || 0) };
    });
    const averages = new Map();
    const globalAverage30d = utilizationRows.reduce((sum, vehicle) => sum + vehicle.distance30d, 0) / Math.max(1, utilizationRows.length);
    for (const vehicle of utilizationRows) {
      const value = averages.get(vehicle.typeId) || { sum: 0, count: 0 };
      value.sum += vehicle.distance30d;
      value.count += 1;
      averages.set(vehicle.typeId, value);
    }
    for (const vehicle of utilizationRows) {
      const typeValues = averages.get(vehicle.typeId) || { sum: 0, count: 0 };
      const average = typeValues.count > 1 ? typeValues.sum / typeValues.count : globalAverage30d;
      vehicle.typeAverage30d = average;
      vehicle.utilization = average <= 0 ? "unknown" : vehicle.distance30d > average * 1.5 ? "high" : vehicle.distance30d < average * .35 ? "low" : "normal";
    }
    const alerts = [];
    for (const building of operationalBuildings) {
      const missingCrew = Number(building.summary.missingCrew || 0);
      const missingTraining = Number(building.summary.missingTraining || 0);
      if (building.enabled === false) alerts.push({ priority: 3, title: building.caption, detail: "Wache ist inaktiv", tab: "buildings" });
      if (missingCrew) alerts.push({ priority: 4, title: building.caption, detail: `${missingCrew} Personen fehlen auf Fahrzeugen`, tab: "personnel" });
      if (missingTraining) alerts.push({ priority: 4, title: building.caption, detail: `${missingTraining} benötigte Ausbildungen fehlen`, tab: "training" });
    }
    const runningExtensions = extensions.filter((entry) => entry.status === "building");
    const inactiveExtensions = extensions.filter((entry) => entry.status === "inactive");
    if (runningExtensions.length) alerts.push({ priority: 1, title: "Laufende Ausbauten", detail: `${runningExtensions.length} Ausbauten befinden sich im Bau`, tab: "extensions" });
    if (inactiveExtensions.length) alerts.push({ priority: 2, title: "Fertige Ausbauten", detail: `${inactiveExtensions.length} Ausbauten sind fertig, aber inaktiv`, tab: "extensions" });
    return { buildings, stationBuildings, operationalBuildings, dispatchCenters, regions, extensions, personnelRows, transferSuggestions, utilizationRows, alerts: alerts.sort((a, b) => b.priority - a.priority || a.title.localeCompare(b.title, "de")) };
  }

  function normalizeBuildingExtensions(building) {
    const type = state.buildingTypes[String(building.building_type)] || {};
    const catalogRaw = type.extensions || type.extension || [];
    const catalog = Array.isArray(catalogRaw)
      ? catalogRaw
      : Object.entries(catalogRaw).map(([id, entry]) => typeof entry === "string" ? { id, caption: entry } : { id, ...entry });
    const owned = Array.isArray(building.extensions) ? building.extensions : [];
    const rows = owned.map((extension, index) => {
      const availableAt = extension.available_at ? new Date(extension.available_at) : null;
      const running = availableAt && !Number.isNaN(availableAt.valueOf()) && availableAt.valueOf() > Date.now();
      const status = running ? "building" : extension.enabled === false || extension.active === false ? "inactive" : "active";
      return {
        buildingId: building.id,
        buildingCaption: building.caption,
        buildingType: building.typeCaption,
        dispatchCenterCaption: building.dispatchCenterCaption,
        district: building.district,
        id: extension.type_id ?? extension.id ?? index,
        caption: extension.caption || extension.name || catalog.find((entry) => String(entry.id ?? entry.type_id) === String(extension.type_id ?? extension.id))?.caption || `Ausbau ${extension.type_id ?? extension.id ?? index + 1}`,
        status,
        availableAt: running ? availableAt : null,
      };
    });
    const ownedIds = new Set(owned.map((extension) => String(extension.type_id ?? extension.id)));
    for (const [index, extension] of catalog.entries()) {
      const id = extension.type_id ?? extension.id ?? index;
      if (ownedIds.has(String(id))) continue;
      rows.push({ buildingId: building.id, buildingCaption: building.caption, buildingType: building.typeCaption, dispatchCenterCaption: building.dispatchCenterCaption, district: building.district, id, caption: extension.caption || extension.name || `Ausbau ${id}`, status: "missing", availableAt: null });
    }
    return rows;
  }

  function readinessScore({ targetCrew, missingCrew, missingTraining, buildings, inactive }) {
    if (!buildings || inactive >= buildings) return 0;
    const crewPenalty = targetCrew ? Math.min(55, missingCrew / targetCrew * 100) : 0;
    const trainingPenalty = targetCrew ? Math.min(25, missingTraining / targetCrew * 80) : 0;
    const inactivePenalty = Math.min(20, inactive / buildings * 35);
    return Math.max(0, Math.round(100 - crewPenalty - trainingPenalty - inactivePenalty));
  }

  function readinessTone(score) {
    return score >= 90 ? "ok" : score >= 70 ? "warn" : score > 0 ? "danger" : "neutral";
  }

  function suggestPersonnelTransfers(rows) {
    const donors = rows.filter((row) => row.reserve > 0).map((row) => ({ ...row, availableReserve: row.reserve }));
    const suggestions = rows.filter((row) => row.assignmentGap > 0 && row.unassigned > 0).map((row) => ({ kind: "assign", to: row, amount: Math.min(row.assignmentGap, row.unassigned), sameDispatch: true }));
    for (const target of rows.filter((row) => row.shortage > 0).sort((a, b) => b.shortage - a.shortage)) {
      let remaining = target.shortage;
      const ordered = donors.slice().sort((a, b) => Number(b.dispatchCenterId === target.dispatchCenterId) - Number(a.dispatchCenterId === target.dispatchCenterId) || b.availableReserve - a.availableReserve);
      for (const donor of ordered) {
        if (!remaining || donor.availableReserve <= 0 || donor.id === target.id) continue;
        const amount = Math.min(remaining, donor.availableReserve);
        donor.availableReserve -= amount;
        const original = donors.find((entry) => entry.id === donor.id);
        if (original) original.availableReserve = donor.availableReserve;
        remaining -= amount;
        suggestions.push({ kind: "transfer", from: donor, to: target, amount, sameDispatch: donor.dispatchCenterId === target.dispatchCenterId });
      }
    }
    for (const target of rows) {
      for (const deficit of target.qualificationBalance.filter((entry) => entry.difference < 0)) {
        const donor = rows.filter((row) => row.id !== target.id).map((row) => ({ row, balance: row.qualificationBalance.find((entry) => entry.key === deficit.key) })).filter((entry) => entry.balance?.difference > 0).sort((a, b) => Number(b.row.dispatchCenterId === target.dispatchCenterId) - Number(a.row.dispatchCenterId === target.dispatchCenterId) || b.balance.difference - a.balance.difference)[0];
        if (!donor) continue;
        suggestions.push({ kind: "qualification", from: donor.row, to: target, amount: Math.min(-deficit.difference, donor.balance.difference), qualification: trainingName(deficit.key), sameDispatch: donor.row.dispatchCenterId === target.dispatchCenterId });
      }
    }
    return suggestions;
  }

  function renderDashboard(content) {
    const model = state.operationalModel;
    if (!model) return;
    const criticalRegions = model.regions.slice().sort((a, b) => a.readiness - b.readiness).slice(0, 5);
    const lowVehicles = model.utilizationRows.filter((vehicle) => vehicle.utilization === "low").length;
    const runningExtensions = model.extensions.filter((entry) => entry.status === "building").length;
    const inactiveExtensions = model.extensions.filter((entry) => entry.status === "inactive").length;
    const unassignedBuildings = model.operationalBuildings.filter((building) => building.dispatchCenterId === null).length;
    const cards = [
      ["Einsatzbereitschaft", `${Math.round(model.regions.reduce((sum, region) => sum + region.readiness, 0) / Math.max(1, model.regions.length))}%`, "Gebiete", "regions", "region"],
      ["Ohne Leitstelle", unassignedBuildings, "Wachen", "regions", "building"],
      ["Personalengpässe", model.personnelRows.filter((row) => row.shortage > 0 || row.assignmentGap > 0).length, "Wachen", "personnel", "users"],
      ["Ausbauten", `${runningExtensions} / ${inactiveExtensions}`, "im Bau / inaktiv", "extensions", "extension"],
      ["Wenig ausgelastet", lowVehicles, "Fahrzeuge", "utilization", "gauge"],
      ["Lehrgänge", state.schoolings.length, "laufend", "courses", "calendar"],
    ].map(([label, value, hint, tab, iconName]) => `<button type="button" class="lssfo-dashboard-card" data-tab="${tab}"><i>${icon(iconName)}</i><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong><small>${escapeHtml(hint)}</small></button>`).join("");
    const alerts = model.alerts.slice(0, 10).map((alert) => `<button type="button" class="lssfo-alert-row priority-${alert.priority}" data-tab="${alert.tab}"><span><strong>${escapeHtml(alert.title)}</strong><small>${escapeHtml(alert.detail)}</small></span>${icon("chevron")}</button>`).join("") || '<div class="lssfo-empty lssfo-empty-small">Keine kritischen Hinweise.</div>';
    const regions = criticalRegions.map((region) => `<button type="button" class="lssfo-readiness-row" data-tab="regions"><span><strong>${escapeHtml(region.caption)}</strong><small>${region.buildings.length} Wachen · ${region.missingCrew} Personal fehlt</small></span><b class="${readinessTone(region.readiness)}">${region.readiness}%</b></button>`).join("");
    content.innerHTML = `<div class="lssfo-dashboard-grid">${cards}</div><div class="lssfo-dashboard-columns"><section class="lssfo-dashboard-panel"><div class="lssfo-section-heading"><div><h3>Handlungsbedarf</h3><p>Die wichtigsten offenen Punkte aus allen Bereichen</p></div></div>${alerts}</section><section class="lssfo-dashboard-panel"><div class="lssfo-section-heading"><div><h3>Kritischste Gebiete</h3><p>Bereitschaft aus Personal, Ausbildung und Aktivstatus</p></div></div>${regions || '<div class="lssfo-empty lssfo-empty-small">Keine Gebiete erkannt.</div>'}</section></div>`;
  }

  function renderRegions(content) {
    const model = state.operationalModel;
    const rows = model.regions.filter((region) => (!state.onlyMissing || region.readiness < 90) && matchesQuery(region.caption, ...region.districts, ...region.federalStates));
    const note = `<div class="lssfo-callout"><strong>Kontostandard</strong><span>Fehlende Wachen- und Fahrzeugtypen werden mit den Typen verglichen, die in deinen übrigen Leitstellengebieten bereits vorhanden sind.</span></div>`;
    content.innerHTML = note + table(["Leitstelle / Gebiet", "Bundesland", "Bezirke", "Wachen", "Fahrzeuge", "Personal", "Fehlbedarf", "Bereitschaft", "Lücken"], rows.map((region) => [
      `${region.key === "none" ? badge("ohne Zuordnung", "danger") : `<a href="/buildings/${region.key}" target="_blank" rel="noopener">${escapeHtml(region.caption)}</a>`}`,
      escapeHtml(region.federalStates.join(", ") || "–"),
      escapeHtml(region.districts.join(", ") || "–"),
      region.buildings.length,
      region.vehicles.length,
      `${region.personnel} / ${region.targetCrew}`,
      `${region.missingCrew ? badge(`${region.missingCrew} Pers.`, "danger") : badge("0 Pers.", "ok")} ${region.missingTraining ? badge(`${region.missingTraining} Ausb.`, "warn") : ""}`,
      `<span class="lssfo-readiness-badge ${readinessTone(region.readiness)}">${region.readiness}%</span>`,
      `<small>${formatMissingList("Fahrzeuge", region.missingVehicleTypes)}${formatMissingList("Wachen", region.missingBuildingTypes)}</small>`,
    ]), rows.length, "regions");
  }

  function formatMissingList(label, values) {
    if (!values.length) return `<span class="lssfo-plan-complete">${label}: vollständig</span><br>`;
    const visible = values.slice(0, 5).join(", ");
    return `<span><b>${label}:</b> ${escapeHtml(visible)}${values.length > 5 ? ` +${values.length - 5}` : ""}</span><br>`;
  }

  function renderExtensions(content) {
    const statusMatches = (entry) => {
      if (state.extensionStatus === "owned") return entry.status !== "missing";
      if (state.extensionStatus === "attention") return entry.status === "building" || entry.status === "inactive";
      if (state.extensionStatus === "all") return true;
      return entry.status === state.extensionStatus;
    };
    const rows = state.operationalModel.extensions.filter((entry) => statusMatches(entry)
      && (!state.onlyMissing || entry.status !== "active")
      && matchesQuery(entry.caption, entry.buildingCaption, entry.buildingType, entry.dispatchCenterCaption, entry.district));
    const visibleRows = Number.isFinite(state.extensionLimit) ? rows.slice(0, state.extensionLimit) : rows;
    const limitValue = Number.isFinite(state.extensionLimit) ? String(state.extensionLimit) : "all";
    const controls = `<div class="lssfo-content-actions lssfo-extension-actions"><div><strong>Ausbauverwaltung</strong><span>Standardmäßig werden nur vorhandene Ausbauten geladen. Katalogmöglichkeiten können bei Bedarf eingeblendet werden.</span></div><div class="lssfo-extension-controls"><label>Status<select id="lssfo-extension-status"><option value="owned"${state.extensionStatus === "owned" ? " selected" : ""}>Vorhanden</option><option value="attention"${state.extensionStatus === "attention" ? " selected" : ""}>Handlungsbedarf</option><option value="active"${state.extensionStatus === "active" ? " selected" : ""}>Aktiv</option><option value="building"${state.extensionStatus === "building" ? " selected" : ""}>Im Bau</option><option value="inactive"${state.extensionStatus === "inactive" ? " selected" : ""}>Fertig, inaktiv</option><option value="missing"${state.extensionStatus === "missing" ? " selected" : ""}>Katalog: noch möglich</option><option value="all"${state.extensionStatus === "all" ? " selected" : ""}>Alle Status</option></select></label><label>Maximal anzeigen<select id="lssfo-extension-limit"><option value="50"${limitValue === "50" ? " selected" : ""}>50</option><option value="100"${limitValue === "100" ? " selected" : ""}>100</option><option value="250"${limitValue === "250" ? " selected" : ""}>250</option><option value="500"${limitValue === "500" ? " selected" : ""}>500</option><option value="all"${limitValue === "all" ? " selected" : ""}>Alle</option></select></label></div></div>`;
    const limitNote = visibleRows.length < rows.length ? `<div class="lssfo-callout lssfo-limit-note"><strong>${formatNumber(visibleRows.length)} von ${formatNumber(rows.length)}</strong><span>Einträgen werden angezeigt. Grenze oben erhöhen oder Suche und Statusfilter verwenden.</span></div>` : "";
    content.innerHTML = controls + limitNote + table(["Wache", "Typ", "Leitstelle", "Bezirk", "Ausbau", "Status / Restzeit", "Verwaltung"], visibleRows.map((entry) => [
      `<a href="/buildings/${entry.buildingId}" target="_blank" rel="noopener">${escapeHtml(entry.buildingCaption)}</a>`,
      escapeHtml(entry.buildingType),
      escapeHtml(entry.dispatchCenterCaption),
      escapeHtml(entry.district || "–"),
      escapeHtml(entry.caption),
      extensionStatus(entry),
      `<button type="button" class="lssfo-btn lssfo-btn-small" data-action="native-building" data-building-id="${entry.buildingId}" data-building-name="${escapeHtml(entry.buildingCaption)}" data-native-section="extensions">Im Panel verwalten</button>`,
    ]), rows.length, "extensions");
  }

  function extensionStatus(entry) {
    if (entry.status === "building") return `${badge("im Bau", "warn")} <small>${escapeHtml(relativeTime(entry.availableAt))}</small>`;
    if (entry.status === "inactive") return badge("fertig, inaktiv", "danger");
    if (entry.status === "missing") return badge("fehlt", "warn");
    return badge("aktiv", "ok");
  }

  function relativeTime(date) {
    if (!(date instanceof Date) || Number.isNaN(date.valueOf())) return "–";
    const minutes = Math.max(0, Math.ceil((date.valueOf() - Date.now()) / 60000));
    const days = Math.floor(minutes / 1440);
    const hours = Math.floor((minutes % 1440) / 60);
    return days ? `noch ${days} T. ${hours} Std.` : `noch ${hours} Std. ${minutes % 60} Min.`;
  }

  function renderUtilization(content) {
    const rows = state.operationalModel.utilizationRows.filter((vehicle) => (!state.onlyMissing || vehicle.utilization === "low" || vehicle.utilization === "high") && matchesQuery(vehicle.caption, vehicle.typeCaption, vehicle.buildingCaption));
    const hasData = state.vehicleDistances.length > 0;
    const note = `<div class="lssfo-callout"><strong>${hasData ? "30-Tage-Auswertung" : "Keine Kilometerdaten"}</strong><span>${hasData ? "Niedrig und hoch werden relativ zum Durchschnitt desselben Fahrzeugtyps bewertet; bei Einzeltypen dient der Gesamtdurchschnitt als Referenz." : "Der offizielle Endpunkt /api/v1/vehicle_distances.json hat keine Werte geliefert."}</span></div>`;
    const topStation = topUtilizationGroup(state.operationalModel.utilizationRows, (vehicle) => vehicle.buildingCaption);
    const topType = topUtilizationGroup(state.operationalModel.utilizationRows, (vehicle) => vehicle.typeCaption);
    const topDistrict = topUtilizationGroup(state.operationalModel.utilizationRows, (vehicle) => vehicle.district || "Ohne Bezirk");
    const summary = `<div class="lssfo-utilization-summary"><article><span>Stärkste Wache</span><strong>${escapeHtml(topStation.caption)}</strong><small>${formatDecimal(topStation.distance)} km / 30 Tage</small></article><article><span>Stärkster Fahrzeugtyp</span><strong>${escapeHtml(topType.caption)}</strong><small>${formatDecimal(topType.distance)} km / 30 Tage</small></article><article><span>Stärkster Bezirk</span><strong>${escapeHtml(topDistrict.caption)}</strong><small>${formatDecimal(topDistrict.distance)} km / 30 Tage</small></article></div>`;
    content.innerHTML = note + summary + table(["Fahrzeug", "Typ", "Wache", "Bezirk", "Gesamt-km", "30 Tage", "Typdurchschnitt", "Bewertung", "Empfehlung"], rows.map((vehicle) => {
      const recommendation = vehicle.utilization === "low" ? "Standort oder Vorhaltung prüfen" : vehicle.utilization === "high" ? "Entlastungsfahrzeug prüfen" : "passende Auslastung";
      return [
        `<a href="/vehicles/${vehicle.id}" target="_blank" rel="noopener">${escapeHtml(vehicle.caption)}</a>`,
        escapeHtml(vehicle.typeCaption),
        escapeHtml(vehicle.buildingCaption),
        escapeHtml(vehicle.district || "–"),
        formatDecimal(vehicle.distanceTotal),
        formatDecimal(vehicle.distance30d),
        formatDecimal(vehicle.typeAverage30d),
        vehicle.utilization === "low" ? badge("niedrig", "warn") : vehicle.utilization === "high" ? badge("hoch", "danger") : vehicle.utilization === "normal" ? badge("normal", "ok") : badge("keine Daten", "neutral"),
        escapeHtml(recommendation),
      ];
    }), rows.length, "utilization");
  }

  function topUtilizationGroup(rows, keyFunction) {
    const groups = new Map();
    for (const row of rows) {
      const caption = keyFunction(row);
      groups.set(caption, (groups.get(caption) || 0) + row.distance30d);
    }
    const [caption = "–", distance = 0] = [...groups].sort((a, b) => b[1] - a[1])[0] || [];
    return { caption, distance };
  }

  function renderPersonnelPlanning(content) {
    const model = state.operationalModel;
    const rows = model.personnelRows.filter((row) => (!state.onlyMissing || row.shortage || row.assignmentGap || row.trainingGap) && matchesQuery(row.caption, row.typeCaption, row.dispatchCenterCaption, row.district));
    const suggestions = model.transferSuggestions.slice(0, 12).map((suggestion) => `<article class="lssfo-transfer-card"><span>${icon("transfer")}</span><div><strong>${suggestion.kind === "assign" ? `${suggestion.amount} freie Person${suggestion.amount === 1 ? "" : "en"} Fahrzeugen zuweisen` : suggestion.kind === "qualification" ? `${suggestion.amount}× ${escapeHtml(suggestion.qualification)} verschieben` : `${suggestion.amount} Person${suggestion.amount === 1 ? "" : "en"} verschieben`}</strong><small>${suggestion.kind === "assign" ? `${escapeHtml(suggestion.to.caption)} · Personal ist bereits an der Wache vorhanden` : `${escapeHtml(suggestion.from.caption)} → ${escapeHtml(suggestion.to.caption)}${suggestion.sameDispatch ? " · gleiche Leitstelle" : " · leitstellenübergreifend"}`}</small></div><button type="button" class="lssfo-btn lssfo-btn-small" data-action="native-building" data-building-id="${suggestion.to.id}" data-building-name="${escapeHtml(suggestion.to.caption)}" data-native-section="personnel">Personal öffnen</button></article>`).join("");
    const scanned = Object.keys(state.personnelScans).length;
    const planner = `<div class="lssfo-personnel-planner"><div class="lssfo-section-heading"><div><h3>Verschiebevorschläge</h3><p>Reserve wird zuerst innerhalb derselben Leitstelle verteilt; nach der Detailprüfung werden auch Ausbildungsüberschüsse berücksichtigt.</p></div><button type="button" class="lssfo-btn" data-action="scan-personnel">${state.personnelScanController ? `${icon("stop")} Prüfung stoppen` : `${icon("scan")} Personal detailliert prüfen`}</button></div>${scanned ? `<div class="lssfo-personnel-scan-note">${scanned} Wachen mit Namen, Verfügbarkeit und Ausbildungen geprüft.</div>` : ""}${suggestions || '<div class="lssfo-empty lssfo-empty-small">Keine sinnvolle Verschiebung aus den aktuellen Sollwerten ableitbar.</div>'}</div>`;
    content.innerHTML = planner + table(["Wache", "Typ", "Leitstelle", "Personal", "Fahrzeug-Soll", "Nicht zugewiesen", "Reserve", "Personal fehlt", "Zuweisung fehlt", "Ausbildungsbilanz", "Aktion"], rows.map((row) => [
      `<a href="/buildings/${row.id}" target="_blank" rel="noopener">${escapeHtml(row.caption)}</a>`,
      escapeHtml(row.typeCaption),
      escapeHtml(row.dispatchCenterCaption),
      row.personnel,
      row.targetCrew,
      row.unassigned,
      row.reserve ? badge(row.reserve, "ok") : "0",
      row.shortage ? badge(row.shortage, "danger") : badge("0", "ok"),
      row.assignmentGap ? badge(row.assignmentGap, "danger") : badge("0", "ok"),
      renderQualificationBalance(row),
      `<button type="button" class="lssfo-btn lssfo-btn-small" data-action="native-building" data-building-id="${row.id}" data-building-name="${escapeHtml(row.caption)}" data-native-section="personnel">Personal verwalten</button>`,
    ]), rows.length, "personnel-planning");
  }

  function renderQualificationBalance(row) {
    if (!row.personnelScan) return row.trainingGap ? badge(`${row.trainingGap} fehlt`, "warn") : '<span class="lssfo-muted">Detailprüfung offen</span>';
    if (!row.qualificationBalance.length) return badge("keine Anforderungen", "neutral");
    return row.qualificationBalance.map((entry) => {
      const tone = entry.difference < 0 ? "danger" : entry.difference > 0 ? "warn" : "ok";
      const suffix = entry.difference < 0 ? `${-entry.difference} fehlt` : entry.difference > 0 ? `${entry.difference} Reserve` : "passend";
      const title = entry.names.length ? ` title="${escapeHtml(entry.names.join(", "))}"` : "";
      return `<span class="lssfo-badge ${tone}"${title}>${escapeHtml(trainingName(entry.key))}: ${entry.available}/${entry.required} · ${suffix}</span>`;
    }).join(" ");
  }

  function formatDecimal(value) {
    return decimalFormat.format(Number(value || 0));
  }

  function renderVehicles(content) {
    const rows = state.analyzed.filter((vehicle) => {
      const missing = vehicle.missingCrew > 0 || vehicle.missingTraining > 0;
      return (!state.onlyMissing || missing) && matchesQuery(vehicle.caption, vehicle.typeCaption, vehicle.buildingCaption);
    });
    content.innerHTML = table(
      ["Fahrzeug", "Typ", "Wache", "Soll", "Zugewiesen", "Fehlt", "Ausbildung", "Verwaltung"],
      rows.map((vehicle) => {
        const training = vehicle.training.length
          ? vehicle.training.map((item) => `${trainingName(item.key)}: ${item.required}${item.actual === null ? "" : ` / ${item.actual}`}`).join("<br>")
          : '<span class="lssfo-muted">keine</span>';
        const educationBadge = vehicle.missingTraining
          ? badge(`${vehicle.missingTraining} fehlt`, "danger")
          : vehicle.training.length && vehicle.educationScanned ? badge("geprüft", "ok") : "";
        return [
          `<a href="/vehicles/${vehicle.id}/zuweisung" target="_blank" rel="noopener">${escapeHtml(vehicle.caption)}</a>`,
          escapeHtml(vehicle.typeCaption),
          `<a href="/buildings/${vehicle.buildingId}" target="_blank" rel="noopener">${escapeHtml(vehicle.buildingCaption)}</a>`,
          `${vehicle.target} <small class="lssfo-muted">(${vehicle.staffMin}–${vehicle.staffMax})</small>`,
          vehicle.assigned,
          vehicle.missingCrew ? badge(vehicle.missingCrew, "danger") : badge("0", "ok"),
          `<span class="lssfo-training-cell">${training}${educationBadge}</span>`,
          `<button type="button" class="lssfo-btn lssfo-btn-small" data-action="manage-vehicle" data-id="${vehicle.id}">Bearbeiten</button>`,
        ];
      }),
      rows.length,
      "vehicles",
    );
  }

  function renderBuildings(content) {
    const operationalById = new Map((state.operationalModel?.buildings || []).map((building) => [Number(building.id), building]));
    const rows = state.buildingSummary.map((building) => ({ ...building, isDispatchCenter: operationalById.get(Number(building.id))?.isDispatchCenter === true })).filter((building) => {
      const type = state.buildingTypes[String(building.typeId)]?.caption || `Typ ${building.typeId}`;
      const missing = !building.isDispatchCenter && (building.missingCrew > 0 || building.missingTraining > 0);
      return (!state.onlyMissing || missing) && matchesQuery(building.caption, type);
    });
    content.innerHTML = table(
      ["Wache", "Typ", "Fahrzeuge", "Personal", "Zugewiesen", "Frei", "Besatzung fehlt", "Status", "Verwaltung"],
      rows.map((building) => {
        const type = state.buildingTypes[String(building.typeId)]?.caption || `Typ ${building.typeId}`;
        const noOperations = building.isDispatchCenter;
        return [
          `<a href="/buildings/${building.id}" target="_blank" rel="noopener">${escapeHtml(building.caption)}</a>`,
          `${escapeHtml(type)}${noOperations ? ` ${badge("Verwaltung", "neutral")}` : ""}`,
          noOperations ? '<span class="lssfo-not-applicable">–</span>' : building.vehicles,
          noOperations ? '<span class="lssfo-not-applicable">nicht verfügbar</span>' : building.personnelTarget ? `${building.personnel} <small class="lssfo-muted">Soll ${building.personnelTarget}</small>` : building.personnel,
          noOperations ? '<span class="lssfo-not-applicable">–</span>' : `${building.assigned} / ${building.targetCrew}`,
          noOperations ? '<span class="lssfo-not-applicable">–</span>' : building.free,
          noOperations ? badge("nicht relevant", "neutral") : building.missingCrew ? badge(building.missingCrew, "danger") : badge("0", "ok"),
          `<span class="lssfo-status-action">${building.enabled ? badge("aktiv", "ok") : badge("inaktiv", "warn")}<button type="button" class="lssfo-btn lssfo-btn-small" data-action="building-status-toggle" data-building-id="${building.id}"${state.buildingStatusSaving !== null ? " disabled" : ""}>${state.buildingStatusSaving === building.id ? "Bitte warten …" : building.enabled ? "Deaktivieren" : "Aktivieren"}</button></span>`,
          `<button type="button" class="lssfo-btn lssfo-btn-small" data-action="manage-building" data-id="${building.id}">Bearbeiten</button>`,
        ];
      }),
      rows.length,
      "buildings",
    );
  }

  function renderTraining(content) {
    const summary = Core.summarizeTraining(state.analyzed).filter((item) => {
      const missing = item.scannedVehicles && item.missing > 0;
      return (!state.onlyMissing || missing) && matchesQuery(item.school, item.key, trainingName(item.key));
    });
    const hasScan = Object.keys(state.scans).length > 0;
    const intro = `<div class="lssfo-callout">
      <strong>${hasScan ? "Ausbildungsprüfung aktiv" : "Ausbildungsbedarf berechnet"}</strong>
      <span>${hasScan
        ? "„Vorhanden“ zählt passend ausgebildete, dem jeweiligen Fahrzeug zugewiesene Personen."
        : "Klicke auf „Ausbildungen prüfen“, um die tatsächlichen Fahrzeugzuweisungen schonend und nacheinander zu prüfen."}</span>
    </div>`;
    content.innerHTML = intro + table(
      ["Ausbildung", "Bereich", "Fahrzeuge", "Benötigte Plätze", "Vorhanden", "Fehlt", "Prüfstand"],
      summary.map((item) => [
        escapeHtml(trainingName(item.key)),
        escapeHtml(item.school),
        item.vehicles,
        item.required,
        item.scannedVehicles ? item.actual : '<span class="lssfo-muted">–</span>',
        item.scannedVehicles ? (item.missing ? badge(item.missing, "danger") : badge("0", "ok")) : '<span class="lssfo-muted">–</span>',
        `${item.scannedVehicles} / ${item.vehicles}`,
      ]),
      summary.length,
      "training",
    );
  }

  function renderCourses(content) {
    const courses = state.schoolings.filter((course) => matchesQuery(
      course.caption, course.name, course.schooling_name, course.building_caption, course.education_title,
    ));
    const courseActions = `<div class="lssfo-content-actions"><div><strong>Lehrgangsverwaltung</strong><span>Eigene Schule auswählen und die Spieloberfläche direkt im Panel verwenden.</span></div><button type="button" class="lssfo-btn lssfo-btn-primary" data-action="course-open">${icon("plus")}<span>Lehrgang starten</span></button></div>`;
    if (!courses.length) {
      content.innerHTML = `${courseActions}<div class="lssfo-empty">Keine laufenden eigenen Lehrgänge gefunden.</div>`;
      return;
    }
    content.innerHTML = courseActions + table(
      ["Lehrgang", "Schule", "Beginn", "Ende", "Teilnehmer"],
      courses.map((course) => [
        escapeHtml(course.caption || course.name || course.schooling_name || course.education_title || `Lehrgang ${course.id ?? ""}`),
        escapeHtml(course.building_caption || course.school_caption || course.school || "–"),
        formatDate(course.start_at || course.start || course.created_at),
        formatDate(course.finish_at || course.end_at || course.end),
        course.participants_count ?? course.participants?.length ?? course.personal_count ?? "–",
      ]),
      courses.length,
      "courses",
    );
  }

  function renderMap(content) {
    const buildingById = new Map(state.buildingSummary.map((building) => [Number(building.id), building]));
    const operationalById = new Map((state.operationalModel?.buildings || []).map((building) => [Number(building.id), building]));
    const districtGeoJson = state.districtsEnabled ? getDistrictGeoJson() : null;
    const buildingDistricts = new Map(state.buildings.map((building) => [
      Number(building.id),
      districtGeoJson ? districtAtPoint(Number(building.longitude), Number(building.latitude), districtGeoJson) : "",
    ]));
    const vehiclesByBuilding = new Map();
    for (const vehicle of state.analyzed) {
      const id = Number(vehicle.buildingId);
      if (!vehiclesByBuilding.has(id)) vehiclesByBuilding.set(id, []);
      vehiclesByBuilding.get(id).push(vehicle);
    }
    const vehicleTypes = [...new Map(state.analyzed.map((vehicle) => [String(vehicle.typeId), vehicle.typeCaption])).entries()]
      .sort((a, b) => a[1].localeCompare(b[1], "de", { numeric: true }));
    const buildingTypes = [...new Map(state.buildings.map((building) => {
      const type = state.buildingTypes[String(building.building_type)]?.caption || `Typ ${building.building_type}`;
      return [String(building.building_type), type];
    })).entries()].sort((a, b) => a[1].localeCompare(b[1], "de", { numeric: true }));
    const districts = [...new Set([...buildingDistricts.values()].filter(Boolean))]
      .sort((a, b) => a.localeCompare(b, "de", { numeric: true }));
    const dispatchCenters = (state.operationalModel?.dispatchCenters || []).map((building) => [String(building.id), building.caption])
      .sort((a, b) => a[1].localeCompare(b[1], "de", { numeric: true }));
    const locations = state.buildings.filter((building) => {
      const latitude = Number(building.latitude);
      const longitude = Number(building.longitude);
      if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) return false;
      const summary = buildingById.get(Number(building.id));
      const vehicles = vehiclesByBuilding.get(Number(building.id)) || [];
      const missing = (summary?.missingCrew || 0) > 0 || (summary?.missingTraining || 0) > 0;
      const hasSelectedVehicle = state.mapVehicleType === "all"
        || vehicles.some((vehicle) => String(vehicle.typeId) === state.mapVehicleType);
      const hasSelectedBuildingType = state.mapBuildingType === "all"
        || String(building.building_type) === state.mapBuildingType;
      const district = buildingDistricts.get(Number(building.id)) || "";
      const hasSelectedDistrict = state.mapDistrict === "all" || district === state.mapDistrict;
      const dispatchCenterId = operationalById.get(Number(building.id))?.dispatchCenterId;
      const hasSelectedDispatch = state.mapDispatchCenter === "all" || (state.mapDispatchCenter === "none" ? dispatchCenterId === null : String(dispatchCenterId) === state.mapDispatchCenter);
      return hasSelectedVehicle && hasSelectedBuildingType && hasSelectedDistrict && hasSelectedDispatch && (!state.onlyMissing || missing) && matchesQuery(
        building.caption,
        state.buildingTypes[String(building.building_type)]?.caption,
        district,
        ...vehicles.flatMap((vehicle) => [vehicle.caption, vehicle.typeCaption]),
      );
    });
    if (!locations.length) {
      content.innerHTML = `${mapFilterControls(vehicleTypes, buildingTypes, districts, dispatchCenters, Boolean(districtGeoJson))}<div class="lssfo-empty">Keine Wache erfüllt die gewählten Kartenfilter.</div>`;
      return;
    }
    const list = locations.slice().sort((a, b) => String(a.caption).localeCompare(String(b.caption), "de", { numeric: true })).map((building) => {
      const allVehicles = vehiclesByBuilding.get(Number(building.id)) || [];
      const vehicles = state.mapVehicleType === "all"
        ? allVehicles
        : allVehicles.filter((vehicle) => String(vehicle.typeId) === state.mapVehicleType);
      const countLabel = state.mapVehicleType === "all" ? `${formatNumber(vehicles.length)} Fz.` : `${formatNumber(vehicles.length)} Treffer`;
      const district = buildingDistricts.get(Number(building.id));
      const enabled = building.enabled !== false;
      const dispatchCaption = operationalById.get(Number(building.id))?.dispatchCenterCaption;
      const subline = [state.buildingTypes[String(building.building_type)]?.caption || "Wache", district ? `Bezirk ${district}` : "", dispatchCaption, enabled ? "aktiv" : "inaktiv"].filter(Boolean).join(" · ");
      return `<button type="button" class="lssfo-map-list-item${enabled ? "" : " is-inactive"}" data-action="map-focus" data-building-id="${building.id}"><span><strong>${escapeHtml(building.caption)}</strong><small>${escapeHtml(subline)}</small></span><b>${countLabel}</b></button>`;
    }).join("");
    content.innerHTML = `${mapFilterControls(vehicleTypes, buildingTypes, districts, dispatchCenters, Boolean(districtGeoJson))}<div class="lssfo-map-layout">
      <aside class="lssfo-map-list"><div class="lssfo-map-list-head"><strong>${formatNumber(locations.length)} Wachen</strong><span>Wache anklicken, um die stationierten Fahrzeuge zu sehen.</span></div>${list}</aside>
      <div class="lssfo-map-stage"><div class="lssfo-map-legend"><span><i class="ok"></i> vollständig</span><span><i class="danger"></i> Fehlbedarf</span><span><i class="inactive"></i> inaktiv</span></div><div id="lssfo-map-canvas" aria-label="Karte der Wachen und Fahrzeuge"></div></div>
    </div>`;
    initializeOverviewMap(locations, buildingById, vehiclesByBuilding, districtGeoJson, buildingDistricts);
  }

  function mapFilterControls(vehicleTypes, buildingTypes, districts, dispatchCenters, districtDataAvailable) {
    const vehicleOptions = vehicleTypes.map(([id, caption]) => `<option value="${escapeHtml(id)}"${state.mapVehicleType === id ? " selected" : ""}>${escapeHtml(caption)}</option>`).join("");
    const buildingOptions = buildingTypes.map(([id, caption]) => `<option value="${escapeHtml(id)}"${state.mapBuildingType === id ? " selected" : ""}>${escapeHtml(caption)}</option>`).join("");
    const districtOptions = districts.map((name) => `<option value="${escapeHtml(name)}"${state.mapDistrict === name ? " selected" : ""}>${escapeHtml(name)}</option>`).join("");
    const dispatchOptions = dispatchCenters.map(([id, caption]) => `<option value="${escapeHtml(id)}"${state.mapDispatchCenter === id ? " selected" : ""}>${escapeHtml(caption)}</option>`).join("");
    const active = state.mapVehicleType !== "all" || state.mapBuildingType !== "all" || state.mapDistrict !== "all" || state.mapDispatchCenter !== "all";
    return `<div class="lssfo-map-filters">
      <label>Fahrzeugtyp<select id="lssfo-map-vehicle-filter"><option value="all">Alle Fahrzeugtypen</option>${vehicleOptions}</select></label>
      <label>Wachenart<select id="lssfo-map-building-filter"><option value="all">Alle Wachenarten</option>${buildingOptions}</select></label>
      <label>Leitstelle<select id="lssfo-map-dispatch-filter"><option value="all">Alle Leitstellen</option><option value="none"${state.mapDispatchCenter === "none" ? " selected" : ""}>Ohne Leitstelle</option>${dispatchOptions}</select></label>
      <label>Bezirk<select id="lssfo-map-district-filter"${state.districtsEnabled && districtDataAvailable ? "" : " disabled"}><option value="all">Alle Bezirke</option>${districtOptions}</select></label>
      <label class="lssfo-district-toggle"><input id="lssfo-map-district-toggle" type="checkbox"${state.districtsEnabled ? " checked" : ""}> Bezirksgrenzen</label>
      <label class="lssfo-district-toggle"><input id="lssfo-map-readiness-toggle" type="checkbox"${state.readinessEnabled ? " checked" : ""}${state.districtsEnabled && districtDataAvailable ? "" : " disabled"}> Bereitschaft</label>
      <label class="lssfo-district-toggle"><input id="lssfo-map-coverage-toggle" type="checkbox"${state.coverageEnabled ? " checked" : ""}> Leitstellengebiete</label>
      <button type="button" class="lssfo-btn" data-action="map-filter-reset"${active ? "" : " disabled"}>Filter zurücksetzen</button>
      <span>${state.districtsEnabled ? (districtDataAvailable ? "Bezirke: Statistik Austria / GeoSphere Austria, Stand Februar 2025 (CC BY 4.0)" : "Bezirksdaten konnten nicht geladen werden") : "Bezirksanzeige ausgeschaltet"}</span>
    </div>`;
  }

  function initializeOverviewMap(buildings, buildingById, vehiclesByBuilding, districtGeoJson, buildingDistricts) {
    const Leaflet = globalThis.L;
    const container = shell.querySelector("#lssfo-map-canvas");
    if (!container || !Leaflet) {
      if (container) container.innerHTML = '<div class="lssfo-empty">Die Kartenbibliothek konnte nicht geladen werden. Bitte die Seite neu laden.</div>';
      return;
    }
    // Canvas statt SVG: Die Bezirksgrenzen haben über 200.000 Punkte.
    const map = Leaflet.map(container, { zoomControl: true, preferCanvas: true });
    // Leaflet benötigt vor dem ersten GeoJSON-Vektor eine gültige Kartenansicht.
    // Die Ansicht wird nach dem Aufbau auf die gefilterten Wachen eingepasst.
    map.setView([47.6, 14.2], 7);
    Leaflet.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a>',
    }).addTo(map);
    if (districtGeoJson) {
      const dark = shell.dataset.theme === "dark";
      const readinessByDistrict = new Map();
      for (const building of state.operationalModel?.operationalBuildings || []) {
        if (!building.district) continue;
        const values = readinessByDistrict.get(building.district) || { buildings: 0, inactive: 0, targetCrew: 0, missingCrew: 0, missingTraining: 0 };
        values.buildings += 1;
        values.inactive += building.enabled === false ? 1 : 0;
        values.targetCrew += Number(building.summary.targetCrew || 0);
        values.missingCrew += Number(building.summary.missingCrew || 0);
        values.missingTraining += Number(building.summary.missingTraining || 0);
        readinessByDistrict.set(building.district, values);
      }
      Leaflet.geoJSON(getDistrictDisplayGeoJson() || districtGeoJson, {
        interactive: false,
        style: (feature) => {
          const values = readinessByDistrict.get(formatDistrictName(feature.properties?.name));
          const score = values ? readinessScore(values) : 0;
          const fill = !state.readinessEnabled ? (dark ? "#f0ad4e" : "#f6b44d") : score >= 90 ? "#5cb85c" : score >= 70 ? "#f0ad4e" : score > 0 ? "#d9534f" : "#8a9297";
          return { color: state.readinessEnabled ? fill : dark ? "#f0ad4e" : "#a45c00", weight: 2, opacity: .88, fillColor: fill, fillOpacity: state.readinessEnabled ? .13 : dark ? .045 : .035, dashArray: "7 5" };
        },
        onEachFeature: (feature, layer) => {
          const name = formatDistrictName(feature.properties?.name);
          const values = readinessByDistrict.get(name);
          const score = values ? readinessScore(values) : null;
          if (name) layer.bindTooltip(`${escapeHtml(name)}${state.readinessEnabled && score !== null ? ` · ${score}%` : ""}`, { permanent: true, direction: "center", className: "lssfo-district-label" });
        },
      }).addTo(map);
    }
    if (state.coverageEnabled) addDispatchCoverage(map, Leaflet);
    state.mapInstance = map;
    state.mapMarkers = new Map();
    const bounds = [];
    for (const building of buildings) {
      const id = Number(building.id);
      const latitude = Number(building.latitude);
      const longitude = Number(building.longitude);
      const summary = buildingById.get(id);
      const allVehicles = vehiclesByBuilding.get(id) || [];
      const vehicles = state.mapVehicleType === "all"
        ? allVehicles
        : allVehicles.filter((vehicle) => String(vehicle.typeId) === state.mapVehicleType);
      const missing = (summary?.missingCrew || 0) > 0 || (summary?.missingTraining || 0) > 0;
      const enabled = building.enabled !== false;
      const marker = Leaflet.circleMarker([latitude, longitude], {
        radius: Math.min(14, 6 + Math.sqrt(vehicles.length)),
        weight: 2,
        color: enabled ? (missing ? "#a94442" : "#3c763d") : "#5f666b",
        fillColor: enabled ? (missing ? "#d9534f" : "#5cb85c") : "#8a9297",
        fillOpacity: .88,
      });
      // Popup-Inhalt erst beim Öffnen erzeugen – sonst entsteht das HTML für jede Wache vorab.
      const vehicleRows = () => vehicles.length
        ? vehicles.slice().sort((a, b) => textCollator.compare(a.caption, b.caption)).map((vehicle) => {
          const missingCrew = Number(vehicle.missingCrew || 0);
          const missingTraining = Number(vehicle.missingTraining || 0);
          const hasMissing = missingCrew > 0 || missingTraining > 0;
          const status = missingCrew > 0
            ? `${missingCrew} Pers. fehlt${missingCrew === 1 ? "" : "en"}`
            : missingTraining > 0 ? `${missingTraining} Ausbildung fehlt` : "vollständig";
          return `<li class="${hasMissing ? "has-missing" : "is-complete"}"><span class="lssfo-map-vehicle-main"><a href="/vehicles/${vehicle.id}/zuweisung" target="_blank" rel="noopener">${escapeHtml(vehicle.caption)}</a><small>${escapeHtml(vehicle.typeCaption)} · ${vehicle.assigned}/${vehicle.target} Personen</small></span><b>${escapeHtml(status)}</b></li>`;
        }).join("")
        : '<li class="lssfo-muted">Keine Fahrzeuge an dieser Wache</li>';
      const filteredHint = state.mapVehicleType === "all" ? "stationierte Fahrzeuge" : "passende Fahrzeuge";
      const missingVehicles = vehicles.filter((vehicle) => vehicle.missingCrew > 0 || vehicle.missingTraining > 0).length;
      const district = buildingDistricts.get(id);
      marker.bindTooltip(`${escapeHtml(building.caption)} · ${vehicles.length} ${filteredHint}`);
      marker.bindPopup(() => `<div class="lssfo-map-popup"><h3><a href="/buildings/${id}" target="_blank" rel="noopener">${escapeHtml(building.caption)}</a></h3><div class="lssfo-map-popup-meta">${district ? `<span class="lssfo-district-chip">Bezirk ${escapeHtml(district)}</span>` : ""}${badge(enabled ? "aktiv" : "inaktiv", enabled ? "ok" : "warn")}<button type="button" class="lssfo-btn lssfo-btn-small" data-action="building-status-toggle" data-building-id="${id}"${state.buildingStatusSaving !== null ? " disabled" : ""}>${state.buildingStatusSaving === id ? "Bitte warten …" : enabled ? "Deaktivieren" : "Aktivieren"}</button></div><p>${vehicles.length} ${filteredHint}${state.mapVehicleType === "all" ? "" : ` · insgesamt ${allVehicles.length}`} · <strong class="${missingVehicles ? "danger" : "ok"}">${missingVehicles ? `${missingVehicles} Fahrzeug${missingVehicles === 1 ? "" : "e"} mit Fehlbedarf` : "Besatzung vollständig"}</strong></p><ul>${vehicleRows()}</ul></div>`, { maxWidth: 440, maxHeight: 390 });
      marker.addTo(map);
      state.mapMarkers.set(id, marker);
      bounds.push([latitude, longitude]);
    }
    if (bounds.length === 1) map.setView(bounds[0], 13);
    else map.fitBounds(bounds, { padding: [28, 28], maxZoom: 13 });
    setTimeout(() => state.mapInstance?.invalidateSize(), 0);
  }

  function addDispatchCoverage(map, Leaflet) {
    const model = state.operationalModel;
    if (!model) return;
    for (const dispatch of model.dispatchCenters) {
      if (state.mapDispatchCenter !== "all" && String(dispatch.id) !== state.mapDispatchCenter) continue;
      const latitude = Number(dispatch.latitude);
      const longitude = Number(dispatch.longitude);
      if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) continue;
      const assigned = model.operationalBuildings.filter((building) => building.dispatchCenterId === Number(dispatch.id));
      const radius = Math.max(4000, ...assigned.map((building) => haversineMeters(latitude, longitude, Number(building.latitude), Number(building.longitude))).filter(Number.isFinite));
      Leaflet.circle([latitude, longitude], { radius: Math.min(radius * 1.08, 180000), color: "#337ab7", weight: 1.5, dashArray: "8 6", fillColor: "#337ab7", fillOpacity: .035, interactive: false }).addTo(map);
    }
  }

  function haversineMeters(lat1, lon1, lat2, lon2) {
    if (![lat1, lon1, lat2, lon2].every(Number.isFinite)) return NaN;
    const toRadians = (value) => value * Math.PI / 180;
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon / 2) ** 2;
    return 6371000 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }

  function focusMapBuilding(buildingId) {
    const marker = state.mapMarkers.get(buildingId);
    if (!marker || !state.mapInstance) return;
    state.mapInstance.setView(marker.getLatLng(), Math.max(state.mapInstance.getZoom(), 13), { animate: true });
    marker.openPopup();
  }

  function destroyOverviewMap() {
    if (state.mapInstance) {
      state.mapInstance.remove();
      state.mapInstance = null;
    }
    state.mapMarkers = new Map();
  }

  function getDistrictGeoJson() {
    if (state.districtGeoJson !== undefined) return state.districtGeoJson;
    try {
      const raw = typeof GM_getResourceText === "function"
        ? GM_getResourceText("lssfoAustriaDistricts")
        : "";
      const parsed = raw ? JSON.parse(raw) : null;
      if (!parsed || parsed.type !== "FeatureCollection" || !Array.isArray(parsed.features)) {
        throw new Error("Ungültige Bezirksdaten");
      }
      const normalizedFeatures = parsed.features.map((feature) => ({
        ...feature,
        properties: {
          ...feature.properties,
          iso: feature.properties?.iso || feature.properties?.g_id || "",
          name: feature.properties?.name || feature.properties?.g_name || "",
        },
      }));
      // Einige Datensätze enthalten Wien zusätzlich als Gesamtbezirk. Sobald
      // die 23 Wiener Bezirke vorhanden sind, wird diese doppelte Fläche entfernt.
      const hasViennaDistricts = normalizedFeatures.some((feature) => /^9(?:0[1-9]|1\d|2[0-3])$/.test(String(feature.properties?.iso || "")));
      state.districtGeoJson = {
        ...parsed,
        features: normalizedFeatures.filter((feature) => !(hasViennaDistricts && String(feature.properties?.iso || "") === "900")),
      };
    } catch {
      state.districtGeoJson = null;
    }
    return state.districtGeoJson;
  }

  // Für die Darstellung reichen ~40 m Genauigkeit; die Zuordnung der Wachen
  // nutzt weiterhin die vollen Grenzen. Spart den Großteil der Umrechnung in Leaflet.
  function getDistrictDisplayGeoJson() {
    if (state.districtDisplayGeoJson !== undefined) return state.districtDisplayGeoJson;
    const source = getDistrictGeoJson();
    state.districtDisplayGeoJson = source
      ? { ...source, features: source.features.map((feature) => ({ ...feature, geometry: simplifyGeometry(feature.geometry, 0.0004) })) }
      : null;
    return state.districtDisplayGeoJson;
  }

  function simplifyGeometry(geometry, tolerance) {
    const simplifyRing = (points) => {
      if (points.length <= 8) return points;
      const result = [points[0]];
      let [lastX, lastY] = points[0];
      for (let index = 1; index < points.length - 1; index += 1) {
        const [x, y] = points[index];
        if (Math.abs(x - lastX) > tolerance || Math.abs(y - lastY) > tolerance) {
          result.push(points[index]);
          lastX = x;
          lastY = y;
        }
      }
      result.push(points[points.length - 1]);
      return result.length >= 4 ? result : points;
    };
    if (geometry?.type === "Polygon") return { ...geometry, coordinates: geometry.coordinates.map(simplifyRing) };
    if (geometry?.type === "MultiPolygon") return { ...geometry, coordinates: geometry.coordinates.map((polygon) => polygon.map(simplifyRing)) };
    return geometry;
  }

  function districtAtPoint(longitude, latitude, geoJson) {
    const feature = districtFeatureAtPoint(longitude, latitude, geoJson);
    return formatDistrictName(feature?.properties?.name);
  }

  // Die Bezirksgrenzen haben über 200.000 Punkte. Begrenzungsrahmen sortieren
  // fast alle Bezirke vorab aus, und das Ergebnis je Koordinate bleibt gespeichert,
  // weil jede Neuberechnung dieselben Wachen erneut zuordnet.
  function districtFeatureAtPoint(longitude, latitude, geoJson) {
    if (!Number.isFinite(longitude) || !Number.isFinite(latitude) || !geoJson?.features) return null;
    const key = `${longitude},${latitude}`;
    if (districtCache.has(key)) return districtCache.get(key);
    const feature = geoJson.features.find((entry) => {
      const [minX, minY, maxX, maxY] = districtBox(entry);
      return longitude >= minX && longitude <= maxX && latitude >= minY && latitude <= maxY
        && geometryContainsPoint(entry.geometry, [longitude, latitude]);
    }) || null;
    districtCache.set(key, feature);
    return feature;
  }

  function districtBox(feature) {
    if (districtBoxes.has(feature)) return districtBoxes.get(feature);
    const box = [Infinity, Infinity, -Infinity, -Infinity];
    const polygons = feature.geometry?.type === "Polygon" ? [feature.geometry.coordinates] : feature.geometry?.type === "MultiPolygon" ? feature.geometry.coordinates : [];
    for (const polygon of polygons) {
      for (const [x, y] of polygon[0] || []) {
        if (x < box[0]) box[0] = x;
        if (y < box[1]) box[1] = y;
        if (x > box[2]) box[2] = x;
        if (y > box[3]) box[3] = y;
      }
    }
    districtBoxes.set(feature, box);
    return box;
  }

  function federalStateFromFeature(feature) {
    const properties = feature?.properties || {};
    const explicit = properties.state || properties.bundesland || properties.name_1 || properties.land;
    if (explicit) return formatDistrictName(explicit);
    const digit = String(properties.iso || properties.gkz || "").replace(/\D/g, "")[0];
    return ({
      1: "Burgenland",
      2: "Kärnten",
      3: "Niederösterreich",
      4: "Oberösterreich",
      5: "Salzburg",
      6: "Steiermark",
      7: "Tirol",
      8: "Vorarlberg",
      9: "Wien",
    })[digit] || "";
  }

  function formatDistrictName(value) {
    return String(value || "").replace(/\s+/g, " ").replace(/,\s*/g, ", ").replace(/([^\s])\(/g, "$1 (");
  }

  function geometryContainsPoint(geometry, point) {
    if (!geometry) return false;
    const polygons = geometry.type === "Polygon"
      ? [geometry.coordinates]
      : geometry.type === "MultiPolygon" ? geometry.coordinates : [];
    return polygons.some((polygon) => pointInRing(point, polygon[0])
      && !polygon.slice(1).some((hole) => pointInRing(point, hole)));
  }

  function pointInRing([x, y], ring) {
    let inside = false;
    for (let index = 0, previous = ring.length - 1; index < ring.length; previous = index, index += 1) {
      const [currentX, currentY] = ring[index];
      const [previousX, previousY] = ring[previous];
      const crosses = ((currentY > y) !== (previousY > y))
        && x < ((previousX - currentX) * (y - currentY)) / (previousY - currentY || Number.EPSILON) + currentX;
      if (crosses) inside = !inside;
    }
    return inside;
  }

  function findSchoolBuildings() {
    return state.buildings.filter((building) => {
      const type = state.buildingTypes[String(building.building_type)] || {};
      const text = `${type.caption || ""} ${building.caption || ""}`.toLocaleLowerCase("de");
      return Boolean(type.school || type.isSchool || type.is_school) || /schule|akademie/.test(text);
    }).sort((a, b) => String(a.caption).localeCompare(String(b.caption), "de", { numeric: true }));
  }

  function openCourseAssistant() {
    const schools = findSchoolBuildings();
    state.courseAssistant = { schools, schoolId: schools[0]?.id || null };
    renderCourseAssistant();
  }

  function closeCourseAssistant() {
    state.courseAssistant = null;
    const element = shell.querySelector("#lssfo-course-assistant");
    if (element) {
      element.hidden = true;
      element.innerHTML = "";
    }
  }

  function renderCourseAssistant() {
    const element = shell.querySelector("#lssfo-course-assistant");
    const assistant = state.courseAssistant;
    if (!assistant) {
      element.hidden = true;
      return;
    }
    element.hidden = false;
    const options = assistant.schools.map((school) => `<option value="${school.id}"${Number(school.id) === Number(assistant.schoolId) ? " selected" : ""}>${escapeHtml(school.caption)}</option>`).join("");
    const schoolUrl = assistant.schoolId ? `/buildings/${assistant.schoolId}#schooling` : "";
    element.innerHTML = `<div class="lssfo-manager-backdrop" data-action="course-close"></div>
      <aside class="lssfo-course-card" role="dialog" aria-modal="true" aria-label="Lehrgang starten">
        <header class="lssfo-manager-header"><div><span>LEHRGÄNGE</span><h2>Lehrgang starten</h2></div><button type="button" class="lssfo-icon-btn" data-action="course-close" aria-label="Schließen">${icon("close")}</button></header>
        <div class="lssfo-course-controls">
          <label>Ausbildungsstätte<select id="lssfo-course-school">${options || '<option value="">Keine eigene Schule erkannt</option>'}</select></label>
          ${schoolUrl ? `<a class="lssfo-btn" href="${schoolUrl}" target="_blank" rel="noopener">In neuem Tab öffnen ↗</a>` : ""}
          <p>Im eingebetteten Schulungsbereich kannst du den Lehrgang anlegen und anschließend Personal aus verschiedenen Wachen auswählen. Die eigentliche Buchung erfolgt erst über die Schaltflächen des Spiels.</p>
        </div>
        <div class="lssfo-course-frame-wrap">${schoolUrl ? `<iframe id="lssfo-course-frame" src="${schoolUrl}" title="Leitstellenspiel-Schulungsbereich"></iframe>` : '<div class="lssfo-empty">Es wurde keine Ausbildungsstätte erkannt. Prüfe, ob deine Schuldaten über „Aktualisieren“ geladen wurden.</div>'}</div>
      </aside>`;
    const frame = element.querySelector("#lssfo-course-frame");
    frame?.addEventListener("load", () => {
      try {
        const schoolingTab = frame.contentDocument?.querySelector('a[href="#schooling"]');
        if (schoolingTab) schoolingTab.click();
      } catch { /* Die native Seite bleibt vollständig bedienbar. */ }
    });
    monitorEmbeddedFrame(frame, "Der Schulungsbereich konnte im Panel nicht dargestellt werden. Öffne die ausgewählte Ausbildungsstätte oben in einem neuen Tab.");
  }

  function openNativeManager(buildingId, buildingName, section) {
    state.nativeManager = { buildingId, buildingName, section };
    renderNativeManager();
  }

  function closeNativeManager() {
    state.nativeManager = null;
    const element = shell.querySelector("#lssfo-native-manager");
    if (element) {
      element.hidden = true;
      element.innerHTML = "";
    }
  }

  function renderNativeManager() {
    const element = shell.querySelector("#lssfo-native-manager");
    const manager = state.nativeManager;
    if (!manager) {
      element.hidden = true;
      return;
    }
    const sectionLabel = manager.section === "personnel" ? "Personalverwaltung" : "Ausbauverwaltung";
    const url = manager.section === "personnel" ? `/buildings/${manager.buildingId}/personals` : `/buildings/${manager.buildingId}#extensions`;
    element.hidden = false;
    element.innerHTML = `<div class="lssfo-manager-backdrop" data-action="native-close"></div><aside class="lssfo-course-card" role="dialog" aria-modal="true" aria-label="${escapeHtml(sectionLabel)}"><header class="lssfo-manager-header"><div><span>ORIGINAL LSS-VERWALTUNG</span><h2>${escapeHtml(manager.buildingName)} · ${escapeHtml(sectionLabel)}</h2></div><button type="button" class="lssfo-icon-btn" data-action="native-close" aria-label="Schließen">${icon("close")}</button></header><div class="lssfo-course-controls"><p>Die Bedienung erfolgt über die originale Spieloberfläche. Änderungen werden dadurch mit deiner angemeldeten LSS-Sitzung gespeichert.</p><a class="lssfo-btn" href="${url}" target="_blank" rel="noopener">In neuem Tab öffnen ${icon("external")}</a></div><div class="lssfo-course-frame-wrap"><iframe id="lssfo-native-frame" src="${url}" title="${escapeHtml(sectionLabel)}"></iframe></div></aside>`;
    element.querySelector("#lssfo-native-frame")?.addEventListener("load", (event) => {
      try {
        const frameDocument = event.currentTarget.contentDocument;
        const candidates = manager.section === "personnel"
          ? ['a[href="#personal"]', 'a[href*="personal"]']
          : ['a[href="#extensions"]', 'a[href*="extension"]'];
        const target = candidates.map((selector) => frameDocument?.querySelector(selector)).find(Boolean);
        target?.click();
      } catch { /* Die vollständige Gebäudeseite bleibt im Frame nutzbar. */ }
    });
    monitorEmbeddedFrame(element.querySelector("#lssfo-native-frame"), "Die eingebettete LSS-Seite stellt hier keine Bedienelemente bereit. Öffne die Verwaltung über die Schaltfläche oben in einem neuen Tab.");
  }

  function monitorEmbeddedFrame(frame, message) {
    if (!frame) return;
    frame.addEventListener("load", () => setTimeout(() => {
      try {
        const text = frame.contentDocument?.body?.innerText?.trim() || "";
        if (text.length >= 20) return;
        const wrap = frame.parentElement;
        if (!wrap || wrap.querySelector(".lssfo-frame-warning")) return;
        wrap.insertAdjacentHTML("afterbegin", `<div class="lssfo-frame-warning">${icon("alert")}<span>${escapeHtml(message)}</span></div>`);
      } catch { /* Bei Fremdinhalt bleibt die Schaltfläche „In neuem Tab öffnen“ verfügbar. */ }
    }, 700), { once: true });
  }

  // Sortiert alle Zeilen, zeichnet aber nur die ersten Seiten – Tabellen mit
  // tausenden Zeilen bremsen sonst jeden Bereichswechsel spürbar aus.
  function table(headers, rows, count, tableKey) {
    if (!rows.length) return '<div class="lssfo-empty">Keine passenden Einträge gefunden.</div>';
    const sort = state.sorts[tableKey];
    const sortedRows = sort
      ? rows.map((row, index) => ({ row, index, key: sortKey(row[sort.column]) })).sort((a, b) => {
        const compared = compareSortKeys(a.key, b.key);
        return (sort.direction === "desc" ? -compared : compared) || a.index - b.index;
      }).map((entry) => entry.row)
      : rows;
    const limit = state.tableLimits[tableKey] || TABLE_PAGE_SIZE;
    const visibleRows = sortedRows.slice(0, limit);
    const remaining = sortedRows.length - visibleRows.length;
    const more = remaining > 0
      ? `<div class="lssfo-table-more"><span>${formatNumber(visibleRows.length)} von ${formatNumber(sortedRows.length)} angezeigt</span><button type="button" class="lssfo-btn" data-action="table-more" data-table="${escapeHtml(tableKey)}">Weitere ${formatNumber(Math.min(TABLE_PAGE_SIZE, remaining))} anzeigen</button><button type="button" class="lssfo-btn" data-action="table-all" data-table="${escapeHtml(tableKey)}">Alle anzeigen</button></div>`
      : "";
    return `<div class="lssfo-table-meta">${formatNumber(count)} Einträge · Spaltenüberschrift anklicken zum Sortieren</div><div class="lssfo-table-wrap"><table><thead><tr>${sortableHeaders(headers, tableKey)}</tr></thead><tbody>${visibleRows.map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`).join("")}</tbody></table></div>${more}`;
  }

  function sortableHeaders(headers, tableKey) {
    const sort = state.sorts[tableKey];
    return headers.map((header, column) => {
      const active = sort?.column === column;
      const direction = active ? sort.direction : "";
      const sortIcon = icon(direction === "asc" ? "sort-asc" : direction === "desc" ? "sort-desc" : "sort");
      const ariaSort = direction === "asc" ? "ascending" : direction === "desc" ? "descending" : "none";
      return `<th aria-sort="${ariaSort}"><button type="button" class="lssfo-sort${active ? " active" : ""}" data-action="table-sort" data-sort-table="${escapeHtml(tableKey)}" data-sort-column="${column}"><span>${escapeHtml(header)}</span><span class="lssfo-sort-icon" aria-hidden="true">${sortIcon}</span></button></th>`;
    }).join("");
  }

  function compareTableValues(left, right) {
    return compareSortKeys(sortKey(left), sortKey(right));
  }

  // Sortierschlüssel werden einmal je Zelle berechnet statt bei jedem Vergleich.
  function sortKey(value) {
    const text = tableCellText(value);
    return { text, date: parseGermanDate(text), number: parseLeadingNumber(text) };
  }

  function compareSortKeys(left, right) {
    if (left.date !== null && right.date !== null) return left.date - right.date;
    if (left.number !== null && right.number !== null) return left.number - right.number;
    return textCollator.compare(left.text, right.text);
  }

  // Zellen enthalten nur selbst erzeugtes, maskiertes HTML; Tags entfernen und
  // die maskierten Zeichen zurückwandeln genügt und ist viel schneller als Parsen.
  function tableCellText(value) {
    return String(value ?? "")
      .replace(/<[^>]*>/g, " ")
      .replace(/&(amp|lt|gt|quot|#039);/g, (entity, name) => ({ amp: "&", lt: "<", gt: ">", quot: '"', "#039": "'" })[name])
      .replace(/\s+/g, " ")
      .trim();
  }

  function parseGermanDate(value) {
    const match = value.match(/^(\d{1,2})\.(\d{1,2})\.(\d{2,4})(?:,?\s+(\d{1,2}):(\d{2}))?/);
    if (!match) return null;
    const year = Number(match[3]) < 100 ? 2000 + Number(match[3]) : Number(match[3]);
    return new Date(year, Number(match[2]) - 1, Number(match[1]), Number(match[4] || 0), Number(match[5] || 0)).getTime();
  }

  function parseLeadingNumber(value) {
    const match = value.match(/^-?[\d.]+(?:,\d+)?(?=\s|$)/);
    return match ? Number(match[0].replace(/\./g, "").replace(",", ".")) : null;
  }

  async function openManager(kind, id) {
    const entity = kind === "vehicle"
      ? state.vehicles.find((vehicle) => Number(vehicle.id) === id)
      : state.buildings.find((building) => Number(building.id) === id);
    if (!entity) return;
    state.manager = {
      kind,
      id,
      entity,
      name: entity.caption || "",
      loading: true,
      saving: false,
      savingPerson: null,
      error: "",
      notice: "",
      editForm: null,
      nameInput: null,
      maxInput: null,
      maxPersonnel: "",
      dispatchInput: null,
      dispatchCenterId: "",
      dispatchOptions: [],
      personnel: [],
      personQuery: "",
      assignmentCsrf: "",
    };
    renderManager();
    if (kind === "building") {
      try {
        const html = await fetchPage(`/buildings/${id}/edit`);
        if (state.manager?.id === id && state.manager.kind === kind && !parseEditForm(html, state.manager)) {
          state.manager.error = "Das Bearbeitungsformular wurde nicht vollständig erkannt; Name und Status bleiben dennoch verfügbar.";
        }
      } catch (error) {
        if (state.manager?.id === id && state.manager.kind === kind) state.manager.error = `Leitstellenzuordnung konnte nicht geladen werden: ${error.message}`;
      } finally {
        if (state.manager?.id === id && state.manager.kind === kind) {
          state.manager.loading = false;
          renderManager();
        }
      }
      return;
    }
    try {
      const [editResult, assignmentResult] = await Promise.allSettled([
        fetchPage(`/vehicles/${id}/edit`),
        fetchPage(`/vehicles/${id}/zuweisung`),
      ]);
      if (!state.manager || state.manager.id !== id || state.manager.kind !== kind) return;
      const problems = [];
      if (editResult.status === "fulfilled") {
        if (!parseEditForm(editResult.value, state.manager)) problems.push("Fahrzeugeinstellungen wurden nicht erkannt");
      } else {
        problems.push(`Fahrzeugeinstellungen: ${editResult.reason?.message || editResult.reason}`);
      }
      if (assignmentResult.status === "fulfilled") {
        parsePersonnelPage(assignmentResult.value, state.manager);
      } else {
        problems.push(`Personalzuweisung: ${assignmentResult.reason?.message || assignmentResult.reason}`);
      }
      if (problems.length) state.manager.error = `Verwaltung wurde nur teilweise geladen: ${problems.join(" · ")}`;
    } catch (error) {
      if (state.manager) state.manager.error = `Verwaltung konnte nicht vollständig geladen werden: ${error.message}`;
    } finally {
      if (state.manager) {
        state.manager.loading = false;
        renderManager();
      }
    }
  }

  function closeManager() {
    state.manager = null;
    const element = shell.querySelector("#lssfo-manager");
    if (element) {
      element.hidden = true;
      element.innerHTML = "";
    }
  }

  async function fetchPage(url) {
    const response = await fetch(url, { credentials: "include", headers: { Accept: "text/html" } });
    if (!response.ok) throw new Error(`${response.status} ${response.statusText} (${url})`);
    return response.text();
  }

  function parseEditForm(html, manager) {
    const doc = new DOMParser().parseFromString(html, "text/html");
    const nameSelectors = manager.kind === "vehicle"
      ? ['#vehicle_caption', 'input[name="vehicle[caption]"]', 'input[name="caption"]']
      : ['#building_caption', 'input[name="building[caption]"]', 'input[name="caption"]'];
    const nameInput = doc.querySelector(nameSelectors.join(","));
    const form = nameInput?.closest("form") || doc.querySelector("form");
    if (!form || !nameInput) return false;
    manager.editForm = form;
    manager.nameInput = nameInput;
    manager.name = nameInput.value || manager.name;
    if (manager.kind === "vehicle") {
      manager.maxInput = form.querySelector('#vehicle_personal_max, [name="vehicle[personal_max]"], [name="vehicle[max_personnel_override]"]');
      manager.maxPersonnel = manager.maxInput?.value ?? "";
    } else {
      manager.dispatchInput = form.querySelector('[name="building[leitstelle_building_id]"], #building_leitstelle_building_id');
      manager.dispatchCenterId = manager.dispatchInput?.value ?? "";
      manager.dispatchOptions = manager.dispatchInput ? [...manager.dispatchInput.options].map((option) => ({ value: option.value, label: option.textContent.trim() })) : [];
    }
    return true;
  }

  function parsePersonnelPage(html, manager) {
    const doc = new DOMParser().parseFromString(html, "text/html");
    manager.assignmentCsrf = doc.querySelector('meta[name="csrf-token"]')?.content
      || document.querySelector('meta[name="csrf-token"]')?.content
      || "";
    const rows = [...doc.querySelectorAll("tbody tr")].filter((row) => row.id.startsWith("personal_") || row.querySelector("[personal_id]"));
    manager.personnel = rows.map((row, index) => {
      const assignedButton = row.querySelector("a.btn-assigned");
      const assignButton = row.querySelector("a.btn-success");
      const actionButton = assignedButton || assignButton;
      const id = Number(actionButton?.getAttribute("personal_id") || row.id.replace(/\D/g, "")) || index + 1;
      let keys = [];
      try { keys = JSON.parse(row.dataset.filterableBy || "[]"); } catch { keys = []; }
      for (const element of row.querySelectorAll("[data-education-key]")) keys.push(element.dataset.educationKey);
      keys = [...new Set(keys.filter(Boolean))];
      const cells = row.querySelectorAll("td");
      const name = cells[0]?.textContent?.trim() || `Person ${id}`;
      return {
        id,
        name,
        keys,
        assigned: Boolean(assignedButton),
        actionHref: actionButton?.getAttribute("href") || "",
        available: Boolean(actionButton),
      };
    });
  }

  function renderManager() {
    const element = shell.querySelector("#lssfo-manager");
    const manager = state.manager;
    if (!manager) {
      element.hidden = true;
      return;
    }
    element.hidden = false;
    const analyzed = manager.kind === "vehicle" ? state.analyzed.find((vehicle) => vehicle.id === manager.id) : null;
    const requiredKeys = analyzed?.training.map((item) => item.key) || [];
    const assignedCount = manager.personnel.filter((person) => person.assigned).length;
    const personnelCapacity = manager.kind === "vehicle"
      ? Core.targetCrew(manager.entity, state.vehicleTypes[String(manager.entity.vehicle_type)], "max")
      : 0;
    const maxField = manager.kind === "vehicle" && manager.maxInput
      ? `<label>Maximale Besatzung<input id="lssfo-manager-max" type="number" min="0" max="${analyzed?.staffMax || 99}" value="${escapeHtml(manager.maxPersonnel)}"><small>0 bedeutet: Standardwert des Fahrzeugtyps</small></label>`
      : "";
    const dispatchField = manager.kind === "building" && manager.dispatchInput
      ? `<label>Leitstelle<select id="lssfo-manager-dispatch">${manager.dispatchOptions.map((option) => `<option value="${escapeHtml(option.value)}"${String(option.value) === String(manager.dispatchCenterId) ? " selected" : ""}>${escapeHtml(option.label || "Ohne Leitstelle")}</option>`).join("")}</select><small>Die Zuordnung wird über das originale LSS-Bearbeitungsformular gespeichert.</small></label>`
      : "";
    const buildingStatusField = manager.kind === "building"
      ? `<div class="lssfo-building-status-card"><span>Status der Wache</span><strong>${manager.entity.enabled !== false ? badge("aktiv", "ok") : badge("inaktiv", "warn")}</strong><button type="button" class="lssfo-btn lssfo-btn-small" data-action="building-status-toggle" data-building-id="${manager.id}"${state.buildingStatusSaving !== null ? " disabled" : ""}>${state.buildingStatusSaving === manager.id ? "Bitte warten …" : manager.entity.enabled !== false ? "Wache deaktivieren" : "Wache aktivieren"}</button><small>Inaktive Wachen werden vom Spiel bei der Einsatzgenerierung anders berücksichtigt.</small></div>`
      : "";
    const personnelSection = manager.kind === "vehicle"
      ? `<section class="lssfo-manager-section">
          <div class="lssfo-section-heading">
            <div><h3>Mannschaft zuweisen</h3><p>${assignedCount} von ${personnelCapacity} Personen zugewiesen · Zugewiesene Personen stehen zuerst</p></div>
            <label class="lssfo-manager-search">⌕ <input id="lssfo-manager-person-search" type="search" value="${escapeHtml(manager.personQuery)}" placeholder="Name oder Ausbildung suchen …"></label>
          </div>
          ${manager.loading ? '<div class="lssfo-empty lssfo-empty-small"><span class="lssfo-spinner"></span> Personal wird geladen …</div>' : renderPersonnelTable(manager, requiredKeys, personnelCapacity)}
        </section>`
      : "";
    const buildingVehicles = manager.kind === "building"
      ? state.analyzed.filter((vehicle) => vehicle.buildingId === manager.id)
        .sort((a, b) => Number(b.missingCrew > 0 || b.missingTraining > 0) - Number(a.missingCrew > 0 || a.missingTraining > 0)
          || a.caption.localeCompare(b.caption, "de", { numeric: true }))
      : [];
    const buildingMissingCount = buildingVehicles.filter((vehicle) => vehicle.missingCrew > 0 || vehicle.missingTraining > 0).length;
    const buildingVehicleSection = manager.kind === "building"
      ? `<section class="lssfo-manager-section">
          <div class="lssfo-section-heading"><div><h3>Fahrzeuge dieser Wache</h3><p>${buildingVehicles.length} stationiert · ${buildingMissingCount ? `${buildingMissingCount} mit Fehlbedarf` : "alle vollständig"}</p></div></div>
          ${buildingVehicles.length ? `<div class="lssfo-station-vehicles">${buildingVehicles.map((vehicle) => {
            const missingCrew = Number(vehicle.missingCrew || 0);
            const missingTraining = Number(vehicle.missingTraining || 0);
            const hasMissing = missingCrew > 0 || missingTraining > 0;
            const status = missingCrew > 0 ? `${missingCrew} Besatzung fehlt` : missingTraining > 0 ? `${missingTraining} Ausbildung fehlt` : "vollständig";
            return `<article class="${hasMissing ? "has-missing" : "is-complete"}"><div><a href="/vehicles/${vehicle.id}/zuweisung" target="_blank" rel="noopener">${escapeHtml(vehicle.caption)}</a><span>${escapeHtml(vehicle.typeCaption)} · ${vehicle.assigned}/${vehicle.target} Personen</span></div><div><b>${escapeHtml(status)}</b><button type="button" class="lssfo-btn lssfo-btn-small" data-action="manage-vehicle" data-id="${vehicle.id}">Besatzung ändern</button></div></article>`;
          }).join("")}</div>` : '<div class="lssfo-empty lssfo-empty-small">Keine Fahrzeuge an dieser Wache gefunden.</div>'}
        </section>`
      : "";
    const buildingExtensions = manager.kind === "building"
      ? (state.operationalModel?.extensions || []).filter((entry) => entry.buildingId === manager.id)
      : [];
    const buildingPlanningSection = manager.kind === "building"
      ? `<section class="lssfo-manager-section"><div class="lssfo-section-heading"><div><h3>Ausbauten und Personal</h3><p>${buildingExtensions.length ? `${buildingExtensions.filter((entry) => entry.status === "active").length} aktiv · ${buildingExtensions.filter((entry) => entry.status === "inactive").length} inaktiv · ${buildingExtensions.filter((entry) => entry.status === "building").length} im Bau` : "Keine Ausbauinformationen vorhanden"}</p></div></div><div class="lssfo-extension-chip-list">${buildingExtensions.map((entry) => `<span class="lssfo-extension-chip ${entry.status}">${escapeHtml(entry.caption)} · ${entry.status === "building" ? relativeTime(entry.availableAt) : entry.status === "inactive" ? "inaktiv" : entry.status === "missing" ? "fehlt" : "aktiv"}</span>`).join("") || '<span class="lssfo-muted">Keine Einträge</span>'}</div><div class="lssfo-edit-actions"><button type="button" class="lssfo-btn" data-action="native-building" data-building-id="${manager.id}" data-building-name="${escapeHtml(manager.name)}" data-native-section="extensions">Ausbauten im Panel verwalten</button><button type="button" class="lssfo-btn" data-action="native-building" data-building-id="${manager.id}" data-building-name="${escapeHtml(manager.name)}" data-native-section="personnel">Personal im Panel verwalten</button></div></section>`
      : "";
    element.innerHTML = `<div class="lssfo-manager-backdrop" data-action="manager-close"></div>
      <aside class="lssfo-manager-card" role="dialog" aria-modal="true" aria-label="${manager.kind === "vehicle" ? "Fahrzeug" : "Wache"} bearbeiten">
        <header class="lssfo-manager-header">
          <div><span>${manager.kind === "vehicle" ? "FAHRZEUGVERWALTUNG" : "WACHENVERWALTUNG"}</span><h2>${escapeHtml(manager.name)}</h2></div>
          <button type="button" class="lssfo-icon-btn" data-action="manager-close" aria-label="Verwaltung schließen">${icon("close")}</button>
        </header>
        <div class="lssfo-manager-body">
          ${manager.error ? `<div class="lssfo-status error">${escapeHtml(manager.error)}</div>` : ""}
          ${manager.notice ? `<div class="lssfo-status success">${escapeHtml(manager.notice)}</div>` : ""}
          <section class="lssfo-manager-section">
            <div class="lssfo-section-heading"><div><h3>Stammdaten</h3><p>${manager.kind === "vehicle" ? "Name und Fahrzeugeinstellungen bearbeiten" : "Name der Wache bearbeiten"}</p></div></div>
            <div class="lssfo-edit-grid">
              <label>Name<input id="lssfo-manager-name" type="text" maxlength="120" value="${escapeHtml(manager.name)}"></label>
              ${maxField}
              ${dispatchField}
              ${buildingStatusField}
              <div class="lssfo-edit-actions">
                <button type="button" class="lssfo-btn lssfo-btn-primary" data-action="manager-save" ${manager.loading || manager.saving ? "disabled" : ""}>${manager.saving ? "Speichert …" : "Änderungen speichern"}</button>
                <a class="lssfo-btn" href="/${manager.kind === "vehicle" ? "vehicles" : "buildings"}/${manager.id}/edit" target="_blank" rel="noopener">Alle Spieleinstellungen ↗</a>
              </div>
            </div>
          </section>
          ${buildingPlanningSection}
          ${buildingVehicleSection}
          ${personnelSection}
        </div>
      </aside>`;
  }

  function renderPersonnelTable(manager, requiredKeys, personnelCapacity) {
    if (!manager.personnel.length) return '<div class="lssfo-empty lssfo-empty-small">Kein zuweisbares Personal an dieser Wache gefunden.</div>';
    const targetFull = manager.personnel.filter((person) => person.assigned).length >= personnelCapacity;
    const matchesTraining = (person) => !requiredKeys.length || requiredKeys.some((key) => person.keys.includes(key));
    const selectedSort = state.sorts.personnel;
    const sortedPersonnel = [...manager.personnel].sort((a, b) => {
      const assignedOrder = Number(b.assigned) - Number(a.assigned);
      if (assignedOrder) return assignedOrder;
      if (selectedSort) {
        const personValues = (person) => [
          person.name,
          person.keys.length ? person.keys.map(trainingName).join(", ") : "Keine Ausbildung",
          person.assigned ? "zugewiesen" : "verfügbar",
          person.assigned ? "Entfernen" : "Zuweisen",
        ];
        const compared = compareTableValues(personValues(a)[selectedSort.column], personValues(b)[selectedSort.column]);
        if (compared) return selectedSort.direction === "desc" ? -compared : compared;
      }
      const trainingOrder = Number(matchesTraining(b)) - Number(matchesTraining(a));
      if (trainingOrder) return trainingOrder;
      return a.name.localeCompare(b.name, "de", { sensitivity: "base" });
    });
    const rows = sortedPersonnel.map((person) => {
      const educationText = person.keys.length ? person.keys.map(trainingName).join(", ") : "Keine Ausbildung";
      const matches = matchesTraining(person);
      const disabled = !person.available || manager.savingPerson !== null || (!person.assigned && targetFull);
      const action = person.assigned ? "Entfernen" : "Zuweisen";
      const hidden = manager.personQuery && !`${person.name} ${educationText}`.toLocaleLowerCase("de").includes(manager.personQuery);
      return `<tr data-person-row data-search="${escapeHtml(`${person.name} ${educationText}`.toLocaleLowerCase("de"))}"${hidden ? " hidden" : ""}>
        <td><strong>${escapeHtml(person.name)}</strong></td>
        <td>${escapeHtml(educationText)} ${matches && requiredKeys.length ? badge("passend", "ok") : ""}</td>
        <td>${person.assigned ? badge("zugewiesen", "ok") : '<span class="lssfo-muted">verfügbar</span>'}</td>
        <td><button type="button" class="lssfo-btn lssfo-btn-small${person.assigned ? " lssfo-btn-danger" : ""}" data-action="person-toggle" data-person-id="${person.id}" ${disabled ? "disabled" : ""}>${manager.savingPerson === person.id ? "Bitte warten …" : action}</button></td>
      </tr>`;
    }).join("");
    return `<div class="lssfo-table-wrap lssfo-personnel-table"><table><thead><tr>${sortableHeaders(["Person", "Ausbildungen", "Status", "Aktion"], "personnel")}</tr></thead><tbody>${rows}</tbody></table></div>`;
  }

  async function saveManager() {
    const manager = state.manager;
    if (!manager || manager.saving) return;
    const name = shell.querySelector("#lssfo-manager-name")?.value.trim();
    if (!name) {
      manager.error = "Der Name darf nicht leer sein.";
      renderManager();
      return;
    }
    const maxValue = manager.maxInput
      ? (shell.querySelector("#lssfo-manager-max")?.value ?? manager.maxPersonnel)
      : "";
    const dispatchValue = manager.dispatchInput ? (shell.querySelector("#lssfo-manager-dispatch")?.value ?? manager.dispatchCenterId) : "";
    manager.name = name;
    if (manager.maxInput) manager.maxPersonnel = maxValue;
    if (manager.dispatchInput) manager.dispatchCenterId = dispatchValue;
    manager.error = "";
    manager.notice = "";
    manager.saving = true;
    renderManager();
    try {
      if (manager.editForm) {
        manager.nameInput.value = name;
        if (manager.maxInput) manager.maxInput.value = maxValue;
        if (manager.dispatchInput) manager.dispatchInput.value = dispatchValue;
        await submitParsedForm(manager.editForm);
      } else {
        await submitDirectRename(manager, name);
      }
      manager.entity.caption = name;
      if (manager.kind === "building" && manager.dispatchInput) manager.entity.leitstelle_building_id = dispatchValue ? Number(dispatchValue) : null;
      if (manager.kind === "vehicle" && manager.maxInput) {
        const max = Number(manager.maxPersonnel);
        manager.entity.max_personnel_override = max > 0 ? max : null;
      }
      analyze();
      render();
      void persistCurrentCache();
      manager.notice = "Änderungen wurden gespeichert.";
    } catch (error) {
      manager.error = `Speichern fehlgeschlagen: ${error.message}`;
    } finally {
      manager.saving = false;
      renderManager();
    }
  }

  async function submitParsedForm(form, extraEntries = []) {
    const body = new URLSearchParams();
    for (const [key, value] of new FormData(form).entries()) {
      if (typeof value === "string") body.append(key, value);
    }
    for (const [key, value] of extraEntries) body.append(key, value);
    const csrf = form.querySelector('input[name="authenticity_token"]')?.value
      || document.querySelector('meta[name="csrf-token"]')?.content
      || "";
    const action = new URL(form.getAttribute("action") || location.href, location.origin).href;
    const response = await fetch(action, {
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
    return response;
  }

  async function submitDirectRename(manager, name) {
    if (manager.kind !== "building") throw new Error("Das Bearbeitungsformular des Fahrzeugs wurde nicht erkannt.");
    const csrf = document.querySelector('meta[name="csrf-token"]')?.content || "";
    if (!csrf) throw new Error("Sicherheitsschlüssel der Spielseite wurde nicht gefunden.");
    const body = new URLSearchParams({
      utf8: "✓",
      _method: "put",
      authenticity_token: csrf,
      "building[name]": name,
    });
    const response = await fetch(`/buildings/${manager.id}`, {
      method: "POST",
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
  }

  async function toggleBuildingStatus(buildingId) {
    const building = state.buildings.find((entry) => Number(entry.id) === buildingId);
    if (!building || state.buildingStatusSaving !== null) return;
    const wasEnabled = building.enabled !== false;
    state.buildingStatusSaving = buildingId;
    state.error = "";
    if (state.manager?.kind === "building" && state.manager.id === buildingId) {
      state.manager.error = "";
      state.manager.notice = "";
      renderManager();
    }
    renderContent();
    try {
      const response = await fetch(`/buildings/${buildingId}/active`, {
        method: "GET",
        credentials: "include",
        redirect: "follow",
        headers: { "X-Requested-With": "XMLHttpRequest" },
      });
      if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
      building.enabled = !wasEnabled;
      analyze();
      void persistCurrentCache();
      if (state.manager?.kind === "building" && state.manager.id === buildingId) {
        state.manager.notice = `Die Wache wurde ${building.enabled ? "aktiviert" : "deaktiviert"}.`;
      }
    } catch (error) {
      const message = `Statusänderung fehlgeschlagen: ${error.message}`;
      if (state.manager?.kind === "building" && state.manager.id === buildingId) state.manager.error = message;
      else state.error = message;
    } finally {
      state.buildingStatusSaving = null;
      render();
      if (state.manager) renderManager();
    }
  }

  async function togglePersonnel(personId) {
    const manager = state.manager;
    const person = manager?.personnel.find((entry) => entry.id === personId);
    if (!manager || !person || !person.actionHref || manager.savingPerson !== null) return;
    manager.savingPerson = personId;
    manager.error = "";
    manager.notice = "";
    renderManager();
    try {
      const response = await fetch(new URL(person.actionHref, location.origin).href, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          "X-CSRF-Token": manager.assignmentCsrf,
          "X-Requested-With": "XMLHttpRequest",
        },
      });
      if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
      const html = await fetchPage(`/vehicles/${manager.id}/zuweisung`);
      parsePersonnelPage(html, manager);
      const assigned = manager.personnel.filter((entry) => entry.assigned);
      manager.entity.assigned_personnel_count = assigned.length;
      const counts = {};
      for (const entry of assigned) for (const key of entry.keys) counts[key] = (counts[key] || 0) + 1;
      state.scans[String(manager.id)] = { counts, assignedRows: assigned.length, scannedAt: Date.now() };
      analyze();
      render();
      void persistCurrentCache();
      manager.notice = person.assigned ? `${person.name} wurde vom Fahrzeug entfernt.` : `${person.name} wurde dem Fahrzeug zugewiesen.`;
    } catch (error) {
      manager.error = `Personaländerung fehlgeschlagen: ${error.message}`;
    } finally {
      manager.savingPerson = null;
      renderManager();
    }
  }

  async function scanEducations() {
    const candidates = state.analyzed.filter((vehicle) => vehicle.training.length > 0);
    if (!candidates.length) {
      state.error = "Es wurden keine Fahrzeuge mit Ausbildungsanforderung gefunden.";
      render();
      return;
    }
    const controller = new AbortController();
    state.scanController = controller;
    state.error = "";
    render();
    try {
      for (let index = 0; index < candidates.length; index += 1) {
        if (controller.signal.aborted) break;
        const vehicle = candidates[index];
        state.scanProgress = `Ausbildungen werden geprüft: ${index + 1} / ${candidates.length} · ${vehicle.caption}`;
        renderStatus();
        const response = await fetch(`/vehicles/${vehicle.id}/zuweisung`, { credentials: "include", signal: controller.signal });
        if (!response.ok) throw new Error(`${response.status} bei Fahrzeug ${vehicle.id}`);
        const html = await response.text();
        state.scans[String(vehicle.id)] = parseAssignedEducations(html, vehicle.id);
        analyze();
        if (index + 1 < candidates.length) await delay(250, controller.signal);
      }
      state.tab = "training";
    } catch (error) {
      if (error.name !== "AbortError") state.error = `Ausbildungsprüfung abgebrochen: ${error.message}`;
    } finally {
      state.scanController = null;
      state.scanProgress = null;
      analyze();
      render();
    }
  }

  function stopScan() {
    state.scanController?.abort();
  }

  async function scanStationPersonnel() {
    if (state.personnelScanController) return;
    const candidates = (state.operationalModel?.stationBuildings || []).filter((building) => building.vehicles.length || Number(building.personal_count || 0) > 0);
    if (!candidates.length) {
      state.error = "Es wurden keine Wachen mit Personal gefunden.";
      render();
      return;
    }
    const controller = new AbortController();
    state.personnelScanController = controller;
    state.error = "";
    renderContent();
    try {
      for (let index = 0; index < candidates.length; index += 1) {
        if (controller.signal.aborted) break;
        const building = candidates[index];
        state.scanProgress = `Personal wird geprüft: ${index + 1} / ${candidates.length} · ${building.caption}`;
        renderStatus();
        const response = await fetch(`/buildings/${building.id}/personals`, { credentials: "include", signal: controller.signal });
        if (!response.ok) throw new Error(`${response.status} bei ${building.caption}`);
        state.personnelScans[String(building.id)] = parseStationPersonnel(await response.text());
        analyze();
        if (index + 1 < candidates.length) await delay(180, controller.signal);
      }
    } catch (error) {
      if (error.name !== "AbortError") state.error = `Personalprüfung abgebrochen: ${error.message}`;
    } finally {
      state.personnelScanController = null;
      state.scanProgress = null;
      analyze();
      render();
    }
  }

  function parseStationPersonnel(html) {
    const doc = new DOMParser().parseFromString(html, "text/html");
    const rows = [...doc.querySelectorAll("#personal_table tbody tr, tbody tr[data-filterable-by]")];
    const counts = {};
    const names = {};
    let available = 0;
    let inTraining = 0;
    let withoutEducation = 0;
    for (const row of rows) {
      let keys = [];
      try { keys = JSON.parse(row.dataset.filterableBy || "[]"); } catch { keys = []; }
      for (const element of row.querySelectorAll("[data-education-key]")) keys.push(element.dataset.educationKey);
      keys = [...new Set(keys.filter(Boolean))];
      const cells = row.querySelectorAll("td");
      const name = cells[1]?.textContent?.trim() || cells[0]?.textContent?.trim() || "Unbekannt";
      const status = [...cells].map((cell) => cell.textContent.trim()).join(" ");
      if (/unterricht|lehrgang/i.test(status)) inTraining += 1;
      else if (/verfügbar|available/i.test(status)) available += 1;
      if (!keys.length) withoutEducation += 1;
      for (const key of keys) {
        counts[key] = (counts[key] || 0) + 1;
        if (!names[key]) names[key] = [];
        names[key].push(name);
      }
    }
    return { counts, names, total: rows.length, available, inTraining, withoutEducation, scannedAt: Date.now() };
  }

  function parseAssignedEducations(html, vehicleId) {
    const doc = new DOMParser().parseFromString(html, "text/html");
    const rows = [...doc.querySelectorAll("tbody tr")].filter((row) => {
      if (row.querySelector("a.btn-assigned")) return true;
      const link = row.querySelector('td:nth-child(3) a[href*="/vehicles/"]');
      if (!link) return false;
      try {
        return new URL(link.href, location.origin).pathname.endsWith(`/vehicles/${vehicleId}`);
      } catch {
        return false;
      }
    });
    const counts = {};
    for (const row of rows) {
      let keys = [];
      try {
        keys = JSON.parse(row.dataset.filterableBy || "[]");
      } catch {
        keys = [];
      }
      for (const span of row.querySelectorAll("[data-education-key]")) keys.push(span.dataset.educationKey);
      for (const key of new Set(keys.filter(Boolean))) counts[key] = (counts[key] || 0) + 1;
    }
    return { counts, assignedRows: rows.length, scannedAt: Date.now() };
  }

  function delay(ms, signal) {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(resolve, ms);
      signal.addEventListener("abort", () => {
        clearTimeout(timer);
        reject(new DOMException("Abgebrochen", "AbortError"));
      }, { once: true });
    });
  }

  function detectPlannerOpener() {
    let active = new URLSearchParams(location.search).get("lssfo") === "planner";
    try {
      if (active) sessionStorage.setItem(PLANNER_SESSION_KEY, "1");
      else active = sessionStorage.getItem(PLANNER_SESSION_KEY) === "1";
    } catch { /* Ohne sessionStorage gilt nur der URL-Parameter. */ }
    try {
      return active && window.opener && !window.opener.closed ? window.opener : null;
    } catch {
      return null;
    }
  }

  function postToPlanner(message) {
    // Der Wachenplaner läuft oft als lokale Datei (Origin "null"), daher "*".
    // Empfänger ist ausschließlich das Fenster, das diesen Tab geöffnet hat.
    try { plannerOpener?.postMessage({ source: "lssfo-game", ...message }, "*"); } catch { /* Planer wurde geschlossen. */ }
  }

  function handlePlannerMessage(event) {
    if (event.source !== plannerOpener || event.data?.source !== "lssfo-planner") return;
    if (event.data.type === "lssfo-sync") void syncPlanner();
    if (event.data.type === "lssfo-build") void openBuildDialog(event.data.station);
  }

  let plannerToastTimer = 0;
  function plannerToast(message) {
    const element = plannerRoot.querySelector(".lssfo-toast");
    element.textContent = message;
    element.classList.add("is-visible");
    clearTimeout(plannerToastTimer);
    plannerToastTimer = setTimeout(() => element.classList.remove("is-visible"), 3600);
  }

  function plannerBuilding(building) {
    return { id: Number(building.id), caption: building.caption, building_type: Number(building.building_type), latitude: Number(building.latitude), longitude: Number(building.longitude) };
  }

  async function fetchFreshBuildings() {
    const result = await fetchJson(`/api/buildings?_=${Date.now()}`);
    return Array.isArray(result) ? result : result?.result || [];
  }

  function requestPlannerConsent() {
    try {
      if (sessionStorage.getItem(PLANNER_CONSENT_KEY) === "1") return Promise.resolve(true);
    } catch { /* Dann wird jedes Mal gefragt. */ }
    return new Promise((resolve) => {
      closeBuildDialog();
      state.build = { mode: "consent", resolve };
      renderBuild();
    });
  }

  async function syncPlanner() {
    if (!(await requestPlannerConsent())) {
      postToPlanner({ type: "lssfo-denied" });
      return;
    }
    try {
      const buildings = await fetchFreshBuildings();
      postToPlanner({ type: "lssfo-buildings", buildings: buildings.map(plannerBuilding) });
      plannerToast(`${formatNumber(buildings.length)} Gebäude an den Wachenplaner übertragen`);
    } catch (error) {
      plannerToast(`Abgleich fehlgeschlagen: ${error.message}`);
    }
  }

  async function openBuildDialog(station) {
    const lat = Number(station?.lat);
    const lon = Number(station?.lon);
    if (!Number.isFinite(lat) || !Number.isFinite(lon)) return;
    closeBuildDialog();
    const build = {
      mode: "build",
      station: {
        key: String(station.key || ""),
        name: String(station.name || "Neue Wache").slice(0, 120),
        kind: station.kind === "rescue" ? "rescue" : "fire",
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
    state.build = build;
    renderBuild();
    const [formResult, buildingsResult] = await Promise.allSettled([fetchPage("/buildings/new"), fetchFreshBuildings()]);
    if (state.build !== build) return;
    build.buildings = buildingsResult.status === "fulfilled" ? buildingsResult.value : [];
    if (formResult.status === "fulfilled") parseBuildForm(formResult.value, build);
    if (!build.form) build.error = build.error || "Das Bauformular des Spiels wurde nicht erkannt. Nutze „Im Spielformular öffnen“.";
    build.loading = false;
    renderBuild();
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
    const kindPattern = build.station.kind === "rescue" ? /rettungswache/i : /feuerwache/i;
    const exactPattern = build.station.kind === "rescue" ? /^rettungswache$/i : /^feuerwache$/i;
    const preferredType = build.typeOptions.find((option) => exactPattern.test(option.label))
      || build.typeOptions.find((option) => option.value === (build.station.kind === "rescue" ? "2" : "0"))
      || build.typeOptions.find((option) => kindPattern.test(option.label));
    build.typeValue = preferredType?.value ?? fields.type.value;
    build.dispatchOptions = options(fields.dispatch);
    const dispatchCenters = build.buildings.filter((building) => Number(building.building_type) === 7);
    const nearest = dispatchCenters
      .map((building) => ({ building, distance: haversineMeters(build.lat, build.lon, Number(building.latitude), Number(building.longitude)) }))
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
    const build = state.build;
    if (build?.mode !== "build") return;
    const element = plannerRoot.querySelector("#lssfo-build");
    const name = element.querySelector("#lssfo-build-name");
    if (name) build.name = name.value;
    const type = element.querySelector("#lssfo-build-type");
    if (type) build.typeValue = type.value;
    const dispatch = element.querySelector("#lssfo-build-dispatch");
    if (dispatch) build.dispatchValue = dispatch.value;
    for (const select of element.querySelectorAll("[data-build-extra]")) {
      const extra = build.extraSelects[Number(select.dataset.buildExtra)];
      if (extra) extra.value = select.value;
    }
  }

  function closeBuildDialog() {
    const build = state.build;
    if (!build) return;
    build.resolve?.(false);
    build.map?.remove();
    state.build = null;
    const element = plannerRoot.querySelector("#lssfo-build");
    element.hidden = true;
    element.innerHTML = "";
  }

  function handlePlannerClick(event) {
    const action = event.target.closest("[data-action]")?.dataset.action;
    const build = state.build;
    if (!action || !build) return;
    if (action === "consent-allow") {
      try { sessionStorage.setItem(PLANNER_CONSENT_KEY, "1"); } catch { /* Zustimmung gilt nur für diese Anfrage. */ }
      const { resolve } = build;
      build.resolve = null;
      closeBuildDialog();
      resolve(true);
    }
    if (action === "build-close" || action === "consent-deny") closeBuildDialog();
    if (action === "build-submit") void submitBuild();
    if (action === "build-native") void openNativeBuildForm();
  }

  function buildingKindMatches(building, kind) {
    const type = Number(building.building_type);
    return kind === "rescue" ? RESCUE_BUILDING_TYPES.has(type) : FIRE_BUILDING_TYPES.has(type);
  }

  function renderBuild() {
    const element = plannerRoot.querySelector("#lssfo-build");
    const build = state.build;
    if (!build) {
      element.hidden = true;
      return;
    }
    build.map?.remove();
    build.map = null;
    element.hidden = false;
    const header = (kicker, title, iconHtml) => `<header class="lssfo-manager-header"><div class="lssfo-sheet-title">${iconHtml}<div><span>${escapeHtml(kicker)}</span><h2>${escapeHtml(title)}</h2></div></div><button type="button" class="lssfo-icon-btn" data-action="${build.mode === "consent" ? "consent-deny" : "build-close"}" aria-label="Schließen">${icon("close")}</button></header>`;
    const wrap = (inner) => `<div class="lssfo-manager-backdrop" data-action="${build.mode === "consent" ? "consent-deny" : "build-close"}"></div><aside class="lssfo-sheet" role="dialog" aria-modal="true">${inner}</aside>`;
    if (build.mode === "consent") {
      element.innerHTML = wrap(`${header("WACHENPLANER", "Abgleich erlauben?", `<span class="lssfo-sheet-icon" style="background:#007aff">${icon("map")}</span>`)}
        <div class="lssfo-manager-body"><p class="lssfo-sheet-text">Der Wachenplaner möchte deine Gebäude abgleichen, um anzuzeigen, welche echten Standorte du noch nicht gebaut hast. Übertragen werden nur <b>Name, Typ und Position</b> deiner Gebäude – an den Tab, der dieses Fenster geöffnet hat.</p>
        <div class="lssfo-sheet-actions"><button type="button" class="lssfo-btn" data-action="consent-deny">Ablehnen</button><button type="button" class="lssfo-btn lssfo-btn-primary" data-action="consent-allow">Erlauben</button></div></div>`);
      return;
    }
    const station = build.station;
    const glyph = `<span class="lssfo-sheet-icon" style="background:${station.kind === "rescue" ? "#ff3b30" : "#ff6a00"}">${icon("building")}</span>`;
    if (build.done) {
      element.innerHTML = wrap(`${header("NEUE WACHE", build.done.caption || station.name, glyph)}
        <div class="lssfo-manager-body lssfo-center"><div class="lssfo-success-mark">${icon("check")}</div><p class="lssfo-sheet-text"><b>${escapeHtml(build.done.caption || station.name)}</b> wurde gebaut und im Wachenplaner als erledigt markiert.</p>
        <div class="lssfo-sheet-actions" style="justify-content:center"><a class="lssfo-btn" href="/buildings/${Number(build.done.id)}" target="_blank" rel="noopener">Wache öffnen ${icon("external")}</a><button type="button" class="lssfo-btn lssfo-btn-primary" data-action="build-close">Fertig</button></div></div>`);
      return;
    }
    if (build.loading) {
      element.innerHTML = wrap(`${header("WACHE BAUEN", station.name, glyph)}<div class="lssfo-manager-body"><div class="lssfo-empty lssfo-empty-small"><span class="lssfo-spinner"></span> Bauformular wird geladen …</div></div>`);
      return;
    }
    const nearby = build.buildings
      .filter((building) => buildingKindMatches(building, station.kind))
      .map((building) => ({ building, distance: haversineMeters(build.lat, build.lon, Number(building.latitude), Number(building.longitude)) }))
      .filter((entry) => entry.distance <= 400)
      .sort((a, b) => a.distance - b.distance)[0];
    const selectHtml = (id, options, value, extra = "") => `<select id="${id}"${extra}>${options.map((option) => `<option value="${escapeHtml(option.value)}"${String(option.value) === String(value) ? " selected" : ""}>${escapeHtml(option.label || "–")}</option>`).join("")}</select>`;
    const typeField = build.typeOptions.length ? `<label>Gebäudetyp${selectHtml("lssfo-build-type", build.typeOptions, build.typeValue)}</label>` : "";
    const dispatchField = build.dispatchOptions.length ? `<label>Leitstelle${selectHtml("lssfo-build-dispatch", build.dispatchOptions, build.dispatchValue)}</label>` : "";
    const extras = applicableExtras(build).filter(({ extra }) => extra.options.length > 1);
    const extraFields = extras.length
      ? `<details class="lssfo-build-more"${build.moreOpen ? " open" : ""}><summary>Weitere Optionen</summary><div>${extras.map(({ extra, index }) => `<label>${escapeHtml(extra.label)}${selectHtml(`lssfo-build-extra-${index}`, extra.options, extra.value, ` data-build-extra="${index}"`)}</label>`).join("")}</div></details>`
      : "";
    element.innerHTML = wrap(`${header(`WACHE BAUEN${station.label ? ` · ${station.label.toUpperCase()}` : ""}`, station.name, glyph)}
      <div class="lssfo-manager-body">
        ${build.error ? `<div class="lssfo-status error">${escapeHtml(build.error)}</div>` : ""}
        ${nearby ? `<div class="lssfo-status warn">${icon("alert")}<span>In ${formatNumber(Math.round(nearby.distance))} m Entfernung steht bereits <b>${escapeHtml(nearby.building.caption)}</b>.</span></div>` : ""}
        <div class="lssfo-build-form">
          ${globalThis.L ? '<div id="lssfo-build-map" class="lssfo-build-map" aria-label="Bauposition – Marker kann verschoben werden"></div>' : ""}
          <div class="lssfo-build-meta"><span>Position <b id="lssfo-build-position">${build.lat.toFixed(5)}, ${build.lon.toFixed(5)}</b></span>${station.address ? `<span>Adresse <b>${escapeHtml(station.address)}</b></span>` : ""}${station.district ? `<span>Bezirk <b>${escapeHtml(station.district)}</b></span>` : ""}</div>
          ${build.form ? `<label>Name<input id="lssfo-build-name" type="text" maxlength="${Number(build.fields.name?.maxLength) > 0 ? Number(build.fields.name.maxLength) : 120}" value="${escapeHtml(build.name)}"></label>
          <div class="lssfo-build-row">${typeField}${dispatchField}</div>${extraFields}` : ""}
          <div class="lssfo-sheet-actions">
            <button type="button" class="lssfo-btn" data-action="build-native">Im Spielformular öffnen</button>
            <button type="button" class="lssfo-btn" data-action="build-close">Abbrechen</button>
            ${build.form ? `<button type="button" class="lssfo-btn lssfo-btn-primary" data-action="build-submit"${build.submitting ? " disabled" : ""}>${build.submitting ? '<span class="lssfo-spinner"></span> Wird gebaut …' : "Mit Credits bauen"}</button>` : ""}
          </div>
        </div>
      </div>`);
    initializeBuildMap(build);
  }

  function initializeBuildMap(build) {
    const Leaflet = globalThis.L;
    const container = plannerRoot.querySelector("#lssfo-build-map");
    if (!Leaflet || !container) return;
    const map = Leaflet.map(container, { zoomControl: false, attributionControl: false }).setView([build.lat, build.lon], 16);
    Leaflet.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 19 }).addTo(map);
    if (build.lat !== build.originLat || build.lon !== build.originLon) {
      Leaflet.circleMarker([build.originLat, build.originLon], { radius: 5, color: "#8e8e93", fillOpacity: .6, weight: 1 }).addTo(map);
    }
    const marker = Leaflet.marker([build.lat, build.lon], {
      draggable: true,
      icon: Leaflet.divIcon({ className: "", html: `<div style="width:26px;height:26px;border:3px solid #fff;border-radius:50%;background:${build.station.kind === "rescue" ? "#ff3b30" : "#ff6a00"};box-shadow:0 3px 10px rgba(0,0,0,.35)"></div>`, iconSize: [26, 26], iconAnchor: [13, 13] }),
    }).addTo(map);
    marker.on("dragend", () => {
      const position = marker.getLatLng();
      build.lat = position.lat;
      build.lon = position.lng;
      const shift = haversineMeters(build.originLat, build.originLon, build.lat, build.lon);
      const label = plannerRoot.querySelector("#lssfo-build-position");
      if (label) label.textContent = `${build.lat.toFixed(5)}, ${build.lon.toFixed(5)}${shift >= 5 ? ` · ${formatNumber(Math.round(shift))} m verschoben` : ""}`;
    });
    build.map = map;
    setTimeout(() => map.invalidateSize(), 60);
  }

  async function submitBuild() {
    const build = state.build;
    if (!build?.form || build.submitting) return;
    readBuildInputs();
    if (!build.name.trim()) {
      build.error = "Bitte einen Namen eingeben.";
      renderBuild();
      return;
    }
    build.submitting = true;
    build.error = "";
    renderBuild();
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
      const response = await submitParsedForm(form, build.submit?.name ? [[build.submit.name, build.submit.value || "1"]] : []);
      const responseText = await response.text();
      const created = await findCreatedBuilding(knownIds, build.lat, build.lon);
      if (!created) throw new Error(formErrorText(responseText) || "Das Spiel hat keine neue Wache bestätigt. Prüfe deine Credits oder nutze „Im Spielformular öffnen“.");
      if (state.build !== build) return;
      build.done = created;
      postToPlanner({ type: "lssfo-built", stationKey: build.station.key, building: plannerBuilding(created) });
      if (state.buildings.length) {
        state.buildings.push(created);
        analyze();
        if (state.open) render();
        void persistCurrentCache();
      }
    } catch (error) {
      build.error = `Bauen fehlgeschlagen: ${error.message}`;
    } finally {
      build.submitting = false;
      if (state.build === build) renderBuild();
    }
  }

  async function findCreatedBuilding(knownIds, lat, lon) {
    for (const wait of [400, 1200, 2500]) {
      await new Promise((resolve) => setTimeout(resolve, wait));
      const created = (await fetchFreshBuildings().catch(() => []))
        .find((building) => !knownIds.has(Number(building.id)) && haversineMeters(lat, lon, Number(building.latitude), Number(building.longitude)) <= 250);
      if (created) return created;
    }
    return null;
  }

  function formErrorText(html) {
    const doc = new DOMParser().parseFromString(html || "", "text/html");
    const text = [...doc.querySelectorAll(".alert-danger, .alert-error, #error_explanation, .has-error .help-block, .help-block.error")]
      .map((element) => element.textContent.replace(/\s+/g, " ").trim())
      .filter(Boolean)
      .join(" · ");
    return text.slice(0, 260);
  }

  async function openNativeBuildForm() {
    const build = state.build;
    if (build?.mode !== "build") return;
    readBuildInputs();
    const { lat, lon, name, typeValue, dispatchValue, station } = build;
    closeBuildDialog();
    if (state.open) closeDashboard();
    const trigger = document.querySelector('#build_new_building, a[href="/buildings/new"], a[href$="/buildings/new"]');
    if (!trigger) {
      try { await navigator.clipboard.writeText(`${lat.toFixed(6)}, ${lon.toFixed(6)}`); } catch { /* Kopieren ist optional. */ }
      plannerToast("Knopf „Neues Gebäude bauen“ nicht gefunden – Koordinaten wurden kopiert.");
      return;
    }
    trigger.click();
    let form = null;
    for (let attempt = 0; attempt < 40 && !form; attempt += 1) {
      await new Promise((resolve) => setTimeout(resolve, 150));
      form = document.querySelector('[name="building[latitude]"]')?.closest("form") || null;
    }
    if (!form) {
      plannerToast("Das Spielformular wurde nicht rechtzeitig geladen.");
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
    plannerToast("Spielformular ausgefüllt – Position prüfen und im Spiel bauen.");
  }

  function exportCsv() {
    let headers;
    let rows;
    if (state.tab === "regions") {
      headers = ["Leitstelle", "Bundesländer", "Bezirke", "Wachen", "Fahrzeuge", "Personal", "Sollpersonal", "Personal fehlt", "Ausbildung fehlt", "Bereitschaft"];
      rows = state.operationalModel.regions.map((item) => [item.caption, item.federalStates.join(", "), item.districts.join(", "), item.buildings.length, item.vehicles.length, item.personnel, item.targetCrew, item.missingCrew, item.missingTraining, `${item.readiness}%`]);
    } else if (state.tab === "extensions") {
      headers = ["Wache", "Typ", "Leitstelle", "Bezirk", "Ausbau", "Status", "Verfügbar ab"];
      rows = state.operationalModel.extensions.map((item) => [item.buildingCaption, item.buildingType, item.dispatchCenterCaption, item.district, item.caption, item.status, item.availableAt?.toISOString() || ""]);
    } else if (state.tab === "utilization") {
      headers = ["Fahrzeug", "Typ", "Wache", "Bezirk", "Gesamt-km", "30 Tage", "Typdurchschnitt", "Bewertung"];
      rows = state.operationalModel.utilizationRows.map((item) => [item.caption, item.typeCaption, item.buildingCaption, item.district, item.distanceTotal, item.distance30d, item.typeAverage30d, item.utilization]);
    } else if (state.tab === "personnel") {
      headers = ["Wache", "Typ", "Leitstelle", "Personal", "Fahrzeug-Soll", "Nicht zugewiesen", "Reserve", "Personal fehlt", "Zuweisung fehlt", "Ausbildung fehlt"];
      rows = state.operationalModel.personnelRows.map((item) => [item.caption, item.typeCaption, item.dispatchCenterCaption, item.personnel, item.targetCrew, item.unassigned, item.reserve, item.shortage, item.assignmentGap, item.trainingGap]);
    } else if (state.tab === "dashboard") {
      headers = ["Priorität", "Bereich", "Hinweis"];
      rows = state.operationalModel.alerts.map((item) => [item.priority, item.title, item.detail]);
    } else if (state.tab === "buildings") {
      headers = ["Wache", "Fahrzeuge", "Personal", "Zugewiesen", "Frei", "Besatzung fehlt"];
      rows = state.buildingSummary.map((item) => [item.caption, item.vehicles, item.personnel, item.assigned, item.free, item.missingCrew]);
    } else if (state.tab === "training") {
      headers = ["Ausbildung", "Bereich", "Fahrzeuge", "Benötigt", "Vorhanden", "Fehlt", "Geprüfte Fahrzeuge"];
      rows = Core.summarizeTraining(state.analyzed).map((item) => [trainingName(item.key), item.school, item.vehicles, item.required, item.actual, item.missing, item.scannedVehicles]);
    } else if (state.tab === "courses") {
      headers = ["Lehrgang", "Schule", "Beginn", "Ende", "Teilnehmer"];
      rows = state.schoolings.map((course) => [course.caption || course.name || course.schooling_name || "", course.building_caption || course.school || "", course.start_at || course.start || "", course.finish_at || course.end_at || "", course.participants_count ?? ""]);
    } else {
      headers = ["Fahrzeug", "Typ", "Wache", "Soll", "Zugewiesen", "Fehlt", "Ausbildung fehlt"];
      rows = state.analyzed.map((item) => [item.caption, item.typeCaption, item.buildingCaption, item.target, item.assigned, item.missingCrew, item.missingTraining]);
    }
    const csv = [headers, ...rows].map((row) => row.map(csvCell).join(";")).join("\r\n");
    const blob = new Blob(["\ufeff", csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `lss-${state.tab}-${new Date().toISOString().slice(0, 10)}.csv`;
    anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function csvCell(value) {
    return `"${String(value ?? "").replaceAll('"', '""')}"`;
  }

  function trainingName(key) {
    for (const school of Object.values(state.schoolingTypes || {})) {
      const entry = Array.isArray(school) ? school.find((item) => item.key === key) : school?.[key];
      if (entry?.caption) return entry.caption;
      if (typeof entry === "string") return entry;
    }
    return String(key).replaceAll("_", " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
  }

  function icon(name) {
    const paths = {
      app: '<path d="M12 3 4 6v6c0 4.8 3.1 7.8 8 9 4.9-1.2 8-4.2 8-9V6l-8-3Z"/><path d="M8 9h8M8 13h8M12 7v8"/>',
      dashboard: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
      region: '<path d="M4 20V8l8-4 8 4v12"/><path d="M8 20v-5h8v5M8 9h.01M12 9h.01M16 9h.01"/>',
      extension: '<path d="M4 21v-8l5-3v11M9 21V7l5-3v17M14 21v-9l6-3v12M2 21h20"/>',
      gauge: '<path d="M4.9 19a9 9 0 1 1 14.2 0"/><path d="m12 13 4-4"/><circle cx="12" cy="13" r="1"/>',
      chevron: '<path d="m9 18 6-6-6-6"/>',
      transfer: '<path d="M17 3l4 4-4 4M3 7h18M7 21l-4-4 4-4m14 4H3"/>',
      vehicle: '<path d="M3 7h11v10H3z"/><path d="M14 10h3l3 3v4h-6z"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/>',
      building: '<path d="M4 21V7l8-4 8 4v14"/><path d="M8 10h2m4 0h2m-8 4h2m4 0h2M9 21v-4h6v4"/>',
      training: '<path d="m3 9 9-5 9 5-9 5-9-5Z"/><path d="M7 12v4c3 2 7 2 10 0v-4M21 9v6"/>',
      calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18m-12 5 2 2 4-4"/>',
      map: '<path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3V6Z"/><path d="M9 3v15m6-12v15"/>',
      theme: '<path d="M12 3a9 9 0 1 0 9 9c0-1-.17-1.96-.47-2.86A7 7 0 0 1 12 3Z"/>',
      external: '<path d="M14 4h6v6M20 4l-9 9"/><path d="M18 13v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h6"/>',
      refresh: '<path d="M20 11a8 8 0 1 0-2.34 5.66M20 4v7h-7"/>',
      close: '<path d="m6 6 12 12M18 6 6 18"/>',
      search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
      scan: '<path d="M9 4H6a2 2 0 0 0-2 2v14h16V6a2 2 0 0 0-2-2h-3"/><rect x="9" y="2" width="6" height="4" rx="1"/><path d="m8 13 2 2 5-5"/>',
      download: '<path d="M12 3v12m-4-4 4 4 4-4M5 21h14"/>',
      stop: '<rect x="5" y="5" width="14" height="14" rx="2"/>',
      users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
      alert: '<path d="M10.3 4.4 2.5 18a2 2 0 0 0 1.7 3h15.6a2 2 0 0 0 1.7-3L13.7 4.4a2 2 0 0 0-3.4 0Z"/><path d="M12 9v4m0 4h.01"/>',
      plus: '<path d="M12 5v14M5 12h14"/>',
      check: '<path d="m5 12 5 5 9-10"/>',
      sort: '<path d="m8 9 4-4 4 4M16 15l-4 4-4-4"/>',
      "sort-asc": '<path d="m7 14 5-5 5 5"/>',
      "sort-desc": '<path d="m7 10 5 5 5-5"/>',
    };
    return `<svg class="lssfo-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${paths[name] || paths.app}</svg>`;
  }

  function badge(value, tone) {
    return `<span class="lssfo-badge ${tone}">${escapeHtml(value)}</span>`;
  }

  function formatNumber(value) {
    return numberFormat.format(Number(value || 0));
  }

  function formatDate(value) {
    if (!value) return "–";
    const date = new Date(value);
    return Number.isNaN(date.valueOf()) ? escapeHtml(value) : date.toLocaleString("de-DE");
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }
})();
