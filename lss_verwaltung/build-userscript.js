"use strict";

// Baut das Tampermonkey-Script „LSS Verwaltung“ (dist/lss-verwaltung.user.js)
// samt dist/lss-verwaltung.meta.js für die Update-Prüfung.

const fs = require("node:fs");
const path = require("node:path");
const release = require("../release.js");

const projectDir = __dirname;
const read = (file) => fs.readFileSync(path.join(projectDir, file), "utf8");

const metadata = [
  "// ==UserScript==",
  "// @name         LSS Verwaltung",
  `// @namespace    ${release.namespace("local.lss-verwaltung")}`,
  "// @version      1.3.3",
  "// @description  Fuhrpark, Personal, Wachen, Ausbildungen und Ausbauten in Leitstellenspiel.de auf einen Blick – mit Bearbeitung direkt im Panel.",
  "// @author       Schurliiii",
  ...release.iconLines(path.join(projectDir, "assets")),
  ...release.distributionLines("lss_verwaltung", "lss-verwaltung"),
  "// @match        https://www.leitstellenspiel.de/*",
  "// @match        https://leitstellenspiel.de/*",
  "// @match        https://polizei.leitstellenspiel.de/*",
  "// @connect      api.lss-manager.de",
  "// @require      https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.js",
  "// @resource     lssfoLeafletCss https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.css",
  "// @resource     lssfoAustriaDistricts https://gis.geosphere.at/maps/rest/services/grenzen/admin_grenzen_oesterreich/MapServer/1/query?where=1%3D1&outFields=g_id%2Cg_name&returnGeometry=true&outSR=4326&geometryPrecision=6&maxAllowableOffset=0.00005&f=geojson",
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
  style.id = "lssfo-userscript-style";
  const leafletCss = typeof GM_getResourceText === "function" ? GM_getResourceText("lssfoLeafletCss") : "";
  style.textContent = leafletCss + "\\n" + ${JSON.stringify(read("styles.css"))};
  (document.head || document.documentElement).appendChild(style);
})();`;

const outputFile = release.writeUserscript(path.join(projectDir, "dist"), "lss-verwaltung", metadata, `${styleBootstrap}\n\n${read("core.js")}\n\n${read("content.js")}\n`);
console.log(outputFile);
