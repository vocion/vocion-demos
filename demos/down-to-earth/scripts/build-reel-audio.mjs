#!/usr/bin/env node
/**
 * build-reel-audio.mjs — narration + ambient music bed for the demo reel.
 *
 * Narration: macOS `say` (voice below), one segment per scene, placed at the
 * scene-start offsets of the TL timeline in assets/demo-reel.html — keep the
 * `at` values in sync when scene durations change. Each segment must fit
 * inside its scene (checked; overruns fail the build so they can't ship).
 *
 * Music: a license-free ambient pad synthesized right here (no downloaded
 * assets) — four warm chords cycling with slow crossfades, ducked under the
 * narration via sidechain compression, loudness-normalized to -16 LUFS.
 *
 * Usage: node scripts/build-reel-audio.mjs <out.wav> <durationSeconds>
 * (invoked by record-reel.mjs; runnable standalone for tuning)
 */
import { execFileSync } from 'node:child_process';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const [outWav, durationArg] = process.argv.slice(2);
if (!outWav) {
  console.error('usage: build-reel-audio.mjs <out.wav> <durationSeconds>');
  process.exit(1);
}
const TOTAL_S = Number(durationArg ?? 180.8);
const VOICE = 'Samantha'; // download a Premium voice (e.g. "Ava (Premium)") in System Settings → Accessibility → Spoken Content for higher quality, then change this.

// One entry per scene; `at` = scene start (s) + a beat, `maxEnd` = scene end.
const NARRATION = [
  { at: 0.8, maxEnd: 12.5, text: 'Meet Down to Earth\'s hiring workforce: two AI coworkers that read, score, and route every applicant — while your managers make every hire.' },
  { at: 13.6, maxEnd: 28.5, text: 'Applications from Indeed and your website land in one queue. Nothing changes about how people apply, and nothing writes into your systems.' },
  { at: 29.6, maxEnd: 48.5, text: 'The Applicant Screener reads every application within minutes and scores it against your standard, with guardrails built in. The Store Router delivers qualified candidates to the right manager.' },
  { at: 49.6, maxEnd: 78.5, text: 'Here is one applicant, end to end. The Screener reads the application, checks your policies, and scores it: an eighty-eight, explained in plain language, with the reasoning recorded. Threshold seventy: passed. The Store Router hands it to the Kailua manager, and a person approves before anything is sent.' },
  { at: 79.6, maxEnd: 96.5, text: 'Store managers keep email. The shortlist arrives already scored and explained — three candidates instead of eleven raw resumes. The interview, and the hire, stay theirs.' },
  { at: 97.6, maxEnd: 120.5, text: 'Your team approves, adjusts, or declines. A smoking answer is a flag for the CEO, never a rejection — and below-threshold applicants are held with the reason recorded. Nothing is ever auto-rejected.' },
  { at: 121.6, maxEnd: 138.5, text: 'Corporate sees every store on one screen: what was read, what was scored, what is waiting on a person, and what was held.' },
  { at: 139.6, maxEnd: 155.5, text: 'Every decision teaches the standard. When a pattern has enough evidence, the system proposes a change in plain language — and nothing changes until you approve it.' },
  { at: 156.6, maxEnd: 170.5, text: 'Hiring is the first job, not the last. New coworkers join only when you say so, at a fixed written price.' },
  { at: 171.6, maxEnd: 180.3, text: 'Fifteen hundred dollars a month, all in. Live in about two weeks. Down to Earth, and Metacto.' },
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

const musicWav = join(work, 'music.wav');
console.log('synthesizing music bed…');
synthMusic(musicWav, TOTAL_S);

// ---------- narration segments ----------
const segs = NARRATION.map((seg, i) => {
  const f = join(work, `seg${i}.aiff`);
  execFileSync('say', ['-v', VOICE, '-o', f, seg.text]);
  const dur = Number(execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', f]).toString().trim());
  const fits = seg.at + dur <= seg.maxEnd;
  console.log(`  seg${i}: ${dur.toFixed(1)}s at ${seg.at}s (scene ends ${seg.maxEnd}s) ${fits ? 'ok' : 'OVERRUN'}`);
  if (!fits) {
    throw new Error(`narration segment ${i} overruns its scene — shorten the text`);
  }
  return { ...seg, file: f };
});

// ---------- mix: VO over sidechain-ducked music, loudness-normalized ----------
const inputs = ['-i', musicWav];
segs.forEach(s => inputs.push('-i', s.file));
const voChains = segs.map((s, i) =>
  `[${i + 1}:a]aformat=sample_rates=44100:channel_layouts=stereo,adelay=${Math.round(s.at * 1000)}:all=1[v${i}]`,
).join(';');
const voMix = segs.map((_, i) => `[v${i}]`).join('');
const graph = [
  voChains,
  `${voMix}amix=inputs=${segs.length}:duration=longest:normalize=0,apad[vo]`,
  `[vo]asplit[voa][vob]`,
  `[0:a]volume=0.3[m]`,
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
