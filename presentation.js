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
    'slides/18-flight-vs-now.html',
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

    console.log(`${'='.repeat(80)}`);
    console.log(`🎬 LOADING SLIDE ${index + 1}/${totalSlides}: ${slideFiles[index]?.split('/').pop() || `slide-${index}`}`);
    console.log(`   Full path: ${slideFiles[index] || `slide-${index}`}`);
    console.log(`${'='.repeat(80)}`);
    
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
        console.log('🔍 Checking slide for interactive elements...');
        
        // Check if this is the interactive demo slide (look for the svg element)
        if (slideContent.querySelector('#demo-svg')) {
            console.log('🎮 Interactive Demo slide detected, initializing...');
            console.log('initInteractiveDemo function exists:', typeof initInteractiveDemo);
            setTimeout(initInteractiveDemo, 100);
        }
        
        // Check if this is the GIS demo slide (look for the map container)
        if (slideContent.querySelector('#map')) {
            console.log('🗺️  GIS Demo slide detected, initializing...');
            console.log('initGISDemo function exists:', typeof initGISDemo);
            setTimeout(initGISDemo, 100);
        }
        
        // Check if this is the Vector Calculator slide
        if (slideContent.querySelector('#vector-calculator-container')) {
            console.log('🧮 Vector Calculator slide detected, initializing...');
            console.log('initVectorCalculator function exists:', typeof initVectorCalculator);
            setTimeout(initVectorCalculator, 100);
        }
        
        // Check if this is the Time Series Analyzer slide
        if (slideContent.querySelector('#timeseries-analyzer-container')) {
            console.log('📈 Time Series Analyzer slide detected, initializing...');
            console.log('initTimeSeriesAnalyzer function exists:', typeof initTimeSeriesAnalyzer);
            setTimeout(initTimeSeriesAnalyzer, 100);
        }

        // Check if this is the Flight vs Now timezone slide
        if (slideContent.querySelector('#utc-timeline')) {
            console.log('🕓 Flight vs Now slide detected, initializing...');
            console.log('initFlightVsNow exists:', typeof initFlightVsNow);
            setTimeout(initFlightVsNow, 100);
        }

        // Check if this is the color interpolation hue wheel slide
        if (slideContent.querySelector('#dwSVG')) {
            console.log('🎨 Color interpolation slide detected, initializing...');
            console.log('initHueDragWheel exists:', typeof initHueDragWheel);
            setTimeout(initHueDragWheel, 100);
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

        // Dispatch custom event for SVG layout fixing
        window.dispatchEvent(new CustomEvent('slideLoaded'));

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
    
    // Never disable buttons since we wrap around
    prevButton.disabled = false;
    nextButton.disabled = false;
    
    document.getElementById('current-slide').textContent = currentSlide + 1;
    document.getElementById('total-slides').textContent = totalSlides;
}

function nextSlide() {
    console.log(`🔄 nextSlide() called - currentSlide: ${currentSlide}, totalSlides: ${totalSlides}`);
    if (currentSlide < totalSlides - 1) {
        currentSlide++;
    } else {
        currentSlide = 0; // Wrap to first slide
    }
    console.log(`🔄 About to call loadSlide(${currentSlide})`);
    loadSlide(currentSlide);
    updateNavigation();
}

