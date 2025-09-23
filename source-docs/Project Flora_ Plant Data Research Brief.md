

# **Project Flora: A Strategic and Technical Brief for Sourcing and Structuring Plant Data**

## **Executive Summary**

This report provides a comprehensive strategic and technical blueprint for developing the core data asset of Project Flora, a "plant-aware" web application for landscape designers. The primary objective is to establish a practical, production-ready, and legally robust plan for sourcing, structuring, and ingesting a rich dataset of plant information tailored to the U.S. temperate market. The recommendations prioritize data sources with clear, permissive licenses for commercial use, ensuring the platform is built on a defensible and scalable foundation.

The core strategy is built on the "Backbone and Enrichment" model. It recommends establishing the **World Flora Online (WFO)**, a dataset licensed under **Creative Commons Zero (CC0 / Public Domain)**, as the central taxonomic backbone.1 This choice eliminates licensing ambiguity and legal risk. This backbone will then be systematically enriched with critical identifiers and regional data from authoritative U.S. public domain sources, including the

**Integrated Taxonomic Information System (ITIS)** for Taxonomic Serial Numbers (TSNs) and the **USDA PLANTS Database** for official plant symbols and state-level native status information.3

To provide a competitive advantage, this brief outlines methods for acquiring high-granularity data, such as county-level distribution from the **Biota of North America Program (BONAP)** and detailed horticultural traits from sources like **Plants For a Future (PFAF)**.5 It addresses the technical challenges associated with these sources, such as the need for web scraping or license negotiation, and provides clear risk mitigation strategies. A robust pipeline for sourcing commercially safe media from

**Wikimedia Commons** is also detailed, emphasizing the critical need to store and manage attribution metadata.7

The technical implementation plan includes a production-ready SQL schema for a PostgreSQL database enhanced with the PostGIS extension for advanced geospatial querying. This schema is designed from the ground up to support rigorous data provenance, tracking the source, license, and confidence level of every data point. The report provides detailed Extract, Transform, Load (ETL) guidance, including technology recommendations and concrete pseudocode examples for key ingestion tasks.

Finally, this document presents a phased roadmap. An immediate, short-term action plan details how to populate a seed database of approximately 200 species over a weekend using the most accessible open data sources. A longer-term, 3–6 month plan outlines the strategy for scaling the database to thousands of species, automating data pipelines, and integrating commercial supplier information through direct partnerships rather than high-risk scraping. This strategic brief equips Project Flora with the necessary research, architecture, and actionable steps to build a world-class data asset.

## **Part I: Data Foundation \- Taxonomy, Distribution, and Regions**

The foundation of any plant-aware application is a stable, authoritative, and legally sound taxonomic framework. This section details the selection of a primary taxonomic backbone and the strategy for integrating essential U.S.-specific distribution and geospatial data.

### **1.1 The Taxonomic Backbone: Selecting a Risk-Free Foundation**

A robust taxonomic backbone serves as the central nervous system of the database, providing the canonical hierarchy of scientific names and identifiers to which all other data is linked. The selection of this backbone is the most critical initial decision, with profound implications for data integrity, scalability, and legal compliance.

**Core Recommendation:** The **World Flora Online (WFO)** dataset will serve as the primary taxonomic backbone for Project Flora. This decision is based on its comprehensive coverage and, most importantly, its explicit dedication to the **Public Domain (Creative Commons Zero \- CC0)**.1 For a commercial application, this license is ideal as it removes all ambiguity and legal risk associated with data reuse, redistribution, and the creation of derivative works. The WFO provides a global consensus classification, stable identifiers in the

wfo-ID format (e.g., wfo-0000615907), and is available for bulk download in multiple formats via Zenodo, making initial ingestion straightforward.2

While WFO provides the foundational structure, a "Backbone and Enrichment" strategy will be employed to create a more powerful and interconnected dataset. The canonical taxon records established from WFO will be enriched with identifiers from other key authoritative sources. This approach creates a "golden record" for each plant that is not only taxonomically sound but also deeply integrated with the broader biodiversity data ecosystem.

* **Integrated Taxonomic Information System (ITIS):** As a work of the U.S. government, ITIS data is in the public domain and provides the canonical **Taxonomic Serial Number (TSN)** for North American species.3 The TSN is a widely used identifier in U.S. federal and state agencies, and storing it is essential for interoperability. The ITIS API allows for programmatic lookups by scientific or common name to find the corresponding TSN.  
* **USDA PLANTS Database:** This is another U.S. public domain resource that provides the official **PLANTS Symbol** (e.g., ABAM for *Abies amabilis*), a short, unique code used extensively in U.S. conservation and agriculture.4 The database schema will include a dedicated field for this identifier.  
* **Global Biodiversity Information Facility (GBIF):** GBIF is a vital aggregator of occurrence data, not a primary taxonomic source. Its data is a mixture of licenses (CC0, CC-BY, CC-BY-NC), making it unsuitable as a backbone.8 However, it is an unparalleled resource for enrichment. The GBIF API can be used to match scientific names to a  
  **GBIF taxonKey**, which will be stored in the database. This key is the gateway to accessing millions of georeferenced occurrence records and associated media, which are crucial for distribution mapping and media sourcing.  
* **National Center for Biotechnology Information (NCBI) Taxonomy:** While its data is also in the public domain as a U.S. government work, its focus is primarily on organisms within public sequence databases.9 It is less tailored to the horticultural and botanical needs of Project Flora than WFO or ITIS and will be considered a lower-priority source for identifier cross-referencing.

This strategy ensures that the core of the database is legally unencumbered, while the inclusion of multiple canonical identifiers from other systems makes the data robust, verifiable, and ready for future integrations.

### **1.2 Mapping Native Status in the U.S.: A Multi-Layered Approach**

For a landscape design tool targeting the U.S. market, accurate and granular data on whether a plant is native to a specific area is a primary feature. This requires a multi-layered approach that combines broad, authoritative federal data with more detailed regional information.

**Core Recommendation:** The native status data will be built by combining the state-level data from the **USDA PLANTS Database** with the more granular county-level data from the **Biota of North America Program (BONAP)**.

