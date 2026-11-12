# LSS Scripts

Zwei unabhängige Tampermonkey-Scripts für [leitstellenspiel.de](https://www.leitstellenspiel.de). Beide laufen einzeln oder zusammen.

| | Script | Wofür | Installieren |
|---|---|---|---|
| <img src="lss_verwaltung/assets/icon.png" width="32" alt=""> | **LSS Verwaltung** | Fuhrpark, Personal, Wachen, Ausbildungen, Ausbauten, Auslastung und Karte auf einen Blick – mit Bearbeitung direkt im Panel. Für alle Spieler. | [**Installieren**](https://raw.githubusercontent.com/Schurliiii/lss-scripts/main/lss_verwaltung/dist/lss-verwaltung.user.js) |
| <img src="lss_einsatzkarte/assets/icon.png" width="32" alt=""> | **LSS Wachenplaner Österreich** | Alle echten Feuerwehr- und Rettungsstandorte (5.537), Polizeiinspektionen (797) und Akutspitäler (125) Österreichs: zeigt, welche du schon gebaut hast, welche fehlen, und baut fehlende per Klick. | [**Installieren**](https://raw.githubusercontent.com/Schurliiii/lss-scripts/main/lss_einsatzkarte/dist/lss-wachenplaner.user.js) |

## Installation

1. [Tampermonkey](https://www.tampermonkey.net/) im Browser installieren.
2. Oben bei dem gewünschten Script auf **Installieren** klicken und in Tampermonkey bestätigen.
3. Leitstellenspiel neu laden. Die Symbole erscheinen in der Navigationsleiste.

## Updates

Tampermonkey prüft regelmäßig auf neue Versionen und zeigt sie an – ein Klick auf **Aktualisieren** genügt. Sofort prüfen: Tampermonkey-Dashboard → **Nach Userscript-Updates suchen**. Was sich geändert hat, steht im [Changelog](CHANGELOG.md).

## Rücksicht auf Spiel und Rechner

Beide Scripts sind so gebaut, dass sie weder das Spiel bremsen noch die Server belasten:

- **Nur auf der Hauptseite, nie in Spielfenstern.** In den Einsatz-, Fahrzeug- und Wachenfenstern (Lightbox) laufen die Scripts gar nicht. Auf der Hauptseite entsteht beim Laden nur das Symbol in der Navigationsleiste; Fenster, Karte, Daten und Stylesheets folgen erst beim ersten Öffnen.
- **Gedrosselte Anfragen.** Alle Anfragen an das Spiel laufen durch eine gemeinsame Warteschlange: höchstens zwei gleichzeitig, mindestens 250 ms Abstand, automatische Pause bei Überlastung. Prüfungen, die viele Seiten lesen (Ausbildungen, Personal), starten nur auf ausdrücklichen Klick und lassen sich jederzeit stoppen.
- **Zwischenspeicher.** Spieldaten werden fünf Minuten, der öffentliche Fahrzeugkatalog zwölf Stunden lokal gespeichert.
- **Nichts ohne Bestätigung.** Gebaut, umgerüstet oder gespeichert wird nur nach Klick auf den jeweiligen Knopf – bezahlt wird ausschließlich mit Credits, nie mit Coins.
- **Sparsamer Modus.** „Effekte: Sparsam“ (bzw. automatisch auf schwächeren Rechnern) schaltet Glas-Unschärfe und Animationen ab.

## Für Entwickler

```text
shared/            gemeinsamer Unterbau beider Scripts
  kit.js           Anfragen-Warteschlange, Dialoge, Design, Bau-Dialog, Webseiten-Brücke
  kit.css          gemeinsame Gestaltung (Präfix __P__ wird beim Bauen ersetzt)
  launcher.css     Symbol in der Navigationsleiste (einziges Stylesheet beim Seitenaufbau)
  build.js         Kopfblock, Update-Adressen, Bündeln
lss_verwaltung/
  src/             core.js (Rechenkern, testbar) · app.js · table.js · views.js · map.js · editor.js · manager.js · scans.js · shell.js · main.js
  styles.css       eigene Bereiche
lss_einsatzkarte/
  userscript/      planner.js · planner.css
  index.html …     eigenständige Webversion des Wachenplaners
tests/             kit.test.js · browser-smoke.js (Chrome/Edge ohne Fenster)
```

- Bauen: `npm run build` (oder `node build-userscript.js` im jeweiligen Ordner). Das erzeugt `dist/*.user.js` und `dist/*.meta.js` (nur der Kopf für die Update-Prüfung); die Verwaltung aktualisiert dabei auch `manifest.json`.
- Tests: `npm test` (Warteschlange, Rechenkern, Testseiten, Standortdaten) und `npm run test:browser` (klickt beide Scripts auf den Testseiten mit nachgebildeten Spiel-Endpunkten durch, inklusive Belastungsdaten mit 900 Wachen und der Webseiten-Brücke). Benötigt Node 22 oder neuer; für den Browsertest Chrome oder Edge (sonst `CHROME_PATH` setzen).
- Testseiten zum Ausprobieren: `tests/fixture.html` beider Projekte über einen lokalen Webserver öffnen (z. B. `python -m http.server` im Repository).
- Update-Adressen und Namespace kommen aus `repo.config.json`. Für ein Update `VERSION` im jeweiligen `build-userscript.js` erhöhen, bauen, testen und committen.

## Datenquellen

Standorte: BEV Digitales Landschaftsmodell Bauten, Stichtag 23.03.2026 (CC BY 4.0). Polizei: Polizeidienststellen Österreich des Innenministeriums (Open Government Data), Stand 18.10.2026. Krankenhäuser: Krankenanstalten-Verzeichnis des Gesundheitsministeriums, Stand 18.09.2026; einzelne ergänzte Koordinaten © OpenStreetMap-Mitwirkende (ODbL). Bezirke: Statistik Austria, Politische Bezirke 2026, sowie GeoSphere Austria (CC BY 4.0). Fahrzeug- und Gebäudekatalog: LSS-Manager.

Diese Scripts sind Spielhilfen und stehen in keiner Verbindung zum Betreiber von Leitstellenspiel.
