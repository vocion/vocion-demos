#!/usr/bin/env node
/**
 * record-reel.mjs — headlessly record assets/demo-reel.html → assets/dte-hiring-demo.mp4.
 *
 * The reel is a self-contained auto-playing HTML timeline (~180s at 1920×1080);
 * Playwright records it to webm, ffmpeg re-encodes to a faststart h264 mp4.
 *
 * Requires: `playwright` resolvable (npx -y playwright@latest works), a matching
 * chromium (npx playwright install chromium --only-shell), and ffmpeg on PATH.
 *
 * Usage:  node scripts/record-reel.mjs [speedFactor]
 *   speedFactor > 1 fast-forwards the timeline (useful for smoke-testing the
 *   recording pipeline; the shipped video should be recorded at 1).
 */
import { execFileSync } from 'node:child_process';
import { mkdtempSync, renameSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { chromium } from 'playwright';

const DEMO_DIR = dirname(dirname(fileURLToPath(import.meta.url)));
const REEL = pathToFileURL(join(DEMO_DIR, 'assets', 'demo-reel.html')).href;
const OUT_MP4 = join(DEMO_DIR, 'assets', 'dte-hiring-demo.mp4');
const speed = process.argv[2] ?? '1';
const work = mkdtempSync(join(tmpdir(), 'dte-reel-'));

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1920, height: 1080 },
  deviceScaleFactor: 1,
  recordVideo: { dir: work, size: { width: 1920, height: 1080 } },
});
const page = await ctx.newPage();
await page.goto(`${REEL}?speed=${speed}`);
await page.waitForFunction(() => window.__done === true, null, { timeout: 240_000 });
await page.waitForTimeout(500);
const video = page.video();
await ctx.close();
const webm = await video.path();
await browser.close();

const raw = join(work, 'reel-raw.webm');
renameSync(webm, raw);
execFileSync('ffmpeg', [
  '-hide_banner', '-loglevel', 'error', '-y',
  '-i', raw,
  '-c:v', 'libx264', '-preset', 'slow', '-crf', '20',
  '-pix_fmt', 'yuv420p', '-r', '30', '-movflags', '+faststart',
  OUT_MP4,
], { stdio: 'inherit' });
rmSync(work, { recursive: true, force: true });
console.log(`wrote ${OUT_MP4}`);
