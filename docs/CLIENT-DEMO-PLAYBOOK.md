# Client Demo Factory — production playbook

How to build, for any new client, the full package we built for Retail Hiring Workforce:

1. a **runnable demo environment** on the Vocion core, seeded with that client's own policies
2. **synthetic data** at their real volume, engineered to land on the numbers in their proposal
3. a **live walkthrough script** the salesperson reads
4. a **rendered demo video** with AI voiceover and a generated music bed

**Reference implementation:** `demos/retail-hiring/` in this repo. Every pattern below is
extracted from it; when in doubt, open that directory and copy the shape.

**Effort:** roughly one focused day for a first-time client, of which ~5 minutes is machine time
(the reel renders in ~2–3 minutes; everything else is authoring judgment).

**The single rule that matters most:** the client's current proposal is the source of truth.
Not the discovery-call notes, not last month's proposal, not what the platform happens to do
already. If the demo says five agents and the proposal says two, the demo is wrong. Re-read the
proposal before you touch anything, and again before you ship.

---

## 0. What you are producing

| Deliverable | Path (per demo) | Consumed by |
|---|---|---|
| Workspace manifest + entities | `workspace/<slug>/` | the platform, via `workspace:apply` |
| Synthetic fixtures | `workspace/<slug>/data/*.jsonl` | the file-import connector |
| Fixture generator | `scripts/generate-applicants.mjs` | you, when volume or shape changes |
| Setup + architecture notes | `README.md` | the next engineer (or agent) |
| Live demo script | `WALKTHROUGH.md` | the person presenting |
| Reel source | `assets/demo-reel.html` | the renderer; also debuggable in a browser |
| Deterministic renderer | `scripts/record-reel.mjs` | you, one command |
| Narration + music builder | `scripts/build-reel-audio.mjs` | the renderer |
| Cached music bed | `assets/reel-music.mp3` | the mixer (committed, so re-renders are free) |
| Rendered video | `assets/retail-hiring-demo.mp4` | the client, as send-ahead / leave-behind |

---

## Phase 1 — Intake: turn the proposal into a spec

Read the proposal cover to cover and fill in this table before writing any code. Everything
downstream keys off it. Cite page numbers — you will need them in the walkthrough.

| Field | What to extract | Retail Hiring Workforce example |
|---|---|---|
| **Agent roster** | The exact coworkers, named as the proposal names them. This is the demo's spine. | 2: Applicant Screener, Store Router (p.3) |
| **Per-agent skills** | The bullet list under each agent — becomes the operations | parse resume · score 1–100 · explain · apply deal-breakers · flag · request info |
| **The decision rule** | The number and what happens on each side of it | Threshold 70; ≥70 routes, <70 held with reason, 60–69 near-miss (p.4, p.6) |
| **Guardrails / non-negotiables** | The client's own policies, verbatim in spirit | plant-based on property; smoking = CEO flag, never auto-reject |
| **Named entities** | Real people/systems named — and which are deliberately *unnamed* | the HR lead named; HR manager + CEO deliberately unnamed — never invent |
| **Untouched systems** | What the client fears you will break | the existing performance-review system: no connection of any kind. ADP: export on hire, never a write |
| **Volume** | Real throughput, and the plan's included ceiling | ~60 applications/mo, ~20 hires; plan includes 150 |
| **Worked example** | Any traced example in the doc — you will reproduce it exactly | one applicant → 88 → routed to Harborview manager (p.4) |
| **Any shown output** | Tables, inboxes, screenshots in the doc | manager inbox: 3 qualified of 11 (p.5) |
| **Learning story** | How the system improves, and who approves | shift-work weighting change, corporate approves (p.6) |
| **Roadmap** | Future capabilities → inactive teasers | 7-agent registry with add-on pricing (p.12) |
| **Commercials** | Price, term, what's included — for the end card and Q&A | a phased monthly structure, no setup fee, a usage ceiling included |

**Also record every error you find in the proposal.** We found a store listed that does not exist.
Flag it to the human immediately — do not silently "fix" it in the demo and do not reproduce it.

**Output of this phase:** the filled table, pasted into the demo's `README.md` as a
"what the proposal says" block, so the next person can re-audit without re-reading the PDF.

---

## Phase 2 — Scaffold

