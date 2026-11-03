# <img src="assets/icon.png" width="40" align="left" alt=""> LSS Verwaltung

Tampermonkey-Script (auch als Browser-Erweiterung nutzbar) für **leitstellenspiel.de**. Früherer Name: „LSS Fuhrpark- & Personalübersicht“. Es zeigt an einer Stelle:

Die Oberfläche verwendet ein Glass-Design im Apple-Stil mit einheitlichen SVG-Symbolen, klaren Statusfarben und animierten Dialogen.
Die Übersicht kann außerdem in einem eigenen Browser-Tab laufen; der Kartenmodus nutzt dort die gesamte verfügbare Höhe.
Der Designmodus kann dem Leitstellenspiel automatisch folgen oder fest auf Dunkel beziehungsweise Hell eingestellt werden.

- alle Fahrzeuge mit Soll-/Ist-Besatzung und fehlenden Personen,
- eine Dashboard-Startseite mit kritischen Wachen, laufenden Ausbauten, Lehrgängen und Schnellzugriffen,
- Leitstellen- und Gebietsplanung nach Leitstelle, Bundesland und Bezirk inklusive unzugeordneter Wachen,
- regionale Einsatzbereitschaft als Ampelwert sowie farbige Bezirke und Leitstellen-Einzugsgebiete auf der Karte,
- eine Ausbauverwaltung für aktive, inaktive, laufende und laut Gebäudekatalog fehlende Erweiterungen,
- Fahrzeugauslastung anhand der offiziellen Gesamt- und 30-Tage-Kilometer mit standortbezogenen Hinweisen,
- erweiterte Personalplanung mit Reserve, unzugewiesenem Personal, Unterdeckung und Verschiebevorschlägen,
- alle Wachen mit Personalbestand, Fahrzeugen und freiem Personal,
- den Ausbildungsbedarf je Fahrzeugtyp,
- optional die tatsächlich zugewiesenen Ausbildungen je Fahrzeug,
- laufende eigene Lehrgänge,
- Filter, Suche und CSV-Export,
- sortierbare Spalten in sämtlichen Übersichts- und Personallisten,
- eine interaktive Karte aller Wachen mit Fahrzeugtyp-, Wachenart- und Bezirksfilter sowie den jeweils stationierten Fahrzeugen,
- abschaltbare, detaillierte österreichische Bezirksgrenzen und Bezirksnamen für eine realistische Standortplanung,
- einen Lehrgangsassistenten, der den originalen Schulungsbereich direkt im Übersichtsfenster öffnet,
- direkte Verwaltung von Fahrzeugen und Wachen,
- den aktiven Status jeder Wache anzeigen und direkt aktivieren oder deaktivieren,
- Wachen direkt einer anderen Leitstelle zuordnen,
- Umbenennen sowie Ändern der maximalen Fahrzeugbesatzung,
- Personal mit Ausbildungsanzeige direkt einem Fahrzeug zuweisen oder entfernen; bereits zugewiesene Personen stehen immer oben.

## Installation mit Tampermonkey (empfohlen)

1. Tampermonkey installieren (Firefox, Chrome oder Edge).
2. Den Installationslink aus dem [Haupt-README](../README.md) öffnen – oder `dist/lss-verwaltung.user.js` im Browser öffnen.
3. In Tampermonkey auf **Installieren** klicken.
4. Leitstellenspiel neu laden. In der Navigationsleiste erscheint das Symbol der **LSS Verwaltung**.

Neue Versionen meldet Tampermonkey automatisch; ein Klick auf **Aktualisieren** genügt. Wer vorher „LSS Fuhrpark- & Personalübersicht“ installiert hatte, löscht dieses alte Script einmalig in Tampermonkey.

Beim ersten Zugriff auf den öffentlichen LSS-Manager-Katalog kann Tampermonkey nach der Verbindungsfreigabe für `api.lss-manager.de` fragen. Es werden dabei keine persönlichen Spieldaten übertragen.

## Alternative Installation in Chrome oder Edge

1. Den ZIP-Ordner entpacken.
2. In Chrome `chrome://extensions`, in Edge `edge://extensions` öffnen.
3. **Entwicklermodus** aktivieren.
4. **Entpackte Erweiterung laden** wählen.
5. Den Ordner `lss_verwaltung` auswählen.
6. Leitstellenspiel neu laden. Unten rechts erscheint **LSS Verwaltung**.

## Verwendung

