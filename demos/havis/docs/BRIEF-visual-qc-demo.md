# Havis — Visual QC of package assembly layouts on Vocion

**Solution demo brief · FOR REVIEW · 2026-09-02 · draft 1**

Prospect: Havis Inc. (havis.com) — rugged vehicle mounts, consoles, docking. Assumed
context: a pack station where kits/assemblies are laid out in a box or tray against a
template before shipping. What we know from discovery: **Havis has images organized by
template id, with Good and Bad labelled examples for each template**, and the goal is to
**detect wrong or missing parts in a package assembly layout**.

Everything below is a proposal for Chris to react to. Nothing has been confirmed with
Havis, and no core code has been written.

---

## 1. The story the demo tells

> Every packed assembly is photographed before the box closes. A vision model checks the
> layout against its template. An AI coworker explains any miss in plain English — which
> part, where, how sure — and holds the package for the line lead. A person decides.
> Nothing is reworked, scrapped, or shipped on the model's say-so alone, and every
> override teaches the standard.

Two AI coworkers, mirroring the two jobs on the floor (the playbook rule: roster = the
proposal's roster, no extras):

| Coworker | Does | Never does |
|---|---|---|
| **Pack Inspector** | Reads the pack-station photo, calls the vision model against the template, turns boxes + scores into a verdict + plain-English explanation, holds anything below threshold, drafts the rework note. | Reject, scrap, or release a held package. Retrain a model. |
| **Quality Analyst** | Watches the stream of inspections: pass rate by template / station / shift, recurring misses, drift after a template or supplier change. Proposes template fixes and new training examples from approved overrides. | Change a template or a model without a person approving. |

**The decision rule** (demo default, to be replaced by Havis's number): every required part
detected with confidence ≥ 0.90 → *Pass*, logged. Any required part missing, any
unexpected part, or any part < 0.90 → *Hold* with the reason. 0.80–0.90 is the
"near-miss" band the Analyst tracks. Holds are never auto-rejected; a person releases or
sends to rework.

**The learning story**: a line lead overrides a Hold ("that's the new bracket revision,
it's fine"). The override is recorded as a signal → the Analyst proposes (a) a learning
rule for the explanation layer and (b) that image as a new *Good* training example for
template `T-0417`. Corporate quality approves; the dataset grows; the next training run
includes it. The standard learns, with a human in every step.

## 2. How it presents on Vocion

What the audience sees, screen by screen. Everything here is either core today or a
workspace-authored page.

1. **Sign-in → Command Center** (workspace page, `list` archetype + widgets): inspections
   today, pass rate, holds waiting, near-miss trend by template, top three recurring
   misses. Stats computed from Inspection objects.
2. **Sources**: the S3 image bucket (or, for the demo, a file-import fixture) with
   template folders and Good/Bad labels — "this is your data, we did not touch it."
3. **Agents**: the two coworkers, their skills, their block lists. The "can it auto-reject?"
   answer is a file: `approvalPolicy.block: [release_package, scrap, rework]`.
4. **Run one inspection live** (workflow `pack-inspection`): photo arrives → vision check
   → explain → pass or hold → **approve gate** → rework note drafted (stubbed send). The
   page shows the image with bounding-box overlay, the verdict, the why.
5. **Inspection Queue** (workspace `queue` page embedding the core review queue): the
   held packages, each a review card — image, overlay, "missing: M6 washer ×2 (0.31)",
   approve / release / rework. Approve one live.
6. **Object detail — Inspection #…**: the record with its provenance panel (tool calls,
   proposed actions) — the same agent-activity panel every business object gets.
7. **Chat with the Analyst**: "why did station 3 hold 11 today?" → it queries inspections,
   cites the template change on Tuesday, proposes a fix.
8. **The standard learns**: Learnings page shows the approved override rule + the
   dataset-addition proposal in Review; approve it.
9. **Agent Registry** (inactive teasers, `active: false`): Rework Router, Supplier Quality,
   Shift Report Writer, Camera Health Monitor, Template Author — the roadmap as a screen.
10. **End card**: what it costs, what it touches, what it never does.

Guided tour (`pages/tour.yaml`) sequences 1–9 for a presenter who was not on the call.

## 3. AWS services we integrate with

| Layer | Service | Role in the solution | Demo vs production |
|---|---|---|---|
| Image store | **Amazon S3** | Source of truth for photos: `templates/<id>/good/`, `templates/<id>/bad/`, `inbox/<station>/`. Havis's existing folder structure maps directly. | Demo: a small bucket (or local fixture). Prod: their bucket, read-only role. |
| Labelling | **SageMaker Ground Truth** (or Rekognition's built-in UI) | Turn whole-image Good/Bad into per-part bounding boxes where needed. | Only if the images aren't already box-labelled. |
| Model | **Amazon Rekognition Custom Labels** | AutoML object detection: one project per template family; labels = part names + `wrong_part`. Managed endpoint, JSON boxes + confidence. Trains from ~10 images/label. | Demo: 2–3 templates trained on their samples. Prod: all templates; endpoint start/stop on shift schedule to control inference-hour cost. |
| Model (alt) | **SageMaker Canvas / AutoGluon** | Same job, when Havis wants an owned model artifact (edge deployment, no per-inference-hour billing). | Phase 2+ option, not for the demo. |
| Events | **S3 Event Notifications → EventBridge** | New photo in `inbox/` fires an event that starts a Vocion workflow run. | Demo: manual trigger + a replayed event. |
| Edge (later) | **SageMaker Edge Manager + IoT Greengrass** | Millisecond verdicts at the station if line speed rules out a cloud round-trip. | Roadmap only. Ask about cycle time first. |
| Explanation | Vocion's LLM (Claude), not Bedrock | Turns boxes + scores + the template spec into the plain-English hold reason and the rework note. Claude vision can also look at the crop to describe *what* is there. | Core capability; no AWS dependency. |

Cost signals to carry into Q&A: Rekognition Custom Labels bills training hours and
inference **endpoint** hours (not per image) — running an endpoint 8 h/day is the number
to quote, and a shift schedule is the lever. Ground Truth labelling is per-object.

## 4. What Vocion needs — core extensions (reusable) vs demo implementation

### 4a. Core extensions (vocion-core, land on main, benefit every tenant)

| # | Extension | Why it's core | Shape |
|---|---|---|---|
| C1 | **`s3` source connector** | We have `file-import`, `drive`, `local-files`, `web`; object stores are the next obvious source. Any manufacturing/logistics tenant has one. | `kind: s3` in `libs/sources/`; config `bucket`, `prefix`, `region`, role/creds via the source credential vault; sync lists objects → knowledge documents (or business objects via a mapping) with metadata from the key path (`template_id`, `label`). Images stored by reference (URL), not embedded. |
| C2 | **Image-aware agents** | Agents are text-only today. A vision use case needs Claude to see the image — in chat attachments, in tool inputs, and in review cards. | Multimodal message parts through the harness providers; an `image` attachment type on conversations; image fields render in Review focus cards and object detail. |
| C3 | **`vision.detect` agent tool + connector-backed model registry** | The "call the model" seam should not be baked into a demo. Rekognition today, SageMaker or an on-prem model tomorrow. | Tool in `services/agents/tools/` → provider interface (`rekognition`, later `sagemaker-endpoint`); writes a `tool_call` row with boxes + scores as output. Model/endpoint config lives in the source credential vault under the `s3`/`aws` source. |
| C4 | **Image field type on business objects + overlay rendering** | Objects are title + metadata today. An Inspection is fundamentally a picture with boxes. | `field.type: image` with `boxes` sub-field in the object type schema; object detail and pages render the image with an SVG overlay. |
| C5 | **Inbound event webhook → workflow trigger** | `event_log` and the trigger runner exist; a generic authenticated inbound endpoint (HMAC) for S3/EventBridge payloads is the missing mile. | `/api/v1/events/<source>` with signature verification, mapping to a workspace-declared trigger. |
| C6 | **Domain actions: `qc.hold`, `qc.release`, `qc.request_rework`, `dataset.add_example`** | Gated actions go through `action_run` + the trust ladder — that machinery is core; the *registry entries* are pluggable. | Register in `libs/actions/` behind a "workspace-declared actions" mechanism so tenants can add gated actions without a core PR. `dataset.add_example` writes the approved image + label back to the S3 training prefix. |
| C7 | **Review-card variant for image decisions** | Review focus mode renders one card contract; a vision hold needs image + overlay + the part list, not a text draft. | Card contract v2 already exists (upstream, 2026-09-01); add an `image-verdict` card kind. |

Sequencing: C1 → C3 → C4 make the demo *possible*; C2 and C7 make it *convincing*; C5
and C6 make it *honest* about production. If we time-box, C2 can be faked in the demo
with a pre-rendered crop + text description while the multimodal path lands.

### 4b. Demo / client-specific implementation (vocion-demos/demos/havis/)

Standard playbook deliverables, keyed to *this* use case:

- **Workspace** `workspace/havis/`: two agents + five inactive teasers; playbooks
  `inspection-standard` (threshold, near-miss band, what a Hold means), `template-directory`
  (Havis's template ids → part lists), `hold-policy` (never auto-reject; who releases),
  `rework-voice`; workflow `pack-inspection` (detect → explain → decide → **approve** →
  notify); object types `template`, `part`, `inspection`; sources `pack-station-images`
  (S3 or fixture), `havis-web` (public site crawl for product knowledge); learnings seeded
  with the override worked example; evals with stop-ship cases ("a Good image must never
  Hold", "no Hold without a named part", "confidence never shown as certainty").
- **Pages**: `command-center`, `inspection-queue`, `template-registry`, `agent-registry`,
  plus `pages/components/` for the image-grid and overlay widgets (workspace component
  registry — no core change needed for demo-only UI).
- **Model**: a Rekognition Custom Labels project trained on 2–3 of Havis's templates from
  their Good/Bad sets. If images are whole-image labelled only, we box ~30–50 per template
  in the Rekognition UI. Record F1 per label in the README; the demo quotes it.
- **Fixtures**: an `inspections.jsonl` index over their sample images (or synthetic
  renders if they can't share), deterministic, with curated rows that reproduce the
  worked example. Every edge case the walkthrough needs exists by construction: one
  missing part, one wrong part, one near-miss, one new-revision false Hold.
- **Walkthrough + reel**: per playbook Phases 6–7; scenes map 1:1 to §2.

## 5. Phasing

| Phase | What | Exit |
|---|---|---|
| 0 — now | Chris reviews this brief; ask Havis for: a sample of images for 2–3 templates, how "Bad" is labelled, cycle time, station hardware. | Go / no-go on the model path (classification vs detection; cloud vs edge). |
| 1 — model | Train Rekognition Custom Labels on the samples; measure per-label precision/recall. | F1 good enough to demo honestly, or a documented labelling gap. |
| 2 — core | C1 `s3` connector, C3 `vision.detect` tool, C4 image field + overlay. (C2/C5/C6/C7 as time allows.) | `workspace:check` + a tool_call row with boxes from a real Rekognition call. |
| 3 — workspace | Author agents/playbooks/workflow/objects/pages/evals; fixtures; seed. | The §2 walkthrough runs end to end on :3004. |
| 4 — present | WALKTHROUGH.md, tour, reel. | Rehearsed by someone who wasn't on the call. |

## 6. Open questions and risks

- **Label granularity.** Whole-image Good/Bad supports classification only ("something is
  wrong"). Naming *which* part is missing needs part-level boxes — either Havis has them
  or we label a subset. This is the single biggest fork in the plan.
- **Volume and latency.** Cloud round-trip is 1–3 s. Fine for audit or a manual station;
  not for a fast conveyor. Ask the cycle time before promising anything.
- **Templates × parts.** How many templates? Dozens vs hundreds changes whether it's one
  Rekognition project per family or a per-template classifier.
- **Data sharing.** Real images make the demo; we need an NDA-clean sample and a
  read-only bucket role. Synthetic fallback is possible but weaker.
- **Cost framing.** Endpoint-hours, not per-image. We should quote a shift schedule.
- **Scope creep.** Rework routing, supplier quality, and camera health are teasers, not
  scope. Two agents.

## 7. Decision requested

1. Approve the two-coworker framing and the Hold-never-Reject rule as the demo spine.
2. Approve opening core work C1/C3/C4 as the minimum, with C2/C7 as stretch.
3. Approve the ask list for Havis (images, labels, cycle time, station hardware).
