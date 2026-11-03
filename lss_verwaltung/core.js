(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  root.LSSFleetCore = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  const number = (value, fallback = 0) => {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : fallback;
  };

  function vehicleStaff(type) {
    const staff = type?.staff || {};
    return {
      min: number(staff.min ?? type?.minPersonnel),
      max: number(staff.max ?? type?.maxPersonnel),
    };
  }

  function targetCrew(vehicle, type, mode = "max") {
    const staff = vehicleStaff(type);
    if (mode === "min") return staff.min;
    const override = vehicle?.max_personnel_override;
    const normalizedOverride = number(override, 0);
    return override === null || override === undefined || normalizedOverride <= 0 ? staff.max : normalizedOverride;
  }

  function assignedCrew(vehicle) {
    return number(vehicle?.assigned_personnel_count);
  }

  function flattenTraining(type, allowedSchools = null) {
    const result = [];
    const schools = type?.staff?.training || {};
    for (const [school, entries] of Object.entries(schools)) {
      if (Array.isArray(allowedSchools) && allowedSchools.length && !allowedSchools.includes(school)) continue;
      for (const [key, rule] of Object.entries(entries || {})) {
        result.push({ school, key, rule: rule || {} });
      }
    }
    return result;
  }

  function requiredTrainingCount(rule, target) {
    return rule?.all ? target : Math.max(0, number(rule?.min));
  }

  function analyzeVehicle(vehicle, type, building, mode = "max", educationScan = null) {
    const staff = vehicleStaff(type);
    const target = targetCrew(vehicle, type, mode);
    const assigned = assignedCrew(vehicle);
    const training = flattenTraining(type, building?.schoolingTypes).map((requirement) => {
      const required = requiredTrainingCount(requirement.rule, target);
      const actual = educationScan?.counts?.[requirement.key];
      return {
        ...requirement,
        required,
        actual: actual === undefined ? null : number(actual),
        missing: actual === undefined ? null : Math.max(0, required - number(actual)),
      };
    });
    return {
      id: number(vehicle?.id),
      caption: vehicle?.caption || `Fahrzeug ${vehicle?.id ?? "?"}`,
      typeId: number(vehicle?.vehicle_type, -1),
      typeCaption: type?.caption || `Typ ${vehicle?.vehicle_type ?? "?"}`,
      buildingId: number(vehicle?.building_id),
      buildingCaption: building?.caption || `Wache ${vehicle?.building_id ?? "?"}`,
      staffMin: staff.min,
      staffMax: staff.max,
      target,
      assigned,
      missingCrew: Math.max(0, target - assigned),
      extraCrew: Math.max(0, assigned - target),
      training,
      missingTraining: training.reduce((sum, item) => sum + (item.missing || 0), 0),
      educationScanned: Boolean(educationScan),
    };
  }

  function summarizeBuildings(buildings, analyzedVehicles) {
    const vehiclesByBuilding = new Map();
    for (const vehicle of analyzedVehicles) {
      if (!vehiclesByBuilding.has(vehicle.buildingId)) vehiclesByBuilding.set(vehicle.buildingId, []);
      vehiclesByBuilding.get(vehicle.buildingId).push(vehicle);
    }
    return buildings.map((building) => {
      const vehicles = vehiclesByBuilding.get(number(building.id)) || [];
      const personnel = number(building.personal_count);
      const assigned = vehicles.reduce((sum, vehicle) => sum + vehicle.assigned, 0);
      return {
        id: number(building.id),
        caption: building.caption || `Wache ${building.id}`,
        typeId: number(building.building_type, -1),
        personnel,
        personnelTarget: number(building.personal_count_target),
        assigned,
        free: Math.max(0, personnel - assigned),
        vehicles: vehicles.length,
        targetCrew: vehicles.reduce((sum, vehicle) => sum + vehicle.target, 0),
        missingCrew: vehicles.reduce((sum, vehicle) => sum + vehicle.missingCrew, 0),
        missingTraining: vehicles.reduce((sum, vehicle) => sum + vehicle.missingTraining, 0),
        enabled: building.enabled !== false,
      };
    });
  }

  function summarizeTraining(analyzedVehicles) {
    const map = new Map();
    for (const vehicle of analyzedVehicles) {
      for (const item of vehicle.training) {
        const aggregateKey = `${item.school}:${item.key}`;
        const aggregate = map.get(aggregateKey) || {
          key: item.key,
          school: item.school,
          required: 0,
          actual: 0,
          missing: 0,
          scannedVehicles: 0,
          vehicles: 0,
        };
        aggregate.required += item.required;
        aggregate.vehicles += 1;
        if (item.actual !== null) {
          aggregate.actual += item.actual;
          aggregate.missing += item.missing;
          aggregate.scannedVehicles += 1;
        }
        map.set(aggregateKey, aggregate);
      }
    }
    return [...map.values()].sort((a, b) => a.school.localeCompare(b.school) || a.key.localeCompare(b.key));
  }

  return {
    analyzeVehicle,
    assignedCrew,
    flattenTraining,
    requiredTrainingCount,
    summarizeBuildings,
    summarizeTraining,
    targetCrew,
    vehicleStaff,
  };
});
