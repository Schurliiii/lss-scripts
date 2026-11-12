/*
 * Karte aller Wachen. Die Leaflet-Karte bleibt beim Filtern, Suchen und bei
 * Statusänderungen bestehen; Marker, Bezirke und Leitstellengebiete werden nur
 * abgeglichen. Gezeichnet wird auf Canvas (die Bezirksgrenzen sind sehr detailliert).
 */

const overview = { map: null, container: null, markers: new Map(), markerLayer: null, districts: null, coverage: null, signature: "" };

function vehiclesForFilter(building) {
  const type = state.mapFilter.vehicleType;
  return type === "all" ? building.vehicles : building.vehicles.filter((vehicle) => String(vehicle.typeId) === type);
}

function mapLocations() {
  const filter = state.mapFilter;
  return state.model.buildings.filter((building) => {
    if (!building.hasLocation) return false;
    if (filter.vehicleType !== "all" && !building.vehicles.some((vehicle) => String(vehicle.typeId) === filter.vehicleType)) return false;
    if (filter.buildingType !== "all" && String(building.building_type) !== filter.buildingType) return false;
    if (filter.district !== "all" && building.district !== filter.district) return false;
    if (filter.dispatch !== "all" && (filter.dispatch === "none" ? building.dispatchCenterId !== null : String(building.dispatchCenterId) !== filter.dispatch)) return false;
    const missing = (building.summary?.missingCrew || 0) > 0 || (building.summary?.missingTraining || 0) > 0;
    if (state.onlyMissing && !missing) return false;
    return matches(building.search) || building.vehicles.some((vehicle) => matches(vehicle.search));
  }).sort((a, b) => collator.compare(a.caption, b.caption));
}

function mapTable() {
  return {
    key: "map",
    rows: mapLocations(),
    columns: [
      { label: "Wache", value: (row) => row.caption },
      { label: "Typ", value: (row) => row.typeCaption },
      { label: "Bezirk", value: (row) => row.district },
      { label: "Leitstelle", value: (row) => row.dispatchCenterCaption },
      { label: "Status", value: (row) => (row.enabled ? "aktiv" : "inaktiv") },
      { label: "Fahrzeuge", value: (row) => vehiclesForFilter(row).length },
      { label: "Besatzung fehlt", value: (row) => row.summary?.missingCrew || 0 },
      { label: "Breite", value: (row) => row.latitude },
      { label: "Länge", value: (row) => row.longitude },
    ],
  };
}

function mapFilterHtml() {
  const model = state.model;
  const filter = state.mapFilter;
  const districtData = settings.values.districtsEnabled ? districtGeo() : null;
  const options = (pairs) => pairs.sort((a, b) => collator.compare(a.label, b.label));
  const vehicleTypes = options([...new Map(model.vehicles.map((vehicle) => [String(vehicle.typeId), vehicle.typeCaption]))].map(([value, label]) => ({ value, label })));
  const buildingTypes = options([...new Map(model.buildings.map((building) => [String(building.building_type), building.typeCaption]))].map(([value, label]) => ({ value, label })));
  const districts = uniqueSorted(model.buildings.map((building) => building.district)).map((name) => ({ value: name, label: name }));
  const dispatch = options(model.dispatchCenters.map((building) => ({ value: String(building.id), label: building.caption })));
  const active = Object.values(filter).some((value) => value !== "all");
  const select = (key, all, list, disabled = false) => kit.selectHtml(`data-change="map-filter" data-filter="${key}"${disabled ? " disabled" : ""}`, [{ value: "all", label: all }, ...list], filter[key]);
  const toggle = (change, label, checked, disabled = false) => `<label class="lssfo-toggle"><input class="lssfo-switch" type="checkbox" data-change="${change}"${checked ? " checked" : ""}${disabled ? " disabled" : ""}><span>${label}</span></label>`;
  return `<label class="lssfo-field"><span>Fahrzeugtyp</span>${select("vehicleType", "Alle Fahrzeugtypen", vehicleTypes)}</label>
    <label class="lssfo-field"><span>Wachenart</span>${select("buildingType", "Alle Wachenarten", buildingTypes)}</label>
    <label class="lssfo-field"><span>Leitstelle</span>${select("dispatch", "Alle Leitstellen", [{ value: "none", label: "Ohne Leitstelle" }, ...dispatch])}</label>
    <label class="lssfo-field"><span>Bezirk</span>${select("district", "Alle Bezirke", districts, !districts.length)}</label>
    ${toggle("map-districts", "Bezirksgrenzen", settings.values.districtsEnabled)}
    ${toggle("map-readiness", "Bereitschaft", settings.values.readinessEnabled, !districtData)}
    ${toggle("map-coverage", "Leitstellengebiete", settings.values.coverageEnabled)}
    <button type="button" class="lssfo-btn" data-action="map-filter-reset"${active ? "" : " disabled"}>Filter zurücksetzen</button>
    <span class="lssfo-map-source">${settings.values.districtsEnabled ? (districtData ? "Bezirke: Statistik Austria / GeoSphere Austria (CC BY 4.0)" : "Bezirksdaten konnten nicht geladen werden") : "Bezirksgrenzen ausgeblendet"}</span>`;
}

