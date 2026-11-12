/*
 * Hauptfenster: Kopf, Kennzahlen, Bereiche, Werkzeugleiste und Inhalt.
 * Wird erst beim ersten Öffnen aufgebaut; geschlossen kostet es nichts.
 */

let shell = null;
let closeTimer = 0;
let searchTimer = 0;

const THEMES = [{ value: "auto", label: "LSS-Design" }, { value: "dark", label: "Dunkel" }, { value: "light", label: "Hell" }];
const EFFECTS = [{ value: "auto", label: "Effekte: Auto" }, { value: "full", label: "Effekte: Voll" }, { value: "reduced", label: "Effekte: Sparsam" }];
const CREW_MODES = [{ value: "max", label: "Maximal" }, { value: "min", label: "Minimum" }];

// Markenzeichen (gefüllte Kacheln) – gleich in Navigationsleiste und Fensterkopf.
const brandGlyph = (className = "") => `<svg class="${className}" viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="currentColor"><rect x="3" y="3" width="8" height="10" rx="2"/><rect x="13" y="3" width="8" height="6" rx="2"/><rect x="13" y="11" width="8" height="10" rx="2"/><rect x="3" y="15" width="8" height="6" rx="2"/></svg>`;
const ref = (name) => shell.querySelector(`[data-ref="${name}"]`);

function ensureShell() {
  if (shell) return;
  shell = kit.createRoot("lssfo-shell", "lssfo-shell");
  shell.hidden = true;
  shell.innerHTML = `
    <div class="lssfo-shell-backdrop" data-action="close"></div>
    <section class="lssfo-window" role="dialog" aria-modal="true" aria-label="LSS Verwaltung">
      <header class="lssfo-header">
        <div class="lssfo-brand"><span class="lssfo-brand-mark">${brandGlyph("lssfo-brand-glyph")}</span><div><h1>LSS Verwaltung</h1><p data-ref="subtitle">Noch keine Daten geladen</p></div></div>
        <div class="lssfo-header-actions">
          <label class="lssfo-pick" title="Darstellung">${icon("theme")}${kit.selectHtml('data-change="theme" aria-label="Darstellung"', THEMES, settings.values.theme)}</label>
          <label class="lssfo-pick" title="Glas-Unschärfe und Animationen. „Sparsam“ entlastet schwächere Rechner.">${icon("gauge")}${kit.selectHtml('data-change="effects" aria-label="Effekte"', EFFECTS, settings.values.effects)}</label>
          ${STANDALONE ? "" : `<button type="button" class="lssfo-btn lssfo-collapse" data-action="popout">${icon("external")}<span>Eigenes Fenster</span></button>`}
          <button type="button" class="lssfo-btn is-primary lssfo-collapse" data-action="refresh">${icon("refresh")}<span>Aktualisieren</span></button>
          <button type="button" class="lssfo-icon-btn" data-action="close" aria-label="Schließen" title="Schließen (Esc)">${icon("close")}</button>
        </div>
      </header>
      <div class="lssfo-status" data-ref="status"></div>
      <div class="lssfo-kpis" data-ref="kpis"></div>
      <nav class="lssfo-tabs" data-ref="tabs" aria-label="Bereiche">
        <span class="lssfo-tab-indicator" aria-hidden="true"></span>
        ${VIEWS.map((view) => `<button type="button" data-action="tab" data-tab="${view.id}">${icon(view.icon)}<span>${esc(view.label)}</span><b data-tab-count="${view.id}">0</b></button>`).join("")}
      </nav>
      <div class="lssfo-toolbar">
        <label class="lssfo-search">${icon("search")}<input type="search" data-input="search" placeholder="Fahrzeug, Wache oder Typ suchen …" aria-label="Übersicht durchsuchen"></label>
        <label class="lssfo-toggle"><input class="lssfo-switch" type="checkbox" data-change="only-missing"><span>Nur Fehlbedarf</span></label>
        <label class="lssfo-toggle">Soll-Besatzung ${kit.selectHtml('class="lssfo-input lssfo-compact" data-change="crew-mode" aria-label="Soll-Besatzung"', CREW_MODES, settings.values.crewMode)}</label>
        <button type="button" class="lssfo-btn" data-action="scan" data-ref="scan"></button>
        <button type="button" class="lssfo-btn" data-action="export">${icon("download")}<span>CSV exportieren</span></button>
      </div>
      <main class="lssfo-content" data-ref="content"></main>
      <footer class="lssfo-footer"><span>Auswertung lokal im Browser · Anfragen an das Spiel werden gedrosselt</span><span>Fahrzeuganforderungen: LSS-Manager-Katalog</span></footer>
    </section>`;
  // Links auf Spielseiten öffnen sich im Panel (Strg-/Mittelklick weiterhin in einem neuen Tab).
  shell.addEventListener("click", interceptGameLink);
  kit.layer().addEventListener("click", interceptGameLink);
  window.addEventListener("resize", () => state.open && positionTabIndicator());
}

