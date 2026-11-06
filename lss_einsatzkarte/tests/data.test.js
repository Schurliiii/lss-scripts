"use strict";

// Plausibilitätsprüfung der Standortdaten: node tests/data.test.js
const fs = require("node:fs");
const path = require("node:path");
const assert = require("node:assert/strict");

const root = path.join(__dirname, "..");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const { OFFICIAL_STATIONS, REGION_META, STATION_DISTRICTS } = new Function(`${read("official-data.js")}\n${read("regions.js")}\nreturn { OFFICIAL_STATIONS, REGION_META, STATION_DISTRICTS };`)();
const corrections = JSON.parse(read("tools/corrections.json"));

const classes = new Set(["fire-professional", "fire-volunteer", "fire-other", "rescue-redcross", "rescue-johanniter", "rescue-samariter", "rescue-other", "hospital", "police", "police-special"]);
const ids = new Set();
const counts = {};
for (const station of OFFICIAL_STATIONS) {
  const tags = station.tags;
  assert.ok(!ids.has(station.id), `doppelte ID ${station.id}`);
  ids.add(station.id);
  assert.ok(classes.has(tags["bev:class"]), `unbekannte Klasse bei ${station.id}`);
  assert.ok(station.lat > 46.3 && station.lat < 49.1 && station.lon > 9.4 && station.lon < 17.2, `Koordinate außerhalb Österreichs: ${station.id}`);
  assert.ok(tags.name, `Name fehlt bei ${station.id}`);
  assert.ok(REGION_META[String(STATION_DISTRICTS[station.id])], `Bezirk fehlt bei ${station.id} ${tags.name}`);
  counts[tags["bev:class"]] = (counts[tags["bev:class"]] || 0) + 1;
}

// Keine Nicht-Einsatzstandorte.
for (const station of OFFICIAL_STATIONS) {
  const { name, operator } = station.tags;
  assert.ok(!/^Bereichsflorianstation|^Bergrettung|^Alpiner Rettungsdienst/i.test(name), `kein Einsatzstandort: ${name}`);
  assert.ok(!["Landesfeuerwehrverband", "Bezirksfeuerwehrkommando", "Österreichische Wasserrettung"].includes(operator), `kein Einsatzstandort: ${name} (${operator})`);
}

// Korrekturen sind angewendet.
for (const entry of corrections.remove) assert.ok(!ids.has(entry.id), `entfernter Standort noch vorhanden: ${entry.name}`);

// Keine Doppelerfassung: gleiche Art und gleiche Koordinate mit gleichem Namen.
const seen = new Map();
for (const station of OFFICIAL_STATIONS) {
  const key = `${station.tags.amenity}|${station.lat.toFixed(5)}|${station.lon.toFixed(5)}|${station.tags.name.toLowerCase()}`;
  assert.ok(!seen.has(key), `doppelt erfasst: ${station.tags.name}`);
  seen.set(key, station.id);
}

// Ein LSS-Gebäude deckt einen Standort ab: keine zwei Standorte gleicher Art im selben Gebäude (≤ 25 m).
const byLat = [...OFFICIAL_STATIONS].sort((a, b) => a.lat - b.lat);
for (let index = 0; index < byLat.length; index += 1) {
  for (let other = index + 1; other < byLat.length && byLat[other].lat - byLat[index].lat < 0.0003; other += 1) {
    const a = byLat[index];
    const b = byLat[other];
    if (a.tags.amenity !== b.tags.amenity || a.tags.amenity === "hospital") continue;
    const meters = Math.hypot((b.lat - a.lat) * 111320, (b.lon - a.lon) * 111320 * Math.cos(a.lat * Math.PI / 180));
    assert.ok(meters > 25, `zwei Standorte im selben Gebäude: ${a.tags.name} / ${b.tags.name}`);
  }
}

// Krankenhäuser: eindeutige Namen, plausible Anzahl, Pflichtstandorte vorhanden.
const hospitals = OFFICIAL_STATIONS.filter((station) => station.tags["bev:class"] === "hospital");
const hospitalNames = hospitals.map((station) => station.tags.name);
assert.equal(new Set(hospitalNames).size, hospitalNames.length, "Krankenhausnamen nicht eindeutig");
assert.ok(hospitals.length >= 110 && hospitals.length <= 140, `unplausible Krankenhausanzahl ${hospitals.length}`);
for (const required of ["Universitätsklinikum AKH Wien", "LKH-Universitätsklinikum Graz", "Landeskrankenhaus Universitätskliniken Innsbruck", "Unfallkrankenhaus Linz", "Klinik Penzing"]) {
  assert.ok(hospitalNames.includes(required), `Krankenhaus fehlt: ${required}`);
}
assert.ok(!hospitalNames.some((name) => /ästhetisch|Sanatorium Hera|Kursana/i.test(name)), "Privat- oder Schönheitsklinik in der Krankenhausliste");

// Polizei: nur Inspektionen, keine Kommanden; plausible Anzahl; eindeutige Namen.
const police = OFFICIAL_STATIONS.filter((station) => station.tags.amenity === "police");
assert.ok(police.length >= 750 && police.length <= 900, `unplausible Anzahl Polizeiinspektionen ${police.length}`);
assert.ok(!police.some((station) => /kommando|Landespolizeidirektion/i.test(station.tags.operator)), "Polizeikommando in den Daten");
assert.equal(new Set(police.map((station) => station.tags.name)).size, police.length, "Polizeinamen nicht eindeutig");

console.log(`data.test.js: ${OFFICIAL_STATIONS.length} Standorte geprüft`, counts);
