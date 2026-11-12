/*
 * Fahrzeuge bearbeiten (Name, maximale Besatzung, Umbau) und Umrüsten.
 * Änderungen sammeln sich lokal und gehen erst mit „Alle speichern“ an das Spiel –
 * im Hintergrund über das originale Bearbeitungsformular, ohne Neuladen.
 */

const replaceDraft = { find: "", replacement: "" };

function editableVehicles() {
  return state.model.vehicles.filter((vehicle) => (state.editBuilding === "all" || String(vehicle.buildingId) === state.editBuilding)
    && (matches(vehicle.search) || matches(String(state.edits[vehicle.id]?.caption || "").toLocaleLowerCase("de"))));
}

function originalValue(id, field) {
  const raw = rawVehicle(id) || {};
  if (field === "caption") return String(raw.caption ?? "");
  if (field === "max") return String(Number(raw.max_personnel_override) > 0 ? Number(raw.max_personnel_override) : 0);
  return String(raw.vehicle_type ?? "");
}

const currentValue = (vehicle, field) => state.edits[vehicle.id]?.[field] ?? (field === "caption" ? vehicle.caption : originalValue(vehicle.id, field));

function editStatusHtml(id) {
  const status = state.editStatus[id];
  if (status === "saving") return badge("speichert …");
  if (status === "saved") return badge("gespeichert", "ok");
  if (status) return badge("Fehler", "danger", status);
  return state.edits[id] ? badge("geändert", "warn") : "";
}

const editStatusLabel = (id) => ({ saving: "speichert", saved: "gespeichert" })[state.editStatus[id]] || (state.editStatus[id] ? `Fehler: ${state.editStatus[id]}` : state.edits[id] ? "geändert" : "");

function upgradeCell(vehicle) {
  const options = state.editOptions[vehicle.id];
  if (!options) return `<button type="button" class="lssfo-btn is-small" data-action="edit-options" data-id="${vehicle.id}">prüfen</button>`;
  if (options === "loading") return `<span class="lssfo-muted">${spinner()} lädt …</span>`;
  if (options.error) return `<span class="lssfo-muted" title="${esc(options.error)}">nicht abrufbar</span>`;
  if (state.refitStarted[vehicle.id]) return badge("Umrüstung läuft", "warn");
  if (options.refitUrl) return `<button type="button" class="lssfo-btn is-small" data-action="refit-open" data-id="${vehicle.id}">Umrüsten …</button>`;
  if (!options.types.length) return '<span class="lssfo-muted">kein Umbau</span>';
  const changed = "type" in (state.edits[vehicle.id] || {});
  return kit.selectHtml(`class="lssfo-inline-input${changed ? " is-changed" : ""}" data-change="edit-field" data-id="${vehicle.id}" data-field="type" aria-label="Umbau"`, options.types, currentValue(vehicle, "type"));
}

function editorTable() {
  return {
    key: "edit",
    rows: editableVehicles(),
    columns: [
      { label: "Wache", value: (row) => row.buildingCaption, html: (row) => gameLink(`/buildings/${row.buildingId}`, row.buildingCaption) },
      {
        label: "Name",
        value: (row) => currentValue(row, "caption"),
        html: (row) => `<input class="lssfo-inline-input${"caption" in (state.edits[row.id] || {}) ? " is-changed" : ""}" type="text" maxlength="40" data-input="edit-field" data-id="${row.id}" data-field="caption" value="${esc(currentValue(row, "caption"))}" aria-label="Name von ${esc(row.caption)}">`,
      },
      { label: "Typ", value: (row) => row.typeCaption },
      {
        label: "Max. Besatzung",
        value: (row) => Number(currentValue(row, "max")) || row.staffMax,
        html: (row) => {
          const value = currentValue(row, "max");
          const options = [{ value: "0", label: `Standard (${row.staffMax})` }];
          for (let count = 1; count <= Math.max(row.staffMax, Number(value) || 0); count += 1) options.push({ value: String(count), label: String(count) });
          return kit.selectHtml(`class="lssfo-inline-input${"max" in (state.edits[row.id] || {}) ? " is-changed" : ""}" data-change="edit-field" data-id="${row.id}" data-field="max" aria-label="Maximale Besatzung"`, options, value);
        },
      },
      { label: "Umbau", value: () => null, sortable: false, csv: false, html: upgradeCell },
      { label: "Status", value: (row) => editStatusLabel(row.id), html: (row) => `<span data-edit-status="${row.id}">${editStatusHtml(row.id)}</span>` },
    ],
  };
}

