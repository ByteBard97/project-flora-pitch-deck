#!/usr/bin/env node
// tools/snap-full.js
// Takes a full-page screenshot

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
  const width = parseInt(arg("width", "1920"), 10);
  const height = parseInt(arg("height", "1080"), 10);
  const waitMs = parseInt(arg("wait", "500"), 10);

  if (!url) {
    console.error("ERROR: --url is required");
    process.exit(2);
  }

  fs.mkdirSync(path.dirname(out), { recursive: true });

  let puppeteer;
  try {
    puppeteer = require("puppeteer");
  } catch {
    puppeteer = await import("puppeteer").then((m) => m.default || m);
  }

  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width, height });
    await page.goto(url, { waitUntil: "networkidle0", timeout: 30000 });

    if (waitMs > 0) {
      await new Promise(r => setTimeout(r, waitMs));
    }

    await page.screenshot({
      path: out,
      fullPage: true // Capture entire page
    });

    console.log(`✅ Saved full-page screenshot: ${out}`);
  } catch (err) {
    console.error("ERROR:", err.message || err);
    process.exitCode = 1;
  } finally {
    await browser.close();
  }
})();