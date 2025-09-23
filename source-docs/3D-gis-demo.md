### Recommended Modern Browser-Based FPS Templates/Engines

Here's a curated list of the best fits, focusing on simplicity for your weekend demo. Each has documentation on the level format, physics for FPS mechanics, and examples. I've noted how to preprocess your nursery data into the format.

#### 1. **Three-FPS (Three.js-Based FPS Template) – Easiest for Quick Custom GLTF Levels**

- **Overview**: A modular, open-source FPS template using Three.js, with entity/component system, Ammo.js physics for realistic running/jumping/collisions, and sky via cube maps. It's designed for browser games; you can roam freely beyond level bounds by making large/open meshes. Updated in 2024 with ES6/Webpack support.
- **Open Source & GitHub**: Yes, https://github.com/mohsenheydari/three-fps. Live demo: Included in repo (run locally or on GitHub Pages).
- **Level Format Equivalent**: GLTF/GLB files for custom maps (load via GLTFLoader). The docs (in README and code comments) explain: Levels are imported as hierarchical scenes with meshes for terrain, colliders for boundaries, and materials for textures. Supports custom shaders for GIS-derived effects like slope highlighting.
- **Documentation on Format/Custom Levels**: GitHub README covers loading GLB files (e.g., `loader.load('level.glb', onLoad)`); integrate physics by tagging meshes as "ground" or "obstacle." For FPS specifics, see the pathfinding and controller modules. Community examples on Three.js forum (e.g., https://discourse.threejs.org/t/first-person-game-engine-overview-level-demo/55685) show GLTF integration for levels.
- **Preprocessing Pipeline for Your Demo**: In Python, use GDAL to process/clip GIS data, PyVista to mesh DEM/LiDAR (e.g., `mesh = pv.read('dem.tif').triangulate()`), texture with NAIP via UV mapping, extrude parcels/roads as colliders, then export to GLB (`pygltflib.GLTF2().save('nursery.glb')`). Buffer the area (e.g., +200m) for beyond-bounds running. Add a skybox texture separately in JS.
- **Why It Fits**: Modern (2024 updates), lightweight for browsers, and perfect for your GIS-to-3D combo. A recent YouTube tutorial (2025) walks through a similar modular FPS template with GLTF: https://www.youtube.com/watch?v=DyjmXndgueg.

#### 2. **OpenWorldJS (Three.js Open-World FPS Engine) – Great for Large, Roamable GIS-Derived Worlds**

- **Overview**: An open-source 3D open-world engine built on Three.js, with FPS controls, Ammo.js physics for jumping/running over terrain, and sky/environment mapping. Optimized for browser performance; supports infinite-style roaming by procedural or large static meshes.
- **Open Source & GitHub**: Yes, https://github.com/obecerra3/OpenWorldJS. Live demo: https://obecerra3.github.io/OpenWorldJS/ (YouTube walkthrough included).
- **Level Format Equivalent**: GLTF/GLB or OBJ for custom maps/terrain. README docs specify: Load levels as meshes with physics impostors (e.g., for collision/jumping); supports chunked loading for big areas.
- **Documentation on Format/Custom Levels**: GitHub code comments and demo source explain GLTF import (via Three.js loaders); physics setup for FPS movement is in the controller script. Forum discussions (e.g., https://discourse.threejs.org/t/3d-fps-portfolio-using-react-three-fiber-give-suggestions-please/31203) show similar integrations.
- **Preprocessing Pipeline for Your Demo**: Similar to above—Python GDAL/PyVista for meshing GIS (DEM + LiDAR for height, NAIP for textures), export to GLB. Add building footprints as child nodes. Buffer extensively for "beyond bounds" feel.
- **Why It Fits**: Focuses on open exploration (ideal for nursery walkthroughs), modern (active 2024), and handles large GIS meshes well without Doom-era limitations.

#### 3. **FPS-Game (Babylon.js Multiplayer FPS Template) – Solid for Physics and Custom Scenes**

- **Overview**: A modern, open-source multiplayer FPS built with Babylon.js, including client-side simulation, Havok physics for jumping/running/collisions, and sky via PhotoDome or HDR maps. Strip multiplayer for single-player demo; allows free roaming in open levels.
- **Open Source & GitHub**: Yes, https://github.com/aeon0/FPS-Game. Live demo: Repo includes browser preview.
- **Level Format Equivalent**: GLTF/GLB or Babylon's .babylon JSON scenes. Docs in README: Import custom maps via `SceneLoader.ImportMesh` or `Load`; levels can include terrain meshes with physics.
- **Documentation on Format/Custom Levels**: GitHub source and Babylon.js docs (https://doc.babylonjs.com/) cover GLTF spec; forum examples (e.g., https://forum.babylonjs.com/t/fps-game-shooting-weapon-interface/25776) detail FPS setups. Recent (2024) project like VRAMPAGE uses similar for cross-platform FPS: https://forum.babylonjs.com/t/vrampage-multiplayer-first-person-shooter/53942.
- **Preprocessing Pipeline for Your Demo**: Python to generate GLB from GIS (as above), or export to .babylon JSON via custom scripts. Texture terrain with satellite imagery; use point clouds for vegetation proxies.
- **Why It Fits**: Babylon.js is a full engine (vs. Three.js as a library), with 2025 updates (v8.0 at https://www.babylonjs.com/), making it more "game-ready" for your sim.

#### 4. **PlayCanvas FPS Starter Kit – Browser-Optimized with Editor Support**

- **Overview**: An official open-source FPS template from PlayCanvas (WebGL engine), with Ammo.js physics for movement/jumping, sky rendering, and entity-based levels. Great for browsers; supports unbounded roaming in procedural/open designs.
- **Open Source & GitHub**: Engine at https://github.com/playcanvas/engine; template project forkable. Live demo: https://developer.playcanvas.com/tutorials/first-person-shooter-starter-kit/ (extends to full levels).
- **Level Format Equivalent**: GLTF 2.0 for assets/models, with scenes as JSON (entity hierarchies). Docs specify: Load custom levels via asset registry; supports Draco compression for large GIS meshes.
- **Documentation on Format/Custom Levels**: Developer site (https://developer.playcanvas.com/user-manual/engine/) covers JSON/GLTF import; tutorials like https://developer.playcanvas.com/tutorials/procedural-levels/ explain custom map generation. FPS specifics in starter kit source.
- **Preprocessing Pipeline for Your Demo**: Export GIS mesh to GLTF in Python, then import into PlayCanvas editor or via code. For pure code, load JSON scenes programmatically.
- **Why It Fits**: Modern engine (2025 features like WebGPU), with ready FPS kit; used in recent multiplayer FPS like MiniRoyale.io.

### Quick Demo Recommendations

Start with Three-FPS or FPS-Game for minimal setup—clone the repo, preprocess your GIS to GLTF (1-2 hours in Python), replace the default level loader call, and tweak sky/jumping params. Host on GitHub Pages for instant browser access. This showcases multi-source GIS fusion (e.g., elevation + imagery + vectors) in a modern FPS context without any retro engine vibes. If you hit snags with GLTF export, libraries like three-geo (Three.js-specific) can help bridge GIS directly. Let me know if you need Python code examples!
