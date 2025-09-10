#!/usr/bin/env python3
"""
Simple bundler for the wraparound math presentation.
Creates a self-contained HTML file with all slides, CSS, and JS embedded.
"""

import os
import requests
from pathlib import Path

def fetch_cdn_resource(url):
    """Fetch content from CDN URL"""
    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        return response.text
    except:
        print(f"⚠️  Warning: Could not fetch {url}")
        return f"/* Could not load {url} */"

def read_file(path):
    """Read file content"""
    try:
        with open(path, 'r', encoding='utf-8') as f:
            return f.read()
    except:
        print(f"⚠️  Warning: Could not read {path}")
        return ""

def create_bundle():
    """Create bundled presentation"""
    print("🎯 Creating bundled wraparound math presentation...")
    
    # Read main files
    styles_css = read_file('styles.css')
    presentation_js = read_file('presentation.js')
    
    # Fetch CDN resources
    print("📥 Fetching external dependencies...")
    prism_css = fetch_cdn_resource('https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow-night.min.css')
    prism_core_js = fetch_cdn_resource('https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-core.min.js')
    prism_autoloader_js = fetch_cdn_resource('https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/plugins/autoloader/prism-autoloader.min.js')
    mathjax_js = fetch_cdn_resource('https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js')
    
    # Read all slides
    slides = {}
    slide_files = [
        '01-title.html', '02-the-bug.html', '03-midnight-bug.html', 
        '04-the-solution.html', '05-robot-heading.html', '06-color-interpolation.html',
        '07-general-pattern.html', '08-mathematical-insight.html', '09-takeaways.html',
        '11-interactive-demo.html', '10-questions.html'
    ]
    
    print("📄 Reading slide files...")
    for slide_file in slide_files:
        path = f'slides/{slide_file}'
        slides[slide_file] = read_file(path)
    
    # Create bundled HTML
    html_content = f'''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Stop Fighting Wraparound: Embed Your Rings!</title>
    
    <!-- Embedded Styles -->
    <style>
{styles_css}
    </style>
    
    <!-- Prism.js Theme -->
    <style>
{prism_css}
    </style>
    
    <!-- Dark theme overrides - LOADED AFTER PRISM -->
    <style>
        /* Override Prism with equal/higher specificity + !important */
        body pre[class*="language-"],
        body code[class*="language-"] {{
            background: rgba(0,0,0,0.4) !important;
            color: var(--ink) !important;
            border: 1px solid rgba(255,255,255,0.1) !important;
            border-radius: 12px !important;
        }}
        
        /* Scoped overrides for our specific containers */
        .code-example pre[class*="language-"],
        .code-solution pre[class*="language-"],
        .implementation-example pre[class*="language-"],
        .universal-class pre[class*="language-"],
        .approaches pre[class*="language-"] {{
            background: rgba(0,0,0,0.4) !important;
            padding: 20px !important;
        }}
        
        /* Maintain our colored container backgrounds */
        .bad-code, .code-example {{
            background: linear-gradient(180deg, rgba(255,123,123,0.08), rgba(255,123,123,0.04)) !important;
            border-left: 4px solid var(--accent3) !important;
            border-radius: 8px !important;
            padding: 1em !important;
        }}
        
        .good-code, .code-solution {{
            background: linear-gradient(180deg, rgba(155,255,176,0.08), rgba(155,255,176,0.04)) !important;
            border-left: 4px solid var(--accent2) !important;
            border-radius: 8px !important;
            padding: 1em !important;
        }}
        
        .implementation-example {{
            background: #f5f5f5 !important;
            border-left: 4px solid #9C27B0 !important;
            border-radius: 8px !important;
            padding: 1em !important;
        }}
        
        .universal-class {{
            background: #f5f5f5 !important;
            border-left: 4px solid #2196F3 !important;
            border-radius: 8px !important;
            padding: 1em !important;
        }}
        
        .approach-bad, .approach-good {{
            background: rgba(255,255,255,0.04) !important;
            border: 1px solid rgba(255,255,255,0.08) !important;
            border-radius: 8px !important;
            padding: 1em !important;
        }}
    </style>

    <!-- MathJax Configuration -->
    <script>
        MathJax = {{
            tex: {{
                inlineMath: [['$', '$'], ['\\\\(', '\\\\)']],
                displayMath: [['$$', '$$'], ['\\\\[', '\\\\]']]
            }},
            options: {{
                renderActions: {{
                    addMenu: []  // Disable context menu for cleaner presentation
                }}
            }}
        }};
    </script>
</head>
<body>
    <div class="slideshow-container">
        <div id="slide-content"></div>
    </div>

    <!-- Navigation -->
    <div class="navigation">
        <button class="nav-button" onclick="previousSlide()">◀ Previous</button>
        <button class="nav-button" onclick="nextSlide()">Next ▶</button>
    </div>

    <!-- Slide Counter -->
    <div class="slide-counter">
        <span id="current-slide">1</span> / <span id="total-slides">0</span>
    </div>

    <!-- Embedded Slides Data -->
    <script>
        // Embedded slide data
        window.slideData = {{'''

    # Add slide data
    for slide_file in slide_files:
        html_content += f'\n            "{slide_file}": `{slides[slide_file]}`,\n'

    html_content += '''        };
    </script>

    <!-- MathJax -->
    <script>
''' + mathjax_js + '''
    </script>

    <!-- Prism.js -->
    <script>
''' + prism_core_js + '''
    </script>
    
    <script>
''' + prism_autoloader_js + '''
    </script>

    <!-- Modified Presentation Script -->
    <script>
// Modified presentation.js for bundled version
const slideFiles = [
    '01-title.html',
    '02-the-bug.html', 
    '03-midnight-bug.html',
    '04-the-solution.html',
    '05-robot-heading.html',
    '06-color-interpolation.html',
    '07-general-pattern.html',
    '08-mathematical-insight.html',
    '09-takeaways.html',
    '11-interactive-demo.html',
    '10-questions.html'
];

let currentSlide = 0;
let slidesLoaded = false;

// Load slide content from embedded data
function loadSlide(index) {
    if (index < 0 || index >= slideFiles.length) return;
    
    try {
        const slideKey = slideFiles[index];
        const content = window.slideData[slideKey];
        document.getElementById('slide-content').innerHTML = content;
        
        // Add fade in animation
        const slideContent = document.getElementById('slide-content');
        slideContent.style.animation = 'none';
        slideContent.offsetHeight; // Trigger reflow
        slideContent.style.animation = 'fadeIn 0.5s';
        
        // Re-run Prism syntax highlighting
        if (window.Prism) {
            Prism.highlightAll();
        }
        
        // Re-render MathJax
        if (window.MathJax) {
            MathJax.typesetPromise([slideContent]);
        }
        
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
    nextButton.disabled = currentSlide === slideFiles.length - 1;
    
    document.getElementById('current-slide').textContent = currentSlide + 1;
    document.getElementById('total-slides').textContent = slideFiles.length;
}

function nextSlide() {
    if (currentSlide < slideFiles.length - 1) {
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

// Jump to specific slide
function goToSlide(index) {
    if (index >= 0 && index < slideFiles.length) {
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
        const slideNum = parseInt(event.key) - 1;
        if (slideNum < slideFiles.length) {
            goToSlide(slideNum);
        }
    } else if (event.key === 'Home') {
        goToSlide(0);
    } else if (event.key === 'End') {
        goToSlide(slideFiles.length - 1);
    }
});

// Initialize presentation
document.addEventListener('DOMContentLoaded', function() {
    loadSlide(0);
    updateNavigation();
    slidesLoaded = true;
    
    console.log('🎯 Wraparound Math Presentation Ready!');
    console.log('Keyboard shortcuts:');
    console.log('→ or Space: Next slide');
    console.log('←: Previous slide'); 
    console.log('1-9: Jump to slide');
    console.log('Home: First slide');
    console.log('End: Last slide');
});
    </script>
</body>
</html>'''

    # Write bundled file
    os.makedirs('dist', exist_ok=True)
    with open('dist/bundled_presentation.html', 'w', encoding='utf-8') as f:
        f.write(html_content)
    
    print("✅ Bundle created: dist/bundled_presentation.html")
    print(f"📏 File size: {len(html_content) / 1024 / 1024:.1f} MB")
    print("🚀 This file is completely self-contained - no internet required!")

if __name__ == "__main__":
    create_bundle()