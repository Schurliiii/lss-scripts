/*
 * Prüfungen von Ausbildungen und Personal. Beide lesen dieselbe Quelle – die
 * Personalliste je Wache – und teilen sich die Ergebnisse: eine Anfrage pro Wache,
 * über die gemeinsame Warteschlange, abbrechbar. Wachen, die vor Kurzem geprüft
 * wurden, werden nicht erneut abgefragt.
 */

let scansValidSince = 0;

const SCAN_LABELS = { training: "Ausbildungen werden geprüft", personnel: "Personal wird geprüft" };

function scanTargets(kind) {
  const model = state.model;
  if (kind === "training") return [...new Set(model.vehicles.filter((vehicle) => vehicle.training.length).map((vehicle) => vehicle.buildingId))];
  return model.stations.filter((building) => building.vehicles.length || Number(building.personal_count || 0) > 0).map((building) => building.id);
}

const isFresh = (scan) => scan && scan.scannedAt > scansValidSince && Date.now() - scan.scannedAt < SCAN_FRESH;

async function runScan(kind) {
  if (state.scan) {
    if (state.scan.kind === kind) state.scan.controller.abort();
    return;
  }
  if (!state.model) return;
  const targets = scanTargets(kind);
  if (!targets.length) {
    state.error = kind === "training" ? "Es wurden keine Fahrzeuge mit Ausbildungsanforderung gefunden." : "Es wurden keine Wachen mit Personal gefunden.";
    render();
    return;
  }
  const controller = new AbortController();
  const scan = { kind, controller, done: 0, total: targets.length, label: "Start", skipped: 0 };
  state.scan = scan;
  state.error = "";
  render();
  const fallback = [];
  let failure = null;
  let sinceAnalyze = 0;
  const progress = (label) => {
    scan.label = label;
    renderStatus();
  };

  await Promise.allSettled(targets.map(async (id) => {
    const building = state.model.buildingById.get(id);
    if (isFresh(state.scans.stations[String(id)])) {
      scan.done += 1;
      scan.skipped += 1;
      return;
    }
    try {
      const result = parseBuildingAssignments(await kit.getHtml(`/buildings/${id}/personals`, { signal: controller.signal }));
      state.scans.stations[String(id)] = result.station;
      for (const vehicle of building?.vehicles || []) {
        const assigned = result.vehicles.get(vehicle.id);
        // Keine Fahrzeugspalte erkannt oder laut API doch jemand zugewiesen → Zuweisungsseite als Rückfall.
        if (!assigned && (!result.hasVehicleColumn || vehicle.assigned > 0)) {
          if (kind === "training" && vehicle.training.length) fallback.push(vehicle);
        } else {
          state.scans.vehicles[String(vehicle.id)] = assigned || { counts: {}, assignedRows: 0, scannedAt: Date.now() };
        }
      }
      scan.done += 1;
      sinceAnalyze += 1;
      if (sinceAnalyze >= 15) {
        sinceAnalyze = 0;
        analyze();
      }
      progress(building?.caption || `Wache ${id}`);
    } catch (error) {
      if (kit.isAbort(error)) return;
      failure ||= `${error.message}${building ? ` bei ${building.caption}` : ""}`;
      controller.abort();
    }
  }));

  try {
    for (let index = 0; index < fallback.length && !controller.signal.aborted; index += 1) {
      const vehicle = fallback[index];
      scan.label = `Einzelprüfung ${index + 1} / ${fallback.length} · ${vehicle.caption}`;
      renderStatus();
      state.scans.vehicles[String(vehicle.id)] = parseAssignedEducations(await kit.getHtml(`/vehicles/${vehicle.id}/zuweisung`, { signal: controller.signal }), vehicle.id);
    }
  } catch (error) {
    if (!kit.isAbort(error)) failure ||= error.message;
  }

  if (failure) state.error = `Prüfung abgebrochen: ${failure}`;
  else if (!controller.signal.aborted) {
    if (kind === "training") state.tab = "training";
    if (scan.skipped) kit.toast(`${plural(scan.skipped, "Wache war", "Wachen waren")} vor Kurzem geprüft und wurde${scan.skipped === 1 ? "" : "n"} übersprungen.`);
  }
  state.scan = null;
  analyze();
  render();
}

