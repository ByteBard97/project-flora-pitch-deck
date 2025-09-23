Perfect — below is a practical, copy-and-pasteable **demo plan** you can implement to show “type an address → parcel + roads + imagery + terrain” in 1–2 clicks. It’s focused on reproducible, offline-friendly steps you can prefetch for Annie and Jake (or run live if you want arbitrary addresses). I include exact data sources, commands (GDAL/ogr2ogr/Overpass), file formats to produce, coordinate/CRS guidance, and how to wire the assets into your prototype.

I assume you already have GIS comfort (GeoTIFFs, KML, GDAL) — so this is intentionally practical and prescriptive.

---

# Goal (demo)

Given an address, show (instantly):

- parcel polygon (GeoJSON),
- aerial imagery clipped to parcel (PNG or web tile),
- street centerlines (GeoJSON),
- simple terrain/heightmap (PNG or 2D float grid),
- (optional) building footprints (GeoJSON),
  all rendered together in your 2D editor and available to drape into the 3D walkaround.

You’ll deliver a folder per demo address:

```
/demo/annie_nursery/
  parcel.geojson
  ortho.png
  ortho.aff (worldfile)  OR scene metadata with affine
  roads.geojson
  buildings.geojson
  heightmap.png   (grayscale or Mapbox Terrain-RGB)
  dem_meta.json   (scale/origin)
  scene.json      (scene manifest: units, origin, assets)
```

---

# Data sources (recommended)

- Parcel polygons: county GIS portal if available (free), else Regrid / ReportAll (trial), or manually digitize in QGIS.
- Roads: **US Census TIGER/Line - All Roads** (public domain) OR **OpenStreetMap** (Overpass) for richer attributes (note ODbL).
- Aerial imagery: **Mapbox Satellite** (easy, dev keys; caching rules), **Google Static** (license restrictions), or **USDA NAIP** (public domain; best for demo packaging).
- Elevation: **USGS 3DEP DEM** (public domain) or Mapbox Terrain-RGB (if using Mapbox).
- Building footprints: Microsoft Open Buildings / local GIS / OSM buildings.

License tip: Use NAIP/USGS/TIGER for demo builds because they’re public domain and safe to cache/distribute. Use Mapbox/Google for live calls if you follow their terms.

---

# Implementation Plan (step-by-step)

## 0) Prep: pick addresses

Decide the two addresses to showcase (Annie’s nursery, Jake’s house). Get exact street addresses or parcel IDs.

### If you can’t get county parcels: trace manually

Open the parcel on a county viewer or Google Earth, trace in QGIS and save GeoJSON (acceptable for demo).

---

## 1) Geocode (address → lat/lon + bbox)

**Option A (offline demo):** skip — you already know the addresses and will ship precomputed assets.

**Option B (live demo):** use Census Geocoder (free) or Mapbox/Google geocoding.
Example (Census single lookup, HTTP GET):

```
https://geocoding.geo.census.gov/geocoder/locations/onelineaddress?address=1600+Pennsylvania+Ave+NW,+Washington,+DC&benchmark=Public_AR_Current&format=json
```

Use returned lon/lat to form a small bbox (buffer \~25–75 m).

---

## 2) Parcel polygon

**If county portal provides GeoJSON/shapefile**: download and extract the parcel polygon.

**If county provides WMS/WFS or shp**:

- Use `ogr2ogr` to export GeoJSON clipped to your bbox:

```bash
# example: clip county parcels shapefile to bbox
ogr2ogr -f GeoJSON parcel.geojson county_parcels.shp -clipsrc minX minY maxX maxY
```

**If using Regrid/ReportAll API**: request parcel by address (trial keys available), save GeoJSON.

If manual tracing: save KML/GeoJSON from QGIS.

---

## 3) Aerial imagery (orthophoto) — produce an image tile cropped to bbox/parcel

### Option 1 — NAIP (public domain) — recommended for demo packaging

- Find NAIP tile covering bbox (download from USDA or state NAIP sites).
- Use `gdalwarp` to reproject + crop:

```bash
gdalwarp -of GTiff -te minX minY maxX maxY -tr 0.5 0.5 NAIP.tif ortho_crop.tif
gdal_translate -of PNG ortho_crop.tif ortho.png
# export a worldfile or keep the GeoTIFF for affine
```

