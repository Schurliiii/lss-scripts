/*
 * Verwaltung einzelner Fahrzeuge und Wachen (Stammdaten, Leitstelle, Status, Personal),
 * Lehrgangsassistent und Spielseiten direkt im Panel.
 */

let manager = null;

async function openManager(kind, id) {
  const entity = kind === "vehicle" ? rawVehicle(id) : rawBuilding(id);
  if (!entity) return;
  manager?.dialog.close();
  const current = {
    kind, id, entity,
    name: entity.caption || "",
    loading: true, saving: false, savingPerson: null, error: "", notice: "",
    form: null, nameInput: null, maxInput: null, maxPersonnel: "", dispatchInput: null, dispatchCenterId: "", dispatchOptions: [],
    personnel: [], personQuery: "", csrf: "",
  };
  current.dialog = kit.openDialog({ label: `${kind === "vehicle" ? "Fahrzeug" : "Wache"} bearbeiten`, size: "lg", onClose: () => { if (manager === current) manager = null; } });
  manager = current;
  renderManager();
  if (kind === "building") {
    try {
      const html = await kit.getHtml(`/buildings/${id}/edit`, { priority: true });
      if (!parseEditForm(html, current)) current.error = "Das Bearbeitungsformular wurde nicht vollständig erkannt; Name und Status bleiben verfügbar.";
    } catch (error) {
      current.error = `Leitstellenzuordnung konnte nicht geladen werden: ${error.message}`;
    }
  } else {
    const [edit, assignment] = await Promise.allSettled([kit.getHtml(`/vehicles/${id}/edit`, { priority: true }), kit.getHtml(`/vehicles/${id}/zuweisung`, { priority: true })]);
    const problems = [];
    if (edit.status === "rejected") problems.push(`Fahrzeugeinstellungen: ${edit.reason?.message || edit.reason}`);
    else if (!parseEditForm(edit.value, current)) problems.push("Fahrzeugeinstellungen wurden nicht erkannt");
    if (assignment.status === "rejected") problems.push(`Personalzuweisung: ${assignment.reason?.message || assignment.reason}`);
    else parsePersonnelPage(assignment.value, current);
    if (problems.length) current.error = `Nur teilweise geladen: ${problems.join(" · ")}`;
  }
  current.loading = false;
  if (manager === current) renderManager();
}

function parseEditForm(html, target) {
  const doc = kit.parseHtml(html);
  const selectors = target.kind === "vehicle"
    ? '#vehicle_caption, input[name="vehicle[caption]"], input[name="caption"]'
    : '#building_caption, input[name="building[caption]"], input[name="caption"]';
  const nameInput = doc.querySelector(selectors);
  const form = nameInput?.closest("form") || doc.querySelector("form");
  if (!form || !nameInput) return false;
  target.form = form;
  target.nameInput = nameInput;
  target.name = nameInput.value || target.name;
  if (target.kind === "vehicle") {
    target.maxInput = form.querySelector('#vehicle_personal_max, [name="vehicle[personal_max]"], [name="vehicle[max_personnel_override]"]');
    target.maxPersonnel = target.maxInput?.value ?? "";
  } else {
    target.dispatchInput = form.querySelector('[name="building[leitstelle_building_id]"], #building_leitstelle_building_id');
    target.dispatchCenterId = target.dispatchInput?.value ?? "";
    target.dispatchOptions = target.dispatchInput ? [...target.dispatchInput.options].map((option) => ({ value: option.value, label: option.textContent.trim() || "Ohne Leitstelle" })) : [];
  }
  return true;
}

const PERSON_STATUS = /^(verfügbar|frei\b|im fahrzeug|im unterricht|im einsatz|nicht verfügbar|in ausbildung)/i;

function educationKeys(row) {
  let keys = [];
  try { keys = JSON.parse(row.dataset.filterableBy || "[]"); } catch { keys = []; }
  for (const element of row.querySelectorAll("[data-education-key]")) keys.push(element.dataset.educationKey);
  return [...new Set(keys.filter(Boolean))];
}

