/*
 * LSS Verwaltung – Grundlagen: Einstellungen, Zustand, Zwischenspeicher, Datenladen,
 * Bezirkszuordnung und Auswertung. Alle Module unter src/ teilen sich beim Bauen einen
 * gemeinsamen Gültigkeitsbereich (siehe build-userscript.js).
 */

const Core = LSSFleetCore;
const STANDALONE = new URLSearchParams(location.search).get("lssfo") === "dashboard";

const kit = createKit({
  prefix: "lssfo",
  styles: LSS_STYLES,
  leafletCss: "lssfoLeafletCss",
  requests: { concurrency: 2, gap: 250 },
  onEscape: () => handleEscape(),
  // Liegt eine Spielseite (Lightbox) über dem Panel, gehört Esc dem Spiel.
  ignoreEscape: () => document.documentElement.classList.contains("lssfo-lightbox-front"),
  onNativeBuild: () => state.open && closeDashboard(),
});
const { escapeHtml: esc, formatNumber, formatDecimal, formatDateTime, plural, icon, badge, note, spinner, collator } = kit;

const CACHE = { database: "lssfo-database-v2", store: "cache", data: "lssfo-cache-v2", districts: "lssfo-districts-v1" };
const DATA_TTL = 5 * 60 * 1000;
const CATALOG_TTL = 12 * 60 * 60 * 1000;
const REFRESH_COOLDOWN = 10 * 1000;
const SCAN_FRESH = 10 * 60 * 1000;
const PAGE_SIZE = 200;
const VEHICLE_PAGE_SIZE = 1000;
const CATALOG_URL = "https://api.lss-manager.de/de_DE";
const AUSTRIA_BOX = [9.4, 46.3, 17.3, 49.1];

const settings = kit.store("lssfo-settings-v1", {
  crewMode: "max",
  theme: "auto",
  effects: "auto",
  districtsEnabled: true,
  coverageEnabled: true,
  readinessEnabled: true,
  extensionStatus: "owned",
  extensionLimit: 100,
});
if (!["max", "min"].includes(settings.values.crewMode)) settings.values.crewMode = "max";
if (!["auto", "dark", "light"].includes(settings.values.theme)) settings.values.theme = "auto";
if (!["auto", "full", "reduced"].includes(settings.values.effects)) settings.values.effects = "auto";
kit.setAppearance({ theme: settings.values.theme, effects: settings.values.effects });

const emptyData = () => ({ buildings: [], vehicles: [], schoolings: [], vehicleDistances: [], vehicleTypes: {}, buildingTypes: {}, schoolingTypes: {}, updatedAt: 0, catalogUpdatedAt: 0 });

const state = {
  open: false,
  loading: false,
  error: "",
  tab: "dashboard",
  query: "",
  onlyMissing: false,
  sorts: {},
  limits: {},
  data: emptyData(),
  lastFetch: 0,
  model: null,
  // Prüfergebnisse: je Fahrzeug die zugewiesenen Ausbildungen, je Wache das Personal.
  scans: { vehicles: {}, stations: {} },
  scan: null,
  mapFilter: { vehicleType: "all", buildingType: "all", district: "all", dispatch: "all" },
  edits: {},
  editStatus: {},
  editOptions: {},
  editBuilding: "all",
  editSaving: false,
  refitStarted: {},
  statusSaving: null,
};

let trainingNames = new Map();
let courseDurations = new Map();
const trainingName = (key) => trainingNames.get(key) || Core.humanizeKey(key);
const matches = (search) => !state.query || search.includes(state.query);
const listOf = (value) => (Array.isArray(value) ? value : value?.result || []);
const uniqueSorted = (values) => [...new Set(values.filter(Boolean))].sort(collator.compare);

/* ---------- Zwischenspeicher (IndexedDB, eine Verbindung) ---------- */

let databasePromise = null;

