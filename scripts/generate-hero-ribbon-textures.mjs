import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { chromium } from "playwright";

const size = 2048;
const outputDir = path.resolve(process.cwd(), "public");

const ensureOutputDir = async () => {
  await fs.mkdir(outputDir, { recursive: true });
};

const buildRibbonSvg = (theme) => {
  const light = theme === "light";

  const shoulder = light
    ? ["#dbe8ff", "#9cb3ff", "#7d88ff"]
    : ["#1f335f", "#3854a4", "#5a63c8"];
  const magenta = light
    ? ["#f5a5ef", "#ef72dc", "#d56ad8"]
    : ["#5a2d74", "#75419a", "#9158c4"];
  const coral = light
    ? ["#ff7b76", "#ff8f68", "#ff705c"]
    : ["#804254", "#a4545e", "#c46d61"];
  const orange = light
    ? ["#ff9a1f", "#ffb516", "#ff8c26"]
    : ["#8f5412", "#b77519", "#cb8330"];
  const gold = light
    ? ["#ffe7b4", "#ffd478", "#fff3da"]
    : ["#8a714a", "#c19a4b", "#f0d2a1"];
  const rim = light
    ? ["#6859ff", "#5e62ff", "#7c87ff"]
    : ["#394fbc", "#4a61d0", "#6880eb"];

  return `<!doctype html>
  <html lang="en">
    <head>
      <meta charset="utf-8" />
      <style>
        html, body {
          margin: 0;
          width: ${size}px;
          height: ${size}px;
          overflow: hidden;
          background: transparent;
        }

        body {
          display: grid;
          place-items: center;
        }

        svg {
          display: block;
          width: ${size}px;
          height: ${size}px;
        }
      </style>
    </head>
    <body>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" fill="none">
        <defs>
          <linearGradient id="gShoulder" x1="360" y1="0" x2="1000" y2="2048" gradientUnits="userSpaceOnUse">
            <stop offset="0" stop-color="${shoulder[0]}"/>
            <stop offset="0.48" stop-color="${shoulder[1]}"/>
            <stop offset="1" stop-color="${shoulder[2]}"/>
          </linearGradient>
          <linearGradient id="gMagenta" x1="760" y1="-80" x2="1290" y2="2120" gradientUnits="userSpaceOnUse">
            <stop offset="0" stop-color="${magenta[0]}"/>
            <stop offset="0.5" stop-color="${magenta[1]}"/>
            <stop offset="1" stop-color="${magenta[2]}"/>
          </linearGradient>
          <linearGradient id="gCoral" x1="920" y1="-60" x2="1430" y2="2120" gradientUnits="userSpaceOnUse">
            <stop offset="0" stop-color="${coral[0]}"/>
            <stop offset="0.55" stop-color="${coral[1]}"/>
            <stop offset="1" stop-color="${coral[2]}"/>
          </linearGradient>
          <linearGradient id="gOrange" x1="1140" y1="-80" x2="1510" y2="2150" gradientUnits="userSpaceOnUse">
            <stop offset="0" stop-color="${orange[0]}"/>
            <stop offset="0.45" stop-color="${orange[1]}"/>
            <stop offset="1" stop-color="${orange[2]}"/>
          </linearGradient>
          <linearGradient id="gGold" x1="1380" y1="-100" x2="1600" y2="2140" gradientUnits="userSpaceOnUse">
            <stop offset="0" stop-color="${gold[0]}"/>
            <stop offset="0.52" stop-color="${gold[1]}"/>
            <stop offset="1" stop-color="${gold[2]}"/>
          </linearGradient>
          <linearGradient id="gRim" x1="1620" y1="-80" x2="1840" y2="2160" gradientUnits="userSpaceOnUse">
            <stop offset="0" stop-color="${rim[0]}"/>
            <stop offset="0.55" stop-color="${rim[1]}"/>
            <stop offset="1" stop-color="${rim[2]}"/>
          </linearGradient>
          <linearGradient id="gBase" x1="300" y1="160" x2="1730" y2="1880" gradientUnits="userSpaceOnUse">
            <stop offset="0" stop-color="${shoulder[0]}" stop-opacity="${light ? "0.72" : "0.36"}"/>
            <stop offset="0.34" stop-color="${magenta[0]}" stop-opacity="${light ? "0.68" : "0.38"}"/>
            <stop offset="0.6" stop-color="${orange[0]}" stop-opacity="${light ? "0.78" : "0.42"}"/>
            <stop offset="0.82" stop-color="${gold[1]}" stop-opacity="${light ? "0.92" : "0.54"}"/>
            <stop offset="1" stop-color="${rim[1]}" stop-opacity="${light ? "0.88" : "0.46"}"/>
          </linearGradient>
          <filter id="blur-soft" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="${light ? "10" : "9"}"/>
          </filter>
          <filter id="blur-core" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="${light ? "6" : "5"}"/>
          </filter>
          <filter id="blur-rim" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="${light ? "3.5" : "3"}"/>
          </filter>
        </defs>

        <path
          d="M760 -220C930 120 1070 640 1220 2230L1765 2230C1655 1290 1575 700 1435 -210Z"
          fill="url(#gBase)"
          opacity="${light ? "0.62" : "0.5"}"
          filter="url(#blur-soft)"
        />

        <g fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path
            d="M770 -180C920 130 1045 710 1135 2270"
            stroke="url(#gShoulder)"
            stroke-width="760"
            stroke-opacity="${light ? "0.8" : "0.52"}"
            filter="url(#blur-soft)"
          />
          <path
            d="M1030 -190C1165 150 1260 760 1368 2285"
            stroke="url(#gMagenta)"
            stroke-width="620"
            stroke-opacity="${light ? "0.92" : "0.72"}"
            filter="url(#blur-soft)"
          />
          <path
            d="M1210 -190C1320 120 1405 740 1495 2290"
            stroke="url(#gCoral)"
            stroke-width="470"
            stroke-opacity="${light ? "0.9" : "0.72"}"
            filter="url(#blur-core)"
          />
          <path
            d="M1360 -200C1465 120 1540 740 1612 2295"
            stroke="url(#gOrange)"
            stroke-width="360"
            stroke-opacity="${light ? "1" : "0.84"}"
            filter="url(#blur-core)"
          />
          <path
            d="M1520 -210C1575 170 1615 760 1658 2290"
            stroke="url(#gGold)"
            stroke-width="136"
            stroke-opacity="${light ? "1" : "0.92"}"
            filter="url(#blur-rim)"
          />
          <path
            d="M1705 -210C1740 180 1770 770 1805 2290"
            stroke="url(#gRim)"
            stroke-width="224"
            stroke-opacity="${light ? "0.98" : "0.82"}"
            filter="url(#blur-rim)"
          />
          <path
            d="M1570 -200C1608 150 1638 760 1680 2300"
            stroke="${light ? "#fff8ed" : "#f2d7ad"}"
            stroke-width="44"
            stroke-opacity="${light ? "0.86" : "0.58"}"
          />
        </g>
      </svg>
    </body>
  </html>`;
};

