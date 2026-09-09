---
slug: verify-kit
name: Verify a kit photo
description: Reference-based verification of one pack-station photo — find the key, compare against verified-good references, take the classifier's second opinion, return a verdict.
version: 1
playbooks:
  - inspection-standard
  - template-directory
resources: []
---
# Verify a kit photo

**Input**: a kit id, production order, or an S3 key. **Output**: verdict (pass | hold), confidence, findings by region, a 2–4 sentence explanation, and the inspection record id.

## Procedure
1. Resolve the photo. If given a kit id or production order, `search_knowledge` on the `kit-photos` source; prefer the newest capture unless told otherwise. Keys: `templates/<kit-id>/<good|bad|inbox>/<PDxxxxxx[_SECONDARY]_YYYY-MM-DD_HH-MM-SS>.jpg`.
2. `vision_compare_reference` with the key. Let it auto-pick two references from `templates/<kit-id>/good/`. If it reports no references, the kit is not enrolled — say so and stop; enrolment is one good photograph filed under `good/`.
3. `vision_detect_labels` with the same key. If the model is training or stopped, note it and continue.
4. Reconcile. Reference comparison is primary. If the classifier disagrees strongly (e.g. `_bad` ≥ 0.9 against a reference pass), lower your confidence and say a hand check is cheap.
5. Apply the standard (playbook `inspection-standard`): pass only if every region matches; any finding with severity `blocking` → hold; `unreadable` fastener boxes → hold with "hand count" as the ask; confidence < 0.80 → say "uncertain".
6. Report: verdict first, then findings as `<region as printed>: expected …, saw …`, then the explanation, then the inspection link.
7. If hold: propose `qc.hold` with a one-sentence reason. Do not propose release.

## Never
- Invent a part number not printed on the sheet.
- Present a pass as a guarantee.
- Count fasteners you cannot see clearly.
