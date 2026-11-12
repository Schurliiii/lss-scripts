/*
 * Bereiche der Übersicht. Jeder Bereich liefert seine Tabelle ({ key, columns, rows }) –
 * dieselbe Beschreibung dient der Anzeige, der Sortierung und dem CSV-Export.
 */

const VIEWS = [
  { id: "dashboard", label: "Übersicht", icon: "dashboard", render: renderDashboard, table: dashboardTable },
  { id: "vehicles", label: "Fahrzeuge", icon: "vehicle", render: tableView(vehiclesTable), table: vehiclesTable },
  { id: "edit", label: "Bearbeiten", icon: "edit", render: renderEditor, table: editorTable, count: () => Object.keys(state.edits).length },
  { id: "buildings", label: "Wachen", icon: "building", render: tableView(buildingsTable), table: buildingsTable },
  { id: "regions", label: "Gebiete", icon: "region", render: renderRegions, table: regionsTable },
  { id: "extensions", label: "Ausbauten", icon: "extension", render: renderExtensions, table: extensionsTable },
  { id: "utilization", label: "Auslastung", icon: "gauge", render: renderUtilization, table: utilizationTable },
  { id: "personnel", label: "Personalplanung", icon: "users", render: renderPersonnel, table: personnelTable },
  { id: "training", label: "Ausbildungen", icon: "training", render: renderTraining, table: trainingTable },
  { id: "courses", label: "Lehrgänge", icon: "calendar", render: renderCourses, table: coursesTable },
  { id: "map", label: "Karte", icon: "map", render: renderMap, table: mapTable },
];

const currentView = () => VIEWS.find((view) => view.id === state.tab) || VIEWS[0];
const gameLink = (href, text, title = "") => `<a href="${href}" target="_blank" rel="noopener"${title ? ` title="${esc(title)}"` : ""}>${esc(text)}</a>`;
const countBadge = (value, tone = "danger") => (value ? badge(formatNumber(value), tone) : badge("0", "ok"));
const callout = (title, text) => `<div class="lssfo-callout">${title ? `<strong>${esc(title)}</strong>` : ""}<span>${text}</span></div>`;
const panelIntro = (title, text, actions = "") => `<div class="lssfo-intro"><div><strong>${esc(title)}</strong><span>${text}</span></div>${actions ? `<div class="lssfo-intro-actions">${actions}</div>` : ""}</div>`;

function tableView(source) {
  return (content) => {
    const { key, columns, rows } = source();
    content.innerHTML = renderTable(key, columns, rows);
  };
}

/* ---------- Übersicht ---------- */

function dashboardTable() {
  return {
    key: "dashboard",
    rows: state.model.alerts,
    columns: [
      { label: "Priorität", value: (row) => row.priority },
      { label: "Bereich", value: (row) => row.title },
      { label: "Hinweis", value: (row) => row.detail },
    ],
  };
}