// Personalzuweisungsseite eines Fahrzeugs: Personen, Ausbildungen, Status und Schalter.
function parsePersonnelPage(html, target) {
  const doc = kit.parseHtml(html);
  target.csrf = doc.querySelector('meta[name="csrf-token"]')?.content || kit.csrfToken();
  const rows = [...doc.querySelectorAll("tbody tr")].filter((row) => row.id.startsWith("personal_") || row.querySelector("[personal_id]"));
  target.personnel = rows.map((row, index) => {
    const assignedButton = row.querySelector("a.btn-assigned");
    const actionButton = assignedButton || row.querySelector("a.btn-success");
    const id = Number(actionButton?.getAttribute("personal_id") || row.id.replace(/\D/g, "")) || index + 1;
    const cells = [...row.querySelectorAll("td")];
    const assigned = Boolean(assignedButton);
    // An ein anderes Fahrzeug gebunden: Fahrzeuglink, der nicht auf dieses Fahrzeug zeigt …
    const vehicleLink = [...row.querySelectorAll('a[href*="/vehicles/"]')]
      .map((anchor) => ({ anchor, match: (anchor.getAttribute("href") || "").match(/\/vehicles\/(\d+)\/?$/) }))
      .find((entry) => entry.match && Number(entry.match[1]) !== Number(target.id));
    let boundTo = vehicleLink ? { id: Number(vehicleLink.match[1]), caption: kit.textOf(vehicleLink.anchor) || `Fahrzeug ${vehicleLink.match[1]}` } : null;
    // … oder ohne Link der Text der Spalte „Zugewiesen an“ (letzte Spalte ohne Schaltflächen).
    const lastCell = cells.length >= 4 ? cells[cells.length - 1] : null;
    if (!boundTo && !assigned && lastCell?.querySelector("a.btn, button, [personal_id]")) {
      const clone = lastCell.cloneNode(true);
      clone.querySelectorAll("a, button").forEach((element) => element.remove());
      const caption = kit.textOf(clone);
      if (caption && !PERSON_STATUS.test(caption)) boundTo = { id: null, caption };
    }
    const statusText = cells.slice(1).map(kit.textOf).find((text) => PERSON_STATUS.test(text)) || "";
    const keys = educationKeys(row);
    return {
      id,
      name: kit.textOf(cells[0]) || `Person ${id}`,
      keys,
      education: keys.length ? keys.map(trainingName).join(", ") : "Keine Ausbildung",
      assigned,
      boundTo: assigned ? null : boundTo,
      status: /unterricht|ausbildung/i.test(statusText) ? "training" : /im fahrzeug|im einsatz|nicht verfügbar/i.test(statusText) ? "busy" : "free",
      statusText,
      actionHref: actionButton?.getAttribute("href") || "",
      available: Boolean(actionButton),
    };
  });
}

function personStatusLabel(person) {
  if (person.assigned) return "zugewiesen";
  if (person.status === "training") return person.statusText || "im Unterricht";
  if (person.boundTo) return `an ${person.boundTo.caption}`;
  if (person.status === "busy") return person.statusText;
  return "verfügbar";
}

function personStatusHtml(person) {
  if (person.assigned) return badge("zugewiesen", "ok");
  const extra = person.status === "training" || (person.status === "busy" && !person.boundTo) ? ` <small class="lssfo-muted">${esc(person.statusText)}</small>` : "";
  if (person.boundTo) {
    const target = person.boundTo.id ? gameLink(`/vehicles/${person.boundTo.id}`, person.boundTo.caption) : esc(person.boundTo.caption);
    return `${badge("anderes Fahrzeug", "warn")} <small>${target}</small>${extra}`;
  }
  if (person.status === "training") return `${badge("im Unterricht")}${extra}`;
  if (person.status === "busy") return /nicht verfügbar/i.test(person.statusText) ? badge("nicht verfügbar") : `${badge("unterwegs")}${extra}`;
  return '<span class="lssfo-muted">verfügbar</span>';
}

