"use strict";

// Gemeinsamer Build beider Userscripts: Kopfblock, Update-Adressen, Symbole, Stylesheets
// (mit Präfix) und das Bündeln aller Quelldateien in einen gemeinsamen Gültigkeitsbereich.
//
// Tampermonkey prüft über @updateURL die kleine .meta.js-Datei und lädt bei neuer
// @version die .user.js nach – der Nutzer bestätigt das Update nur noch per Knopfdruck.

const fs = require("node:fs");
const path = require("node:path");

const ROOT = path.join(__dirname, "..");
const config = JSON.parse(fs.readFileSync(path.join(ROOT, "repo.config.json"), "utf8"));
const published = Boolean(config.owner && config.repo);
const repositoryUrl = published ? `https://github.com/${config.owner}/${config.repo}` : "";

const read = (file) => fs.readFileSync(file, "utf8");

// Eigens gerenderte Größen statt eines verkleinerten großen Bildes: 32 px für die
// Tampermonkey-Liste (16 px, auf HiDPI 32 px) und 64 px für größere Ansichten.
function iconLines(assetsDir) {
  const dataUri = (file) => `data:image/png;base64,${fs.readFileSync(path.join(assetsDir, file)).toString("base64")}`;
  return [`// @icon         ${dataUri("icon-32.png")}`, `// @icon64       ${dataUri("icon-64.png")}`];
}

function distributionLines(folder, fileBase) {
  if (!published) return [];
  const raw = `https://raw.githubusercontent.com/${config.owner}/${config.repo}/${config.branch || "main"}/${folder}/dist/${fileBase}`;
  return [
    `// @homepageURL  ${repositoryUrl}`,
    `// @supportURL   ${repositoryUrl}/issues`,
    `// @updateURL    ${raw}.meta.js`,
    `// @downloadURL  ${raw}.user.js`,
  ];
}

function metadata({ name, prefix, version, description, folder, fileBase, assetsDir, matches, connects = [], requires = [], resources = [], grants }) {
  const line = (key, value) => `// @${key.padEnd(12)} ${value}`;
  return [
    "// ==UserScript==",
    line("name", name),
    line("namespace", published ? repositoryUrl : `local.${prefix}`),
    line("version", version),
    line("description", description),
    line("author", "Schurliiii"),
    ...iconLines(assetsDir),
    ...distributionLines(folder, fileBase),
    ...matches.map((match) => line("match", match)),
    // Nicht in Spiel-Iframes (Einsatz-, Fahrzeug- und Wachenfenster der Lightbox) laufen.
    line("noframes", "").trimEnd(),
    ...connects.map((host) => line("connect", host)),
    ...requires.map((url) => line("require", url)),
    ...resources.map(([key, url]) => line("resource", `${key} ${url}`)),
    ...grants.map((grant) => line("grant", grant)),
    line("run-at", "document-idle"),
    "// ==/UserScript==",
  ].join("\n");
}

// Kommentare und überflüssige Leerzeichen entfernen; Leerzeichen innerhalb von Selektoren
// (Nachfahren-Kombinator) bleiben erhalten.
function compactCss(css) {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\s+/g, " ")
    .replace(/\s*([{};,])\s*/g, "$1")
    .replace(/;}/g, "}")
    .trim();
}

const css = (files, prefix) => compactCss(files.map((file) => read(file).replaceAll("__P__", prefix)).join("\n"));

// Alle Quelldateien landen in einer Funktion: gemeinsamer Gültigkeitsbereich, nichts
// im globalen Fenster. Ein zweites Exemplar (z. B. Userscript und Erweiterung zugleich)
// erkennt das erste am Attribut an <html> und beendet sich.
function bundle({ prefix, version, files, styles, preamble = "" }) {
  const sources = files.map((file) => `// ---- ${path.relative(ROOT, file).replaceAll("\\", "/")} ----\n${read(file).trim()}`).join("\n\n");
  return `(() => {
"use strict";
if (window.top !== window.self || document.documentElement.hasAttribute("data-${prefix}")) return;
document.documentElement.setAttribute("data-${prefix}", ${JSON.stringify(version)});
const LSS_STYLES = ${JSON.stringify(styles)};
${preamble}
${sources}
})();
`;
}

// Schreibt das Script und die zugehörige .meta.js (nur der Kopfblock).
function writeUserscript(distDir, fileBase, header, body) {
  fs.mkdirSync(distDir, { recursive: true });
  const userFile = path.join(distDir, `${fileBase}.user.js`);
  fs.writeFileSync(userFile, `${header}\n\n${body}`, "utf8");
  fs.writeFileSync(path.join(distDir, `${fileBase}.meta.js`), `${header}\n`, "utf8");
  return userFile;
}

module.exports = { ROOT, read, css, bundle, metadata, writeUserscript, published };
