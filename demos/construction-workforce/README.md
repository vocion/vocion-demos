# Metacto — Construction AI Workforce booth reel

**Trade-show booth loop · 5:04 · 3840×2160 @ 30fps · seamless loop (last frame == first frame)**

A hub-and-spoke booth video for Metacto's construction trade-show booth: a
recurring roster board (six construction AI agents with live statuses)
alternating with six end-to-end agent stories — RFI Writer, Change Tracker,
Pay App Checker, Submittal Clerk, Closeout Coordinator — plus the
built-for-you beat (a PM's correction becomes a standing rule + eval case),
two proof beats (Alliant = real numbers, announced as such; Morris Shea =
case-study-in-development stub), the monthly workforce scorecard, the
16-agent bench, and the CTA. Designed to be read **with audio muted** on a
show floor: every beat carries its own on-screen copy, captions sit above a
persistent Find the work → Build the agents → Operate and improve spine that
matches the booth banners, and nothing critical lives in the bottom 15% of
frame. Plan/outline: `vocion-local/BOOTH-REEL-construction.md`.

Color law throughout: **amber = waiting on a human, green = a person
approved it** — green is never used for something an agent did alone.

Everything is a synthetic fixture except the Alliant beat (11 agents · 1.67×
· $320K — public on metacto.com, and the one scene whose watermark flips to
"ACTUAL CLIENT RESULTS"). The Morris Shea beat deliberately shows **no
metrics** ("baselined first, measured next") until the real case study
lands. The persistent watermark reads "Illustrative interface — synthetic
project data."

## Files

```
assets/
  reel.html        # the timeline — scenes, captions, choreography (304s TL)
  reel-music.mp3   # generated music bed, cached (delete or REEL_MUSIC_REGEN=1 to redo)
  metacto-construction-workforce.mp4   # the rendered reel
scripts/
  record-reel.mjs      # headless deterministic render (Playwright + ffmpeg)
  build-reel-audio.mjs # ElevenLabs narration + music, ducked + normalized
  snap.mjs             # QA: screenshot the reel at given virtual-time seconds
```

## Render

```bash
# from the vocion-demos root (playwright resolves from there):
cd demos/construction-workforce
node scripts/record-reel.mjs            # 4K, narration + music (needs ELEVENLABS_API_KEY
                                        # in env or umbrella vocion-local/.env; macOS `say` fallback)
node scripts/record-reel.mjs --silent   # 4K, no audio track
node scripts/record-reel.mjs --hd       # 1920×1080 — faster iteration
```

Frames render against a stepped virtual clock (CDP virtual time), so output
is exact 30fps regardless of machine load. `DURATION_MS` in record-reel.mjs
must equal the TL total in reel.html (+800ms tail); the narration offsets in
build-reel-audio.mjs must match the scene starts — all three carry the
current numbers in comments. Debug one scene in a browser with
`reel.html?scene=N&hold=1`, or QA stills with
`node scripts/snap.mjs <outDir> 10 45 100 …` (note: rAF only ticks when a
frame is captured under virtual time, so sparse snaps shift animations that
started between snap points — trust the full render for motion timing).

## Booth notes

- Play looped, full-screen, on the 4K TV. Audio optional — usable when the
  floor allows it; the cut reads complete without it.
- The loop seam is invisible: the final scene is a static clone of the
  opening board.
- If a screen burn-in worry comes up: the persistent chrome (top bar, spine)
  is static by design; most consumer TVs are fine for a 2–3 day show.