function previousSlide() {
    console.log(`🔄 previousSlide() called - currentSlide: ${currentSlide}, totalSlides: ${totalSlides}`);
    if (currentSlide > 0) {
        currentSlide--;
    } else {
        currentSlide = totalSlides - 1; // Wrap to last slide
    }
    console.log(`🔄 About to call loadSlide(${currentSlide})`);
    loadSlide(currentSlide);
    updateNavigation();
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

// Wait for libraries and initialize presentation
function waitForLibrariesAndInit() {
    let attempts = 0;
    const maxAttempts = 50; // 5 seconds max

    const checkLibraries = setInterval(() => {
        attempts++;

        // Check if D3 and fc are loaded
        if (typeof window.d3 !== 'undefined' && typeof window.fc !== 'undefined') {
            clearInterval(checkLibraries);
            console.log('✅ D3 and fc libraries loaded successfully');
            console.log('   D3 version:', d3.version);
            console.log('   fc.layoutLabel available:', typeof fc.layoutLabel === 'function');

            // Initialize presentation
            console.log(`🚀 Initializing presentation - calling loadSlide(0)`);
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
        } else if (attempts >= maxAttempts) {
            clearInterval(checkLibraries);
            console.warn('⚠️ D3/fc libraries failed to load after', attempts, 'attempts');
            console.warn('   Continuing without SVG layout fixing...');

            // Initialize presentation anyway
            loadSlide(0);
            updateNavigation();
            slidesLoaded = true;
        } else if (attempts % 10 === 0) {
            console.log('⏳ Waiting for D3/fc libraries... attempt', attempts);
        }
    }, 100);
}

// Initialize presentation
document.addEventListener('DOMContentLoaded', waitForLibrariesAndInit);

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

// Flight vs Now timezone demonstration
function initFlightVsNow() {
    try {
        console.log('Initializing Flight vs Now timezone demo...');

        // Get DOM elements
        const sydDate = document.getElementById('syd-date');
        const sydTime = document.getElementById('syd-time');
        const sfNowBtn = document.getElementById('sf-now');
        const sfNowReadout = document.getElementById('sf-now-readout');
        const dstDemoBtn = document.getElementById('dst-demo');
        const utcTimeline = document.getElementById('utc-timeline');
        const dtCorrect = document.getElementById('dt-correct');
        const dtNaive = document.getElementById('dt-naive');
        const offsetDiff = document.getElementById('offset-diff');
        const sydReadout = document.getElementById('syd-readout');
        const sfReadout = document.getElementById('sf-readout');
        const dstControls = document.getElementById('dst-controls');
        const dstMessage = document.getElementById('dst-message');

        if (!sydDate || !sydTime || !sfNowBtn) {
            console.error('Required DOM elements not found');
            return;
        }

        let sfNowInstant = null; // UTC instant for SF "now"
        let sydFlightInstant = null; // UTC instant for Sydney flight

        // Timezone helper functions
        function getTimezoneOffset(date, timeZone) {
            // Get offset in minutes for a specific date and timezone
            const utc1 = new Date(date.getTime() + (date.getTimezoneOffset() * 60000));
            const utc2 = new Date(utc1.toLocaleString("en-US", {timeZone}));
            return (utc2.getTime() - utc1.getTime()) / 60000;
        }

        function localToInstant(dateStr, timeStr, timeZone) {
            // Convert local date/time in timezone to UTC instant
            // Returns { instant: Date|null, status: 'valid'|'gap'|'fold', occurrences: Date[] }

            const targetDate = new Date(dateStr + 'T' + timeStr + ':00');
            const year = targetDate.getFullYear();
            const month = targetDate.getMonth();
            const day = targetDate.getDate();
            const hours = targetDate.getHours();
            const minutes = targetDate.getMinutes();

            // Search for UTC instants that format to this local time
            const occurrences = [];
            const searchStart = new Date(Date.UTC(year, month, day - 1, 0, 0, 0));
            const searchEnd = new Date(Date.UTC(year, month, day + 2, 0, 0, 0));

            // Search in 15-minute increments for efficiency
            for (let utc = searchStart.getTime(); utc <= searchEnd.getTime(); utc += 15 * 60 * 1000) {
                const candidate = new Date(utc);
                const formatted = candidate.toLocaleString('sv-SE', {
                    timeZone,
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit'
                }).replace(' ', 'T');

                const candidateLocal = formatted.split('T');
                const candDate = candidateLocal[0];
                const candTime = candidateLocal[1];

                if (candDate === dateStr && candTime === timeStr) {
                    occurrences.push(candidate);
                }
            }

            if (occurrences.length === 0) {
                // Gap - find next valid time
                for (let utc = searchStart.getTime(); utc <= searchEnd.getTime(); utc += 15 * 60 * 1000) {
                    const candidate = new Date(utc);
                    const formatted = candidate.toLocaleString('sv-SE', {
                        timeZone,
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit'
                    }).replace(' ', 'T');

                    const candidateLocal = formatted.split('T');
                    const candDate = candidateLocal[0];

                    if (candDate === dateStr && formatted > (dateStr + 'T' + timeStr)) {
                        return {
                            instant: candidate,
                            status: 'gap',
                            occurrences: [candidate],
                            adjustedTime: candidateLocal[1]
                        };
                    }
                }
                return { instant: null, status: 'gap', occurrences: [] };
            } else if (occurrences.length === 1) {
                return { instant: occurrences[0], status: 'valid', occurrences };
            } else {
                // Fold - multiple occurrences
                return { instant: occurrences[0], status: 'fold', occurrences };
            }
        }

        function formatDuration(milliseconds) {
            const totalMinutes = Math.abs(milliseconds) / (1000 * 60);
            const hours = Math.floor(totalMinutes / 60);
            const minutes = Math.round(totalMinutes % 60);
            const sign = milliseconds >= 0 ? '+' : '-';

            if (hours === 0) {
                return `${sign}${minutes}m`;
            } else if (minutes === 0) {
                return `${sign}${hours}h`;
            } else {
                return `${sign}${hours}h ${minutes}m`;
            }
        }

        function formatLocalTime(instant, timeZone) {
            if (!instant) return 'Invalid';

            const options = {
                timeZone,
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                timeZoneName: 'short'
            };

            return instant.toLocaleString('en-US', options);
        }

        function calculateNaiveDelta(sydDateStr, sydTimeStr, sfInstant, sfTimeZone) {
            // Calculate naive difference treating both as if in same timezone
            const sydLocal = new Date(sydDateStr + 'T' + sydTimeStr + ':00');
            const sfLocal = new Date(sfInstant.toLocaleString('sv-SE', {
                timeZone: sfTimeZone
            }).replace(' ', 'T'));

            return sfLocal.getTime() - sydLocal.getTime();
        }

        function drawTimeline(sydInstant, sfInstant) {
            if (!utcTimeline || !sydInstant || !sfInstant) return;

            // Clear existing content
            utcTimeline.innerHTML = '';

            // Timeline parameters
            const width = 900;
            const height = 160;
            const margin = { left: 50, right: 50, top: 30, bottom: 50 };
            const timelineY = height / 2;

            // Calculate time range
            const minTime = Math.min(sydInstant.getTime(), sfInstant.getTime());
            const maxTime = Math.max(sydInstant.getTime(), sfInstant.getTime());
            const padding = (maxTime - minTime) * 0.2; // 20% padding
            const startTime = minTime - padding;
            const endTime = maxTime + padding;

            // Scale function
            function timeToX(timestamp) {
                return margin.left + ((timestamp - startTime) / (endTime - startTime)) * (width - margin.left - margin.right);
            }

            // Draw main timeline
            const timeline = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            timeline.setAttribute('x1', margin.left);
            timeline.setAttribute('x2', width - margin.right);
            timeline.setAttribute('y1', timelineY);
            timeline.setAttribute('y2', timelineY);
            timeline.setAttribute('stroke', '#7d8590');
            timeline.setAttribute('stroke-width', '2');
            utcTimeline.appendChild(timeline);

            // Draw time markers (every 4 hours)
            const timeSpan = endTime - startTime;
            const fourHours = 4 * 60 * 60 * 1000;
            const markerInterval = Math.max(fourHours, Math.ceil(timeSpan / 6 / fourHours) * fourHours);

            const firstMarker = Math.ceil(startTime / markerInterval) * markerInterval;
            for (let t = firstMarker; t <= endTime; t += markerInterval) {
                const x = timeToX(t);

                // Tick mark
                const tick = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                tick.setAttribute('x1', x);
                tick.setAttribute('x2', x);
                tick.setAttribute('y1', timelineY - 5);
                tick.setAttribute('y2', timelineY + 5);
                tick.setAttribute('stroke', '#7d8590');
                tick.setAttribute('stroke-width', '1');
                utcTimeline.appendChild(tick);

                // Time label
                const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                label.setAttribute('x', x);
                label.setAttribute('y', timelineY + 25);
                label.setAttribute('text-anchor', 'middle');
                label.setAttribute('fill', '#7d8590');
                label.setAttribute('font-size', '10');
                label.textContent = new Date(t).toISOString().substring(11, 16) + ' UTC';
                utcTimeline.appendChild(label);
            }

            // Draw event pins
            function drawPin(instant, color, label, yOffset = 0) {
                const x = timeToX(instant.getTime());

                // Pin line
                const pin = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                pin.setAttribute('x1', x);
                pin.setAttribute('x2', x);
                pin.setAttribute('y1', timelineY - 25 + yOffset);
                pin.setAttribute('y2', timelineY + 25 + yOffset);
                pin.setAttribute('stroke', color);
                pin.setAttribute('stroke-width', '3');
                utcTimeline.appendChild(pin);

                // Pin circle
                const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                circle.setAttribute('cx', x);
                circle.setAttribute('cy', timelineY + yOffset);
                circle.setAttribute('r', '6');
                circle.setAttribute('fill', color);
                utcTimeline.appendChild(circle);

                // Label
                const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                text.setAttribute('x', x);
                text.setAttribute('y', timelineY - 35 + yOffset);
                text.setAttribute('text-anchor', 'middle');
                text.setAttribute('fill', color);
                text.setAttribute('font-size', '12');
                text.setAttribute('font-weight', 'bold');
                text.textContent = label;
                utcTimeline.appendChild(text);
            }

            drawPin(sydInstant, '#ff6b6b', 'Sydney Flight');
            drawPin(sfInstant, '#4ecdc4', 'SF Now');

            // Draw naive connection (orange dashed line)
            const sydX = timeToX(sydInstant.getTime());
            const sfX = timeToX(sfInstant.getTime());

            const naiveLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            naiveLine.setAttribute('x1', sydX);
            naiveLine.setAttribute('x2', sfX);
            naiveLine.setAttribute('y1', timelineY + 35);
            naiveLine.setAttribute('y2', timelineY + 35);
            naiveLine.setAttribute('stroke', '#FFA500');
            naiveLine.setAttribute('stroke-width', '2');
            naiveLine.setAttribute('stroke-dasharray', '5,5');
            naiveLine.setAttribute('opacity', '0.7');
            utcTimeline.appendChild(naiveLine);

            // Naive line label
            const naiveLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            naiveLabel.setAttribute('x', (sydX + sfX) / 2);
            naiveLabel.setAttribute('y', timelineY + 50);
            naiveLabel.setAttribute('text-anchor', 'middle');
            naiveLabel.setAttribute('fill', '#FFA500');
            naiveLabel.setAttribute('font-size', '10');
            naiveLabel.textContent = 'naive (wall-clock) subtraction';
            utcTimeline.appendChild(naiveLabel);
        }

        function updateCalculations() {
            const sydDateStr = sydDate.value;
            const sydTimeStr = sydTime.value;

            if (!sydDateStr || !sydTimeStr || !sfNowInstant) {
                dtCorrect.textContent = 'Set both times first';
                dtNaive.textContent = 'Set both times first';
                offsetDiff.textContent = '—';
                sydReadout.textContent = 'Sydney: Set date/time above';
                sfReadout.textContent = 'San Francisco: Click "Use Now"';
                return;
            }

            // Convert Sydney local time to UTC instant
            const sydResult = localToInstant(sydDateStr, sydTimeStr, 'Australia/Sydney');

            // Handle DST transitions (simplified for engineers)
            if (sydResult.status === 'gap') {
                dstControls.classList.add('show');
                dstMessage.textContent = `Time ${sydTimeStr} doesn't exist on ${sydDateStr} due to DST spring-forward.`;
                if (sydResult.adjustedTime) {
                    dstMessage.textContent += ` Auto-adjusted to ${sydResult.adjustedTime}.`;
                }
                sydFlightInstant = sydResult.instant;
            } else if (sydResult.status === 'fold' && sydResult.occurrences.length === 2) {
                dstControls.classList.add('show');
                dstMessage.textContent = `Time ${sydTimeStr} occurs twice on ${sydDateStr} due to DST fall-back. Using earlier occurrence.`;
                sydFlightInstant = sydResult.occurrences[0]; // Always use earlier occurrence
            } else {
                dstControls.classList.remove('show');
                sydFlightInstant = sydResult.instant;
            }

            if (!sydFlightInstant) {
                dtCorrect.textContent = 'Invalid Sydney time';
                dtNaive.textContent = 'Invalid Sydney time';
                return;
            }

            // Calculate correct delta (UTC instant subtraction)
            const correctDeltaMs = sfNowInstant.getTime() - sydFlightInstant.getTime();
            dtCorrect.textContent = formatDuration(correctDeltaMs);

            // Calculate naive delta (local wall-clock subtraction)
            const naiveDeltaMs = calculateNaiveDelta(sydDateStr, sydTimeStr, sfNowInstant, 'America/Los_Angeles');
            dtNaive.textContent = formatDuration(naiveDeltaMs);

            // Calculate offset difference
            const sydOffset = getTimezoneOffset(sydFlightInstant, 'Australia/Sydney') / 60; // Convert to hours
            const sfOffset = getTimezoneOffset(sfNowInstant, 'America/Los_Angeles') / 60;
            const offsetDifference = sfOffset - sydOffset;
            offsetDiff.textContent = `(${sfOffset >= 0 ? '+' : ''}${sfOffset}h) − (${sydOffset >= 0 ? '+' : ''}${sydOffset}h) = ${offsetDifference >= 0 ? '+' : ''}${offsetDifference}h`;

            // Update local readouts
            sydReadout.textContent = `Sydney: ${formatLocalTime(sydFlightInstant, 'Australia/Sydney')}`;
            sfReadout.textContent = `San Francisco: ${formatLocalTime(sfNowInstant, 'America/Los_Angeles')}`;

            // Draw timeline
            drawTimeline(sydFlightInstant, sfNowInstant);
        }

        // Event handlers
        sfNowBtn.addEventListener('click', () => {
            sfNowInstant = new Date();
            sfNowReadout.textContent = formatLocalTime(sfNowInstant, 'America/Los_Angeles');
            updateCalculations();
        });

        // DST demo button - shows spring-forward gap
        if (dstDemoBtn) {
            dstDemoBtn.addEventListener('click', () => {
                sydDate.value = '2025-10-05';
                sydTime.value = '02:30';
                updateCalculations();
            });
        }

        sydDate.addEventListener('change', updateCalculations);
        sydTime.addEventListener('change', updateCalculations);

        // Initialize with current SF time
        sfNowInstant = new Date();
        sfNowReadout.textContent = formatLocalTime(sfNowInstant, 'America/Los_Angeles');
        updateCalculations();

        console.log('Flight vs Now timezone demo initialized');
    } catch (error) {
        console.error('Error initializing Flight vs Now demo:', error);
    }
}

