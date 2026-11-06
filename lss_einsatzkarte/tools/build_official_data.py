"""Erzeugt official-data.js und regions.js aus den amtlichen Quelldaten.

Quellen (beide CC BY 4.0):
  - BEV „Digitales Landschaftsmodell – Bauten“ (DLM_2000_BAUTEN_<Stichtag>.gpkg), Layer BAU_2100_KOMMUNAL_P:
      2103 Feuerwehr, 2106 Sanitätseinrichtung, 2105 Medizinische Einrichtung
      (Krankenanstalten-Daten dort vom Gesundheitsministerium BMASGPK)
      https://data.bev.gv.at  →  „Digitales Landschaftsmodell - Bauten“
  - Krankenanstalten-Verzeichnis des Gesundheitsministeriums (KA-Verzeichnis <Datum>.xlsx), Standorte und Abteilungen
      https://www.sozialministerium.gv.at → Krankenanstalten in Österreich
  - Polizeidienststellen Österreich (Bundesministerium für Inneres, OGD, ident mit data.gv.at), als JSON-Abfrage:
      https://services2.arcgis.com/38XVhlZhm1ZnNNqw/arcgis/rest/services/Polizeidienststellen_Oesterreich_OGD/FeatureServer/5/query?where=1%3D1&outFields=*&outSR=4326&f=json&resultRecordCount=2000
  - Politische Bezirke (GeoSphere Austria, admin_grenzen_oesterreich, Layer 1), GeoJSON in WGS84

Aufruf:
  python -I tools/build_official_data.py --bauten DLM_2000_BAUTEN_20260323.gpkg \
      --krankenanstalten "KA-Verzeichnis 2026-09-18.xlsx" --polizei Polizeidienststellen-2026-10-18.json       --districts bezirke.geojson [--report bericht.json]

Danach `node build-userscript.js` ausführen.

Bewusste Abweichungen vom BEV-Rohbestand (alle im Bericht aufgeführt):
  - Punkte ohne Name und Adresse (nicht zuordenbar) werden ausgelassen.
  - Keine Einsatzstandorte und daher entfernt: Bereichsflorianstationen (Sitz der steirischen
    Bereichsfeuerwehrverbände, Bezirksfeuerwehrkommando), Landesfeuerwehrverbände und Feuerwehrschulen,
    Wasserrettung, Bergrettung und alpine Rettungsdienste.
  - Doppelt erfasste Standorte (gleiche Organisation, gleicher Ort, ≤ 60 m) werden zusammengeführt.
  - Einzelkorrekturen mit Quelle aus tools/corrections.json (z. B. aufgelassene Dienststellen).
  - Krankenhäuser: Standorte aus dem KA-Verzeichnis, die Rettungspatienten aufnehmen – öffentliche
    Akutspitäler (Landesfonds) und AUVA-Unfallkrankenhäuser mit Innerer Medizin, Chirurgie oder
    Orthopädie/Traumatologie. Keine Privatsanatorien, Reha-, Psychiatrie- oder Pflegeeinrichtungen.
    Koordinaten vom passenden BEV-Punkt (F_CODE 2105), Ausnahmen in tools/corrections.json.
  - Polizei: alle Inspektionen (Polizei-, Autobahn-, Verkehrs- und Grenzpolizeiinspektionen) – in LSS
    Polizeiwachen. Bezirks-/Stadtpolizeikommanden und Landespolizeidirektionen sind Verwaltungsstellen
    und werden nicht übernommen.
"""
import argparse
import difflib
import json
import math
import re
import sqlite3
import sys
import unicodedata
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from bevgeo import gk_to_wgs84, gpkg_point  # noqa: E402
from xlsx import read as read_xlsx  # noqa: E402

ROOT = Path(__file__).resolve().parent.parent
FIRE_ART = {
    "Berufsfeuerwehr": "fire-professional",
    "Freiwillige Feuerwehr": "fire-volunteer",
    "Betriebsfeuerwehr": "fire-other",
}
RESCUE_OPERATOR = {
    "Rotes Kreuz": "rescue-redcross",
    "Die Johanniter": "rescue-johanniter",
    "Samariterbund": "rescue-samariter",
}
NOT_A_STATION_NAME = re.compile(r"^(Bergrettung|Alpiner Rettungsdienst)\b", re.I)
MERGE_DISTANCE = 60