```bash
cd vocion-demos/demos
cp -R retail-hiring <new-client-slug>
cd <new-client-slug>
```

Then rename throughout: directory names, `workspace.yaml` slugs, `dev.sh` paths, README/WALKTHROUGH
titles. Allocate a port and a database:

| Demo | Port | Database |
|---|---|---|
| support-reply | 3001 | `vocion_demo` |
| retail-hiring | 3003 | `vocion_retail_hiring` |
| *your new one* | next free | `vocion_<slug>` |

Each demo needs **its own database** — `seed:demo` keys on user email and exits early if the user
exists, so two demos sharing a database cannot both seed.

`scripts/dev.sh` must export `WORKSPACE_PATH` (the v2 core name; it was `CONTEXT_PATH` before
core v2.0) pointing at `workspace/<slug>/`, and run the core's `dev:next` — **never** plain
`npm run dev`, which starts an embedded PGlite server on 5432 and collides with the shared Postgres.

---

## Phase 3 — Author the workspace

`workspace/<slug>/` is what the platform loads. Directory = entity type; each file is one entity.

```
workspace/<slug>/
├── workspace.yaml          # tenant manifest: orgId, projectSlug, name, description, defaults
├── agents/                 # <slug>.yaml + <slug>.system-prompt.md per agent
├── operations/<verb>/      # skill.yaml + prompt.md — the units of work
├── playbooks/<name>/       # SKILL.md — the client's standards, in prose
├── workflows/<name>/       # workflow.yaml — multi-step pipeline with an approve gate
├── objects/<type>/         # type.yaml — business objects
├── sources/                # one yaml per data source
├── learnings/              # accumulated rules, per-agent and per-skill
├── evals/                  # regression cases, some marked stop-ship
└── data/                   # generated fixtures (paths resolve relative to WORKSPACE_PATH)
```

### Authoring rules

**Agents mirror the proposal roster one-to-one.** Two agents in the doc means exactly two active
agents. Do not keep old agents around "in case" — we deleted five and consolidated to two, and
the demo got dramatically more legible. Each agent gets:

```yaml
slug: applicant-screener
name: Applicant Screener            # exactly the proposal's name
description: >-                      # the proposal's own mission sentence, + the guardrail
  Reads every application ... Below the threshold (70) = held from routing —
  visible, recoverable, never auto-rejected. Proposal p.3: "The Applicant Screener."
active: true
model: claude-sonnet-4-6             # match the pinned core's default so pricing resolves
temperature: '0.2'
skills: [review_application, score_candidate, draft_candidate_followup]
connectorSources: [indeed, careers-website]
objectTypes: [applicant, role]
playbookTags: [hiring]
suggestions:                          # 4 chat starters — these are demo choreography, write them well
  - label: Screen an application
    prompt: '...'
approvalPolicy:
  always_approve: [draft_candidate_followup]
  block: [reject_applicant, hire_applicant, schedule_interview]   # encode what must never happen
systemPromptFile: applicant-screener.system-prompt.md
```

`approvalPolicy.block` is where you make the scary thing *structurally* impossible. When the client
asks "can it auto-reject?", the answer should be a file, not a promise.

**System prompts encode the client's policies as rules with reasons.** Sections that worked:
extraction (no judgment yet) → scoring (the rubric) → the explanation contract (cite the
applicant's own words) → fairness rules (job-related only; unknown ≠ bad) → policy flags (what
flags vs what disqualifies — usually nothing disqualifies) → escalation. Write "unknown is not a
penalty, it is a follow-up" style rules explicitly; models otherwise assume worst-case on missing data.

**Playbooks are the client's standard in prose**, one `SKILL.md` per topic. Ours: `scoring-rubric`
(criteria, weights, bands, threshold, plus a "how the standard learns" section), `hiring-standards`
(the two deal-breaker policies), `store-directory` (locations + routing), `brand-voice`,
`product-standards`.

**Learnings show the mechanism, not just content.** Seed the proposal's own worked example as a
rule with its evidence, so the "the standard learns" beat has something real to point at:

```yaml
  - id: shift-work-weighs-in-deli
    text: |
      Approved rubric change (corporate, demo seed — the proposal's worked
      example): applicants who listed prior food-service SHIFT work stayed
      longer in deli roles. Weight shift-work slightly higher for Deli Clerk
      levels 1–2, in every store. Cite the shift work when it moves the number.
```