* **Layer 1 (State-Level): USDA PLANTS Database:** This database is the official source for state-level native status across the United States and its territories.4 This data is in the public domain and can be acquired via bulk download from the PLANTS website or through its checklist dataset published on GBIF.12 This will form the foundational, high-confidence layer for determining native status within a given state.  
* **Layer 2 (County-Level): Biota of North America Program (BONAP):** BONAP provides the most detailed publicly available distribution maps, showing plant presence and native status at the county level.5 This level of detail is a significant competitive advantage, allowing Project Flora to offer hyper-local recommendations. However, BONAP does not provide a formal API or bulk download option.14 The data is presented through an interactive web map and as rendered map images. Acquiring this data necessitates a dedicated engineering effort to build a web scraper.

This approach presents a technical challenge that must be managed with a clear strategy. A web scraper is inherently brittle; changes to the BONAP website structure could break the data pipeline. Furthermore, while BONAP's terms of service are not explicitly restrictive in the available materials, aggressive scraping is often discouraged. Therefore, the scraper should be designed to be "polite," with built-in rate limiting (e.g., one request per second) and a clear User-Agent string identifying Project Flora. To mitigate the risk of data inaccuracy or staleness, all data ingested from BONAP will be flagged in the provenance system with its source and a lower confidence score than the official USDA data. This allows the application's user interface to differentiate between the two sources, for instance, by labeling state-level status as "Confirmed Native" and county-level status as "Reported in County."

### **1.3 Integrating Geospatial Context: Acquiring Regional Shapefiles**

To enable powerful, location-aware features, Project Flora's database must treat geospatial regions as first-class data citizens, not just as text labels. This requires a spatially-enabled database and the ingestion of standard regional boundary definitions.

**Core Recommendation:** The database will be built on PostgreSQL with the PostGIS extension. This will allow for the storage of geographic regions as polygon geometries and the execution of efficient spatial queries. Shapefiles for **USDA Plant Hardiness Zones** and **U.S. EPA Ecoregions** will be downloaded and ingested directly.

* **USDA Plant Hardiness Zones:** This is the standard by which U.S. gardeners determine which plants can survive winter temperatures. The GIS data for the latest map is maintained by the PRISM Climate Group at Oregon State University and is available for direct download in shapefile format.15 The direct download links for the continental U.S., Alaska, Hawaii, and Puerto Rico are readily available.16 Use of this data to create derivative maps requires attribution to both USDA-ARS and OSU.15  
* **EPA Ecoregions:** These regions define areas of general similarity in ecosystems and environmental resources. They are often more ecologically relevant for native plant selection than state or county boundaries. The EPA provides downloadable shapefiles for Level III and IV ecoregions, organized by EPA region and by state, directly from its website.17 This data is in the public domain.

The ETL process for this data involves using a tool like shp2pgsql or a Python library like GeoPandas to load the shapefile polygons into a regions table in the database. Once loaded, spatial indexes must be created on the geometry column. This architecture enables powerful queries, such as finding all plants whose native range (a set of county polygons) intersects with a user's specific hardiness zone and ecoregion.

## **Part II: Data Enrichment \- Traits, Ecology, and Media**

With a solid taxonomic and geographic foundation in place, the next step is to enrich the database with the detailed horticultural, ecological, and visual information that will provide direct value to landscape designers. This requires sourcing data from a diverse set of specialized public and private databases.

The following table provides a prioritized, at-a-glance summary of the recommended data sources for all categories, including access methods and licensing considerations.

