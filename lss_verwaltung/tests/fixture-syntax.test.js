const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const html = fs.readFileSync(path.join(__dirname, "fixture.html"), "utf8");
const scripts = [...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi)]
  .map((match) => match[1])
  .filter((source) => source.trim());

assert.ok(scripts.length >= 2, "Testseite enthält die erwarteten Inline-Skripte");
for (const source of scripts) new Function(source);

console.log("fixture-syntax.test.js: alle Inline-Skripte sind syntaktisch gültig");
