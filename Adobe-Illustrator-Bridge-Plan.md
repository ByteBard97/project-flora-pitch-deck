# Plant-Aware Illustrator: Updated Architecture (Client-Side Focus)

**Legend (Core Logic Location):**

- **HTML/JS** \= UXP panel UI (HTML/CSS/JS inside Illustrator) - **PRIMARY for all computational work**
- **Django** \= minimal server API (read-only plant database, sync only)
- **C++** \= native Illustrator plug-in (only if we need pointer-down, buttery interaction)
- **Ext. Script** \= external Python CLI/notebook (GDAL, rasterio) run outside Illustrator
- **Babylon** \= browser viewer for 2.5D "cardboard cutout" walkthrough

**🎯 Revised Architecture Principles:**
- **Single-user focused** - No team collaboration complexity initially
- **Client-side computational geometry** - All layout algorithms in JavaScript
- **Minimal server dependencies** - Django provides read-only plant data only
- **Offline-capable** - Plugin works without internet after initial sync
- **Local state management** - Project settings and layouts stored in Illustrator documents

---

## A) Library, Symbols, Data

| Feature | What it does | Core Logic | Secondary | Notes / Priority |
| :---- | :---- | :---- | :---- | :---- |
| Plant Database (read-only) | Central store of species, traits (spread, height, sun, water, native flag, cost, bloom) | **Django** | — | High. Server provides read-only plant data for sync. |
| Plant Picker Panel | Browse/filter plants, insert into doc | **HTML/JS** | Django (sync only) | High. Panel uses cached plant data; calls `/plants/sync` periodically. |
| Symbol/Style Manager | Map plant → Illustrator symbol(s), scale rules | **HTML/JS** | — | High. All symbol/style logic client-side using cached metadata. |
| Favorites / Palettes | Save reusable plant sets | **HTML/JS** | — | Med. Store in Illustrator document metadata or local storage. |
| Sync Library | Pull updated plants/symbols | **HTML/JS** | Django (sync endpoint) | High. Optimized `/plants/sync?since=timestamp` endpoint. |
| Doc/Art Metadata | Persist plant IDs/attrs in .ai | **HTML/JS** | — | High. Use Illustrator dictionaries/notes keyed by `plant_id`. |

---

## B) Layout & Automation (on-canvas work)

| Feature | What it does | Core Logic | Secondary | Notes / Priority |
| :---- | :---- | :---- | :---- | :---- |
| Place Along Path | Given a path \+ spacing → positions | **HTML/JS** (JavaScript geometry) | — | High. Linear interpolation and spacing calculations in client. |
| Mass Fill Area (Beds, Groundcover) | Fill polygon with packed layout (grid/hex/jitter) | **HTML/JS** (JavaScript algorithms) | — | High. Grid, hex, and jitter patterns calculated client-side. |
| Hedgerow / Border Tool | Linear or mixed hedge with rules | **HTML/JS** | — | Med. Same as along-path with variants, all client-side. |
| Live "Ghost" Preview while dragging (optional) | 60 fps preview as user draws | **HTML/JS** | C++ (if needed for performance) | Med. Real-time feedback during placement, all local. |
| Spacing / Overlap Checker | Validate mature-spread clearances | **HTML/JS** (distance calculations) | — | High. Distance calculations and overlap detection in JavaScript. |
| Swap Species (global/selection) | Replace species & symbols at scale | **HTML/JS** | — | High. Direct manipulation of placed art using cached plant data. |
| Auto-Labeling | Place labels (common/botanical) | **HTML/JS** | — | High. Place text directly in Illustrator using cached plant metadata. |
| Growth / Maturity Preview | Toggle future spread circles | **HTML/JS** | — | High. Draw maturity circles using cached spread values from plant data. |
| Pathfinder shortcuts | Unite/intersect/trim with host ops | **HTML/JS** | — | Med. Invoke Illustrator commands directly. |

---

## C) Reporting & Deliverables

| Feature | What it does | Core Logic | Secondary | Notes / Priority |
| :---- | :---- | :---- | :---- | :---- |
| Plant Schedule / Legend | Counts, species list, optional costs; CSV/PDF | **HTML/JS** (count from document) | Django (optional export endpoint) | High. Count plants directly from Illustrator document; format locally. |
| Cost Estimator (basic) | Multiply counts × unit costs | **HTML/JS** | — | Med. Calculate using cached plant cost data, all client-side. |
| Export Layout Manifest | Positions/species for external viewers | **HTML/JS** | Django (optional storage) | High. JSON manifest with (x,y,plant\_id,rotation) generated locally. |
| Import/Update from Manifest | Round-trip edits back into Illustrator | **HTML/JS** | Django (optional validation) | Med. Parse and place from manifest, all local operations. |

---

## D) GIS / Site Context (externalized)

| Feature | What it does | Core Logic | Secondary | Notes / Priority |
| :---- | :---- | :---- | :---- | :---- |
| Site Preprocessing (DEM, NAIP, parcel, contours) | Clip/warp to site; produce scaled background | **Ext. Script** | Django (job orchestration optional) | High. One-time per site. Outputs: scaled SVG/DXF \+ raster. |
| Import Scaled Background | Bring prepared layers into Illustrator | **HTML/JS** | — | High. Keep plugin simple: place images/vectors with known scale. |
| Coordinate/Scale Settings | Project units, scale, origin | **HTML/JS** | Django (store per-project) | Med. Needed for consistent exports. |

