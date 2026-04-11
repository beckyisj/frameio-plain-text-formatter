import { chromium } from '/Users/beckyisjwara/Cursor/youtube-producer/node_modules/playwright/index.mjs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const htmlPath = resolve(__dirname, 'promo-tile.html');

const targets = [
  { id: 'small-tile', file: 'small-promo-tile.png', w: 440, h: 280 },
  { id: 'marquee', file: 'marquee.png', w: 1400, h: 560 },
  { id: 'closeup', file: 'screenshot-2-closeup.png', w: 1280, h: 800 },
];

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1500, height: 2000 },
  deviceScaleFactor: 2,
});
await page.goto(`file://${htmlPath}`);
await page.waitForLoadState('networkidle');
await page.evaluate(() => document.fonts.ready);

for (const t of targets) {
  const el = await page.$(`#${t.id}`);
  await el.screenshot({ path: resolve(__dirname, t.file) });
  console.log(`✓ ${t.file}`);
}

await browser.close();
console.log('done');