function scanStatusText() {
  const scan = state.scan;
  return scan ? `${SCAN_LABELS[scan.kind]}: ${formatNumber(scan.done)} / ${formatNumber(scan.total)} Wachen · ${scan.label}` : "";
}

/* ---------- Auswertung der Spielseiten ---------- */

// Personalliste einer Wache: Bestand, Verfügbarkeit, Ausbildungen und Namen je Ausbildung.
function parseStationPersonnel(doc) {
  const rows = [...doc.querySelectorAll("#personal_table tbody tr, tbody tr[data-filterable-by]")];
  const counts = {};
  const names = {};
  let available = 0;
  let inTraining = 0;
  let withoutEducation = 0;
  for (const row of new Set(rows)) {
    const keys = educationKeys(row);
    const cells = row.querySelectorAll("td");
    const name = kit.textOf(cells[1]) || kit.textOf(cells[0]) || "Unbekannt";
    const status = [...cells].map(kit.textOf).join(" ");
    if (/unterricht|lehrgang/i.test(status)) inTraining += 1;
    else if (/verfügbar|available/i.test(status)) available += 1;
    if (!keys.length) withoutEducation += 1;
    for (const key of keys) {
      counts[key] = (counts[key] || 0) + 1;
      (names[key] ||= []).push(name);
    }
  }
  return { counts, names, total: new Set(rows).size, available, inTraining, withoutEducation, scannedAt: Date.now() };
}

// Dieselbe Seite liefert je gebundenem Fahrzeug die zugewiesenen Ausbildungen.
function parseBuildingAssignments(html) {
  const doc = kit.parseHtml(html);
  const vehicles = new Map();
  let hasVehicleColumn = false;
  for (const row of new Set(doc.querySelectorAll("#personal_table tbody tr, tbody tr[data-filterable-by]"))) {
    const link = [...row.querySelectorAll('a[href*="/vehicles/"]')]
      .map((anchor) => (anchor.getAttribute("href") || "").match(/\/vehicles\/(\d+)\/?$/))
      .find(Boolean);
    if (!link) continue;
    hasVehicleColumn = true;
    const id = Number(link[1]);
    let entry = vehicles.get(id);
    if (!entry) {
      entry = { counts: {}, assignedRows: 0, scannedAt: Date.now() };
      vehicles.set(id, entry);
    }
    entry.assignedRows += 1;
    for (const key of educationKeys(row)) entry.counts[key] = (entry.counts[key] || 0) + 1;
  }
  // Eine Spalte „Gebunden an“ gibt es auch, wenn gerade niemand gebunden ist (Überschrift).
  if (!hasVehicleColumn) hasVehicleColumn = [...doc.querySelectorAll("#personal_table thead th, thead th")].some((cell) => /gebunden|fahrzeug/i.test(cell.textContent || ""));
  return { station: parseStationPersonnel(doc), vehicles, hasVehicleColumn };
}

// Rückfall: Zuweisungsseite eines einzelnen Fahrzeugs.
function parseAssignedEducations(html, vehicleId) {
  const rows = [...kit.parseHtml(html).querySelectorAll("tbody tr")].filter((row) => {
    if (row.querySelector("a.btn-assigned")) return true;
    const href = row.querySelector('td:nth-child(3) a[href*="/vehicles/"]')?.getAttribute("href") || "";
    return new RegExp(`/vehicles/${vehicleId}/?$`).test(href);
  });
  const counts = {};
  for (const row of rows) for (const key of educationKeys(row)) counts[key] = (counts[key] || 0) + 1;
  return { counts, assignedRows: rows.length, scannedAt: Date.now() };
}

kit.on({
  click: {
    scan: () => void runScan("training"),
    "scan-personnel": () => void runScan("personnel"),
  },
});