function renderEditor(content) {
  const { key, columns, rows } = editorTable();
  const buildings = [...new Map(state.model.vehicles.map((vehicle) => [String(vehicle.buildingId), vehicle.buildingCaption]))]
    .map(([value, label]) => ({ value, label }))
    .sort((a, b) => collator.compare(a.label, b.label));
  content.innerHTML = `<div class="lssfo-editor lssfo-panel-card">
      <label class="lssfo-field"><span>Wache</span>${kit.selectHtml('data-change="edit-building"', [{ value: "all", label: "Alle Wachen" }, ...buildings], state.editBuilding)}</label>
      ${state.editBuilding !== "all" ? `<button type="button" class="lssfo-btn" data-action="edit-options-all">Umbau prüfen (${formatNumber(rows.length)})</button>` : ""}
      <div class="lssfo-editor-group">
        <label class="lssfo-field"><span>Im Namen suchen</span><input type="text" data-input="edit-find" value="${esc(replaceDraft.find)}" placeholder="z. B. Florian"></label>
        <label class="lssfo-field"><span>ersetzen durch</span><input type="text" data-input="edit-replacement" value="${esc(replaceDraft.replacement)}" placeholder="z. B. Florian NÖ"></label>
        <button type="button" class="lssfo-btn" data-action="edit-replace">Bei ${plural(rows.length, "Fahrzeug", "Fahrzeugen")} anwenden</button>
      </div>
      <div class="lssfo-editor-save"><span data-edit-count></span><button type="button" class="lssfo-btn" data-action="edit-discard">Verwerfen</button><button type="button" class="lssfo-btn is-primary" data-action="edit-save">${state.editSaving ? `${spinner()} Speichert …` : "Alle speichern"}</button></div>
    </div>
    ${callout("", "Änderungen gehen erst mit „Alle speichern“ an das Spiel – im Hintergrund, ohne die Seite neu zu laden. „prüfen“ zeigt, ob sich ein Fahrzeug umbauen oder umrüsten lässt; Umrüstungen werden einzeln bestätigt und nur mit Credits bezahlt.")}
    ${renderTable(key, columns, rows)}`;
  updateEditBar();
}

function updateEditBar() {
  const count = Object.keys(state.edits).length;
  const counter = shell?.querySelector("[data-edit-count]");
  if (counter) counter.textContent = count ? `${plural(count, "Fahrzeug", "Fahrzeuge")} geändert` : "Keine offenen Änderungen";
  for (const button of shell?.querySelectorAll('[data-action="edit-save"], [data-action="edit-discard"]') || []) button.disabled = !count || state.editSaving;
  const tabCount = shell?.querySelector('[data-tab-count="edit"]');
  if (tabCount) tabCount.textContent = formatNumber(count);
}

function setEdit(id, field, value) {
  const edits = state.edits[id] || {};
  if (String(value) === originalValue(id, field) || (field === "caption" && !String(value).trim())) delete edits[field];
  else edits[field] = String(value);
  if (Object.keys(edits).length) state.edits[id] = edits;
  else delete state.edits[id];
  delete state.editStatus[id];
  shell?.querySelector(`[data-id="${id}"][data-field="${field}"]`)?.classList.toggle("is-changed", field in edits);
  const status = shell?.querySelector(`[data-edit-status="${id}"]`);
  if (status) status.innerHTML = editStatusHtml(id);
  updateEditBar();
}

function setEditStatus(id, value) {
  state.editStatus[id] = value;
  const cell = shell?.querySelector(`[data-edit-status="${id}"]`);
  if (cell) cell.innerHTML = editStatusHtml(id);
}