const buildStageArtSvg = (theme) => {
  const light = theme === "light";

  const shoulder = light
    ? ["#cfdfff", "#a6b9ff", "#86a3ff"]
    : ["#223766", "#3553a8", "#5771d0"];
  const magenta = light
    ? ["#f5b3ff", "#ef7def", "#e15de7"]
    : ["#5d2a78", "#7a43a4", "#9a64ce"];
  const coral = light
    ? ["#ff897d", "#ff745f", "#ff8b64"]
    : ["#7e4056", "#a75763", "#cb7a66"];
  const orange = light
    ? ["#ff9d1d", "#ffbf23", "#ff8b1b"]
    : ["#8f5513", "#bc791c", "#d08a33"];
  const gold = light
    ? ["#fff5dc", "#ffe8ab", "#fff9ef"]
    : ["#8f7650", "#d1aa60", "#f1ddb8"];
  const rim = light
    ? ["#675cff", "#5a66ff", "#8ba0ff"]
    : ["#384ebe", "#5569dc", "#7d8ff3"];

  return `<!doctype html>
  <html lang="en">
    <head>
      <meta charset="utf-8" />
      <style>
        html, body {
          margin: 0;
          width: ${size}px;
          height: ${size}px;
          overflow: hidden;
          background: transparent;
        }
        body { display: grid; place-items: center; }
        svg { width: ${size}px; height: ${size}px; display: block; }
      </style>
    </head>
    <body>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" fill="none">
        <defs>
          <linearGradient id="stageShoulder" x1="1100" y1="-160" x2="1870" y2="1760" gradientUnits="userSpaceOnUse">
            <stop offset="0" stop-color="${shoulder[0]}"/>
            <stop offset="0.5" stop-color="${shoulder[1]}"/>
            <stop offset="1" stop-color="${shoulder[2]}"/>
          </linearGradient>
          <linearGradient id="stageMagenta" x1="1380" y1="-160" x2="1870" y2="1770" gradientUnits="userSpaceOnUse">
            <stop offset="0" stop-color="${magenta[0]}"/>
            <stop offset="0.52" stop-color="${magenta[1]}"/>
            <stop offset="1" stop-color="${magenta[2]}"/>
          </linearGradient>
          <linearGradient id="stageCoral" x1="1540" y1="-120" x2="1860" y2="1750" gradientUnits="userSpaceOnUse">
            <stop offset="0" stop-color="${coral[0]}"/>
            <stop offset="0.6" stop-color="${coral[1]}"/>
            <stop offset="1" stop-color="${coral[2]}"/>
          </linearGradient>
          <linearGradient id="stageOrange" x1="1640" y1="-120" x2="1810" y2="1750" gradientUnits="userSpaceOnUse">
            <stop offset="0" stop-color="${orange[0]}"/>
            <stop offset="0.55" stop-color="${orange[1]}"/>
            <stop offset="1" stop-color="${orange[2]}"/>
          </linearGradient>
          <linearGradient id="stageGold" x1="1760" y1="-100" x2="1825" y2="1740" gradientUnits="userSpaceOnUse">
            <stop offset="0" stop-color="${gold[0]}"/>
            <stop offset="0.48" stop-color="${gold[1]}"/>
            <stop offset="1" stop-color="${gold[2]}"/>
          </linearGradient>
          <linearGradient id="stageRim" x1="1880" y1="-90" x2="2010" y2="1780" gradientUnits="userSpaceOnUse">
            <stop offset="0" stop-color="${rim[0]}"/>
            <stop offset="0.58" stop-color="${rim[1]}"/>
            <stop offset="1" stop-color="${rim[2]}"/>
          </linearGradient>
          <filter id="stageSoft" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="${light ? "10" : "9"}"/>
          </filter>
          <filter id="stageHard" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="${light ? "4.5" : "4"}"/>
          </filter>
        </defs>

        <g fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path
            d="M980 -280C1290 40 1510 420 2070 1650"
            stroke="url(#stageShoulder)"
            stroke-width="840"
            stroke-opacity="${light ? "0.88" : "0.58"}"
            filter="url(#stageSoft)"
          />
          <path
            d="M1320 -300C1540 40 1690 420 2055 1660"
            stroke="url(#stageMagenta)"
            stroke-width="620"
            stroke-opacity="${light ? "0.92" : "0.7"}"
            filter="url(#stageSoft)"
          />
          <path
            d="M1535 -300C1680 70 1780 430 1985 1650"
            stroke="url(#stageCoral)"
            stroke-width="470"
            stroke-opacity="${light ? "0.9" : "0.72"}"
            filter="url(#stageSoft)"
          />
          <path
            d="M1645 -310C1750 70 1810 430 1910 1650"
            stroke="url(#stageOrange)"
            stroke-width="322"
            stroke-opacity="${light ? "0.98" : "0.82"}"
            filter="url(#stageHard)"
          />
          <path
            d="M1770 -320C1810 110 1825 450 1835 1660"
            stroke="url(#stageGold)"
            stroke-width="110"
            stroke-opacity="${light ? "0.96" : "0.9"}"
            filter="url(#stageHard)"
          />
          <path
            d="M1898 -290C1955 120 1995 450 2020 1670"
            stroke="url(#stageRim)"
            stroke-width="210"
            stroke-opacity="${light ? "0.96" : "0.78"}"
            filter="url(#stageHard)"
          />
        </g>
      </svg>
    </body>
  </html>`;
};