function renderDashboard(content) {
  const model = state.model;
  const readiness = Math.round(model.regions.reduce((sum, region) => sum + region.readiness, 0) / Math.max(1, model.regions.length));
  const running = model.extensions.filter((entry) => entry.status === "building").length;
  const inactive = model.extensions.filter((entry) => entry.status === "inactive").length;
  const cards = [
    ["Einsatzbereitschaft", `${readiness} %`, plural(model.regions.length, "Gebiet", "Gebiete"), "regions", "region", "#007aff"],
    ["Ohne Leitstelle", formatNumber(model.operational.filter((building) => building.dispatchCenterId === null).length), "Wachen", "regions", "building", "#ff9500"],
    ["Personalengpässe", formatNumber(model.personnelRows.filter((row) => row.shortage > 0 || row.assignmentGap > 0).length), "Wachen", "personnel", "users", "#af52de"],
    ["Ausbauten", `${formatNumber(running)} / ${formatNumber(inactive)}`, "im Bau / inaktiv", "extensions", "extension", "#34c759"],
    ["Wenig ausgelastet", formatNumber(model.utilization.filter((vehicle) => vehicle.utilization === "low").length), "Fahrzeuge", "utilization", "gauge", "#30b0c7"],
    ["Lehrgänge", formatNumber(model.courses.length), "laufend", "courses", "calendar", "#ff2d55"],
  ].map(([label, value, hint, tab, iconName, color]) => `<button type="button" class="lssfo-dash-card" data-action="tab" data-tab="${tab}"><i style="--tone:${color}">${icon(iconName)}</i><span>${esc(label)}</span><strong>${esc(value)}</strong><small>${esc(hint)}</small></button>`).join("");
  const alerts = model.alerts.slice(0, 10).map((alert) => `<button type="button" class="lssfo-row-button priority-${alert.priority}" data-action="tab" data-tab="${alert.tab}"><span><strong>${esc(alert.title)}</strong><small>${esc(alert.detail)}</small></span>${icon("chevron")}</button>`).join("")
    || '<div class="lssfo-empty is-small">Keine kritischen Hinweise.</div>';
  const regions = model.regions.slice().sort((a, b) => a.readiness - b.readiness).slice(0, 5)
    .map((region) => `<button type="button" class="lssfo-row-button" data-action="tab" data-tab="regions"><span><strong>${esc(region.caption)}</strong><small>${plural(region.buildings.length, "Wache", "Wachen")} · ${plural(region.missingCrew, "Person fehlt", "Personen fehlen")}</small></span><b class="lssfo-score is-${Core.readinessTone(region.readiness)}">${region.readiness} %</b></button>`).join("")
    || '<div class="lssfo-empty is-small">Keine Gebiete erkannt.</div>';
  content.innerHTML = `<div class="lssfo-dash-grid">${cards}</div>
    <div class="lssfo-dash-columns">
      <section class="lssfo-panel-card"><div class="lssfo-heading"><div><h3>Handlungsbedarf</h3><p>Die wichtigsten offenen Punkte aus allen Bereichen</p></div></div>${alerts}</section>
      <section class="lssfo-panel-card"><div class="lssfo-heading"><div><h3>Kritischste Gebiete</h3><p>Bereitschaft aus Personal, Ausbildung und Aktivstatus</p></div></div>${regions}</section>
    </div>`;
}

/* ---------- Fahrzeuge ---------- */

function trainingSummary(vehicle) {
  return vehicle.training.map((item) => `${trainingName(item.key)}: ${item.required}${item.actual === null ? "" : ` / ${item.actual}`}`);
}

function vehiclesTable() {
  return {
    key: "vehicles",
    rows: state.model.vehicles.filter((vehicle) => (!state.onlyMissing || vehicle.hasMissing) && matches(vehicle.search)),
    columns: [
      { label: "Fahrzeug", value: (row) => row.caption, html: (row) => gameLink(`/vehicles/${row.id}/zuweisung`, row.caption) },
      { label: "Typ", value: (row) => row.typeCaption },
      { label: "Wache", value: (row) => row.buildingCaption, html: (row) => gameLink(`/buildings/${row.buildingId}`, row.buildingCaption) },
      { label: "Soll", value: (row) => row.target, html: (row) => `${row.target} <small class="lssfo-muted">(${row.staffMin}–${row.staffMax})</small>` },
      { label: "Zugewiesen", value: (row) => row.assigned },
      { label: "Fehlt", value: (row) => row.missingCrew, html: (row) => countBadge(row.missingCrew) },
      {
        label: "Ausbildung",
        value: (row) => row.missingTraining,
        csv: (row) => trainingSummary(row).join(", "),
        html: (row) => {
          const lines = row.training.length ? trainingSummary(row).map(esc).join("<br>") : '<span class="lssfo-muted">keine</span>';
          const mark = row.missingTraining ? badge(`${row.missingTraining} fehlt`, "danger") : row.training.length && row.educationScanned ? badge("geprüft", "ok") : "";
          return `<span class="lssfo-training-cell">${lines}${mark}</span>`;
        },
      },
      { label: "Ausbildung fehlt", value: (row) => row.missingTraining, hidden: true },
      { label: "Verwaltung", value: () => null, sortable: false, csv: false, html: (row) => `<button type="button" class="lssfo-btn is-small" data-action="manage-vehicle" data-id="${row.id}">Bearbeiten</button>` },
    ],
  };
}

