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
    {{INTERACTIVE_SCRIPTS}}
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

    <!-- Interactive demo modules -->
    <script src="js/vector-calculator.js"></script>
    <script src="js/timeseries-analyzer.js"></script>
    <script src="js/hue-drag-wheel.js"></script>
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

## File 4: templates/json_embed.js (simplified - no Plotly data)
JSON_EMBED = '''// No embedded data needed for this presentation
console.log('Presentation loaded - no external data dependencies');
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

