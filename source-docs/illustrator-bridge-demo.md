🌱 Illustrator Bridge Demo Plan
🎯 Goal

Give Annie a to-scale, layered Illustrator file with her nursery property, nearby roads, and a basemap image — generated automatically from online data. Add a small plant symbol library + a one-click plant list export. This shows her how Flora can save hours and unlock new workflows without leaving Illustrator.

1. Data Preparation (Backend Script)

Input: site name (e.g., “Annie’s Nursery”), address, or hard-coded parcel geometry.
Output: /demo/annie/ folder with Illustrator-ready assets.

Steps

Geocode address (optional for demo)

Use Nominatim (free OSM geocoder) or just hard-code lat/lon.

Fetch data layers

Parcel polygon: from county GIS shapefile/GeoJSON (or manually traced once).

Roads: TIGER/Line or OSM Overpass clip to bbox.

Basemap imagery:

Option A: USDA NAIP orthoimage (free, public domain).

Option B: Mapbox Static API tile (pre-fetched for demo).

Reproject & clip

Use GDAL/ogr2ogr to reproject all layers to Web Mercator (EPSG:3857).

Clip to parcel bbox + buffer (~200 m).

Generate Illustrator base (SVG)

Convert layers to vector paths (parcel, roads).

Embed orthoimage as <image> layer.

Add scale bar, north arrow, reference grid.

Lock base layers (Basemap, Parcel, Roads).

Symbols library

Make 5–10 simple plant symbols (SVG or .ai).

Encode species in names: PLANT**Salvia_nemorosa**1.5m.

Save as symbols.ai for Annie to load.

2. Demo Output Structure
   demo/annie/
   base.svg # To-scale Illustrator base file
   symbols.ai # Plant symbols library
   readme.txt # Quick steps for Annie
   preview.png # Thumbnail screenshot

readme.txt example:

1. Open base.svg in Illustrator.
2. Go to Window > Symbols > Load Symbols > choose symbols.ai.
3. Drag plants onto the parcel. Each plant has size + name encoded.
4. Run "Export Plant List" (plugin or CSV script).

5. Illustrator Bridge Plugin (Optional polish)
   Features

Insert Base: loads base.svg into Illustrator.

Load Symbols: loads symbols.ai into Symbols panel.

Count Plants: scans symbol instances, groups by species, shows totals.

Export Plant List (CSV/PDF): outputs structured BOM.

Tech

Adobe UXP plugin (HTML/JS).

Reads symbol names + counts.

Exports JSON/CSV for BOM.

Optionally calls your Flora web app to generate a pretty PDF.

4. Annie’s Demo Experience

Click “Insert Base” → her nursery parcel appears with roads + aerial.

Load Symbols → palette of native plants.

Place plants → Illustrator behaves exactly as she knows, but every symbol is data-rich.

Export Plant List → instant, branded PDF with counts.

She realizes: “I normally trace and fudge scale. Now I’m accurate, faster, and client-ready in minutes.”

5. Timeline

Day 1:

Write Python/GDAL script to generate base.svg from parcel + ortho + roads.

Export symbols.ai (or use Illustrator to design them).

Day 2:

Package demo assets for Annie’s nursery.

Write simple JS/Node script to parse SVG + count symbol instances.

(Optional) Build UXP plugin stub with “Count Plants” button.

6. Stretch Goals (future, not for first demo)

Add terrain contours/hillshade as optional overlay.

Enable symbol auto-spacing (e.g., Poisson disk fill) → mimic Flora’s “intelligent planting.”

Support export back to Flora JSON for future editing in your web app.

Auto-download new parcels/roads from APIs when Annie enters any address.

✅ Deliverables for Annie

base.svg with her nursery property (locked layers + imagery).

symbols.ai with native plant icons.

Simple plant list export → PDF/CSV.

(Optional) Illustrator plugin with 3 buttons.

👉 This gives her an immediate productivity win in her current workflow and shows how Flora will eventually replace Illustrator with something smarter + easier.

Would you like me to sketch the Python/GDAL script outline that generates the base.svg (parcel, roads, ortho, scale bar) so you can start automating this pipeline?