function personnelTableHtml(requiredKeys, capacity) {
  if (!manager.personnel.length) return '<div class="lssfo-empty is-small">Kein zuweisbares Personal an dieser Wache gefunden.</div>';
  const full = manager.personnel.filter((person) => person.assigned).length >= capacity;
  const fits = (person) => !requiredKeys.length || requiredKeys.some((key) => person.keys.includes(key));
  const columns = [
    { label: "Person", value: (row) => row.name, html: (row) => `<strong>${esc(row.name)}</strong>` },
    { label: "Ausbildungen", value: (row) => row.education, html: (row) => `${esc(row.education)} ${fits(row) && requiredKeys.length ? badge("passend", "ok") : ""}` },
    { label: "Status", value: personStatusLabel, html: personStatusHtml },
    {
      label: "Aktion",
      value: (row) => (row.assigned ? "Entfernen" : "Zuweisen"),
      html: (row) => {
        const disabled = !row.available || manager.savingPerson !== null || (!row.assigned && full);
        const label = manager.savingPerson === row.id ? "Bitte warten …" : row.assigned ? "Entfernen" : row.boundTo ? "Umsetzen" : "Zuweisen";
        return `<button type="button" class="lssfo-btn is-small${row.assigned ? " is-danger" : ""}" data-action="person-toggle" data-id="${row.id}"${disabled ? " disabled" : ""}${row.boundTo ? ` title="Wird von ${esc(row.boundTo.caption)} abgezogen"` : ""}>${label}</button>`;
      },
    },
  ];
  // Zugewiesene zuerst, dann freie, an andere Fahrzeuge gebundene, zuletzt Personen im Unterricht;
  // ohne gewählte Sortierung passende Ausbildungen vor dem Rest.
  const rank = (person) => (person.assigned ? 0 : person.status === "training" ? 3 : person.boundTo ? 2 : 1) * 2 + (state.sorts[MANAGER_TABLE] || fits(person) ? 0 : 1);
  const people = manager.personnel.slice().sort((a, b) => collator.compare(a.name, b.name));
  return renderTable(MANAGER_TABLE, columns, people, {
    rank,
    meta: false,
    className: "lssfo-personnel",
    rowAttributes: (person) => {
      const search = `${person.name} ${person.education}`.toLocaleLowerCase("de");
      return ` data-person-search="${esc(search)}"${manager.personQuery && !search.includes(manager.personQuery) ? " hidden" : ""}`;
    },
  });
}