| Source Name | Data Type | Access Method | URL | License | Commercial Use? | Recommendation/Priority |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| **World Flora Online** | Taxonomy | Bulk Download (Zenodo) | [list.worldfloraonline.org](https://list.worldfloraonline.org/) | CC0 1.0 Universal | **Yes** | **Primary Backbone** |
| **USDA PLANTS Database** | U.S. Distribution, Traits | Bulk Download | [plants.usda.gov](https://plants.usda.gov/) | U.S. Public Domain | **Yes** | **High Priority (Core US Data)** |
| **ITIS** | Taxonomy | REST API, Bulk Download | [www.itis.gov](https://www.itis.gov/) | U.S. Public Domain | **Yes** | **High Priority (Identifier Enrichment)** |
| **BONAP** | U.S. County Distribution | Web Scraping Required | [bonap.org](http://bonap.org/) | Unspecified | Assumed Yes (Gov. Funded) | **High Value (Requires Scraping)** |
| **USDA Hardiness Zones** | Geospatial Regions | Shapefile Download (OSU) | [prism.oregonstate.edu](https://prism.oregonstate.edu/projects/plant_hardiness_zones.php) | Custom (Attribution Req.) | Yes (with attribution) | **Essential Geospatial Data** |
| **EPA Ecoregions** | Geospatial Regions | Shapefile Download | [www.epa.gov/eco-research](https://www.epa.gov/eco-research/ecoregion-download-files-region) | U.S. Public Domain | **Yes** | **Essential Geospatial Data** |
| **Plants For a Future (PFAF)** | Horticultural Traits | Bulk Download (CSV/DB) | [pfaf.org](https://pfaf.org/) | CC BY 4.0 / Custom | **Requires Negotiation** | **High Value (Requires Outreach)** |
| **Lady Bird Johnson WFC** | Horticultural Traits | Web Scraping Required | [wildflower.org/plants](https://www.wildflower.org/plants/) | Unspecified | Requires Review | **Medium Priority (Scraping Target)** |
| **NWF Native Plant Finder** | Wildlife Interactions | Web Scraping Required | [nativeplantfinder.nwf.org](https://nativeplantfinder.nwf.org/) | Unspecified | Requires Review | **High Priority (Wildlife Data)** |
| **Wikimedia Commons** | Media (Images) | REST API | [commons.wikimedia.org](https://commons.wikimedia.org/wiki/Commons:API) | Varies (CC0, CC BY, etc.) | Yes (Filter by license) | **Primary Media Source** |
| **GBIF** | Occurrence Data, Media | REST API, Bulk Download | [gbif.org](https://www.gbif.org/) | Varies (CC0, CC BY, etc.) | Yes (Filter by license) | **Primary Enrichment Source** |
| **iNaturalist** | Occurrence Data, Media | REST API | [api.inaturalist.org](https://api.inaturalist.org/) | Varies (CC0, CC BY, etc.) | Yes (Filter by license) | **Secondary Enrichment Source** |
| **NatureServe Explorer** | Conservation Status | REST API | [explorer.natureserve.org](https://explorer.natureserve.org/) | Custom (No Commercial Use) | **No** | **Not Recommended for Core DB** |

### **2.1 Sourcing Horticultural & Phenological Data**

This category of data—including sun/shade tolerance, water needs, soil preferences, mature size, and bloom times—is the most critical for the application's core user base. Sourcing this data requires a pragmatic approach that balances data quality, cost, and engineering effort.

**Core Recommendation:** The primary target for horticultural data is the **Plants For a Future (PFAF)** database. Concurrently, ingest the public domain characteristics data from the USDA PLANTS database and prepare to scrape the Lady Bird Johnson Wildflower Center database as a high-quality supplement.

* **Plants For a Future (PFAF):** PFAF is the most valuable single source for detailed, structured horticultural and ethnobotanical data. Critically, it offers its entire database of over 7,000 temperate plants as a direct download in CSV, Excel, and SQLite formats, eliminating the need for scraping.6 However, the licensing presents a hurdle that must be actively managed. While the website's body text is licensed under CC BY 4.0, other sections of the site state that commercial use of the database requires a specific agreement or donation.19 The images are explicitly non-commercial (CC BY-NC-ND) and must not be used.21 The recommended path is to immediately contact PFAF (webmaster@pfaf.org is listed) to negotiate a clear commercial license. The cost of a small annual license is likely to be significantly lower than the engineering and maintenance costs of building and maintaining multiple web scrapers.  
* **USDA PLANTS Characteristics Data:** The USDA PLANTS database contains a rich set of searchable plant characteristics, including growth habit, lifespan, moisture use, and shade tolerance. The full dataset is available via a "Download Entire Set" link on their characteristics search page, making it a valuable, free, and public domain source to ingest immediately.12  
* **Lady Bird Johnson Wildflower Center (LBJWC):** The LBJWC's native plant database is an authoritative and well-regarded source for horticultural information specific to North American natives.22 The research did not uncover any API or bulk download options, indicating that web scraping is the only viable method to acquire this data.24 This should be treated as a medium-priority engineering task, to be undertaken if a commercial agreement with PFAF proves unfeasible or to supplement the PFAF dataset with additional U.S.-specific information.

### **2.2 Uncovering Wildlife Interactions**

Connecting plants to the wildlife they support (pollinators, larval hosts, bird food) is a powerful feature for ecologically-minded landscape designers. This data exists in two forms: explicitly curated relationships and implicitly inferred relationships. The initial strategy should focus on the former.

**Core Recommendation:** Prioritize acquiring explicit, curated plant-wildlife interaction data by scraping the **National Wildlife Federation (NWF) Native Plant Finder** and the **Audubon Native Plants Database**. Treat the mining of co-occurrence data from global aggregators as a secondary, more advanced project.

* **Explicit Data (Scraping):**  
  * **NWF Native Plant Finder:** This tool is exceptionally valuable as it is based on the research of Dr. Douglas Tallamy and directly links plant genera to the number of butterfly and moth species whose caterpillars use them as host plants.25 The data is searchable by zip code. As no API is available, a scraper must be built to query the tool for target zip codes and parse the resulting plant-lepidoptera relationships.25  
  * **Audubon Native Plants Database:** This resource provides similar functionality, linking native plants to the bird species they attract and support.26 It is also searchable by zip code and will require scraping to extract the plant-bird relationships.28  
* **Inferred Data (API Mining):**  
  * A more advanced method involves mining the vast occurrence datasets of **GBIF** and **iNaturalist**. By using their APIs to find observations of two different species (e.g., an insect and a plant) that are recorded in close spatial and temporal proximity, one can infer a potential interaction. For example, one could query the GBIF API for all occurrences of *Danaus plexippus* (Monarch butterfly) within a 50-meter radius of any occurrence of an *Asclepias* species (Milkweed). The GBIF API supports the necessary geospatial search parameters (decimalLatitude, decimalLongitude, geoDistance) to perform such an analysis.24 While powerful, this method is computationally intensive and the resulting data is probabilistic, not definitive. It should be considered a "Phase 2" data source and presented to users with appropriate caveats.

### **2.3 A Commercially-Safe Media Pipeline**

High-quality visual media is non-negotiable for a landscape design application. The sourcing strategy must be rigorously focused on permissive licenses to avoid copyright infringement.

**Core Recommendation:** Use the **Wikimedia Commons API** as the primary source for plant photographs and illustrations. Build the media ingestion pipeline to systematically capture and store the license and attribution metadata for every asset.

* **Primary Source: Wikimedia Commons:** Wikimedia Commons is the ideal source because its explicit policy is to accept only free content—media that is in the public domain or licensed under permissive Creative Commons licenses (CC0, CC BY, CC BY-SA) that allow for commercial use.7 It has a well-documented API that allows for searching and retrieving file metadata, including the crucial licensing information.31 A Python script can query the API for a given scientific name, parse the results, and identify high-quality images with acceptable licenses.  
* **Secondary Sources: GBIF and iNaturalist:** Both platforms contain millions of images associated with occurrence records. These can be accessed via their respective APIs.33 However, unlike Wikimedia Commons, the license for each image is set by the individual user who uploaded it. A large percentage of these images are licensed as CC BY-NC (Non-Commercial), making them unusable for Project Flora.33 While it is possible to use their APIs, the ingestion script must include a strict filtering step to check the license of each image and discard any that are not CC0, CC BY, or CC BY-SA. This adds complexity compared to the Wikimedia Commons pipeline.

A critical architectural principle for media is that provenance is paramount. The database schema must not simply store a URL to an image. The media table must include dedicated fields for source\_url, author\_name, license\_short\_name (e.g., "CC BY-SA 4.0"), and license\_url. The ETL process must be designed to extract this information from the API response and persist it. This enables the application to dynamically and accurately generate attribution text on any page where an image is displayed, ensuring full compliance with the terms of the license.

## **Part III: Implementation Blueprint \- Schema, ETL, and Governance**

This section provides the concrete technical specifications for building the Project Flora database, including the SQL schema, a recommended ETL architecture, and strategies for ensuring data quality and governance.

### **3.1 Production-Ready Database Schema**

The following SQL schema is designed for a PostgreSQL database with the PostGIS extension enabled. It prioritizes normalization, data integrity through constraints and foreign keys, and comprehensive provenance tracking.

SQL

\-- Enable PostGIS extension  
CREATE EXTENSION IF NOT EXISTS postgis;

\-- Table to store the source of every piece of data  
CREATE TABLE provenance (  
    provenance\_id SERIAL PRIMARY KEY,  
    source\_name VARCHAR(255) NOT NULL, \-- e.g., 'World Flora Online', 'USDA PLANTS'  
    source\_url TEXT, \-- URL to the dataset or source homepage  
    license VARCHAR(255), \-- e.g., 'CC0 1.0', 'U.S. Public Domain'  
    last\_checked\_utc TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),  
    notes TEXT  
);

\-- Core table for taxonomic entities (plants)  
CREATE TABLE taxa (  
    taxon\_id SERIAL PRIMARY KEY,  
    scientific\_name VARCHAR(255) NOT NULL UNIQUE,  
    rank VARCHAR(50), \-- e.g., 'species', 'genus', 'family'  
    family VARCHAR(100),  
    genus VARCHAR(100),  
    \-- Canonical Identifiers  
    wfo\_id VARCHAR(50) UNIQUE, \-- World Flora Online ID  
    itis\_tsn INTEGER UNIQUE, \-- Integrated Taxonomic Information System TSN  
    usda\_symbol VARCHAR(20) UNIQUE, \-- USDA PLANTS Symbol  
    gbif\_id INTEGER UNIQUE, \-- GBIF Taxon Key  
    \-- Provenance  
    provenance\_id INTEGER REFERENCES provenance(provenance\_id)  
);  
CREATE INDEX idx\_taxa\_scientific\_name ON taxa (scientific\_name);  
CREATE INDEX idx\_taxa\_family ON taxa (family);  
CREATE INDEX idx\_taxa\_genus ON taxa (genus);

\-- Table for scientific name synonyms  
CREATE TABLE synonyms (  
    synonym\_id SERIAL PRIMARY KEY,  
    taxon\_id INTEGER NOT NULL REFERENCES taxa(taxon\_id),  
    synonym\_name VARCHAR(255) NOT NULL,  
    provenance\_id INTEGER REFERENCES provenance(provenance\_id)  
);  
CREATE INDEX idx\_synonyms\_name ON synonyms (synonym\_name);

\-- Table for common names  
CREATE TABLE common\_names (  
    common\_name\_id SERIAL PRIMARY KEY,  
    taxon\_id INTEGER NOT NULL REFERENCES taxa(taxon\_id),  
    name VARCHAR(255) NOT NULL,  
    language\_code VARCHAR(10) DEFAULT 'en', \-- ISO 639-1 code  
    provenance\_id INTEGER REFERENCES provenance(provenance\_id)  
);

\-- Flexible table for horticultural and ecological traits  
CREATE TABLE traits (  
    trait\_id SERIAL PRIMARY KEY,  
    taxon\_id INTEGER NOT NULL REFERENCES taxa(taxon\_id),  
    trait\_name VARCHAR(100) NOT NULL, \-- e.g., 'sun\_exposure', 'water\_needs', 'mature\_height\_m'  
    trait\_value TEXT NOT NULL, \-- e.g., 'full\_sun', 'moderate', '15.5'  
    provenance\_id INTEGER REFERENCES provenance(provenance\_id)  
);  
CREATE INDEX idx\_traits\_taxon\_id\_name ON traits (taxon\_id, trait\_name);

\-- Table for geospatial regions (USDA Zones, EPA Ecoregions, states, counties)  
CREATE TABLE regions (  
    region\_id SERIAL PRIMARY KEY,  
    region\_name VARCHAR(255) NOT NULL,  
    region\_type VARCHAR(50) NOT NULL, \-- e.g., 'usda\_hardiness\_zone', 'epa\_ecoregion\_l3', 'state', 'county'  
    region\_code VARCHAR(50), \-- e.g., '6b', '5.1.2', 'CA'  
    geom GEOMETRY(MultiPolygon, 4326) NOT NULL, \-- Store polygons in WGS 84 projection  
    provenance\_id INTEGER REFERENCES provenance(provenance\_id)  
);  
CREATE INDEX idx\_regions\_geom ON regions USING GIST (geom);

\-- Join table for native status  
CREATE TABLE native\_status (  
    native\_status\_id SERIAL PRIMARY KEY,  
    taxon\_id INTEGER NOT NULL REFERENCES taxa(taxon\_id),  
    region\_id INTEGER NOT NULL REFERENCES regions(region\_id),  
    status VARCHAR(50) NOT NULL, \-- e.g., 'Native', 'Introduced', 'Adventive'  
    provenance\_id INTEGER REFERENCES provenance(provenance\_id),  
    UNIQUE(taxon\_id, region\_id)  
);

\-- Table for plant-wildlife interactions  
CREATE TABLE wildlife\_interactions (  
    interaction\_id SERIAL PRIMARY KEY,  
    plant\_taxon\_id INTEGER NOT NULL REFERENCES taxa(taxon\_id),  
    wildlife\_taxon\_id INTEGER REFERENCES taxa(taxon\_id), \-- Can be null if interaction is with a group  
    wildlife\_group VARCHAR(100), \-- e.g., 'Butterflies', 'Songbirds'  
    interaction\_type VARCHAR(100) NOT NULL, \-- e.g., 'larval\_host', 'pollinator', 'nectar\_source', 'bird\_food'  
    provenance\_id INTEGER REFERENCES provenance(provenance\_id),  
    notes TEXT  
);

\-- Table for media assets (images, illustrations, videos)  
CREATE TABLE media (  
    media\_id SERIAL PRIMARY KEY,  
    taxon\_id INTEGER NOT NULL REFERENCES taxa(taxon\_id),  
    media\_type VARCHAR(50) NOT NULL DEFAULT 'image',  
    url TEXT NOT NULL,  
    thumbnail\_url TEXT,  
    \-- License and attribution metadata  
    author\_name TEXT,  
    source\_url TEXT,  
    license\_short\_name VARCHAR(255), \-- e.g., 'CC BY-SA 4.0'  
    license\_url TEXT,  
    provenance\_id INTEGER REFERENCES provenance(provenance\_id)  
);

\-- Tables for commercial supplier and product data  
CREATE TABLE suppliers (  
    supplier\_id SERIAL PRIMARY KEY,  
    name VARCHAR(255) NOT NULL,  
    website TEXT,  
    is\_partner BOOLEAN DEFAULT FALSE  
);

CREATE TABLE products (  
    product\_id SERIAL PRIMARY KEY,  
    taxon\_id INTEGER NOT NULL REFERENCES taxa(taxon\_id),  
    supplier\_id INTEGER NOT NULL REFERENCES suppliers(supplier\_id),  
    sku VARCHAR(100),  
    product\_url TEXT,  
    price NUMERIC(10, 2),  
    currency VARCHAR(3) DEFAULT 'USD',  
    form VARCHAR(100), \-- e.g., '1-gallon pot', 'bare\_root', 'seed\_packet'  
    last\_checked\_utc TIMESTAMP WITH TIME ZONE  
);

### **3.2 ETL Architecture and Examples**

A robust and maintainable ETL (Extract, Transform, Load) pipeline is essential for populating and updating the database.

**Recommended Stack:**

* **Language/Framework:** Python 3, for its extensive ecosystem of libraries for data manipulation, web requests, and database interaction.  
* **Core Libraries:**  
  * requests: For making HTTP requests to REST APIs.  
  * pandas / GeoPandas: For data manipulation and loading of tabular and geospatial data.  
  * SQLAlchemy: For interacting with the PostgreSQL database in an object-oriented manner.  
  * BeautifulSoup / Scrapy: For web scraping tasks.  
* **Database:** PostgreSQL with the PostGIS extension.

**ETL Strategy:**

1. **Extract:** Scripts will fetch data from various sources. API clients will pull from WFO, GBIF, etc. Bulk data files (CSV, DBF, shapefiles) will be downloaded from USDA, PFAF, and geospatial sources. Scrapers will target BONAP, NWF, and others.  
2. **Transform:** In-memory data (e.g., in pandas DataFrames) will be cleaned and normalized. This includes canonicalizing scientific names, mapping source-specific identifiers to the database's internal foreign keys, converting data types, and re-projecting geospatial data to the standard WGS 84 (SRID 4326\) format.  
3. **Load:** The transformed data is loaded into the target PostgreSQL tables. Each load operation must also create or reference a record in the provenance table, ensuring every piece of data is tracked back to its source.

#### **ETL Pseudocode Example 1: Ingesting a Taxon from WFO and Enriching with GBIF**

This example outlines the logic for adding a new plant to the database, establishing its canonical record from WFO, and enriching it with an identifier from GBIF.

Python

\# pseudocode in Python

import requests  
import sqlalchemy

\# Assume db\_session is an active SQLAlchemy session  
\# Assume get\_or\_create\_provenance(source\_name) is a helper function

def ingest\_taxon(scientific\_name):  
    """  
    Ingests a new taxon, using WFO as the backbone and enriching with GBIF.  
    """  
    \# 1\. Get canonical data from World Flora Online (WFO)  
    wfo\_provenance \= get\_or\_create\_provenance('World Flora Online')  
    wfo\_api\_url \= f"https://list.worldfloraonline.org/matching\_rest.php?scientific\_name={scientific\_name}"  
    wfo\_response \= requests.get(wfo\_api\_url)  
    wfo\_data \= wfo\_response.json()

    if not wfo\_data or wfo\_data\['match'\]\!= 'exact':  
        print(f"No exact match found in WFO for {scientific\_name}")  
        return

    canonical\_taxon \= wfo\_data  
      
    \# 2\. Check if taxon already exists by WFO ID  
    existing\_taxon \= db\_session.query(Taxa).filter\_by(wfo\_id=canonical\_taxon\['wfo\_id'\]).first()  
    if existing\_taxon:  
        print(f"Taxon {scientific\_name} already exists.")  
        return existing\_taxon

    \# 3\. Create new taxon record  
    new\_taxon \= Taxa(  
        scientific\_name=canonical\_taxon\['scientificName'\],  
        wfo\_id=canonical\_taxon\['wfo\_id'\],  
        family=canonical\_taxon\['family'\],  
        genus=canonical\_taxon\['genus'\],  
        rank=canonical\_taxon\['rank'\],  
        provenance\_id=wfo\_provenance.provenance\_id  
    )  
    db\_session.add(new\_taxon)  
    db\_session.commit() \# Commit to get the new taxon\_id

    \# 4\. Enrich with GBIF taxonKey  
    gbif\_provenance \= get\_or\_create\_provenance('GBIF')  
    gbif\_api\_url \= f"https://api.gbif.org/v1/species/match?name={scientific\_name}"  
    gbif\_response \= requests.get(gbif\_api\_url)  
    gbif\_data \= gbif\_response.json()

    if gbif\_data.get('matchType') \== 'EXACT':  
        new\_taxon.gbif\_id \= gbif\_data.get('usageKey')  
        \# Here you could also update the provenance for the gbif\_id field specifically  
        \# if the schema supported field-level provenance.  
        db\_session.commit()  
        print(f"Enriched {scientific\_name} with GBIF key {new\_taxon.gbif\_id}")

    return new\_taxon

#### **ETL Pseudocode Example 2: Processing USDA PLANTS Native Status**

This example shows how to process a downloaded USDA PLANTS distribution file and link it to the state regions previously loaded from shapefiles.

Python

\# pseudocode in Python

import pandas as pd  
import geopandas as gpd  
from sqlalchemy import text

\# Assume db\_engine is an active SQLAlchemy engine connection

def process\_usda\_native\_status(distribution\_filepath):  
    """  
    Loads USDA PLANTS state-level distribution and links it to region geometries.  
    """  
    usda\_provenance \= get\_or\_create\_provenance('USDA PLANTS Database')

    \# 1\. Load the USDA distribution data into a pandas DataFrame  
    \# This file typically maps USDA\_Symbol to State\_Abbreviation and Native\_Status  
    df\_dist \= pd.read\_csv(distribution\_filepath, usecols=)  
    df\_dist.rename(columns={'Symbol': 'usda\_symbol', 'State': 'state\_code', 'Native\_Status': 'status'}, inplace=True)  
    df\_dist.dropna(inplace=True)

    \# 2\. Get all 'state' regions from the database  
    sql\_states \= "SELECT region\_id, region\_code FROM regions WHERE region\_type \= 'state';"  
    df\_states \= pd.read\_sql(sql\_states, db\_engine)  
    df\_states.rename(columns={'region\_code': 'state\_code'}, inplace=True)

    \# 3\. Get all taxa with USDA symbols from the database  
    sql\_taxa \= "SELECT taxon\_id, usda\_symbol FROM taxa WHERE usda\_symbol IS NOT NULL;"  
    df\_taxa \= pd.read\_sql(sql\_taxa, db\_engine)

    \# 4\. Merge the dataframes to link taxon\_id and region\_id  
    merged\_df \= df\_dist.merge(df\_taxa, on='usda\_symbol')  
    merged\_df \= merged\_df.merge(df\_states, on='state\_code')  
      
    \# 5\. Prepare data for bulk insert into the native\_status table  
    records\_to\_insert \=  
    for index, row in merged\_df.iterrows():  
        records\_to\_insert.append({  
            'taxon\_id': row\['taxon\_id'\],  
            'region\_id': row\['region\_id'\],  
            'status': row\['status'\],  
            'provenance\_id': usda\_provenance.provenance\_id  
        })

    \# 6\. Bulk insert into the native\_status table using SQLAlchemy Core or similar  
    if records\_to\_insert:  
        db\_engine.execute(NativeStatus.\_\_table\_\_.insert(), records\_to\_insert)  
        print(f"Inserted {len(records\_to\_insert)} native status records.")

### **3.3 Data Reconciliation and Provenance**

With data flowing from multiple sources, a clear strategy for reconciliation and governance is required to maintain quality.

* **Name Canonicalization:** Before any lookup, scientific names from source files will be standardized: converted to lowercase, stripped of leading/trailing whitespace, and with multiple internal spaces collapsed to one.  
* **Synonym Handling:** The WFO dataset will be the single source of truth for determining the accepted scientific name versus a synonym. During ingestion, if a name is identified as a synonym by WFO, its data will be associated with the taxon\_id of the accepted name, and the name itself will be stored in the synonyms table.  
* **Confidence Scoring:** While not explicitly in the schema above, a confidence\_score (e.g., a float from 0.0 to 1.0) could be added to the provenance table. Data from official, programmatically accessible sources (USDA, ITIS) would receive a high score (e.g., 0.95), while data from scraped sources (BONAP) would receive a lower score (e.g., 0.75). This allows the application to filter or flag data based on its perceived reliability.  
* **Provenance as a Core Feature:** The database is designed so that every meaningful piece of information is linked to a provenance\_id. This is not merely an internal tracking mechanism. The application's front-end should be designed to leverage this, allowing users to see where the data comes from (e.g., a tooltip on a plant's water requirement could show "Source: Plants For a Future"). This builds user trust and provides transparency.

## **Part IV: Commercial Strategy and Roadmap**

This final section outlines a practical, phased approach for integrating commercial data and provides a clear roadmap for building the initial seed dataset and scaling to a comprehensive catalog.

### **4.1 Supplier and Product Data Integration**

Integrating real-time or near-real-time supplier and product data is a significant long-term challenge that requires a partnership-focused approach. Relying on web scraping of e-commerce sites is not a sustainable or legally sound strategy.

* **Phase 1: Manual Ingest of Curated Data:** The immediate path to populating supplier data is to leverage the expertise of the in-house nursery expert, Annie. The provided suppliers and products tables are designed to be populated from simple CSV files. Templates for these files should be created for Annie to fill out with information from her trusted local and regional nurseries. A simple Python script can then be written to ingest these CSVs into the database. This provides high-quality, curated initial data.  
* **Phase 2: Direct Partnership Outreach:** The long-term strategy should be to build a network of nursery partners. Project Flora can offer these nurseries a compelling value proposition: free marketing and a new sales channel to a targeted audience of landscape designers. The outreach program should target small to medium-sized independent and regional nurseries first, as they are often more agile and open to partnerships than large national chains. The goal is to establish a simple data exchange format, such as a shared Google Sheet or a CSV file delivered via FTP or email on a weekly or monthly basis.  
* **Phase 3: Affiliate & Big-Box Integration:** Large retailers like Lowe's and Home Depot do not offer public product data APIs for this type of use case.35 They offer affiliate programs (like the Lowe's Creator Program) which provide referral links for monetization, not structured product data feeds for database ingestion.37 While third-party scraping APIs exist that target these retailers, they are legally risky, can be expensive ($50-$300/month or more), and are subject to being broken by site updates.38  
  **Recommendation:** Pursue affiliate programs purely as a monetization strategy by embedding referral links in the application. Do not rely on scraping or affiliate feeds as a source for building the core product database.

### **4.2 Short-Term Action Plan (The "Weekend" Seed Dataset)**

This plan outlines the concrete steps to create and populate the initial database with \~200 validated species using the most accessible, permissively licensed data.

**Day 1: Setup and Foundational Data Ingestion**

1. **Infrastructure:** Provision a PostgreSQL server with the PostGIS extension enabled.  
2. **Schema Creation:** Execute the SQL script from Section 3.1 to create all database tables and indexes.  
3. **Data Acquisition:**  
   * Download the complete **World Flora Online (WFO)** Taxonomic Backbone dump from Zenodo.2  
   * Download the core species and distribution files from the **USDA PLANTS Database** "Downloads" section.4  
   * Download the shapefiles for **USDA Plant Hardiness Zones** (from OSU/PRISM) and **EPA Ecoregions** (from EPA.gov).16

**Day 2: ETL and Initial Population**

1. **Ingest Taxonomy:** Write and execute a Python script to parse the WFO dump and populate the taxa and synonyms tables. This establishes the taxonomic backbone.  
2. **Ingest Regions:** Use a tool like shp2pgsql or a GeoPandas script to load the downloaded shapefiles into the regions table. Create spatial indexes.  
3. **Ingest Native Status:** Write and execute a Python script (similar to the pseudocode in 3.2) to process the USDA PLANTS distribution file, linking taxa to their native states in the native\_status table.  
4. **Ingest Curated Product Data:** Use the provided CSV templates to have Annie populate the data for the initial 200 species. Write and run a simple script to ingest the suppliers.csv and products.csv files.

At the end of this two-day sprint, Project Flora will have a functional, spatially-aware database populated with a core set of 200 plants, complete with foundational taxonomic, distribution, and commercial data, all built on a legally sound and scalable architecture.

### **4.3 Long-Term Scaling Plan (3–6 Months)**

This roadmap outlines the priorities for scaling the database from the initial seed set to a comprehensive catalog of over 5,000 species.

**Months 1–2: Core Data Automation and Enrichment**

* **Develop BONAP Scraper:** Dedicate engineering resources to build, test, and deploy the web scraper for BONAP's county-level distribution data. Implement monitoring to detect site changes.  
* **Develop Media Harvester:** Build the Python script to interact with the Wikimedia Commons API. This script should be able to take a list of scientific names, find relevant images, filter them by permissive licenses (CC0, CC BY, CC BY-SA), and ingest the images along with their full attribution metadata into the media table.  
* **Initiate PFAF Licensing:** Begin formal outreach to Plants For a Future to negotiate terms for a commercial license for their horticultural trait database.

**Months 3–4: Ecological Data and Partner Outreach**

* **Develop Wildlife Scrapers:** Build scrapers for the NWF Native Plant Finder and Audubon Native Plants Database to acquire high-quality, curated ecological interaction data.  
* **Begin Nursery Partnerships:** Launch the outreach program to 5-10 high-priority local or regional nurseries to establish data-sharing agreements for product and availability information.

**Months 5–6: Scaling and Advanced Data R\&D**

* **Evaluate Partnerships:** Assess the success of the nursery partnership program. If direct data feeds are proving difficult to obtain, evaluate paid commercial horticultural datasets or APIs as an alternative to further scraping efforts.  
* **Explore Inferred Interactions:** Begin research and development on using the GBIF and iNaturalist APIs to mine co-occurrence data for inferring plant-wildlife interactions at a massive scale. This can supplement the curated data from NWF and Audubon.

**Budgetary Considerations:**

* **Data Acquisition:** The initial phase relies on free and open data ($0). A budget of approximately $500 – $2,500 should be allocated for a potential one-time or annual license fee for a high-value commercial dataset like PFAF.  
* **API & Service Costs:** Most of the recommended public APIs are free within reasonable rate limits. If commercial scraping APIs are considered as a last resort, they typically range from $50–$300 per month.39  
* **Development & Infrastructure:** The primary cost is developer time. The initial build-out of the core ETL pipelines and scrapers can be estimated at 4-6 weeks of a mid-level developer's time. Ongoing maintenance (especially for scrapers) should be budgeted for. Infrastructure costs for a PostgreSQL database and application server are standard and depend on the chosen cloud provider and scale.

#### **Works cited**

1. Background information for WFO Plant List | World Flora Online, accessed September 22, 2025, [https://wfoplantlist.org/background](https://wfoplantlist.org/background)  
2. WFO Plant List: Name Matching, accessed September 22, 2025, [https://list.worldfloraonline.org/](https://list.worldfloraonline.org/)  
3. ITIS API \- PublicAPI, accessed September 22, 2025, [https://publicapi.dev/itis-api](https://publicapi.dev/itis-api)  
4. USDA Plants Database, accessed September 22, 2025, [https://plants.usda.gov/](https://plants.usda.gov/)  
5. BONAP North American Plant Atlas \- Grow Native Massachusetts, accessed September 22, 2025, [https://grownativemass.org/Great-Resources/databases/BONAP-North-American-Plant-Atlas](https://grownativemass.org/Great-Resources/databases/BONAP-North-American-Plant-Atlas)  
6. Plants For A Future – Digital Downloads, accessed September 22, 2025, [https://plantsforafuture.com/](https://plantsforafuture.com/)  
7. Commons:Licensing, accessed September 22, 2025, [https://commons.wikimedia.org/wiki/Commons:Licensing](https://commons.wikimedia.org/wiki/Commons:Licensing)  
8. Terms of use \- GBIF, accessed September 22, 2025, [https://www.gbif.org/terms](https://www.gbif.org/terms)  
9. NCBI Website and Data Usage Policies and Disclaimers, accessed September 22, 2025, [https://www.ncbi.nlm.nih.gov/home/about/policies/](https://www.ncbi.nlm.nih.gov/home/about/policies/)  
10. Home \- Taxonomy \- NCBI, accessed September 22, 2025, [https://www.ncbi.nlm.nih.gov/taxonomy](https://www.ncbi.nlm.nih.gov/taxonomy)  
11. USDA Plants Database Help, accessed September 22, 2025, [https://plants.usda.gov/help](https://plants.usda.gov/help)  
12. USDA Plants Database Characteristics Search, accessed September 22, 2025, [https://plants.usda.gov/characteristics-search](https://plants.usda.gov/characteristics-search)  
13. USDA PLANTS Database \- GBIF, accessed September 22, 2025, [https://www.gbif.org/dataset/705922f7-5ba5-49ab-a75d-722e3090e690](https://www.gbif.org/dataset/705922f7-5ba5-49ab-a75d-722e3090e690)  
14. BONAP, accessed September 22, 2025, [http://www.bonap.org/](http://www.bonap.org/)  
15. Map Creation \- USDA Plant Hardiness Zone Map, accessed September 22, 2025, [https://planthardiness.ars.usda.gov/pages/map-creation](https://planthardiness.ars.usda.gov/pages/map-creation)  
16. 2023 USDA Plant Hardiness Zone GIS Datasets \- PRISM Group at ..., accessed September 22, 2025, [https://prism.oregonstate.edu/projects/plant\_hardiness\_zones.php](https://prism.oregonstate.edu/projects/plant_hardiness_zones.php)  
17. Ecoregion Download Files by Region | US EPA, accessed September 22, 2025, [https://www.epa.gov/eco-research/ecoregion-download-files-region](https://www.epa.gov/eco-research/ecoregion-download-files-region)  
18. Ecoregion Download Files by State \- Region 1 | US EPA, accessed September 22, 2025, [https://www.epa.gov/eco-research/ecoregion-download-files-state-region-1](https://www.epa.gov/eco-research/ecoregion-download-files-state-region-1)  
19. Copyright Information \- PFAF.org, accessed September 22, 2025, [https://pfaf.org/user/cmspage.aspx?pageid=136](https://pfaf.org/user/cmspage.aspx?pageid=136)  
20. Plants For A Future Plant Species CD ROM \- PFAF.org, accessed September 22, 2025, [https://pfaf.org/user/cmspage.aspx?pageid=71](https://pfaf.org/user/cmspage.aspx?pageid=71)  
21. Plants For A Future Database FAQs \- PFAF.org, accessed September 22, 2025, [https://pfaf.org/user/cmspage.aspx?pageid=11](https://pfaf.org/user/cmspage.aspx?pageid=11)  
22. Ladybird Johnson Wildflower Center Plant Database \- Xerces Society, accessed September 22, 2025, [https://xerces.org/external-resource/ladybird-johnson-wildflower-center-plant-database](https://xerces.org/external-resource/ladybird-johnson-wildflower-center-plant-database)  
23. Lady Bird Johnson Wildflower Center Native Plant Database \- Grow Native Massachusetts, accessed September 22, 2025, [https://grownativemass.org/Great-Resources/databases/Lady-Bird-Johnson-Wildflower-Center-Native-Plant-Database](https://grownativemass.org/Great-Resources/databases/Lady-Bird-Johnson-Wildflower-Center-Native-Plant-Database)  
24. API Downloads \- Technical Documentation \- GBIF, accessed September 22, 2025, [https://techdocs.gbif.org/en/data-use/api-downloads](https://techdocs.gbif.org/en/data-use/api-downloads)  
25. About \- Native Plants Finder, accessed September 22, 2025, [https://nativeplantfinder.nwf.org/about](https://nativeplantfinder.nwf.org/about)  
26. Audubon Native Plants Database \- RiversEdge West, accessed September 22, 2025, [https://www.riversedgewest.org/documents/audubon-native-plants-database](https://www.riversedgewest.org/documents/audubon-native-plants-database)  
27. National Audubon Society Native Plants Database \- Grow Native Massachusetts, accessed September 22, 2025, [https://grownativemass.org/Great-Resources/databases/National-Audubon-Society-Native-Plants-Database](https://grownativemass.org/Great-Resources/databases/National-Audubon-Society-Native-Plants-Database)  
28. Native Plants | Audubon, accessed September 22, 2025, [https://www.audubon.org/native-plants](https://www.audubon.org/native-plants)  
29. occurrence module — pygbif 0.6.5 documentation \- Read the Docs, accessed September 22, 2025, [https://pygbif.readthedocs.io/en/latest/modules/occurrence.html](https://pygbif.readthedocs.io/en/latest/modules/occurrence.html)  
30. Commons:FAQ, accessed September 22, 2025, [https://commons.wikimedia.org/wiki/Commons:FAQ](https://commons.wikimedia.org/wiki/Commons:FAQ)  
31. Wikimedia API Portal, accessed September 22, 2025, [https://api.wikimedia.org/wiki/Main\_Page](https://api.wikimedia.org/wiki/Main_Page)  
32. Commons:API, accessed September 22, 2025, [https://commons.wikimedia.org/wiki/Commons:API](https://commons.wikimedia.org/wiki/Commons:API)  
33. API (geolocalisation, images and vernacular names) \- GBIF community forum, accessed September 22, 2025, [https://discourse.gbif.org/t/api-geolocalisation-images-and-vernacular-names/4297](https://discourse.gbif.org/t/api-geolocalisation-images-and-vernacular-names/4297)  
34. iNaturalist API Example \#1 / robin-song \- Observable, accessed September 22, 2025, [https://observablehq.com/@robin-song/inaturalist-api-example-1](https://observablehq.com/@robin-song/inaturalist-api-example-1)  
35. Home Depot API \- Apify, accessed September 22, 2025, [https://apify.com/api/home-depot-api](https://apify.com/api/home-depot-api)  
36. Lowe's API Integration | Projects Force, accessed September 22, 2025, [https://www.projectsforce.com/lowe-s-api-integration](https://www.projectsforce.com/lowe-s-api-integration)  
37. Join Lowe's Creator Program, accessed September 22, 2025, [https://www.lowes.com/l/creator/joinlowescreator](https://www.lowes.com/l/creator/joinlowescreator)  
38. The Home Depot Product API \- SerpApi, accessed September 22, 2025, [https://serpapi.com/home-depot-product](https://serpapi.com/home-depot-product)  
39. Home Depot Scraper API | ScrapingBee, accessed September 22, 2025, [https://www.scrapingbee.com/scrapers/homedepot-scraper-api/](https://www.scrapingbee.com/scrapers/homedepot-scraper-api/)