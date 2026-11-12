/*
 * LSS-Kit – gemeinsamer Unterbau von „LSS Verwaltung“ und „LSS Wachenplaner Österreich“.
 *
 * Wird beim Bauen in beide Scripts eingebettet (jedes mit eigenem Präfix), damit beide
 * gleich aussehen, sich gleich bedienen lassen und das Spiel gleich schonend behandeln:
 *
 *  - Eine Warteschlange für alle Anfragen an das Spiel: höchstens zwei gleichzeitig,
 *    Mindestabstand zwischen zwei Anfragen, automatische Pause bei Überlastung (429/5xx).
 *    Bedienaktionen (Speichern, Zuweisen, Bauen) überholen laufende Hintergrundprüfungen.
 *  - Oberfläche, Stylesheets und Theme-Beobachtung entstehen erst beim ersten Öffnen –
 *    auf normalen Spielseiten kostet ein Script nur den Eintrag in der Navigationsleiste.
 *  - Einheitliche Aktionen (data-action / data-change / data-input), Dialoge, Hinweise.
 *  - Design (LSS-Design, Hell, Dunkel) und Effektstufe (Auto, Voll, Sparsam).
 *  - Bau-Dialog für echte Standorte und die Verbindung zur Wachenplaner-Webseite.
 */
