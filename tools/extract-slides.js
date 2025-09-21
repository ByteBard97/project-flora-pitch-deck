#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Read the presentation.js file
const presentationPath = './docs/presentation_bundle/js/presentation.js';
const outputDir = './extracted-slides';

function extractSlides() {
  try {
    // Read the presentation.js file
    const content = fs.readFileSync(presentationPath, 'utf8');

    // Extract the slidesData array using regex
    const slidesDataMatch = content.match(/const slidesData = (\[.*?\]);/s);

    if (!slidesDataMatch) {
      console.error('Could not find slidesData array in presentation.js');
      process.exit(1);
    }

    // Parse the JSON data
    const slidesDataString = slidesDataMatch[1];
    const slidesData = JSON.parse(slidesDataString);

    // Create output directory
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    console.log(`Found ${slidesData.length} slides. Extracting...`);

    // Extract each slide
    slidesData.forEach((slide, index) => {
      const slideNumber = String(index + 1).padStart(2, '0');
      const title = slide.title || `Slide ${slideNumber}`;
      const safeTitle = title.replace(/[^a-zA-Z0-9\s-]/g, '').replace(/\s+/g, '-').toLowerCase();
      const filename = `${slideNumber}-${safeTitle}.html`;

      // Create complete HTML document
      const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <link rel="stylesheet" href="../presentation_bundle/css/styles.css">
    <style>
        body {
            margin: 0;
            padding: 20px;
            background: var(--bg-1);
            color: var(--text);
            font-family: var(--font-body);
        }

        .slide {
            max-width: 1200px;
            margin: 0 auto;
        }
    </style>
</head>
<body>
    ${slide.content}

    <!-- Include any interactive scripts -->
    <script src="../presentation_bundle/js/interactive-demo.js"></script>
    <script>
        // Initialize any slide-specific functionality
        if (typeof initializeSlide === 'function') {
            initializeSlide();
        }
    </script>
</body>
</html>`;

      const filepath = path.join(outputDir, filename);
      fs.writeFileSync(filepath, htmlContent, 'utf8');

      console.log(`✓ Extracted: ${filename} - "${title}"`);
    });

    // Create an index file listing all slides
    const indexContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Flora Presentation - Extracted Slides</title>
    <link rel="stylesheet" href="../docs/presentation_bundle/css/styles.css">
    <style>
        body {
            max-width: 800px;
            margin: 0 auto;
            padding: 40px 20px;
            background: var(--bg-1);
            color: var(--text);
            font-family: var(--font-body);
        }

        .slide-link {
            display: block;
            padding: 15px 20px;
            margin: 10px 0;
            background: var(--surface-2);
            border: 1px solid var(--line-1);
            border-radius: 8px;
            text-decoration: none;
            color: var(--text);
            transition: all 0.2s ease;
        }

        .slide-link:hover {
            background: var(--surface-1);
            border-color: var(--accent);
            transform: translateY(-2px);
        }

        .slide-number {
            color: var(--accent);
            font-weight: bold;
            margin-right: 10px;
        }
    </style>
</head>
<body>
    <h1>Flora Presentation - Extracted Slides</h1>
    <p>Individual HTML files for each slide in the presentation.</p>

    ${slidesData.map((slide, index) => {
      const slideNumber = String(index + 1).padStart(2, '0');
      const title = slide.title || `Slide ${slideNumber}`;
      const safeTitle = title.replace(/[^a-zA-Z0-9\s-]/g, '').replace(/\s+/g, '-').toLowerCase();
      const filename = `${slideNumber}-${safeTitle}.html`;

      return `<a href="${filename}" class="slide-link">
        <span class="slide-number">${slideNumber}.</span>
        ${title}
      </a>`;
    }).join('\n    ')}

    <p style="margin-top: 40px; color: var(--muted); font-size: 0.9rem;">
        Generated from: ${presentationPath}
    </p>
</body>
</html>`;

    fs.writeFileSync(path.join(outputDir, 'index.html'), indexContent, 'utf8');

    console.log(`\n✓ Created index.html with links to all ${slidesData.length} slides`);
    console.log(`✓ All files saved to: ${outputDir}/`);
    console.log(`\nTo view the slides, open: ${outputDir}/index.html`);

  } catch (error) {
    console.error('Error extracting slides:', error.message);
    process.exit(1);
  }
}

// Run the extraction
extractSlides();