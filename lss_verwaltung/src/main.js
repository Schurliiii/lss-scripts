/*
 * Start: Eintrag in der Navigationsleiste, eigenes Fenster (?lssfo=dashboard) und
 * Verbindung zur Wachenplaner-Webseite. Mehr passiert beim Laden einer Spielseite nicht.
 */

// Überbleibsel aus Version 1.0 (große Daten lagen damals im knappen localStorage).
try { localStorage.removeItem("lssfo-cache-v2"); } catch { /* Speicher kann gesperrt sein. */ }

kit.mountLauncher({ id: "lssfo-launcher", title: "LSS Verwaltung öffnen", label: "LSS Verwaltung", glyph: brandGlyph(), onClick: openDashboard });

if (STANDALONE) {
  document.documentElement.classList.add("lssfo-standalone");
  setTimeout(openDashboard, 0);
}

kit.startBridge({
  sessionKey: "lssfo-planner",
  consentKey: "lssfo-planner-consent",
  pill: "Wachenplaner verbunden",
  kicker: "Wachenplaner",
  consentText: "Der Wachenplaner möchte deine Gebäude abgleichen, um anzuzeigen, welche echten Standorte du noch nicht gebaut hast. Übertragen werden nur <b>Name, Typ und Position</b> deiner Gebäude – an den Tab, der dieses Fenster geöffnet hat.",
});

// Über den Bau-Dialog neu gebaute Wachen sofort übernehmen.
kit.build.onBuilt((building) => {
  if (!state.data.buildings.length) return;
  state.data.buildings.push(building);
  analyze();
  render();
  saveData();
});
