# Havis kit verification — from demo to production on AWS

**Project plan · draft 1 · 2026-09-02 · for Chris, then Joe**

The demo running on :3004 proves the shape: a pack-station photo is verified against verified-good photos of the same kit, a person decides every hold, and every override teaches the standard. This plan is how that becomes a production system on AWS without an edge appliance, in the gated structure the technical brief already carries ($28K proof → $120K launch NTE → $20K/mo → $15K completion incentive).

---

## 0. What the demo is (so the plan names it honestly)

| Piece | What runs today | Where |
|---|---|---|
| Verdict engine | **Claude Vision** (`claude-sonnet-4-6` via the Anthropic API): candidate photo + two verified-good references → per-region findings, boxes, verdict, confidence | inside Vocion's `vision_compare_reference` tool |
| Second opinion | **Amazon Rekognition Custom Labels**: whole-image classifier, 4 labels (`<kit>_good` / `<kit>_bad`), trained on 64 photos, tested on 8 | project `havis-kit-condition`, us-east-1 |
| Photos | **Amazon S3** `templates/<kit>/{good,bad}/`, `inbox/` | bucket `metacto-havis-demo-…` |
| Records, review, learning | Vocion: `inspection` objects, `qc.*` gated actions, finding feedback → learning candidates, tool-call audit | vocion-core `main` |

Result on Joe's sample pack: 11/11 verdicts agreed with his labels (9 staged bad held, 2 good passed), ~20 s per photo, about $0.04 per check. Caveats that shape the plan: fastener counts come back "unreadable" at 4K-over-36-inches; all Bad photos were staged at a second station; whole-image labels only.

## 1. Architecture for production (all-AWS, no edge appliance)

```
station capture program ──▶ S3 inbox/<site>/<station>/            (Joe's program writes; or Storage Gateway VM)
        │ S3 event → EventBridge
        ▼
   Verification service (Lambda or Fargate) ── registration (find the sheet, de-skew, crop regions)
        │                                      ├─▶ SageMaker endpoint: per-region presence + count model
        │                                      ├─▶ Claude Vision: long-tail kits (no trained model yet) + explanation
        │                                      └─▶ Rekognition Custom Labels: whole-kit sanity label (optional)
        ▼
   Vocion (ECS/Fargate + RDS Postgres): inspection record, hold/release/rework, learning loop, dashboards
        │ verdict → station browser (WebSocket API) in 2–4 s
        ▼
   Approved overrides → S3 training prefixes → SageMaker Pipelines retrain (weekly) → model registry → endpoint
```

**Why this split.** Havis has ~2,000 kits and ~400 silhouettes covering ~80% of assembly hours. A per-kit trained model reproduces the per-kit programming wall Joe is trying to escape — that is the data room's finding on Rekognition Custom Labels and Lookout for Vision alike. So:

- **Claude Vision** carries the long tail and the explanation. Enrol a kit with one good photo and it works the same day. Cost scales with volume (~$0.04/check), so it is the right engine for low-volume kits and for *explaining* a hold in plain English on any kit.
- **A trained detector** (SageMaker, custom) carries the high-volume 400. Trained on Havis's own thousands of good images per kit plus complaint-linked negatives, it does the two things vision-language models do badly at this resolution: **fastener counts** and **sub-second, near-zero marginal cost** verdicts. Crop-before-count is the design rule: a quarter-inch screw head is ~28 px; cropped to its box it is countable.
- **Rekognition Custom Labels** stays as an optional whole-kit sanity label where a family of kits shares a sheet. It trains per label set, so it never becomes the primary engine.

## 2. Stages

### Stage 0 — Proof (this week → Fri 2026-09-04) · in hand
The demo above, run live for Joe. Deliverable: the walkthrough, the 11/11 result, this plan. Ask on the call: CAD-derived silhouettes? cycle time? station count/sites? bagged vs loose fasteners? who owns it in IT?

### Stage 1 — Shadow mode (weeks 1–6) · $28K proof
Goal: a **measured baseline** where today there is an estimate, with nothing gating a shipment.

| Workstream | What ships | Exit |
|---|---|---|
| Ingest | Station program (or Storage Gateway) uploads every photo to S3 `inbox/`; EventBridge → verification Lambda; Vocion `kit-photos` source becomes event-driven (core C5) | 100% of Warminster photos land within 10 s |
| Verify | Claude Vision reference comparison on every photo for the enrolled kits (start: the ~400 silhouettes, enrolled from existing good photos — one each) | Verdict + regions on every photo; p95 latency measured on the Warminster link |
| Baseline | Verdicts recorded, **not shown at the station**. Join to serial → complaints. Weekly report: hold rate by kit/station/shift; agreement with complaints | The number Havis does not have today: true kit-defect rate and where it concentrates |
| Data | Every Bad from complaints + every human-confirmed hold flows to `templates/<kit>/bad/`; every confirmed pass sampled to `good/` (via `dataset.add_example`) | Labelled set > 2,000 images incl. ≥ 200 real negatives |
| Vocion | Production tenant on AWS (Fargate + RDS + pgvector), SSO for Havis IT, roles: line lead / quality / admin; **Models page** (Rekognition/SageMaker status, F1, training runs — the visibility gap named on 2026-09-02) | Havis IT can run it: runbook, alerts, backups |
| Model R&D (parallel) | Registration (sheet detection, de-skew) + per-region crop pipeline; first detector trained on the 20 highest-volume kits; measured against shadow-mode holds | Detector precision/recall per region on held-out real photos |

