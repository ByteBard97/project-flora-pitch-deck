#!/usr/bin/env node
// tools/snap.js
// Minimal, dependency-free CLI: node tools/snap.js --url ... --out ... [--selector ...] [--width 1600 --height 900 --wait 200]

const fs = require("fs");
const path = require("path");

function arg(name, def = undefined) {
  const i = process.argv.indexOf(`--${name}`);
  if (i !== -1 && process.argv[i + 1]) return process.argv[i + 1];
  return def;
}

(async () => {
  const url = arg("url");
  const out = arg("out", "screens/snap.png");
  const selector = arg("selector"); // e.g. ".slidev-page"
  const width = parseInt(arg("width", "1920"), 10);
  const height = parseInt(arg("height", "1080"), 10);
  const dpr = parseFloat(arg("dpr", "1")); // device scale factor
  const waitMs = parseInt(arg("wait", "0"), 10); // extra delay after selector
  const timeoutMs = parseInt(arg("timeout", "15000"), 10); // selector timeout

  if (!url) {
    console.error("ERROR: --url is required");
    process.exit(2);
  }

  // Ensure dirs exist
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.mkdirSync("logs", { recursive: true });

  // lazy import supports newer puppeteer ESM under CJS
  let puppeteer;
  try {
    puppeteer = require("puppeteer");
  } catch {
    puppeteer = await import("puppeteer").then((m) => m.default || m);
  }

  const logFile = path.join("logs", `snap-${Date.now()}.log`);
  const logStream = fs.createWriteStream(logFile, { flags: "a" });

  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  try {
    const page = await browser.newPage();

    // capture console logs
    page.on("console", (msg) => {
      const line = `[${new Date().toISOString()}] ${msg.type().toUpperCase()}: ${msg.text()}\n`;
      logStream.write(line);
    });

    await page.setViewport({ width, height, deviceScaleFactor: dpr });

    await page.goto(url, { waitUntil: "networkidle0", timeout: 30000 });

    if (selector) {
      await page.waitForSelector(selector, { timeout: timeoutMs });
    }
    if (waitMs > 0) {
      await new Promise(r => setTimeout(r, waitMs));
    }

    await page.screenshot({
      path: out,
      fullPage: !selector, // if selector provided, better to crop to element:
      ...(selector
        ? {
            captureBeyondViewport: false,
            clip: await elementClip(page, selector),
          }
        : {}),
    });

    console.log(`✅ Saved screenshot: ${out}`);
    console.log(`📝 Console log: ${logFile}`);
  } catch (err) {
    console.error("ERROR:", err.message || err);
    process.exitCode = 1;
  } finally {
    logStream.end();
    await browser.close();
  }
})();

// Compute clip rect for a selector (so we screenshot the slide root cleanly)
async function elementClip(page, selector) {
  const rect = await page.$eval(selector, (el) => {
    const r = el.getBoundingClientRect();
    return { x: r.x, y: r.y, width: r.width, height: r.height };
  });
  // Ensure positive sizes to avoid Puppeteer errors
  return {
    x: Math.max(0, Math.floor(rect.x)),
    y: Math.max(0, Math.floor(rect.y)),
    width: Math.max(1, Math.ceil(rect.width)),
    height: Math.max(1, Math.ceil(rect.height)),
  };
}