def haversine(a, b):
    k = math.pi / 180
    h = math.sin((b["lat"] - a["lat"]) * k / 2) ** 2 + math.cos(a["lat"] * k) * math.cos(b["lat"] * k) * math.sin((b["lon"] - a["lon"]) * k / 2) ** 2
    return 12742000 * math.asin(math.sqrt(h))


def base_name(name):
    name = re.sub(r"\b(Bezirksstelle|Ortsstelle|Ortstelle|Ortsrettungsstelle|Dienststelle|Rettungsstelle|Aussenstelle|Kommando|Hauptwache|Rotkreuz-Abteilung|Gruppe)\b", " ", name, flags=re.I)
    return re.sub(r"[^0-9a-zäöüß]+", " ", name.lower()).strip()


def classify(row):
    """Liefert (Klasse, Ausschlussgrund)."""
    f_code, name, art, operator = row["F_CODE"], row["NAME"] or "", row["ART"] or "", row["BETREIBER"] or ""
    if not name.strip() and not (row["STRASSENNAME"] or "").strip():
        return None, "ohne Name und Adresse, keiner Feuerwehr bzw. Dienststelle zuordenbar"
    if f_code == 2103:
        if art in FIRE_ART:
            return FIRE_ART[art], None
        if art == "Bezirksfeuerwehrkommando":
            return None, "Bereichsflorianstation (Sitz des Bereichsfeuerwehrverbands, keine Feuerwache)"
        if art == "Landesfeuerwehrverband":
            return None, "Landesfeuerwehrverband bzw. Feuerwehrschule (keine Feuerwache)"
        return "fire-other", None
    if f_code == 2106:
        if operator == "Österreichische Wasserrettung":
            return None, "Wasserrettung (keine Rettungswache)"
        if NOT_A_STATION_NAME.search(name):
            return None, "Bergrettung bzw. alpiner Rettungsdienst (keine Rettungswache)"
        return RESCUE_OPERATOR.get(operator, "rescue-other"), None
    return None, "unbekannter Objekttyp"


def norm(text):
    text = unicodedata.normalize("NFKD", (text or "").lower().replace("ß", "ss")).encode("ascii", "ignore").decode()
    text = re.sub(r"\bsankt\b", "st", text)
    text = re.sub(r"strasse|str\.|str\b", "str", text)
    return re.sub(r"[^a-z0-9]", "", text)


def name_tokens(text):
    text = unicodedata.normalize("NFKD", (text or "").lower()).encode("ascii", "ignore").decode()
    generic = {"standort", "klinikum", "krankenhaus", "landeskrankenhaus", "landesklinikum", "ehem", "ehemals", "klinik", "wien", "universitatsklinikum"}
    return {token for token in re.findall(r"[a-z]{4,}", text) if token not in generic}


def hospital_sites(xlsx_path, corrections):
    """Akut-Spitalsstandorte, die in LSS als Krankenhaus zählen: öffentliche Fonds-Spitäler
    (Landesfonds) und AUVA-Unfallkrankenhäuser mit Innerer Medizin, Chirurgie oder Orthopädie/Traumatologie."""
    sheets = read_xlsx(xlsx_path)
    institutions = {row["B"]: row for row in sheets["KA gesamt"][1:] if row.get("B")}
    sites = {}
    for row in sheets["Rohdaten Standorte"][1:]:
        site = sites.setdefault(row["A"], {"code": row["A"], "short": row.get("B", ""), "town": row.get("D", ""), "street": row.get("E", ""), "departments": set()})
        if row.get("F"):
            site["departments"].add(row["F"].split(" ")[0])
    include = {entry["code"]: entry for entry in corrections.get("hospital_include", [])}
    selected = []
    for site in sites.values():
        institution = institutions.get(site["code"].split(".")[0])
        if not institution or institution.get("E") != "Akutversorgung":
            continue
        public = institution.get("I") == "Landesfonds" or "Unfallversicherung" in institution.get("W", "")
        core = bool(site["departments"] & {"03", "05", "15"})
        if public and (core or site["code"] in include):
            site["institution"] = institution
            selected.append(site)
    return selected


