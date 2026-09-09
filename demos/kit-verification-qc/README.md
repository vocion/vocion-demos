# Kit Verification QC

**Manufacturing QC (kit verification) with human-approved holds**
> Two AI coworkers — the **Pack Inspector** and the **Quality Analyst** — verify every pack-station photo against verified-good photos of the same kit (reference-based matching, no per-kit programming), explain any miss by the outline printed on the silhouette sheet, and hold the kit for a person. A person decides every hold, release and rework; every override is filed back as a training example. Nothing ships or is scrapped on a model's say-so.

Built for a manufacturing QC prospect's sample pack of 72 photos (two kits, Good/Bad), after an initial discovery call. **Presentation script: `WALKTHROUGH.md`.**

| | |
|---|---|
| URL | http://localhost:3004 — `kitqc@example.com / demo123` |
| Port / DB | `3004` / `vocion_kit_verification_qc` on the umbrella Postgres |
| Core | the **umbrella** `vocion-local/vocion-core` checkout on `main` (≥ `9434b98`, the s3 connector + vision tools + qc actions) — not the demos-pinned core. `scripts/dev.sh` picks it automatically; override with `VOCION_CORE_DIR`. |
| AWS | live, profile `metacto`, `us-east-1`, all tagged `Project=kitqc-demo TearDown=true` — see `aws/TEARDOWN.md` |

## What the demo does

```
pack-station photo ──▶ S3 (templates/<kit>/{good,bad}/, inbox/)
                          │  `kit-photos` source (kind: s3) → 72 documents, image_url
                          ▼
   Pack Inspector ── vision_compare_reference ──▶ Claude vision: candidate vs 2 verified-good
                  ── vision_detect_labels ──────▶ Rekognition Custom Labels (second opinion)
                          │  upserts the `inspection` object (verdict, findings, explanation)
                          ▼
   propose_action → qc.hold / qc.request_rework ──▶ Review (card shows the photo) ──▶ a person decides
                                                                        │ override
   Quality Analyst ── dataset.add_example ──▶ S3 templates/<kit>/<good|bad>/   (the standard learns)
```

### Results on the manufacturer's sample pack (reference comparison, live)

`npm run kit:inspect -- --project kit-verification-qc --prefix templates/<kit>/bad/` (from `vocion-core`):

| Set | Photos | Verdict matched the manufacturer's label | Typical confidence |
|---|---|---|---|
| C-PM-134-PC · bad (staged) | 5 | 5 / 5 held | 0.72–0.82 |
| C-VS-1012-INUT-2-H · bad (staged) | 4 | 4 / 4 held | 0.72–0.82 |
| Good (2 sampled) | 2 | 2 / 2 passed | 0.82 |

Run of 2026-09-02: **11 / 11 verdicts agreed with the manufacturer's labels** (9 bad held, 2 good passed). Re-run `kit:inspect` to refresh; live-model variance of ±0.1 confidence is normal.

What it gets right: the bracket pair, extrusion count, grille orientation and hardware-bag regions are named as printed on the sheet. What it is honest about: fastener boxes at 4K-over-36-inches come back **unreadable → hand-check** rather than a guessed count. The 72 seeded rows carry the manufacturer's own labels as the *shadow-mode baseline* (`source: labelled_history`); rows the tool has actually checked are `source: model`.

## What's in here

```
demos/kit-verification-qc/
├── WALKTHROUGH.md                    # the presentation script — read this
├── research/                         # AWS AutoML notes
├── aws/                              # TEARDOWN.md, start-model.sh, stop-model.sh, teardown.sh
├── data/images/{good,bad}/<kit>/     # the sample pack (72 × 4K JPG) + index.jsonl
├── scripts/
│   ├── dev.sh                        # → :3004 on the umbrella core (WORKSPACE_PATH exported)
│   └── seed-inspections.py           # kit-template + inspection objects from index.jsonl (SQL → psql)
└── workspace/kit-verification-qc/
    ├── workspace.yaml
    ├── agents/                       # pack-inspector, quality-analyst (+ 5 inactive roadmap teasers)
    ├── skills/                       # verify-kit · explain-hold · quality-trends · propose-training-example
    ├── playbooks/                    # inspection-standard · hold-policy · template-directory · rework-voice
    ├── objects/                      # inspection · kit-template
    ├── sources/                      # kit-photos (s3) · kitqc-web (crawl, manual)
    ├── workflows/kit-intake/         # sync → approve
    ├── learnings/                    # global rules incl. the Rev B bracket override (worked example)
    ├── evals/                        # 6 cases, 4 stop-ship
    ├── trust.yaml                    # qc.* autonomy ladder — all disabled
    └── pages/                        # command-center · analyze · inspection-queue · template-registry ·
                                      # agent-registry · kit-photos · tour.yaml · components/ (VisionEngines, AnalyzeQueue)
```

