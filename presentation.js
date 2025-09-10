// Slide configuration - add slide filenames here in order
const slideFiles = [
    'slides/01-title.html',
    'slides/02-the-bug.html',
    'slides/03-midnight-bug.html', 
    'slides/04-the-solution.html',
    'slides/13-circular-statistics.html',
    'slides/14-discrete-calculus.html',
    'slides/15-other-circular-quantities.html',
    'slides/16-arbitrary-wrap-points.html',
    'slides/05-robot-heading.html',
    'slides/06-color-interpolation.html',
    'slides/07-general-pattern.html',
    'slides/08-mathematical-insight.html',
    'slides/09-takeaways.html',
    'slides/11-interactive-demo.html',
    'slides/12-gis-demo.html',
    'slides/16-vector-calculator.html',
    'slides/17-timeseries-analyzer.html',
    'slides/10-questions.html'
];

let currentSlide = 0;
let slidesLoaded = false;

// Global interactive app manager
window.currentInteractiveApp = null;

// Get total number of slides (from embedded data or file list)
const totalSlides = window.slideData ? Object.keys(window.slideData).length : slideFiles.length;

// Load slide content (either from embedded data or fetch)
async function loadSlide(index) {
    if (index < 0 || index >= totalSlides) return;
    
    // Clean up any existing interactive app
    if (window.currentInteractiveApp) {
        window.currentInteractiveApp.destroy(true, { children: true, texture: true, baseTexture: true });
        window.currentInteractiveApp = null;
    }
    
    try {
        let content;
        
        // Check if we have embedded slide data (bundled version)
        if (window.slideData) {
            content = window.slideData[index.toString()];
            if (!content) {
                throw new Error(`Slide data not found for key: ${index}`);
            }
        } else {
            // Fetch individual slide files (bundle folder version)
            const response = await fetch(slideFiles[index]);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            content = await response.text();
        }
        
        document.getElementById('slide-content').innerHTML = content;
        
        // Ensure code blocks have proper language classes and highlight syntax
        const slideContent = document.getElementById('slide-content');
        
        // Fix code classes for Highlight.js compatibility
        slideContent.querySelectorAll('pre code').forEach(el => {
            const cls = el.getAttribute('class') || '';
            if (/\bpython\b/i.test(cls) && !/\blanguage-python\b/i.test(cls)) {
                el.className = (cls + ' language-python').trim();
            }
            if (/\bjavascript\b/i.test(cls) && !/\blanguage-javascript\b/i.test(cls)) {
                el.className = (cls + ' language-javascript').trim();
            }
        });

        // Initialize demos based on slide content
        // Check if this is the interactive demo slide (look for the canvas element)
        if (slideContent.querySelector('#demo-canvas')) {
            setTimeout(initInteractiveDemo, 100);
        }
        
        // Check if this is the GIS demo slide (look for the map container)
        if (slideContent.querySelector('#map')) {
            setTimeout(initGISDemo, 100);
        }
        
        // Check if this is the Vector Calculator slide
        if (slideContent.querySelector('#vector-calculator-container')) {
            setTimeout(initVectorCalculator, 100);
        }
        
        // Check if this is the Time Series Analyzer slide
        if (slideContent.querySelector('#timeseries-analyzer-container')) {
            setTimeout(initTimeSeriesAnalyzer, 100);
        }
        
        // Re-run Highlight.js on the new content
        if (window.hljs) {
            slideContent.querySelectorAll('pre code').forEach(block => {
                hljs.highlightElement(block);
            });
        }
        
        // Add fade in animation
        slideContent.style.animation = 'none';
        slideContent.offsetHeight; // Trigger reflow
        slideContent.style.animation = 'fadeIn 0.5s';
        
    } catch (error) {
        console.error('Error loading slide:', error);
        document.getElementById('slide-content').innerHTML = `
            <h1>Error Loading Slide</h1>
            <p>Could not load slide: ${slideFiles[index]}</p>
            <p>Error: ${error.message}</p>
        `;
    }
}

function updateNavigation() {
    const prevButton = document.querySelector('.nav-button');
    const nextButton = document.querySelector('.nav-button:last-child');
    
    prevButton.disabled = currentSlide === 0;
    nextButton.disabled = currentSlide === totalSlides - 1;
    
    document.getElementById('current-slide').textContent = currentSlide + 1;
    document.getElementById('total-slides').textContent = totalSlides;
}