function renderManager() {
  if (!manager) return;
  const body = manager.dialog.element.querySelector(".lssfo-dialog-body");
  const scrollTop = body?.scrollTop || 0;
  const isVehicle = manager.kind === "vehicle";
  const analyzed = isVehicle ? state.model?.vehicleById.get(manager.id) : null;
  const building = !isVehicle ? state.model?.buildingById.get(manager.id) : null;
  const enabled = manager.entity.enabled !== false;
  const fields = [`<label class="lssfo-field"><span>Name</span><input type="text" data-manager="name" maxlength="120" value="${esc(manager.name)}"></label>`];
  if (isVehicle && manager.maxInput) fields.push(`<label class="lssfo-field"><span>Maximale Besatzung</span><input type="number" data-manager="max" min="0" max="${analyzed?.staffMax || 99}" value="${esc(manager.maxPersonnel)}"><small>0 bedeutet: Standardwert des Fahrzeugtyps</small></label>`);
  if (!isVehicle && manager.dispatchInput) fields.push(`<label class="lssfo-field"><span>Leitstelle</span>${kit.selectHtml('data-manager="dispatch"', manager.dispatchOptions, manager.dispatchCenterId)}<small>Gespeichert wird über das originale Bearbeitungsformular des Spiels.</small></label>`);
  if (!isVehicle) {
    const saving = state.statusSaving === manager.id;
    fields.push(`<div class="lssfo-status-card"><span>Status der Wache</span>${enabled ? badge("aktiv", "ok") : badge("inaktiv", "warn")}<button type="button" class="lssfo-btn is-small" data-action="building-status" data-id="${manager.id}"${state.statusSaving !== null ? " disabled" : ""}>${saving ? "Bitte warten …" : enabled ? "Wache deaktivieren" : "Wache aktivieren"}</button><small>Inaktive Wachen berücksichtigt das Spiel bei der Einsatzgenerierung anders.</small></div>`);
  }
  const sections = [`<section class="lssfo-section">
      <div class="lssfo-heading"><div><h3>Stammdaten</h3><p>${isVehicle ? "Name und Fahrzeugeinstellungen" : "Name, Leitstelle und Status der Wache"}</p></div></div>
      <div class="lssfo-form-grid">${fields.join("")}</div>
      <div class="lssfo-actions is-start">
        <button type="button" class="lssfo-btn is-primary" data-action="manager-save"${manager.loading || manager.saving ? " disabled" : ""}>${manager.saving ? `${spinner()} Speichert …` : "Änderungen speichern"}</button>
        <a class="lssfo-btn" href="/${isVehicle ? "vehicles" : "buildings"}/${manager.id}/edit" target="_blank" rel="noopener">Alle Spieleinstellungen ${icon("external")}</a>
      </div>
    </section>`];

  if (building) {
    const extensions = state.model.extensions.filter((entry) => entry.buildingId === manager.id);
    const count = (status) => extensions.filter((entry) => entry.status === status).length;
    const chips = extensions.map((entry) => `<span class="lssfo-chip is-${entry.status}">${esc(entry.caption)} · ${esc(entry.status === "building" ? Core.relativeTime(entry.availableAt) : EXTENSION_LABELS[entry.status])}</span>`).join("") || '<span class="lssfo-muted">Keine Einträge</span>';
    sections.push(`<section class="lssfo-section"><div class="lssfo-heading"><div><h3>Ausbauten und Personal</h3><p>${extensions.length ? `${count("active")} aktiv · ${count("inactive")} inaktiv · ${count("building")} im Bau` : "Keine Ausbauinformationen vorhanden"}</p></div></div>
      <div class="lssfo-chips">${chips}</div>
      <div class="lssfo-actions is-start"><a class="lssfo-btn" href="/buildings/${manager.id}" target="_blank" rel="noopener">Wache öffnen</a><a class="lssfo-btn" href="/buildings/${manager.id}/personals" target="_blank" rel="noopener">Personal</a></div></section>`);
    const vehicles = building.vehicles.slice().sort((a, b) => Number(b.hasMissing) - Number(a.hasMissing) || collator.compare(a.caption, b.caption));
    const missing = vehicles.filter((vehicle) => vehicle.hasMissing).length;
    const list = vehicles.map((vehicle) => {
      const status = vehicle.missingCrew > 0 ? `${vehicle.missingCrew} Besatzung fehlt` : vehicle.missingTraining > 0 ? `${vehicle.missingTraining} Ausbildung fehlt` : "vollständig";
      return `<article class="${vehicle.hasMissing ? "has-missing" : "is-complete"}"><div>${gameLink(`/vehicles/${vehicle.id}/zuweisung`, vehicle.caption)}<span>${esc(vehicle.typeCaption)} · ${vehicle.assigned}/${vehicle.target} Personen</span></div><div><b>${esc(status)}</b><button type="button" class="lssfo-btn is-small" data-action="manage-vehicle" data-id="${vehicle.id}">Besatzung ändern</button></div></article>`;
    }).join("");
    sections.push(`<section class="lssfo-section"><div class="lssfo-heading"><div><h3>Fahrzeuge dieser Wache</h3><p>${plural(vehicles.length, "Fahrzeug", "Fahrzeuge")} stationiert · ${missing ? `${missing} mit Fehlbedarf` : "alle vollständig"}</p></div></div>
      ${list ? `<div class="lssfo-station-vehicles">${list}</div>` : '<div class="lssfo-empty is-small">Keine Fahrzeuge an dieser Wache gefunden.</div>'}</section>`);
  }

  if (isVehicle) {
    const capacity = Core.targetCrew(manager.entity, state.data.vehicleTypes[String(manager.entity.vehicle_type)], "max");
    const assigned = manager.personnel.filter((person) => person.assigned).length;
    sections.push(`<section class="lssfo-section">
      <div class="lssfo-heading"><div><h3>Mannschaft zuweisen</h3><p>${assigned} von ${capacity} Personen zugewiesen · Zugewiesene stehen zuerst</p></div>
        <label class="lssfo-search lssfo-person-search">${icon("search")}<input type="search" data-input="manager-search" value="${esc(manager.personQuery)}" placeholder="Name oder Ausbildung suchen …" aria-label="Personal durchsuchen"></label></div>
      ${manager.loading ? `<div class="lssfo-empty is-small">${spinner()} Personal wird geladen …</div>` : personnelTableHtml(analyzed?.training.map((item) => item.key) || [], capacity)}
    </section>`);
  }

  manager.dialog.render(`${kit.dialogHead({ kicker: isVehicle ? "Fahrzeugverwaltung" : "Wachenverwaltung", title: manager.name, glyph: kit.glyph(isVehicle ? "#007aff" : "#ff9500", isVehicle ? "vehicle" : "building") })}
    <div class="lssfo-dialog-body">
      ${manager.error ? note("error", esc(manager.error)) : ""}
      ${manager.notice ? note("success", esc(manager.notice)) : ""}
      ${sections.join("")}
    </div>`);
  const newBody = manager.dialog.element.querySelector(".lssfo-dialog-body");
  if (newBody && scrollTop) newBody.scrollTop = scrollTop;
}

