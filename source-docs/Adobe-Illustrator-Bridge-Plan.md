here’s a crisp, build-oriented doc you can hand to Annie (and your future self) that lists the features and **where the core logic should live**. i grouped by workflow areas and kept the “thin plugin / thick Django” philosophy, with C++ reserved only for real-time tool feel.

---

# Plant-Aware Illustrator: Feature Map & Logic Placement

**Legend (Core Logic Location):**

- **C++** = native Illustrator plug-in (only if we need pointer-down, buttery interaction)
- **HTML/JS** = UXP panel UI (HTML/CSS/JS inside Illustrator)
- **Django** = server API (Python/Django + DRF; Shapely/GEOS for geometry)
- **Ext. Script** = external Python CLI/notebook (GDAL, rasterio, Shapely) run outside Illustrator
- **Babylon** = browser viewer for 2.5D “cardboard cutout” walkthrough

---

## A) Library, Symbols, Data

| Feature                                | What it does                                                                            | Core Logic  | Secondary                | Notes / Priority                                              |
| -------------------------------------- | --------------------------------------------------------------------------------------- | ----------- | ------------------------ | ------------------------------------------------------------- |
| Plant Database (CRUD, search, filters) | Central store of species, traits (spread, height, sun, water, native flag, cost, bloom) | **Django**  | HTML/JS (UI)             | High. Server-backed so we can update without re-shipping.     |
| Plant Picker Panel                     | Browse/filter plants, insert into doc                                                   | **HTML/JS** | Django (API)             | High. Panel calls `/plants` and drops symbol with `plant_id`. |
| Symbol/Style Manager                   | Map plant → Illustrator symbol(s), scale rules                                          | **HTML/JS** | Django (symbol metadata) | High. Store symbol refs/styles server-side; cache locally.    |
| Favorites / Palettes                   | Save reusable plant sets                                                                | **Django**  | HTML/JS                  | Med. Boosts speed on repeat jobs.                             |
| Sync Library                           | Pull updated plants/symbols                                                             | **HTML/JS** | Django                   | High. No binary re-ship for data.                             |
| Doc/Art Metadata                       | Persist plant IDs/attrs in .ai                                                          | **HTML/JS** | —                        | High. Use Illustrator dictionaries/notes keyed by `plant_id`. |

---

## B) Layout & Automation (on-canvas work)

| Feature                                        | What it does                                      | Core Logic                | Secondary                          | Notes / Priority                                                               |
| ---------------------------------------------- | ------------------------------------------------- | ------------------------- | ---------------------------------- | ------------------------------------------------------------------------------ |
| Place Along Path                               | Given a path + spacing → positions                | **Django** (spacing math) | HTML/JS (send path, place results) | High. Robust via Shapely; deterministic.                                       |
| Mass Fill Area (Beds, Groundcover)             | Fill polygon with packed layout (grid/hex/jitter) | **Django**                | HTML/JS                            | High. Server generates points; panel places symbols.                           |
| Hedgerow / Border Tool                         | Linear or mixed hedge with rules                  | **Django**                | HTML/JS                            | Med. Same as along-path with variants.                                         |
| Live “Ghost” Preview while dragging (optional) | 60 fps preview as user draws                      | **C++**                   | Django (final commit)              | Only if needed. Add native tool for silky preview; still post final to server. |
| Spacing / Overlap Checker                      | Validate mature-spread clearances                 | **Django**                | HTML/JS (highlight offenders)      | High. Use buffers/intersections.                                               |
| Swap Species (global/selection)                | Replace species & symbols at scale                | **HTML/JS**               | Django (resolve targets)           | High. Local edit of placed art + server bookkeeping.                           |
| Auto-Labeling                                  | Place labels (common/botanical)                   | **HTML/JS**               | Django (style templates optional)  | High. Local placement logic; style presets come from server.                   |
| Growth / Maturity Preview                      | Toggle future spread circles                      | **HTML/JS**               | Django (reads spread values)       | High. Simple: draw circles from metadata; no physics needed.                   |
| Pathfinder shortcuts                           | Unite/intersect/trim with host ops                | **HTML/JS**               | —                                  | Med. Invoke Illustrator commands; defer complex CG to server.                  |

---

## C) Reporting & Deliverables

| Feature                     | What it does                                  | Core Logic  | Secondary                               | Notes / Priority                                                                |
| --------------------------- | --------------------------------------------- | ----------- | --------------------------------------- | ------------------------------------------------------------------------------- |
| Plant Schedule / Legend     | Counts, species list, optional costs; CSV/PDF | **Django**  | HTML/JS (insert SVG table or save file) | High. Authoritative count server-side; option to return an SVG legend to place. |
| Cost Estimator (basic)      | Multiply counts × unit costs                  | **Django**  | HTML/JS                                 | Med. Keep simple at first.                                                      |
| Export Layout Manifest      | Positions/species for external viewers        | **HTML/JS** | Django (schema/versioning)              | High. JSON manifest with (x,y,plant_id,rotation).                               |
| Import/Update from Manifest | Round-trip edits back into Illustrator        | **HTML/JS** | Django (validation)                     | Med. Useful for team workflows.                                                 |

---

## D) GIS / Site Context (externalized)