Save `ortho.png` + `ortho.tfw` (or keep GeoTIFF and convert client-side).

### Option 2 — Mapbox Static or Google Static (fast)

- Call Mapbox Static API with bbox or center+zoom, download PNG. Mapbox: free dev tier. Mind caching rules.

---

## 4) Roads (street centerlines)

**Prefer**: TIGER/Line roads (public domain) or OSM via Overpass.

### TIGER (download by county/state) & clip:

```bash
# download and unzip TIGER roads for the state (one-time)
ogr2ogr -f GeoJSON roads_clip.geojson tiger_roads.shp -clipsrc minX minY maxX maxY
```

### OSM Overpass example (bbox-based):

```
[out:json][timeout:25];
(
  way["highway"]({{minY}},{{minX}},{{maxY}},{{maxX}});
);
out geom;
```

You can run an Overpass HTTP POST and convert to GeoJSON.

Simplify and save `roads.geojson`. Optionally create a buffer (3–5m) to visualize pavement width.

---

## 5) Building footprints (optional)

- Microsoft Building Footprints (USA) or OSM buildings.
- Clip same as roads to bbox and save `buildings.geojson`.

---

## 6) Elevation / DEM → heightmap for browser

Two routes depending on renderer:

### A) DEM → grayscale 8/16-bit PNG heightmap (simple)

- Download USGS DEM (GeoTIFF) for bbox.
- Resample to small grid (e.g., 256×256) for browser:

```bash
gdalwarp -te minX minY maxX maxY -ts 256 256 -r bilinear input_dem.tif dem_256.tif
gdal_translate -of PNG dem_256.tif heightmap.png
```

- Keep a metadata sidecar (`dem_meta.json`) with bounding box and min/max elevation to map pixel→meters.

### B) Terrain-RGB (Mapbox style) for better precision

- If using Mapbox, you can request Terrain-RGB tiles; decode in-browser to get elevations.
- Easier for live integration; for offline demo prefer A.

Also create contour lines (optional) for plan view:

```bash
gdal_contour -a ELEV dem_256.tif contours.geojson -i 0.25
```

---

## 7) Reproject / local coordinate system

- Keep all outputs in a consistent CRS: either WGS84 (EPSG:4326) for GeoJSON and lat/lon, or convert to a local, meter-based projected CRS (WebMercator EPSG:3857 or better: local UTM / state plane) for metric accuracy.
- For browser rendering and measurements in meters you’ll probably want WebMercator (3857) or convert to a local ENU with an origin near the parcel (preferred for precision). Provide `scene.json` with `meta.origin` lat/lon and `units: m` and supply affine transform info for raster.

Example `scene.json` snippet:

```json
{
 "meta": { "units": "m", "crs": "EPSG:3857", "origin": {"lat":37.1234,"lon":-122.1234} },
 "assets": {
   "ortho": "ortho.png",
   "parcel": "parcel.geojson",
   "roads": "roads.geojson",
   "heightmap": {"file":"heightmap.png","width":256,"height":256,"bbox":[minX,minY,maxX,maxY],"zmin":10,"zmax":20}
 }
}
```

---

## 8) Preprocessing utilities & helpful commands

- GDAL/OGR: `gdalwarp`, `gdal_translate`, `ogr2ogr`, `gdal_contour`.
- QGIS: manual digitizing and quick exports.
- PDAL (for point cloud/LiDAR) if you ever need to produce DEMs from LAS.
- Tip: use `-co COMPRESS=DEFLATE` for GeoTIFFs and `-simplify` options on `ogr2ogr` for GeoJSON simplification.

---

## 9) Example shell script (simplified)

```bash
# vars: minX,minY,maxX,maxY, state_shp, naip.tif, dem.tif
ogr2ogr -f GeoJSON parcel.geojson parcel_shp.shp -clipsrc $minX $minY $maxX $maxY
gdalwarp -te $minX $minY $maxX $maxY -tr 0.5 0.5 naip.tif ortho_crop.tif
gdal_translate -of PNG ortho_crop.tif ortho.png
ogr2ogr -f GeoJSON roads.geojson tiger_roads.shp -clipsrc $minX $minY $maxX $maxY
gdalwarp -te $minX $minY $maxX $maxY -ts 256 256 -r bilinear dem.tif dem_256.tif
gdal_translate -of PNG dem_256.tif heightmap.png
gdal_contour -a ELEV dem_256.tif contours.geojson -i 0.25
```