async function submitDirectRename(target, name) {
  if (target.kind !== "building") throw new Error("Das Bearbeitungsformular des Fahrzeugs wurde nicht erkannt.");
  const csrf = kit.csrfToken();
  if (!csrf) throw new Error("Sicherheitsschlüssel der Spielseite wurde nicht gefunden.");
  await kit.post(`/buildings/${target.id}`, { csrf, body: new URLSearchParams({ utf8: "✓", _method: "put", authenticity_token: csrf, "building[name]": name }) });
}

async function saveManager() {
  const current = manager;
  if (!current || current.saving) return;
  const element = current.dialog.element;
  const value = (field) => element.querySelector(`[data-manager="${field}"]`)?.value;
  const name = String(value("name") || "").trim();
  if (!name) {
    current.error = "Der Name darf nicht leer sein.";
    renderManager();
    return;
  }
  const max = current.maxInput ? value("max") ?? current.maxPersonnel : "";
  const dispatch = current.dispatchInput ? value("dispatch") ?? current.dispatchCenterId : "";
  Object.assign(current, { name, maxPersonnel: max, dispatchCenterId: dispatch, error: "", notice: "", saving: true });
  renderManager();
  try {
    if (current.form) {
      current.nameInput.value = name;
      if (current.maxInput) current.maxInput.value = max;
      if (current.dispatchInput) current.dispatchInput.value = dispatch;
      await kit.submitForm(current.form);
    } else {
      await submitDirectRename(current, name);
    }
    current.entity.caption = name;
    if (current.kind === "building" && current.dispatchInput) current.entity.leitstelle_building_id = dispatch ? Number(dispatch) : null;
    if (current.kind === "vehicle" && current.maxInput) current.entity.max_personnel_override = Number(max) > 0 ? Number(max) : null;
    analyze();
    render();
    saveData();
    current.notice = "Änderungen wurden gespeichert.";
  } catch (error) {
    current.error = `Speichern fehlgeschlagen: ${error.message}`;
  } finally {
    current.saving = false;
    if (manager === current) renderManager();
  }
}