/* ---------- Wachen ---------- */

function statusCell(building) {
  const saving = state.statusSaving === building.id;
  return `<span class="lssfo-inline">${building.enabled ? badge("aktiv", "ok") : badge("inaktiv", "warn")}<button type="button" class="lssfo-btn is-small" data-action="building-status" data-id="${building.id}"${state.statusSaving !== null ? " disabled" : ""}>${saving ? "Bitte warten …" : building.enabled ? "Deaktivieren" : "Aktivieren"}</button></span>`;
}

function buildingsTable() {
  const notApplicable = '<span class="lssfo-muted">–</span>';
  const operational = (building, valueOf) => (building.isDispatchCenter ? null : valueOf(building));
  return {
    key: "buildings",
    rows: state.model.buildings.filter((building) => {
      const missing = !building.isDispatchCenter && (building.summary.missingCrew > 0 || building.summary.missingTraining > 0);
      return (!state.onlyMissing || missing) && matches(building.search);
    }),
    columns: [
      { label: "Wache", value: (row) => row.caption, html: (row) => gameLink(`/buildings/${row.id}`, row.caption) },
      { label: "Typ", value: (row) => row.typeCaption, html: (row) => `${esc(row.typeCaption)}${row.isDispatchCenter ? ` ${badge("Verwaltung")}` : ""}` },
      { label: "Fahrzeuge", value: (row) => operational(row, (building) => building.summary.vehicles) },
      { label: "Personal", value: (row) => operational(row, (building) => building.summary.personnel), html: (row) => (row.isDispatchCenter ? notApplicable : `${formatNumber(row.summary.personnel)}${row.summary.personnelTarget ? ` <small class="lssfo-muted">Soll ${formatNumber(row.summary.personnelTarget)}</small>` : ""}`) },
      { label: "Zugewiesen", value: (row) => operational(row, (building) => building.summary.assigned), html: (row) => (row.isDispatchCenter ? notApplicable : `${formatNumber(row.summary.assigned)} / ${formatNumber(row.summary.targetCrew)}`) },
      { label: "Frei", value: (row) => operational(row, (building) => building.summary.free) },
      { label: "Besatzung fehlt", value: (row) => operational(row, (building) => building.summary.missingCrew), html: (row) => (row.isDispatchCenter ? badge("nicht relevant") : countBadge(row.summary.missingCrew)) },
      { label: "Status", value: (row) => (row.enabled ? "aktiv" : "inaktiv"), html: statusCell },
      { label: "Verwaltung", value: () => null, sortable: false, csv: false, html: (row) => `<button type="button" class="lssfo-btn is-small" data-action="manage-building" data-id="${row.id}">Bearbeiten</button>` },
    ],
  };
}

/* ---------- Gebiete ---------- */

function missingList(label, values) {
  if (!values.length) return `<span class="lssfo-complete">${label}: vollständig</span>`;
  return `<span><b>${label}:</b> ${esc(values.slice(0, 5).join(", "))}${values.length > 5 ? ` +${values.length - 5}` : ""}</span>`;
}

