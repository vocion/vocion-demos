// snap.mjs — screenshot the reel at given virtual-time seconds for visual QA
// usage: node scripts/snap.mjs <outDir> <sec> [sec...]
// snapshot the reel at given seconds (virtual time) for visual QA
import { writeFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { chromium } from 'playwright';
const REEL = pathToFileURL('/private/var/www/vocion-local/vocion-demos/demos/construction-workforce/assets/reel.html').href;
const OUT = process.argv[2];
const TIMES = process.argv.slice(3).map(Number);
const browser = await chromium.launch({ args: ['--disable-threaded-animation','--disable-threaded-scrolling','--disable-checker-imaging','--run-all-compositor-stages-before-draw'] });
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });
page.on('pageerror', e => console.log('PAGEERROR:', e.message));
page.on('console', m => { if (m.type() === 'error') console.log('CONSOLE:', m.text()); });
const cdp = await page.context().newCDPSession(page);
await page.goto(`${REEL}?paused=1`);
await cdp.send('Emulation.setVirtualTimePolicy', { policy: 'pause' });
await page.evaluate(() => window.__start());
let cur = 0;
for (const t of TIMES) {
  const budget = (t - cur) * 1000;
  if (budget > 0) {
    await new Promise(res => { cdp.once('Emulation.virtualTimeBudgetExpired', res);
      cdp.send('Emulation.setVirtualTimePolicy', { policy: 'advance', budget }); });
    cur = t;
  }
  const { data } = await cdp.send('Page.captureScreenshot', { format: 'jpeg', quality: 85 });
  writeFileSync(`${OUT}/t${String(t).replace('.','_')}.jpg`, Buffer.from(data, 'base64'));
  console.log('snapped', t);
}
await browser.close();
