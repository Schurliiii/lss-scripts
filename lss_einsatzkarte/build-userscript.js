"use strict";

// Baut das eigenständige Tampermonkey-Script „LSS Wachenplaner Österreich“
// (dist/lss-wachenplaner.user.js) aus userscript/planner.js, userscript/planner.css
// und den Standortdaten dieser Webkarte (official-data.js, regions.js).

const fs = require("node:fs");
const path = require("node:path");

const projectDir = __dirname;
const read = (file) => fs.readFileSync(path.join(projectDir, file), "utf8");
const release = require("../release.js");

// Kompaktes Datenformat je Standort:
// [id, lat, lon, Klasse, Bezirks-ID, Name, Betreiber, Straße, Hausnummer, PLZ, Ort]
const { OFFICIAL_STATIONS, REGION_META, STATION_DISTRICTS } = new Function(`${read("official-data.js")}\n${read("regions.js")}\nreturn { OFFICIAL_STATIONS, REGION_META, STATION_DISTRICTS };`)();
const classes = ["fire-professional", "fire-volunteer", "fire-other", "rescue-redcross", "rescue-johanniter", "rescue-samariter", "rescue-other"];
const round = (value) => Math.round(value * 1e6) / 1e6;
const stations = OFFICIAL_STATIONS.map((station) => {
  const tags = station.tags || {};
  const className = classes.includes(tags["bev:class"]) ? tags["bev:class"] : tags.amenity === "fire_station" ? "fire-other" : "rescue-other";
  return [
    station.id,
    round(station.lat),
    round(station.lon),
    classes.indexOf(className),
    Number(STATION_DISTRICTS[station.id]) || 0,
    tags.name || "",
    tags.operator || "",
    tags["addr:street"] || "",
    tags["addr:housenumber"] || "",
    tags["addr:postcode"] || "",
    tags["addr:city"] || "",
  ];
});
const data = { version: "BEV-DLM 23.03.2026", classes, regions: REGION_META, stations };

const metadata = [
  "// ==UserScript==",
  "// @name         LSS Wachenplaner Österreich",
  `// @namespace    ${release.namespace("local.lss-wachenplaner")}`,
  "// @version      1.1.2",
  "// @description  Alle echten Feuerwehr- und Rettungsstandorte Österreichs direkt in Leitstellenspiel.de: zeigt gebaute und fehlende Wachen und baut fehlende per Klick.",
  "// @author       Schurliiii",
  ...release.iconLines(path.join(projectDir, "assets")),
  ...release.distributionLines("lss_einsatzkarte", "lss-wachenplaner"),
  "// @match        https://www.leitstellenspiel.de/*",
  "// @match        https://leitstellenspiel.de/*",
  "// @connect      nominatim.openstreetmap.org",
  "// @require      https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.js",
  "// @require      https://cdn.jsdelivr.net/npm/leaflet.markercluster@1.5.3/dist/leaflet.markercluster.js",
  "// @resource     lsswpLeafletCss https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.css",
  "// @grant        GM_xmlhttpRequest",
  "// @grant        GM_getValue",
  "// @grant        GM_setValue",
  "// @grant        GM_getResourceText",
  "// @grant        unsafeWindow",
  "// @run-at       document-idle",
  "// ==/UserScript==",
].join("\n");

const styleBootstrap = `(() => {
  const style = document.createElement("style");
  style.id = "lsswp-userscript-style";
  const leafletCss = typeof GM_getResourceText === "function" ? GM_getResourceText("lsswpLeafletCss") : "";
  style.textContent = leafletCss + "\\n" + ${JSON.stringify(read("userscript/planner.css"))};
  (document.head || document.documentElement).appendChild(style);
})();`;

// Als JSON-String eingebettet: Der Browser überfliegt den String beim Laden nur,
// JSON.parse läuft erst, wenn der Wachenplaner tatsächlich geöffnet wird.
const dataScript = `// Standorte: BEV Digitales Landschaftsmodell Bauten, Stichtag 23.03.2026 (CC BY 4.0).
// Bezirke: Statistik Austria, Politische Bezirke 2026 (CC BY 4.0).
(function (root) {
  const raw = ${JSON.stringify(JSON.stringify(data))};
  let parsed = null;
  root.LSSPlannerData = () => parsed || (parsed = JSON.parse(raw));
})(typeof globalThis !== "undefined" ? globalThis : this);`;

const body = `${styleBootstrap}\n\n${dataScript}\n\n${read("userscript/planner.js")}\n`;
const outputFile = release.writeUserscript(path.join(projectDir, "dist"), "lss-wachenplaner", metadata, body);
console.log(`${outputFile} · ${stations.length} Standorte · ${(fs.statSync(outputFile).size / 1024).toFixed(0)} KB`);
