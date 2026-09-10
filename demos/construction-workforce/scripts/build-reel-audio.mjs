#!/usr/bin/env node
/**
 * build-reel-audio.mjs — narration + music bed for the construction booth
 * reel. Adapted from the retail-hiring demo's audio builder.
 *
 * Narration: ElevenLabs when ELEVENLABS_API_KEY is set (env or the umbrella
 * vocion-local/.env), else macOS `say`. One segment per scene, placed at the
 * scene-start offsets of the TL timeline in assets/reel.html — keep the `at`
 * values in sync when scene durations change. Each segment must fit inside
 * its scene (checked; overruns fail the build).
 *
 * Music: generated once by the ElevenLabs Music API and cached at
 * assets/reel-music.mp3 (delete or REEL_MUSIC_REGEN=1 to regenerate); synth
 * pad fallback without a key. Ducked under the voice, normalized -16 LUFS.
 *
 * NOTE the reel is a booth loop: it must also read fully with audio muted.
 * The narration mirrors the on-screen captions rather than adding new facts.
 *
 * Usage: node scripts/build-reel-audio.mjs <out.wav> <durationSeconds>
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
const TOTAL_S = Number(durationArg ?? 304.8);
const SAY_VOICE = 'Samantha';

const ELEVEN_VOICE_ID = process.env.ELEVEN_VOICE_ID || '21m00Tcm4TlvDq8ikWAM'; // Rachel
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
const MUSIC_PROMPT = 'Confident, steady product-film background music for a construction technology brand: '
  + 'modern minimal electronic with a warm low pulse, muted percussion, and subtle industrial texture, '
  + 'around 100 BPM, unhurried and assured, clean and unobtrusive so a spoken voiceover sits on top. '
  + 'Instrumental only, no vocals, no drops, consistent energy throughout, gentle intro, tidy ending.';

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

// One entry per narrated scene; `at` = scene start (s) + a beat, `maxEnd` =
// scene end. Scene starts in reel.html: s0=0 s1=16 s2=26 s3=64 s4=82 s5=116
// s6=124 s7=156 s8=184 s9=190 s10=214 s11=232 s12=248 s13=266 s14=284 end=300.
const NARRATION = [
  { at: 0.8, maxEnd: 15.5, text: 'A construction AI workforce: six agents, each owning one queue. Drafts carry their evidence — and nothing moves until the right person signs.' },
  { at: 16.8, maxEnd: 25.5, text: 'Margin rarely disappears all at once. It leaks while the paperwork catches up to the field.' },
  { at: 26.8, maxEnd: 63.5, text: 'Follow one question end to end. At six forty-two, the field flags a slab edge that doesn’t match the drawing. The RFI Writer pulls the current sheet, the spec section, the prior decision, and the photo — and drafts RFI one-twelve with every claim cited. Then it stops, and waits for the PM. Dan edits one line and issues it. Four hours twelve minutes, against a three-day baseline — and the crew stayed working.' },
  { at: 64.8, maxEnd: 81.5, text: 'Dan’s edit became a standing rule, and a test case. Tuesday’s correction is Wednesday’s standard. We don’t hand you a generic RFI writer — we build yours.' },
  { at: 82.8, maxEnd: 115.5, text: 'An owner’s rep gives a verbal directive, and the crew moves. The Change Tracker opens a potential change and chases the evidence — labor, tickets, photos, schedule. The one missing item gets an owner and a due date. The PM and estimator set the position — the agent never prices it. Forty-one thousand eight hundred dollars, documented in two days, not twenty-six.' },
  { at: 116.8, maxEnd: 123.5, text: 'The board keeps moving — eight agents running.' },
  { at: 124.8, maxEnd: 155.5, text: 'Billing day. The Pay App Checker reconciles progress, values, approved changes, stored material, and backup — and returns four exceptions, each with an owner. Not a blank package — a punch list. Submitted on day three instead of day nine. One point two million, invoiced on time.' },
  { at: 156.8, maxEnd: 183.5, text: 'A trade uploads door hardware. The Submittal Clerk checks the register and the contract, and catches two gaps before the package ever reaches review. The project engineer routes a complete submittal the first time.' },
  { at: 190.8, maxEnd: 213.5, text: 'Closeout starts while the trades are still on site. Warranties, O and Ms, as-builts — chased from the turnover list and accepted by your closeout lead. Forty-one missing items becomes six, before demobilization.' },
  { at: 214.8, maxEnd: 231.5, text: 'At Alliant, eleven governed agents run construction payroll compliance in production. One point six seven times analyst output. Three hundred twenty thousand dollars recovered — and an analyst approved every finding.' },
  { at: 232.8, maxEnd: 247.5, text: 'At Morris Shea — deep foundations — agents draft work orders and purchase orders for approval, and write back to the system of record. Baselined first, measured next.' },
  { at: 248.8, maxEnd: 265.5, text: 'Every month, the whole workforce is scored — on time, accepted first pass, cycle time, corrections, adoption — against your baseline. Three recurring corrections found. Three changes shipped.' },
  { at: 266.8, maxEnd: 283.5, text: 'When the first queues hold, the bench staffs the next one. Same systems, same standard — preconstruction to closeout.' },
  { at: 284.8, maxEnd: 299.5, text: 'Find the work. Build the agents. Operate and improve. Build your AI workforce — ask for your Construction AI Opportunity Map.' },
];

const work = mkdtempSync(join(tmpdir(), 'mcw-audio-'));

// ---------- fallback music: warm four-chord ambient pad, pure synthesis ----------
function synthMusic(path, seconds) {
  const SR = 44100;
  const n = Math.round(seconds * SR);
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
      const pan = ni % 2 === 0 ? 0.42 : 0.58;
      const w1 = 2 * Math.PI * f / SR;
      const w2 = 2 * Math.PI * f * 1.0015 / SR;
      const w3 = 2 * Math.PI * f * 2 / SR;
      for (let i = i0; i < i1; i++) {
        const t = i / SR - start;
        const env = 0.5 * (1 - Math.cos(2 * Math.PI * Math.min(Math.max(t / (CHORD_S + XFADE_S), 0), 1)));
        const s = (Math.sin(w1 * i) + 0.5 * Math.sin(w2 * i) + 0.22 * Math.sin(w3 * i)) * env / chord.length;
        left[i] += s * (1 - pan);
        right[i] += s * pan;
      }
    });
  }
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
const MUSIC_MAX_S = 300; // ElevenLabs Music cap — pad the tail in the mix
let musicFile;
if (key && existsSync(MUSIC_CACHE) && !process.env.REEL_MUSIC_REGEN) {
  musicFile = MUSIC_CACHE;
  console.log(`music: cached ${MUSIC_CACHE}`);
} else if (key) {
  try {
    console.log('music: generating via ElevenLabs Music…');
    await musicEleven(key, Math.min(TOTAL_S, MUSIC_MAX_S), MUSIC_CACHE);
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
