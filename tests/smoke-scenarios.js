"use strict";

// Abläufe für tests/browser-smoke.js. Jede run-Funktion läuft in der Testseite;
// t bietet until / check / click / change / key (siehe browser-smoke.js).

module.exports = [
  {
    id: "verwaltung",
    name: "LSS Verwaltung",
    page: "lss_verwaltung/tests/fixture.html",
    async run(t) {
      const launcher = await t.until(() => t.$("#lssfo-launcher"), "Symbol in der Navigationsleiste");
      t.check(t.$("#lssfo-launcher-host")?.previousElementSibling?.classList.contains("dropdown"), "Symbol sitzt rechts neben dem Forum-Menü");
      t.check(!t.$("#lssfo-style") && !t.$("#lssfo-shell"), "Oberfläche und Stylesheet entstehen erst beim Öffnen");
      t.click(launcher);
      await t.until(() => t.$('[data-tab-count="vehicles"]')?.textContent === "3", "Daten geladen (3 Fahrzeuge)");
      t.check(t.$("#lssfo-style"), "Stylesheet nach dem Öffnen eingefügt");

      for (const tab of ["dashboard", "vehicles", "edit", "buildings", "regions", "extensions", "utilization", "personnel", "training", "courses", "map"]) {
        t.click(`#lssfo-shell [data-tab="${tab}"]`);
        await t.until(() => t.$(`#lssfo-shell [data-tab="${tab}"]`).classList.contains("is-active") && t.$("#lssfo-shell [data-ref=content]").children.length, `Bereich „${tab}“`);
      }
      t.check(t.$$("#lssfo-shell .lssfo-dash-card").length === 0, "Bereichswechsel ersetzt den Inhalt");

      const canvas = await t.until(() => t.$(".lssfo-map-canvas.leaflet-container"), "Karte aufgebaut");
      t.check(t.$$(".lssfo-map-item").length === 4, "Kartenliste mit 4 Gebäuden");
      t.change('[data-change="map-filter"][data-filter="buildingType"]', "0");
      await t.until(() => t.$$(".lssfo-map-item").length === 1, "Kartenfilter Wachenart");
      t.check(t.$(".lssfo-map-canvas") === canvas, "Karte bleibt beim Filtern bestehen");
      t.click('[data-action="map-filter-reset"]');
      await t.until(() => t.$$(".lssfo-map-item").length === 4, "Kartenfilter zurückgesetzt");
      t.click('[data-action="map-focus"][data-id="20"]');
      await t.until(() => t.$(".lssfo-popup"), "Karten-Popup mit Fahrzeugen");

      t.click('#lssfo-shell [data-tab="vehicles"]');
      await t.until(() => t.$$("#lssfo-shell .lssfo-table tbody tr").length === 3, "Fahrzeugtabelle");
      const firstAssigned = () => t.$("#lssfo-shell .lssfo-table tbody tr td:nth-child(5)").textContent.trim();
      t.click('#lssfo-shell [data-action="table-sort"][data-column="4"]');
      await t.until(() => firstAssigned() === "1", "Sortierung aufsteigend");
      t.click('#lssfo-shell [data-action="table-sort"][data-column="4"]');
      await t.until(() => firstAssigned() === "9", "Sortierung absteigend");
      const search = t.$('[data-input="search"]');
      t.change(search, "rettung");
      await t.until(() => t.$$("#lssfo-shell .lssfo-table tbody tr").length === 1, "Suche filtert");
      t.change(search, "");
      await t.until(() => t.$$("#lssfo-shell .lssfo-table tbody tr").length === 3, "Suche zurückgesetzt");

      t.click('[data-action="manage-vehicle"][data-id="101"]');
      await t.until(() => t.$$('#lssfo-layer [data-action="person-toggle"]').length === 2, "Fahrzeugverwaltung mit Personal");
      t.click(t.$$('#lssfo-layer [data-action="person-toggle"]').find((button) => button.textContent.includes("Zuweisen")));
      await t.until(() => t.$("#lssfo-layer .lssfo-note.is-success")?.textContent.includes("zugewiesen"), "Person zugewiesen");
      t.key("Escape");
      await t.until(() => !t.$("#lssfo-layer .lssfo-dialog"), "Esc schließt nur den Dialog");
      t.check(!t.$("#lssfo-shell").hidden, "Panel bleibt offen");

      t.click('#lssfo-shell [data-tab="buildings"]');
      t.click(await t.until(() => t.$('#lssfo-shell [data-action="building-status"][data-id="20"]'), "Wachenliste"));
      await t.until(() => t.$('#lssfo-shell [data-action="building-status"][data-id="20"]')?.textContent.includes("Aktivieren"), "Wache deaktiviert");
      t.click('[data-action="manage-building"][data-id="20"]');
      await t.until(() => t.$('#lssfo-layer [data-manager="dispatch"]'), "Wachenverwaltung mit Leitstelle");
      t.check(t.$$("#lssfo-layer .lssfo-station-vehicles article").length === 2, "Fahrzeuge der Wache");
      t.change('#lssfo-layer [data-manager="name"]', "Feuerwache Mitte");
      t.click('#lssfo-layer [data-action="manager-save"]');
      await t.until(() => t.$("#lssfo-layer .lssfo-note.is-success"), "Wache gespeichert");
      t.key("Escape");
      await t.until(() => t.$$("#lssfo-shell .lssfo-table a").some((link) => link.textContent === "Feuerwache Mitte"), "Neuer Name in der Liste");

      t.click('#lssfo-shell [data-tab="edit"]');
      await t.until(() => t.$('[data-field="caption"][data-id="103"]'), "Bearbeiten-Tabelle");
      t.change('[data-field="caption"][data-id="103"]', "RTW Nord");
      t.check(t.$('[data-tab-count="edit"]').textContent === "1", "Änderung wird gezählt");
      t.click('[data-action="edit-options"][data-id="103"]');
      await t.until(() => t.$('select[data-field="type"][data-id="103"]'), "Umbau-Auswahl geladen");
      t.check(t.$('[data-field="caption"][data-id="103"]').value === "RTW Nord", "Änderung bleibt beim Neuzeichnen erhalten");
      t.click('[data-action="edit-save"]');
      await t.until(() => t.$('[data-edit-status="103"]')?.textContent.includes("gespeichert"), "Fahrzeug gespeichert");

      t.click('[data-action="edit-options"][data-id="102"]');
      t.click(await t.until(() => t.$('[data-action="refit-open"][data-id="102"]'), "Umrüsten verfügbar"));
      await t.until(() => t.$$('#lssfo-layer [data-input="refit-field"]').length === 3, "Umrüst-Formular mit drei Werten");
      t.click('#lssfo-layer [data-action="refit-confirm"]');
      t.click(await t.until(() => t.$('#lssfo-layer [data-action="refit-submit"]'), "Rückfrage vor dem Umrüsten"));
      await t.until(() => window.lastRefitRequest, "Umrüstung gesendet");
      t.check(window.lastRefitRequest.credits === "1" && !("coins" in window.lastRefitRequest), "Nur mit Credits umgerüstet");
      t.key("Escape");

      t.click('#lssfo-shell [data-action="scan"]');
      await t.until(() => t.$('#lssfo-shell [data-tab="training"]').classList.contains("is-active"), "Ausbildungsprüfung abgeschlossen");
      t.check(!/abgebrochen/.test(t.$("#lssfo-shell [data-ref=status]").textContent), "Ausbildungsprüfung ohne Fehler");
      const checked = t.$$("#lssfo-shell .lssfo-table tbody tr td:last-child").map((cell) => cell.textContent.trim());
      t.check(checked.length && checked.every((text) => /^(\d+) \/ \1$/.test(text)), `Alle Fahrzeuge geprüft (${checked.join(" · ")})`);
      t.click('#lssfo-shell [data-tab="personnel"]');
      t.click(await t.until(() => t.$('#lssfo-shell [data-action="scan-personnel"]'), "Personalprüfung"));
      await t.until(() => !t.$("#lssfo-shell [data-ref=status] .lssfo-spinner"), "Personalprüfung beendet");
      t.check(t.$("#lssfo-shell .lssfo-transfers .lssfo-note.is-success"), "Personal geprüft");

      let download = null;
      const click = HTMLAnchorElement.prototype.click;
      HTMLAnchorElement.prototype.click = function capture() { download = this.download; };
      t.click('#lssfo-shell [data-action="export"]');
      HTMLAnchorElement.prototype.click = click;
      t.check(download?.startsWith("lss-personnel-"), "CSV-Export der Ansicht");

      t.change('[data-change="theme"]', "light");
      t.check(t.$("#lssfo-shell").dataset.theme === "light", "Design „Hell“");
      t.change('[data-change="effects"]', "reduced");
      t.check(t.$("#lssfo-shell").classList.contains("lssfo-lite"), "Effekte „Sparsam“");
      t.change('[data-change="effects"]', "auto");
      t.change('[data-change="theme"]', "auto");
      t.key("Escape");
      await t.until(() => t.$("#lssfo-shell").hidden, "Esc schließt das Panel");
    },
  },
  {
    id: "verwaltung-big",
    name: "LSS Verwaltung mit Belastungsdaten (900 Wachen)",
    page: "lss_verwaltung/tests/fixture.html?big=900",
    async run(t) {
      t.click(await t.until(() => t.$("#lssfo-launcher"), "Symbol in der Navigationsleiste"));
      const started = performance.now();
      await t.until(() => Number(t.$('[data-tab-count="vehicles"]')?.textContent.replace(/\./g, "")) > 3000, "Daten geladen", 30000);
      t.check(true, `Laden und Auswerten: ${Math.round(performance.now() - started)} ms (inkl. nachgebildeter Netzwerkanfragen)`);
      const timings = [];
      for (const tab of ["vehicles", "buildings", "regions", "extensions", "utilization", "personnel", "training", "map", "dashboard"]) {
        const begin = performance.now();
        t.click(`#lssfo-shell [data-tab="${tab}"]`);
        await t.until(() => t.$(`#lssfo-shell [data-tab="${tab}"]`).classList.contains("is-active"), `Bereich „${tab}“`);
        timings.push([tab, Math.round(performance.now() - begin)]);
      }
      t.check(timings.every(([, ms]) => ms < 1500), `Bereichswechsel: ${timings.map(([tab, ms]) => `${tab} ${ms} ms`).join(", ")}`);
      t.click('#lssfo-shell [data-tab="vehicles"]');
      t.check(t.$$("#lssfo-shell .lssfo-table tbody tr").length === 200, "Große Tabellen zeichnen zunächst 200 Zeilen");
      const search = t.$('[data-input="search"]');
      const begin = performance.now();
      t.change(search, "rettungswache 1");
      await t.until(() => t.$$("#lssfo-shell .lssfo-table tbody tr").length < 200, "Suche über alle Fahrzeuge");
      t.check(true, `Suche inkl. 180 ms Tippverzögerung: ${Math.round(performance.now() - begin)} ms`);
      t.key("Escape");
    },
  },
  {
    id: "planner",
    name: "LSS Wachenplaner Österreich",
    page: "lss_einsatzkarte/tests/fixture.html",
    async run(t) {
      const launcher = await t.until(() => t.$("#lsswp-launcher"), "Symbol in der Navigationsleiste");
      t.check(!t.$("#lsswp-style") && !t.$("#lsswp"), "Karte, Daten und Stylesheet entstehen erst beim Öffnen");
      t.click(launcher);
      await t.until(() => /von .* Standorten gebaut/.test(t.$('#lsswp [data-ref="syncTitle"]')?.textContent || ""), "Eigene Gebäude automatisch abgeglichen");
      t.check(document.documentElement.classList.contains("lsswp-open"), "Spielseite darunter ausgeblendet");
      t.check(t.$$("#lsswp .lsswp-org").length === 10, "Zehn Organisationen");
      t.check(t.$("#lsswp .leaflet-marker-icon"), "Marker auf der Karte");

      t.click('#lsswp [data-action="status"][data-value="missing"]');
      t.check(t.$('#lsswp [data-ref="hideBuilt"]').checked, "Status „Fehlt“ und Kartenschalter sind gekoppelt");
      t.click('#lsswp [data-action="status"][data-value="all"]');
      t.check(!t.$('#lsswp [data-ref="hideBuilt"]').checked, "Status „Alle“");

      t.click('#lsswp [data-action="select-all"]');
      t.check(t.$$('#lsswp [data-change="org"]').every((input) => !input.checked), "Alle Organisationen aus");
      t.change(t.$('#lsswp [data-change="org"][value="fire-volunteer"]'), true);
      t.change('#lsswp [data-ref="state"]', "Niederösterreich");
      await t.until(() => !t.$('#lsswp [data-ref="district"]').disabled, "Bezirksauswahl freigeschaltet");
      t.click('#lsswp [data-action="view"][data-value="missing"]');
      await t.until(() => t.$$("#lsswp .lsswp-missing-item").length === 80, "Erste 80 fehlende Standorte");
      t.check(/fehlen in Niederösterreich/.test(t.$('#lsswp [data-ref="missingTitle"]').textContent), "Titel nennt das Gebiet");
      t.click('#lsswp [data-action="more"]');
      await t.until(() => t.$$("#lsswp .lsswp-missing-item").length === 160, "Weitere anzeigen");
      t.change('#lsswp [data-ref="radius"]', "1000");
      await t.until(() => t.$('#lsswp [data-ref="radiusLabel"]').textContent === "1 km", "Umkreis einstellbar");

      await t.sleep(400); // Neuabgleich nach der Umkreisänderung läuft verzögert.
      const builtCount = () => Number(t.$('#lsswp [data-ref="syncTitle"]').textContent.match(/^([\d.]+) von/)[1].replace(/\./g, ""));
      const before = builtCount();
      t.click(t.$("#lsswp .lsswp-missing-item [data-action='build']"));
      await t.until(() => t.$('#lsswp-layer [data-action="kit-build-submit"]'), "Bau-Dialog mit Spielformular");
      t.check(t.$('#lsswp-layer [data-field="type"]').value === "0", "Feuerwache vorgewählt");
      t.check(t.$('#lsswp-layer [data-field="dispatch"]').value === "30", "Nächste Leitstelle vorgewählt");
      t.check(t.$$('#lsswp-layer [data-extra]').length === 1, "Nur das passende Startfahrzeug-Feld");
      t.change('#lsswp-layer [data-field="type"]', "18");
      t.check(t.$$('#lsswp-layer [data-extra]').length === 1 && t.$("#lsswp-layer .lsswp-build-map.leaflet-container"), "Typwechsel tauscht das Feld, Karte bleibt");
      t.change('#lsswp-layer [data-field="type"]', "0");
      t.click('#lsswp-layer [data-action="kit-build-submit"]');
      await t.until(() => window.lastBuildRequest, "Bauauftrag gesendet");
      t.check(window.lastBuildRequest.build_with_credits && !("build_with_coins" in window.lastBuildRequest), "Nur mit Credits gebaut");
      t.check(window.lastBuildRequest["building[start_vehicle_feuerwache]"] !== undefined && !("building[start_vehicle_feuerwache_kleinwache]" in window.lastBuildRequest), "Nur das Startfahrzeug des gewählten Typs gesendet");
      await t.until(() => t.$("#lsswp-layer .lsswp-success"), "Neue Wache bestätigt");
      t.key("Escape");
      await t.until(() => !t.$("#lsswp-layer .lsswp-dialog"), "Esc schließt den Bau-Dialog");
      await t.until(() => builtCount() === before + 1, "Neue Wache zählt sofort als gebaut");

      t.change('#lsswp [data-change="theme"]', "dark");
      t.check(t.$("#lsswp").dataset.theme === "dark", "Design „Dunkel“");
      t.change('#lsswp [data-change="effects"]', "reduced");
      t.check(t.$("#lsswp").classList.contains("lsswp-lite"), "Effekte „Sparsam“");
      t.change('#lsswp [data-change="effects"]', "auto");
      t.change('#lsswp [data-change="theme"]', "auto");
      t.key("Escape");
      await t.until(() => t.$("#lsswp").hidden && !document.documentElement.classList.contains("lsswp-open"), "Esc schließt den Planer");
    },
  },
  {
    id: "bridge",
    name: "Verbindung zur Wachenplaner-Webseite",
    page: "lss_einsatzkarte/tests/fixture.html",
    async run(t) {
      const messages = [];
      window.addEventListener("message", (event) => {
        if (event.data?.source === "lssfo-game") messages.push(event.data);
      });
      const game = window.open(`${location.pathname}?lssfo=planner`, "lssfo-game");
      t.check(game, "Spiel-Tab geöffnet");
      await t.until(() => messages.some((message) => message.type === "lssfo-ready"), "Spiel meldet sich bereit");
      t.check(game.document.querySelector("#lsswp-layer .lsswp-pill"), "Verbindungsanzeige im Spiel");
      game.postMessage({ source: "lssfo-planner", type: "lssfo-sync" }, "*");
      (await t.until(() => game.document.querySelector('#lsswp-layer [data-action="kit-consent-allow"]'), "Zustimmung wird erfragt")).click();
      const synced = await t.until(() => messages.find((message) => message.type === "lssfo-buildings"), "Gebäude übertragen");
      t.check(synced.buildings.length === 3 && Object.keys(synced.buildings[0]).join() === "id,caption,building_type,latitude,longitude", "Nur Name, Typ und Position übertragen");
      game.postMessage({ source: "lssfo-planner", type: "lssfo-build", station: { key: "bev-1", name: "FF Teststadt", lat: 48.3, lon: 16.4, kind: "fire", label: "Freiwillige Feuerwehr" } }, "*");
      (await t.until(() => game.document.querySelector('#lsswp-layer [data-action="kit-build-submit"]'), "Bau-Dialog im Spiel")).click();
      const built = await t.until(() => messages.find((message) => message.type === "lssfo-built"), "Bau an die Webseite gemeldet");
      t.check(built.stationKey === "bev-1" && built.building.caption === "FF Teststadt", "Standort und neue Wache zurückgemeldet");
      game.close();
    },
  },
];
