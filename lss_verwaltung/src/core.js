/*
 * Rechenkern der LSS Verwaltung: reine Funktionen ohne DOM und ohne Netzwerk.
 * Im Script als lokale Konstante eingebunden, mit Node direkt testbar (tests/core.test.js).
 */
const LSSFleetCore = (() => {
  const number = (value, fallback = 0) => {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : fallback;
  };
  const sum = (items, valueOf) => items.reduce((total, item) => total + number(valueOf(item)), 0);

  /* ---------- Fahrzeuge und Wachen ---------- */

  function vehicleStaff(type) {
    const staff = type?.staff || {};
    return { min: number(staff.min ?? type?.minPersonnel), max: number(staff.max ?? type?.maxPersonnel) };
  }

  // Soll-Besatzung: Minimum des Typs oder Maximum – eine im Spiel gesetzte Höchstbesatzung hat Vorrang.
  function targetCrew(vehicle, type, mode = "max") {
    const staff = vehicleStaff(type);
    if (mode === "min") return staff.min;
    const override = number(vehicle?.max_personnel_override, 0);
    return override > 0 ? override : staff.max;
  }

  const assignedCrew = (vehicle) => number(vehicle?.assigned_personnel_count);

  function flattenTraining(type, allowedSchools = null) {
    const result = [];
    for (const [school, entries] of Object.entries(type?.staff?.training || {})) {
      if (Array.isArray(allowedSchools) && allowedSchools.length && !allowedSchools.includes(school)) continue;
      for (const [key, rule] of Object.entries(entries || {})) result.push({ school, key, rule: rule || {} });
    }
    return result;
  }

  const requiredTrainingCount = (rule, target) => (rule?.all ? target : Math.max(0, number(rule?.min)));

  function analyzeVehicle(vehicle, type, building, mode = "max", educationScan = null) {
    const staff = vehicleStaff(type);
    const target = targetCrew(vehicle, type, mode);
    const assigned = assignedCrew(vehicle);
    // Nach einer Prüfung zählt eine fehlende Ausbildung als 0 vorhanden – nicht als „ungeprüft“.
    const training = flattenTraining(type, building?.schoolingTypes).map((requirement) => {
      const required = requiredTrainingCount(requirement.rule, target);
      const actual = educationScan ? number(educationScan.counts?.[requirement.key]) : null;
      return { ...requirement, required, actual, missing: actual === null ? null : Math.max(0, required - actual) };
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
      missingTraining: training.reduce((total, item) => total + (item.missing || 0), 0),
      educationScanned: Boolean(educationScan),
    };
  }

  function groupBy(items, keyOf) {
    const groups = new Map();
    for (const item of items) {
      const key = keyOf(item);
      const group = groups.get(key);
      if (group) group.push(item);
      else groups.set(key, [item]);
    }
    return groups;
  }

  function summarizeBuildings(buildings, analyzedVehicles) {
    const vehiclesByBuilding = groupBy(analyzedVehicles, (vehicle) => vehicle.buildingId);
    return buildings.map((building) => {
      const vehicles = vehiclesByBuilding.get(number(building.id)) || [];
      const personnel = number(building.personal_count);
      const assigned = sum(vehicles, (vehicle) => vehicle.assigned);
      return {
        id: number(building.id),
        caption: building.caption || `Wache ${building.id}`,
        typeId: number(building.building_type, -1),
        personnel,
        personnelTarget: number(building.personal_count_target),
        assigned,
        free: Math.max(0, personnel - assigned),
        vehicles: vehicles.length,
        targetCrew: sum(vehicles, (vehicle) => vehicle.target),
        missingCrew: sum(vehicles, (vehicle) => vehicle.missingCrew),
        missingTraining: sum(vehicles, (vehicle) => vehicle.missingTraining),
        enabled: building.enabled !== false,
      };
    });
  }

  function summarizeTraining(analyzedVehicles) {
    const map = new Map();
    for (const vehicle of analyzedVehicles) {
      for (const item of vehicle.training) {
        const key = `${item.school}:${item.key}`;
        let aggregate = map.get(key);
        if (!aggregate) {
          aggregate = { key: item.key, school: item.school, required: 0, actual: 0, missing: 0, scannedVehicles: 0, vehicles: 0 };
          map.set(key, aggregate);
        }
        aggregate.required += item.required;
        aggregate.vehicles += 1;
        if (item.actual !== null) {
          aggregate.actual += item.actual;
          aggregate.missing += item.missing;
          aggregate.scannedVehicles += 1;
        }
      }
    }
    return [...map.values()].sort((a, b) => a.school.localeCompare(b.school) || a.key.localeCompare(b.key));
  }

  /* ---------- Gebäudearten ---------- */

  function normalizedDispatchId(value) {
    const id = Number(value);
    return value !== null && value !== undefined && value !== "" && Number.isFinite(id) && id > 0 ? id : null;
  }

  // Leitstellen zählen mit, führen aber weder Personal noch Fahrzeuge.
  function isDispatchCenter(building, type, referencedIds) {
    return referencedIds.has(number(building.id))
      || number(building.building_type, -1) === 7
      || type?.isDispatchCenter === true
      || type?.is_dispatch_center === true
      || /leitstell|dispatch/i.test(type?.caption || "");
  }

  function isOperational(building) {
    if (building.isDispatchCenter) return false;
    if (building.vehicles.length || number(building.personal_count) > 0 || number(building.personal_count_target) > 0) return true;
    return !/schule|akademie|leitstell|dispatch|krankenhaus|hospital|bereitstellungsraum|verband/i.test(building.typeCaption || "");
  }

  const isSchool = (type, caption) => Boolean(type?.school || type?.isSchool || type?.is_school) || /schule|akademie/i.test(`${type?.caption || ""} ${caption || ""}`);

  /* ---------- Bereitschaft ---------- */

  function readinessScore({ targetCrew = 0, missingCrew = 0, missingTraining = 0, buildings = 0, inactive = 0 }) {
    if (!buildings || inactive >= buildings) return 0;
    const crewPenalty = targetCrew ? Math.min(55, (missingCrew / targetCrew) * 100) : 0;
    const trainingPenalty = targetCrew ? Math.min(25, (missingTraining / targetCrew) * 80) : 0;
    const inactivePenalty = Math.min(20, (inactive / buildings) * 35);
    return Math.max(0, Math.round(100 - crewPenalty - trainingPenalty - inactivePenalty));
  }

  const readinessTone = (score) => (score >= 90 ? "ok" : score >= 70 ? "warn" : score > 0 ? "danger" : "neutral");

  /* ---------- Ausbauten ---------- */

  // Vorhandene Ausbauten (aktiv, inaktiv, im Bau) und laut Katalog noch mögliche.
  function extensionRows(building, type, now = Date.now()) {
    const raw = type?.extensions || type?.extension || [];
    const catalog = Array.isArray(raw)
      ? raw
      : Object.entries(raw).map(([id, entry]) => (typeof entry === "string" ? { id, caption: entry } : { id, ...entry }));
    const idOf = (entry, index) => entry.type_id ?? entry.id ?? index;
    const captions = new Map(catalog.map((entry, index) => [String(idOf(entry, index)), entry.caption || entry.name]));
    const owned = Array.isArray(building.extensions) ? building.extensions : [];
    const base = { buildingId: building.id, buildingCaption: building.caption, buildingType: building.typeCaption, dispatchCenterCaption: building.dispatchCenterCaption, district: building.district };
    const rows = owned.map((extension, index) => {
      const id = idOf(extension, index);
      const availableAt = extension.available_at ? new Date(extension.available_at) : null;
      const running = Boolean(availableAt) && availableAt.valueOf() > now;
      return {
        ...base,
        id,
        caption: extension.caption || extension.name || captions.get(String(id)) || `Ausbau ${id}`,
        status: running ? "building" : extension.enabled === false || extension.active === false ? "inactive" : "active",
        availableAt: running ? availableAt : null,
      };
    });
    const ownedIds = new Set(owned.map((extension, index) => String(idOf(extension, index))));
    catalog.forEach((entry, index) => {
      const id = idOf(entry, index);
      if (!ownedIds.has(String(id))) rows.push({ ...base, id, caption: entry.caption || entry.name || `Ausbau ${id}`, status: "missing", availableAt: null });
    });
    return rows;
  }

  /* ---------- Personalplanung ---------- */

  function personnelRow(building, scan) {
    const summary = building.summary || {};
    const targetCrewValue = number(summary.targetCrew);
    const personnel = number(summary.personnel);
    const assigned = number(summary.assigned);
    const required = {};
    for (const vehicle of building.vehicles) {
      for (const training of vehicle.training) required[training.key] = (required[training.key] || 0) + training.required;
    }
    const qualificationBalance = Object.keys({ ...required, ...(scan?.counts || {}) }).map((key) => {
      const requiredCount = number(required[key]);
      const available = number(scan?.counts?.[key]);
      return { key, required: requiredCount, available, difference: available - requiredCount, names: scan?.names?.[key] || [] };
    });
    return {
      ...building,
      personnel,
      targetCrew: targetCrewValue,
      assigned,
      unassigned: Math.max(0, personnel - assigned),
      reserve: Math.max(0, personnel - targetCrewValue),
      shortage: Math.max(0, targetCrewValue - personnel),
      assignmentGap: number(summary.missingCrew),
      trainingGap: scan ? sum(qualificationBalance, (entry) => Math.max(0, -entry.difference)) : number(summary.missingTraining),
      personnelScan: scan || null,
      qualificationBalance,
    };
  }

  // Vorschläge: freies Personal zuweisen, Reserve zuerst innerhalb derselben Leitstelle
  // verschieben, nach der Detailprüfung auch Ausbildungsüberschüsse. Jede Reserve wird
  // nur einmal verplant.
  function suggestTransfers(rows, trainingName = (key) => key) {
    const sameDispatch = (a, b) => a.dispatchCenterId === b.dispatchCenterId;
    const suggestions = rows
      .filter((row) => row.assignmentGap > 0 && row.unassigned > 0)
      .map((row) => ({ kind: "assign", to: row, amount: Math.min(row.assignmentGap, row.unassigned), sameDispatch: true }));
    const reserve = new Map(rows.filter((row) => row.reserve > 0).map((row) => [row.id, row.reserve]));
    const donors = rows.filter((row) => row.reserve > 0);
    for (const target of rows.filter((row) => row.shortage > 0).sort((a, b) => b.shortage - a.shortage)) {
      let remaining = target.shortage;
      const ordered = donors.slice().sort((a, b) => Number(sameDispatch(b, target)) - Number(sameDispatch(a, target)) || reserve.get(b.id) - reserve.get(a.id));
      for (const donor of ordered) {
        const available = reserve.get(donor.id);
        if (!remaining) break;
        if (available <= 0 || donor.id === target.id) continue;
        const amount = Math.min(remaining, available);
        reserve.set(donor.id, available - amount);
        remaining -= amount;
        suggestions.push({ kind: "transfer", from: donor, to: target, amount, sameDispatch: sameDispatch(donor, target) });
      }
    }
    const surplus = new Map();
    for (const row of rows) for (const entry of row.qualificationBalance) if (entry.difference > 0) surplus.set(`${row.id}:${entry.key}`, entry.difference);
    for (const target of rows) {
      for (const deficit of target.qualificationBalance.filter((entry) => entry.difference < 0)) {
        let needed = -deficit.difference;
        const donorsForKey = rows
          .filter((row) => row.id !== target.id && surplus.get(`${row.id}:${deficit.key}`) > 0)
          .sort((a, b) => Number(sameDispatch(b, target)) - Number(sameDispatch(a, target)) || surplus.get(`${b.id}:${deficit.key}`) - surplus.get(`${a.id}:${deficit.key}`));
        for (const donor of donorsForKey) {
          if (!needed) break;
          const key = `${donor.id}:${deficit.key}`;
          const amount = Math.min(needed, surplus.get(key));
          surplus.set(key, surplus.get(key) - amount);
          needed -= amount;
          suggestions.push({ kind: "qualification", from: donor, to: target, amount, qualification: trainingName(deficit.key), sameDispatch: sameDispatch(donor, target) });
        }
      }
    }
    return suggestions;
  }

  /* ---------- Auslastung ---------- */

  // Niedrig/hoch relativ zum 30-Tage-Durchschnitt desselben Fahrzeugtyps; bei Einzelstücken
  // dient der Durchschnitt aller Fahrzeuge als Bezug.
  function rateUtilization(rows) {
    const overall = sum(rows, (row) => row.distance30d) / Math.max(1, rows.length);
    const byType = new Map();
    for (const row of rows) {
      const entry = byType.get(row.typeId) || { total: 0, count: 0 };
      entry.total += row.distance30d;
      entry.count += 1;
      byType.set(row.typeId, entry);
    }
    for (const row of rows) {
      const entry = byType.get(row.typeId);
      const average = entry.count > 1 ? entry.total / entry.count : overall;
      row.typeAverage30d = average;
      row.utilization = average <= 0 ? "unknown" : row.distance30d > average * 1.5 ? "high" : row.distance30d < average * 0.35 ? "low" : "normal";
    }
    return rows;
  }

  function topGroup(rows, keyOf) {
    const totals = new Map();
    for (const row of rows) totals.set(keyOf(row), (totals.get(keyOf(row)) || 0) + row.distance30d);
    let best = { caption: "–", distance: 0 };
    for (const [caption, distance] of totals) if (distance > best.distance) best = { caption, distance };
    return best;
  }

  /* ---------- Ausbildungen und Lehrgänge ---------- */

  function trainingCatalog(schoolingTypes) {
    const names = new Map();
    const durations = new Map();
    for (const school of Object.values(schoolingTypes || {})) {
      const entries = Array.isArray(school) ? school : Object.entries(school || {}).map(([key, value]) => (typeof value === "string" ? { key, caption: value } : { key, ...value }));
      for (const entry of entries) {
        if (entry?.key && entry.caption && !names.has(entry.key)) names.set(entry.key, entry.caption);
        const days = Number(String(entry?.duration || "").match(/(\d+)\s*Tag/i)?.[1]);
        if (entry?.caption && days) durations.set(String(entry.caption).trim().toLowerCase(), days);
      }
    }
    return { names, durations };
  }

  const humanizeKey = (key) => String(key).replaceAll("_", " ").replace(/\b\w/g, (letter) => letter.toUpperCase());

  // /api/schoolings liefert je Lehrgang Titel, Schule (building_id), Ende, Status und freie
  // Plätze. Der Beginn ergibt sich aus der Lehrgangsdauer im Katalog.
  function courseRows(schoolings, buildingCaptions, durations) {
    return schoolings.map((course) => {
      const title = course.education_title || course.caption || course.name || `Lehrgang ${course.id ?? ""}`;
      const finishRaw = course.finish_time || course.finish_at || "";
      const finish = finishRaw ? new Date(finishRaw) : null;
      const validFinish = finish && !Number.isNaN(finish.valueOf()) ? finish : null;
      const days = durations.get(String(title).trim().toLowerCase());
      return {
        id: course.id,
        title,
        school: buildingCaptions.get(number(course.building_id)) || course.building_caption || "",
        running: course.running !== false,
        start: validFinish && days ? new Date(validFinish.valueOf() - days * 86400000) : null,
        finish: validFinish,
        openSpaces: Number.isFinite(Number(course.open_spaces)) && course.open_spaces !== null ? Number(course.open_spaces) : null,
      };
    });
  }

  function relativeTime(date, now = Date.now()) {
    if (!(date instanceof Date) || Number.isNaN(date.valueOf())) return "–";
    const minutes = Math.max(0, Math.ceil((date.valueOf() - now) / 60000));
    const days = Math.floor(minutes / 1440);
    const hours = Math.floor((minutes % 1440) / 60);
    return days ? `noch ${days} T. ${hours} Std.` : `noch ${hours} Std. ${minutes % 60} Min.`;
  }

  /* ---------- Tabellen und Export ---------- */

  // Zahlen numerisch, Datumswerte zeitlich, Texte natürlich; leere Werte immer zuletzt.
  function compareValues(left, right, collator) {
    const empty = (value) => value === null || value === undefined || value === "" || (typeof value === "number" && Number.isNaN(value));
    if (empty(left) || empty(right)) return empty(left) - empty(right);
    if (left instanceof Date || right instanceof Date) return Number(left) - Number(right);
    if (typeof left === "number" && typeof right === "number") return left - right;
    return collator ? collator.compare(String(left), String(right)) : String(left).localeCompare(String(right));
  }

  function toCsv(header, rows) {
    const cell = (value) => {
      const text = value instanceof Date ? value.toLocaleString("de-DE") : typeof value === "number" ? String(value).replace(".", ",") : String(value ?? "");
      return `"${text.replaceAll('"', '""')}"`;
    };
    return [header, ...rows].map((row) => row.map(cell).join(";")).join("\r\n");
  }

  return {
    number, groupBy,
    vehicleStaff, targetCrew, assignedCrew, flattenTraining, requiredTrainingCount, analyzeVehicle, summarizeBuildings, summarizeTraining,
    normalizedDispatchId, isDispatchCenter, isOperational, isSchool,
    readinessScore, readinessTone, extensionRows, personnelRow, suggestTransfers, rateUtilization, topGroup,
    trainingCatalog, humanizeKey, courseRows, relativeTime, compareValues, toCsv,
  };
})();

if (typeof module === "object" && module.exports) module.exports = LSSFleetCore;