function regionsTable() {
  return {
    key: "regions",
    rows: state.model.regions.filter((region) => (!state.onlyMissing || region.readiness < 90) && matches(region.search)),
    columns: [
      { label: "Leitstelle / Gebiet", value: (row) => row.caption, html: (row) => (row.key === "none" ? badge("ohne Zuordnung", "danger") : gameLink(`/buildings/${row.key}`, row.caption)) },
      { label: "Bundesland", value: (row) => row.federalStates.join(", ") },
      { label: "Bezirke", value: (row) => row.districts.join(", ") },
      { label: "Wachen", value: (row) => row.buildings.length },
      { label: "Fahrzeuge", value: (row) => row.vehicles.length },
      { label: "Personal", value: (row) => row.personnel, html: (row) => `${formatNumber(row.personnel)} / ${formatNumber(row.targetCrew)}` },
      { label: "Sollpersonal", value: (row) => row.targetCrew, hidden: true },
      { label: "Fehlbedarf", value: (row) => row.missingCrew, html: (row) => `${row.missingCrew ? badge(`${formatNumber(row.missingCrew)} Pers.`, "danger") : badge("0 Pers.", "ok")}${row.missingTraining ? badge(`${formatNumber(row.missingTraining)} Ausb.`, "warn") : ""}` },
      { label: "Ausbildung fehlt", value: (row) => row.missingTraining, hidden: true },
      { label: "Bereitschaft", value: (row) => row.readiness, html: (row) => `<b class="lssfo-score is-${Core.readinessTone(row.readiness)}">${row.readiness} %</b>` },
      {
        label: "Lücken",
        value: (row) => row.missingVehicleTypes.length + row.missingBuildingTypes.length,
        csv: (row) => [`Fahrzeuge: ${row.missingVehicleTypes.join(", ") || "vollständig"}`, `Wachen: ${row.missingBuildingTypes.join(", ") || "vollständig"}`].join(" | "),
        html: (row) => `<small class="lssfo-gaps">${missingList("Fahrzeuge", row.missingVehicleTypes)}${missingList("Wachen", row.missingBuildingTypes)}</small>`,
      },
    ],
  };
}

function renderRegions(content) {
  const { key, columns, rows } = regionsTable();
  content.innerHTML = callout("Kontostandard", "Fehlende Wachen- und Fahrzeugtypen werden mit den Typen verglichen, die es in deinen übrigen Leitstellengebieten bereits gibt.")
    + renderTable(key, columns, rows);
}

/* ---------- Ausbauten ---------- */

const EXTENSION_STATUS = {
  owned: { label: "Vorhanden", test: (entry) => entry.status !== "missing" },
  attention: { label: "Handlungsbedarf", test: (entry) => entry.status === "building" || entry.status === "inactive" },
  active: { label: "Aktiv", test: (entry) => entry.status === "active" },
  building: { label: "Im Bau", test: (entry) => entry.status === "building" },
  inactive: { label: "Fertig, inaktiv", test: (entry) => entry.status === "inactive" },
  missing: { label: "Katalog: noch möglich", test: (entry) => entry.status === "missing" },
  all: { label: "Alle Status", test: () => true },
};
const EXTENSION_LABELS = { active: "aktiv", building: "im Bau", inactive: "fertig, inaktiv", missing: "fehlt" };

function extensionStatusHtml(entry) {
  if (entry.status === "building") return `${badge("im Bau", "warn")} <small>${esc(Core.relativeTime(entry.availableAt))}</small>`;
  if (entry.status === "inactive") return badge("fertig, inaktiv", "danger");
  if (entry.status === "missing") return badge("fehlt", "warn");
  return badge("aktiv", "ok");
}

function extensionsTable() {
  const filter = EXTENSION_STATUS[settings.values.extensionStatus] || EXTENSION_STATUS.owned;
  return {
    key: "extensions",
    rows: state.model.extensions.filter((entry) => filter.test(entry) && (!state.onlyMissing || entry.status !== "active") && matches(entry.search)),
    columns: [
      { label: "Wache", value: (row) => row.buildingCaption, html: (row) => gameLink(`/buildings/${row.buildingId}`, row.buildingCaption) },
      { label: "Typ", value: (row) => row.buildingType },
      { label: "Leitstelle", value: (row) => row.dispatchCenterCaption },
      { label: "Bezirk", value: (row) => row.district },
      { label: "Ausbau", value: (row) => row.caption },
      { label: "Status / Restzeit", value: (row) => EXTENSION_LABELS[row.status], html: extensionStatusHtml },
      { label: "Verfügbar ab", value: (row) => row.availableAt, hidden: true },
    ],
  };
}