| Feature                                          | What it does                                 | Core Logic      | Secondary                           | Notes / Priority                                                 |
| ------------------------------------------------ | -------------------------------------------- | --------------- | ----------------------------------- | ---------------------------------------------------------------- |
| Site Preprocessing (DEM, NAIP, parcel, contours) | Clip/warp to site; produce scaled background | **Ext. Script** | Django (job orchestration optional) | High. One-time per site. Outputs: scaled SVG/DXF + raster.       |
| Import Scaled Background                         | Bring prepared layers into Illustrator       | **HTML/JS**     | —                                   | High. Keep plugin simple: place images/vectors with known scale. |
| Coordinate/Scale Settings                        | Project units, scale, origin                 | **HTML/JS**     | Django (store per-project)          | Med. Needed for consistent exports.                              |

---

## E) 2.5D Client Viewer (later but planned)

| Feature                  | What it does                          | Core Logic      | Secondary            | Notes / Priority                                             |
| ------------------------ | ------------------------------------- | --------------- | -------------------- | ------------------------------------------------------------ |
| GLB “WAD” Export         | Terrain mesh + texture in one file    | **Ext. Script** | Django (serve files) | Med. Use glTF/GLB with KTX2 textures.                        |
| Sprite Atlas (plants)    | Atlas textures for “cardboard” plants | **Ext. Script** | Django               | Med. Pack PNGs → KTX2.                                       |
| Web Viewer (walkthrough) | Load GLB + manifest + atlas           | **Babylon**     | Django (hosting)     | Med. Minimal JS via Babylon Viewer + \~40 lines for sprites. |

---

## F) Admin, Auth, DevOps

| Feature                       | What it does                   | Core Logic  | Secondary     | Notes / Priority                                   |
| ----------------------------- | ------------------------------ | ----------- | ------------- | -------------------------------------------------- |
| Auth (plugin ↔ API)          | Token login; project scoping   | **Django**  | HTML/JS       | High. Store token in UXP secure storage.           |
| Caching / Offline Starter Set | Small local DB & symbols       | **HTML/JS** | Django (sync) | Med. Starter SQLite/JSON for a few hundred plants. |
| Telemetry (opt-in)            | Usage metrics to guide roadmap | **Django**  | HTML/JS       | Low/Med. Anonymous, for product learning.          |

---

# Event/Data Flows (concrete)

1. **Place Along Path**
   - HTML/JS: read selected path → `POST /layout/along_path { polyline, spacing, plant_id }` → Django/Shapely returns `[ {x,y}, … ]` → panel inserts symbols; writes `plant_id` into art metadata.

2. **Mass Fill Area**
   - HTML/JS: send polygon + spacing/density → Django returns packed points → panel places symbols.

3. **Spacing Check**
   - HTML/JS: gather centers + spreads → `POST /check/spacing` → Django returns violating IDs/edges → panel highlights (e.g., red halos).

4. **Schedule**
   - HTML/JS: `GET /schedule?doc_id=…` (or send current instance list) → Django returns JSON + SVG legend (optional) → panel places legend onto a “Schedules” layer or saves CSV/PDF.

5. **Growth Preview**
   - HTML/JS: toggle → draw transient circles per instance using `spread/2` from metadata (no server call).

6. **Swap Species**
   - HTML/JS: select scope (selection/all of species A) → replace symbol & metadata in art; Django logs changes or updates schedule on next request.

---

# When to add C++ (clear decision rule)

Add a tiny native tool **only** if you need:

- **Per-frame, pointer-down previews** (painting hedgerows/arrays at 60 fps), or
- A **true Illustrator Tool** (custom cursors, modifiers) beyond what a panel-based workflow can comfortably provide.

Even then, keep the final math canonical in **Django** (the tool previews locally; commits via API).

---

# Minimum Endpoint Sketch (Django)

- `GET /plants?q=&traits=…` → list `{id, name_common, name_botanical, traits, symbol_ref, spread_m, height_m, cost}`
- `POST /layout/along_path` → `{ polyline:[[x,y],…], spacing_m, plant_id, jitter? }` → `[{x,y,rotation?}, …]`
- `POST /layout/fill` → `{ polygon:[[x,y],…], spacing_m|density, plant_id, pattern: "grid|hex|jitter" }` → `[{x,y}, …]`
- `POST /check/spacing` → `{ instances:[{id, x,y, spread_m}], min_clearance? }` → `{ violations:[{a_id,b_id, overlap_m}], summary }`
- `GET /schedule?doc_id=…` or `POST /schedule` with instances → `{ rows:[{plant_id, name, count, cost?}], svg_legend? }`

---

## Priorities (MVP first)

**MVP (inside Illustrator):**

- Plant Picker, Place Along Path, Fill Area, Auto-Label, Schedule, Growth Preview, Spacing Check (batch).

**Phase 2 (polish / speed):**

- Swap Species, Favorites/Palettes, Sync Library, Pathfinder shortcuts.

**Phase 3 (wow / presentation):**

- GIS external pipeline import button, GLB/manifest export, Babylon viewer.

---

this keeps your C++ surface area tiny, maximizes your python velocity, and gives Annie immediate, visible wins in illustrator. if you want, i can turn this into a lightweight RFC with API schemas and a starter UXP panel scaffold so you can start coding this week.
