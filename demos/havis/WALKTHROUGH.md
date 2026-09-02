# Havis — kit verification: live walkthrough

**Audience:** Joe Alderfer (Sr. Manufacturing Engineer) and whoever he brings from IT/leadership. **Runs on:** http://localhost:3004 (`havis@example.com / demo123`). **Length:** 12–15 minutes. **Before you start:** `./aws/start-model.sh` (10–15 min; optional — the demo works without it), dev server up, sign in, open the Guided demo (▸ button, or any dashboard URL + `?tour=1`).

## The one-sentence frame

> Your stations already take the photo. We verify it against your own good photos of the same kit — no per-kit programming — and hold anything that looks off for a person to decide.

## Beats

| # | Show | Say | Don't |
|---|---|---|---|
| 1 | **Kit Verification** (`/dashboard/p/command-center`) — stats row, table with thumbnails | "Seventy-two photos from your sample pack, two kits. Held means a person hasn't decided; nothing is rejected by a model." Point at *Basis*: labelled history vs model. | Don't call the labelled-history rows model results. They're Joe's labels, backfilled as the shadow-mode baseline. |
| 2 | **Photo Archive** (`/dashboard/p/kit-photos`) | "Straight from your fileshare into a private bucket. Kit id, production order and capture time come from your filenames — we didn't touch the images." | Don't show the bucket console; the point is that Vocion reads their structure as-is. |
| 3 | **Kit Templates** (`/dashboard/p/template-registry`) | "Enrolment is one good photograph. That's how the 2,000-SKU wall goes away." Open C-PM-134-PC: the regions as printed. | Don't promise CAD-derived templates; ask the CAD-vs-hand-drawn question here instead. |
| 4 | **Agents** — Pack Inspector, Quality Analyst | "Two coworkers. What they may never do is a file, not a promise" — show `approvalPolicy.block`. | Don't linger on the five inactive teasers yet. |
| 5 | **Run one live.** Chat with Pack Inspector: *Check the staged bad kits* suggestion, or paste a key from `templates/C-VS-1012-INUT-2-H/bad/`. ~25 s. | Read the findings aloud: region as printed, expected, saw, how sure. Then: "Hold this kit" → it proposes `qc.hold`. | Don't oversell fastener counts. If it says *unreadable — hand-check*, that's the honest answer at 28 px per screw head. |
| 5b | **Open a held kit** (any row on Held Kits — the whole row is the link) | Hover a finding: its region lights up on the photo, numbered to match. "72% is how sure it is about the hold; 65% is how sure it is about that one finding." Click **Disagree** on a finding, type why, Record. | Don't skip the disagree — it's the loop. Say: "that correction is now a proposed rule in Learnings, waiting for a person." |
| 6 | **Held Kits** (`/dashboard/p/inspection-queue`) + **Review** | Open the qc.hold card: the photo, the findings, Confirm hold / Decline. Decline one as a false hold. | — |
| 7 | **The standard learns.** Open **Learnings**: the disagree from 5b is a pending candidate — adopt it. Then chat with Quality Analyst: *File an override as a training example* with the id you just declined. | "Two proposals: a learning for the explanation layer, and the photo filed into the good set — both wait for you. The next training run includes it." Approve `dataset.add_example` → the object is copied in S3, live. | Don't approve `qc.release` on their behalf; a person does. |
| 8 | **Second opinion.** Ask the Inspector for `vision_detect_labels` on the same photo. | If RUNNING: the Rekognition label + confidence. If training/stopped: "the classifier is a second opinion and we turn it off between shifts to control cost." Then the caveat below. | — |
| 9 | **Agent Registry** — the bench | Rework Router, Supplier Quality, Shift Report Writer, Camera Health Monitor, Template Author. "Roadmap, not the proof stage." | — |
| 10 | End card (verbal) | Proof stage → launch (per the brief's gated structure). No hardware. No edge appliance. Everything portable. | Don't quote a price not in the brief. Don't name the existing camera vendor. |

## Before and after each run

- **Reset**: `./scripts/reset-demo.sh` wipes inspections, qc proposals, learning candidates and vision tool calls, then re-seeds the 72-row baseline (all `labelled_history`, no model rows). Add `--live` to replay the reference comparison on the 9 staged bad kits (~4 min, under a dollar) so Held Kits has model verdicts with regions.
- **What's live vs static**: rows with Basis `labelled_history` are Joe's labels; Basis `model` rows came from a real vision call. Running a kit in chat flips its row to `model` in front of the audience.

## Fixture cheat-sheet

| Point | Photo | What it shows |
|---|---|---|
| Missing/short fastener | `templates/C-PM-134-PC/bad/PD610932_SECONDARY_2026-08-28_14-12-57.jpg` | Hold; bracket region flagged, extrusion count; fastener boxes may come back *unreadable* — the honest answer |
| Orientation | `templates/C-VS-1012-INUT-2-H/bad/PD638942_SECONDARY_2026-08-28_14-20-02.jpg` | Grilles face-down → hold with the region named as printed |
| Clean pass | `templates/C-PM-134-PC/good/PD610933_2026-08-14_01-31-31.jpg` | Pass; note hands in frame reported as photo quality, not as a defect |
| Money moment | Decline a hold in Review, then file it as a training example | The override becomes a learning + a training photo, each approved by a person |

## Q&A landmines

- **"Can it retrain our existing camera?"** No. There is no documented headless interface for it. This is an alternative that uses your existing 4K station photos; the camera keeps its value for what it was built for.
- **"Is this zero defects?"** The goal is zero; the promise is the check plus a measured baseline. Shadow mode runs alongside the current process first and gives you the number you don't have today.
- **"Why not just use the managed AWS service?"** We do use one (Rekognition Custom Labels) — as the second opinion. It trains per label set, so on its own it reproduces the per-kit wall. The reference comparison is what scales.
- **"What about screws?"** A quarter-inch screw head is ~28 px in a 4K photo of a 36-inch sheet. The system says *unreadable — hand-check* rather than guessing; crop-before-count is the Stage 1 engineering item.
- **"Our IT is Microsoft."** Every component is portable (containers, Postgres, open formats). AWS is proposed on the co-sell/funding rationale; if IT standardises on Azure we build it there and say so before signature.
- **"What did the model get right on our pack?"** Quote the agreement line from `npm run kit:inspect` in the README — and say the Bad photos were all staged at a second station, so a classifier can learn the station instead of the defect. That's why references, not a classifier, carry the decision.

## Known limitations (say them first)

- Sample pack only: 72 photos, two kits, Bad staged at a secondary station.
- Whole-image labels, no part boxes; the region findings come from the reference comparison, not from trained detection.
- Rework "send" is recorded, not delivered. No S3-event trigger yet — photos are pulled by sync, or inspected on request.
- Live model variance: the same photo can score 0.72 one run and 0.82 the next. Speak confidence in words.