def match_hospital(site, bev_by_plz, bev_by_town):
    plz = site["town"][:4]
    town = re.sub(r"^\d+\s*", "", site["town"]).split(",")[0].strip()
    candidates = bev_by_plz.get(plz, []) + [row for row in bev_by_town.get(norm(town), []) if str(row["PLZ"]) != plz]
    parts = re.match(r"(.*?)\s*(\d+)", site["street"])
    street = norm(parts.group(1) if parts else site["street"])
    number = parts.group(2) if parts else None
    wanted = name_tokens(f"{site['short']} {site['institution'].get('C', '')} {town}")
    best = None
    for row in candidates:
        bev_number = re.match(r"\d+", row["HNR_ADR_ZUSAMMEN"] or "")
        score = difflib.SequenceMatcher(None, street, norm(row["STRASSENNAME"])).ratio() * 2
        if number and bev_number and bev_number.group(0) == number:
            score += 1
        score += 0.6 * len(wanted & name_tokens(row["NAME"]))
        if row["ART"] != "Ambulatorium":
            score += 0.8
        if best is None or score > best[0]:
            best = (score, row)
    return best if best and best[0] >= 2.0 else None


def load_rows(gpkg):
    connection = sqlite3.connect(gpkg)
    connection.row_factory = sqlite3.Row
    srid = connection.execute("select srs_id from gpkg_geometry_columns where table_name='BAU_2100_KOMMUNAL_P'").fetchone()[0]
    medical = connection.execute("select * from BAU_2100_KOMMUNAL_P where F_CODE = 2105").fetchall()
    rows = connection.execute(
        "select * from BAU_2100_KOMMUNAL_P where F_CODE in (2103, 2106) order by id"
    ).fetchall()
    return rows, medical, srid


def point_in_ring(lon, lat, ring):
    inside = False
    j = len(ring) - 1
    for i in range(len(ring)):
        xi, yi = ring[i][0], ring[i][1]
        xj, yj = ring[j][0], ring[j][1]
        if (yi > lat) != (yj > lat) and lon < (xj - xi) * (lat - yi) / (yj - yi) + xi:
            inside = not inside
        j = i
    return inside


def load_districts(path):
    collection = json.loads(Path(path).read_text(encoding="utf-8"))
    districts = []
    for feature in collection["features"]:
        geometry = feature["geometry"]
        polygons = geometry["coordinates"] if geometry["type"] == "MultiPolygon" else [geometry["coordinates"]]
        xs = [p[0] for polygon in polygons for p in polygon[0]]
        ys = [p[1] for polygon in polygons for p in polygon[0]]
        districts.append((str(feature["properties"]["g_id"]), polygons, (min(xs), min(ys), max(xs), max(ys))))
    return districts


def district_of(lon, lat, districts):
    for district_id, polygons, (x0, y0, x1, y1) in districts:
        if not (x0 <= lon <= x1 and y0 <= lat <= y1):
            continue
        for polygon in polygons:
            if point_in_ring(lon, lat, polygon[0]) and not any(point_in_ring(lon, lat, hole) for hole in polygon[1:]):
                return district_id
    return None


def nearest_district(record, located):
    best = min(located, key=lambda other: haversine(record, other))
    return best["district"], haversine(record, best)


