"use strict";

// Browser-Smoke-Test beider Scripts: startet einen lokalen Webserver und Chrome/Edge ohne
// Fenster, öffnet die Testseiten (tests/fixture.html) und klickt die wichtigsten Abläufe
// gegen die nachgebildeten Spiel-Endpunkte durch. Keine Abhängigkeiten (Node ≥ 22).
//
//   node tests/browser-smoke.js            beide Scripts
//   node tests/browser-smoke.js planner    nur den Wachenplaner
//   CHROME_PATH=… node tests/browser-smoke.js

const http = require("node:http");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { spawn } = require("node:child_process");
// SMOKE_ROOT / SMOKE_SCENARIOS erlauben Messungen mit anderen Ständen (z. B. Vorher/Nachher).
const ROOT = process.env.SMOKE_ROOT ? path.resolve(process.env.SMOKE_ROOT) : path.join(__dirname, "..");
const scenarios = require(process.env.SMOKE_SCENARIOS ? path.resolve(process.env.SMOKE_SCENARIOS) : "./smoke-scenarios.js");
const TYPES = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".svg": "image/svg+xml" };

function findBrowser() {
  const candidates = [
    process.env.CHROME_PATH,
    "C:/Program Files/Google/Chrome/Application/chrome.exe",
    "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/usr/bin/google-chrome",
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser",
  ].filter(Boolean);
  const found = candidates.find((candidate) => fs.existsSync(candidate));
  if (!found) throw new Error("Kein Chrome/Edge gefunden – CHROME_PATH setzen.");
  return found;
}

function serve() {
  const server = http.createServer((request, response) => {
    const file = path.join(ROOT, decodeURIComponent(new URL(request.url, "http://x").pathname));
    if (!file.startsWith(ROOT) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
      response.writeHead(404).end("Nicht gefunden");
      return;
    }
    response.writeHead(200, { "Content-Type": TYPES[path.extname(file)] || "application/octet-stream" });
    fs.createReadStream(file).pipe(response);
  });
  return new Promise((resolve) => server.listen(0, "127.0.0.1", () => resolve(server)));
}

function launch(browserPath) {
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), "lss-smoke-"));
  const child = spawn(browserPath, ["--headless=new", "--remote-debugging-port=0", `--user-data-dir=${profile}`, "--no-first-run", "--no-default-browser-check", "--disable-gpu", "--disable-popup-blocking", "--window-size=1440,900", "about:blank"], { stdio: ["ignore", "ignore", "pipe"] });
  return new Promise((resolve, reject) => {
    let buffer = "";
    const timer = setTimeout(() => reject(new Error("Browser startet nicht")), 20000);
    child.stderr.on("data", (chunk) => {
      buffer += chunk;
      const match = buffer.match(/DevTools listening on (ws:\/\/\S+)/);
      if (!match) return;
      clearTimeout(timer);
      resolve({ child, endpoint: match[1], profile });
    });
  });
}

function connect(endpoint) {
  const socket = new WebSocket(endpoint);
  let nextId = 0;
  const pending = new Map();
  const listeners = new Set();
  socket.addEventListener("message", (event) => {
    const message = JSON.parse(event.data);
    if (message.id && pending.has(message.id)) {
      const { resolve, reject } = pending.get(message.id);
      pending.delete(message.id);
      if (message.error) reject(new Error(message.error.message));
      else resolve(message.result);
    } else {
      for (const listener of listeners) listener(message);
    }
  });
  const send = (method, params = {}, sessionId) => new Promise((resolve, reject) => {
    const id = ++nextId;
    pending.set(id, { resolve, reject });
    socket.send(JSON.stringify({ id, method, params, sessionId }));
  });
  return new Promise((resolve) => socket.addEventListener("open", () => resolve({ send, listeners, close: () => socket.close() })));
}