function mapListHtml(locations) {
  const allTypes = state.mapFilter.vehicleType === "all";
  const items = locations.map((building) => {
    const count = vehiclesForFilter(building).length;
    const subline = [building.typeCaption, building.district ? `Bezirk ${building.district}` : "", building.dispatchCenterCaption, building.enabled ? "aktiv" : "inaktiv"].filter(Boolean).join(" · ");
    return `<button type="button" class="lssfo-map-item${building.enabled ? "" : " is-inactive"}" data-action="map-focus" data-id="${building.id}"><span><strong>${esc(building.caption)}</strong><small>${esc(subline)}</small></span><b>${formatNumber(count)} ${allTypes ? "Fz." : "Treffer"}</b></button>`;
  }).join("");
  return `<div class="lssfo-map-list-head"><strong>${plural(locations.length, "Wache", "Wachen")}</strong><span>Wache anklicken, um die stationierten Fahrzeuge zu sehen.</span></div>${items}`;
}

function renderMap(content) {
  const locations = mapLocations();
  if (overview.map && content.contains(overview.container)) {
    content.querySelector("[data-map-filters]").innerHTML = mapFilterHtml();
    content.querySelector("[data-map-list]").innerHTML = mapListHtml(locations);
    updateMapLayers(locations);
    return;
  }
  destroyOverviewMap();
  content.innerHTML = `<div class="lssfo-map-filters lssfo-panel-card" data-map-filters>${mapFilterHtml()}</div>
    <div class="lssfo-map-layout">
      <aside class="lssfo-map-list" data-map-list>${mapListHtml(locations)}</aside>
      <div class="lssfo-map-stage">
        <div class="lssfo-map-legend"><span><i class="is-ok"></i>vollständig</span><span><i class="is-danger"></i>Fehlbedarf</span><span><i class="is-inactive"></i>inaktiv</span></div>
        <div class="lssfo-map-canvas" aria-label="Karte der Wachen und Fahrzeuge"></div>
      </div>
    </div>`;
  const L = kit.Leaflet();
  const container = content.querySelector(".lssfo-map-canvas");
  if (!L) {
    container.innerHTML = '<div class="lssfo-empty">Die Kartenbibliothek konnte nicht geladen werden. Bitte die Seite neu laden.</div>';
    return;
  }
  const map = L.map(container, { zoomControl: true, preferCanvas: true, minZoom: 5 });
  // Leaflet braucht vor dem ersten Vektor eine gültige Ansicht; eingepasst wird danach.
  map.setView([47.6, 14.2], 7);
  kit.tileLayer().addTo(map);
  overview.map = map;
  overview.container = container;
  overview.markerLayer = L.layerGroup().addTo(map);
  overview.coverage = L.layerGroup().addTo(map);
  overview.signature = "";
  updateMapLayers(locations);
  setTimeout(() => overview.map?.invalidateSize(), 0);
}

function destroyOverviewMap() {
  kit.removeMap(overview.map);
  Object.assign(overview, { map: null, container: null, markers: new Map(), markerLayer: null, districts: null, coverage: null, signature: "" });
}

