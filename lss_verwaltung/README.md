# <img src="assets/icon.png" width="40" align="left" alt=""> LSS Verwaltung

Tampermonkey-Script (auch als Browser-Erweiterung nutzbar) für **leitstellenspiel.de**. Früherer Name: „LSS Fuhrpark- & Personalübersicht“. Es zeigt an einer Stelle:

- alle Fahrzeuge mit Soll-/Ist-Besatzung und fehlenden Personen,
- eine Übersicht mit kritischen Wachen, laufenden Ausbauten, Lehrgängen und Schnellzugriffen,
- Leitstellen- und Gebietsplanung nach Leitstelle, Bundesland und Bezirk inklusive unzugeordneter Wachen,
- regionale Einsatzbereitschaft als Ampelwert sowie farbige Bezirke und Leitstellen-Einzugsgebiete auf der Karte,
- eine Ausbauverwaltung für aktive, inaktive, laufende und laut Gebäudekatalog fehlende Erweiterungen,
- Fahrzeugauslastung anhand der offiziellen Gesamt- und 30-Tage-Kilometer mit standortbezogenen Hinweisen,
- erweiterte Personalplanung mit Reserve, unzugewiesenem Personal, Unterdeckung und Verschiebevorschlägen,
- alle Wachen mit Personalbestand, Fahrzeugen und freiem Personal,
- den Ausbildungsbedarf je Fahrzeugtyp und auf Wunsch die tatsächlich zugewiesenen Ausbildungen je Fahrzeug,
- laufende eigene Lehrgänge mit Lehrgangsassistent,
- Filter, Suche, sortierbare Spalten und CSV-Export in allen Listen,
- eine interaktive Karte aller Wachen mit Fahrzeugtyp-, Wachenart-, Leitstellen- und Bezirksfilter sowie den stationierten Fahrzeugen,
- abschaltbare, detaillierte österreichische Bezirksgrenzen und Bezirksnamen.

Und es bearbeitet direkt im Panel:

- **Fahrzeuge in der Liste bearbeiten** (Bereich „Bearbeiten“): Name und maximale Besatzung, Suchen & Ersetzen in Namen, Umbau des Fahrzeugtyps und **Umrüsten** – gespeichert wird gesammelt mit „Alle speichern“, ohne Neuladen,
- Fahrzeuge und Wachen einzeln verwalten: umbenennen, maximale Besatzung, Leitstelle zuordnen, Wache aktivieren oder deaktivieren,
- Personal mit Ausbildungsanzeige einem Fahrzeug zuweisen, entfernen oder von einem anderen Fahrzeug umsetzen; zugewiesene Personen stehen immer oben.

Die Oberfläche teilt sich Gestaltung und Bedienung mit dem **LSS Wachenplaner Österreich**: gleiche Dialoge, gleiche Schalter, Design wahlweise wie das Spiel, hell oder dunkel. Die Übersicht kann auch in einem eigenen Browser-Tab laufen.

## Installation mit Tampermonkey (empfohlen)

1. Tampermonkey installieren (Firefox, Chrome oder Edge).
2. Den Installationslink aus dem [Haupt-README](../README.md) öffnen – oder `dist/lss-verwaltung.user.js` im Browser öffnen.
3. In Tampermonkey auf **Installieren** klicken.
4. Leitstellenspiel neu laden. In der Navigationsleiste erscheint das Symbol der **LSS Verwaltung**.

Neue Versionen meldet Tampermonkey automatisch; ein Klick auf **Aktualisieren** genügt. Wer vorher „LSS Fuhrpark- & Personalübersicht“ installiert hatte, löscht dieses alte Script einmalig in Tampermonkey.

Beim ersten Zugriff auf den öffentlichen LSS-Manager-Katalog kann Tampermonkey nach der Verbindungsfreigabe für `api.lss-manager.de` fragen. Es werden dabei keine persönlichen Spieldaten übertragen.

## Alternative Installation in Chrome oder Edge

1. Den Ordner `lss_verwaltung` herunterladen bzw. das ZIP entpacken.
2. In Chrome `chrome://extensions`, in Edge `edge://extensions` öffnen.
3. **Entwicklermodus** aktivieren.
4. **Entpackte Erweiterung laden** wählen.
5. Den Ordner `lss_verwaltung` auswählen.
6. Leitstellenspiel neu laden. Das Symbol erscheint in der Navigationsleiste.

Die Erweiterung lädt dieselbe Datei wie das Userscript (`dist/lss-verwaltung.user.js`). Karte und Bezirksgrenzen stehen nur in Tampermonkey zur Verfügung.

## Verwendung