def build_hospitals(args, corrections, medical, srid, report):
    ka_date = re.search(r"(\d{4})-(\d{2})-(\d{2})", Path(args.krankenanstalten).name)
    source = f"BMASGPK KA-Verzeichnis {ka_date.group(3)}.{ka_date.group(2)}.{ka_date.group(1)}" if ka_date else "BMASGPK KA-Verzeichnis"
    report["hospital_source"] = source
    names = {code: entry["name"] for code, entry in corrections.get("hospital_names", {}).items() if isinstance(entry, dict)}
    names.update({entry["code"]: entry["name"] for entry in corrections.get("hospital_include", []) if entry.get("name")})
    locations = {entry["code"]: entry for entry in corrections.get("hospital_location", [])}
    by_plz, by_town, by_id = {}, {}, {}
    for row in medical:
        by_plz.setdefault(str(row["PLZ"]), []).append(row)
        by_town.setdefault(norm((row["ORTSNAME"] or "").split(",")[0]), []).append(row)
        by_id[int(row["OBJECTID"])] = row
    sites = hospital_sites(args.krankenanstalten, corrections)
    per_institution = {}
    for site in sites:
        per_institution[site["institution"]["B"]] = per_institution.get(site["institution"]["B"], 0) + 1
    hospitals, used = [], {}
    for site in sites:
        institution = site["institution"]
        location = locations.get(site["code"], {})
        if "lat" in location:
            object_id, lat, lon = location["id"], location["lat"], location["lon"]
        else:
            row = by_id[location["bev_id"]] if "bev_id" in location else (match_hospital(site, by_plz, by_town) or (None, None))[1]
            if row is None:
                report.setdefault("hospital_unmatched", []).append({"code": site["code"], "name": site["short"], "address": f"{site['street']}, {site['town']}"})
                continue
            object_id = int(row["OBJECTID"])
            lat, lon = gk_to_wgs84(*gpkg_point(row["geom"]), srid=srid)
        if object_id in used:
            report["merged"].append({"kept": object_id, "removed": site["code"], "names": [used[object_id], site["short"]], "distance_m": 0})
            continue
        town = re.sub(r"^\d+\s*", "", site["town"]).split(",")[0].strip()
        name = names.get(site["code"]) or institution.get("C", site["short"])
        if per_institution[institution["B"]] > 1 and site["code"] not in names:
            name = f"{name} – Standort {town}"
        used[object_id] = site["short"]
        street = re.match(r"(.*?)\s*(\d.*)?$", site["street"])
        hospitals.append({
            "type": "bev",
            "id": object_id,
            "lat": round(lat, 7),
            "lon": round(lon, 7),
            "official": True,
            "tags": {
                "amenity": "hospital",
                "name": name,
                "operator": institution.get("W", ""),
                "bev:art": "Krankenhaus (Akutversorgung)",
                "bev:class": "hospital",
                "bev:source": source,
                "addr:postcode": site["town"][:4],
                "addr:city": town,
                "addr:street": (street.group(1) if street else site["street"]).strip(),
                "addr:housenumber": ((street.group(2) or "") if street else "").strip(),
                "ka:code": site["code"],
                "ka:departments": sorted(site["departments"]),
            },
        })
    return hospitals


POLICE_ABBREVIATION = {
    "Polizeiinspektion": "PI",
    "Autobahnpolizeiinspektion": "API",
    "Verkehrsinspektion": "VI",
    "Grenzpolizeiinspektion": "GPI",
}