function nextSlide() {
    if (currentSlide < totalSlides - 1) {
        currentSlide++;
        loadSlide(currentSlide);
        updateNavigation();
    }
}

function previousSlide() {
    if (currentSlide > 0) {
        currentSlide--;
        loadSlide(currentSlide);
        updateNavigation();
    }
}

// Jump to specific slide (for development/testing)
function goToSlide(index) {
    if (index >= 0 && index < totalSlides) {
        currentSlide = index;
        loadSlide(currentSlide);
        updateNavigation();
    }
}

// Keyboard navigation
document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowRight' || event.key === ' ') {
        event.preventDefault();
        nextSlide();
    } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        previousSlide();
    } else if (event.key >= '1' && event.key <= '9') {
        // Jump to slide by number key
        const slideNum = parseInt(event.key) - 1;
        if (slideNum < totalSlides) {
            goToSlide(slideNum);
        }
    } else if (event.key === 'Home') {
        goToSlide(0);
    } else if (event.key === 'End') {
        goToSlide(totalSlides - 1);
    }
});

// Initialize presentation
document.addEventListener('DOMContentLoaded', function() {
    loadSlide(0);
    updateNavigation();
    slidesLoaded = true;
    
    // Add some helpful keyboard shortcuts info
    console.log('Keyboard shortcuts:');
    console.log('→ or Space: Next slide');
    console.log('←: Previous slide'); 
    console.log('1-9: Jump to slide');
    console.log('Home: First slide');
    console.log('End: Last slide');
});

// Interactive demo functionality for slide 10
function initInteractiveDemo() {
    const angle1Input = document.getElementById('angle1');
    const angle2Input = document.getElementById('angle2');
    const angle1Display = document.getElementById('angle1-display');
    const angle2Display = document.getElementById('angle2-display');
    const wrongResult = document.getElementById('wrong-result');
    const correctResult = document.getElementById('correct-result');
    
    // Check if elements exist (safety check)
    if (!angle1Input || !angle2Input) {
        console.log('Interactive demo elements not found');
        return;
    }
    
    function updateDemo() {
        const a1 = parseInt(angle1Input.value);
        const a2 = parseInt(angle2Input.value);
        
        // Update displays
        angle1Display.textContent = a1 + '°';
        angle2Display.textContent = a2 + '°';
        
        // Calculate wrong (linear) average
        const wrongAvg = (a1 + a2) / 2;
        wrongResult.textContent = Math.round(wrongAvg) + '°';
        
        // Calculate correct (circular) average
        const theta1 = a1 * Math.PI / 180;
        const theta2 = a2 * Math.PI / 180;
        const v1 = [Math.cos(theta1), Math.sin(theta1)];
        const v2 = [Math.cos(theta2), Math.sin(theta2)];
        const avgVec = [(v1[0] + v2[0])/2, (v1[1] + v2[1])/2];
        const norm = Math.sqrt(avgVec[0]**2 + avgVec[1]**2);
        avgVec[0] /= norm; avgVec[1] /= norm;
        const correctAvg = Math.atan2(avgVec[1], avgVec[0]) * 180 / Math.PI;
        const correctAvgNormalized = (correctAvg + 360) % 360;
        correctResult.textContent = Math.round(correctAvgNormalized) + '°';
        
        // Update visual
        updateVisual(a1, a2, wrongAvg, correctAvgNormalized);
        
        // Show/hide wrong result based on how wrong it is
        const wrongness = Math.abs(wrongAvg - correctAvgNormalized);
        const adjustedWrongness = Math.min(wrongness, 360 - wrongness);
        const opacity = adjustedWrongness > 30 ? 1 : 0;
        
        const wrongLine = document.getElementById('avg-wrong-line');
        const wrongPoint = document.getElementById('avg-wrong-point');
        if (wrongLine) wrongLine.style.opacity = opacity;
        if (wrongPoint) wrongPoint.style.opacity = opacity;
    }
    
    function updateVisual(a1, a2, wrongAvg, correctAvg) {
        const cx = 200, cy = 200, r = 150;
        
        // Convert angles to positions
        function angleToPos(angle) {
            const rad = (angle - 90) * Math.PI / 180; // -90 to start from top
            return {
                x: cx + r * Math.cos(rad),
                y: cy + r * Math.sin(rad)
            };
        }
        
        const pos1 = angleToPos(a1);
        const pos2 = angleToPos(a2);
        const wrongPos = angleToPos(wrongAvg);
        const correctPos = angleToPos(correctAvg);
        
        // Update lines and points safely
        const elements = [
            { id: 'angle1-line', x2: pos1.x, y2: pos1.y },
            { id: 'angle1-point', cx: pos1.x, cy: pos1.y },
            { id: 'angle2-line', x2: pos2.x, y2: pos2.y },
            { id: 'angle2-point', cx: pos2.x, cy: pos2.y },
            { id: 'avg-wrong-line', x2: wrongPos.x, y2: wrongPos.y },
            { id: 'avg-wrong-point', cx: wrongPos.x, cy: wrongPos.y },
            { id: 'avg-correct-line', x2: correctPos.x, y2: correctPos.y },
            { id: 'avg-correct-point', cx: correctPos.x, cy: correctPos.y }
        ];
        
        elements.forEach(elem => {
            const element = document.getElementById(elem.id);
            if (element) {
                if (elem.x2 !== undefined) element.setAttribute('x2', elem.x2);
                if (elem.y2 !== undefined) element.setAttribute('y2', elem.y2);
                if (elem.cx !== undefined) element.setAttribute('cx', elem.cx);
                if (elem.cy !== undefined) element.setAttribute('cy', elem.cy);
            }
        });
    }
    
    // Set up event listeners
    angle1Input.addEventListener('input', updateDemo);
    angle2Input.addEventListener('input', updateDemo);
    
    // Initial update
    updateDemo();
    
    console.log('Interactive demo initialized');
}

