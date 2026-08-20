# Down to Earth — Hiring Workforce

**Prospect demo · L2 (score → route → approve) · Retail hiring**
> Two AI coworkers — the **Applicant Screener** and the **Store Router** — read every applicant from Indeed and the website, score them 1–100 against Down to Earth's own standard, and route qualified candidates (70+) to the right store manager by email. A human approves every step; managers make every hiring decision. Below-threshold applicants are held with the reason recorded — never auto-rejected.

This is the demo instance behind the **Aug 2026 "AI Hiring Workforce" proposal** to Down to Earth Organic & Natural (Hawaii's plant-based grocery + deli chain since 1977 — six stores, <300 team members, ~60 applicants/month, ~20 hires; $1,500/mo all-in on the 24-month term). It implements the two coworkers from proposal p.3 and the applicant trace from p.4, on synthetic data at their real volume, plus the p.13 Agent Registry as inactive teasers. **See `WALKTHROUGH.md` for the presentation script.**

Everything applicant- or manager-shaped in here is an invented fixture. The scoring criteria are demo baselines pending Amy's real job descriptions.

## What's in this demo

**Prefer a video?** `assets/dte-hiring-demo.mp4` is a ~3-minute headlessly-rendered walkthrough reel with voiceover and a synthesized music bed (stylized "illustrative interface," watermarked, all data synthetic) — the send-ahead / leave-behind companion to the live demo. Source is `assets/demo-reel.html`; regenerate with `node scripts/record-reel.mjs` (needs playwright + ffmpeg; narration uses macOS `say`, so pass `--silent` elsewhere). Frames render deterministically against a stepped virtual clock, so the output is smooth 30fps regardless of machine load. Narration text and the music synth live in `scripts/build-reel-audio.mjs` — for a nicer voice, download a Premium voice in System Settings → Spoken Content and change `VOICE`.

```
demos/down-to-earth/
├── WALKTHROUGH.md                             # the demo script — read this
├── assets/
│   ├── dte-hiring-demo.mp4                    # rendered reel (VO + music)
│   └── demo-reel.html                         # reel source (auto-playing timeline)
├── workspace/down-to-earth/                   # v2 core: "workspace", was "context"
│   ├── workspace.yaml                         # tenant manifest
│   ├── agents/
│   │   ├── applicant-screener.*               #   reads · scores · explains · follows up
│   │   ├── store-router.*                     #   right store · right manager · chain-wide view
│   │   └── onboarding-guide / certifications-policy / performance-coaching /
│   │       sourcing-agent / sop-assistant / scheduling-support /
│   │       vendor-communications              # inactive — the p.13 Agent Registry teasers
│   ├── operations/                            # review_application · score_candidate ·
│   │                                          # route_candidate⁺ · draft_candidate_followup⁺ ·
│   │                                          # pipeline_report      (⁺ = requiresApproval)
│   ├── workflows/applicant-intake/            # read → score → route → APPROVE → send (stub)
│   ├── objects/{applicant,role}/              # the two business objects
│   ├── playbooks/
│   │   ├── hiring-standards/                  # plant-based on-property · smoking→CEO flag ·
│   │   │                                      # fairness rules — the discovery-call policies
│   │   ├── scoring-rubric/                    # criteria per level · THRESHOLD 70 · learning loop
│   │   ├── store-directory/                   # six stores + FIXTURE routing table
│   │   ├── brand-voice/                       # tone for applicant-facing drafts
│   │   └── product-standards/                 # company standards background
│   ├── sources/
│   │   ├── indeed.yaml                        # file-import fixture, 43 applications
│   │   ├── careers-website.yaml               # file-import fixture, 20 applications
│   │   └── downtoearth-web.yaml               # public site crawl (manual sync)
│   ├── learnings/                             # hiring_global rules + score_candidate refinements
│   │                                          # (incl. the proposal's approved shift-work change)
│   ├── evals/candidate-scoring-baseline.yaml  # 8 cases; 3 marked stop-ship
│   └── data/applicants-{indeed,website}.jsonl # generated fixtures (committed)
├── scripts/
│   ├── dev.sh                                 # → http://localhost:3003 (exports WORKSPACE_PATH)
│   ├── generate-applicants.mjs                # deterministic fixture generator
│   ├── record-reel.mjs                        # virtual-time frame renderer → mp4
│   └── build-reel-audio.mjs                   # narration (say) + synth music bed
└── .env.example
```

### The three rules the whole build hangs on

1. **Nothing is ever auto-rejected.** Below-70 applicants are *held from routing* — visible in the portal with the reason recorded, recoverable by a human, with 60–69 near-misses called out for a second look. Declines are human decisions delivered by humans.
2. **Smoking/vaping is a flag, never a filter.** Yes (or blank) on the application's question attaches "CEO approval required per policy" — score unchanged, manager still sees them. Per Amy: the CEO reserves this call and almost always approves.
3. **Job-related criteria only, identically everywhere.** Same rubric at every store from every source; personal attributes never scored or mentioned; missing info is collected by one follow-up email, not penalized; work history in meat/fish contexts is *experience*, not a policy problem.

The eval baseline (`evals/candidate-scoring-baseline.yaml`) exists to catch regressions on exactly these — cases 3, 6, and 8 are marked stop-ship.

### The three curated fixtures

`APP-IN-041/042/043` (Marisol Torres, Keone Nakamura, Jonah Silva — all Deli Clerk · Kailua) are hand-authored to reproduce the proposal's p.4 applicant trace and p.5 manager-inbox shortlist (target scores ≈88 / ≈81 / ≈74). Run them through `Applicant Intake` when you want the live demo to land exactly on the numbers Amy saw in the doc.

## Setup

Prereqs: umbrella Postgres up (`docker compose up -d` from `vocion-local/`), core deps installed (`cd vocion-demos/vocion-core && npm install`), and `OPENAI_API_KEY` in the umbrella `.env` (source sync embeds via OpenAI — the fixtures don't bake embeddings).

> The pinned core is **v2.x**: the context system is now called **workspaces** — `workspace.yaml`, `WORKSPACE_PATH`, and `npm run workspace:check|apply` (formerly `context.yaml`, `CONTEXT_PATH`, `context:*`). `dev.sh` exports the right variable already.

**1. Create the database** (own DB — `seed:demo` keys on user email, so demos can't share):

```bash
docker exec vocion-postgres psql -U postgres -d postgres -c 'CREATE DATABASE vocion_dte'
docker exec vocion-postgres psql -U postgres -d vocion_dte -c 'CREATE EXTENSION IF NOT EXISTS vector'
```

(On a fresh volume `docker/postgres-init.sh` creates it automatically.)

**2. Env, migrate, seed:**

```bash
cd demos/down-to-earth
cp .env.example .env.local        # set AUTH_SECRET (reuse vocion-local/.bootstrap-secret)

cd ../../vocion-core/packages/core
export DATABASE_URL=postgresql://postgres:postgres@127.0.0.1:5432/vocion_dte
npm run db:migrate
npm run seed:demo -- \
  --email dte@example.com --password demo123 --name "DTE Demo" \
  --account-name "Down to Earth" \
  --project-slug down-to-earth --project-name "Down to Earth Organic & Natural"
```

**3. Apply the workspace:**

```bash
export WORKSPACE_PATH=/private/var/www/vocion-local/vocion-demos/demos/down-to-earth/workspace/down-to-earth
npm run workspace:check    # dry run — validates everything
npm run workspace:apply
```

**4. Run + sync:**

```bash
cd ../../../demos/down-to-earth
./scripts/dev.sh          # → http://localhost:3003 (sign-in autofills dte@example.com/demo123)
```

Then from `/dashboard/sources`, sync `Indeed` and `Careers — Join our Team` (needs the OpenAI key). Optionally sync `downtoearth.org`.

**5. Pre-load the review queue** (so the demo doesn't open on an empty page): run the `Applicant Intake` workflow two or three times from `/dashboard/workflows`, pasting `body` values from `workspace/down-to-earth/data/applicants-indeed.jsonl` — start with the curated `APP-IN-041` (the proposal's own trace), then the WALKTHROUGH cheat sheet. Leave them unapproved.

Regenerate fixtures anytime with `node scripts/generate-applicants.mjs` (deterministic — same seed, same output; the three curated rows are appended after the 40 generated Indeed rows).

## What's placeholder vs. what's the pitch

| Real (the pitch) | Placeholder (replaced in setup weeks 1–2) |
|---|---|
| The pipeline: read → score → route → human approve | Rubric criteria + weights (pending Amy's job descriptions) |
| The policy encoding: smoking flag, plant-based ack, held-not-rejected | The 70 threshold (from the Aug proposal — confirm at the criteria sessions) |
| One standard across six stores + corporate visibility | Manager names/emails (synthetic fixtures) |
| The learning loop: decisions → proposed change → corporate approves | Application wording for the plant-based question (open item #7) |
| Applicant volume (~60/mo, matches the call; 150/mo included) | The applicants themselves (generated) |

Open items from the data room that touch this demo: job descriptions + level qualifications (feeds the rubric) · exact application wording · HR manager + CEO names (never used here — kept unnamed on purpose) · "send to manager" email is a v1 stub · ADP export is out-of-band (triggered on hire, never a write into ADP).

## Notes

- Models pin to `claude-sonnet-4-6` to match the pinned core's defaults so `libs/pricing.ts` resolves cost.
- Fixture data paths in the source YAMLs are relative to `WORKSPACE_PATH` (that's how `libs/sources/fileImport.ts` resolves them) — hence `data/` living *inside* `workspace/down-to-earth/`.
- This demo is for the live Metacto ↔ Down to Earth engagement (data room: `clients/down-to-earth/`). Fixture names are invented; no real applicant or employee data anywhere.