// Das Spiel schaltet den Status über einen GET-Link um – deshalb ohne automatische Wiederholung.
async function toggleBuildingStatus(id) {
  const building = rawBuilding(id);
  if (!building || state.statusSaving !== null) return;
  const forManager = manager?.kind === "building" && manager.id === id;
  const wasEnabled = building.enabled !== false;
  state.statusSaving = id;
  state.error = "";
  if (forManager) Object.assign(manager, { error: "", notice: "" });
  refreshStatusViews();
  try {
    await kit.request(`/buildings/${id}/active`, { headers: { "X-Requested-With": "XMLHttpRequest" }, priority: true, retries: 0 });
    building.enabled = !wasEnabled;
    analyze();
    saveData();
    if (forManager) manager.notice = `Die Wache wurde ${building.enabled ? "aktiviert" : "deaktiviert"}.`;
  } catch (error) {
    const message = `Statusänderung fehlgeschlagen: ${error.message}`;
    if (forManager) manager.error = message;
    else state.error = message;
  } finally {
    state.statusSaving = null;
    refreshStatusViews();
  }
}

function refreshStatusViews() {
  if (state.open) render();
  if (manager) renderManager();
}

async function togglePersonnel(personId) {
  const current = manager;
  const person = current?.personnel.find((entry) => entry.id === personId);
  if (!current || !person?.actionHref || current.savingPerson !== null) return;
  Object.assign(current, { savingPerson: personId, error: "", notice: "" });
  renderManager();
  try {
    await kit.post(person.actionHref, { csrf: current.csrf });
    // Von einem anderen Fahrzeug abgezogen: dessen Zahlen gleich mit anpassen.
    const previous = person.boundTo?.id ? state.scans.vehicles[String(person.boundTo.id)] : null;
    if (previous && !person.assigned) {
      previous.assignedRows = Math.max(0, (previous.assignedRows || 0) - 1);
      for (const key of person.keys) previous.counts[key] = Math.max(0, (previous.counts[key] || 0) - 1);
    }
    if (person.boundTo?.id && !person.assigned) {
      const source = rawVehicle(person.boundTo.id);
      if (source) source.assigned_personnel_count = Math.max(0, Number(source.assigned_personnel_count || 0) - 1);
    }
    parsePersonnelPage(await kit.getHtml(`/vehicles/${current.id}/zuweisung`, { priority: true }), current);
    const assigned = current.personnel.filter((entry) => entry.assigned);
    current.entity.assigned_personnel_count = assigned.length;
    const counts = {};
    for (const entry of assigned) for (const key of entry.keys) counts[key] = (counts[key] || 0) + 1;
    state.scans.vehicles[String(current.id)] = { counts, assignedRows: assigned.length, scannedAt: Date.now() };
    analyze();
    if (state.open) render();
    saveData();
    current.notice = person.assigned ? `${person.name} wurde vom Fahrzeug entfernt.` : `${person.name} wurde dem Fahrzeug zugewiesen.`;
  } catch (error) {
    current.error = `Personaländerung fehlgeschlagen: ${error.message}`;
  } finally {
    current.savingPerson = null;
    if (manager === current) renderManager();
  }
}

/* ---------- Spielseiten im Panel ---------- */

const hasGameLightbox = () => typeof kit.pageWindow.lightboxOpen === "function";
let lightboxWatch = 0;

// Die Lightbox des Spiels zeigt Wachen-, Personal- und Fahrzeugseiten zuverlässig an
// (genau so öffnet sie das Spiel selbst). Sie liegt dann über dem Panel.
function openGameLightbox(url) {
  if (!hasGameLightbox()) return false;
  try {
    document.documentElement.classList.add("lssfo-lightbox-front");
    kit.pageWindow.lightboxOpen(url);
  } catch {
    document.documentElement.classList.remove("lssfo-lightbox-front");
    return false;
  }
  clearInterval(lightboxWatch);
  lightboxWatch = setInterval(() => {
    const box = document.getElementById("lightbox_box");
    if (box && box.style.display !== "none" && !box.hidden) return;
    clearInterval(lightboxWatch);
    document.documentElement.classList.remove("lssfo-lightbox-front");
    afterGameView(url);
  }, 500);
  return true;
}