**Evals must include stop-ship cases** — the ones that encode the client's fears. Ours: the smoking
flag must not change the score; butcher-shop history must not be penalized; no personal attributes
may appear in reasoning. Mark them, and re-run after any prompt change.

**Workflows carry an explicit `approve` step.** Even when individual operations set
`requiresApproval`, an explicit gate makes the pause visible in the demo:

```yaml
  - name: manager_review
    type: approve
    prompt: >-
      Review the score and the shortlist routing before the email goes out.
      Approve, adjust, or decline. Smoking/vaping flags require the CEO-approval
      path — never decline on the flag alone.
    reviews: route
```

**Roadmap teasers are inactive agents** — one per future capability, `active: false`, with the
proposal's indicative pricing in the description and no operations authored. Seven of them turned
proposal page 12 into a screen.

### Validate

```bash
cd ../../vocion-core/packages/core
export WORKSPACE_PATH=/abs/path/to/demos/<slug>/workspace/<slug>
export DATABASE_URL=postgresql://postgres:postgres@127.0.0.1:5432/vocion_<slug>
npm run workspace:check     # schema dry run — needs DATABASE_URL just to boot, even dry
npm run workspace:apply
```

`workspace:check` requires `DATABASE_URL` to be set even for a dry run. For a pure schema check
before the database exists, point it at a dead address (`...@127.0.0.1:9/dryrun`).

---

## Phase 4 — Synthetic data

The generator (`scripts/generate-applicants.mjs`) is ~200 lines and worth reading in full. Design
rules, in priority order:

