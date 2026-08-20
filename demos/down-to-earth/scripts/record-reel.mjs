#!/usr/bin/env node
/**
 * record-reel.mjs — deterministically render assets/demo-reel.html →
 * assets/dte-hiring-demo.mp4 (1920×1080 @ 30fps, with voiceover + music).
 *
 * How: the reel loads with ?paused=1, the page's virtual clock is paused
 * (CDP Emulation.setVirtualTimePolicy), and the timeline is stepped exactly
 * 1000/30 ms per captured JPEG frame. Every CSS transition, setTimeout, and
 * requestAnimationFrame follows the virtual clock, so the output is a
 * perfect constant-frame-rate render — no dropped/duplicated frames, no
 * dependence on machine load (the old Playwright recordVideo screencast
 * captured ~24fps variable and stuttered when resampled to 30).
 *
 * Audio: scripts/build-reel-audio.mjs synthesizes the narration (macOS
 * `say`, voice Samantha — swap for a downloaded Premium voice for higher
 * quality) and a generated ambient music bed (license-free, pure synth),
 * ducked under the voice. Pass --silent to skip audio (e.g. non-macOS).
 *
 * DURATION_MS must equal the TL total in demo-reel.html (+800ms tail) —
 * keep them in sync when editing scenes.
 *
 * Requires: `playwright` resolvable (npm i --no-save playwright@1.62.1 at
 * the vocion-demos root), a matching chromium, ffmpeg + ffprobe on PATH.
 *
 * Usage:  node scripts/record-reel.mjs [--silent] [--frames-only]
 */
import { execFileSync, spawnSync } from 'node:child_process';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { chromium } from 'playwright';

const DEMO_DIR = dirname(dirname(fileURLToPath(import.meta.url)));
const REEL = pathToFileURL(join(DEMO_DIR, 'assets', 'demo-reel.html')).href;
const OUT_MP4 = join(DEMO_DIR, 'assets', 'dte-hiring-demo.mp4');
const FPS = 30;
const DURATION_MS = 180_000 + 800; // = sum of TL[].t in demo-reel.html + 800ms tail
const FRAMES = Math.round((DURATION_MS / 1000) * FPS);
const silent = process.argv.includes('--silent');

const work = mkdtempSync(join(tmpdir(), 'dte-reel-'));
console.log(`rendering ${FRAMES} frames @ ${FPS}fps → ${work}`);

// These flags force animations onto the main thread so CSS transitions
// follow the stepped virtual clock instead of snapping to their end state
// on the compositor (same set timecut/timesnap use).
const browser = await chromium.launch({
  args: [
    '--disable-threaded-animation',
    '--disable-threaded-scrolling',
    '--disable-checker-imaging',
    '--run-all-compositor-stages-before-draw',
  ],
});
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });
const cdp = await page.context().newCDPSession(page);
await page.goto(`${REEL}?paused=1`);
await cdp.send('Emulation.setVirtualTimePolicy', { policy: 'pause' });
await page.evaluate(() => window.__start());

const t0 = Date.now();
for (let i = 0; i < FRAMES; i++) {
  await new Promise((resolve) => {
    cdp.once('Emulation.virtualTimeBudgetExpired', resolve);
    cdp.send('Emulation.setVirtualTimePolicy', { policy: 'advance', budget: 1000 / FPS });
  });
  const { data } = await cdp.send('Page.captureScreenshot', { format: 'jpeg', quality: 92 });
  writeFileSync(join(work, `frame${String(i).padStart(5, '0')}.jpg`), Buffer.from(data, 'base64'));
  if (i % 900 === 0) {
    console.log(`  frame ${i}/${FRAMES} (${((Date.now() - t0) / 1000).toFixed(0)}s wall)`);
  }
}
await browser.close();
console.log(`captured in ${((Date.now() - t0) / 1000).toFixed(0)}s`);

// Assemble the silent video.
const silentMp4 = join(work, 'silent.mp4');
execFileSync('ffmpeg', [
  '-hide_banner', '-loglevel', 'error', '-y',
  '-framerate', String(FPS), '-i', join(work, 'frame%05d.jpg'),
  '-c:v', 'libx264', '-preset', 'slow', '-crf', '19',
  '-pix_fmt', 'yuv420p', '-movflags', '+faststart',
  silentMp4,
], { stdio: 'inherit' });

// Narration + music (macOS `say` — skip with --silent or when unavailable).
let audioWav = null;
if (!silent) {
  const haveSay = spawnSync('which', ['say']).status === 0;
  if (!haveSay) {
    console.warn('`say` not found — writing silent video (pass --silent to hush this).');
  } else {
    audioWav = join(work, 'reel-audio.wav');
    execFileSync('node', [join(DEMO_DIR, 'scripts', 'build-reel-audio.mjs'), audioWav, String(DURATION_MS / 1000)], { stdio: 'inherit' });
  }
}

if (audioWav) {
  execFileSync('ffmpeg', [
    '-hide_banner', '-loglevel', 'error', '-y',
    '-i', silentMp4, '-i', audioWav,
    '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k', '-shortest',
    '-movflags', '+faststart',
    OUT_MP4,
  ], { stdio: 'inherit' });
} else {
  execFileSync('cp', [silentMp4, OUT_MP4]);
}
rmSync(work, { recursive: true, force: true });
console.log(`wrote ${OUT_MP4}${audioWav ? ' (with narration + music)' : ' (silent)'}`);
