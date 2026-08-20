#!/usr/bin/env node
/**
 * build-reel-audio.mjs — narration + ambient music bed for the demo reel.
 *
 * Narration: ElevenLabs when ELEVENLABS_API_KEY is set (in the environment
 * or the umbrella vocion-local/.env), else macOS `say` as the offline
 * fallback. One segment per scene, placed at the scene-start offsets of the
 * TL timeline in assets/demo-reel.html — keep the `at` values in sync when
 * scene durations change. Each segment must fit inside its scene (checked;
 * overruns fail the build so they can't ship).
 *
 * Music: generated once by the ElevenLabs Music API (upbeat instrumental
 * bed) and cached at assets/reel-music.mp3 so re-renders spend no credits —
 * delete the cache or set REEL_MUSIC_REGEN=1 to regenerate. Without a key
 * (or if the API declines), falls back to a synthesized ambient pad. Either
 * way the bed is sidechain-ducked under the narration and the mix is
 * loudness-normalized to -16 LUFS.
 *
 * Usage: node scripts/build-reel-audio.mjs <out.wav> <durationSeconds>
 * (invoked by record-reel.mjs; runnable standalone for tuning)
 */
import { execFileSync } from 'node:child_process';
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const [outWav, durationArg] = process.argv.slice(2);
if (!outWav) {
  console.error('usage: build-reel-audio.mjs <out.wav> <durationSeconds>');
  process.exit(1);
}
const TOTAL_S = Number(durationArg ?? 180.8);
const SAY_VOICE = 'Samantha'; // offline fallback voice

// ElevenLabs config. The key lives in the umbrella vocion-local/.env
// (gitignored) — never in the repo. Voice: "Rachel", ElevenLabs' standard
// premade narration voice; override with ELEVEN_VOICE_ID.
const ELEVEN_VOICE_ID = process.env.ELEVEN_VOICE_ID || '21m00Tcm4TlvDq8ikWAM';
const ELEVEN_MODEL = process.env.ELEVEN_MODEL || 'eleven_multilingual_v2';
function elevenKey() {
  if (process.env.ELEVENLABS_API_KEY) { return process.env.ELEVENLABS_API_KEY; }
  // demo dir → demos → vocion-demos → vocion-local umbrella
  const envFile = join(dirname(dirname(fileURLToPath(import.meta.url))), '..', '..', '..', '.env');
  if (existsSync(envFile)) {
    const m = readFileSync(envFile, 'utf8').match(/^ELEVENLABS_API_KEY=(.+)$/m);
    if (m) { return m[1].trim(); }
  }
  return null;
}

