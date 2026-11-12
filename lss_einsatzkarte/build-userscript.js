"use strict";

// Baut „LSS Wachenplaner Österreich“ (dist/lss-wachenplaner.user.js und .meta.js) aus
// userscript/planner.js, userscript/planner.css, dem gemeinsamen Kit und den Standortdaten
// dieser Webkarte (official-data.js, regions.js).

const fs = require("node:fs");
const path = require("node:path");
const build = require("../shared/build.js");

const VERSION = "2.0.0";
const here = (file) => path.join(__dirname, file);
const shared = (file) => path.join(build.ROOT, "shared", file);

// Kompaktes Datenformat je Standort:
// [id, lat, lon, Klasse, Bezirks-ID, Name, Betreiber, Straße, Hausnummer, PLZ, Ort]
const { OFFICIAL_STATIONS, REGION_META, STATION_DISTRICTS } = new Function(`${build.read(here("official-data.js"))}\n${build.read(here("regions.js"))}\nreturn { OFFICIAL_STATIONS, REGION_META, STATION_DISTRICTS };`)();
// Datenstand aus dem Kopf von official-data.js und den Quellangaben von Krankenhäusern und Polizei.
const stichtag = (build.read(here("official-data.js")).match(/Stichtag (\d{2}\.\d{2}\.\d{4})/) || [])[1] || "unbekannt";
const kaSource = OFFICIAL_STATIONS.find((station) => station.tags?.["bev:class"] === "hospital")?.tags["bev:source"].replace("BMASGPK ", "") || "";
const policeSource = (OFFICIAL_STATIONS.find((station) => station.tags?.amenity === "police")?.tags["bev:source"].match(/\d{2}\.\d{2}\.\d{4}/) || [])[0];
const classes = ["fire-professional", "fire-volunteer", "fire-other", "rescue-redcross", "rescue-johanniter", "rescue-samariter", "rescue-other", "hospital", "police", "police-special"];
const round = (value) => Math.round(value * 1e6) / 1e6;
const stations = OFFICIAL_STATIONS.map((station) => {
  const tags = station.tags || {};
  const className = classes.includes(tags["bev:class"]) ? tags["bev:class"] : tags.amenity === "fire_station" ? "fire-other" : "rescue-other";
  return [station.id, round(station.lat), round(station.lon), classes.indexOf(className), Number(STATION_DISTRICTS[station.id]) || 0, tags.name || "", tags.operator || "", tags["addr:street"] || "", tags["addr:housenumber"] || "", tags["addr:postcode"] || "", tags["addr:city"] || ""];
});
const data = { version: `BEV-DLM ${stichtag}${kaSource ? ` · ${kaSource}` : ""}${policeSource ? ` · BMI ${policeSource}` : ""}`, classes, regions: REGION_META, stations };

const header = build.metadata({
  name: "LSS Wachenplaner Österreich",
  prefix: "lsswp",
  version: VERSION,
  description: "Alle echten Feuerwehr-, Rettungs- und Polizeistandorte und Akutspitäler Österreichs direkt in Leitstellenspiel.de: zeigt gebaute und fehlende Standorte und baut fehlende per Klick.",
  folder: "lss_einsatzkarte",
  fileBase: "lss-wachenplaner",
  assetsDir: here("assets"),
  matches: ["https://www.leitstellenspiel.de/*", "https://leitstellenspiel.de/*"],
  connects: ["nominatim.openstreetmap.org"],
  requires: ["https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.js", "https://cdn.jsdelivr.net/npm/leaflet.markercluster@1.5.3/dist/leaflet.markercluster.js"],
  resources: [["lsswpLeafletCss", "https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.css"]],
  grants: ["GM_xmlhttpRequest", "GM_getValue", "GM_setValue", "GM_getResourceText", "unsafeWindow"],
});

// Als JSON-Text eingebettet: Der Browser überfliegt den Text beim Laden nur,
// ausgewertet wird er erst, wenn der Wachenplaner tatsächlich geöffnet wird.
const preamble = `// Standorte: BEV Digitales Landschaftsmodell Bauten, Stichtag ${stichtag} (CC BY 4.0).
// Polizei: Polizeidienststellen Österreich, Bundesministerium für Inneres (Open Government Data).
// Krankenhäuser: Krankenanstalten-Verzeichnis BMASGPK${kaSource ? ` (${kaSource})` : ""}; Koordinaten BEV; einzelne ergänzte Koordinaten © OpenStreetMap-Mitwirkende (ODbL), siehe tools/corrections.json.
// Bezirke: Statistik Austria, Politische Bezirke 2026 (CC BY 4.0).
const LSS_PLANNER_DATA = (() => {
  const raw = ${JSON.stringify(JSON.stringify(data))};
  let parsed = null;
  return () => parsed || (parsed = JSON.parse(raw));
})();`;

const body = build.bundle({
  prefix: "lsswp",
  version: VERSION,
  styles: {
    launcher: build.css([shared("launcher.css")], "lsswp"),
    ui: build.css([shared("kit.css"), here("userscript/planner.css")], "lsswp"),
  },
  preamble,
  files: [shared("kit.js"), here("userscript/planner.js")],
});

const outputFile = build.writeUserscript(here("dist"), "lss-wachenplaner", header, body);
console.log(`${path.relative(build.ROOT, outputFile)} · ${stations.length} Standorte · ${(fs.statSync(outputFile).size / 1024).toFixed(0)} KB`);
