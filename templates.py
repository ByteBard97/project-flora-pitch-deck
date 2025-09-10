# Create these files in a "templates" folder next to build.py

## File 1: templates/single_file.html
SINGLE_FILE = '''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{TITLE}}</title>
    <style>
{{CSS_CONTENT}}
    </style>
    {{PLOTLY_SCRIPT}}
</head>
<body>
    <div class="slideshow-container">
        <div id="slide-content">
            <!-- Slides loaded by JavaScript -->
        </div>
    </div>

    <div class="navigation">
        <button class="nav-button" onclick="previousSlide()">◀ Previous</button>
        <button class="nav-button" onclick="nextSlide()">Next ▶</button>
    </div>

    <div class="slide-counter">
        <span id="current-slide">1</span> / <span id="total-slides">{{TOTAL_SLIDES}}</span>
    </div>

    <script>
{{JSON_EMBED_JS}}

const slidesData = {{SLIDES_JSON}};

{{NAVIGATION_JS}}
    </script>
</body>
</html>
'''

## File 2: templates/bundle_index.html
BUNDLE_INDEX = '''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{TITLE}}</title>
    <link rel="stylesheet" href="css/styles.css">
    <script src="js/plotly-2.27.0.min.js"></script>
</head>
<body>
    <div class="slideshow-container">
        <div id="slide-content">
            <!-- Slides loaded by JavaScript -->
        </div>
    </div>

    <div class="navigation">
        <button class="nav-button" onclick="previousSlide()">◀ Previous</button>
        <button class="nav-button" onclick="nextSlide()">Next ▶</button>
    </div>

    <div class="slide-counter">
        <span id="current-slide">1</span> / <span id="total-slides">0</span>
    </div>

    <script src="js/presentation.js"></script>
</body>
</html>
'''

## File 3: templates/navigation.js
NAVIGATION = '''let currentSlide = 0;

function showSlide(index) {
    if (index < 0 || index >= slidesData.length) return;
    
    const slideContent = document.getElementById('slide-content');
    slideContent.innerHTML = slidesData[index].content;
    
    // Update counter
    document.getElementById('current-slide').textContent = index + 1;
    document.getElementById('total-slides').textContent = slidesData.length;
    
    // Update navigation buttons
    const prevButton = document.querySelector('.nav-button');
    const nextButton = document.querySelector('.nav-button:last-child');
    
    prevButton.disabled = index === 0;
    nextButton.disabled = index === slidesData.length - 1;
    
    // Add fade in animation
    slideContent.style.animation = 'none';
    slideContent.offsetHeight; // Trigger reflow
    slideContent.style.animation = 'fadeIn 0.5s';
    
    // Re-run any scripts in the slide
    const scripts = slideContent.querySelectorAll('script');
    scripts.forEach(script => {
        try {
            const newScript = document.createElement('script');
            if (script.src) {
                newScript.src = script.src;
            } else {
                newScript.textContent = script.textContent;
            }
            script.parentNode.replaceChild(newScript, script);
        } catch (error) {
            console.warn('Error re-executing script:', error);
            // Try alternative approach - evaluate script directly
            try {
                eval(script.textContent);
            } catch (evalError) {
                console.error('Failed to execute script:', evalError);
            }
        }
    });
    
    currentSlide = index;
}

function nextSlide() {
    if (currentSlide < slidesData.length - 1) {
        currentSlide++;
        showSlide(currentSlide);
    }
}

function previousSlide() {
    if (currentSlide > 0) {
        currentSlide--;
        showSlide(currentSlide);
    }
}

function goToSlide(index) {
    if (index >= 0 && index < slidesData.length) {
        currentSlide = index;
        showSlide(currentSlide);
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
        const slideNum = parseInt(event.key) - 1;
        if (slideNum < slidesData.length) {
            goToSlide(slideNum);
        }
    } else if (event.key === 'Home') {
        goToSlide(0);
    } else if (event.key === 'End') {
        goToSlide(slidesData.length - 1);
    }
});

// Initialize on first load
document.addEventListener('DOMContentLoaded', function() {
    showSlide(0);
});
'''

## File 4: templates/json_embed.js
JSON_EMBED = '''// Embedded JSON data for 3D visualizations
const embeddedPlotlyDataString = {{PLOTLY_DATA}};
const embeddedHeatmapDataString = {{HEATMAP_DATA}};

// Parse the JSON strings into JavaScript objects
const embeddedPlotlyData = embeddedPlotlyDataString ? JSON.parse(embeddedPlotlyDataString) : null;
const embeddedHeatmapData = embeddedHeatmapDataString ? JSON.parse(embeddedHeatmapDataString) : null;

// Global Plotly variables - moved from slide to prevent redeclaration errors
let plotlyData = null;
let heatmapData = null;
let currentMosaic = 'A';
let currentView = '3d'; // '3d' or 'heatmap'

// Initialize Plotly data globally
function initializePlotlyData() {
    if (typeof embeddedPlotlyData !== 'undefined' && embeddedPlotlyData !== null &&
        typeof embeddedHeatmapData !== 'undefined' && embeddedHeatmapData !== null) {
        // Use embedded data from parent presentation
        plotlyData = embeddedPlotlyData;
        heatmapData = embeddedHeatmapData;
        return true;
    } else {
        // Fallback to fetching (for standalone testing)
        Promise.all([
            fetch('./threshold_data_plotly.json').then(r => r.json()),
            fetch('./threshold_data_heatmap.json').then(r => r.json())
        ]).then(([plotly, heatmap]) => {
            plotlyData = plotly;
            heatmapData = heatmap;
        }).catch(err => {
            console.error('Error loading Plotly data:', err);
        });
        return false;
    }
}

// Initialize data when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initializePlotlyData();
});

// Make data available globally for slides to access
window.plotlyData = embeddedPlotlyData;
window.heatmapData = embeddedHeatmapData;
'''

## File 5: templates/bundle_presentation.js
BUNDLE_PRESENTATION = '''{{JSON_EMBED_JS}}

const slidesData = {{SLIDES_JSON}};

{{NAVIGATION_JS}}

// Update total slides on load
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('total-slides').textContent = slidesData.length;
    showSlide(0);
    
    console.log('Keyboard shortcuts:');
    console.log('→ or Space: Next slide');
    console.log('←: Previous slide');
    console.log('1-9: Jump to slide');
    console.log('Home: First slide');
    console.log('End: Last slide');
});
'''

## File 6: templates/fetch_replacement.js
FETCH_REPLACEMENT = '''// Using embedded data instead of fetch
if (typeof embeddedPlotlyData !== 'undefined' && embeddedPlotlyData) {
    const data = embeddedPlotlyData;
    // Process data as needed
    if (typeof Plotly !== 'undefined') {
        Plotly.newPlot('plotly-div', data);
    }
} else {
    console.error('No embedded Plotly data available');
}
'''

## File 7: templates/fetch_replacement_heatmap.js
FETCH_REPLACEMENT_HEATMAP = '''// Using embedded data instead of fetch
if (typeof embeddedHeatmapData !== 'undefined' && embeddedHeatmapData) {
    const data = embeddedHeatmapData;
    // Process data as needed
} else {
    console.error('No embedded Heatmap data available');
}
'''