---

## E) 2.5D Client Viewer (later but planned)

| Feature | What it does | Core Logic | Secondary | Notes / Priority |
| :---- | :---- | :---- | :---- | :---- |
| GLB “WAD” Export | Terrain mesh \+ texture in one file | **Ext. Script** | Django (serve files) | Med. Use glTF/GLB with KTX2 textures. |
| Sprite Atlas (plants) | Atlas textures for “cardboard” plants | **Ext. Script** | Django | Med. Pack PNGs → KTX2. |
| Web Viewer (walkthrough) | Load GLB \+ manifest \+ atlas | **Babylon** | Django (hosting) | Med. Minimal JS via Babylon Viewer \+ \~40 lines for sprites. |

---

## F) Admin, Auth, DevOps

| Feature | What it does | Core Logic | Secondary | Notes / Priority |
| :---- | :---- | :---- | :---- | :---- |
| Auth (plugin ↔ API) | Simple token for sync access | **Django** | HTML/JS | Low. Optional simple token for sync endpoint access. |
| Caching / Offline Plant Data | Local plant database & symbols | **HTML/JS** | Django (sync only) | High. Cache all plant data locally; work offline after sync. |
| Telemetry (opt-in) | Usage metrics to guide roadmap | **HTML/JS** | Django (optional collection) | Low. Anonymous usage data, minimal server involvement. |

---

# Event/Data Flows (Updated for Client-Side Architecture)

1. **Plugin Startup & Plant Sync**

   - HTML/JS: Check local plant cache → if expired or requested: `GET /api/plants/sync?since=timestamp` → Django returns updated plants → cache locally → ready for offline work.



2. **Place Along Path**

   - HTML/JS: read selected path → calculate positions using JavaScript geometry (linear interpolation, spacing) → place symbols directly → store `plant_id` in Illustrator metadata.



3. **Mass Fill Area**

   - HTML/JS: read polygon → run grid/hex/jitter algorithm in JavaScript → calculate packed points locally → place symbols → store metadata.



4. **Spacing Check**

   - HTML/JS: gather all plant instances from document → calculate distances using JavaScript → identify violations → highlight overlapping plants with visual feedback.



5. **Schedule Generation**

   - HTML/JS: count plants directly from document metadata → format schedule using cached plant data (names, costs) → generate CSV/SVG locally or save to file.



6. **Growth Preview**

   - HTML/JS: toggle → draw transient circles per instance using cached `spread` values from plant data (no server call).



7. **Swap Species**

   - HTML/JS: select scope → replace symbols and metadata directly in document → update using cached plant data.

---

# When to add C++ (clear decision rule)

Add a tiny native tool **only** if you need:

- **Per-frame, pointer-down previews** (painting hedgerows/arrays at 60 fps), or
- A **true Illustrator Tool** (custom cursors, modifiers) beyond what a panel-based workflow can comfortably provide.

Since all computational work now happens client-side, C++ tools would preview and execute locally without server dependencies.

---

# Simplified Django API (Read-Only Focus)

**Essential Endpoints:**
- `GET /api/plants/` → list `{id, name_common, name_botanical, traits, symbol_ref, spread_m, height_m, cost, svg_symbol, plan_color, plan_radius_m}`
- `GET /api/plants/sync?since=timestamp` → optimized sync endpoint returning only updated plants since timestamp
- `GET /api/plants/{id}/` → detailed plant data

**Optional Future Endpoints:**
- `POST /api/manifests/export` → store layout manifest for sharing (optional)
- `GET /api/manifests/{id}/` → retrieve shared manifest (optional)

**Removed Endpoints (Now Client-Side):**
- ~~`POST /layout/along_path`~~ → JavaScript geometry
- ~~`POST /layout/fill`~~ → JavaScript algorithms
- ~~`POST /check/spacing`~~ → JavaScript distance calculations
- ~~`POST /schedule`~~ → JavaScript document counting

---

## Updated Implementation Priorities

**Phase 1: Core JavaScript Plant Tools (UXP Plugin)**

- Plant Picker with local caching and sync
- Place Along Path (JavaScript geometry calculations)
- Fill Area algorithms (grid/hex/jitter patterns in JavaScript)
- Auto-Label, Schedule Generation (count from document)
- Growth Preview, Spacing Check (JavaScript distance calculations)

**Phase 2: Enhanced Client-Side Features**

- Swap Species, Favorites/Palettes (stored in document metadata)
- Optimized sync workflows and offline capabilities
- Pathfinder shortcuts and advanced placement tools

**Phase 3: External Integration & Presentation**

- GIS external pipeline import button
- Manifest export for external tools
- Babylon viewer integration

---

## 🎯 **Key Benefits of This Updated Architecture**

1. **Faster Performance** - No server round trips for computational geometry
2. **Offline Capable** - Plugin works without internet after initial plant sync
3. **Simpler Deployment** - Minimal server complexity, focus on data management
4. **Better UX** - Real-time feedback for all plant placement operations
5. **Single-User Optimized** - All complexity lives in user-facing applications
6. **Scalable** - Server focuses purely on plant data management and sync

This architecture maximizes JavaScript capabilities in the UXP plugin while keeping the Django backend minimal and focused on what it does best: managing and serving plant data.  
