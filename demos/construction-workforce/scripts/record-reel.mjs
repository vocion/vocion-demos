#!/usr/bin/env node
/**
 * record-reel.mjs — deterministically render assets/reel.html →
 * assets/metacto-construction-workforce.mp4 (3840×2160 @ 30fps, with
 * voiceover + music). Adapted from the retail-hiring demo's recorder.
 *
 * How: the reel loads with ?paused=1, the page's virtual clock is paused
 * (CDP Emulation.setVirtualTimePolicy), and the timeline is stepped exactly
 * 1000/30 ms per captured JPEG frame — constant-frame-rate output regardless
 * of machine load. 4K comes from deviceScaleFactor 2 over a 1920×1080 stage.
 *
 * The video is authored to loop seamlessly (last frame == first frame): the
 * final scene is a static clone of the opening hub board.
 *
 * DURATION_MS must equal the TL total in reel.html (+800ms tail).
 *
 * Requires: playwright resolvable from the vocion-demos root, ffmpeg +
 * ffprobe on PATH. Audio narration/music via scripts/build-reel-audio.mjs
 * (ElevenLabs when ELEVENLABS_API_KEY is set, macOS `say` fallback).
 *
 * Usage:  node scripts/record-reel.mjs [--silent] [--hd]
 *   --silent  skip the audio stage (video only)
 *   --hd      render 1920×1080 instead of 4K (faster iteration)
 */
import { execFileSync, spawnSync } from 'node:child_process';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { chromium } from 'playwright';

const DEMO_DIR = dirname(dirname(fileURLToPath(import.meta.url)));
const REEL = pathToFileURL(join(DEMO_DIR, 'assets', 'reel.html')).href;
const OUT_MP4 = join(DEMO_DIR, 'assets', 'metacto-construction-workforce.mp4');
const FPS = 30;
const DURATION_MS = 304_000 + 800; // = sum of TL[].t in reel.html + 800ms tail
const FRAMES = Math.round((DURATION_MS / 1000) * FPS);
const silent = process.argv.includes('--silent');
const hd = process.argv.includes('--hd');
// 4K comes from clip.scale on the CDP screenshot (deviceScaleFactor is
// ignored by Page.captureScreenshot in this headless setup).
const SCALE = hd ? 1 : 2; // 2 → 3840×2160

const work = mkdtempSync(join(tmpdir(), 'mcw-reel-'));
console.log(`rendering ${FRAMES} frames @ ${FPS}fps, ${1920 * SCALE}×${1080 * SCALE} → ${work}`);

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
  const { data } = await cdp.send('Page.captureScreenshot', { format: 'jpeg', quality: 90,
    ...(SCALE !== 1 && { clip: { x: 0, y: 0, width: 1920, height: 1080, scale: SCALE } }) });
  writeFileSync(join(work, `frame${String(i).padStart(5, '0')}.jpg`), Buffer.from(data, 'base64'));
  if (i % 900 === 0) {
    console.log(`  frame ${i}/${FRAMES} (${((Date.now() - t0) / 1000).toFixed(0)}s wall)`);
  }
}
await browser.close();
console.log(`captured in ${((Date.now() - t0) / 1000).toFixed(0)}s`);

const silentMp4 = join(work, 'silent.mp4');
execFileSync('ffmpeg', [
  '-hide_banner', '-loglevel', 'error', '-y',
  '-framerate', String(FPS), '-i', join(work, 'frame%05d.jpg'),
  '-c:v', 'libx264', '-preset', 'slow', '-crf', '19',
  '-pix_fmt', 'yuv420p', '-movflags', '+faststart',
  silentMp4,
], { stdio: 'inherit' });

let audioWav = null;
if (!silent) {
  audioWav = join(work, 'reel-audio.wav');
  try {
    execFileSync('node', [join(DEMO_DIR, 'scripts', 'build-reel-audio.mjs'), audioWav, String(DURATION_MS / 1000)], { stdio: 'inherit' });
  } catch {
    console.warn('audio build failed — writing silent video');
    audioWav = null;
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