function renderExtensions(content) {
  const { key, columns, rows } = extensionsTable();
  const limit = settings.values.extensionLimit === "all" ? Infinity : Number(settings.values.extensionLimit) || 100;
  const shown = rows.length > limit ? rows.slice(0, limit) : rows;
  const statusOptions = Object.entries(EXTENSION_STATUS).map(([value, entry]) => ({ value, label: entry.label }));
  const limitOptions = ["50", "100", "250", "500"].map((value) => ({ value, label: value })).concat({ value: "all", label: "Alle" });
  const controls = `<label class="lssfo-field"><span>Status</span>${kit.selectHtml('data-change="extension-status"', statusOptions, settings.values.extensionStatus)}</label>
    <label class="lssfo-field"><span>Maximal anzeigen</span>${kit.selectHtml('data-change="extension-limit"', limitOptions, String(settings.values.extensionLimit))}</label>`;
  content.innerHTML = panelIntro("Ausbauverwaltung", "Standardmäßig werden nur vorhandene Ausbauten gezeigt. Mögliche Ausbauten laut Katalog lassen sich zuschalten.", controls)
    + (shown.length < rows.length ? callout(`${formatNumber(shown.length)} von ${formatNumber(rows.length)}`, "Einträgen werden angezeigt. Grenze oben erhöhen oder Suche und Statusfilter verwenden.") : "")
    + renderTable(key, columns, shown);
}

/* ---------- Auslastung ---------- */

const UTILIZATION = {
  low: { label: "niedrig", tone: "warn", advice: "Standort oder Vorhaltung prüfen" },
  high: { label: "hoch", tone: "danger", advice: "Entlastungsfahrzeug prüfen" },
  normal: { label: "normal", tone: "ok", advice: "passende Auslastung" },
  unknown: { label: "keine Daten", tone: "neutral", advice: "–" },
};

function utilizationTable() {
  const decimal = (valueOf) => (row) => formatDecimal(valueOf(row));
  return {
    key: "utilization",
    rows: state.model.utilization.filter((vehicle) => (!state.onlyMissing || vehicle.utilization === "low" || vehicle.utilization === "high") && matches(vehicle.search)),
    columns: [
      { label: "Fahrzeug", value: (row) => row.caption, html: (row) => gameLink(`/vehicles/${row.id}`, row.caption) },
      { label: "Typ", value: (row) => row.typeCaption },
      { label: "Wache", value: (row) => row.buildingCaption },
      { label: "Bezirk", value: (row) => row.district },
      { label: "Gesamt-km", value: (row) => row.distanceTotal, html: decimal((row) => row.distanceTotal) },
      { label: "30 Tage", value: (row) => row.distance30d, html: decimal((row) => row.distance30d) },
      { label: "Typdurchschnitt", value: (row) => Math.round(row.typeAverage30d * 10) / 10, html: decimal((row) => row.typeAverage30d) },
      { label: "Bewertung", value: (row) => UTILIZATION[row.utilization].label, html: (row) => badge(UTILIZATION[row.utilization].label, UTILIZATION[row.utilization].tone) },
      { label: "Empfehlung", value: (row) => UTILIZATION[row.utilization].advice },
    ],
  };
}

function renderUtilization(content) {
  const { key, columns, rows } = utilizationTable();
  const all = state.model.utilization;
  const hasData = state.data.vehicleDistances.length > 0;
  const summary = [
    ["Stärkste Wache", Core.topGroup(all, (vehicle) => vehicle.buildingCaption)],
    ["Stärkster Fahrzeugtyp", Core.topGroup(all, (vehicle) => vehicle.typeCaption)],
    ["Stärkster Bezirk", Core.topGroup(all, (vehicle) => vehicle.district || "Ohne Bezirk")],
  ].map(([label, group]) => `<article class="lssfo-stat"><span>${label}</span><strong>${esc(group.caption)}</strong><small>${formatDecimal(group.distance)} km / 30 Tage</small></article>`).join("");
  content.innerHTML = callout(hasData ? "30-Tage-Auswertung" : "Keine Kilometerdaten", hasData
    ? "Niedrig und hoch werden relativ zum Durchschnitt desselben Fahrzeugtyps bewertet; bei Einzelstücken dient der Gesamtdurchschnitt als Bezug."
    : "Der offizielle Endpunkt /api/v1/vehicle_distances.json hat keine Werte geliefert.")
    + `<div class="lssfo-stats">${summary}</div>`
    + renderTable(key, columns, rows);
}