---

## 10) Frontend: how to consume in Pixi/Babylon

- 2D editor (Pixi): load `ortho.png` as background; apply affine/worldfile to convert pixel→meters for placements; load `parcel.geojson` and render as polygon layer; overlay `roads.geojson` and `buildings.geojson`.
- Height/terrain: load `heightmap.png` + `dem_meta.json` → create a small grid and construct a Babylon ground mesh using per-vertex heights (or simply shade the 2D plan using contour lines).
- 3D Doom view (Babylon): drape the `ortho.png` as texture over the terrain mesh; load parcels/roads as thin extrusions or polylines; plants as billboards.

Important: centralize transforms: provide functions `worldToPixel(x,y)` and `pixelToWorld(i,j)` derived from the `scene.json` bounding box.

---

## 11) Demo UX / script

- Step 1: show a search bar with two choices (Annie / Jake) — when selected, load corresponding `demo/<name>/scene.json` instantly.
- Step 2: show parcel + ortho + roads overlay. Show a brief “map legend” and highlight parcel boundary.
- Step 3: demonstrate drop-a-plant → count appears → generate plant list PDF (bundled data).
- Step 4 (optional): toggle “Show Terrain” to visualize slopes or click “Walk” for Doom-mode.

Make it feel instant: preload the demo assets and animate a small “fetching” progressbar for realism.

---

## 12) Caching & runtime cost control

- For packaged demo assets (Annie/Jake), host them locally or bundle with the app — zero runtime API calls.
- For live arbitrary-address mode, cache geocoded lat/lon and parcel GeoJSON in a small key-value store (Redis or filesystem) and obey provider TOS about caching. Use NAIP/USGS DEMs for cached heightmaps.

---

## 13) Failure modes & fallbacks

- If parcel not found: show orthophoto + let user draw parcel polygon manually (still impressive).
- If county parcel data is behind a paywall: use parcel outline from Regrid/ReportAll trial OR let user upload a KML.
- If DEM missing: render flat plan and show a “terrain unavailable” overlay.

---

## 14) Legal / licensing checklist

- NAIP & USGS DEMs: public domain — safe to cache and distribute.
- TIGER roads: public domain.
- OSM roads/buildings: ODbL — OK to display with attribution; if you persist OSM into your DB and redistribute derivatives you must follow ODbL share-alike rules. For demo, display with attribution and don’t redistribute as a dataset.
- Mapbox/Google imagery: check tile usage and caching policies. If you prefetch imagery for distribution, prefer NAIP or negotiate licenses.

---

## 15) Optional polishing / UX details

- Auto-scale labels to parcel size; provide a “measure tool” (distance/area).
- Add a subtle hillshade overlay to the ortho to visualize slope without full 3D.
- Draw roads thicker for major roads; use dashed for driveways (heuristic via `highway` tags).
- Snap parcel origin to (0,0) local tangent in your scene JSON to avoid floating point inaccuracy.

---

# Quick checklist for your first build

- [ ] Choose two demo addresses and get parcel polygons (or trace).
- [ ] Download NAIP ortho for bbox and crop to PNG.
- [ ] Download USGS DEM for bbox and resample to 256×256 heightmap.
- [ ] Download TIGER roads and clip to bbox.
- [ ] Build `scene.json` manifest and bundle folder.
- [ ] Wire frontend to load manifest and render ortho/parcel/roads/heightmap.
- [ ] Script the UI to pick the demo addresses (faux “live” search).
- [ ] Add plant-drop + plant-list export to complete the story.

---

If you’d like, I can do one of the following next (pick one and I’ll produce it immediately):

1. Provide exact Overpass and TIGER download links + an example Overpass query for a given lat/lon/bbox you paste here.
2. Generate a ready-to-run shell script (with your chosen bbox/address values) that downloads NAIP/USGS/TIGER where available and produces the files above.
3. Draft the small `scene.json` spec + a minimal Pixi/Babylon bootstrap snippet that loads `ortho.png`, `parcel.geojson`, and `heightmap.png` so you can paste into your demo repo.

Which of those do you want me to produce now?
