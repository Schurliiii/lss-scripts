"use strict";

// Prüft das Anfrageverhalten des gemeinsamen Kits: höchstens zwei gleichzeitige Anfragen,
// Mindestabstand, Vorrang für Bedienaktionen, Wiederholung nur bei GET und Pause bei Überlastung.
//   node tests/kit.test.js

const assert = require("node:assert/strict");

const listeners = [];
globalThis.window = { addEventListener: (...args) => listeners.push(args), matchMedia: undefined };
globalThis.location = { origin: "https://www.leitstellenspiel.de", pathname: "/", search: "" };
globalThis.document = { querySelector: () => null };

const { createKit } = require("../shared/kit.js");

const calls = [];
let active = 0;
let maxActive = 0;
const responses = new Map();
globalThis.fetch = async (url, options) => {
  calls.push({ url, method: options.method, at: Date.now() });
  active += 1;
  maxActive = Math.max(maxActive, active);
  await new Promise((resolve) => setTimeout(resolve, 40));
  active -= 1;
  const queued = responses.get(url);
  const status = queued?.length ? queued.shift() : 200;
  return { ok: status < 400, status, statusText: status === 200 ? "OK" : "Fehler", headers: { get: () => null }, text: async () => "ok", json: async () => ({ url }) };
};

const kit = createKit({ prefix: "test", styles: {}, requests: { concurrency: 2, gap: 30 } });

(async () => {
  // Höchstens zwei gleichzeitig, Starts mit Mindestabstand.
  await Promise.all(Array.from({ length: 6 }, (_, index) => kit.getJson(`/api/test/${index}`)));
  assert.equal(calls.length, 6);
  assert.ok(maxActive <= 2, `höchstens zwei gleichzeitige Anfragen (waren ${maxActive})`);
  for (let index = 1; index < calls.length; index += 1) assert.ok(calls[index].at - calls[index - 1].at >= 25, "Mindestabstand zwischen zwei Anfragen");

  // Bedienaktionen überholen wartende Hintergrundanfragen.
  calls.length = 0;
  const background = Array.from({ length: 4 }, (_, index) => kit.getHtml(`/buildings/${index}/personals`));
  const action = kit.post("/vehicles/1/edit", { csrf: "x" });
  await Promise.all([...background, action]);
  const actionIndex = calls.findIndex((call) => call.method === "POST");
  assert.ok(actionIndex <= 2, `POST wird vorgezogen (Position ${actionIndex})`);

  // GET wird bei 503 wiederholt, POST nie.
  calls.length = 0;
  responses.set("/api/flaky", [503]);
  const result = await kit.getJson("/api/flaky");
  assert.deepEqual(result, { url: "/api/flaky" });
  assert.equal(calls.filter((call) => call.url === "/api/flaky").length, 2, "GET nach 503 einmal wiederholt");
  responses.set("https://www.leitstellenspiel.de/buildings/1/active", [503]);
  await assert.rejects(kit.post("/buildings/1/active"), /503/);
  assert.equal(calls.filter((call) => call.url.endsWith("/buildings/1/active")).length, 1, "POST nie wiederholt");
  responses.set("/buildings/2/active", [500]);
  await assert.rejects(kit.request("/buildings/2/active", { retries: 0 }), /500/);
  assert.equal(calls.filter((call) => call.url === "/buildings/2/active").length, 1, "Schalter-Links ohne Wiederholung");

  // Abbrechen entfernt wartende Anfragen aus der Warteschlange.
  calls.length = 0;
  const controller = new AbortController();
  const pending = Array.from({ length: 5 }, (_, index) => kit.getHtml(`/abort/${index}`, { signal: controller.signal }).catch((error) => error.name));
  controller.abort();
  const outcomes = await Promise.all(pending);
  assert.ok(outcomes.filter((outcome) => outcome === "AbortError").length >= 3, "wartende Anfragen werden verworfen");
  assert.ok(calls.length <= 2, "nach dem Abbruch startet keine weitere Anfrage");

  // Formatierung.
  assert.equal(kit.escapeHtml(`<a href="x">'&'</a>`), "&lt;a href=&quot;x&quot;&gt;&#039;&amp;&#039;&lt;/a&gt;");
  assert.equal(kit.plural(1, "Wache", "Wachen"), "1 Wache");
  assert.equal(kit.plural(1200, "Wache", "Wachen"), "1.200 Wachen");
  assert.equal(kit.formatDistance(850), "850 m");
  assert.equal(kit.formatDistance(1250), "1,3 km");
  assert.ok(Math.abs(kit.haversine(48.2082, 16.3738, 48.3069, 14.2858) - 155000) < 2000, "Entfernung Wien–Linz");

  console.log("kit.test.js: alle Tests erfolgreich");
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