function districtReadiness() {
  const values = new Map();
  for (const building of state.model.operational) {
    if (!building.district) continue;
    const entry = values.get(building.district) || { buildings: 0, inactive: 0, targetCrew: 0, missingCrew: 0, missingTraining: 0 };
    entry.buildings += 1;
    entry.inactive += building.enabled ? 0 : 1;
    entry.targetCrew += Number(building.summary?.targetCrew || 0);
    entry.missingCrew += Number(building.summary?.missingCrew || 0);
    entry.missingTraining += Number(building.summary?.missingTraining || 0);
    values.set(building.district, entry);
  }
  return values;
}

function updateDistrictLayer() {
  const L = kit.Leaflet();
  const show = settings.values.districtsEnabled && districtGeo();
  if (!show) {
    overview.districts?.remove();
    overview.districts = null;
    return;
  }
  overview.districts ||= L.geoJSON(districtDisplayGeo(), {
    interactive: false,
    onEachFeature: (feature, layer) => layer.bindTooltip("", { permanent: true, direction: "center", className: "lssfo-district-label" }),
  }).addTo(overview.map);
  const dark = shell?.dataset.theme === "dark";
  const readiness = districtReadiness();
  const withScore = settings.values.readinessEnabled;
  overview.districts.eachLayer((layer) => {
    const name = layer.feature.properties.name;
    const values = readiness.get(name);
    const score = values ? Core.readinessScore(values) : null;
    const fill = !withScore ? (dark ? "#f0ad4e" : "#f6b44d") : score >= 90 ? "#34c759" : score >= 70 ? "#ff9500" : score > 0 ? "#ff3b30" : "#8e8e93";
    layer.setStyle({ color: withScore ? fill : dark ? "#f0ad4e" : "#a45c00", weight: 2, opacity: 0.85, fillColor: fill, fillOpacity: withScore ? 0.13 : 0.04, dashArray: "7 5" });
    layer.setTooltipContent(`${esc(name)}${withScore && score !== null ? ` · ${score} %` : ""}`);
  });
}

function updateCoverage() {
  const L = kit.Leaflet();
  overview.coverage.clearLayers();
  if (!settings.values.coverageEnabled) return;
  for (const dispatch of state.model.dispatchCenters) {
    if (!dispatch.hasLocation || (state.mapFilter.dispatch !== "all" && String(dispatch.id) !== state.mapFilter.dispatch)) continue;
    const distances = state.model.operational
      .filter((building) => building.dispatchCenterId === dispatch.id && building.hasLocation)
      .map((building) => kit.haversine(dispatch.latitude, dispatch.longitude, building.latitude, building.longitude));
    const radius = Math.min(Math.max(4000, ...distances) * 1.08, 180000);
    L.circle([dispatch.latitude, dispatch.longitude], { radius, color: "#007aff", weight: 1.5, dashArray: "8 6", fillColor: "#007aff", fillOpacity: 0.035, interactive: false }).addTo(overview.coverage);
  }
}

function markerStyle(building) {
  const vehicles = vehiclesForFilter(building);
  const missing = (building.summary?.missingCrew || 0) > 0 || (building.summary?.missingTraining || 0) > 0;
  const color = !building.enabled ? ["#5f666b", "#8e8e93"] : missing ? ["#a1131b", "#ff3b30"] : ["#1f7a35", "#34c759"];
  return { radius: Math.min(14, 6 + Math.sqrt(vehicles.length)), weight: 2, color: color[0], fillColor: color[1], fillOpacity: 0.88 };
}

function markerTooltip(building) {
  return `${esc(building.caption)} · ${plural(vehiclesForFilter(building).length, state.mapFilter.vehicleType === "all" ? "Fahrzeug" : "passendes Fahrzeug", state.mapFilter.vehicleType === "all" ? "Fahrzeuge" : "passende Fahrzeuge")}`;
}