function database() {
  databasePromise ||= new Promise((resolve, reject) => {
    if (!globalThis.indexedDB) {
      reject(new Error("IndexedDB ist nicht verfügbar"));
      return;
    }
    const request = indexedDB.open(CACHE.database, 1);
    request.onupgradeneeded = () => {
      if (!request.result.objectStoreNames.contains(CACHE.store)) request.result.createObjectStore(CACHE.store);
    };
    request.onsuccess = () => {
      const db = request.result;
      db.onversionchange = () => {
        db.close();
        databasePromise = null;
      };
      resolve(db);
    };
    request.onerror = () => reject(request.error || new Error("IndexedDB konnte nicht geöffnet werden"));
  }).catch((error) => {
    databasePromise = null;
    throw error;
  });
  return databasePromise;
}

async function cacheRead(key) {
  try {
    const db = await database();
    return await new Promise((resolve, reject) => {
      const request = db.transaction(CACHE.store, "readonly").objectStore(CACHE.store).get(key);
      request.onsuccess = () => resolve(request.result ?? null);
      request.onerror = () => reject(request.error);
    });
  } catch {
    return null;
  }
}

async function cacheWrite(key, value) {
  try {
    const db = await database();
    await new Promise((resolve, reject) => {
      const transaction = db.transaction(CACHE.store, "readwrite");
      transaction.objectStore(CACHE.store).put(value, key);
      transaction.oncomplete = resolve;
      transaction.onerror = () => reject(transaction.error);
      transaction.onabort = () => reject(transaction.error || new Error("abgebrochen"));
    });
  } catch (error) {
    console.warn("LSS Verwaltung: Zwischenspeicher nicht verfügbar.", error);
  }
}

// Änderungen (Umbenennen, Status, Zuweisungen) landen gebündelt im Zwischenspeicher.
let saveTimer = 0;
function saveData() {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => void cacheWrite(CACHE.data, { ...state.data }), 400);
}

/* ---------- Daten laden ---------- */

async function fetchAllVehicles() {
  // Große Seiten beantwortet der Server bei vielen Fahrzeugen mit 503; paging.next_page nennt die Folgeseite.
  const vehicles = new Map();
  const seen = new Set();
  let url = `/api/v2/vehicles?limit=${VEHICLE_PAGE_SIZE}`;
  while (url && !seen.has(url)) {
    seen.add(url);
    const page = await kit.getJson(url);
    for (const vehicle of page.result || []) vehicles.set(vehicle.id, vehicle);
    url = page.paging?.next_page || "";
  }
  return [...vehicles.values()];
}

function fetchGameData() {
  return Promise.all([
    kit.getJson("/api/buildings"),
    fetchAllVehicles(),
    kit.getJson("/api/schoolings").catch(() => []),
    kit.getJson("/api/v1/vehicle_distances.json").catch(() => ({ result: [] })),
  ]);
}

const fetchCatalog = () => Promise.all(["vehicles", "buildings", "schoolings"].map((name) => kit.externalJson(`${CATALOG_URL}/${name}`)));

async function loadData(force = false) {
  if (state.loading) return;
  if (force && Date.now() - state.lastFetch < REFRESH_COOLDOWN) {
    kit.toast("Die Daten wurden gerade erst geladen – bitte kurz warten.");
    return;
  }
  state.loading = true;
  state.error = "";
  render();
  try {
    const [cached] = await Promise.all([cacheRead(CACHE.data), loadDistrictCache()]);
    const now = Date.now();
    const useData = !force && cached && now - cached.updatedAt < DATA_TTL;
    const useCatalog = cached && now - (cached.catalogUpdatedAt || 0) < CATALOG_TTL && Object.keys(cached.vehicleTypes || {}).length > 0;
    let catalogFresh = !useCatalog;
    const [game, catalog] = await Promise.all([
      useData ? [cached.buildings, cached.vehicles, cached.schoolings, cached.vehicleDistances] : fetchGameData(),
      useCatalog
        ? [cached.vehicleTypes, cached.buildingTypes, cached.schoolingTypes]
        : fetchCatalog().catch(() => {
          catalogFresh = false;
          return [cached?.vehicleTypes, cached?.buildingTypes, cached?.schoolingTypes];
        }),
    ]);
    state.data = {
      buildings: listOf(game[0]),
      vehicles: listOf(game[1]),
      schoolings: listOf(game[2]),
      vehicleDistances: listOf(game[3]),
      vehicleTypes: catalog[0] || {},
      buildingTypes: catalog[1] || {},
      schoolingTypes: catalog[2] || {},
      updatedAt: useData ? cached.updatedAt : now,
      catalogUpdatedAt: catalogFresh ? now : cached?.catalogUpdatedAt || 0,
    };
    if (!useData) state.lastFetch = now;
    analyze();
    if (!useData || catalogFresh) saveData();
  } catch (error) {
    state.error = `Daten konnten nicht geladen werden: ${error.message}`;
  } finally {
    state.loading = false;
    render();
  }
}