// Findet im Bearbeitungsformular das Auswahlfeld für Fahrzeugtyp bzw. Umbau.
function findUpgradeSelect(form) {
  return form.querySelector('select[name="vehicle[vehicle_type]"], select[name*="vehicle_type"], select[name*="upgrade"]')
    || [...form.querySelectorAll("select")].find((select) => {
      const label = select.id ? form.querySelector(`label[for="${CSS.escape(select.id)}"]`) : select.closest("label, .form-group")?.querySelector("label");
      return /fahrzeugtyp|umbau|upgrade|umrüst/i.test(`${label?.textContent || ""} ${select.name}`);
    })
    || null;
}

async function fetchVehicleForm(id, options = {}) {
  const doc = kit.parseHtml(await kit.getHtml(`/vehicles/${id}/edit`, options));
  const nameInput = doc.querySelector('#vehicle_caption, input[name="vehicle[caption]"]');
  const form = nameInput?.closest("form");
  if (!form) throw new Error("Bearbeitungsformular nicht gefunden");
  return { form, nameInput, maxInput: form.querySelector('#vehicle_personal_max, [name="vehicle[personal_max]"], [name="vehicle[max_personnel_override]"]'), typeSelect: findUpgradeSelect(form) };
}

// Sucht auf der Fahrzeugseite den Link „Umrüsten“. Ohne Link ist keine Umrüstung möglich.
async function findRefitUrl(id, options = {}) {
  const doc = kit.parseHtml(await kit.getHtml(`/vehicles/${id}`, options));
  const pattern = new RegExp(`/vehicles/${id}/(?:umruest|refit|upgrade|conversion)`, "i");
  const link = [...doc.querySelectorAll("a[href]")].find((anchor) => /umrüst/i.test(`${anchor.textContent} ${anchor.title}`) || pattern.test(anchor.getAttribute("href") || ""));
  if (!link) return null;
  const url = new URL(link.getAttribute("href"), location.origin);
  return url.pathname + url.search;
}

async function loadVehicleOptions(id, { rerender = true, priority = true } = {}) {
  state.editOptions[id] = "loading";
  if (rerender) renderContent();
  try {
    const [{ typeSelect }, refitUrl] = await Promise.all([fetchVehicleForm(id, { priority }), findRefitUrl(id, { priority }).catch(() => null)]);
    const types = typeSelect ? [...typeSelect.options].filter((option) => option.value !== "").map((option) => ({ value: option.value, label: option.textContent.trim() })) : [];
    state.editOptions[id] = { types: types.length > 1 ? types : [], refitUrl };
  } catch (error) {
    state.editOptions[id] = { types: [], error: error.message };
  }
  if (rerender && state.tab === "edit") renderContent();
}

// Umbau-Möglichkeiten aller Fahrzeuge der gewählten Wache – die Warteschlange hält die Last gering.
async function loadBuildingOptions() {
  const ids = editableVehicles().map((vehicle) => vehicle.id).filter((id) => !state.editOptions[id]);
  for (const id of ids) state.editOptions[id] = "loading";
  renderContent();
  await Promise.all(ids.map((id) => loadVehicleOptions(id, { rerender: false, priority: false })));
  if (state.tab === "edit") renderContent();
}

function applyNameReplace() {
  const { find, replacement } = replaceDraft;
  if (!find) return;
  let changed = 0;
  for (const vehicle of editableVehicles()) {
    const current = currentValue(vehicle, "caption");
    if (!current.includes(find)) continue;
    setEdit(vehicle.id, "caption", current.split(find).join(replacement).slice(0, 40));
    changed += 1;
  }
  renderContent();
  if (!changed) kit.toast(`„${find}“ kommt in keinem Namen vor.`);
}