// Ohne Lightbox: Spielseite in einem eingebetteten Fenster mit Zurück und Neu laden.
function openGameView(url, title) {
  if (openGameLightbox(url)) return;
  const kind = /\/personals/.test(url) ? "Personal" : /^\/vehicles\//.test(url) ? "Fahrzeug" : "Wache";
  const dialog = kit.openDialog({ label: title || "Spielseite", size: "full", className: "lssfo-game-view", onClose: () => afterGameView(url) });
  const tools = `<button type="button" class="lssfo-icon-btn" data-action="frame-back" aria-label="Zurück" title="Zurück">${icon("back")}</button><button type="button" class="lssfo-icon-btn" data-action="frame-reload" aria-label="Neu laden" title="Neu laden">${icon("refresh")}</button>`;
  dialog.render(`${kit.dialogHead({ kicker: `${kind} · im Spiel`, title: title || "Spielseite", tools })}<div class="lssfo-frame-wrap"><iframe src="${esc(url)}" title="${esc(title || "Spielseite")}"></iframe></div>`);
  watchFrame(dialog.element.querySelector("iframe"), "Diese Seite lässt sich nicht im Panel anzeigen. Mit Strg-Klick auf den Link öffnet sie sich in einem neuen Tab.");
}

function watchFrame(frame, message) {
  frame?.addEventListener("load", () => setTimeout(() => {
    try {
      if ((frame.contentDocument?.body?.innerText?.trim() || "").length >= 20) return;
    } catch { /* Fremdinhalt: Hinweis zeigen. */ }
    const wrap = frame.parentElement;
    if (wrap && !wrap.querySelector(".lssfo-frame-warning")) wrap.insertAdjacentHTML("afterbegin", `<div class="lssfo-frame-warning">${note("warn", esc(message))}</div>`);
  }, 700), { once: true });
}

// Nach dem Schließen einer Wachenseite: deren Personalliste neu lesen (eine Anfrage).
function afterGameView(url) {
  const id = Number(String(url || "").match(/^\/buildings\/(\d+)/)?.[1]);
  if (id && state.model) void refreshBuildingAssignments(id);
}

async function refreshBuildingAssignments(id) {
  try {
    const scan = parseBuildingAssignments(await kit.getHtml(`/buildings/${id}/personals`, { priority: true }));
    state.scans.stations[String(id)] = scan.station;
    for (const vehicle of state.model.vehicles.filter((entry) => entry.buildingId === id)) {
      if (!state.scans.vehicles[String(vehicle.id)] && !scan.vehicles.has(vehicle.id)) continue;
      state.scans.vehicles[String(vehicle.id)] = scan.vehicles.get(vehicle.id) || { counts: {}, assignedRows: 0, scannedAt: Date.now() };
    }
    analyze();
    if (state.open) renderContent();
  } catch { /* Übernommen wird beim nächsten Aktualisieren. */ }
}

/* ---------- Lehrgänge starten ---------- */

function openCourseAssistant() {
  const schools = state.model.buildings.filter((building) => building.isSchool).sort((a, b) => collator.compare(a.caption, b.caption));
  // Eine einzige Schule: direkt im Spiel öffnen.
  if (schools.length === 1 && openGameLightbox(`/buildings/${schools[0].id}`)) return;
  const assistant = { schools, schoolId: schools[0]?.id || null };
  assistant.dialog = kit.openDialog({ label: "Lehrgang starten", size: schools.length && !hasGameLightbox() ? "full" : "md", className: "lssfo-course" });
  courseAssistant = assistant;
  renderCourseAssistant();
}

let courseAssistant = null;