/* ---------- Bezirke ---------- */

// Die Bezirksgrenzen (GeoSphere Austria) haben über 200.000 Punkte. Die Zuordnung je
// Koordinate wird dauerhaft gespeichert, damit die Grenzen nur noch für neue Wachen
// oder die Kartenansicht ausgewertet werden müssen.
const NO_DISTRICT = Object.freeze(["", ""]);
const geo = { data: undefined, display: undefined, boxes: new WeakMap(), assigned: new Map(), loaded: false, dirty: false };
const FEDERAL_STATES = { 1: "Burgenland", 2: "Kärnten", 3: "Niederösterreich", 4: "Oberösterreich", 5: "Salzburg", 6: "Steiermark", 7: "Tirol", 8: "Vorarlberg", 9: "Wien" };

async function loadDistrictCache() {
  if (geo.loaded) return;
  geo.loaded = true;
  const stored = await cacheRead(CACHE.districts);
  for (const [key, value] of stored?.entries || []) geo.assigned.set(key, value);
}

function saveDistrictCache() {
  if (!geo.dirty) return;
  geo.dirty = false;
  void cacheWrite(CACHE.districts, { entries: [...geo.assigned] });
}

const formatDistrictName = (value) => String(value || "").replace(/\s+/g, " ").replace(/,\s*/g, ", ").replace(/([^\s])\(/g, "$1 (").trim();

function districtGeo() {
  if (geo.data !== undefined) return geo.data;
  try {
    const parsed = JSON.parse(kit.gmResource("lssfoAustriaDistricts") || "null");
    if (parsed?.type !== "FeatureCollection" || !Array.isArray(parsed.features)) throw new Error("Ungültige Bezirksdaten");
    const features = parsed.features.map((feature) => ({
      ...feature,
      properties: { ...feature.properties, iso: String(feature.properties?.iso || feature.properties?.g_id || ""), name: formatDistrictName(feature.properties?.name || feature.properties?.g_name) },
    }));
    // Manche Datensätze enthalten Wien zusätzlich als Gesamtfläche neben den 23 Gemeindebezirken.
    const hasViennaDistricts = features.some((feature) => /^9(?:0[1-9]|1\d|2[0-3])$/.test(feature.properties.iso));
    geo.data = { type: "FeatureCollection", features: features.filter((feature) => !(hasViennaDistricts && feature.properties.iso === "900")) };
  } catch {
    geo.data = null;
  }
  return geo.data;
}

// Für die Darstellung genügen ~40 m Genauigkeit; die Zuordnung nutzt die vollen Grenzen.
function districtDisplayGeo() {
  if (geo.display !== undefined) return geo.display;
  const source = districtGeo();
  const simplifyRing = (points) => {
    if (points.length <= 8) return points;
    const result = [points[0]];
    let [lastX, lastY] = points[0];
    for (let index = 1; index < points.length - 1; index += 1) {
      const [x, y] = points[index];
      if (Math.abs(x - lastX) > 0.0004 || Math.abs(y - lastY) > 0.0004) {
        result.push(points[index]);
        lastX = x;
        lastY = y;
      }
    }
    result.push(points[points.length - 1]);
    return result.length >= 4 ? result : points;
  };
  const simplify = (geometry) => {
    if (geometry?.type === "Polygon") return { ...geometry, coordinates: geometry.coordinates.map(simplifyRing) };
    if (geometry?.type === "MultiPolygon") return { ...geometry, coordinates: geometry.coordinates.map((polygon) => polygon.map(simplifyRing)) };
    return geometry;
  };
  geo.display = source ? { ...source, features: source.features.map((feature) => ({ ...feature, geometry: simplify(feature.geometry) })) } : null;
  return geo.display;
}

function polygonsOf(geometry) {
  if (geometry?.type === "Polygon") return [geometry.coordinates];
  if (geometry?.type === "MultiPolygon") return geometry.coordinates;
  return [];
}

function boxOf(feature) {
  let box = geo.boxes.get(feature);
  if (box) return box;
  box = [Infinity, Infinity, -Infinity, -Infinity];
  for (const polygon of polygonsOf(feature.geometry)) {
    for (const [x, y] of polygon[0] || []) {
      if (x < box[0]) box[0] = x;
      if (y < box[1]) box[1] = y;
      if (x > box[2]) box[2] = x;
      if (y > box[3]) box[3] = y;
    }
  }
  geo.boxes.set(feature, box);
  return box;
}

function pointInRing(x, y, ring) {
  let inside = false;
  for (let index = 0, previous = ring.length - 1; index < ring.length; previous = index, index += 1) {
    const [currentX, currentY] = ring[index];
    const [previousX, previousY] = ring[previous];
    if ((currentY > y) !== (previousY > y) && x < ((previousX - currentX) * (y - currentY)) / (previousY - currentY || Number.EPSILON) + currentX) inside = !inside;
  }
  return inside;
}

const containsPoint = (geometry, x, y) => polygonsOf(geometry).some((polygon) => pointInRing(x, y, polygon[0]) && !polygon.slice(1).some((hole) => pointInRing(x, y, hole)));

function federalStateOf(feature) {
  const properties = feature?.properties || {};
  const explicit = properties.state || properties.bundesland || properties.name_1 || properties.land;
  if (explicit) return formatDistrictName(explicit);
  return FEDERAL_STATES[String(properties.iso || properties.gkz || "").replace(/\D/g, "")[0]] || "";
}

// Liefert [Bezirk, Bundesland]. Wachen außerhalb Österreichs werden ohne Auswertung übersprungen.
function districtOf(longitude, latitude) {
  if (!Number.isFinite(longitude) || !Number.isFinite(latitude)) return NO_DISTRICT;
  if (longitude < AUSTRIA_BOX[0] || latitude < AUSTRIA_BOX[1] || longitude > AUSTRIA_BOX[2] || latitude > AUSTRIA_BOX[3]) return NO_DISTRICT;
  const key = `${longitude.toFixed(5)},${latitude.toFixed(5)}`;
  const known = geo.assigned.get(key);
  if (known) return known;
  const data = districtGeo();
  if (!data) return NO_DISTRICT;
  const feature = data.features.find((entry) => {
    const [minX, minY, maxX, maxY] = boxOf(entry);
    return longitude >= minX && longitude <= maxX && latitude >= minY && latitude <= maxY && containsPoint(entry.geometry, longitude, latitude);
  });
  const result = feature ? [feature.properties.name, federalStateOf(feature)] : NO_DISTRICT;
  geo.assigned.set(key, result);
  geo.dirty = true;
  return result;
}

/* ---------- Auswertung ---------- */

// Baut aus den Rohdaten das komplette Modell für alle Bereiche. Läuft nach dem Laden
// und nach jeder Änderung; alle Ansichten lesen danach nur noch daraus.
function analyze() {
  const { buildings, vehicles, vehicleTypes, buildingTypes, schoolingTypes, vehicleDistances, schoolings } = state.data;
  ({ names: trainingNames, durations: courseDurations } = Core.trainingCatalog(schoolingTypes));
  const typeOf = (building) => buildingTypes[String(building.building_type)] || {};

  const buildingInfo = new Map(buildings.map((building) => [Number(building.id), { caption: building.caption, schoolingTypes: typeOf(building).schoolingTypes || [] }]));
  const analyzed = vehicles.map((vehicle) => {
    const entry = Core.analyzeVehicle(vehicle, vehicleTypes[String(vehicle.vehicle_type)], buildingInfo.get(Number(vehicle.building_id)), settings.values.crewMode, state.scans.vehicles[String(vehicle.id)] || null);
    entry.search = `${entry.caption} ${entry.typeCaption} ${entry.buildingCaption}`.toLocaleLowerCase("de");
    entry.hasMissing = entry.missingCrew > 0 || entry.missingTraining > 0;
    return entry;
  });
  const summaries = Core.summarizeBuildings(buildings, analyzed);
  const summaryById = new Map(summaries.map((summary) => [summary.id, summary]));
  const vehiclesByBuilding = Core.groupBy(analyzed, (vehicle) => vehicle.buildingId);
  const referencedDispatch = new Set(buildings.map((building) => Core.normalizedDispatchId(building.leitstelle_building_id)).filter((id) => id !== null));
  const dispatchCaption = new Map(buildings.filter((building) => Core.isDispatchCenter(building, typeOf(building), referencedDispatch)).map((building) => [Number(building.id), building.caption]));

  const all = buildings.map((building) => {
    const id = Number(building.id);
    const type = typeOf(building);
    const latitude = Number(building.latitude);
    const longitude = Number(building.longitude);
    const [district, federalState] = districtOf(longitude, latitude);
    const dispatchCenterId = Core.normalizedDispatchId(building.leitstelle_building_id);
    const typeCaption = type.caption || `Typ ${building.building_type}`;
    return {
      ...building,
      id,
      raw: building,
      typeCaption,
      summary: summaryById.get(id),
      vehicles: vehiclesByBuilding.get(id) || [],
      district,
      federalState,
      dispatchCenterId,
      dispatchCenterCaption: dispatchCenterId ? dispatchCaption.get(dispatchCenterId) || `Leitstelle ${dispatchCenterId}` : "Ohne Leitstelle",
      isDispatchCenter: dispatchCaption.has(id),
      isSchool: Core.isSchool(type, building.caption),
      enabled: building.enabled !== false,
      latitude,
      longitude,
      hasLocation: Number.isFinite(latitude) && Number.isFinite(longitude),
      search: `${building.caption} ${typeCaption} ${district}`.toLocaleLowerCase("de"),
    };
  });
  const buildingById = new Map(all.map((building) => [building.id, building]));
  const stations = all.filter((building) => !building.isDispatchCenter);
  const operational = stations.filter(Core.isOperational);

  // Kontostandard: Typen, die es in irgendeinem eigenen Gebiet gibt.
  const referenceVehicleTypes = new Map();
  const referenceBuildingTypes = new Map();
  for (const building of stations) {
    if (!/schule|akademie|krankenhaus|bereitstellungsraum|verband/i.test(building.typeCaption)) referenceBuildingTypes.set(String(building.building_type), building.typeCaption);
    for (const vehicle of building.vehicles) referenceVehicleTypes.set(String(vehicle.typeId), vehicle.typeCaption);
  }
  const regions = [...Core.groupBy(operational, (building) => (building.dispatchCenterId === null ? "none" : String(building.dispatchCenterId)))].map(([key, members]) => {
    const regionVehicles = members.flatMap((building) => building.vehicles);
    const vehicleTypeIds = new Set(regionVehicles.map((vehicle) => String(vehicle.typeId)));
    const buildingTypeIds = new Set(members.map((building) => String(building.building_type)));
    const total = (valueOf) => members.reduce((sum, building) => sum + Number(valueOf(building) || 0), 0);
    const values = {
      buildings: members.length,
      targetCrew: total((building) => building.summary?.targetCrew),
      missingCrew: total((building) => building.summary?.missingCrew),
      missingTraining: total((building) => building.summary?.missingTraining),
      inactive: members.filter((building) => !building.enabled).length,
    };
    const districts = uniqueSorted(members.map((building) => building.district));
    const federalStates = uniqueSorted(members.map((building) => building.federalState));
    return {
      key,
      caption: members[0].dispatchCenterCaption,
      buildings: members,
      vehicles: regionVehicles,
      personnel: total((building) => building.summary?.personnel),
      ...values,
      readiness: Core.readinessScore(values),
      districts,
      federalStates,
      missingVehicleTypes: [...referenceVehicleTypes].filter(([id]) => !vehicleTypeIds.has(id)).map(([, caption]) => caption),
      missingBuildingTypes: [...referenceBuildingTypes].filter(([id]) => !buildingTypeIds.has(id)).map(([, caption]) => caption),
      search: `${members[0].dispatchCenterCaption} ${districts.join(" ")} ${federalStates.join(" ")}`.toLocaleLowerCase("de"),
    };
  }).sort((a, b) => collator.compare(a.caption, b.caption));

  const extensions = stations.flatMap((building) => Core.extensionRows(building, typeOf(building)));
  for (const entry of extensions) entry.search = `${entry.caption} ${entry.buildingCaption} ${entry.buildingType} ${entry.dispatchCenterCaption} ${entry.district}`.toLocaleLowerCase("de");
  const personnelRows = operational.map((building) => Core.personnelRow(building, state.scans.stations[String(building.id)]));
  for (const row of personnelRows) row.search = `${row.caption} ${row.typeCaption} ${row.dispatchCenterCaption} ${row.district}`.toLocaleLowerCase("de");

  const distanceById = new Map(vehicleDistances.map((entry) => [Number(entry.vehicle_id), entry]));
  const utilization = Core.rateUtilization(analyzed.map((vehicle) => {
    const distance = distanceById.get(vehicle.id) || {};
    const building = buildingById.get(vehicle.buildingId);
    return { ...vehicle, district: building?.district || "", dispatchCenterCaption: building?.dispatchCenterCaption || "Ohne Leitstelle", distanceTotal: Number(distance.distance_km || 0), distance30d: Number(distance.distance_km_30d || 0) };
  }));

  const alerts = [];
  for (const building of operational) {
    const missingCrew = Number(building.summary?.missingCrew || 0);
    const missingTraining = Number(building.summary?.missingTraining || 0);
    if (!building.enabled) alerts.push({ priority: 3, title: building.caption, detail: "Wache ist inaktiv", tab: "buildings" });
    if (missingCrew) alerts.push({ priority: 4, title: building.caption, detail: `${plural(missingCrew, "Person fehlt", "Personen fehlen")} auf Fahrzeugen`, tab: "personnel" });
    if (missingTraining) alerts.push({ priority: 4, title: building.caption, detail: `${plural(missingTraining, "benötigte Ausbildung fehlt", "benötigte Ausbildungen fehlen")}`, tab: "training" });
  }
  const running = extensions.filter((entry) => entry.status === "building").length;
  const inactive = extensions.filter((entry) => entry.status === "inactive").length;
  if (running) alerts.push({ priority: 1, title: "Laufende Ausbauten", detail: `${plural(running, "Ausbau befindet", "Ausbauten befinden")} sich im Bau`, tab: "extensions" });
  if (inactive) alerts.push({ priority: 2, title: "Fertige Ausbauten", detail: `${plural(inactive, "Ausbau ist", "Ausbauten sind")} fertig, aber inaktiv`, tab: "extensions" });
  alerts.sort((a, b) => b.priority - a.priority || collator.compare(a.title, b.title));

  const training = Core.summarizeTraining(analyzed);
  const courses = Core.courseRows(schoolings, new Map(buildings.map((building) => [Number(building.id), building.caption])), courseDurations);

  state.model = {
    vehicles: analyzed,
    vehicleById: new Map(analyzed.map((vehicle) => [vehicle.id, vehicle])),
    buildings: all,
    buildingById,
    stations,
    operational,
    dispatchCenters: all.filter((building) => building.isDispatchCenter),
    regions,
    extensions,
    personnelRows,
    transfers: Core.suggestTransfers(personnelRows, trainingName),
    utilization,
    alerts,
    training,
    courses,
    counts: {
      dashboard: alerts.length,
      vehicles: analyzed.length,
      buildings: all.length,
      regions: regions.length,
      extensions: extensions.filter((entry) => entry.status !== "missing").length,
      utilization: vehicleDistances.length,
      personnel: personnelRows.length,
      training: training.length,
      courses: courses.length,
      map: all.filter((building) => building.hasLocation).length,
    },
  };
  saveDistrictCache();
}

// Rohdatensätze, die beim Bearbeiten direkt angepasst werden (danach analyze()).
const rawVehicle = (id) => state.data.vehicles.find((vehicle) => Number(vehicle.id) === Number(id));
const rawBuilding = (id) => state.data.buildings.find((building) => Number(building.id) === Number(id));