async function saveEdits() {
  const ids = Object.keys(state.edits).map(Number);
  if (state.editSaving || !ids.length) return;
  state.editSaving = true;
  renderContent();
  await Promise.all(ids.map(async (id) => {
    const edits = { ...state.edits[id] };
    setEditStatus(id, "saving");
    try {
      const { form, nameInput, maxInput, typeSelect } = await fetchVehicleForm(id, { priority: true });
      if ("caption" in edits) nameInput.value = edits.caption.trim();
      if ("max" in edits) {
        if (!maxInput) throw new Error("Besatzung ist für dieses Fahrzeug nicht einstellbar");
        if (maxInput.tagName === "SELECT" && ![...maxInput.options].some((option) => option.value === edits.max)) maxInput.add(new Option(edits.max, edits.max));
        maxInput.value = edits.max;
      }
      if ("type" in edits) {
        if (!typeSelect) throw new Error("Umbau ist für dieses Fahrzeug nicht möglich");
        typeSelect.value = edits.type;
      }
      const response = await kit.submitForm(form);
      // Validierungsfehler zeigt das Spiel im erneut ausgelieferten Formular.
      const answer = kit.parseHtml(await response.text().catch(() => ""));
      const problem = answer.querySelector("#vehicle_caption") && answer.querySelector("#error_explanation, .field_with_errors, .has-error");
      if (problem) throw new Error(kit.textOf(problem).slice(0, 160) || "vom Spiel abgelehnt");
      const raw = rawVehicle(id);
      if (raw) {
        if ("caption" in edits) raw.caption = edits.caption.trim();
        if ("max" in edits) raw.max_personnel_override = Number(edits.max) > 0 ? Number(edits.max) : null;
        if ("type" in edits) raw.vehicle_type = Number(edits.type);
      }
      delete state.edits[id];
      setEditStatus(id, "saved");
    } catch (error) {
      setEditStatus(id, error.message || "Speichern fehlgeschlagen");
    }
  }));
  state.editSaving = false;
  analyze();
  render();
  saveData();
}

/* ---------- Umrüsten ---------- */

let refit = null;

// Liest das Umrüst-Formular allgemein: Vorlage, Zahlenfelder mit Grenzen und den Credits-Knopf.
function parseRefitForm(html) {
  const doc = kit.parseHtml(html);
  const creditButton = [...doc.querySelectorAll('button, input[type="submit"]')].find((button) => /credits/i.test(button.textContent || button.value || ""));
  const form = creditButton?.closest("form") || creditButton?.form || [...doc.querySelectorAll("form")].find((entry) => /umrüst/i.test(entry.textContent)) || null;
  if (!form) throw new Error("Umrüst-Formular nicht gefunden");
  const preset = form.querySelector("select");
  const firstNumber = (...values) => values.map((value) => (value === null || value === undefined || value === "" ? NaN : Number(value))).find(Number.isFinite);
  const fields = [...form.querySelectorAll("input")]
    .filter((input) => !["hidden", "submit", "button", "checkbox", "radio", "range"].includes((input.type || "text").toLowerCase()))
    .map((input, index) => {
      const block = input.closest(".form-group") || input.closest(".row")?.parentElement || input.parentElement;
      const range = block?.querySelector('input[type="range"], [data-slider-min], [data-min]');
      return {
        key: input.name || input.id || `field-${index}`,
        label: kit.textOf(block?.querySelector("label, strong, b, h4, h5")) || input.name || `Wert ${index + 1}`,
        hint: kit.textOf(block?.querySelector("p, .help-block, small")),
        value: input.value,
        min: firstNumber(input.min, range?.min, range?.dataset?.sliderMin, range?.dataset?.min),
        max: firstNumber(input.max, range?.max, range?.dataset?.sliderMax, range?.dataset?.max),
      };
    });
  return {
    form,
    info: kit.textOf(doc.querySelector(".alert-info, .alert")),
    preset: preset ? { label: kit.textOf(preset.closest(".input-group, .form-group")?.querySelector(".input-group-addon, label")) || "Umrüstung", options: [...preset.options].map((option) => ({ value: option.value, label: kit.textOf(option), data: { ...option.dataset } })) } : null,
    presetValue: preset?.value,
    fields,
    creditLabel: kit.textOf(creditButton) || creditButton?.value || "Mit Credits umrüsten",
    creditName: creditButton?.name || "",
    creditValue: creditButton?.value || "",
    creditAction: creditButton?.getAttribute("formaction") || "",
  };
}