const renderTexture = async (browser, theme) => {
  const page = await browser.newPage({
    viewport: { width: size, height: size },
    deviceScaleFactor: 1,
  });

  await page.setContent(buildRibbonSvg(theme), { waitUntil: "load" });
  await page.screenshot({
    path: path.join(outputDir, `hero-wave-ribbon-${theme}.png`),
    omitBackground: true,
  });
  await page.close();
};

const renderStageArt = async (browser, theme) => {
  const page = await browser.newPage({
    viewport: { width: size, height: size },
    deviceScaleFactor: 1,
  });

  await page.setContent(buildStageArtSvg(theme), { waitUntil: "load" });
  await page.screenshot({
    path: path.join(outputDir, `hero-wave-art-${theme}.png`),
    omitBackground: true,
  });
  await page.close();
};

const main = async () => {
  await ensureOutputDir();

  const browser = await chromium.launch({
    headless: true,
    args: ["--disable-gpu", "--force-color-profile=srgb"],
  });

  try {
    await renderTexture(browser, "light");
    await renderTexture(browser, "dark");
    await renderStageArt(browser, "light");
    await renderStageArt(browser, "dark");
  } finally {
    await browser.close();
  }
};

main().catch((error) => {
  console.error("Failed to generate hero ribbon textures.");
  console.error(error);
  process.exitCode = 1;
});
