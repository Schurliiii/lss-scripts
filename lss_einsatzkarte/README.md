# <img src="assets/icon.png" width="40" align="left" alt=""> LSS Wachenplaner Österreich

Interaktive, statische Webkarte zur realistischen Platzierung von Feuerwehr- und Rettungswachen im Leitstellenspiel.

> **Empfohlen: als Userscript direkt im Spiel.** Über den Installationslink im [Haupt-README](../README.md) oder `dist/lss-wachenplaner.user.js` in Tampermonkey installieren. Updates meldet Tampermonkey automatisch. Der Wachenplaner erscheint dann als Stecknadel-Symbol in der LSS-Navigationsleiste – ohne Website, ohne zweiten Tab. Das Script ist eigenständig und unabhängig von „LSS Verwaltung“; beide können parallel installiert sein. Ist „LSS Verwaltung“ 1.2.0 installiert, übernimmt diese die Verbindung zur Webversion, damit Erlaubnis- und Bau-Dialoge nicht doppelt erscheinen.

## Enthalten

- 5.563 verortete Feuerwehr- und Rettungsstützpunkte, 812 Polizeiinspektionen und 125 Akutspitäler in ganz Österreich
- getrennte Filter für Berufsfeuerwehr, Freiwillige Feuerwehr, ÖRK, Johanniter, Samariterbund, weitere Rettungsorganisationen, Polizei und Krankenhäuser
- Gebietsfilter für alle neun Bundesländer und die politischen Bezirke (Stand 2026)
- automatischer Kartensprung auf das gewählte Bundesland oder den gewählten Bezirk
- automatische Leitstellenspiel-Empfehlung pro Standort
- Adresssuche in Österreich
- Detailansicht mit amtlicher Adresse, Koordinaten und Kartenlink
- responsive Darstellung für Desktop und Smartphone
- vollständiger lokaler Standortbestand ohne abhängigen Live-Datenserver
- **Abgleich mit dem Spiel:** zeigt, welche echten Wachen du schon gebaut hast und welche noch fehlen (Statusfilter, Liste „Noch nicht gebaut“, Fortschritt je Gebiet)
- **Bauen per Klick:** „Im Leitstellenspiel bauen“ öffnet im Spiel einen vorausgefüllten Bau-Dialog
- Oberfläche im Apple-Glass-Stil mit Hell-/Dunkelmodus und Bottom-Sheet auf dem Smartphone

## Starten

Am einfachsten `index.html` im Browser öffnen. Der verwendete Esri-Kartenhintergrund funktioniert auch beim direkten Öffnen als lokale Datei. Falls ein besonders strenger Browser die Adresssuche bei lokalen Dateien blockiert, im Ordner einen kleinen Webserver starten:

```powershell
python -m http.server 8080
```

Danach `http://localhost:8080` öffnen.

## Abgleich und Bauen

Im **Userscript** passiert der Abgleich automatisch beim Öffnen. Die folgenden Schritte betreffen die **Webversion** (`index.html`); sie benötigt das Userscript **LSS Wachenplaner Österreich** und eine angemeldete Sitzung auf leitstellenspiel.de.

1. **Mit Leitstellenspiel abgleichen** öffnet das Spiel in einem neuen Tab. Dort fragt das Userscript einmal pro Sitzung um Erlaubnis und schickt danach nur Name, Typ und Position deiner Gebäude zurück.
2. Ein echter Standort gilt als gebaut, wenn eine passende eigene Wache (Feuerwache bzw. Rettungswache, auch Kleinwache oder Komplex) im eingestellten Umkreis liegt (Standard 300 m). Jede eigene Wache zählt nur für einen Standort.
3. **Noch nicht gebaut** listet die fehlenden Wachen im gewählten Gebiet. **Bauen** schickt den Standort an den Spiel-Tab; dort öffnet sich ein Dialog mit Name, Gebäudetyp, nächster Leitstelle und verschiebbarer Position. Gebaut wird erst nach Klick auf **Mit Credits bauen** – Coins werden nie verwendet.
4. Nach dem Bau prüft das Userscript über `/api/buildings`, ob die Wache wirklich angelegt wurde, und meldet sie an den Wachenplaner zurück.

Ohne Userscript kann `https://www.leitstellenspiel.de/api/buildings` im Browser gespeichert und über **Datei** importiert werden. Der Abgleich wird lokal im Browser gespeichert.

## Userscript bauen

```powershell
node build-userscript.js
```

