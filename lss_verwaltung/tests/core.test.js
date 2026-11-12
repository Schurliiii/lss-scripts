"use strict";

// Rechenkern der LSS Verwaltung: node tests/core.test.js
const assert = require("node:assert/strict");
const Core = require("../src/core.js");

/* ---------- Fahrzeuge und Wachen ---------- */

const type = {
  caption: "Testfahrzeug",
  staff: { min: 2, max: 6, training: { Feuerwehr: { special_training: { min: 2 }, all_training: { all: true } } } },
};
const vehicle = { id: 10, caption: "Florian Test 1", building_id: 20, vehicle_type: 99, assigned_personnel_count: 3, max_personnel_override: null };
const station = { id: 20, caption: "Testwache", schoolingTypes: ["Feuerwehr"] };

const analyzed = Core.analyzeVehicle(vehicle, type, station, "max", { counts: { special_training: 1, all_training: 3 } });
assert.equal(analyzed.target, 6);
assert.equal(analyzed.missingCrew, 3);
assert.equal(analyzed.missingTraining, 4);
assert.equal(Core.targetCrew({ max_personnel_override: 4 }, type, "max"), 4);
assert.equal(Core.targetCrew({ max_personnel_override: 0 }, type, "max"), 6);
assert.equal(Core.targetCrew(vehicle, type, "min"), 2);

// Nach einer Prüfung zählt eine fehlende Ausbildung als 0 vorhanden, nicht als „ungeprüft“.
const scannedWithout = Core.analyzeVehicle(vehicle, type, station, "max", { counts: {} });
assert.deepEqual(scannedWithout.training.map((item) => [item.actual, item.missing]), [[0, 2], [0, 6]]);
assert.equal(scannedWithout.missingTraining, 8);
const unscanned = Core.analyzeVehicle(vehicle, type, station, "max", null);
assert.deepEqual(unscanned.training.map((item) => item.actual), [null, null]);
assert.equal(unscanned.missingTraining, 0);
// Ausbildungen anderer Schulen zählen an dieser Wache nicht.
assert.equal(Core.analyzeVehicle(vehicle, type, { schoolingTypes: ["Rettungsdienst"] }).training.length, 0);

const buildings = Core.summarizeBuildings([{ id: 20, caption: "Testwache", building_type: 0, personal_count: 8, personal_count_target: 10 }], [analyzed]);
assert.deepEqual(
  { vehicles: buildings[0].vehicles, assigned: buildings[0].assigned, free: buildings[0].free, missing: buildings[0].missingCrew },
  { vehicles: 1, assigned: 3, free: 5, missing: 3 },
);

const training = Core.summarizeTraining([analyzed]);
assert.equal(training.find((item) => item.key === "special_training").missing, 1);
assert.equal(training.find((item) => item.key === "all_training").required, 6);

/* ---------- Gebäudearten und Bereitschaft ---------- */

assert.equal(Core.normalizedDispatchId("30"), 30);
assert.equal(Core.normalizedDispatchId(""), null);
assert.equal(Core.normalizedDispatchId(0), null);
assert.ok(Core.isDispatchCenter({ id: 7, building_type: 7 }, {}, new Set()));
assert.ok(Core.isDispatchCenter({ id: 5, building_type: 0 }, {}, new Set([5])));
assert.ok(!Core.isOperational({ isDispatchCenter: false, vehicles: [], personal_count: 0, typeCaption: "Feuerwehrschule" }));
assert.ok(Core.isOperational({ isDispatchCenter: false, vehicles: [], personal_count: 0, typeCaption: "Feuerwache" }));
assert.ok(Core.isSchool({ caption: "Rettungsschule" }, ""));

assert.equal(Core.readinessScore({ targetCrew: 10, missingCrew: 0, missingTraining: 0, buildings: 2, inactive: 0 }), 100);
assert.equal(Core.readinessScore({ targetCrew: 10, missingCrew: 5, missingTraining: 0, buildings: 2, inactive: 0 }), 50);
assert.equal(Core.readinessScore({ targetCrew: 10, buildings: 2, inactive: 2 }), 0);
assert.deepEqual([95, 75, 30, 0].map(Core.readinessTone), ["ok", "warn", "danger", "neutral"]);

/* ---------- Ausbauten ---------- */

const now = Date.parse("2026-11-10T12:00:00Z");
const extensionBuilding = {
  id: 20, caption: "Wache", typeCaption: "Feuerwache", dispatchCenterCaption: "Leitstelle", district: "Innere Stadt",
  extensions: [{ type_id: 0, enabled: false }, { type_id: 1, caption: "Wasserrettung", available_at: "2026-11-11T12:00:00Z" }],
};
const extensions = Core.extensionRows(extensionBuilding, { extensions: [{ id: 0, caption: "Rettungsdienst" }, { id: 1, caption: "Wasserrettung" }, { id: 2, caption: "Werkfeuerwehr" }] }, now);
assert.deepEqual(extensions.map((entry) => [entry.caption, entry.status]), [["Rettungsdienst", "inactive"], ["Wasserrettung", "building"], ["Werkfeuerwehr", "missing"]]);
assert.equal(Core.relativeTime(extensions[1].availableAt, now), "noch 1 T. 0 Std.");
assert.equal(Core.extensionRows({ extensions: [] }, { extensions: { 3: "Ausbau Drei" } }, now)[0].caption, "Ausbau Drei");