- **Aktualisieren** lädt Wachen, Fahrzeuge und Lehrgänge über die offiziellen Spiel-APIs (kurze Sperrzeit gegen Mehrfachklicks).
- Unter **Soll-Besatzung** kann zwischen maximaler und minimaler Fahrzeugbesatzung gewählt werden. Eine im Spiel gesetzte maximale Besatzung wird berücksichtigt.
- **Ausbildungen prüfen** liest nach einem bewussten Klick die Personalliste jeder Wache mit ausbildungsrelevanten Fahrzeugen – eine Abfrage pro Wache, gedrosselt, jederzeit stoppbar. Nur wo die Liste keine Fahrzeugzuordnung zeigt, wird die Zuweisungsseite des Fahrzeugs gelesen.
- **Personal detailliert prüfen** (Personalplanung) liest die Personalseiten aller personalführenden Wachen. Dadurch werden Ausbildungsüberschüsse, Defizite und qualifizierte Personalverschiebungen sichtbar. Beide Prüfungen teilen sich die Ergebnisse; Wachen, die in den letzten zehn Minuten geprüft wurden, werden übersprungen.
- Leitstellen zählen in der Gebäudeübersicht mit, werden aber nicht als personal- oder fahrzeugführende Wachen bewertet.
- Die Ausbauansicht startet mit vorhandenen Ausbauten und lässt Katalogmöglichkeiten, Status sowie eine Anzeigegrenze gezielt einstellen.
- **Bearbeiten** öffnet die Verwaltung für ein Fahrzeug oder eine Wache. Änderungen werden erst durch den jeweiligen Knopf an das Spiel gesendet.
- **Umrüsten** (Bereich „Bearbeiten“ → „prüfen“ → „Umrüsten …“) zeigt Vorlage und alle Werte mit ihren Grenzen. Umgerüstet wird erst nach einer Rückfrage und ausschließlich mit Credits.
- Unter **Karte** zeigt ein Klick auf eine Wache alle dort stationierten Fahrzeuge. Suche und „Nur Fehlbedarf“ wirken auch auf die Karte. Der Wachenstatus lässt sich im Karten-Popup ändern.
- Links auf Spielseiten (Wache, Fahrzeug, Personal) öffnen sich direkt über dem Panel; Strg- oder Mittelklick öffnet sie wie gewohnt in einem neuen Tab.
- Unter **Lehrgänge** öffnet **Lehrgang starten** die eigene Schule mit den originalen Spielschritten, einschließlich der Personalauswahl aus unterschiedlichen Wachen.
- Der CSV-Export enthält genau die Spalten, Filter und Sortierung der aktuellen Ansicht – mit allen Einträgen.
- **Wachenplaner-Brücke:** Wird das Spiel von der Wachenplaner-Webseite (`lss_einsatzkarte`) geöffnet, erscheint unten links „Wachenplaner verbunden“. Nach deiner Zustimmung werden Name, Typ und Position deiner Gebäude an den Planer übertragen. Bauanfragen öffnen einen Bau-Dialog (Name, Gebäudetyp, nächste Leitstelle, verschiebbare Position) – gebaut wird nur nach Klick auf **Mit Credits bauen**. Alternativ füllt **Im Spielformular öffnen** das originale Bauformular aus.
- **Esc** schließt immer nur das oberste Fenster.

## Leistung

- Auf normalen Spielseiten entsteht nur das Symbol in der Navigationsleiste; in Spielfenstern (Lightbox) läuft das Script gar nicht. Alles Weitere wird beim ersten Öffnen aufgebaut.
- **Effekte: Auto / Voll / Sparsam** (oben im Fenster): „Sparsam“ schaltet Glas-Unschärfe und Animationen ab und nutzt deckende Flächen. „Auto“ wählt „Sparsam“ selbst bei höchstens 4 Prozessorkernen, höchstens 4 GB Arbeitsspeicher oder wenn das Betriebssystem reduzierte Transparenz wünscht.
- Große Tabellen zeigen zunächst 200 Zeilen („Weitere anzeigen“ bzw. „Alle anzeigen“); Suche, Sortierung und CSV-Export berücksichtigen trotzdem alle Einträge.
- Bezirkszuordnungen werden dauerhaft zwischengespeichert; die Karte bleibt beim Filtern bestehen und zeichnet die Bezirksgrenzen vereinfacht auf Canvas.
- Testseite mit Belastungsdaten: `tests/fixture.html?big=900` über einen lokalen Webserver öffnen (vorher `node build-userscript.js`).

## Datenschutz und Serverlast

Die persönlichen Daten bleiben im Browser. Das Script sendet keine Spielerdaten an Dritte. Der öffentliche Fahrzeug- und Gebäudekatalog wird von `api.lss-manager.de` geladen; an diese Anfrage werden keine Spielerinformationen angehängt. Die Bezirksgeometrien stammen aus dem Kartendienst von GeoSphere Austria (Datenquelle Statistik Austria, Stand Februar 2025, CC BY 4.0).

Alle Anfragen an das Spiel laufen durch eine gemeinsame Warteschlange: höchstens zwei gleichzeitig, mindestens 250 ms Abstand, automatische Pause bei Überlastung. Lesende Anfragen werden bei vorübergehenden Serverfehlern höchstens dreimal wiederholt, Änderungen nie. Spiel-API-Daten werden fünf Minuten, der öffentliche Katalog zwölf Stunden lokal zwischengespeichert.

## Technischer Hinweis

Leitstellenspiel bietet keine zentrale Personal-API mit allen Ausbildungen. Deshalb kann die Besatzungszahl sofort über die Fahrzeug-API ausgewertet werden, während die konkrete Ausbildungszuweisung nur durch die ausdrücklich gestartete Prüfung ermittelt wird.

Quellcode: `src/` (Module, beim Bauen zu einer Datei gebündelt) und `styles.css`; gemeinsamer Unterbau in `../shared/`. Bauen mit `node build-userscript.js`, Tests mit `npm test` im Hauptordner.