function popupHtml(id) {
  const building = state.model.buildingById.get(id);
  if (!building) return "";
  const vehicles = vehiclesForFilter(building).slice().sort((a, b) => collator.compare(a.caption, b.caption));
  const missingVehicles = vehicles.filter((vehicle) => vehicle.hasMissing).length;
  const rows = vehicles.map((vehicle) => {
    const status = vehicle.missingCrew > 0 ? `${plural(vehicle.missingCrew, "Person fehlt", "Personen fehlen")}` : vehicle.missingTraining > 0 ? `${vehicle.missingTraining} Ausbildung fehlt` : "vollständig";
    return `<li class="${vehicle.hasMissing ? "has-missing" : "is-complete"}"><span>${gameLink(`/vehicles/${vehicle.id}/zuweisung`, vehicle.caption)}<small>${esc(vehicle.typeCaption)} · ${vehicle.assigned}/${vehicle.target} Personen</small></span><b>${esc(status)}</b></li>`;
  }).join("") || '<li class="lssfo-muted">Keine Fahrzeuge an dieser Wache</li>';
  const hint = state.mapFilter.vehicleType === "all" ? "stationiert" : `passend · insgesamt ${formatNumber(building.vehicles.length)}`;
  return `<div class="lssfo-popup"><h3>${gameLink(`/buildings/${id}`, building.caption)}</h3>
    <div class="lssfo-popup-meta">${building.district ? `<span class="lssfo-chip">Bezirk ${esc(building.district)}</span>` : ""}${statusCell(building)}</div>
    <p>${plural(vehicles.length, "Fahrzeug", "Fahrzeuge")} ${hint} · <strong class="${missingVehicles ? "is-danger" : "is-ok"}">${missingVehicles ? `${plural(missingVehicles, "Fahrzeug", "Fahrzeuge")} mit Fehlbedarf` : "Besatzung vollständig"}</strong></p>
    <ul>${rows}</ul></div>`;
}

function updateMapLayers(locations) {
  const L = kit.Leaflet();
  if (!overview.map || !L) return;
  updateDistrictLayer();
  updateCoverage();
  const wanted = new Set(locations.map((building) => building.id));
  for (const [id, marker] of overview.markers) {
    if (wanted.has(id)) continue;
    overview.markerLayer.removeLayer(marker);
    overview.markers.delete(id);
  }
  for (const building of locations) {
    let marker = overview.markers.get(building.id);
    if (!marker) {
      // Popup-Inhalt entsteht erst beim Öffnen.
      marker = L.circleMarker([building.latitude, building.longitude], markerStyle(building))
        .bindTooltip(markerTooltip(building))
        .bindPopup(() => popupHtml(building.id), { maxWidth: 440, maxHeight: 390 });
      overview.markerLayer.addLayer(marker);
      overview.markers.set(building.id, marker);
    } else {
      marker.setStyle(markerStyle(building));
      marker.setTooltipContent(markerTooltip(building));
      if (marker.isPopupOpen()) marker.setPopupContent(popupHtml(building.id));
    }
  }
  // Neu eingepasst wird nur, wenn sich die Auswahl der Wachen geändert hat.
  const signature = locations.map((building) => building.id).join(",");
  if (signature === overview.signature) return;
  overview.signature = signature;
  if (locations.length === 1) overview.map.setView([locations[0].latitude, locations[0].longitude], 13);
  else if (locations.length) overview.map.fitBounds(locations.map((building) => [building.latitude, building.longitude]), { padding: [28, 28], maxZoom: 13 });
}

function focusMapBuilding(id) {
  const marker = overview.markers.get(id);
  if (!marker || !overview.map) return;
  overview.map.setView(marker.getLatLng(), Math.max(overview.map.getZoom(), 13), { animate: true });
  marker.openPopup();
}

kit.on({
  click: {
    "map-focus": (element) => focusMapBuilding(Number(element.dataset.id)),
    "map-filter-reset": () => {
      state.mapFilter = { vehicleType: "all", buildingType: "all", district: "all", dispatch: "all" };
      renderContent();
    },
  },
  change: {
    "map-filter": (element) => {
      state.mapFilter[element.dataset.filter] = element.value;
      renderContent();
    },
    "map-districts": (element) => {
      settings.set({ districtsEnabled: element.checked });
      renderContent();
    },
    "map-readiness": (element) => {
      settings.set({ readinessEnabled: element.checked });
      renderContent();
    },
    "map-coverage": (element) => {
      settings.set({ coverageEnabled: element.checked });
      renderContent();
    },
  },
});
