# Änderungen

## 2.0.0 – LSS Verwaltung und LSS Wachenplaner Österreich

Beide Scripts wurden von Grund auf überarbeitet. Alle Funktionen bleiben erhalten; Einstellungen und Zwischenspeicher werden übernommen.

### Schonend für Spiel und Rechner

- **Keine Ausführung in Spielfenstern:** Die Scripts laufen nicht mehr in den Iframes der Lightbox (Einsatz-, Fahrzeug- und Wachenfenster). Bisher wurden dort bei jedem Öffnen Kartenbibliothek, Stylesheets und beim Wachenplaner fast 1 MB Daten geladen.
- **Nichts auf Vorrat:** Auf normalen Spielseiten entsteht nur das Symbol in der Navigationsleiste. Fenster, Stylesheets, Karte und Theme-Beobachtung werden erst beim ersten Öffnen aufgebaut (vorher: komplettes Fenster und 45 KB CSS auf jeder Seite).
- **Eine Warteschlange für alle Anfragen an das Spiel:** höchstens zwei gleichzeitig, Mindestabstand von 250 ms, automatische Pause bei Überlastung (429/5xx). Speichern, Zuweisen und Bauen haben Vorrang vor laufenden Prüfungen. Änderungen werden nie automatisch wiederholt.
- **Weniger Anfragen:** Ausbildungs- und Personalprüfung lesen dieselbe Personalseite je Wache und teilen sich das Ergebnis; vor Kurzem geprüfte Wachen werden übersprungen. „Aktualisieren“ hat eine kurze Sperrzeit gegen Mehrfachklicks. Der Bau-Dialog des Wachenplaners verwendet die gerade abgeglichenen Gebäude.
- **Bezirkszuordnung dauerhaft gespeichert:** Die detaillierten Bezirksgrenzen werden nur noch für neue Wachen oder die Kartenansicht ausgewertet.
- **Karte bleibt bestehen:** In der Kartenansicht der Verwaltung werden beim Filtern, Suchen und bei Statusänderungen nur noch Marker und Ebenen abgeglichen, statt die Karte neu aufzubauen.
- Tastenkürzel des Spiels lösen beim Tippen in den Feldern der Scripts nicht mehr aus.

### Einheitlich

- Gemeinsamer Unterbau (`shared/kit.js`, `shared/kit.css`) für beide Scripts: gleiche Schaltflächen, Schalter, Felder, Dialoge, Hinweise, gleiches Design (LSS-Design, Hell, Dunkel) und gleiche Effektstufen (Auto, Voll, Sparsam) – jetzt auch im Wachenplaner wählbar.
- Ein Bau-Dialog und eine Verbindung zur Wachenplaner-Webseite für beide Scripts statt zwei leicht unterschiedlicher Kopien.
- Einheitliche Kartenbasis in allen Karten.

### Korrekturen

- Ausbildungsprüfung: Hatte keine der zugewiesenen Personen eine benötigte Ausbildung, galt das Fahrzeug als „nicht geprüft“ statt als „fehlt“.
- Verschiebevorschläge planen jeden Ausbildungsüberschuss nur noch einmal ein.
- CSV-Export enthält genau die Spalten, Filter und Sortierung der aktuellen Ansicht.
- Keine Fehlermeldungen in der Browserkonsole mehr, wenn eine Karte während einer Animation geschlossen wird.

### Für Entwickler

- Verwaltung in Module unter `lss_verwaltung/src/` aufgeteilt; Rechenlogik in `src/core.js` mit Tests.
- Tabellen werden über Spaltenbeschreibungen erzeugt; Sortierung ohne Zurücklesen von HTML.
- `npm run build`, `npm test` und `npm run test:browser` (Browser-Smoke-Test mit Chrome/Edge ohne Fenster).
