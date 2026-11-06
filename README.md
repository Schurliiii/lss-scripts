# LSS Scripts

Zwei unabhängige Tampermonkey-Scripts für [leitstellenspiel.de](https://www.leitstellenspiel.de). Beide laufen einzeln oder zusammen.

| | Script | Wofür | Installieren |
|---|---|---|---|
| <img src="lss_verwaltung/assets/icon.png" width="32" alt=""> | **LSS Verwaltung** | Fuhrpark, Personal, Wachen, Ausbildungen, Ausbauten, Auslastung und Karte auf einen Blick – mit Bearbeitung direkt im Panel. Für alle Spieler. | [**Installieren**](https://raw.githubusercontent.com/Schurliiii/lss-scripts/main/lss_verwaltung/dist/lss-verwaltung.user.js) |
| <img src="lss_einsatzkarte/assets/icon.png" width="32" alt=""> | **LSS Wachenplaner Österreich** | Alle echten Feuerwehr- und Rettungsstandorte (5.563), Polizeiinspektionen (812) und Akutspitäler (125) Österreichs: zeigt, welche du schon gebaut hast, welche fehlen, und baut fehlende per Klick. | [**Installieren**](https://raw.githubusercontent.com/Schurliiii/lss-scripts/main/lss_einsatzkarte/dist/lss-wachenplaner.user.js) |

## Installation

1. [Tampermonkey](https://www.tampermonkey.net/) im Browser installieren.
2. Oben bei dem gewünschten Script auf **Installieren** klicken und in Tampermonkey bestätigen.
3. Leitstellenspiel neu laden. Die Symbole erscheinen in der Navigationsleiste.

## Updates

Tampermonkey prüft regelmäßig auf neue Versionen und zeigt sie an – ein Klick auf **Aktualisieren** genügt. Sofort prüfen: Tampermonkey-Dashboard → **Nach Userscript-Updates suchen**.

## Für Entwickler

- Script bauen: `node build-userscript.js` im jeweiligen Ordner. Das erzeugt `dist/*.user.js` und `dist/*.meta.js` (nur der Kopf für die Update-Prüfung).
- Update-Adressen und Namespace kommen aus `repo.config.json`.
- Für ein Update `@version` im jeweiligen `build-userscript.js` erhöhen, neu bauen und committen.
- Tests: `node tests/core.test.js` und `node tests/fixture-syntax.test.js` in `lss_verwaltung`; Testseiten `tests/fixture.html` beider Projekte über einen lokalen Webserver öffnen.

## Datenquellen

Standorte: BEV Digitales Landschaftsmodell Bauten, Stichtag 23.03.2026 (CC BY 4.0). Polizei: Polizeidienststellen Österreich des Innenministeriums (Open Government Data), Stand 18.10.2026. Krankenhäuser: Krankenanstalten-Verzeichnis des Gesundheitsministeriums, Stand 18.09.2026; einzelne ergänzte Koordinaten © OpenStreetMap-Mitwirkende (ODbL). Bezirke: Statistik Austria, Politische Bezirke 2026, sowie GeoSphere Austria (CC BY 4.0). Fahrzeug- und Gebäudekatalog: LSS-Manager.

Diese Scripts sind Spielhilfen und stehen in keiner Verbindung zum Betreiber von Leitstellenspiel.
