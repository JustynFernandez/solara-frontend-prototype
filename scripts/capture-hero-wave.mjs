import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { chromium } from "playwright";

const baseUrl = process.env.HERO_WAVE_CAPTURE_URL || "http://127.0.0.1:5173";
const outputRoot = path.resolve(process.cwd(), "output", "playwright", "hero-wave");
const validationDir = path.join(outputRoot, "validation");
const assetDir = path.join(outputRoot, "assets");
const comparisonDir = path.join(outputRoot, "comparison");
const debugQuery = "?__waveDebug=1&__forceWebGL=1";
const captureQuery = "?__waveCapture=1&__forceWebGL=1";
const compareMode = process.env.HERO_WAVE_CAPTURE_COMPARE === "1";

const validationTargets = [
  { width: 1440, height: 1100, file: "hero-1440x1100.png" },
  { width: 1280, height: 960, file: "hero-1280x960.png" },
  { width: 768, height: 1024, file: "hero-768x1024.png" },
  { width: 390, height: 844, file: "hero-390x844.png" },
];

const assetTargets = [
  { width: 1392, height: 975, file: "hero-wave-desktop-1392x975.png", file2x: "hero-wave-desktop-2784x1950.png" },
  { width: 1248, height: 975, file: "hero-wave-tablet-1248x975.png", file2x: "hero-wave-tablet-2496x1950.png" },
  { width: 624, height: 975, file: "hero-wave-mobile-624x975.png", file2x: "hero-wave-mobile-1248x1950.png" },
];

const ensureDirectories = async () => {
  await fs.mkdir(validationDir, { recursive: true });
  await fs.mkdir(assetDir, { recursive: true });
  if (compareMode) {
    await fs.mkdir(comparisonDir, { recursive: true });
  }
};

const waitForWave = async (page) => {
  await page.waitForFunction(
    () => {
      const contents = document.querySelector(".hero-wave-animation__contents");
      const canvas = document.querySelector(".hero-wave-animation__canvas");
      if (!contents || !canvas) return false;
      return contents.classList.contains("hero-wave-animation--drawn") || canvas.clientWidth > 0;
    },
    { timeout: 15000 }
  );
  await page.waitForTimeout(1800);
};

const captureValidation = async (browser) => {
  for (const target of validationTargets) {
    const context = await browser.newContext({
      viewport: { width: target.width, height: target.height },
      deviceScaleFactor: 1,
      colorScheme: "light",
    });
    const page = await context.newPage();
    await page.goto(`${baseUrl}/${debugQuery}`, { waitUntil: "networkidle" });
    await waitForWave(page);
    await page.screenshot({
      path: path.join(validationDir, target.file),
      timeout: 0,
    });
    await context.close();
  }
};

const captureAssets = async (browser) => {
  for (const target of assetTargets) {
    for (const variant of [
      { deviceScaleFactor: 1, file: target.file },
      { deviceScaleFactor: 2, file: target.file2x },
    ]) {
      const context = await browser.newContext({
        viewport: { width: target.width, height: Math.min(target.height, 975) },
        deviceScaleFactor: variant.deviceScaleFactor,
        colorScheme: "light",
      });
      const page = await context.newPage();
      await page.goto(`${baseUrl}/${captureQuery}`, { waitUntil: "networkidle" });
      await waitForWave(page);
      const wave = page.locator(".hero-wave-animation__contents").first();
      await wave.screenshot({
        path: path.join(assetDir, variant.file),
        timeout: 0,
      });
      await context.close();
    }
  }
};

const captureComparison = async (browser) => {
  const width = 1440;
  const height = 1100;

  const localContext = await browser.newContext({
    viewport: { width, height },
    deviceScaleFactor: 1,
    colorScheme: "light",
  });
  const localPage = await localContext.newPage();
  await localPage.goto(`${baseUrl}/${debugQuery}`, { waitUntil: "networkidle" });
  await waitForWave(localPage);
  await localPage.locator(".home-hero-section").first().screenshot({
    path: path.join(comparisonDir, "local-hero-1440x1100.png"),
    timeout: 0,
  });
  await localPage.locator(".hero-wave-animation__contents").first().screenshot({
    path: path.join(comparisonDir, "local-wave-1440x1100.png"),
    timeout: 0,
  });
  await localContext.close();

  const stripeContext = await browser.newContext({
    viewport: { width, height },
    deviceScaleFactor: 1,
    colorScheme: "light",
  });
  const stripePage = await stripeContext.newPage();
  await stripePage.goto("https://stripe.com/", { waitUntil: "networkidle" });
  await stripePage.waitForTimeout(2500);

  const dismissSelectors = [
    'button:has-text("Accept all")',
    'button:has-text("Accept")',
    '[aria-label="Close"]',
  ];
  for (const selector of dismissSelectors) {
    const locator = stripePage.locator(selector).first();
    if (await locator.count()) {
      try {
        await locator.click({ timeout: 1000 });
      } catch {
        // Ignore transient consent UI.
      }
    }
  }

  const stripeHero = stripePage.locator("main section").first();
  await stripeHero.screenshot({
    path: path.join(comparisonDir, "stripe-hero-1440x1100.png"),
    timeout: 0,
  });

  const stripeWave = stripePage.locator(".hero-wave-animation__contents, .hero-section__background").first();
  if (await stripeWave.count()) {
    await stripeWave.screenshot({
      path: path.join(comparisonDir, "stripe-wave-1440x1100.png"),
      timeout: 0,
    });
  }

  await stripeContext.close();

  await fs.writeFile(
    path.join(comparisonDir, "notes.json"),
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        metrics: [
          "visible shoulder width",
          "warm core lane prominence",
          "fold edge location",
          "left-copy cleanliness",
          "lower-right exit angle",
        ],
      },
      null,
      2
    )
  );
};

const main = async () => {
  await ensureDirectories();

  const browser = await chromium.launch({
    headless: true,
    args: ["--ignore-gpu-blocklist", "--enable-webgl", "--use-angle=swiftshader"],
  });

  try {
    await captureValidation(browser);
    await captureAssets(browser);
    if (compareMode) {
      await captureComparison(browser);
    }
  } finally {
    await browser.close();
  }
};

main().catch((error) => {
  console.error("Hero wave capture failed.");
  console.error(error);
  process.exitCode = 1;
});