### Core features this demo drove (all on vocion-core `main`)

`kind: s3` source connector · `/api/v1/s3/object` presigned image route · `/api/v1/vision/model` classifier start/stop · `/api/v1/objects/[id]/analyze` + `finding-feedback` · `vision_compare_reference` + `vision_detect_labels` tools (granted via `harness.grantTools`) · `qc.hold` / `qc.release` / `qc.request_rework` / `dataset.add_example` actions · review-card content kind `image` · `metadata.image_url` rendering on object detail · `format: image` on workspace pages · `npm run kit:inspect` CLI.

## Bring it up

```bash
# 0. AWS (already created; see aws/TEARDOWN.md). Model endpoint is optional and costs ~$4/hr while running:
./aws/start-model.sh            # before a demo      ./aws/stop-model.sh   # after

# 1. Postgres + DB
cd vocion-local && docker compose up -d
docker exec vocion-postgres psql -U postgres -d postgres -c 'CREATE DATABASE vocion_kit_verification_qc'
docker exec vocion-postgres psql -U postgres -d vocion_kit_verification_qc -c 'CREATE EXTENSION IF NOT EXISTS vector'

# 2. Env (AUTH_SECRET from vocion-local/.bootstrap-secret; AWS_PROFILE=metacto; KITQC_* as in .env.example)
cp demos/kit-verification-qc/.env.example demos/kit-verification-qc/.env.local

# 3. Migrate + seed user, apply workspace (umbrella core, org = the seeded project id)
cd vocion-local/vocion-core/packages/core
export DATABASE_URL=postgresql://postgres:postgres@127.0.0.1:5432/vocion_kit_verification_qc
npm run db:migrate
npm run seed:demo -- --email kitqc@example.com --password demo123 --name "Kit Verification QC Demo" --account-name "Kit Verification QC" --project-slug kit-verification-qc --project-name "Kit Verification QC"
export WORKSPACE_PATH=$(cd ../../../vocion-demos/demos/kit-verification-qc/workspace/kit-verification-qc && pwd)
npm run workspace:check && npm run workspace:apply -- --org <project id printed by seed:demo>

# 4. Seed the sample-pack baseline, sync the photos (needs OPENAI_API_KEY for embeddings)
python3 ../../../vocion-demos/demos/kit-verification-qc/scripts/seed-inspections.py --org <project id> --bucket metacto-kitqc-demo-<aws-account-id> | docker exec -i vocion-postgres psql -U postgres -d vocion_kit_verification_qc -q
npm run sync:source -- --project kit-verification-qc --source kit-photos --full

# 5. Pre-run the staged bad kits so Held Kits isn't empty (~25 s each; needs ANTHROPIC_API_KEY + AWS creds)
npm run kit:inspect -- --project kit-verification-qc --prefix templates/C-PM-134-PC/bad/
npm run kit:inspect -- --project kit-verification-qc --prefix templates/C-VS-1012-INUT-2-H/bad/

# 6. Run
cd ../../../vocion-demos/demos/kit-verification-qc && ./scripts/dev.sh     # → http://localhost:3004
```

## What the discovery call surfaced (Phase 1 intake)

| Field | From the initial discovery call |
|---|---|
| Agent roster | Not in a proposal yet — this demo proposes two: Pack Inspector, Quality Analyst |
| The decision rule | Pass only if every printed region matches; else Hold. Threshold 0.90 (demo default) |
| Guardrails | Hold is never a rejection; no zero-defect promise; never name the existing camera vendor; never claim it can be retrained via API |
| Untouched systems | The existing vision camera stays; ERP unnamed ("your system of record"); no edge appliance |
| Volume | ~2,000 kit SKUs; ~1 complaint/day, ≥ half kit-related; 300–400 silhouettes cover ~80 % of hours |
| Worked example | The staged short-screw kit (C-PM-134-PC) and face-down grilles (C-VS-1012-INUT-2-H) from the sample pack |
| Learning story | Line-lead override → learning + training example, person-approved (Rev B bracket seeded) |
| Roadmap | Rework Router, Supplier Quality, Shift Report Writer, Camera Health Monitor, Template Author |
| Commercials | A phased structure: a fixed-fee proof of concept, a capped launch phase, then a monthly ongoing fee — quote nothing else |

Open questions to ask on the walkthrough: silhouettes from CAD or hand-drawn (highest value); cycle time; station count and sites; bagged vs loose fasteners; who the economic buyer is.

## Caveats, stated up front

- Bad photos were all staged at a **secondary** station; Good photos are all primary. A classifier can learn the station. The reference comparison carries the verdict; Rekognition is the second opinion and is off between demos.
- Whole-image labels only. Region findings come from the vision comparison, not trained detection.
- No S3-event trigger; photos arrive by manual sync. Rework "send" is recorded, not delivered.
- Synthetic/sample data only: this repo carries only the sample pack of photos, no other prospect data.