async function openRefit(id) {
  const url = state.editOptions[id]?.refitUrl;
  if (!url) return;
  refit?.dialog.close();
  const vehicle = state.model.vehicleById.get(id);
  const current = { id, caption: vehicle?.caption || `Fahrzeug ${id}`, loading: true, values: {}, confirming: false };
  current.dialog = kit.openDialog({ label: "Fahrzeug umrüsten", size: "md", onClose: () => { if (refit === current) refit = null; } });
  refit = current;
  renderRefit();
  try {
    const parsed = parseRefitForm(await kit.getHtml(url, { priority: true }));
    Object.assign(current, parsed, { loading: false, values: Object.fromEntries(parsed.fields.map((field) => [field.key, field.value])) });
    if (parsed.preset) current.values.__preset = parsed.presetValue;
  } catch (error) {
    Object.assign(current, { loading: false, error: error.message });
  }
  if (refit === current) renderRefit();
}

function renderRefit() {
  if (!refit) return;
  let body;
  if (refit.loading) body = `<div class="lssfo-empty is-small">${spinner()} Umrüst-Möglichkeiten werden geladen …</div>`;
  else if (refit.error) body = note("error", `Die Umrüstung konnte nicht geladen werden: ${esc(refit.error)}`);
  else if (refit.done) body = `<div class="lssfo-center"><div class="lssfo-success">${icon("check")}</div><p class="lssfo-dialog-text"><b>${esc(refit.caption)}</b> wird umgerüstet und steht währenddessen nicht zur Verfügung.</p></div>`;
  else {
    const preset = refit.preset ? `<label class="lssfo-field lssfo-refit-preset"><span>${esc(refit.preset.label)}</span>${kit.selectHtml('data-change="refit-preset"', refit.preset.options, refit.values.__preset)}</label>` : "";
    const fields = refit.fields.map((field) => `<label class="lssfo-refit-field"><strong>${esc(field.label)}</strong>${field.hint ? `<small>${esc(field.hint)}</small>` : ""}<span><input class="lssfo-input" type="number" data-input="refit-field" data-key="${esc(field.key)}" value="${esc(refit.values[field.key] ?? "")}"${Number.isFinite(field.min) ? ` min="${field.min}"` : ""}${Number.isFinite(field.max) ? ` max="${field.max}"` : ""}>${Number.isFinite(field.min) && Number.isFinite(field.max) ? `<em>${formatNumber(field.min)} – ${formatNumber(field.max)}</em>` : ""}</span></label>`).join("");
    body = `${refit.info ? callout("", esc(refit.info)) : ""}${preset}<div class="lssfo-refit-grid">${fields || '<div class="lssfo-empty is-small">Für dieses Fahrzeug gibt es keine einstellbaren Werte.</div>'}</div>`;
  }
  refit.dialog.render(`${kit.dialogHead({ kicker: "Fahrzeug umrüsten", title: refit.caption, glyph: kit.glyph("#5856d6", "vehicle") })}
    <div class="lssfo-dialog-body">${body}</div>
    <footer class="lssfo-dialog-foot" data-refit-foot></footer>`);
  updateRefitFooter();
}

function updateRefitFooter() {
  const footer = refit?.dialog.element.querySelector("[data-refit-foot]");
  if (!footer) return;
  if (refit.loading || refit.error || refit.done) {
    footer.innerHTML = '<button type="button" class="lssfo-btn" data-action="dialog-dismiss">Schließen</button>';
    return;
  }
  const invalid = refit.fields.find((field) => {
    const value = Number(refit.values[field.key]);
    return !Number.isFinite(value) || (Number.isFinite(field.min) && value < field.min) || (Number.isFinite(field.max) && value > field.max);
  });
  const message = refit.submitting ? "Wird an das Spiel übertragen …"
    : invalid ? `„${esc(invalid.label)}“ liegt außerhalb des erlaubten Bereichs.`
      : refit.confirming ? `<strong>Wirklich umrüsten?</strong> Bezahlt wird mit Credits (${esc(refit.creditLabel.replace(/^.*\(|\).*$/g, ""))} laut Spiel für die Ausgangswerte – bei geänderten Werten berechnet das Spiel den Preis neu). Das Fahrzeug steht während der Umrüstung nicht zur Verfügung.`
        : "Coins werden nie verwendet. Umgerüstet wird erst nach Bestätigung.";
  footer.innerHTML = `<span class="lssfo-refit-note">${message}</span>
    <button type="button" class="lssfo-btn" data-action="dialog-dismiss">Abbrechen</button>
    ${refit.confirming
      ? `<button type="button" class="lssfo-btn is-primary" data-action="refit-submit"${invalid || refit.submitting ? " disabled" : ""}>Ja, mit Credits umrüsten</button>`
      : `<button type="button" class="lssfo-btn is-primary" data-action="refit-confirm"${invalid ? " disabled" : ""}>${esc(refit.creditLabel)}</button>`}`;
}

