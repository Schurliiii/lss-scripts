"""Hilfsfunktionen für BEV-Geopackages: Punktgeometrie lesen und MGI/GK (EPSG:31254/31255/31256)
nach WGS84 umrechnen (inverse Gauß-Krüger-Abbildung auf Bessel 1841, danach 7-Parameter-Helmert
MGI -> WGS84 mit den amtlichen BEV-Parametern). Genauigkeit ca. 1 m – für Wachenstandorte ausreichend."""
import math
import struct

BESSEL_A = 6377397.155
BESSEL_F = 1 / 299.1528128
WGS_A = 6378137.0
WGS_F = 1 / 298.257223563
CENTRAL_MERIDIAN = {31254: 10 + 1 / 3, 31255: 13 + 1 / 3, 31256: 16 + 1 / 3}
# MGI -> WGS84 (Position Vector, EPSG:1618)
HELMERT = (577.326, 90.129, 463.919, 5.137, 1.474, 5.297, 2.4232)


def gpkg_point(blob):
    """Liefert (x, y) aus einem GeoPackage-Geometrie-Blob (Point oder erster Punkt)."""
    flags = blob[3]
    envelope = {0: 0, 1: 32, 2: 48, 3: 48, 4: 64}[(flags >> 1) & 7]
    wkb = blob[8 + envelope:]
    endian = "<" if wkb[0] == 1 else ">"
    geom_type = struct.unpack(endian + "I", wkb[1:5])[0] % 1000
    if geom_type == 1:
        return struct.unpack(endian + "dd", wkb[5:21])
    if geom_type == 4:  # MultiPoint: ersten Punkt nehmen
        inner = wkb[9:]
        e2 = "<" if inner[0] == 1 else ">"
        return struct.unpack(e2 + "dd", inner[5:21])
    raise ValueError(f"Geometrietyp {geom_type} nicht unterstützt")


def _tm_inverse(x, y, lon0):
    a, f = BESSEL_A, BESSEL_F
    e2 = f * (2 - f)
    ep2 = e2 / (1 - e2)
    n = f / (2 - f)
    northing = y + 5000000.0  # False Northing -5.000.000
    # Meridianbogenlänge -> Fußpunktbreite
    A = a / (1 + n) * (1 + n ** 2 / 4 + n ** 4 / 64)
    mu = northing / A
    phi1 = (mu + (3 * n / 2 - 27 * n ** 3 / 32) * math.sin(2 * mu)
            + (21 * n ** 2 / 16 - 55 * n ** 4 / 32) * math.sin(4 * mu)
            + (151 * n ** 3 / 96) * math.sin(6 * mu)
            + (1097 * n ** 4 / 512) * math.sin(8 * mu))
    sin1, cos1, tan1 = math.sin(phi1), math.cos(phi1), math.tan(phi1)
    N1 = a / math.sqrt(1 - e2 * sin1 ** 2)
    R1 = a * (1 - e2) / (1 - e2 * sin1 ** 2) ** 1.5
    T1, C1 = tan1 ** 2, ep2 * cos1 ** 2
    D = x / N1
    lat = phi1 - (N1 * tan1 / R1) * (D ** 2 / 2 - (5 + 3 * T1 + 10 * C1 - 4 * C1 ** 2 - 9 * ep2) * D ** 4 / 24
                                      + (61 + 90 * T1 + 298 * C1 + 45 * T1 ** 2 - 252 * ep2 - 3 * C1 ** 2) * D ** 6 / 720)
    lon = math.radians(lon0) + (D - (1 + 2 * T1 + C1) * D ** 3 / 6
                                + (5 - 2 * C1 + 28 * T1 - 3 * C1 ** 2 + 8 * ep2 + 24 * T1 ** 2) * D ** 5 / 120) / cos1
    return lat, lon


def _geodetic_to_xyz(lat, lon, a, f, h=0.0):
    e2 = f * (2 - f)
    N = a / math.sqrt(1 - e2 * math.sin(lat) ** 2)
    return ((N + h) * math.cos(lat) * math.cos(lon), (N + h) * math.cos(lat) * math.sin(lon), (N * (1 - e2) + h) * math.sin(lat))


def _xyz_to_geodetic(X, Y, Z, a, f):
    e2 = f * (2 - f)
    lon = math.atan2(Y, X)
    p = math.hypot(X, Y)
    lat = math.atan2(Z, p * (1 - e2))
    for _ in range(10):
        N = a / math.sqrt(1 - e2 * math.sin(lat) ** 2)
        h = p / math.cos(lat) - N
        lat = math.atan2(Z, p * (1 - e2 * N / (N + h)))
    return lat, lon


def gk_to_wgs84(x, y, srid=31255):
    lat, lon = _tm_inverse(x, y, CENTRAL_MERIDIAN[srid])
    X, Y, Z = _geodetic_to_xyz(lat, lon, BESSEL_A, BESSEL_F)
    tx, ty, tz, rx, ry, rz, s = HELMERT
    sec = math.pi / 180 / 3600
    rx, ry, rz, s = rx * sec, ry * sec, rz * sec, 1 + s * 1e-6
    X2 = tx + s * (X - rz * Y + ry * Z)
    Y2 = ty + s * (rz * X + Y - rx * Z)
    Z2 = tz + s * (-ry * X + rx * Y + Z)
    lat, lon = _xyz_to_geodetic(X2, Y2, Z2, WGS_A, WGS_F)
    return math.degrees(lat), math.degrees(lon)