async function runScenario(cdp, baseUrl, scenario) {
  // Eigener Browserkontext je Ablauf: kein geteilter Zwischenspeicher (IndexedDB, sessionStorage).
  const { browserContextId } = await cdp.send("Target.createBrowserContext", { disposeOnDetach: true });
  const { targetId } = await cdp.send("Target.createTarget", { url: "about:blank", browserContextId });
  const { sessionId } = await cdp.send("Target.attachToTarget", { targetId, flatten: true });
  const errors = [];
  const listener = (message) => {
    if (message.sessionId !== sessionId) return;
    if (message.method === "Runtime.exceptionThrown") {
      const details = message.params.exceptionDetails;
      const frames = (details.stackTrace?.callFrames || []).slice(0, 4).map((frame) => `${frame.functionName || "?"}@${frame.url.split("/").pop()}:${frame.lineNumber + 1}`).join(" < ");
      errors.push(`${details.exception?.description?.split("\n")[0] || details.text}${frames ? ` [${frames}]` : ""}`);
    }
    if (message.method === "Runtime.consoleAPICalled" && message.params.type === "error") errors.push(message.params.args.map((arg) => arg.value ?? arg.description).join(" "));
  };
  cdp.listeners.add(listener);
  await cdp.send("Runtime.enable", {}, sessionId);
  await cdp.send("Page.enable", {}, sessionId);
  await cdp.send("Page.navigate", { url: `${baseUrl}/${scenario.page}` }, sessionId);
  const started = Date.now();
  const expression = `(async () => {
    const results = [];
    const t = {
      sleep: (ms) => new Promise((resolve) => setTimeout(resolve, ms)),
      $: (selector, root = document) => root.querySelector(selector),
      $$: (selector, root = document) => [...root.querySelectorAll(selector)],
      check(condition, label) { results.push({ ok: Boolean(condition), label }); return Boolean(condition); },
      async until(fn, label, timeout = 10000) {
        const end = Date.now() + timeout;
        while (Date.now() < end) {
          try { const value = fn(); if (value) { results.push({ ok: true, label }); return value; } } catch {}
          await new Promise((resolve) => setTimeout(resolve, 50));
        }
        results.push({ ok: false, label: label + " (Zeitüberschreitung)" });
        throw new Error("abgebrochen: " + label);
      },
      click(selector, root = document) {
        const element = typeof selector === "string" ? root.querySelector(selector) : selector;
        if (!element) throw new Error("nicht gefunden: " + selector);
        element.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true, button: 0 }));
        return element;
      },
      change(selector, value) {
        const element = typeof selector === "string" ? document.querySelector(selector) : selector;
        if (!element) throw new Error("nicht gefunden: " + selector);
        if (element.type === "checkbox") element.checked = value; else element.value = value;
        element.dispatchEvent(new Event("input", { bubbles: true }));
        element.dispatchEvent(new Event("change", { bubbles: true }));
        return element;
      },
      key(key) { window.dispatchEvent(new KeyboardEvent("keydown", { key, bubbles: true, cancelable: true })); },
    };
    try { await ({ ${scenario.run.toString()} }).run(t); }
    catch (error) { results.push({ ok: false, label: "Ablauf: " + (error && error.message || error) }); }
    return results;
  })()`;
  // Seite laden lassen, dann den Ablauf in der Seite ausführen.
  await new Promise((resolve) => setTimeout(resolve, 600));
  const { result, exceptionDetails } = await cdp.send("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true }, sessionId);
  cdp.listeners.delete(listener);
  await cdp.send("Target.closeTarget", { targetId });
  await cdp.send("Target.disposeBrowserContext", { browserContextId }).catch(() => {});
  const checks = exceptionDetails ? [{ ok: false, label: exceptionDetails.exception?.description || exceptionDetails.text }] : result.value;
  return { name: scenario.name, checks, errors, seconds: ((Date.now() - started) / 1000).toFixed(1) };
}

(async () => {
  const filter = process.argv[2];
  const server = await serve();
  const baseUrl = `http://127.0.0.1:${server.address().port}`;
  const browser = await launch(findBrowser());
  const cdp = await connect(browser.endpoint);
  let failed = 0;
  try {
    for (const scenario of scenarios.filter((entry) => !filter || entry.id === filter)) {
      const report = await runScenario(cdp, baseUrl, scenario);
      console.log(`\n${report.name} (${report.seconds} s)`);
      for (const check of report.checks) {
        if (!check.ok) failed += 1;
        console.log(`  ${check.ok ? "✓" : "✗"} ${check.label}`);
      }
      for (const error of report.errors) {
        failed += 1;
        console.log(`  ✗ Fehler in der Seite: ${error}`);
      }
    }
  } finally {
    cdp.close();
    browser.child.kill();
    server.close();
    setTimeout(() => fs.rmSync(browser.profile, { recursive: true, force: true }), 500);
  }
  console.log(failed ? `\n${failed} Prüfung(en) fehlgeschlagen` : "\nAlle Prüfungen erfolgreich");
  process.exitCode = failed ? 1 : 0;
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