function renderCourseAssistant() {
  const assistant = courseAssistant;
  if (!assistant?.dialog.isOpen) return;
  const url = assistant.schoolId ? `/buildings/${assistant.schoolId}#schooling` : "";
  const options = assistant.schools.length ? assistant.schools.map((school) => ({ value: String(school.id), label: school.caption })) : [{ value: "", label: "Keine eigene Schule erkannt" }];
  const embedded = url && !hasGameLightbox();
  assistant.dialog.render(`${kit.dialogHead({ kicker: "Lehrgänge", title: "Lehrgang starten", glyph: kit.glyph("#ff2d55", "calendar") })}
    <div class="lssfo-course-controls">
      <label class="lssfo-field"><span>Ausbildungsstätte</span>${kit.selectHtml('data-change="course-school"', options, String(assistant.schoolId || ""))}</label>
      ${url ? `<a class="lssfo-btn" href="${url}" target="_blank" rel="noopener">In neuem Tab öffnen ${icon("external")}</a>` : ""}
      <p>Lehrgang im Schulungsbereich anlegen und Personal aus verschiedenen Wachen auswählen. Gebucht wird erst über die Schaltflächen des Spiels.</p>
    </div>
    ${!url ? '<div class="lssfo-dialog-body"><div class="lssfo-empty">Es wurde keine Ausbildungsstätte erkannt. Prüfe, ob deine Daten über „Aktualisieren“ geladen wurden.</div></div>'
      : embedded ? `<div class="lssfo-frame-wrap"><iframe src="${url}" title="Schulungsbereich"></iframe></div>`
        : `<div class="lssfo-dialog-body"><div class="lssfo-actions is-start"><button type="button" class="lssfo-btn is-primary" data-action="course-open-school">Lehrgangsbereich öffnen</button><span class="lssfo-muted">Öffnet die Ausbildungsstätte im Spiel – dort Lehrgang wählen und Personal aus allen Wachen auswählen.</span></div></div>`}`);
  const frame = assistant.dialog.element.querySelector("iframe");
  frame?.addEventListener("load", () => {
    try { frame.contentDocument?.querySelector('a[href="#schooling"]')?.click(); } catch { /* Die Seite bleibt bedienbar. */ }
  });
  watchFrame(frame, "Der Schulungsbereich lässt sich im Panel nicht anzeigen. Öffne die Ausbildungsstätte oben in einem neuen Tab.");
}

kit.on({
  click: {
    "manage-vehicle": (element) => void openManager("vehicle", Number(element.dataset.id)),
    "manage-building": (element) => void openManager("building", Number(element.dataset.id)),
    "manager-save": () => void saveManager(),
    "building-status": (element) => void toggleBuildingStatus(Number(element.dataset.id)),
    "person-toggle": (element) => void togglePersonnel(Number(element.dataset.id)),
    "frame-back": (element) => {
      try { element.closest(".lssfo-dialog")?.querySelector("iframe")?.contentWindow?.history.back(); } catch { /* Verlauf nicht verfügbar. */ }
    },
    "frame-reload": (element) => {
      try { element.closest(".lssfo-dialog")?.querySelector("iframe")?.contentWindow?.location.reload(); } catch { /* Neu laden nicht möglich. */ }
    },
    "course-open": openCourseAssistant,
    "course-open-school": () => {
      const id = courseAssistant?.schoolId;
      if (!id) return;
      courseAssistant.dialog.close();
      openGameLightbox(`/buildings/${id}`);
    },
  },
  change: {
    "course-school": (element) => {
      if (!courseAssistant) return;
      courseAssistant.schoolId = Number(element.value) || null;
      renderCourseAssistant();
    },
  },
  input: {
    "manager-search": (element) => {
      if (!manager) return;
      manager.personQuery = element.value.trim().toLocaleLowerCase("de");
      for (const row of manager.dialog.element.querySelectorAll("[data-person-search]")) row.hidden = Boolean(manager.personQuery) && !row.dataset.personSearch.includes(manager.personQuery);
    },
  },
});