function createKit(config) {
  const P = config.prefix;
  const pageWindow = typeof unsafeWindow !== "undefined" ? unsafeWindow : window;

  /* ---------- Formatierung ---------- */

  const numberFormat = new Intl.NumberFormat("de-DE");
  const decimalFormat = new Intl.NumberFormat("de-DE", { maximumFractionDigits: 1 });
  const collator = new Intl.Collator("de", { numeric: true, sensitivity: "base" });
  const ESCAPES = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" };

  const escapeHtml = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => ESCAPES[char]);
  const formatNumber = (value) => numberFormat.format(Number(value) || 0);
  const formatDecimal = (value) => decimalFormat.format(Number(value) || 0);
  const formatDistance = (meters) => (meters < 1000 ? `${formatNumber(Math.round(meters))} m` : `${decimalFormat.format(meters / 1000)} km`);
  const plural = (count, one, many) => `${formatNumber(count)} ${count === 1 ? one : many}`;
  const textOf = (element) => (element?.textContent || "").replace(/\s+/g, " ").trim();

  function formatDateTime(value) {
    const date = value instanceof Date ? value : value ? new Date(value) : null;
    return date && !Number.isNaN(date.valueOf()) ? date.toLocaleString("de-DE", { dateStyle: "short", timeStyle: "short" }) : "–";
  }

  function haversine(lat1, lon1, lat2, lon2) {
    if (![lat1, lon1, lat2, lon2].every(Number.isFinite)) return NaN;
    const rad = Math.PI / 180;
    const a = Math.sin(((lat2 - lat1) * rad) / 2) ** 2 + Math.cos(lat1 * rad) * Math.cos(lat2 * rad) * Math.sin(((lon2 - lon1) * rad) / 2) ** 2;
    return 12742000 * Math.asin(Math.sqrt(a));
  }

  const abortError = () => new DOMException("Abgebrochen", "AbortError");
  const isAbort = (error) => error?.name === "AbortError";

  function sleep(ms, signal) {
    return new Promise((resolve, reject) => {
      if (signal?.aborted) return reject(abortError());
      const timer = setTimeout(resolve, ms);
      signal?.addEventListener("abort", () => {
        clearTimeout(timer);
        reject(abortError());
      }, { once: true });
    });
  }

  /* ---------- Speicher ---------- */

  function readStored(key) {
    try {
      const raw = typeof GM_getValue === "function" ? GM_getValue(key, null) : localStorage.getItem(key);
      if (!raw) return {};
      return (typeof raw === "string" ? JSON.parse(raw) : raw) || {};
    } catch {
      return {};
    }
  }

  // Einstellungen: Werte mit Vorgaben, Speichern im Tampermonkey-Speicher (sonst localStorage).
  function store(key, defaults) {
    const values = { ...defaults, ...readStored(key) };
    return {
      values,
      set(patch) {
        Object.assign(values, patch);
        const text = JSON.stringify(values);
        try {
          if (typeof GM_setValue === "function") GM_setValue(key, text);
          else localStorage.setItem(key, text);
        } catch { /* Die Einstellung gilt dann nur für diese Sitzung. */ }
      },
    };
  }

  const session = {
    get(key) {
      try { return sessionStorage.getItem(key); } catch { return null; }
    },
    set(key, value) {
      try { sessionStorage.setItem(key, value); } catch { /* Gilt nur für diese Anfrage. */ }
    },
  };

  /* ---------- Anfragen an das Spiel ---------- */

  // Alle Spielanfragen laufen durch diese Warteschlange. Mehr als zwei gleichzeitige
  // Anfragen oder dichte Folgen belasten die Server und fallen auf – genau das soll
  // ein Script nie tun.
  const queue = (() => {
    const waiting = [];
    const { concurrency = 2, gap = 250 } = config.requests || {};
    let active = 0;
    let nextStart = 0;
    let timer = 0;

    function pump() {
      if (timer) return;
      while (active < concurrency && waiting.length) {
        const now = Date.now();
        if (now < nextStart) {
          timer = setTimeout(() => {
            timer = 0;
            pump();
          }, nextStart - now);
          return;
        }
        const job = waiting.shift();
        if (job.signal?.aborted) {
          job.reject(abortError());
          continue;
        }
        active += 1;
        nextStart = now + gap;
        Promise.resolve().then(job.run).then(job.resolve, job.reject).finally(() => {
          active -= 1;
          pump();
        });
      }
    }

    function add(run, { signal, priority = false } = {}) {
      return new Promise((resolve, reject) => {
        const job = { run, resolve, reject, signal };
        if (priority) waiting.unshift(job);
        else waiting.push(job);
        signal?.addEventListener("abort", () => {
          const index = waiting.indexOf(job);
          if (index < 0) return;
          waiting.splice(index, 1);
          reject(abortError());
        }, { once: true });
        pump();
      });
    }

    // Überlastung: die ganze Warteschlange pausiert, nicht nur die betroffene Anfrage.
    function pause(ms) {
      nextStart = Math.max(nextStart, Date.now() + ms);
    }

    return { add, pause };
  })();

  function httpError(response, url) {
    const path = String(url).replace(/^https?:\/\/[^/]+/, "");
    const error = new Error(`${response.status} ${response.statusText || "Fehler"} (${path})`);
    error.status = response.status;
    return error;
  }

  async function backoff(attempt, response, signal) {
    const retryAfter = Number(response?.headers?.get?.("Retry-After"));
    const wait = Math.min(30000, retryAfter > 0 ? retryAfter * 1000 : 1000 * 2 ** attempt);
    queue.pause(wait);
    await sleep(wait, signal);
  }

  // GET-Anfragen werden bei Überlastung bis zu dreimal wiederholt, Änderungen
  // (POST oder Schalter-Links) nie – sonst würde etwas doppelt ausgeführt.
  async function request(url, { method = "GET", body, headers = {}, signal, priority = false, retries } = {}) {
    const maxRetries = retries ?? (method === "GET" ? 3 : 0);
    for (let attempt = 0; ; attempt += 1) {
      let response;
      try {
        response = await queue.add(() => fetch(url, { method, body, headers, signal, credentials: "include", redirect: "follow" }), { signal, priority });
      } catch (error) {
        if (isAbort(error)) throw error;
        if (attempt >= maxRetries) throw new Error(`Netzwerkfehler (${String(url).replace(/^https?:\/\/[^/]+/, "")})`);
        await backoff(attempt, null, signal);
        continue;
      }
      if (response.ok) return response;
      if (!(response.status === 429 || response.status >= 500) || attempt >= maxRetries) throw httpError(response, url);
      await backoff(attempt, response, signal);
    }
  }

  const getHtml = (url, options = {}) => request(url, { ...options, headers: { Accept: "text/html" } }).then((response) => response.text());
  const getJson = (url, options = {}) => request(url, { ...options, headers: { Accept: "application/json" } }).then((response) => response.json());
  const csrfToken = () => document.querySelector('meta[name="csrf-token"]')?.content || "";
  const formHeaders = (csrf) => ({
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    "X-CSRF-Token": csrf || csrfToken(),
    "X-Requested-With": "XMLHttpRequest",
  });

  // Sendet ein aus einer Spielseite gelesenes Formular so ab, wie es der Knopf des Spiels täte.
  function submitForm(form, extraEntries = [], options = {}) {
    const body = new URLSearchParams();
    for (const [key, value] of new FormData(form)) if (typeof value === "string") body.append(key, value);
    for (const [key, value] of extraEntries) body.append(key, value);
    const csrf = form.querySelector('input[name="authenticity_token"]')?.value;
    const action = new URL(form.getAttribute("action") || location.pathname, location.origin).href;
    return request(action, { method: (form.getAttribute("method") || "post").toUpperCase(), body, headers: formHeaders(csrf), priority: true, ...options });
  }

  function post(url, { csrf, body, ...options } = {}) {
    return request(new URL(url, location.origin).href, { method: "POST", body, headers: formHeaders(csrf), priority: true, ...options });
  }

  async function fetchBuildings(options = {}) {
    const result = await getJson(`/api/buildings?_=${Date.now()}`, options);
    return Array.isArray(result) ? result : result?.result || [];
  }

  // Öffentliche Fremddaten (Katalog, Adresssuche) ohne Cookies und ohne Spielerdaten.
  function externalJson(url) {
    if (typeof GM_xmlhttpRequest === "function") {
      return new Promise((resolve, reject) => {
        GM_xmlhttpRequest({
          method: "GET",
          url,
          responseType: "json",
          timeout: 20000,
          anonymous: true,
          onload: (response) => {
            if (response.status < 200 || response.status >= 300) return reject(new Error(`${response.status} ${response.statusText || "Fehler"}`));
            try {
              resolve(response.response ?? JSON.parse(response.responseText));
            } catch (error) {
              reject(new Error(`Ungültige Antwort: ${error.message}`));
            }
          },
          ontimeout: () => reject(new Error("Zeitüberschreitung")),
          onerror: () => reject(new Error("Netzwerkfehler")),
        });
      });
    }
    return fetch(url, { credentials: "omit", headers: { Accept: "application/json" } }).then((response) => {
      if (!response.ok) throw httpError(response, url);
      return response.json();
    });
  }

  let parser = null;
  const parseHtml = (html) => (parser ||= new DOMParser()).parseFromString(html || "", "text/html");

  function gmResource(name) {
    try {
      return typeof GM_getResourceText === "function" ? GM_getResourceText(name) || "" : "";
    } catch {
      return "";
    }
  }

  /* ---------- Design und Effekte ---------- */

  const appearance = { theme: "auto", effects: "auto" };
  const roots = new Set();
  let lowEnd = null;
  let activeCount = 0;
  let themeObserver = null;
  let themeFrame = 0;

  function pageTheme() {
    const html = document.documentElement;
    const body = document.body;
    const marks = `${html.dataset.theme || ""} ${html.dataset.bsTheme || ""} ${body.dataset.theme || ""} ${body.dataset.bsTheme || ""}`;
    if (/dark/i.test(marks) || html.classList.contains("dark") || body.classList.contains("dark")) return "dark";
    const color = getComputedStyle(body).backgroundColor.match(/[\d.]+/g)?.slice(0, 3).map(Number);
    if (color?.length === 3 && color[0] * 0.299 + color[1] * 0.587 + color[2] * 0.114 < 105) return "dark";
    return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  // Schwächere Geräte: wenige Kerne, wenig Speicher oder gewünschte reduzierte Transparenz.
  function isLowEndDevice() {
    if (lowEnd === null) {
      lowEnd = (navigator.hardwareConcurrency || 8) <= 4
        || (navigator.deviceMemory || 8) <= 4
        || Boolean(window.matchMedia?.("(prefers-reduced-transparency: reduce)").matches);
    }
    return lowEnd;
  }

  function applyAppearance() {
    if (!roots.size) return;
    const theme = appearance.theme === "auto" ? pageTheme() : appearance.theme;
    const lite = appearance.effects === "reduced" || (appearance.effects === "auto" && isLowEndDevice());
    for (const root of roots) {
      if (root.dataset.theme !== theme) root.dataset.theme = theme;
      root.classList.toggle(`${P}-lite`, lite);
    }
  }

  function setAppearance(patch) {
    Object.assign(appearance, patch);
    applyAppearance();
  }

  // Das Spiel ändert Klassen an <html>/<body> ständig. Beobachtet wird nur, solange eine
  // eigene Oberfläche offen ist, und höchstens einmal pro Bild neu bewertet.
  const OWN_CLASSES = /\b(?:lss(?:fo|wp)-[\w-]+|leaflet-[\w-]+)\b/g;
  const stripOwn = (value) => String(value || "").replace(OWN_CLASSES, "").replace(/\s+/g, " ").trim();

  function startThemeObserver() {
    themeObserver ||= new MutationObserver((mutations) => {
      if (appearance.theme !== "auto" || themeFrame) return;
      const relevant = mutations.some((mutation) => mutation.attributeName !== "class" || stripOwn(mutation.oldValue) !== stripOwn(mutation.target.getAttribute("class")));
      if (!relevant) return;
      themeFrame = requestAnimationFrame(() => {
        themeFrame = 0;
        applyAppearance();
      });
    });
    const options = { attributes: true, attributeOldValue: true, attributeFilter: ["class", "style", "data-theme", "data-bs-theme"] };
    themeObserver.observe(document.documentElement, options);
    themeObserver.observe(document.body, options);
  }

  function activate() {
    activeCount += 1;
    if (activeCount === 1) {
      applyAppearance();
      startThemeObserver();
    }
  }

  function deactivate() {
    activeCount = Math.max(0, activeCount - 1);
    if (!activeCount) themeObserver?.disconnect();
  }

  window.matchMedia?.("(prefers-color-scheme: dark)").addEventListener?.("change", () => {
    if (activeCount) applyAppearance();
  });

  /* ---------- Stylesheets, Wurzeln und Aktionen ---------- */

  function addStyle(id, css) {
    if (!css || document.getElementById(id)) return;
    const style = document.createElement("style");
    style.id = id;
    style.textContent = css;
    (document.head || document.documentElement).appendChild(style);
  }

  // Leaflet- und Oberflächen-Stile erst, wenn tatsächlich etwas angezeigt wird.
  function ensureStyles() {
    if (config.leafletCss) addStyle("lss-leaflet-style", gmResource(config.leafletCss));
    addStyle(`${P}-style`, config.styles?.ui);
  }

  const handlers = { click: new Map(), change: new Map(), input: new Map() };
  const ATTRIBUTES = { click: "action", change: "change", input: "input" };

  function on(groups) {
    for (const [type, entries] of Object.entries(groups)) {
      for (const [name, handler] of Object.entries(entries)) handlers[type].set(name, handler);
    }
  }

  function dispatch(event) {
    const attribute = ATTRIBUTES[event.type];
    const element = event.target.closest?.(`[data-${attribute}]`);
    if (!element || !event.currentTarget.contains(element)) return;
    if (event.type === "click" && element.disabled) return;
    handlers[event.type].get(element.dataset[attribute])?.(element, event);
  }

  function createRoot(id, className = "") {
    ensureStyles();
    const root = document.createElement("div");
    root.id = id;
    root.className = `${P}-root ${className}`.trim();
    for (const type of Object.keys(ATTRIBUTES)) root.addEventListener(type, dispatch);
    // Tastenkürzel des Spiels sollen beim Tippen in eigenen Feldern nicht auslösen.
    root.addEventListener("keydown", (event) => {
      if (event.key !== "Escape") event.stopPropagation();
    });
    document.body.appendChild(root);
    roots.add(root);
    applyAppearance();
    return root;
  }

  let layerRoot = null;
  const layer = () => (layerRoot ||= createRoot(`${P}-layer`, `${P}-layer`));

  /* ---------- Symbole ---------- */

  const ICONS = {
    app: '<path d="M12 3 4 6v6c0 4.8 3.1 7.8 8 9 4.9-1.2 8-4.2 8-9V6l-8-3Z"/><path d="M8 9h8M8 13h8M12 7v8"/>',
    dashboard: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
    region: '<path d="M4 20V8l8-4 8 4v12"/><path d="M8 20v-5h8v5M8 9h.01M12 9h.01M16 9h.01"/>',
    extension: '<path d="M4 21v-8l5-3v11M9 21V7l5-3v17M14 21v-9l6-3v12M2 21h20"/>',
    gauge: '<path d="M4.9 19a9 9 0 1 1 14.2 0"/><path d="m12 13 4-4"/><circle cx="12" cy="13" r="1"/>',
    chevron: '<path d="m9 18 6-6-6-6"/>',
    back: '<path d="m15 18-6-6 6-6"/>',
    transfer: '<path d="M17 3l4 4-4 4M3 7h18M7 21l-4-4 4-4m14 4H3"/>',
    edit: '<path d="M4 20h4L19 9l-4-4L4 16v4Z"/><path d="m13.5 6.5 4 4"/>',
    vehicle: '<path d="M3 7h11v10H3z"/><path d="M14 10h3l3 3v4h-6z"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/>',
    building: '<path d="M4 21V7l8-4 8 4v14"/><path d="M8 10h2m4 0h2m-8 4h2m4 0h2M9 21v-4h6v4"/>',
    training: '<path d="m3 9 9-5 9 5-9 5-9-5Z"/><path d="M7 12v4c3 2 7 2 10 0v-4M21 9v6"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18m-12 5 2 2 4-4"/>',
    map: '<path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3V6Z"/><path d="M9 3v15m6-12v15"/>',
    pin: '<path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.5"/>',
    theme: '<path d="M12 3a9 9 0 1 0 9 9c0-1-.17-1.96-.47-2.86A7 7 0 0 1 12 3Z"/>',
    external: '<path d="M14 4h6v6M20 4l-9 9"/><path d="M18 13v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h6"/>',
    refresh: '<path d="M20 11a8 8 0 1 0-2.34 5.66M20 4v7h-7"/>',
    close: '<path d="m6 6 12 12M18 6 6 18"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
    scan: '<path d="M9 4H6a2 2 0 0 0-2 2v14h16V6a2 2 0 0 0-2-2h-3"/><rect x="9" y="2" width="6" height="4" rx="1"/><path d="m8 13 2 2 5-5"/>',
    download: '<path d="M12 3v12m-4-4 4 4 4-4M5 21h14"/>',
    stop: '<rect x="5" y="5" width="14" height="14" rx="2"/>',
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
    alert: '<path d="M10.3 4.4 2.5 18a2 2 0 0 0 1.7 3h15.6a2 2 0 0 0 1.7-3L13.7 4.4a2 2 0 0 0-3.4 0Z"/><path d="M12 9v4m0 4h.01"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 8v5M12 16h.01"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    minus: '<path d="M5 12h14"/>',
    home: '<path d="M3 11.5 12 4l9 7.5M5.5 9.5V20h13V9.5"/>',
    check: '<path d="m5 12 5 5 9-10"/>',
    sort: '<path d="m8 9 4-4 4 4M16 15l-4 4-4-4"/>',
    "sort-asc": '<path d="m7 14 5-5 5 5"/>',
    "sort-desc": '<path d="m7 10 5 5 5-5"/>',
  };

  const icon = (name) => `<svg class="${P}-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${ICONS[name] || ICONS.app}</svg>`;
  const badge = (value, tone = "neutral", title = "") => `<span class="${P}-badge is-${tone}"${title ? ` title="${escapeHtml(title)}"` : ""}>${escapeHtml(value)}</span>`;
  const glyph = (color, name) => `<span class="${P}-dialog-glyph" style="--glyph:${color}">${icon(name)}</span>`;
  const note = (tone, html) => `<div class="${P}-note is-${tone}">${icon(tone === "success" ? "check" : tone === "info" ? "info" : "alert")}<span>${html}</span></div>`;
  const spinner = () => `<span class="${P}-spinner" aria-hidden="true"></span>`;

  function selectHtml(attributes, options, value) {
    return `<select ${attributes}>${options.map((option) => `<option value="${escapeHtml(option.value)}"${String(option.value) === String(value) ? " selected" : ""}>${escapeHtml(option.label ?? option.value ?? "–")}</option>`).join("")}</select>`;
  }

  /* ---------- Navigationsleiste ---------- */

  const isMainPage = () => location.pathname === "/" || Boolean(pageWindow.LSS_TEST_PAGE || globalThis.LSS_TEST_PAGE);

  function forumItem() {
    const link = [...document.querySelectorAll("#navbar-main-collapse a, #navbar-collapse a, .navbar a, nav a, header a")]
      .find((anchor) => /forum/i.test(`${anchor.textContent} ${anchor.title} ${anchor.getAttribute("aria-label") || ""} ${anchor.getAttribute("href") || ""}`));
    return link?.closest("li.dropdown") || link?.closest("li") || link || null;
  }

  // Ein kompaktes Symbol direkt rechts neben dem Forum-Menü. Nur auf der Hauptseite;
  // fehlt die Leiste noch, wird kurz gewartet – nie ein schwebender Ersatzknopf.
  function mountLauncher({ id, title, label, glyph: glyphHtml, onClick, after = [] }) {
    if (!isMainPage() || document.getElementById(id)) return;
    addStyle(`${P}-launcher-style`, config.styles?.launcher);
    const button = document.createElement("button");
    button.type = "button";
    button.id = id;
    button.className = `${P}-launcher`;
    button.title = title;
    button.setAttribute("aria-label", title);
    button.innerHTML = `${glyphHtml}<span>${escapeHtml(label)}</span>`;
    button.addEventListener("click", onClick);
    const place = (attempt) => {
      const reference = after.map((hostId) => document.getElementById(hostId)).find(Boolean) || forumItem();
      const parent = reference?.parentElement || document.querySelector("#navbar-main-collapse .navbar-right, #navbar-collapse .navbar-right, nav .navbar-right, .navbar .navbar-nav");
      if (!parent) {
        if (attempt < 40) setTimeout(() => place(attempt + 1), 250);
        return;
      }
      const host = document.createElement(/^(?:UL|OL)$/.test(parent.tagName) ? "li" : "span");
      host.id = `${id}-host`;
      host.className = `${P}-launcher-host`;
      if (reference?.parentElement === parent) reference.after(host);
      else parent.appendChild(host);
      host.appendChild(button);
    };
    place(0);
  }

  /* ---------- Hinweise und Dialoge ---------- */

  let toastTimer = 0;
  function toast(message) {
    const root = layer();
    let element = root.querySelector(`.${P}-toast`);
    if (!element) {
      element = document.createElement("div");
      element.className = `${P}-toast`;
      element.setAttribute("role", "status");
      element.setAttribute("aria-live", "polite");
      root.appendChild(element);
    }
    element.textContent = message;
    requestAnimationFrame(() => element.classList.add("is-visible"));
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => element.classList.remove("is-visible"), 3800);
  }

  function showPill(text) {
    const root = layer();
    if (root.querySelector(`.${P}-pill`)) return;
    root.insertAdjacentHTML("beforeend", `<div class="${P}-pill"><i></i><span>${escapeHtml(text)}</span></div>`);
    applyAppearance();
  }

  const dialogs = [];

  // Modaler Dialog im eigenen Ebenen-Element. Esc und Klick auf den Hintergrund
  // schließen immer nur den obersten Dialog.
  function openDialog({ label, size = "md", className = "", onClose } = {}) {
    const host = document.createElement("div");
    host.className = `${P}-modal`;
    host.innerHTML = `<div class="${P}-backdrop" data-action="dialog-dismiss"></div><section class="${P}-dialog is-${size} ${className}" role="dialog" aria-modal="true" aria-label="${escapeHtml(label || "")}"></section>`;
    const dialog = {
      host,
      element: host.lastElementChild,
      isOpen: true,
      render(html) {
        if (dialog.isOpen) dialog.element.innerHTML = html;
      },
      close() {
        if (!dialog.isOpen) return;
        dialog.isOpen = false;
        dialogs.splice(dialogs.indexOf(dialog), 1);
        host.classList.add("is-closing");
        setTimeout(() => host.remove(), layerRoot?.classList.contains(`${P}-lite`) ? 0 : 160);
        deactivate();
        onClose?.();
      },
    };
    dialogs.push(dialog);
    layer().appendChild(host);
    activate();
    return dialog;
  }

  const dialogOf = (element) => dialogs.find((dialog) => dialog.host.contains(element));
  on({ click: { "dialog-dismiss": (element) => dialogOf(element)?.close() } });

  function dialogHead({ kicker = "", title = "", glyph: glyphHtml = "", tools = "" }) {
    return `<header class="${P}-dialog-head"><div class="${P}-dialog-title">${glyphHtml}<div><span>${escapeHtml(kicker)}</span><h2>${escapeHtml(title)}</h2></div></div><div class="${P}-dialog-tools">${tools}<button type="button" class="${P}-icon-btn" data-action="dialog-dismiss" aria-label="Schließen" title="Schließen">${icon("close")}</button></div></header>`;
  }

  // Esc schließt den obersten eigenen Dialog, sonst fragt das Script selbst (z. B. Panel schließen).
  window.addEventListener("keydown", (event) => {
    if (event.key !== "Escape" || event.defaultPrevented || config.ignoreEscape?.()) return;
    if (dialogs.length) dialogs[dialogs.length - 1].close();
    else if (!config.onEscape?.()) return;
    event.preventDefault();
    event.stopPropagation();
  }, true);

  /* ---------- Karten ---------- */

  // Leaflet 1.9: Zeichnet der Canvas-Renderer direkt neu (z. B. beim Einpassen der Ansicht),
  // bleibt ein bereits geplanter Frame bestehen und läuft nach dem Entfernen der Karte ins
  // Leere. Abgesichert wird nur die eigene Leaflet-Kopie des Scripts, nie die des Spiels.
  function Leaflet() {
    const L = globalThis.L;
    if (L?.Canvas && !L.Canvas.prototype.__lssSafeRedraw) {
      const redraw = L.Canvas.prototype._redraw;
      L.Canvas.prototype._redraw = function safeRedraw() {
        if (this._ctx) redraw.call(this);
        else this._redrawRequest = null;
      };
      L.Canvas.prototype.__lssSafeRedraw = true;
    }
    return L;
  }
  const TILES = {
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
    attribution: "Kartenbasis &copy; Esri",
  };

  function tileLayer(options = {}) {
    return Leaflet().tileLayer(TILES.url, { maxZoom: 19, keepBuffer: 3, updateWhenZooming: false, attribution: TILES.attribution, ...options });
  }

  // Laufende Animationen beenden, bevor die Karte entfernt wird (sonst greifen Leaflets
  // Zeitgeber noch auf die entfernte Karte zu).
  function removeMap(map) {
    if (!map) return;
    try {
      map.stop();
      if (map._animatingZoom) map._onZoomTransitionEnd();
    } catch { /* Karte ist bereits entfernt. */ }
    map.remove();
  }

  /* ---------- Gebäudearten ---------- */

  // Je Art: LSS-Gebäudetypen, die einen Standort abdecken, sowie Farbe und Bezeichnung im Bau-Dialog.
  const KINDS = {
    fire: { type: 0, types: [0, 18], color: "#ff6a00", label: "Feuerwache", headline: "Neue Feuerwache", exact: /^feuerwache$/i, pattern: /feuerwache/i },
    rescue: { type: 2, types: [2, 20], color: "#ff3b30", label: "Rettungswache", headline: "Neue Rettungswache", exact: /^rettungswache$/i, pattern: /rettungswache/i },
    hospital: { type: 4, types: [4], color: "#0a84ff", label: "Krankenhaus", headline: "Neues Krankenhaus", exact: /^krankenhaus$/i, pattern: /krankenhaus/i },
    police: { type: 6, types: [6, 19], color: "#1c3f94", label: "Polizeiwache", headline: "Neue Polizeiwache", exact: /^polizeiwache$/i, pattern: /polizeiwache/i },
  };
  const DISPATCH_TYPE = 7;

  const bridgeBuilding = (building) => ({
    id: Number(building.id),
    caption: building.caption,
    building_type: Number(building.building_type),
    latitude: Number(building.latitude),
    longitude: Number(building.longitude),
  });

  /* ---------- Bau-Dialog ---------- */

  const builder = (() => {
    let current = null;
    const listeners = new Set();

    async function open(station, { buildings } = {}) {
      const lat = Number(station?.lat);
      const lon = Number(station?.lon);
      if (!Number.isFinite(lat) || !Number.isFinite(lon)) return;
      current?.dialog.close();
      const kind = KINDS[station.kind] ? station.kind : "fire";
      const name = String(station.name || "Neue Wache").slice(0, 120);
      const build = {
        station: { key: String(station.key || ""), name, kind, label: String(station.label || ""), address: String(station.address || ""), district: String(station.district || "") },
        lat, lon, originLat: lat, originLon: lon, name,
        loading: true, submitting: false, error: "", done: null,
        form: null, fields: {}, submit: null, typeOptions: [], typeValue: "", dispatchOptions: [], dispatchValue: "", extras: [],
        buildings: [], map: null, built: false,
      };
      build.dialog = openDialog({
        label: "Wache bauen",
        size: "sm",
        onClose: () => {
          removeMap(build.map);
          if (current === build) current = null;
        },
      });
      current = build;
      render(build);
      const [form, list] = await Promise.allSettled([
        getHtml("/buildings/new", { priority: true }),
        buildings ? Promise.resolve(buildings) : fetchBuildings({ priority: true }),
      ]);
      if (current !== build) return;
      build.buildings = list.status === "fulfilled" ? list.value : [];
      if (form.status === "fulfilled") parseForm(form.value, build);
      else build.error = `Das Bauformular ist nicht erreichbar: ${form.reason?.message || form.reason}`;
      if (!build.form && !build.error) build.error = "Das Bauformular des Spiels wurde nicht erkannt. Nutze „Im Spielformular öffnen“.";
      build.loading = false;
      render(build);
    }

    function parseForm(html, build) {
      const doc = parseHtml(html);
      const form = doc.querySelector("form#new_building")
        || doc.querySelector('[name="building[latitude]"]')?.closest("form")
        || doc.querySelector('form[action$="/buildings"]');
      if (!form) return;
      const field = (name) => form.querySelector(`[name="building[${name}]"]`);
      const fields = { name: field("name"), type: field("building_type"), dispatch: field("leitstelle_building_id"), lat: field("latitude"), lon: field("longitude"), address: field("address") };
      if (!fields.lat || !fields.lon || !fields.type) return;
      // Gebaut wird ausschließlich mit Credits, nie mit Coins.
      const buttons = [...form.querySelectorAll('input[type="submit"], button[type="submit"], button:not([type])')];
      const buttonText = (button) => `${button.name} ${button.value} ${button.className} ${button.textContent}`.toLowerCase();
      const submit = buttons.find((button) => /credit/.test(buttonText(button)) && !/coin/.test(buttonText(button)))
        || buttons.find((button) => !/coin/.test(buttonText(button)))
        || null;
      if (buttons.length && !submit) {
        build.error = "Im Bauformular wurde kein Bau-Knopf für Credits erkannt.";
        return;
      }
      const options = (select) => (select?.tagName === "SELECT" ? [...select.options].map((option) => ({ value: option.value, label: option.textContent.trim() })) : []);
      const meta = KINDS[build.station.kind];
      build.form = form;
      build.fields = fields;
      build.submit = submit;
      build.typeOptions = options(fields.type);
      const preferred = build.typeOptions.find((option) => meta.exact.test(option.label))
        || build.typeOptions.find((option) => option.value === String(meta.type))
        || build.typeOptions.find((option) => meta.pattern.test(option.label));
      build.typeValue = preferred?.value ?? fields.type.value;
      build.dispatchOptions = options(fields.dispatch);
      const nearest = build.buildings
        .filter((building) => Number(building.building_type) === DISPATCH_TYPE)
        .map((building) => ({ building, distance: haversine(build.lat, build.lon, Number(building.latitude), Number(building.longitude)) }))
        .filter((entry) => Number.isFinite(entry.distance))
        .sort((a, b) => a.distance - b.distance)[0];
      build.dispatchValue = nearest && build.dispatchOptions.some((option) => option.value === String(nearest.building.id))
        ? String(nearest.building.id)
        : fields.dispatch?.value ?? "";
      build.extras = [...form.querySelectorAll("select[name]")]
        .filter((select) => select !== fields.type && select !== fields.dispatch)
        .map((select) => ({
          name: select.name,
          label: (select.id && textOf(doc.querySelector(`label[for="${CSS.escape(select.id)}"]`))) || textOf(select.closest(".form-group")?.querySelector("label")) || select.name,
          options: options(select),
          value: select.value,
          types: fieldBuildingTypes(select, form),
          hidden: hiddenInForm(select, form),
        }));
    }

    // Das Spielformular hat z. B. je Wachentyp ein eigenes „Start Fahrzeug“-Feld und blendet
    // nur das passende ein. Die Zuordnung ergibt sich aus Name, ID und Klassen der Umgebung.
    function fieldBuildingTypes(select, form) {
      const parts = [select.name, select.id];
      for (let node = select.parentElement; node && node !== form; node = node.parentElement) {
        parts.push(node.id, typeof node.className === "string" ? node.className : "", ...Object.values(node.dataset || {}));
      }
      const text = parts.join(" ").toLowerCase();
      const explicit = text.match(/building[_-]?type[_-]?(\d+)/);
      if (explicit) return [Number(explicit[1])];
      const small = /kleinwache|small/.test(text);
      if (/feuer|fire/.test(text)) return [small ? 18 : 0];
      if (/rettung|rescue|ambulance/.test(text)) return [small ? 20 : 2];
      if (/polizei|police/.test(text)) return [small ? 19 : 6];
      return null;
    }

    function hiddenInForm(select, form) {
      for (let node = select; node && node !== form; node = node.parentElement) {
        const className = typeof node.className === "string" ? node.className : "";
        if (node.hidden || /display\s*:\s*none/i.test(node.getAttribute("style") || "") || /(?:^|\s)(?:hidden|d-none)(?:\s|$)/.test(className)) return true;
      }
      return false;
    }

    // Zusatzfelder des gewählten Typs; nie zwei Felder gleicher Beschriftung
    // (passende Typzuordnung vor sichtbaren vor versteckten).
    function applicableExtras(build) {
      const type = Number(build.typeValue);
      const labels = new Set();
      return build.extras
        .map((extra, index) => ({ extra, index, rank: extra.types ? 0 : extra.hidden ? 2 : 1 }))
        .filter(({ extra }) => !extra.types || extra.types.includes(type))
        .sort((a, b) => a.rank - b.rank || a.index - b.index)
        .filter(({ extra }) => {
          const label = extra.label.toLocaleLowerCase("de");
          if (labels.has(label)) return false;
          labels.add(label);
          return true;
        })
        .sort((a, b) => a.index - b.index);
    }

    function nearbyBuilding(build) {
      const types = KINDS[build.station.kind].types;
      return build.buildings
        .filter((building) => types.includes(Number(building.building_type)))
        .map((building) => ({ building, distance: haversine(build.lat, build.lon, Number(building.latitude), Number(building.longitude)) }))
        .filter((entry) => entry.distance <= 400)
        .sort((a, b) => a.distance - b.distance)[0];
    }

    function positionText(build) {
      const shift = haversine(build.originLat, build.originLon, build.lat, build.lon);
      return `${build.lat.toFixed(5)}, ${build.lon.toFixed(5)}${shift >= 5 ? ` · ${formatNumber(Math.round(shift))} m verschoben` : ""}`;
    }

    function render(build) {
      const { station } = build;
      const meta = KINDS[station.kind];
      const head = (kicker, title) => dialogHead({ kicker, title, glyph: glyph(meta.color, "building") });
      removeMap(build.map);
      build.map = null;
      if (build.done) {
        build.dialog.render(`${head(meta.headline, build.done.caption || station.name)}
          <div class="${P}-dialog-body ${P}-center"><div class="${P}-success">${icon("check")}</div>
          <p class="${P}-dialog-text"><b>${escapeHtml(build.done.caption || station.name)}</b> wurde gebaut und ist als erledigt markiert.</p>
          <div class="${P}-actions is-center"><a class="${P}-btn" href="/buildings/${Number(build.done.id)}" target="_blank" rel="noopener">Wache öffnen ${icon("external")}</a><button type="button" class="${P}-btn is-primary" data-action="dialog-dismiss">Fertig</button></div></div>`);
        return;
      }
      if (build.loading) {
        build.dialog.render(`${head("Wache bauen", station.name)}<div class="${P}-dialog-body"><div class="${P}-empty is-small">${spinner()} Bauformular wird geladen …</div></div>`);
        return;
      }
      const position = `<span>Position <b data-build-position>${positionText(build)}</b></span>`;
      build.dialog.render(`${head(`Wache bauen${station.label ? ` · ${station.label}` : ""}`, station.name)}
        <div class="${P}-dialog-body">
          <div data-build-notes></div>
          <div class="${P}-build">
            ${Leaflet() ? `<div class="${P}-build-map" aria-label="Bauposition – Marker kann verschoben werden"></div>` : ""}
            <div class="${P}-build-meta">${position}${station.address ? `<span>Adresse <b>${escapeHtml(station.address)}</b></span>` : ""}${station.district ? `<span>Bezirk <b>${escapeHtml(station.district)}</b></span>` : ""}</div>
            <div class="${P}-build" data-build-fields></div>
            <div class="${P}-actions" data-build-actions></div>
          </div>
        </div>`);
      initMap(build);
      refresh(build);
    }

    // Aktualisiert Hinweise, Felder und Knöpfe – die Karte bleibt dabei bestehen.
    function refresh(build) {
      const element = build.dialog.element;
      const notes = element.querySelector("[data-build-notes]");
      if (!notes) return;
      const nearby = nearbyBuilding(build);
      notes.innerHTML = (build.error ? note("error", escapeHtml(build.error)) : "")
        + (nearby ? note("warn", `In ${formatNumber(Math.round(nearby.distance))} m Entfernung steht bereits <b>${escapeHtml(nearby.building.caption)}</b>.`) : "");
      const fields = element.querySelector("[data-build-fields]");
      if (build.form) {
        const moreOpen = Boolean(fields.querySelector("details")?.open);
        const maxLength = Number(build.fields.name?.maxLength) > 0 ? Number(build.fields.name.maxLength) : 120;
        const extras = applicableExtras(build).filter(({ extra }) => extra.options.length > 1);
        fields.innerHTML = `<label class="${P}-field"><span>Name</span><input type="text" data-input="kit-build-field" data-field="name" maxlength="${maxLength}" value="${escapeHtml(build.name)}"></label>
          <div class="${P}-build-row">
            ${build.typeOptions.length ? `<label class="${P}-field"><span>Gebäudetyp</span>${selectHtml('data-change="kit-build-type" data-field="type"', build.typeOptions, build.typeValue)}</label>` : ""}
            ${build.dispatchOptions.length ? `<label class="${P}-field"><span>Leitstelle</span>${selectHtml('data-change="kit-build-field" data-field="dispatch"', build.dispatchOptions, build.dispatchValue)}</label>` : ""}
          </div>
          ${extras.length ? `<details class="${P}-more"${moreOpen ? " open" : ""}><summary>Weitere Optionen</summary><div>${extras.map(({ extra, index }) => `<label class="${P}-field"><span>${escapeHtml(extra.label)}</span>${selectHtml(`data-change="kit-build-field" data-extra="${index}"`, extra.options, extra.value)}</label>`).join("")}</div></details>` : ""}`;
      } else {
        fields.innerHTML = "";
      }
      element.querySelector("[data-build-actions]").innerHTML = `<button type="button" class="${P}-btn" data-action="kit-build-native">Im Spielformular öffnen</button>
        <button type="button" class="${P}-btn" data-action="dialog-dismiss">Abbrechen</button>
        ${build.form ? `<button type="button" class="${P}-btn is-primary" data-action="kit-build-submit"${build.submitting ? " disabled" : ""}>${build.submitting ? `${spinner()} Wird gebaut …` : "Mit Credits bauen"}</button>` : ""}`;
    }

    function initMap(build) {
      const L = Leaflet();
      const container = build.dialog.element.querySelector(`.${P}-build-map`);
      if (!L || !container) return;
      const map = L.map(container, { zoomControl: false, attributionControl: false }).setView([build.lat, build.lon], 16);
      tileLayer().addTo(map);
      L.circleMarker([build.originLat, build.originLon], { radius: 5, color: "#8e8e93", fillOpacity: 0.6, weight: 1 }).addTo(map);
      const marker = L.marker([build.lat, build.lon], {
        draggable: true,
        keyboard: false,
        icon: L.divIcon({ className: `${P}-drag-pin`, html: `<div style="--pin:${KINDS[build.station.kind].color}"></div>`, iconSize: [26, 26], iconAnchor: [13, 13] }),
      }).addTo(map);
      marker.on("dragend", () => {
        const position = marker.getLatLng();
        build.lat = position.lat;
        build.lon = position.lng;
        const label = build.dialog.element.querySelector("[data-build-position]");
        if (label) label.textContent = positionText(build);
        refresh(build);
      });
      build.map = map;
      setTimeout(() => map.invalidateSize(), 60);
    }

    function readInputs(build) {
      const element = build.dialog.element;
      const value = (selector) => element.querySelector(selector)?.value;
      build.name = value('[data-field="name"]') ?? build.name;
      build.typeValue = value('[data-field="type"]') ?? build.typeValue;
      build.dispatchValue = value('[data-field="dispatch"]') ?? build.dispatchValue;
      for (const select of element.querySelectorAll("[data-extra]")) {
        const extra = build.extras[Number(select.dataset.extra)];
        if (extra) extra.value = select.value;
      }
    }

    async function submit() {
      const build = current;
      if (!build?.form || build.submitting) return;
      readInputs(build);
      if (!build.name.trim()) {
        build.error = "Bitte einen Namen eingeben.";
        refresh(build);
        return;
      }
      build.submitting = true;
      build.error = "";
      refresh(build);
      try {
        const { form, fields } = build;
        if (fields.name) fields.name.value = build.name.trim();
        if (fields.type && build.typeValue !== "") fields.type.value = build.typeValue;
        if (fields.dispatch) fields.dispatch.value = build.dispatchValue;
        fields.lat.value = build.lat.toFixed(7);
        fields.lon.value = build.lon.toFixed(7);
        if (fields.address && build.station.address) fields.address.value = build.station.address;
        // Nur die Zusatzfelder des gewählten Typs mitsenden; deaktivierte Felder lässt FormData weg.
        const applicable = new Set(applicableExtras(build).map(({ extra }) => extra.name));
        for (const extra of build.extras) {
          const select = form.querySelector(`select[name="${CSS.escape(extra.name)}"]`);
          if (!select) continue;
          select.disabled = !applicable.has(extra.name);
          select.value = extra.value;
        }
        const knownIds = new Set(build.buildings.map((building) => Number(building.id)));
        const response = await submitForm(form, build.submit?.name ? [[build.submit.name, build.submit.value || "1"]] : []);
        const answer = await response.text().catch(() => "");
        const created = createdFromResponse(response, knownIds, build) || await confirmCreated(knownIds, build.lat, build.lon);
        if (!created) throw new Error(formErrorText(answer) || "Das Spiel hat keine neue Wache bestätigt. Prüfe deine Credits oder nutze „Im Spielformular öffnen“.");
        build.done = created;
        for (const listener of listeners) listener(created, build.station);
      } catch (error) {
        build.error = `Bauen fehlgeschlagen: ${error.message}`;
      } finally {
        build.submitting = false;
        if (current === build) {
          if (build.done) render(build);
          else refresh(build);
        }
      }
    }

    // Leitet das Spiel nach dem Bauen auf die neue Wache weiter, steht ihre ID schon fest.
    function createdFromResponse(response, knownIds, build) {
      const id = Number(String(response.url || "").match(/\/buildings\/(\d+)(?:[/?#]|$)/)?.[1]);
      if (!id || knownIds.has(id)) return null;
      return { id, caption: build.name.trim(), building_type: Number(build.typeValue), latitude: build.lat, longitude: build.lon };
    }

    async function confirmCreated(knownIds, lat, lon) {
      for (const wait of [600, 1500, 3000]) {
        await sleep(wait);
        const list = await fetchBuildings({ priority: true, retries: 0 }).catch(() => []);
        const created = list.find((building) => !knownIds.has(Number(building.id)) && haversine(lat, lon, Number(building.latitude), Number(building.longitude)) <= 250);
        if (created) return created;
      }
      return null;
    }

    function formErrorText(html) {
      return [...parseHtml(html).querySelectorAll(".alert-danger, .alert-error, #error_explanation, .has-error .help-block, .help-block.error")]
        .map(textOf)
        .filter(Boolean)
        .join(" · ")
        .slice(0, 260);
    }

    // Ausweichweg: füllt das originale Bauformular des Spiels aus; gebaut wird über dessen Knopf.
    async function openNative() {
      const build = current;
      if (!build) return;
      readInputs(build);
      const { lat, lon, name, typeValue, dispatchValue, station } = build;
      build.dialog.close();
      config.onNativeBuild?.();
      const trigger = document.querySelector('#build_new_building, a[href="/buildings/new"], a[href$="/buildings/new"]');
      if (!trigger) {
        try { await navigator.clipboard.writeText(`${lat.toFixed(6)}, ${lon.toFixed(6)}`); } catch { /* Kopieren ist optional. */ }
        toast("Knopf „Neues Gebäude bauen“ nicht gefunden – die Koordinaten wurden kopiert.");
        return;
      }
      trigger.click();
      let form = null;
      for (let attempt = 0; attempt < 40 && !form; attempt += 1) {
        await sleep(150);
        form = document.querySelector('[name="building[latitude]"]')?.closest("form") || null;
      }
      if (!form) {
        toast("Das Spielformular wurde nicht rechtzeitig geladen.");
        return;
      }
      const setField = (fieldName, value) => {
        const field = form.querySelector(`[name="building[${fieldName}]"]`);
        if (!field || value === undefined || value === "") return;
        field.value = value;
        field.dispatchEvent(new Event("input", { bubbles: true }));
        field.dispatchEvent(new Event("change", { bubbles: true }));
      };
      setField("building_type", typeValue);
      setField("name", name);
      setField("leitstelle_building_id", dispatchValue);
      setField("latitude", lat.toFixed(7));
      setField("longitude", lon.toFixed(7));
      setField("address", station.address);
      try { pageWindow.map?.setView?.([lat, lon], 17); } catch { /* Die Spielkarte ist optional. */ }
      form.scrollIntoView({ block: "center", behavior: "smooth" });
      toast("Spielformular ausgefüllt – Position prüfen und im Spiel bauen.");
    }

    on({
      click: {
        "kit-build-submit": () => void submit(),
        "kit-build-native": () => void openNative(),
      },
      change: {
        "kit-build-type": () => {
          if (!current) return;
          readInputs(current);
          refresh(current);
        },
        "kit-build-field": () => current && readInputs(current),
      },
      input: {
        "kit-build-field": () => current && readInputs(current),
      },
    });

    return {
      open,
      onBuilt: (listener) => listeners.add(listener),
      isOpen: () => Boolean(current),
    };
  })();

  /* ---------- Zustimmung und Wachenplaner-Webseite ---------- */

  function requestConsent({ key, kicker, text }) {
    if (session.get(key) === "1") return Promise.resolve(true);
    return new Promise((resolve) => {
      let answered = false;
      const dialog = openDialog({ label: "Abgleich erlauben?", size: "sm", onClose: () => answered || resolve(false) });
      dialog.allow = () => {
        answered = true;
        session.set(key, "1");
        dialog.close();
        resolve(true);
      };
      dialog.render(`${dialogHead({ kicker, title: "Abgleich erlauben?", glyph: glyph("#007aff", "map") })}
        <div class="${P}-dialog-body"><p class="${P}-dialog-text">${text}</p>
        <div class="${P}-actions"><button type="button" class="${P}-btn" data-action="dialog-dismiss">Ablehnen</button><button type="button" class="${P}-btn is-primary" data-action="kit-consent-allow">Erlauben</button></div></div>`);
    });
  }

  on({ click: { "kit-consent-allow": (element) => dialogOf(element)?.allow?.() } });

  // Die Webversion des Wachenplaners öffnet das Spiel mit ?lssfo=planner. Nachrichten werden
  // nur vom öffnenden Fenster angenommen; Gebäudedaten gehen erst nach Zustimmung hinaus.
  function startBridge({ sessionKey, consentKey, pill, kicker, consentText, delay = 0, shouldYield }) {
    let opener = null;
    try {
      let active = new URLSearchParams(location.search).get("lssfo") === "planner";
      if (active) session.set(sessionKey, "1");
      else active = session.get(sessionKey) === "1";
      opener = active && window.opener && !window.opener.closed ? window.opener : null;
    } catch {
      opener = null;
    }
    if (!opener) return;
    // Der Wachenplaner läuft oft als lokale Datei (Herkunft „null“), daher "*".
    // Empfänger ist ausschließlich das Fenster, das diesen Tab geöffnet hat.
    const send = (message) => {
      try { opener.postMessage({ source: "lssfo-game", ...message }, "*"); } catch { /* Webseite wurde geschlossen. */ }
    };
    const onMessage = async (event) => {
      if (event.source !== opener || event.data?.source !== "lssfo-planner") return;
      if (event.data.type === "lssfo-build") void builder.open(event.data.station);
      if (event.data.type !== "lssfo-sync") return;
      if (!(await requestConsent({ key: consentKey, kicker, text: consentText }))) {
        send({ type: "lssfo-denied" });
        return;
      }
      try {
        const buildings = await fetchBuildings({ priority: true });
        send({ type: "lssfo-buildings", buildings: buildings.map(bridgeBuilding) });
        toast(`${plural(buildings.length, "Gebäude", "Gebäude")} an die Wachenplaner-Webseite übertragen`);
      } catch (error) {
        toast(`Abgleich fehlgeschlagen: ${error.message}`);
      }
    };
    const begin = () => {
      if (shouldYield?.()) return;
      document.documentElement.dataset.lssPlannerBridge = P;
      showPill(pill);
      window.addEventListener("message", onMessage);
      builder.onBuilt((building, station) => send({ type: "lssfo-built", stationKey: station.key, building: bridgeBuilding(building) }));
      send({ type: "lssfo-ready" });
    };
    if (delay) setTimeout(begin, delay);
    else begin();
  }

  return {
    prefix: P,
    pageWindow,
    // Formatierung
    escapeHtml, formatNumber, formatDecimal, formatDistance, formatDateTime, plural, textOf, collator, haversine,
    // Ablauf
    sleep, isAbort, abortError, store, session,
    // Netzwerk
    request, getHtml, getJson, submitForm, post, fetchBuildings, externalJson, parseHtml, csrfToken, gmResource,
    // Oberfläche
    createRoot, layer, on, activate, deactivate, setAppearance, applyAppearance, icon, badge, glyph, note, spinner, selectHtml,
    mountLauncher, toast, showPill, openDialog, dialogOf, dialogHead,
    // Karten und Bauen
    Leaflet, tileLayer, removeMap, KINDS, DISPATCH_TYPE, bridgeBuilding, build: builder, startBridge,
  };
}

if (typeof module === "object" && module.exports) module.exports = { createKit };