### Stage 2 — Launch (weeks 7–18) · $120K NTE
Goal: verdicts at the station, people deciding holds, the loop closed.

| Workstream | What ships | Exit |
|---|---|---|
| Station UX | Verdict back to the station browser over WebSocket in 2–4 s: pass / hold with the region highlighted on their photo; re-photo prompt for unreadable | Assemblers use it without training beyond a one-pager |
| Engines | Detector on the top ~400 kits (hybrid: detector for presence/count, Claude Vision for explanation + long tail); Rekognition sanity label optional | Hold precision ≥ 90% on detector kits; every hold explained in plain English |
| Review | Vocion review queue for line leads; rework routing (the Rework Router agent, first roadmap teaser); shift report | Median hold-to-decision < 10 min |
| Learning | Approved overrides → training set → **weekly SageMaker Pipelines retrain** → model registry → canary endpoint → promote; learning candidates → adopted rules for the explanation layer | Retrain is a button a quality lead presses, with before/after metrics on the Models page |
| Ops | IAM least privilege, KMS, CloudWatch alarms, cost dashboard; endpoint schedule follows shifts (serverless inference or scheduled GPU per the brief) | Run cost inside the brief's $215–790/month band for one site |

### Stage 3 — Scale (month 5+) · $20K/mo
Second Warminster line, additional sites (Vanner, Pro-gard, UK), template authoring from CAD/BOM for the long tail (Template Author agent), supplier-quality join, edge inference (SageMaker Edge Manager + IoT Greengrass) only if a line's cycle time demands sub-second.

## 3. AWS services and their roles

| Service | Role | Stage | Notes |
|---|---|---|---|
| S3 | Photos, training prefixes, model artifacts | 0–3 | Lifecycle: inbox → 90-day IA; training set retained |
| EventBridge + Lambda | Photo arrived → verify → write record | 1 | Lambda for the Claude Vision path (I/O bound); Fargate if the detector runs in-process |
| SageMaker (training, Pipelines, endpoints, model registry) | The trained detector and its retrain loop | 1 (R&D) → 2 | Serverless inference for low volume; scheduled GPU endpoint if the CPU design misses latency |
| SageMaker Ground Truth | Box labelling of the first detector set | 1 | Only for the seed set; afterwards labels come from decisions |
| Rekognition Custom Labels | Whole-kit sanity label | 0 → optional | The demo model; ~$4/hr while running |
| API Gateway (WebSocket) | Verdict to the station browser | 2 | Nothing installed on the floor |
| ECS Fargate + RDS Postgres (pgvector) | Vocion | 1 | Containers + Postgres + open formats: portable to Azure if Havis IT insists |
| Cognito or Entra ID federation | SSO | 1 | Havis is a Microsoft shop |
| CloudWatch, KMS, IAM | Ops, encryption, least privilege | 1 | |

**Anthropic API (Claude Vision)** is the one non-AWS dependency. Options: direct API (today), or **Amazon Bedrock** if Havis wants a single AWS bill and data boundary — the tool is provider-agnostic in shape and the switch is a config change in Stage 1.

## 4. Costs to state plainly

| Item | Estimate | Driver |
|---|---|---|
| Claude Vision verdicts | ~$0.04/photo → 1,000 kits/day ≈ $40/day ≈ $1,200/mo | Volume; why the detector takes the high-volume kits in Stage 2 |
| Detector inference | $215–790/mo for one site (brief) | Serverless vs scheduled GPU; Stage 1 decides |
| Rekognition endpoint | ~$4/hr per inference unit | Run only on shift or drop after Stage 1 |
| Retraining | ~$1–5 per weekly run | Data size |
| Vocion hosting | ~$300–600/mo | Fargate + RDS |
| Storage | cents | |

Station count and daily kit volume are assumptions in the brief (8 stations, 1,000 kits/day) and are now load-bearing for cost — replace them with Joe's numbers.

## 5. Risks and how the plan answers them

- **Fastener counts.** Vision-language models can't count 28-px screws reliably → registration + crop + trained detector (Stage 1 R&D). Until then the system says "unreadable — hand-check", never a guessed number.
- **Station confound in the sample.** Bad photos came from a second station → Stage 1 collects real negatives from complaints and confirmed holds before any detector is trusted.
- **Per-kit wall.** Any per-kit authoring dies at 2,000 SKUs → reference enrolment (one photo) for everything; detectors only where volume pays for them.
- **Microsoft shop.** Portable stack; Bedrock or Azure OpenAI-equivalent is a config change; say it before signature.
- **Zero-defect expectation.** Shadow mode produces the baseline; the promise is the capability plus the measured number, stated in every report.
- **Link latency.** Image upload is on the critical path → measure the Warminster link in week 1; Storage Gateway fallback.

## 6. Decisions requested

1. Confirm the hybrid engine plan: Claude Vision for long tail + explanation, trained detector for the top ~400 kits, Rekognition optional.
2. Confirm Stage 1 scope and the $28K proof framing; register the AWS opportunity (MAP) before Stage 1 starts.
3. Approve building the Vocion **Models page** (Rekognition/SageMaker status, training runs, dataset counts) in Stage 1, since visibility into the model was asked for on 2026-09-02.