/* ---------- Personalplanung ---------- */

function qualificationHtml(row) {
  if (!row.personnelScan) return row.trainingGap ? badge(`${formatNumber(row.trainingGap)} fehlt`, "warn") : '<span class="lssfo-muted">Detailprüfung offen</span>';
  if (!row.qualificationBalance.length) return badge("keine Anforderungen");
  return row.qualificationBalance.map((entry) => {
    const tone = entry.difference < 0 ? "danger" : entry.difference > 0 ? "warn" : "ok";
    const suffix = entry.difference < 0 ? `${-entry.difference} fehlt` : entry.difference > 0 ? `${entry.difference} Reserve` : "passend";
    return badge(`${trainingName(entry.key)}: ${entry.available}/${entry.required} · ${suffix}`, tone, entry.names.join(", "));
  }).join(" ");
}

function personnelTable() {
  return {
    key: "personnel",
    rows: state.model.personnelRows.filter((row) => (!state.onlyMissing || row.shortage || row.assignmentGap || row.trainingGap) && matches(row.search)),
    columns: [
      { label: "Wache", value: (row) => row.caption, html: (row) => gameLink(`/buildings/${row.id}`, row.caption) },
      { label: "Typ", value: (row) => row.typeCaption },
      { label: "Leitstelle", value: (row) => row.dispatchCenterCaption },
      { label: "Personal", value: (row) => row.personnel, html: (row) => gameLink(`/buildings/${row.id}/personals`, formatNumber(row.personnel), "Personal der Wache öffnen") },
      { label: "Fahrzeug-Soll", value: (row) => row.targetCrew },
      { label: "Nicht zugewiesen", value: (row) => row.unassigned },
      { label: "Reserve", value: (row) => row.reserve, html: (row) => (row.reserve ? badge(formatNumber(row.reserve), "ok") : "0") },
      { label: "Personal fehlt", value: (row) => row.shortage, html: (row) => countBadge(row.shortage) },
      { label: "Zuweisung fehlt", value: (row) => row.assignmentGap, html: (row) => countBadge(row.assignmentGap) },
      { label: "Ausbildungsbilanz", value: (row) => row.trainingGap, html: qualificationHtml },
    ],
  };
}

function transferCard(suggestion) {
  const people = (count) => plural(count, "Person", "Personen");
  const title = suggestion.kind === "assign"
    ? `${plural(suggestion.amount, "freie Person", "freie Personen")} Fahrzeugen zuweisen`
    : suggestion.kind === "qualification" ? `${suggestion.amount}× ${suggestion.qualification} verschieben` : `${people(suggestion.amount)} verschieben`;
  const detail = suggestion.kind === "assign"
    ? `${suggestion.to.caption} · Personal ist bereits an der Wache vorhanden`
    : `${suggestion.from.caption} → ${suggestion.to.caption} · ${suggestion.sameDispatch ? "gleiche Leitstelle" : "leitstellenübergreifend"}`;
  return `<article class="lssfo-transfer"><i>${icon("transfer")}</i><div><strong>${esc(title)}</strong><small>${esc(detail)}</small></div><a class="lssfo-btn is-small" href="/buildings/${suggestion.to.id}/personals" target="_blank" rel="noopener">Personal</a></article>`;
}

function renderPersonnel(content) {
  const { key, columns, rows } = personnelTable();
  const scanned = Object.keys(state.scans.stations).length;
  const running = state.scan?.kind === "personnel";
  const button = `<button type="button" class="lssfo-btn" data-action="scan-personnel"${state.scan && !running ? " disabled" : ""}>${running ? `${icon("stop")} Prüfung stoppen` : `${icon("scan")} Personal detailliert prüfen`}</button>`;
  const suggestions = state.model.transfers.slice(0, 12).map(transferCard).join("") || '<div class="lssfo-empty is-small">Aus den aktuellen Sollwerten lässt sich keine sinnvolle Verschiebung ableiten.</div>';
  content.innerHTML = `<section class="lssfo-panel-card lssfo-transfers">
      <div class="lssfo-heading"><div><h3>Verschiebevorschläge</h3><p>Reserve wird zuerst innerhalb derselben Leitstelle verteilt; nach der Detailprüfung zählen auch Ausbildungsüberschüsse.</p></div>${button}</div>
      ${scanned ? note("success", `${plural(scanned, "Wache", "Wachen")} mit Namen, Verfügbarkeit und Ausbildungen geprüft.`) : ""}
      ${suggestions}
    </section>${renderTable(key, columns, rows)}`;
}

