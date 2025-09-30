# 🌿 Project Flora — Vision & Strategy Brief

## 1\. Overview

**Project Flora** is a next-generation landscape design platform that combines the accessibility of consumer apps with the intelligence and rigor of professional tools. Our mission is to make outdoor design **easy, beautiful, and ecologically aware**, empowering small landscape businesses, nurseries, and homeowners to create designs that are both inspiring and sustainable.

This project brief consolidates our research, technical debates, and strategic discussions into a clear vision and roadmap for the product.

---

## 2\. The Opportunity

* **Market size**: Landscape design software is a \~$3B market today, growing to $5.6B by 2030\. The larger U.S. landscaping services industry is \~$180B.

* **Fragmentation**: 700k+ U.S. landscaping businesses; 72% are under 10 employees. They need affordable, approachable tools.

* **Trends driving demand**:

  * Outdoor living boom post-pandemic.

  * Regulatory push for native plants, water conservation, and sustainability.

  * Cloud/AI adoption lowering barriers.

* **Current tools**: Either too clunky (AutoCAD, Vectorworks) or too shallow (iScape, Home Outside). No one owns the quadrant of **easy-to-use \+ ecologically intelligent**.

---

## 3\. Core Value Propositions

### 🌱 Plant-Aware Intelligence

* Integrated plant database, with filters for **native species, hardiness zones, sunlight, water needs, and spacing**.

* Automatically generates accurate **plant lists (BOMs)** tied to suppliers.

* Future: AI-driven plant layout suggestions and ecological scoring.

### ⚡ Instant Site Setup

* Type in an address → instantly load **parcel boundaries \+ aerial imagery**.

* Option to import **GIS data, DEMs, or photogrammetry** for elevation-aware projects.

* Eliminates the manual tracing workflows that dominate existing tools.

### 🎨 Beautiful & Accessible Design

* Illustrator-like 2D design experience: clean, polished, inviting.

* Designed to be **approachable for small businesses and homeowners**, not just CAD experts.

* Aesthetics are central to adoption, especially among women homeowners (a key purchasing demographic).

### 🧾 Automated Takeoffs & Client Outputs

* One-click **plant list / BOM** with counts and sizes.

* Branded PDF exports → ready to hand to clients or nurseries.

* Future: expanded BOM for hardscapes (gravel, sod, pavers) and cost estimation.

### 🕹️ Doom-Style 3D Walkthrough (Future Wow Factor)

* Optional first-person 3D mode.

* Even with sprites \+ simple meshes, allows designers to “walk the yard.”

* Differentiates the product as playful yet powerful.

---

## 4\. Target Users

1. **Nurseries / Designers (Beachhead)**

   * Annie’s use case: move from Illustrator to an intelligent design tool.

   * Value: faster designs, automatic plant lists, direct tie-in to sales.

2. **Contractors / Small Firms**

   * Value: simple takeoffs, professional proposals, competitive advantage without steep CAD learning curves.

3. **Homeowners (Prosumer Segment)**

   * Value: easy-to-use, attractive, plant-aware DIY design.

---

## 5\. Technical Approach

* **Renderer**: Babylon.js with orthographic camera (2.5D) → unifies 2D drawing \+ future 3D.

* **Data Model**: Unified TRS-based scene graph with optional Z values; terrain-aware bindings.

* **Ingestion**: Support for GeoTIFFs, KMLs, property parcel APIs; mesh simplification for large DEM/photogrammetry data.

* **Offline/UX**: Progressive Web App (PWA) with clean, responsive UI.

* **AI Integration**:

  * Plant ID from photos.

  * Plant recommendations (ecology \+ design intent).

  * Future: photogrammetry-to-3D asset generation.

---

## 6\. Business Model

* **Freemium SaaS**: Free tier with limited plant library; Pro tiers ($20–$50/mo) unlock advanced features.

* **Nursery/Contractor Branding**: White-labeled exports for partners.

* **Affiliate/Ads**: Integration with suppliers (Home Depot, local nurseries) for material sales.

* **Future Revenue Expansion**: Proposal generation, supplier tie-ins, AI-powered premium design features.

---

## 7\. MVP Scope

To wow co-founders and early investors, MVP will include: 1\. Address-based site import (parcel \+ aerial base).  
2\. Drag-and-drop native plants with smart filtering.  
3\. One-click plant list/PDF export.  
4\. Beautiful 2D UI polished by Annie’s design expertise.  
5\. (Stretch) Simple 3D walkaround mode.

---

## 8\. Strategic Differentiators

* **Plant intelligence** → first tool to bake ecology into design.

* **Ease of use \+ aesthetics** → beautiful, Illustrator-like UI.

* **Data integration** → instant site setup via GIS/photogrammetry.

* **Business alignment** → direct value to nurseries and contractors via BOMs and proposals.

* **Team synergy** → engineering \+ GIS expertise (you & Jake) \+ nursery/domain \+ design polish (Annie).

---

## 9\. Vision Statement

**Project Flora will be the operating system for sustainable landscape design.** By uniting instant site data, ecological intelligence, and a delightful design experience, we’ll enable small businesses, nurseries, and homeowners to design outdoor spaces that are not only beautiful, but resilient and ecologically sound.

Long-term, Flora will expand from plant lists to full proposals, from 2D to immersive 3D, and from individual yards to urban-scale ecological planning.

---

## 10\. Next Steps

* Prototype MVP on weekends with core team.

* Test with Annie’s nursery customers to validate workflows and outputs.

* Prepare demo deck for seed-stage investor conversations.

---

✅ **Summary**: Flora is positioned to do for landscaping what Altium did for PCB design — make a painful, fragmented, and ugly process into something intuitive, integrated, and beautiful. With plant intelligence, instant site setup, and automated outputs, we can carve out a defensible niche that grows into a category-defining platform.