function interceptGameLink(event) {
  const link = event.target.closest?.('a[href^="/buildings/"], a[href^="/vehicles/"]');
  if (!link || event.defaultPrevented || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
  event.preventDefault();
  openGameView(link.getAttribute("href"), kit.textOf(link));
}

function openDashboard() {
  ensureShell();
  clearTimeout(closeTimer);
  if (!state.open) {
    state.open = true;
    kit.activate();
  }
  shell.hidden = false;
  shell.classList.remove("is-closing");
  document.documentElement.classList.add("lssfo-open");
  render();
  animateContent();
  if (!state.data.vehicles.length) void loadData(false);
}

function closeDashboard() {
  if (STANDALONE) {
    window.close();
    return;
  }
  if (!state.open) return;
  state.open = false;
  kit.deactivate();
  shell.classList.add("is-closing");
  document.documentElement.classList.remove("lssfo-open");
  closeTimer = setTimeout(() => {
    if (state.open) return;
    destroyOverviewMap();
    shell.hidden = true;
    shell.classList.remove("is-closing");
  }, 220);
}

function handleEscape() {
  if (!state.open) return false;
  closeDashboard();
  return true;
}

function render() {
  if (!shell || !state.open) return;
  renderStatus();
  renderKpis();
  renderTabs();
  ref("subtitle").textContent = state.data.updatedAt
    ? `Stand ${formatDateTime(state.data.updatedAt)} · ${settings.values.crewMode === "max" ? "Maximalbesatzung" : "Mindestbesatzung"}`
    : "Noch keine Daten geladen";
  ref("scan").innerHTML = state.scan?.kind === "training" ? `${icon("stop")}<span>Prüfung stoppen</span>` : `${icon("scan")}<span>Ausbildungen prüfen</span>`;
  ref("scan").disabled = Boolean(state.scan && state.scan.kind !== "training") || !state.model;
  shell.querySelector(".lssfo-window").classList.toggle("is-map", state.tab === "map");
  renderContent();
}

function renderStatus() {
  if (!shell) return;
  const busy = (text) => `<div class="lssfo-note">${spinner()}<span>${esc(text)}</span></div>`;
  ref("status").innerHTML = state.error ? note("error", esc(state.error))
    : state.scan ? busy(scanStatusText())
      : state.loading ? busy("Wachen, Fahrzeuge und Lehrgänge werden geladen …")
        : "";
}

function renderKpis() {
  const model = state.model;
  const vehicles = model?.vehicles || [];
  const missingCrew = vehicles.reduce((sum, vehicle) => sum + vehicle.missingCrew, 0);
  const affected = vehicles.filter((vehicle) => vehicle.hasMissing).length;
  const dispatchCount = model?.dispatchCenters.length || 0;
  const personnel = (model?.stations || []).reduce((sum, building) => sum + Number(building.personal_count || 0), 0);
  const kpi = (label, value, hint, iconName, danger = false) => `<article class="lssfo-kpi${danger ? " is-danger" : ""}"><div><i>${icon(iconName)}</i><span>${esc(label)}</span></div><strong>${esc(value)}</strong><small>${esc(hint)}</small></article>`;
  ref("kpis").innerHTML = [
    kpi("Fahrzeuge", formatNumber(vehicles.length), "im Fuhrpark", "vehicle"),
    kpi("Gebäude", formatNumber(state.data.buildings.length), `${formatNumber(Math.max(0, state.data.buildings.length - dispatchCount))} weitere · ${plural(dispatchCount, "Leitstelle", "Leitstellen")}`, "building"),
    kpi("Personal", formatNumber(personnel), "an personalführenden Wachen", "users"),
    kpi("Fehlende Besatzung", formatNumber(missingCrew), affected ? `${plural(affected, "Fahrzeug", "Fahrzeuge")} auffällig` : "alles vollständig", "alert", missingCrew > 0),
  ].join("");
}

function renderTabs() {
  const counts = state.model?.counts || {};
  for (const button of ref("tabs").querySelectorAll("[data-tab]")) button.classList.toggle("is-active", button.dataset.tab === state.tab);
  for (const view of VIEWS) {
    const counter = ref("tabs").querySelector(`[data-tab-count="${view.id}"]`);
    if (counter) counter.textContent = formatNumber(view.count ? view.count() : counts[view.id] || 0);
  }
  positionTabIndicator();
}

function positionTabIndicator() {
  const nav = ref("tabs");
  const active = nav.querySelector(`[data-tab="${state.tab}"]`);
  const indicator = nav.querySelector(".lssfo-tab-indicator");
  if (!active?.offsetWidth) return;
  indicator.style.width = `${active.offsetWidth}px`;
  indicator.style.transform = `translateX(${active.offsetLeft}px)`;
}

function renderContent() {
  if (!shell || !state.open) return;
  const content = ref("content");
  if (state.tab !== "map") destroyOverviewMap();
  if (!state.model) {
    content.innerHTML = `<div class="lssfo-empty">${state.loading ? `${spinner()} Daten werden vorbereitet …` : "Noch keine Daten – „Aktualisieren“ lädt Wachen, Fahrzeuge und Lehrgänge."}</div>`;
    return;
  }
  if (!Object.keys(state.data.vehicleTypes).length) {
    content.innerHTML = '<div class="lssfo-empty">Der Fahrzeugkatalog konnte nicht geladen werden. Bitte die Internetverbindung prüfen und erneut aktualisieren.</div>';
    return;
  }
  currentView().render(content);
}

// Einblenden nur beim Bereichswechsel, nicht bei jeder Suche.
function animateContent() {
  const content = ref("content");
  content.classList.remove("is-entering");
  requestAnimationFrame(() => content.classList.add("is-entering"));
}

function selectTab(tab) {
  if (!VIEWS.some((view) => view.id === tab)) return;
  const changed = tab !== state.tab;
  state.tab = tab;
  render();
  if (!changed) return;
  animateContent();
  requestAnimationFrame(() => ref("tabs").querySelector(`[data-tab="${tab}"]`)?.scrollIntoView({ block: "nearest", inline: "nearest", behavior: "smooth" }));
}

kit.on({
  click: {
    close: closeDashboard,
    tab: (element) => selectTab(element.dataset.tab),
    refresh: () => {
      scansValidSince = Date.now();
      void loadData(true);
    },
    popout: () => window.open(new URL("/?lssfo=dashboard", location.origin).href, "_blank", "noopener"),
    export: exportCsv,
  },
  change: {
    theme: (element) => {
      settings.set({ theme: element.value });
      kit.setAppearance({ theme: element.value });
      if (state.tab === "map") renderContent();
    },
    effects: (element) => {
      settings.set({ effects: element.value });
      kit.setAppearance({ effects: element.value });
    },
    "only-missing": (element) => {
      state.onlyMissing = element.checked;
      state.limits = {};
      renderContent();
    },
    "crew-mode": (element) => {
      settings.set({ crewMode: element.value });
      analyze();
      render();
    },
  },
  input: {
    // Große Tabellen werden erst neu aufgebaut, wenn kurz nicht mehr getippt wird.
    search: (element) => {
      clearTimeout(searchTimer);
      searchTimer = setTimeout(() => {
        state.query = element.value.trim().toLocaleLowerCase("de");
        state.limits = {};
        renderContent();
      }, 180);
    },
  },
});