- **Aktualisieren** lädt Wachen, Fahrzeuge und Lehrgänge über die offiziellen Spiel-APIs.
- Unter **Soll-Besatzung** kann zwischen maximaler und minimaler Fahrzeugbesatzung gewählt werden. Eine im Spiel gesetzte maximale Besatzung wird berücksichtigt.
- **Ausbildungen prüfen** ruft nur nach einem bewussten Klick nacheinander die Personalzuweisungsseite jedes ausbildungsrelevanten Fahrzeugs ab. Zwischen den Abfragen liegt eine Pause. Die Prüfung kann jederzeit gestoppt werden.
- **Personal detailliert prüfen** ruft nach einem bewussten Klick die Personalseiten der eigenen Wachen schonend nacheinander ab. Dadurch werden Ausbildungsüberschüsse, Defizite und mögliche qualifizierte Personalverschiebungen sichtbar.
- Leitstellen zählen in der Gebäudeübersicht mit, werden aber nicht als personal- oder fahrzeugführende Wachen bewertet.
- Die Ausbauansicht startet mit vorhandenen Ausbauten und lässt Katalogmöglichkeiten, Status sowie eine Anzeigegrenze gezielt einstellen.
- Tabellenüberschriften bleiben beim Scrollen sichtbar; der Verwaltungsbutton sitzt als kompakter Eintrag direkt rechts neben dem Forum-Menü in der LSS-Navigationsleiste.
- Version 1.2 verwendet ein Apple-artiges Glass-Design mit animiertem Tab-Indikator, weichen Ein- und Ausblendungen und iOS-Schaltern. Hell- und Dunkelmodus besitzen dieselbe Hierarchie; „Bewegung reduzieren“ des Systems wird respektiert.
- **Wachenplaner-Brücke:** Wird das Spiel vom Wachenplaner (`lss_einsatzkarte`) geöffnet, erscheint unten links „Wachenplaner verbunden“. Nach deiner Zustimmung werden Name, Typ und Position deiner Gebäude an den Planer übertragen. Bauanfragen aus dem Planer öffnen einen Bau-Dialog (Name, Gebäudetyp, nächste Leitstelle, verschiebbare Position) – gebaut wird nur nach Klick auf **Mit Credits bauen**. Alternativ füllt **Im Spielformular öffnen** das originale Bauformular aus.
- **Bearbeiten** öffnet die Verwaltung für ein Fahrzeug oder eine Wache. Bei Fahrzeugen kann dort Personal einzeln zugewiesen oder entfernt werden. Änderungen werden erst durch den jeweiligen Knopf an das Spiel gesendet.
- Unter **Karte** zeigt ein Klick auf eine Wache alle dort stationierten Fahrzeuge. Suche und „Nur Fehlbedarf“ wirken auch auf die Kartenansicht.
- **Bezirksgrenzen** blendet auf der Karte die österreichischen Bezirke ein oder aus. Der Bezirksfilter zeigt nur Wachen im ausgewählten Bezirk.
- Der Wachenstatus ist in der Wachenliste, Kartenliste, im Karten-Popup und in der Wachenverwaltung sichtbar und kann dort geändert werden.
- Fahrzeuge mit fehlender Besatzung oder Ausbildung werden im Karten-Popup und in der Wachenverwaltung hervorgehoben.
- Unter **Lehrgänge** öffnet **Lehrgang starten** eine eigene Schule direkt im Panel. Dort werden die originalen Spielschritte verwendet, einschließlich der Personalauswahl aus unterschiedlichen Wachen.
- Der CSV-Export exportiert die aktuell gewählte Ansicht.

## Leistung

- **Effekte: Auto / Voll / Sparsam** (oben im Fenster): „Sparsam“ schaltet Glas-Unschärfe und Animationen ab und nutzt deckende Flächen – deutlich leichter für schwächere Grafikchips. „Auto“ wählt „Sparsam“ selbst bei höchstens 4 Prozessorkernen, höchstens 4 GB Arbeitsspeicher oder wenn das Betriebssystem reduzierte Transparenz wünscht.
- Große Tabellen zeigen zunächst 200 Zeilen („Weitere anzeigen“ bzw. „Alle anzeigen“); Suche, Sortierung und CSV-Export berücksichtigen trotzdem alle Einträge.
- Bezirkszuordnungen werden zwischengespeichert, die Kartenansicht zeichnet die Bezirksgrenzen vereinfacht auf Canvas.
- Testseite mit Belastungsdaten: `tests/fixture.html?userscript=1&big=900` über einen lokalen Webserver öffnen.

## Datenschutz und Serverlast

Die persönlichen Daten bleiben im Browser. Die Erweiterung sendet keine Spielerdaten an Dritte. Der öffentliche Fahrzeug- und Gebäudekatalog wird von `api.lss-manager.de` geladen; an diese Anfrage werden keine Spielerinformationen angehängt. Die detaillierten Bezirksgeometrien stammen aus dem Kartendienst von GeoSphere Austria (Datenquelle Statistik Austria, Stand Februar 2025, CC BY 4.0) und werden für eine flüssige Darstellung nur um ungefähr fünf Meter generalisiert. Spiel-API-Daten werden fünf Minuten, der öffentliche Katalog zwölf Stunden lokal zwischengespeichert.

## Technischer Hinweis

Leitstellenspiel bietet keine zentrale Personal-API mit allen Ausbildungen. Deshalb kann die Besatzungszahl sofort über die Fahrzeug-API ausgewertet werden, während die konkrete Ausbildungszuweisung nur durch die ausdrücklich gestartete Tiefenprüfung ermittelt wird.