/* ---------- Ausbildungen ---------- */

function trainingTable() {
  return {
    key: "training",
    rows: state.model.training.filter((item) => (!state.onlyMissing || (item.scannedVehicles && item.missing > 0)) && matches(`${item.school} ${item.key} ${trainingName(item.key)}`.toLocaleLowerCase("de"))),
    columns: [
      { label: "Ausbildung", value: (row) => trainingName(row.key) },
      { label: "Bereich", value: (row) => row.school },
      { label: "Fahrzeuge", value: (row) => row.vehicles },
      { label: "Benötigte Plätze", value: (row) => row.required },
      { label: "Vorhanden", value: (row) => (row.scannedVehicles ? row.actual : null) },
      { label: "Fehlt", value: (row) => (row.scannedVehicles ? row.missing : null), html: (row) => (row.scannedVehicles ? countBadge(row.missing) : '<span class="lssfo-muted">–</span>') },
      { label: "Prüfstand", value: (row) => row.scannedVehicles, html: (row) => `${formatNumber(row.scannedVehicles)} / ${formatNumber(row.vehicles)}`, csv: (row) => `${row.scannedVehicles} / ${row.vehicles}` },
    ],
  };
}

function renderTraining(content) {
  const { key, columns, rows } = trainingTable();
  const scanned = Object.keys(state.scans.vehicles).length > 0;
  content.innerHTML = callout(scanned ? "Ausbildungsprüfung aktiv" : "Ausbildungsbedarf berechnet", scanned
    ? "„Vorhanden“ zählt passend ausgebildete Personen, die dem jeweiligen Fahrzeug zugewiesen sind."
    : "„Ausbildungen prüfen“ liest die tatsächlichen Fahrzeugzuweisungen – eine Abfrage je Wache, schonend nacheinander.")
    + renderTable(key, columns, rows);
}

/* ---------- Lehrgänge ---------- */

function coursesTable() {
  return {
    key: "courses",
    rows: state.model.courses.filter((course) => matches(`${course.title} ${course.school}`.toLocaleLowerCase("de"))),
    columns: [
      { label: "Lehrgang", value: (row) => row.title },
      { label: "Schule", value: (row) => row.school },
      { label: "Status", value: (row) => (row.running ? "Läuft" : "Offen"), html: (row) => (row.running ? badge("Läuft", "ok") : badge("Offen", "warn")) },
      { label: "Beginn", value: (row) => row.start },
      { label: "Ende", value: (row) => row.finish },
      { label: "Restzeit", value: (row) => row.finish, html: (row) => (row.finish ? esc(Core.relativeTime(row.finish)) : '<span class="lssfo-muted">–</span>'), csv: (row) => (row.finish ? Core.relativeTime(row.finish) : "") },
      { label: "Freie Plätze", value: (row) => row.openSpaces },
    ],
  };
}

function renderCourses(content) {
  const { key, columns, rows } = coursesTable();
  const intro = panelIntro("Lehrgangsverwaltung", "Eigene Schule auswählen und die Spieloberfläche direkt im Panel verwenden.", `<button type="button" class="lssfo-btn is-primary" data-action="course-open">${icon("plus")}<span>Lehrgang starten</span></button>`);
  content.innerHTML = intro + renderTable(key, columns, rows, { empty: "Keine laufenden eigenen Lehrgänge gefunden." });
}

kit.on({
  change: {
    "extension-status": (element) => {
      settings.set({ extensionStatus: element.value });
      renderContent();
    },
    "extension-limit": (element) => {
      settings.set({ extensionLimit: element.value === "all" ? "all" : Math.max(25, Number(element.value) || 100) });
      renderContent();
    },
  },
});
