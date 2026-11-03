const assert = require("node:assert/strict");
const Core = require("../core.js");

const type = {
  caption: "Testfahrzeug",
  staff: {
    min: 2,
    max: 6,
    training: {
      Feuerwehr: {
        special_training: { min: 2 },
        all_training: { all: true },
      },
    },
  },
};

const vehicle = {
  id: 10,
  caption: "Florian Test 1",
  building_id: 20,
  vehicle_type: 99,
  assigned_personnel_count: 3,
  max_personnel_override: null,
};

const analyzed = Core.analyzeVehicle(vehicle, type, { id: 20, caption: "Testwache", schoolingTypes: ["Feuerwehr"] }, "max", {
  counts: { special_training: 1, all_training: 3 },
});

assert.equal(analyzed.target, 6);
assert.equal(analyzed.missingCrew, 3);
assert.equal(analyzed.missingTraining, 4);
assert.equal(Core.targetCrew({ max_personnel_override: 4 }, type, "max"), 4);
assert.equal(Core.targetCrew({ max_personnel_override: 0 }, type, "max"), 6);
assert.equal(Core.targetCrew(vehicle, type, "min"), 2);

const buildings = Core.summarizeBuildings([
  { id: 20, caption: "Testwache", building_type: 0, personal_count: 8, personal_count_target: 10 },
], [analyzed]);

assert.deepEqual(
  { vehicles: buildings[0].vehicles, assigned: buildings[0].assigned, free: buildings[0].free, missing: buildings[0].missingCrew },
  { vehicles: 1, assigned: 3, free: 5, missing: 3 },
);

const training = Core.summarizeTraining([analyzed]);
assert.equal(training.find((item) => item.key === "special_training").missing, 1);
assert.equal(training.find((item) => item.key === "all_training").required, 6);

console.log("core.test.js: alle Tests erfolgreich");
