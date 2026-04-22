const path = require("path");
const fs = require("fs");
const { chromium } = require("../../node_modules/playwright");

const baseUrl = process.env.SOLARA_BASE_URL || "http://127.0.0.1:4181";
const outDir = path.join(__dirname, "output", "screens");
const logDir = path.join(__dirname, "output", "logs");

fs.mkdirSync(outDir, { recursive: true });
fs.mkdirSync(logDir, { recursive: true });

const captureLog = [];

async function capture(page, name, route, options = {}) {
  const {
    viewport = { width: 1600, height: 1000 },
    scrollY = 0,
    wait = 1000,
    selector,
    beforeShot,
  } = options;
  await page.setViewportSize(viewport);
  await page.goto(`${baseUrl}${route}`, { waitUntil: "networkidle" });
  if (scrollY > 0) {
    await page.evaluate((y) => window.scrollTo(0, y), scrollY);
    await page.waitForTimeout(400);
  }
  if (wait > 0) await page.waitForTimeout(wait);
  if (beforeShot) {
    await beforeShot(page);
  }
  const file = path.join(outDir, `${name}.png`);
  if (selector) {
    const target = page.locator(selector).first();
    await target.waitFor({ state: "visible" });
    await target.screenshot({ path: file });
  } else {
    await page.screenshot({ path: file, fullPage: false });
  }
  captureLog.push({ name, route, file });
}

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1600, height: 1000 },
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();
  const pageErrors = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") {
      pageErrors.push({ type: "console", text: msg.text() });
    }
  });
  page.on("pageerror", (err) => {
    pageErrors.push({ type: "pageerror", text: String(err) });
  });
  await context.addInitScript(() => {
    localStorage.setItem("solara-theme", "light");
  });

  await capture(page, "home-live-board", "/", { viewport: { width: 1600, height: 900 }, scrollY: 820 });
  await capture(page, "connect-hub", "/connect", { viewport: { width: 1600, height: 860 } });
  await capture(page, "navigator", "/solar-navigator", {
    viewport: { width: 1600, height: 760 },
    beforeShot: async (activePage) => {
      await activePage.getByRole("button", { name: "Start Solar Navigator" }).click();
      await activePage.waitForTimeout(700);
    },
    selector: ".fixed .max-w-6xl .rounded-3xl.border",
  });
  await capture(page, "projects", "/projects", { viewport: { width: 1600, height: 760 } });
  await capture(page, "learn-index", "/learn", { viewport: { width: 1600, height: 760 } });

  await browser.close();
  fs.writeFileSync(
    path.join(logDir, "capture-log.json"),
    JSON.stringify({ baseUrl, captures: captureLog, pageErrors }, null, 2)
  );
  console.log(JSON.stringify({ ok: true, captures: captureLog.length, pageErrors }, null, 2));
})().catch((error) => {
  fs.writeFileSync(
    path.join(logDir, "capture-error.txt"),
    `${error?.stack || error}`
  );
  console.error(error);
  process.exit(1);
});