// Vorlage gewählt: Werte übernehmen, wenn das Spiel sie an der Option mitliefert (data-Attribute).
function applyRefitPreset(value) {
  if (!refit?.preset) return;
  refit.values.__preset = value;
  refit.confirming = false;
  const option = refit.preset.options.find((entry) => entry.value === value);
  for (const field of refit.fields) {
    const short = field.key.replace(/^.*\[|\]$/g, "").toLowerCase().replace(/_/g, "");
    const candidate = Object.entries(option?.data || {}).find(([key]) => key.toLowerCase().includes(short));
    if (candidate) refit.values[field.key] = String(candidate[1]);
    else if (/^max/i.test(value) && Number.isFinite(field.max)) refit.values[field.key] = String(field.max);
  }
  renderRefit();
}

async function submitRefit() {
  const current = refit;
  if (!current?.form || current.submitting) return;
  current.submitting = true;
  updateRefitFooter();
  try {
    const { form } = current;
    if (current.preset && current.values.__preset !== undefined) form.querySelector("select").value = current.values.__preset;
    for (const field of current.fields) {
      const input = form.querySelector(`[name="${CSS.escape(field.key)}"], #${CSS.escape(field.key)}`);
      if (input) input.value = current.values[field.key];
      // Zugehörigen Schieberegler mitziehen, falls das Spiel dessen Wert liest.
      const slider = input?.closest(".form-group, div")?.querySelector('input[type="range"]');
      if (slider) slider.value = current.values[field.key];
    }
    if (current.creditAction) form.setAttribute("action", current.creditAction);
    const response = await kit.submitForm(form, current.creditName ? [[current.creditName, current.creditValue]] : []);
    const problem = kit.parseHtml(await response.text().catch(() => "")).querySelector(".alert-danger");
    if (problem && /credit|nicht genug|fehler|ungültig/i.test(problem.textContent)) throw new Error(kit.textOf(problem).slice(0, 200));
    state.refitStarted[current.id] = true;
    current.done = true;
    if (state.tab === "edit") renderContent();
  } catch (error) {
    current.confirming = false;
    current.info = `Umrüstung fehlgeschlagen: ${error.message}`;
  } finally {
    current.submitting = false;
    if (refit === current) renderRefit();
  }
}

kit.on({
  click: {
    "edit-save": () => void saveEdits(),
    "edit-discard": () => {
      state.edits = {};
      state.editStatus = {};
      renderContent();
    },
    "edit-replace": applyNameReplace,
    "edit-options": (element) => void loadVehicleOptions(Number(element.dataset.id)),
    "edit-options-all": () => void loadBuildingOptions(),
    "refit-open": (element) => void openRefit(Number(element.dataset.id)),
    "refit-confirm": () => {
      if (!refit) return;
      refit.confirming = true;
      updateRefitFooter();
    },
    "refit-submit": () => void submitRefit(),
  },
  change: {
    "edit-field": (element) => setEdit(Number(element.dataset.id), element.dataset.field, element.value),
    "edit-building": (element) => {
      state.editBuilding = element.value;
      renderContent();
    },
    "refit-preset": (element) => applyRefitPreset(element.value),
  },
  input: {
    "edit-field": (element) => setEdit(Number(element.dataset.id), element.dataset.field, element.value),
    "edit-find": (element) => { replaceDraft.find = element.value; },
    "edit-replacement": (element) => { replaceDraft.replacement = element.value; },
    "refit-field": (element) => {
      if (!refit) return;
      refit.values[element.dataset.key] = element.value;
      refit.confirming = false;
      updateRefitFooter();
    },
  },
});
