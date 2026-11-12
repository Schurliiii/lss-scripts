"use strict";

// Baut „LSS Verwaltung“: dist/lss-verwaltung.user.js und dist/lss-verwaltung.meta.js.
// Die Erweiterungsvariante (manifest.json) lädt dieselbe Datei.

const fs = require("node:fs");
const path = require("node:path");
const build = require("../shared/build.js");

const VERSION = "2.0.0";
const DESCRIPTION = "Fuhrpark, Personal, Wachen, Ausbildungen und Ausbauten in Leitstellenspiel.de auf einen Blick – mit Bearbeitung direkt im Panel.";
const here = (file) => path.join(__dirname, file);
const shared = (file) => path.join(build.ROOT, "shared", file);

const header = build.metadata({
  name: "LSS Verwaltung",
  prefix: "lssfo",
  version: VERSION,
  description: DESCRIPTION,
  folder: "lss_verwaltung",
  fileBase: "lss-verwaltung",
  assetsDir: here("assets"),
  matches: ["https://www.leitstellenspiel.de/*", "https://leitstellenspiel.de/*", "https://polizei.leitstellenspiel.de/*"],
  connects: ["api.lss-manager.de"],
  requires: ["https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.js"],
  resources: [
    ["lssfoLeafletCss", "https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.css"],
    ["lssfoAustriaDistricts", "https://gis.geosphere.at/maps/rest/services/grenzen/admin_grenzen_oesterreich/MapServer/1/query?where=1%3D1&outFields=g_id%2Cg_name&returnGeometry=true&outSR=4326&geometryPrecision=6&maxAllowableOffset=0.00005&f=geojson"],
  ],
  grants: ["GM_xmlhttpRequest", "GM_getValue", "GM_setValue", "GM_getResourceText", "unsafeWindow"],
});

const body = build.bundle({
  prefix: "lssfo",
  version: VERSION,
  styles: {
    launcher: build.css([shared("launcher.css")], "lssfo"),
    ui: build.css([shared("kit.css"), here("styles.css")], "lssfo"),
  },
  files: [
    shared("kit.js"),
    here("src/core.js"),
    here("src/app.js"),
    here("src/table.js"),
    here("src/views.js"),
    here("src/map.js"),
    here("src/editor.js"),
    here("src/manager.js"),
    here("src/scans.js"),
    here("src/shell.js"),
    here("src/main.js"),
  ],
});

const outputFile = build.writeUserscript(here("dist"), "lss-verwaltung", header, body);

// Erweiterung (Chrome/Edge, „Entpackte Erweiterung laden“): gleiche Version, gleiche Datei.
const manifestFile = here("manifest.json");
const manifest = JSON.parse(fs.readFileSync(manifestFile, "utf8"));
manifest.version = VERSION;
manifest.description = DESCRIPTION;
manifest.content_scripts = [{ matches: manifest.content_scripts[0].matches, js: ["dist/lss-verwaltung.user.js"], run_at: "document_idle" }];
fs.writeFileSync(manifestFile, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");

console.log(`${path.relative(build.ROOT, outputFile)} · ${(fs.statSync(outputFile).size / 1024).toFixed(0)} KB`);
