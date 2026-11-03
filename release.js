"use strict";

// Gemeinsame Angaben für die Veröffentlichung über GitHub. Tampermonkey prüft
// über @updateURL die kleine .meta.js-Datei und lädt bei neuer @version die
// .user.js nach – der Nutzer bestätigt das Update nur noch per Knopfdruck.

const fs = require("node:fs");
const path = require("node:path");

const config = JSON.parse(fs.readFileSync(path.join(__dirname, "repo.config.json"), "utf8"));
const published = Boolean(config.owner && config.repo);
const repositoryUrl = published ? `https://github.com/${config.owner}/${config.repo}` : "";

function namespace(fallback) {
  return published ? repositoryUrl : fallback;
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

// Eigens gerenderte Größen statt eines verkleinerten großen Bildes: 32 px für die
// Tampermonkey-Liste (16 px, auf HiDPI 32 px) und 64 px für größere Ansichten.
function iconLines(assetsDir) {
  const dataUri = (file) => `data:image/png;base64,${fs.readFileSync(path.join(assetsDir, file)).toString("base64")}`;
  return [
    `// @icon         ${dataUri("icon-32.png")}`,
    `// @icon64       ${dataUri("icon-64.png")}`,
  ];
}

// Schreibt das Script und die zugehörige .meta.js (nur der Kopfblock).
function writeUserscript(distDir, fileBase, metadata, body) {
  fs.mkdirSync(distDir, { recursive: true });
  const userFile = path.join(distDir, `${fileBase}.user.js`);
  fs.writeFileSync(userFile, `${metadata}\n\n${body}`, "utf8");
  fs.writeFileSync(path.join(distDir, `${fileBase}.meta.js`), `${metadata}\n`, "utf8");
  return userFile;
}

module.exports = { distributionLines, iconLines, namespace, published, writeUserscript };
