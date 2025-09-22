#!/usr/bin/env node

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function takeMultipleScreenshots() {
  const args = process.argv.slice(2);

  // Parse command line arguments
  let baseUrl = 'http://localhost:3032';
  let outputDir = '/home/geoff/projects/project-flora-pitch-deck/screenshots';
  let width = 1920;
  let height = 1080;
  let wait = 2000;
  let slides = [];
  let prefix = 'slide';

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--base-url') baseUrl = args[i + 1];
    else if (args[i] === '--out-dir') outputDir = args[i + 1];
    else if (args[i] === '--width') width = parseInt(args[i + 1]);
    else if (args[i] === '--height') height = parseInt(args[i + 1]);
    else if (args[i] === '--wait') wait = parseInt(args[i + 1]);
    else if (args[i] === '--prefix') prefix = args[i + 1];
    else if (args[i] === '--1080p' || args[i] === '--hd') {
      width = 1920;
      height = 1080;
    }
    else if (args[i] === '--4k' || args[i] === '--uhd') {
      width = 3840;
      height = 2160;
    }
    else if (args[i] === '--slides') {
      // Parse slide range like "5-8" or comma-separated "5,6,7,8"
      const slideArg = args[i + 1];
      if (slideArg.includes('-')) {
        const [start, end] = slideArg.split('-').map(Number);
        for (let s = start; s <= end; s++) slides.push(s);
      } else {
        slides = slideArg.split(',').map(Number);
      }
    }
  }

  if (slides.length === 0) {
    console.log('Usage: node snap-multiple.js --slides "5-8" [options]');
    console.log('Options:');
    console.log('  --base-url URL     Base URL (default: http://localhost:3032)');
    console.log('  --out-dir DIR      Output directory (default: /home/geoff/projects/project-flora-pitch-deck/screenshots)');
    console.log('  --1080p, --hd      Set resolution to 1920x1080 (default)');
    console.log('  --4k, --uhd        Set resolution to 3840x2160');
    console.log('  --width WIDTH      Custom width (overrides presets)');
    console.log('  --height HEIGHT    Custom height (overrides presets)');
    console.log('  --wait MS          Wait time in ms (default: 2000)');
    console.log('  --prefix PREFIX    Filename prefix (default: slide)');
    console.log('  --slides RANGE     Slides to capture: "5-8" or "5,6,7,8"');
    process.exit(1);
  }

  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });

  const page = await browser.newPage();
  await page.setViewport({ width, height });

  console.log(`📸 Taking screenshots of slides: ${slides.join(', ')}`);
  console.log(`🔗 Base URL: ${baseUrl}`);
  console.log(`📁 Output dir: ${outputDir}`);
  console.log(`📐 Resolution: ${width}x${height}`);

  for (const slide of slides) {
    try {
      const url = `${baseUrl}/${slide}`;
      const resolutionSuffix = width === 3840 ? '-4k' : width === 1920 ? '' : `-${width}x${height}`;
      const outputPath = path.join(outputDir, `${prefix}${slide}${resolutionSuffix}.png`);

      console.log(`📷 Capturing slide ${slide}...`);
      await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
      await new Promise(resolve => setTimeout(resolve, wait));

      await page.screenshot({
        path: outputPath,
        fullPage: false
      });

      console.log(`✅ Saved: ${outputPath}`);
    } catch (error) {
      console.error(`❌ Error capturing slide ${slide}:`, error.message);
    }
  }

  await browser.close();
  console.log(`🎉 Completed screenshots for ${slides.length} slides`);
}

takeMultipleScreenshots().catch(console.error);