**1. Deterministic.** Seeded PRNG (Mulberry32, seeded with something meaningful — we used the
company's founding year). Re-running produces byte-identical files, so regenerating is never a
diff bomb and fixtures can be committed.

**2. Volume matches reality, not convenience.** The discovery call said ~60 applications/month, so
the fixtures are 43 + 20. When the client sees their own number on screen, the demo stops feeling
like a template.

**3. Composition matches reality.** Ours: 72% entry-level, 18% supervisor, 10% management —
straight from "mostly entry-level, management a dozen or so periodically." Plus deliberate
messiness: ~15% omit a store preference, ~15% omit availability, ~12% answer yes to the sensitive
question, ~6% leave it blank, 10% don't acknowledge the policy. **The gaps are the demo** — they
are what shows "unknown is a follow-up, not a penalty."

**4. Every edge case the walkthrough needs must exist by construction.** Write history entries that
exist purely to be demonstrated, and tag them in a comment: the butcher-shop applicant (history vs
conduct), the rideshare driver applying for management (the client's own example of a bad fit), the
no-experience first-jobber, the borderline-supervisory keyholder.

**5. Curated rows reproduce the proposal's numbers.** This is the highest-leverage trick in the
whole playbook. Hand-author the applicants from the proposal's worked example and append them
*after* the generated rows with fixed IDs, so generated IDs never shift:

```js
const CURATED = [ /* the three from the proposal's manager-inbox page */ ]
  .map((c, i) => ({ id: `APP-IN-${String(41 + i).padStart(3, '0')}`, /* … */
                    curated: 'proposal-shortlist' }));
const indeed = [...Array.from({length: 40}, (_, i) => makeApplicant(i, 'indeed')), ...CURATED];
```

Now a live run of the workflow on `APP-IN-041` reproduces the trace on page 4 of the document the
client is holding. Compose the resume text so the rubric *has* to produce roughly the target score:
include the criteria that earn points and one explicit weakness for the deduction the doc shows.

**6. Row shape maps onto the connector's smart defaults.** For `kind: file-import`:
`id → externalId`, `name → title`, `body → content`, `received_at → lastModifiedAt`, everything
else → metadata. Tag every row `fixture: true`.

**7. No pre-computed embeddings**, so syncing exercises the real embedding path (needs
`OPENAI_API_KEY`). Note this in the source YAML.

The generator prints counts by level / store / flag on every run — eyeball them; a distribution
that drifted is a broken demo.

---

## Phase 5 — Bring the environment up

```bash
# 1. Postgres (shared, one container, one DB per demo)
cd vocion-local && docker compose up -d
docker exec vocion-postgres psql -U postgres -d postgres -c 'CREATE DATABASE vocion_<slug>'
docker exec vocion-postgres psql -U postgres -d vocion_<slug> -c 'CREATE EXTENSION IF NOT EXISTS vector'

# 2. Env, migrate, seed
cd demos/<slug> && cp .env.example .env.local     # AUTH_SECRET from vocion-local/.bootstrap-secret
cd ../../vocion-core/packages/core
export DATABASE_URL=postgresql://postgres:postgres@127.0.0.1:5432/vocion_<slug>
npm run db:migrate
npm run seed:demo -- --email <slug>@example.com --password demo123 --name "<Client> Demo" \
  --account-name "<Client>" --project-slug <slug> --project-name "<Client full name>"

# 3. Workspace
export WORKSPACE_PATH=/abs/.../demos/<slug>/workspace/<slug>
npm run workspace:check && npm run workspace:apply

# 4. Run
cd ../../../demos/<slug> && ./scripts/dev.sh        # → http://localhost:<port>
```

Then, in the dashboard: **sync the sources** (needs the OpenAI key — do it before the meeting, not
during), and **pre-run the workflow two or three times** so the review queue isn't empty when you
present. Start with the curated proposal fixture. Leave the runs unapproved — approving one live is
a demo beat.

**Verify the curated fixtures actually land near their target scores under a live model run.**
The numbers come from a real LLM call, not from the fixture. Treat "≈88" as a band, and if it
drifts, adjust the fixture's resume text or the rubric weights until it doesn't.

---

## Phase 6 — The live walkthrough script

`WALKTHROUGH.md`. Structure that worked:

1. **A one-sentence frame** to open with — the whole value proposition in one breath.
2. **Beats, each citing a proposal page.** Ours: sign-in/command center (p.2) → sources (p.6) →
   the two coworkers (p.3) → run one applicant live (p.4) → review queue + approve one (pp.4–5,
   p.7) → chat with an agent (p.2) → the standard learns (p.6) → registry tease (p.12). Every beat
   says *show this, say this, don't dwell on that*. The mapping is the point: the demo shows what
   the doc says.
3. **A cheat-sheet table of which fixtures to use for which point** — case, which fixture,
   what it demonstrates. Mark the "money moment" (for us: a strong candidate who answered yes to
   the sensitive question — score unchanged, flag attached).
4. **Q&A landmines, answered cold.** Every hard question with the exact answer, including price
   (quote nothing but the proposal), the exit right, what it touches, who owns the data,
   and how to buy. Include the compliance answer *and* its boundary — where to stop and defer.
5. **Known limitations, stated proactively.** Synthetic data, stubbed sends, live-model variance.

Write it so someone who wasn't in the discovery call can present it.

---

## Phase 7 — The reel

### Architecture

A single self-contained HTML file (`assets/demo-reel.html`, ~720 lines) that renders a fake
application UI at a fixed 1920×1080 and auto-plays a scripted timeline. No frameworks, no network,
no build step. A Node script drives a headless browser frame-by-frame and encodes to MP4.

Why a stylized fake UI rather than a screen recording: the product's real screens don't yet show
everything the proposal promises, screen recordings of a local dev app look like a local dev app,
and this way every pixel is chosen. **It carries a permanent watermark — "Illustrative interface —
synthetic demo data" — and the script says so out loud.** Never let it pass as the shipped product.

### Structure

```
#browser        fake browser chrome (dots, lock, client's domain)
#shell
  #side         fake sidebar nav — items have data-nav, one .on at a time
  #main
    .scene ×10  one <section> per scene, absolutely positioned, opacity-animated
#caption        the subtitle bar (one line per scene, mirrors the narration)
#wm             the watermark
#cursor         the faux mouse pointer (injected by JS)
```

Scenes map to proposal pages — one scene per claim, in the order the doc makes them. Ours:
cover · intake · the two coworkers · one applicant end-to-end (the p.4 trace) · manager inbox ·
review queue (approve + flag + held) · corporate command center · the learning loop · agent
registry · price end card.

Inside a scene, `.rv` marks an element for staggered reveal and `.d1`–`.d6` set its step. Keep
scenes to one idea and 4–6 reveals.

### The timeline

```js
const TL = [
  { s: 's1', t: 10000, nav: null,       cap: '…' },
  { s: 's4', t: 26000, nav: 'applicants', cap: '…',
    cap2: { at: 13000, text: '…' } },   // a second caption mid-scene
  // …
];
```

`t` is that scene's duration in ms. The sum must equal `DURATION_MS` in `record-reel.mjs`
(plus an 800 ms tail) and the `at`/`maxEnd` offsets in `build-reel-audio.mjs`. **Three files, one
timeline — change one, change all three.** Ours: 151 s over 10 scenes.

Pacing that felt right: 9–16 s for a claim, 20–26 s for the one scene that traces a mechanism.
Reveal stagger 450 ms. Crossfade 320–550 ms. When in doubt, shorter — our first cut ran 3:01 and
felt slow; 2:32 with the same content felt confident.

### Motion: use a JS tween engine, not CSS transitions

This is the single most important technical lesson in this document.

```js
const tweens = [];
function tween(el, props, { dur = 450, delay = 0, ease = easeOut } = {}) { /* … */ }
requestAnimationFrame(function loop() {
  const now = performance.now();        // NOT the rAF timestamp argument
  /* advance every active tween, then: */
  requestAnimationFrame(loop);
});
```

Supported props: `opacity`, `y` (translateY px), `scale`, `left`, `top`. Everything — scene
crossfades, staggered reveals, the score dial, the cursor — goes through it.

Why: the renderer steps a *virtual* clock. Under virtual time, `setTimeout` and `performance.now()`
follow the stepped clock exactly, but **CSS transitions run on the compositor and either freeze or
snap to their end state**, and **rAF timestamps drift** because they only advance when frames are
produced. Using CSS transitions produces a video where nothing moves; using the rAF timestamp
argument produces one where scenes never finish fading out and pile up on top of each other. Both
of those were real bugs we shipped and had to fix. Clock everything off `performance.now()`.

### The faux mouse

A pointer-arrow SVG (`#cursor`, `position: fixed`, `transform-origin` at the arrow tip) plus a
`.ripple` div per click. Three primitives:

- `cursorGlide(x, y)` — ease-in-out move, ~850–950 ms; fades in from an offset on first use
- `cursorPress()` — scale to 0.8 and back over ~230 ms, plus a ripple that scales 0.35→1.5 while
  fading out
- `cursorHide()` — fade out when the interaction is done

Choreography: glide to the sidebar item ~1150 ms *before* each scene change, press ~140 ms before
it, hide shortly after. Plus in-scene clicks on the two consequential buttons (approve a candidate;
approve a rubric change), each followed by the row visibly changing state. The cursor is what makes
it read as *someone using software* rather than slides.

Get target coordinates from `getBoundingClientRect()` at click time — never hard-code pixels.

### The renderer

`scripts/record-reel.mjs`:

```js
await page.goto(`${REEL}?paused=1`);                                   // page waits for __start()
await cdp.send('Emulation.setVirtualTimePolicy', { policy: 'pause' });
await page.evaluate(() => window.__start());
for (let i = 0; i < FRAMES; i++) {
  await new Promise((resolve) => {                                     // advance exactly one frame
    cdp.once('Emulation.virtualTimeBudgetExpired', resolve);
    cdp.send('Emulation.setVirtualTimePolicy', { policy: 'advance', budget: 1000 / FPS });
  });
  const { data } = await cdp.send('Page.captureScreenshot', { format: 'jpeg', quality: 92 });
  writeFileSync(`frame${String(i).padStart(5, '0')}.jpg`, Buffer.from(data, 'base64'));
}
```

Launch flags that keep animation on the main thread:
`--disable-threaded-animation --disable-threaded-scrolling --disable-checker-imaging
--run-all-compositor-stages-before-draw`.

Encode: `-framerate 30 -i frame%05d.jpg -c:v libx264 -preset slow -crf 19 -pix_fmt yuv420p
-movflags +faststart`, then mux audio as `-c:a aac -b:a 192k -shortest`.

Output for a 151 s reel: ~4,550 frames, ~70 s of capture (~65 frames/s), ~10 MB.

**Why not Playwright's built-in `recordVideo`:** it screencasts at a variable ~24 fps and the
resample to 30 fps duplicates roughly every fifth frame during motion — which reads on screen as
flicker. That was the original bug. Frame-stepping a virtual clock gives perfect constant frame
rate, independent of machine load, and is reproducible.

### Debug affordances

- `?scene=N` — hold one scene, for layout work
- `?speed=2` — play at double rate
- `?paused=1` — recorder mode (waits for `window.__start()`)

Screenshot every scene with `?scene=N` before rendering; catching a layout bug costs seconds there
and a full re-render here.

---

## Phase 8 — Audio

`scripts/build-reel-audio.mjs`. Narration from ElevenLabs TTS, music from ElevenLabs Music,
mixed and ducked with ffmpeg. Falls back to macOS `say` + a synthesized pad with no API key.

### Narration

| Setting | Value |
|---|---|
| Endpoint | `POST https://api.elevenlabs.io/v1/text-to-speech/{voice_id}?output_format=mp3_44100_128` |
| Header | `xi-api-key: $ELEVENLABS_API_KEY` |
| Voice | `21m00Tcm4TlvDq8ikWAM` ("Rachel", premade narration voice) — override with `ELEVEN_VOICE_ID` |
| Model | `eleven_multilingual_v2` — override with `ELEVEN_MODEL` |
| Body | `{ text, model_id, voice_settings: { speed: 1.05 } }` |

The key lives in `vocion-local/.env` (gitignored, `chmod 600`) and is read from the environment or
that file. **Never commit it.**

One segment per scene, each with `at` (when it starts) and `maxEnd` (when its scene ends). The
build **measures every segment with ffprobe and throws if one overruns its scene** — narration that
bleeds across a cut can't ship. If it throws, shorten the text; don't extend the scene without
also updating the timeline in the other two files.

Narration writing rules that made it land:

- Write for the ear: short clauses, one idea per sentence, no parentheticals, no lists.
- Spell numbers as words for the reader — "an eighty-eight", "threshold seventy", "fifteen hundred
  a month" — otherwise the TTS reads digits unevenly.
- Say the guardrail out loud in the scene that shows it ("a flag for the CEO — never a rejection").
- Don't narrate what the caption already says word-for-word; the caption is the skimmable version.
- End on the commercial line, then the two names.
- Budget ~2.2 words/second at speed 1.05, and leave ≥1 s of air before the scene cuts.

### Music

Generated once, cached at `assets/reel-music.mp3` (committed), so re-renders cost no credits.
Regenerate by deleting it or setting `REEL_MUSIC_REGEN=1`.

| Setting | Value |
|---|---|
| Endpoint | `POST https://api.elevenlabs.io/v1/music?output_format=mp3_44100_128` |
| Body | `{ prompt, music_length_ms, model_id: 'music_v1' }` |

The prompt, verbatim:

> Upbeat, optimistic product-demo background music: bright modern indie-electronic with warm
> piano, plucky synths and light percussion, steady drive around 115 BPM, major key, clean and
> unobtrusive so a spoken voiceover sits on top. Instrumental only, no vocals, no big drops,
> consistent energy, gentle intro, tidy ending.

Prompt anatomy, so you can re-aim it: **function** ("product-demo background music") ·
**genre + instrumentation** · **tempo + key** · **mix role** ("so a spoken voiceover sits on top")
· **exclusions** ("no vocals, no big drops") · **shape** ("gentle intro, tidy ending"). Keep the
mix-role and exclusion clauses in any variant — they're what keep the bed out of the way.

Variants for different client temperaments:

| Feel | Swap in |
|---|---|
| Warmer / less synthetic | "acoustic-leaning: felt piano, brushed drums, upright bass, around 100 BPM" |
| More energetic | "driving indie-pop with claps and a bright arpeggio, around 124 BPM" |
| Institutional / conservative | "understated corporate: soft piano and strings, minimal percussion, around 90 BPM" |

We asked for the first version as an ambient pad and it came back reading as somber — "mellow,
macabre" was the verdict. Ask for **upbeat, major key, and a BPM** explicitly; ambient prompts
drift melancholy.

### The mix

```
each VO segment → aformat 44.1k stereo → adelay <at>ms → amix (normalize=0) → apad → asplit
music → aformat → apad → volume 0.35 ──┐
                                        sidechaincompress(threshold=0.02, ratio=8,
                                                          attack=200, release=900)
                                        → amix with VO → loudnorm(I=-16, TP=-1.5, LRA=11)
                                        → atrim to duration
```

The sidechain is the important part: the music ducks itself whenever narration is present, so the
bed can sit loud enough to feel energetic without fighting the voice. `loudnorm` to −16 LUFS keeps
it consistent with everything else the client watches.

To check the balance, sample RMS **inside a known gap between narration segments** and compare with
a segment's midpoint — it's easy to accidentally sample two points that are both inside speech:

```bash
ffmpeg -ss <gap> -t 4 -i out.mp4 -map 0:a -af astats -f null - 2>&1 | grep -m1 "RMS level"
```

Target roughly 8–10 dB of separation between voice and bed.

---

## Phase 9 — QA gates

Everything here is cheap and all of it caught a real bug at least once.

**Data**
- [ ] Generator re-run produces no diff in existing rows
- [ ] Counts by level / store / flag match the intake table
- [ ] Curated fixtures exist with stable IDs, and score near their targets in a live run

**Workspace**
- [ ] `workspace:check` passes
- [ ] `workspace:apply` against a scratch database creates every entity
- [ ] Active agents match the proposal roster exactly — no leftovers
- [ ] Eval stop-ship cases pass
- [ ] `grep` the whole demo for superseded names and numbers (old agent names, the old threshold,
      old pricing). This is how stale narrative survives a rewrite.

**Reel**
- [ ] Every scene screenshotted at `?scene=N` — no clipping, no collisions
- [ ] Frame-difference check across a scene transition and across the busiest animation shows
      continuous motion, not repeated frames
- [ ] Spot-check frames from the *encoded MP4*, not just the browser
- [ ] Watermark present in every scene

**Audio**
- [ ] No segment overruns (the build enforces this — don't disable it)
- [ ] Voice/bed separation measured in a real gap
- [ ] Duration matches the video exactly

**The last gate: watch it start to finish, with sound, before sending.** Automated checks confirm
frames and levels; only a human confirms it's persuasive.

Frame-difference check, for reference:

```python
from PIL import Image, ImageChops
# extract N consecutive frames with ffmpeg first, then:
diff = ImageChops.difference(cur, prev)
h = diff.histogram(); mean = sum(i*c for i, c in enumerate(h)) / sum(h)
print('DUP' if mean < 0.01 else 'motion')     # a run of DUP during motion = judder
```

---

## Phase 10 — Ship

```bash
cd vocion-demos && git add -A demos/<slug> && git commit      # inside the submodule first
cd .. && git add vocion-demos && git commit -m "chore: bump vocion-demos — <slug> demo"
```

Always commit inside the submodule, then bump the pin from the umbrella. Commit the rendered MP4
and the cached music — they're deliverables, and the cache is what makes re-renders free.

Write a handoff note (see `HANDOFF-retail-hiring.md`) covering: the engagement facts, what was
built, environment state on this machine, next steps in order, gotchas, and the non-negotiables
for anyone extending the prompts. Assume the reader is a fresh agent with no context.

---

## Appendix A — Kickoff prompt

Paste this to the agent doing the next client, with the proposal attached.

> You're building a client demo package in the `vocion-demos` repo. Read
> `docs/CLIENT-DEMO-PLAYBOOK.md` first — it's the full procedure — and use
> `demos/retail-hiring/` as the reference implementation.
>
> The client is **<name>**. The attached proposal, dated <date>, is the **single source of truth**:
> where the platform, older documents, or your instincts disagree with it, the proposal wins.
> Flag any errors you find in it rather than reproducing or silently fixing them.
>
> Deliver, in order:
> 1. The intake table from Phase 1, filled in with page citations, added to the demo's README.
> 2. A workspace under `demos/<slug>/workspace/<slug>/` whose active agents match the proposal's
>    roster exactly, with the client's policies encoded as system-prompt rules and
>    `approvalPolicy.block` entries, plus inactive teasers for the roadmap section.
> 3. A deterministic fixture generator at the client's real volume and composition, including
>    hand-curated rows that reproduce any worked example in the proposal.
> 4. `README.md` (setup + what's real vs placeholder) and `WALKTHROUGH.md` (beats citing proposal
>    pages, fixture cheat sheet, Q&A landmines, known limitations).
> 5. A 10-scene reel in `assets/demo-reel.html` mapped to the proposal's claims, with the faux
>    mouse choreography, rendered via `scripts/record-reel.mjs` with ElevenLabs narration and a
>    generated music bed.
>
> Constraints: keep the timeline in sync across `demo-reel.html`, `record-reel.mjs`, and
> `build-reel-audio.mjs`. All motion goes through the JS tween engine clocked on
> `performance.now()` — never CSS transitions (see Phase 7 for why). Never commit an API key.
> Never invent a name for a person the proposal leaves unnamed. Run every Phase 9 gate and report
> the results. Then tell me what you'd want a human to verify before this goes to the client.

## Appendix B — Command reference

```bash
# fixtures
node scripts/generate-applicants.mjs

# workspace
npm run workspace:check          # from vocion-core/packages/core, with WORKSPACE_PATH + DATABASE_URL
npm run workspace:apply

# reel
node scripts/record-reel.mjs                  # frames → mp4, with narration + music
node scripts/record-reel.mjs --silent         # no audio (non-macOS, no key)
REEL_MUSIC_REGEN=1 node scripts/record-reel.mjs   # regenerate the music bed
node scripts/build-reel-audio.mjs /tmp/a.wav 151.8   # audio only, for tuning
open 'assets/demo-reel.html?scene=4'          # debug one scene

# dev
./scripts/dev.sh                              # the demo app
lsof -ti :3000,:3001,:3002,:3003 | xargs kill  # stop dev servers
```

Prerequisites: Node ≥20, `npm i --no-save playwright@1.62.1` at the `vocion-demos` root (plus its
chromium), `ffmpeg`/`ffprobe` on PATH, Docker for Postgres, `ELEVENLABS_API_KEY` for audio,
`OPENAI_API_KEY` for source sync.

## Appendix C — Gotcha registry

| Symptom | Cause | Fix |
|---|---|---|
| Video flickers / strobes | Playwright `recordVideo` screencasts ~24 fps VFR; resampling to 30 duplicates frames | Frame-step a virtual clock and assemble with ffmpeg |
| Nothing animates in the render | CSS transitions run on the compositor, which the virtual clock doesn't drive | Move all motion to the JS tween engine |
| Old scenes pile up, ghosting | Tweens clocked off the rAF timestamp, which drifts under virtual time | Clock off `performance.now()` |
| Narration talks over a cut | Timeline changed in one file only | Sync `demo-reel.html`, `record-reel.mjs`, `build-reel-audio.mjs` |
| `workspace:check` fails on env | It boots the full config, even dry | Set `DATABASE_URL`, even to a dead address |
| Fixtures not found on sync | `fileImport` resolves paths relative to `WORKSPACE_PATH` | Keep `data/` inside `workspace/<slug>/` |
| Second demo won't seed | `seed:demo` keys on user email, exits 0 if present | Give every demo its own database |
| Port 5432 conflict | `npm run dev` starts an embedded PGlite server | Always use `dev:next` |
| Music feels somber | Ambient prompts drift melancholy | Specify upbeat, major key, and a BPM |
| Cost tracking shows nothing | Agent model IDs don't match the pinned core's defaults | Pin agents to the core's default model |
| Stale narrative survives a rewrite | Old names/numbers hide in prompts, evals, learnings, README | `grep` the whole demo for superseded terms |

## Appendix D — Non-negotiables to carry into any client

These are Retail Hiring Workforce's, and the *shape* generalizes even when the content doesn't. Extract the
equivalent list from each new proposal and treat it as inviolable across every prompt, fixture,
caption, and narration line:

- Nothing is ever auto-rejected. Below-threshold means held, with the reason recorded, visible and
  recoverable by a human.
- The sensitive-answer flag never changes a score and never removes anyone — it routes to the
  person who owns that decision.
- Work history in a context the client's policy excludes is *experience*, not a violation.
- Job-related criteria only. Personal attributes are never scored or mentioned.
- Missing information is "unknown," collected in one follow-up, never assumed worst-case.
- The same standard applies at every location and from every source.
- People make every consequential decision. Changes to the standard are *proposed* and inert until
  a human approves them.
- Never invent a name for someone the proposal leaves unnamed.