Erzeugt `dist/lss-wachenplaner.user.js` aus `userscript/planner.js`, `userscript/planner.css` und den Standortdaten dieser Karte (kompakt eingebettet, ca. 790 KB). Testseite mit nachgebildeten Spiel-Endpunkten: `tests/fixture.html` über einen lokalen Webserver öffnen.

## Leistung

Unter **Darstellung → Effekte** lässt sich „Sparsam“ wählen: keine Glas-Unschärfe, deckende Flächen, keine Animationen. „Automatisch“ wählt das auf schwächeren Rechnern selbst. Die Standortdaten werden erst beim Öffnen des Planers ausgewertet; auf normalen Spielseiten kostet das Script nur wenige Millisekunden.

## Datenhinweis

Die Standorte stammen aus dem österreichweiten Datensatz „Digitales Landschaftsmodell – Bauten“ des Bundesamts für Eich- und Vermessungswesen (BEV), Stichtag 23.03.2026, Lizenz CC BY 4.0. Enthalten sind 5.036 Feuerwehr- und 527 Rettungsstandorte. Die Krankenhäuser (125 Standorte) stammen aus dem Krankenanstalten-Verzeichnis des Gesundheitsministeriums (Stand 18.09.2026): öffentliche Akutspitäler und AUVA-Unfallkrankenhäuser mit Innerer Medizin, Chirurgie oder Unfallchirurgie – also die Häuser, die Rettungspatienten aufnehmen. Privatsanatorien, Reha-, Psychiatrie- und Pflegeeinrichtungen sind nicht enthalten. Ihre Koordinaten kommen von den BEV-Punkten; nur für die Klinik Penzing gibt es keinen, ihre Koordinate stammt aus OpenStreetMap (© OpenStreetMap-Mitwirkende, ODbL). Die Polizeiinspektionen (812: Polizei-, Autobahn-, Verkehrs- und Grenzpolizeiinspektionen) stammen aus dem Datensatz „Polizeidienststellen Österreich“ des Bundesministeriums für Inneres (Open Government Data, Stand 18.10.2026); Bezirks- und Stadtpolizeikommanden sowie Landespolizeidirektionen sind Verwaltungsstellen und nicht enthalten. Die Gebietszuordnung basiert auf den politischen Bezirken 2026 von Statistik Austria, ebenfalls CC BY 4.0.

Gegenüber dem BEV-Rohbestand wurden Einträge entfernt, die keine Einsatzstandorte sind (Bereichsflorianstationen, Landesfeuerwehrverbände und Feuerwehrschulen, Wasser- und Bergrettung), doppelt erfasste Standorte zusammengeführt und nachweislich aufgelassene Dienststellen gestrichen. In BEV fehlende, amtlich belegte Rettungsstandorte (z. B. Samariterbund Zurndorf und Weppersdorf laut Landesamtsblatt Burgenland) wurden ergänzt; ihre Koordinaten stammen aus OpenStreetMap (© OpenStreetMap-Mitwirkende, ODbL). Alle 524 Rettungsstandorte wurden im November 2026 einzeln gegen aktuelle Quellen der Organisationen (Standortlisten der Bezirksstellen, Leistungsberichte, Landesamtsblätter, Regionalmedien) geprüft: 22 aufgelassene Stellen, reine Büros und Doppelerfassungen wurden entfernt, 10 übersiedelte Wachen verlegt, 20 fehlende Standorte ergänzt und rund 100 Namen auf den heutigen Stand gebracht. Jede Einzelkorrektur steht mit Quelle in `tools/corrections.json`.

### Daten neu erzeugen

```powershell
python -I tools/build_official_data.py --bauten DLM_2000_BAUTEN_<Stichtag>.gpkg --krankenanstalten "KA-Verzeichnis <Datum>.xlsx" --polizei Polizeidienststellen-<Datum>.json --districts bezirke.geojson --report bericht.json
node build-userscript.js
```

Quellen: BEV-Geoportal (data.bev.gv.at → „Digitales Landschaftsmodell - Bauten“), Sozialministerium → „Krankenanstalten in Österreich“ (KA-Verzeichnis), BMI-Polizeidienststellen (ArcGIS-Dienst „Polizeidienststellen_Oesterreich_OGD“, Layer 5, Abfrage mit outSR=4326 und f=json), GeoSphere Austria (admin_grenzen_oesterreich, Layer 1, als GeoJSON). Benötigt nur Python 3 ohne Zusatzpakete. Die Anwendung ist nur als Spiel- und Planungshilfe gedacht, nicht für reale Einsätze.
