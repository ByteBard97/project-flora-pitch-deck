#!/usr/bin/env node
// tools/snap-and-click.js
// Extended version that can click elements before taking screenshot

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
  const clickSelector = arg("click"); // Element to click before screenshot
  const selector = arg("selector"); // Element to screenshot
  const width = parseInt(arg("width", "1920"), 10);
  const height = parseInt(arg("height", "1080"), 10);
  const dpr = parseFloat(arg("dpr", "1"));
  const waitMs = parseInt(arg("wait", "500"), 10);
  const timeoutMs = parseInt(arg("timeout", "15000"), 10);

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

    // Click element if specified
    if (clickSelector) {
      console.log(`Clicking: ${clickSelector}`);
      await page.waitForSelector(clickSelector, { timeout: timeoutMs });
      await page.click(clickSelector);
      // Wait for navigation/animation after click
      await new Promise(r => setTimeout(r, 1000));
    }

    if (selector) {
      await page.waitForSelector(selector, { timeout: timeoutMs });
    }
    if (waitMs > 0) {
      await new Promise(r => setTimeout(r, waitMs));
    }

    await page.screenshot({
      path: out,
      fullPage: !selector,
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

// Compute clip rect for a selector
async function elementClip(page, selector) {
  const rect = await page.$eval(selector, (el) => {
    const r = el.getBoundingClientRect();
    return { x: r.x, y: r.y, width: r.width, height: r.height };
  });
  return {
    x: Math.max(0, Math.floor(rect.x)),
    y: Math.max(0, Math.floor(rect.y)),
    width: Math.max(1, Math.ceil(rect.width)),
    height: Math.max(1, Math.ceil(rect.height)),
  };
}