// GIS Demo functionality for slide 12
function initGISDemo() {
    // Check if Leaflet is loaded
    if (typeof L === 'undefined') {
        console.log('Leaflet not loaded yet, retrying...');
        setTimeout(initGISDemo, 200);
        return;
    }
    
    // Check if map container exists
    const mapContainer = document.getElementById('map');
    if (!mapContainer) {
        console.log('Map container not found');
        return;
    }
    
    // Clear any existing map
    if (window.gisMap) {
        window.gisMap.remove();
        window.gisMap = null;
    }
    
    try {
        // International Date Line area (where the real wraparound happens)
        const DATELINE_CENTER = [0.0, 180.0]; // Equator at 180° longitude

        // Map with world copy jump disabled initially, centered on the International Date Line
        const map = L.map('map', { 
            center: DATELINE_CENTER, 
            zoom: 4, 
            worldCopyJump: false 
        });
        window.gisMap = map; // Store reference for cleanup

        // OSM tiles with attribution
        let tiles = L.tileLayer(
            'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            { 
                maxZoom: 19, 
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' 
            }
        ).addTo(map);
        window.gisTiles = tiles;

        // Two draggable points that straddle the International Date Line (the REAL wraparound!)
        const blueIcon = L.divIcon({
            className: 'custom-marker',
            html: '<div style="background:#2196F3; width:20px; height:20px; border-radius:50%; border:3px solid white; box-shadow:0 2px 6px rgba(0,0,0,0.3);"></div>',
            iconSize: [20, 20],
            iconAnchor: [10, 10]
        });
        const orangeIcon = L.divIcon({
            className: 'custom-marker', 
            html: '<div style="background:#FF9800; width:20px; height:20px; border-radius:50%; border:3px solid white; box-shadow:0 2px 6px rgba(0,0,0,0.3);"></div>',
            iconSize: [20, 20],
            iconAnchor: [10, 10]
        });
        
        const marker1 = L.marker([5.0, 175.0], {draggable:true, icon: blueIcon}).addTo(map).bindTooltip('+175°E', {permanent:true, direction:'right'});
        const marker2 = L.marker([15.0, 178.0], {draggable:true, icon: orangeIcon}).addTo(map).bindTooltip('+178°E', {permanent:true, direction:'left'});
        const pts = [marker1, marker2];
        window.gisMarkers = pts;
        
        console.log('Created GIS markers:', pts.length, 'markers at positions:', 
                   pts.map(m => `${m.getLatLng().lat},${m.getLatLng().lng}`));

        // Circular mean helper function
        function meanLonDeg(ds) {
            let x = 0, y = 0;
            for (const d of ds) {
                const r = d * Math.PI / 180;
                x += Math.cos(r); 
                y += Math.sin(r);
            }
            let m = Math.atan2(y, x) * 180 / Math.PI;
            if (m >= 180) m -= 360;
            if (m < -180) m += 360;
            return m;
        }

        // Result markers - RED for wrong, GREEN for correct
        const wrongMarker = L.circleMarker(DATELINE_CENTER, {
            radius: 12, 
            color: '#FF1744', 
            fillColor: '#FF5252', 
            fillOpacity: 0.9,
            weight: 3
        }).addTo(map).bindTooltip('WRONG: Linear Mean', {permanent: false, direction: 'top'});
        
        const correctMarker = L.circleMarker(DATELINE_CENTER, {
            radius: 15, 
            color: '#00C853', 
            fillColor: '#00E676', 
            fillOpacity: 0.9,
            weight: 3
        }).addTo(map).bindTooltip('CORRECT: Circular Mean', {permanent: false, direction: 'bottom'});
        const readout = document.getElementById('readout');
        
        window.gisResultMarkers = [wrongMarker, correctMarker];

        function update() {
            const lats = pts.map(m => m.getLatLng().lat);
            const lons = pts.map(m => m.getLatLng().lng);
            const latAvg = lats.reduce((a, b) => a + b, 0) / lats.length;
            const linMean = (lons[0] + lons[1]) / 2; // WRONG near 0°
            const circMean = meanLonDeg(lons);

            wrongMarker.setLatLng([latAvg, linMean]);
            correctMarker.setLatLng([latAvg, circMean]);

            // Tiny line showing crossing at 0° 
            if (window.crossLine) map.removeLayer(window.crossLine);
            window.crossLine = L.polyline([[latAvg, -0.01], [latAvg, 0.01]], {color:'#4FC3F7', weight:3}).addTo(map);

            if (readout) {
                readout.textContent = 
                    `Circular mean: ${circMean.toFixed(3)}°, Linear mean (wrong): ${((linMean + 540) % 360 - 180).toFixed(3)}°`;
            }
        }

        pts.forEach(m => m.on('drag dragend', update));
        update();

        // UI toggles
        const worldCopyCheckbox = document.getElementById('worldCopy');
        const noWrapTilesCheckbox = document.getElementById('noWrapTiles');
        
        if (worldCopyCheckbox) {
            worldCopyCheckbox.addEventListener('change', (e) => {
                map.options.worldCopyJump = !!e.target.checked;
                map.panBy([1, 0]); // nudge to apply visually
            });
        }
        
        if (noWrapTilesCheckbox) {
            noWrapTilesCheckbox.addEventListener('change', (e) => {
                const noWrap = !!e.target.checked;
                map.removeLayer(tiles);
                tiles = L.tileLayer(
                    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                    { 
                        maxZoom: 19, 
                        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors', 
                        noWrap 
                    }
                ).addTo(map);
                window.gisTiles = tiles;
            });
        }

        console.log('GIS demo initialized');
    } catch (error) {
        console.error('Error initializing GIS demo:', error);
    }
}

// Time Series Analyzer functionality for slide 17
function initTimeSeriesAnalyzer() {
    // Check if PIXI is loaded
    if (typeof PIXI === 'undefined') {
        console.log('PIXI not loaded yet for time series analyzer, retrying...');
        setTimeout(initTimeSeriesAnalyzer, 200);
        return;
    }
    
    const container = document.getElementById('timeseries-analyzer-container');
    if (!container) {
        console.log('Time series analyzer container not found');
        return;
    }
    
    // Clean up any existing app
    if (window.currentInteractiveApp) {
        window.currentInteractiveApp.destroy(true, { children: true, texture: true, baseTexture: true });
        window.currentInteractiveApp = null;
    }
    
    // Basic placeholder - implement time series functionality here
    container.innerHTML = '<div style="color: white; padding: 20px; text-align: center;">Time Series Analyzer - Coming Soon</div>';
    
    console.log('Time Series Analyzer initialized');
}