async function ttsEleven(key, text, outFile) {
  const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${ELEVEN_VOICE_ID}?output_format=mp3_44100_128`, {
    method: 'POST',
    headers: { 'xi-api-key': key, 'content-type': 'application/json' },
    body: JSON.stringify({ text, model_id: ELEVEN_MODEL, voice_settings: { speed: 1.05 } }),
  });
  if (!res.ok) {
    throw new Error(`ElevenLabs TTS failed (${res.status}): ${(await res.text()).slice(0, 300)}`);
  }
  writeFileSync(outFile, Buffer.from(await res.arrayBuffer()));
}

const MUSIC_CACHE = join(dirname(dirname(fileURLToPath(import.meta.url))), 'assets', 'reel-music.mp3');
const MUSIC_PROMPT = 'Upbeat, optimistic product-demo background music: bright modern indie-electronic '
  + 'with warm piano, plucky synths and light percussion, steady drive around 115 BPM, major key, '
  + 'clean and unobtrusive so a spoken voiceover sits on top. Instrumental only, no vocals, '
  + 'no big drops, consistent energy, gentle intro, tidy ending.';

async function musicEleven(key, seconds, outFile) {
  const res = await fetch('https://api.elevenlabs.io/v1/music?output_format=mp3_44100_128', {
    method: 'POST',
    headers: { 'xi-api-key': key, 'content-type': 'application/json' },
    body: JSON.stringify({ prompt: MUSIC_PROMPT, music_length_ms: Math.round(seconds * 1000), model_id: 'music_v1' }),
  });
  if (!res.ok) {
    throw new Error(`ElevenLabs music failed (${res.status}): ${(await res.text()).slice(0, 300)}`);
  }
  writeFileSync(outFile, Buffer.from(await res.arrayBuffer()));
}

// One entry per scene; `at` = scene start (s) + a beat, `maxEnd` = scene end.
const NARRATION = [
  { at: 0.7, maxEnd: 9.6, text: 'Meet your hiring workforce: two AI coworkers read, score, and route every applicant. Your managers hire.' },
  { at: 10.6, maxEnd: 22.5, text: 'Indeed and your website land in one queue. Applicants apply the way they always have — and nothing writes into your systems.' },
  { at: 23.6, maxEnd: 38.5, text: 'The Applicant Screener reads and scores every application against your standard. The Store Router delivers qualified candidates to the right manager.' },
  { at: 39.6, maxEnd: 64.5, text: 'One applicant, end to end. The Screener reads the application, checks your policies, and scores it — an eighty-eight, explained in plain language. Threshold seventy: passed. The Router hands it to the Kailua manager, and a person approves before anything sends.' },
  { at: 65.5, maxEnd: 79.5, text: 'Managers keep email. The shortlist arrives scored and explained — three candidates instead of eleven resumes. The hire stays theirs.' },
  { at: 80.6, maxEnd: 99.5, text: 'Your team approves, adjusts, or declines. A smoking answer is a flag for the CEO — never a rejection. Below-threshold applicants are held, with the reason recorded.' },
  { at: 100.6, maxEnd: 114.5, text: 'Corporate sees every store on one screen — what was read, what was scored, and what is waiting on a person.' },
  { at: 115.6, maxEnd: 128.5, text: 'Every decision teaches the standard — and nothing changes until you approve it.' },
  { at: 129.5, maxEnd: 141.5, text: 'Hiring is the first job, not the last. New coworkers join only when you say so, at a fixed written price.' },
  { at: 142.5, maxEnd: 150.5, text: 'Fifteen hundred a month, all in. Live in about two weeks. Down to Earth, and Metacto.' },
];

const work = mkdtempSync(join(tmpdir(), 'dte-audio-'));

// ---------- music bed: warm four-chord ambient pad, pure synthesis ----------
function synthMusic(path, seconds) {
  const SR = 44100;
  const n = Math.round(seconds * SR);
  // C-major wash: Cmaj7 → Am7 → Fmaj7 → G6, 10s per chord, 3s crossfades.
  const CHORDS = [
    [130.81, 164.81, 196.00, 246.94],
    [110.00, 130.81, 164.81, 196.00],
    [87.31, 110.00, 130.81, 164.81],
    [98.00, 123.47, 146.83, 164.81],
  ];
  const CHORD_S = 10;
  const XFADE_S = 3;
  const left = new Float64Array(n);
  const right = new Float64Array(n);
  for (let ci = 0; ci * CHORD_S < seconds + CHORD_S; ci++) {
    const chord = CHORDS[ci % CHORDS.length];
    const start = ci * CHORD_S - XFADE_S / 2;
    const end = start + CHORD_S + XFADE_S;
    const i0 = Math.max(0, Math.round(start * SR));
    const i1 = Math.min(n, Math.round(end * SR));
    chord.forEach((f, ni) => {
      const pan = ni % 2 === 0 ? 0.42 : 0.58; // gentle alternate panning
      const w1 = 2 * Math.PI * f / SR;
      const w2 = 2 * Math.PI * f * 1.0015 / SR; // slight detune for warmth
      const w3 = 2 * Math.PI * f * 2 / SR; // soft octave
      for (let i = i0; i < i1; i++) {
        const t = i / SR - start;
        // raised-cosine envelope across the chord's window
        const env = 0.5 * (1 - Math.cos(2 * Math.PI * Math.min(Math.max(t / (CHORD_S + XFADE_S), 0), 1)));
        const s = (Math.sin(w1 * i) + 0.5 * Math.sin(w2 * i) + 0.22 * Math.sin(w3 * i)) * env / chord.length;
        left[i] += s * (1 - pan);
        right[i] += s * pan;
      }
    });
  }
  // slow breathing LFO + global fade in/out, then peak-normalize to ~0.3
  const fadeIn = 2 * SR;
  const fadeOut = 6 * SR;
  let peak = 0;
  for (let i = 0; i < n; i++) {
    const lfo = 1 + 0.1 * Math.sin(2 * Math.PI * 0.05 * i / SR);
    let g = lfo;
    if (i < fadeIn) { g *= i / fadeIn; }
    if (i > n - fadeOut) { g *= (n - i) / fadeOut; }
    left[i] *= g; right[i] *= g;
    peak = Math.max(peak, Math.abs(left[i]), Math.abs(right[i]));
  }
  const norm = 0.3 / (peak || 1);
  const buf = Buffer.alloc(44 + n * 4);
  buf.write('RIFF', 0); buf.writeUInt32LE(36 + n * 4, 4); buf.write('WAVE', 8);
  buf.write('fmt ', 12); buf.writeUInt32LE(16, 16); buf.writeUInt16LE(1, 20);
  buf.writeUInt16LE(2, 22); buf.writeUInt32LE(SR, 24); buf.writeUInt32LE(SR * 4, 28);
  buf.writeUInt16LE(4, 32); buf.writeUInt16LE(16, 34);
  buf.write('data', 36); buf.writeUInt32LE(n * 4, 40);
  for (let i = 0; i < n; i++) {
    buf.writeInt16LE(Math.round(Math.max(-1, Math.min(1, left[i] * norm)) * 32767), 44 + i * 4);
    buf.writeInt16LE(Math.round(Math.max(-1, Math.min(1, right[i] * norm)) * 32767), 46 + i * 4);
  }
  writeFileSync(path, buf);
}

// ---------- music bed ----------
const key = elevenKey();
let musicFile;
if (key && existsSync(MUSIC_CACHE) && !process.env.REEL_MUSIC_REGEN) {
  musicFile = MUSIC_CACHE;
  console.log(`music: cached ${MUSIC_CACHE}`);
} else if (key) {
  try {
    console.log('music: generating via ElevenLabs Music…');
    await musicEleven(key, TOTAL_S, MUSIC_CACHE);
    musicFile = MUSIC_CACHE;
    console.log(`music: wrote ${MUSIC_CACHE}`);
  } catch (err) {
    console.warn(`music: ${err.message} — falling back to synth pad`);
  }
}
if (!musicFile) {
  musicFile = join(work, 'music.wav');
  console.log('music: synthesizing fallback pad…');
  synthMusic(musicFile, TOTAL_S);
}

// ---------- narration segments ----------
console.log(`narration engine: ${key ? `ElevenLabs (voice ${ELEVEN_VOICE_ID}, ${ELEVEN_MODEL})` : `macOS say (${SAY_VOICE})`}`);
const segs = [];
for (const [i, seg] of NARRATION.entries()) {
  let f;
  if (key) {
    f = join(work, `seg${i}.mp3`);
    await ttsEleven(key, seg.text, f);
  } else {
    f = join(work, `seg${i}.aiff`);
    execFileSync('say', ['-v', SAY_VOICE, '-o', f, seg.text]);
  }
  const dur = Number(execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', f]).toString().trim());
  const fits = seg.at + dur <= seg.maxEnd;
  console.log(`  seg${i}: ${dur.toFixed(1)}s at ${seg.at}s (scene ends ${seg.maxEnd}s) ${fits ? 'ok' : 'OVERRUN'}`);
  if (!fits) {
    throw new Error(`narration segment ${i} overruns its scene — shorten the text`);
  }
  segs.push({ ...seg, file: f });
}

// ---------- mix: VO over sidechain-ducked music, loudness-normalized ----------
const inputs = ['-i', musicFile];
segs.forEach(s => inputs.push('-i', s.file));
const voChains = segs.map((s, i) =>
  `[${i + 1}:a]aformat=sample_rates=44100:channel_layouts=stereo,adelay=${Math.round(s.at * 1000)}:all=1[v${i}]`,
).join(';');
const voMix = segs.map((_, i) => `[v${i}]`).join('');
const graph = [
  voChains,
  `${voMix}amix=inputs=${segs.length}:duration=longest:normalize=0,apad[vo]`,
  `[vo]asplit[voa][vob]`,
  `[0:a]aformat=sample_rates=44100:channel_layouts=stereo,apad,volume=0.35[m]`,
  `[m][voa]sidechaincompress=threshold=0.02:ratio=8:attack=200:release=900[duck]`,
  `[duck][vob]amix=inputs=2:duration=first:normalize=0[mix]`,
  `[mix]loudnorm=I=-16:TP=-1.5:LRA=11,atrim=0:${TOTAL_S},asetpts=PTS-STARTPTS[out]`,
].join(';');
execFileSync('ffmpeg', [
  '-hide_banner', '-loglevel', 'error', '-y',
  ...inputs,
  '-filter_complex', graph, '-map', '[out]',
  '-c:a', 'pcm_s16le', outWav,
], { stdio: 'inherit' });
rmSync(work, { recursive: true, force: true });
console.log(`wrote ${outWav}`);
