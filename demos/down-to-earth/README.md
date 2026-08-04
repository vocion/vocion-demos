# Down to Earth — Hiring Workforce

**Prospect demo · L2 (score → route → approve) · Retail hiring**
> Every applicant from Indeed and the website read, scored 1–100 against the role criteria, and routed to the right store and manager — a human approving every step. Managers always make the hiring decision.

This is the demo instance behind the **Jul 2026 Hiring Workforce proposal** to Down to Earth Organic & Natural (Hawaii's plant-based grocery + deli chain since 1977 — six stores, <300 team members, ~60 applicants/month, ~20 hires). It implements the five agents from proposal p.5 and the pipeline from p.2/p.6, on synthetic data at their real volume. **See `WALKTHROUGH.md` for the presentation script.**

Everything applicant- or manager-shaped in here is an invented fixture. The scoring criteria are demo baselines pending Amy's real job descriptions.

## What's in this demo

**Prefer a video?** `assets/dte-hiring-demo.mp4` is a 2.5-minute headlessly-rendered walkthrough reel (stylized "illustrative interface," watermarked, all data synthetic) — the send-ahead / leave-behind companion to the live demo. Source is `assets/demo-reel.html`; regenerate with `node scripts/record-reel.mjs` (needs playwright + ffmpeg).

```
demos/down-to-earth/
├── WALKTHROUGH.md                             # the demo script — read this
├── assets/
│   ├── dte-hiring-demo.mp4                    # rendered 2.5-min walkthrough reel
│   └── demo-reel.html                         # reel source (auto-playing timeline)
├── context/down-to-earth/
│   ├── context.yaml                           # tenant manifest
│   ├── agents/                                # the Hiring Workforce (active)
│   │   ├── resume-review.*                    #   reads + structures every application
│   │   ├── candidate-scoring.*                #   1–100 vs the rubric, explains why
│   │   ├── store-routing.*                    #   right store/manager, drafts the email
│   │   ├── hiring-coordinator.*               #   chases missing info (drafts only)
│   │   ├── hiring-analytics.*                 #   chain-wide pipeline for corporate
│   │   └── store-concierge / lifestyle-editor / guest-feedback   # inactive roadmap teasers
│   ├── operations/                            # review_application · score_candidate ·
│   │                                          # route_candidate⁺ · draft_candidate_followup⁺ ·
│   │                                          # pipeline_report      (⁺ = requiresApproval)
│   ├── workflows/applicant-intake/            # review → score → route → APPROVE → send (stub)
│   ├── objects/{applicant,role}/              # the two business objects
│   ├── playbooks/
│   │   ├── hiring-standards/                  # plant-based on-property · smoking→CEO flag ·
│   │   │                                      # fairness rules — the discovery-call policies
│   │   ├── scoring-rubric/                    # L2/L3/L4 criteria, bands, threshold 50
│   │   ├── store-directory/                   # six stores + FIXTURE routing table
│   │   ├── brand-voice/                       # tone for applicant-facing drafts
│   │   └── product-standards/                 # (guest-facing; used by inactive agents)
│   ├── sources/
│   │   ├── indeed.yaml                        # file-import fixture, ~40 applications
│   │   ├── careers-website.yaml               # file-import fixture, ~20 applications
│   │   └── downtoearth-web.yaml               # public site crawl (manual sync)
│   ├── learnings/                             # hiring_global rules + score_candidate refinements
│   ├── evals/candidate-scoring-baseline.yaml  # 8 cases; 3 marked stop-ship
│   └── data/applicants-{indeed,website}.jsonl # generated fixtures (committed)
├── scripts/
│   ├── dev.sh                                 # → http://localhost:3003
│   ├── generate-applicants.mjs                # deterministic fixture generator
│   └── record-reel.mjs                        # headless Playwright → mp4 renderer
└── .env.example
```

### The three rules the whole build hangs on

1. **Nothing is ever auto-rejected.** Below-50 applicants are *held from routing* — visible in the portal, recoverable by a human. Declines are human decisions delivered by humans.
2. **Smoking/vaping is a flag, never a filter.** Yes (or blank) on the application's question attaches "CEO approval required per policy" — score unchanged, manager still sees them. Per Amy: the CEO reserves this call and almost always approves.
3. **Job-related criteria only, identically everywhere.** Same rubric at every store from every source; personal attributes never scored or mentioned; missing info is collected, not penalized; work history in meat/fish contexts is *experience*, not a policy problem.

The eval baseline (`evals/candidate-scoring-baseline.yaml`) exists to catch regressions on exactly these — cases 3, 6, and 8 are marked stop-ship.

## Setup

Prereqs: umbrella Postgres up (`docker compose up -d` from `vocion-local/`), core deps installed (`cd vocion-demos/vocion-core && npm install`), and `OPENAI_API_KEY` in the umbrella `.env` (source sync embeds via OpenAI — the fixtures don't bake embeddings).

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

**3. Apply the context:**

```bash
export CONTEXT_PATH=/private/var/www/vocion-local/vocion-demos/demos/down-to-earth/context/down-to-earth
npm run context:check    # dry run — validates everything
npm run context:apply
```

**4. Run + sync:**

```bash
cd ../../../demos/down-to-earth
./scripts/dev.sh          # → http://localhost:3003 (sign-in autofills dte@example.com/demo123)
```

Then from `/dashboard/sources`, sync `Indeed` and `Careers — Join our Team` (needs the OpenAI key). Optionally sync `downtoearth.org`.

**5. Pre-load the review queue** (so the demo doesn't open on an empty page): run the `Applicant Intake` workflow two or three times from `/dashboard/workflows`, pasting `body` values from `context/down-to-earth/data/applicants-indeed.jsonl` — the WALKTHROUGH cheat sheet says which rows to pick. Leave them unapproved.

Regenerate fixtures anytime with `node scripts/generate-applicants.mjs` (deterministic — same seed, same output).

## What's placeholder vs. what's the pitch

| Real (the pitch) | Placeholder (replaced in deployment weeks 1–3) |
|---|---|
| The pipeline: read → score → route → human approve | Rubric criteria + weights (pending Amy's job descriptions) |
| The policy encoding: smoking flag, plant-based ack, held-not-rejected | The ~50 threshold (Chris's call-proposal number, to confirm) |
| One standard across six stores + corporate visibility | Manager names/emails (synthetic fixtures) |
| The trust model: Drafted → Approved → Autonomous | Application wording for the plant-based question (open item #7) |
| Applicant volume (~60/mo, matches the call) | The applicants themselves (generated) |

Open items from the data room that touch this demo: job descriptions + level qualifications (feeds the rubric) · exact application wording · HR manager + CEO names (never used here — kept unnamed on purpose) · "send to manager" email is a v1 stub.

## Notes

- Models pin to `claude-sonnet-4-6` to match the pinned core's defaults so `libs/pricing.ts` resolves cost.
- Fixture data paths in the source YAMLs are relative to `CONTEXT_PATH` (that's how `fileImport.ts` resolves them) — hence `data/` living *inside* `context/down-to-earth/`. The support-reply demo's `./data/tickets.jsonl` at demo root doesn't resolve under this rule — flagged separately.
- This demo is for the live Metacto ↔ Down to Earth engagement (data room: `clients/down-to-earth/`). Fixture names are invented; no real applicant or employee data anywhere.