def build_police(args, report):
    stand = re.search(r"(\d{4})-(\d{2})-(\d{2})", Path(args.polizei).name)
    source = f"BMI Polizeidienststellen (OGD) {stand.group(3)}.{stand.group(2)}.{stand.group(1)}" if stand else "BMI Polizeidienststellen (OGD)"
    report["police_source"] = source
    features = json.loads(Path(args.polizei).read_text(encoding="utf-8"))["features"]
    police = []
    for feature in features:
        attributes = feature["attributes"]
        art = attributes["ArtLang"] or ""
        if "kommando" in art.lower() or "Landespolizeidirektion" in art:
            report.setdefault("police_excluded", []).append(f"{art} {attributes['NameLang']}")
            continue
        base_art, _, variant = art.partition(" (")
        abbreviation = POLICE_ABBREVIATION.get(base_art)
        if not abbreviation:
            raise SystemExit(f"unbekannte Polizei-Dienststellenart: {art}")
        name = f"{abbreviation} {attributes['NameLang'].strip()}"
        variant = variant.rstrip(")")
        if variant and variant not in name:
            name = f"{name} ({variant})"
        police.append({
            "type": "bmi",
            "id": 8000000 + int(attributes["ID"]),
            "lat": round(feature["geometry"]["y"], 7),
            "lon": round(feature["geometry"]["x"], 7),
            "official": True,
            "tags": {
                "amenity": "police",
                "name": name,
                "operator": art,
                "bev:art": art,
                "bev:class": "police" if base_art == "Polizeiinspektion" else "police-special",
                "bev:source": source,
                "addr:postcode": (attributes["Plz"] or "").strip(),
                "addr:city": (attributes["Ort"] or "").strip(),
                "addr:street": (attributes["Strasse"] or "").strip(),
                "addr:housenumber": (attributes["Hnr"] or "").strip(),
            },
        })
    return police


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--bauten", required=True)
    parser.add_argument("--krankenanstalten", required=True)
    parser.add_argument("--polizei", required=True)
    parser.add_argument("--districts", required=True)
    parser.add_argument("--report", default=None)
    args = parser.parse_args()

    stichtag = re.search(r"(\d{8})", Path(args.bauten).name)
    stichtag = f"{stichtag.group(1)[6:8]}.{stichtag.group(1)[4:6]}.{stichtag.group(1)[0:4]}" if stichtag else "unbekannt"
    corrections = json.loads((ROOT / "tools" / "corrections.json").read_text(encoding="utf-8"))
    remove = {entry["id"]: entry for entry in corrections.get("remove", [])}
    reclassify = {entry["id"]: entry for entry in corrections.get("reclassify", [])}
    report = {"stichtag": stichtag, "excluded": [], "removed": [], "reclassified": [], "merged": [], "district_fallback": []}

    rows, medical, srid = load_rows(args.bauten)
    records = []
    for row in rows:
        object_id = int(row["OBJECTID"])
        if object_id in reclassify:
            fix = reclassify[object_id]
            class_name, reason = fix["class"], None
            report["reclassified"].append({"id": object_id, "name": row["NAME"], **fix})
        else:
            class_name, reason = classify(row)
        if reason:
            report["excluded"].append({"id": object_id, "name": row["NAME"], "operator": row["BETREIBER"] if row["F_CODE"] == 2106 else row["ART"], "reason": reason})
            continue
        if object_id in remove:
            report["removed"].append({"id": object_id, "name": row["NAME"], "reason": remove[object_id]["reason"], "sources": remove[object_id].get("sources", [])})
            continue
        lat, lon = gk_to_wgs84(*gpkg_point(row["geom"]), srid=srid)
        fix = reclassify.get(object_id, {})
        kind = "fire_station" if row["F_CODE"] == 2103 else "ambulance_station"
        operator = fix.get("operator") or (row["ART"] if row["F_CODE"] == 2103 else row["BETREIBER"])
        records.append({
            "type": "bev",
            "id": object_id,
            "lat": round(lat, 7),
            "lon": round(lon, 7),
            "official": True,
            "tags": {
                "amenity": kind,
                "name": fix.get("name") or (row["NAME"] or "").strip(),
                "operator": operator,
                "bev:art": row["ART"],
                "bev:class": class_name,
                "bev:source": row["DATENQUELLE"],
                "addr:postcode": str(row["PLZ"] or "").strip(),
                "addr:city": (row["ORTSNAME"] or "").strip(),
                "addr:street": (row["STRASSENNAME"] or "").strip(),
                "addr:housenumber": (row["HNR_ADR_ZUSAMMEN"] or "").strip(),
                "bev:updated": str(row["BEARB_DAT"] or "")[:10],
            },
        })

    # Geprüfte Einzelkorrekturen: Umbenennung, neue Adresse/Position, in BEV fehlende Standorte.
    by_id = {record["id"]: record for record in records}
    for entry in corrections.get("rename", []):
        record = by_id.get(entry["id"])
        if record is None:
            raise SystemExit(f"rename: id {entry['id']} nicht gefunden")
        report.setdefault("renamed", []).append({"id": entry["id"], "from": record["tags"]["name"], "to": entry["name"]})
        record["tags"]["name"] = entry["name"]
    for entry in corrections.get("relocate", []):
        record = by_id.get(entry["id"])
        if record is None:
            raise SystemExit(f"relocate: id {entry['id']} nicht gefunden")
        report.setdefault("relocated", []).append({"id": entry["id"], "name": record["tags"]["name"], "distance_m": round(haversine(record, entry))})
        record["lat"], record["lon"] = round(entry["lat"], 7), round(entry["lon"], 7)
        for key in ("street", "housenumber", "postcode", "city"):
            if key in entry:
                record["tags"][f"addr:{key}"] = entry[key]
        record["tags"]["bev:source"] = f"{record['tags']['bev:source']}; Position korrigiert ({entry.get('coordinate_source', 'siehe corrections.json')})"
    for entry in corrections.get("add", []):
        if entry["id"] in by_id:
            raise SystemExit(f"add: id {entry['id']} bereits vergeben")
        kind = "fire_station" if entry["class"].startswith("fire") else "ambulance_station"
        records.append({
            "type": "manual",
            "id": entry["id"],
            "lat": round(entry["lat"], 7),
            "lon": round(entry["lon"], 7),
            "official": False,
            "tags": {
                "amenity": kind,
                "name": entry["name"],
                "operator": entry["operator"],
                "bev:art": "Ergänzung",
                "bev:class": entry["class"],
                "bev:source": f"Ergänzt, Quelle: {entry['sources'][0]}; Koordinate: {entry.get('coordinate_source', '')}",
                "addr:postcode": entry.get("postcode", ""),
                "addr:city": entry.get("city", ""),
                "addr:street": entry.get("street", ""),
                "addr:housenumber": entry.get("housenumber", ""),
                "bev:updated": entry.get("checked", ""),
            },
        })
        report.setdefault("added", []).append({"id": entry["id"], "name": entry["name"]})

    records += build_hospitals(args, corrections, medical, srid, report)
    records += build_police(args, report)

    # Doppelt erfasste Standorte zusammenführen (gleiche Art und gleicher Kurzname).
    rank = {"fire-professional": 0, "fire-volunteer": 1, "fire-other": 2}
    records.sort(key=lambda record: record["lat"])
    dropped = set()
    for index, record in enumerate(records):
        if record["id"] in dropped:
            continue
        for other in records[index + 1:]:
            if other["lat"] - record["lat"] > 0.001:
                break
            if other["id"] in dropped or other["tags"]["amenity"] != record["tags"]["amenity"]:
                continue
            if haversine(record, other) > MERGE_DISTANCE or base_name(record["tags"]["name"]) != base_name(other["tags"]["name"]):
                continue
            keep, drop = (record, other) if rank.get(record["tags"]["bev:class"], 9) <= rank.get(other["tags"]["bev:class"], 9) else (other, record)
            if re.match(r"Bezirksstelle", drop["tags"]["name"]) and not re.match(r"Bezirksstelle", keep["tags"]["name"]):
                keep["tags"]["name"] = drop["tags"]["name"]
            dropped.add(drop["id"])
            report["merged"].append({"kept": keep["id"], "removed": drop["id"], "names": [record["tags"]["name"], other["tags"]["name"]], "distance_m": round(haversine(record, other))})
            if drop is record:
                break
    records = sorted((record for record in records if record["id"] not in dropped), key=lambda record: record["id"])

    districts = load_districts(args.districts)
    for record in records:
        record["district"] = district_of(record["lon"], record["lat"], districts)
    located = [record for record in records if record["district"]]
    for record in records:
        if not record["district"]:
            record["district"], distance = nearest_district(record, located)
            report["district_fallback"].append({"id": record["id"], "name": record["tags"]["name"], "district": record["district"], "distance_m": round(distance)})

    regions_source = (ROOT / "regions.js").read_text(encoding="utf-8")
    region_meta = re.search(r"const REGION_META=(\{.*?\});", regions_source).group(1)
    station_districts = {str(record["id"]): int(record.pop("district")) for record in records}

    header = f"// Amtlicher Standort-Snapshot: BEV DLM Bauten, Stichtag {stichtag}. Erzeugt mit tools/build_official_data.py.\n"
    (ROOT / "official-data.js").write_text(header + "const OFFICIAL_STATIONS=" + json.dumps(records, ensure_ascii=False, separators=(",", ":")) + ";\n", encoding="utf-8")
    (ROOT / "regions.js").write_text(
        "// Amtliche Gebietszuordnung: Statistik Austria, Politische Bezirke 2026 (CC BY 4.0).\n"
        f"const REGION_META={region_meta};\nconst STATION_DISTRICTS={json.dumps(station_districts, separators=(',', ':'))};\n",
        encoding="utf-8",
    )

    counts = {}
    for record in records:
        counts[record["tags"]["bev:class"]] = counts.get(record["tags"]["bev:class"], 0) + 1
    report["counts"] = counts
    if args.report:
        Path(args.report).write_text(json.dumps(report, ensure_ascii=False, indent=1), encoding="utf-8")
    print(f"Stichtag {stichtag}: {len(records)} Standorte", counts)
    print(f"ausgeschlossen {len(report['excluded'])}, entfernt {len(report['removed'])}, umklassifiziert {len(report['reclassified'])}, zusammengeführt {len(report['merged'])}, Bezirk per Nachbar {len(report['district_fallback'])}")


if __name__ == "__main__":
    main()