/* ---------- Personalplanung ---------- */

const row = (id, dispatchCenterId, values) => ({ id, caption: `Wache ${id}`, dispatchCenterId, reserve: 0, shortage: 0, assignmentGap: 0, unassigned: 0, qualificationBalance: [], ...values });
const rows = [
  row(1, 10, { reserve: 3 }),
  row(2, 20, { reserve: 5 }),
  row(3, 10, { shortage: 4 }),
  row(4, 10, { shortage: 2, assignmentGap: 2, unassigned: 1 }),
];
const suggestions = Core.suggestTransfers(rows);
assert.deepEqual(suggestions.filter((entry) => entry.kind === "assign").map((entry) => [entry.to.id, entry.amount]), [[4, 1]]);
const transfers = suggestions.filter((entry) => entry.kind === "transfer").map((entry) => [entry.from.id, entry.to.id, entry.amount, entry.sameDispatch]);
// Zuerst aus derselben Leitstelle; jede Reserve wird nur einmal verplant (3 + 5 = 8 ≥ 6 Bedarf).
assert.deepEqual(transfers, [[1, 3, 3, true], [2, 3, 1, false], [2, 4, 2, false]]);

const qualificationRows = [
  row(1, 10, { qualificationBalance: [{ key: "rd", difference: 1 }] }),
  row(2, 10, { qualificationBalance: [{ key: "rd", difference: -1 }] }),
  row(3, 10, { qualificationBalance: [{ key: "rd", difference: -1 }] }),
];
const qualifications = Core.suggestTransfers(qualificationRows, (key) => key.toUpperCase()).filter((entry) => entry.kind === "qualification");
assert.equal(qualifications.length, 1, "Ein Ausbildungsüberschuss wird nur einmal vorgeschlagen");
assert.equal(qualifications[0].qualification, "RD");

const personnel = Core.personnelRow({ id: 1, vehicles: [{ training: [{ key: "rd", required: 2 }] }], summary: { targetCrew: 6, personnel: 8, assigned: 5, missingCrew: 1, missingTraining: 2 } }, { counts: { rd: 1, gw: 2 }, names: { rd: ["Anna"] } });
assert.deepEqual({ reserve: personnel.reserve, unassigned: personnel.unassigned, trainingGap: personnel.trainingGap }, { reserve: 2, unassigned: 3, trainingGap: 1 });
assert.deepEqual(personnel.qualificationBalance.find((entry) => entry.key === "rd"), { key: "rd", required: 2, available: 1, difference: -1, names: ["Anna"] });

/* ---------- Auslastung ---------- */

const utilization = Core.rateUtilization([
  { typeId: 1, distance30d: 100 }, { typeId: 1, distance30d: 10 }, { typeId: 1, distance30d: 400 }, { typeId: 2, distance30d: 0 },
]);
assert.deepEqual(utilization.map((entry) => entry.utilization), ["normal", "low", "high", "low"]);
assert.deepEqual(Core.topGroup([{ distance30d: 5, group: "A" }, { distance30d: 7, group: "B" }, { distance30d: 4, group: "A" }], (entry) => entry.group), { caption: "A", distance: 9 });

/* ---------- Ausbildungen, Lehrgänge, Tabellen ---------- */

const catalog = Core.trainingCatalog({ Feuerwehr: [{ key: "gw_gefahrgut", caption: "GW-Gefahrgut Lehrgang", duration: "3 Tage" }] });
assert.equal(catalog.names.get("gw_gefahrgut"), "GW-Gefahrgut Lehrgang");
assert.equal(Core.humanizeKey("rettungs_dienst"), "Rettungs Dienst");
const [course] = Core.courseRows([{ id: 1, education_title: "GW-Gefahrgut Lehrgang", building_id: 22, finish_time: "2026-11-13T12:00:00Z", open_spaces: 2 }], new Map([[22, "Schule"]]), catalog.durations);
assert.equal(course.school, "Schule");
assert.equal(course.start.toISOString(), "2026-11-10T12:00:00.000Z");
assert.equal(course.openSpaces, 2);

const collator = new Intl.Collator("de", { numeric: true, sensitivity: "base" });
const sorted = ["Wache 10", null, "Wache 2", "", "Äußere"].sort((a, b) => Core.compareValues(a, b, collator));
assert.deepEqual(sorted.slice(0, 3), ["Äußere", "Wache 2", "Wache 10"]);
assert.deepEqual([3, null, 1, 2].sort((a, b) => Core.compareValues(a, b, collator)), [1, 2, 3, null]);
assert.equal(Core.toCsv(["Name", "Wert"], [['Wache "Nord"', 1.5]]), '"Name";"Wert"\r\n"Wache ""Nord""";"1,5"');

console.log("core.test.js: alle Tests erfolgreich");
