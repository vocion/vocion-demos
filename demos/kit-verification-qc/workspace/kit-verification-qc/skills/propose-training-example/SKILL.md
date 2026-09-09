---
slug: propose-training-example
name: Propose a training example
description: When a person overrides the model, file the photo into the good/ or bad/ training set and record why — via approval, never directly.
version: 1
playbooks:
  - hold-policy
resources: []
---
# Propose a training example

Trigger: an inspection whose `decision` disagrees with its model `verdict` (released after a hold, or held after a pass), or a person asks.

1. Read the inspection: what the model said, what the person decided, the reason.
2. `propose_action` → `dataset.add_example` with `{ inspection_id, label, reason }`. `label` is the person's decision (release → good, hold → bad).
3. `add_learning` for the Pack Inspector: one rule, with the evidence — e.g. "Rev B bracket on C-PM-134-PC has two extra holes; not a wrong part."
4. Tell the person both are waiting in Review and what approving each does (the photo is copied into `templates/<kit>/<label>/` in S3; the next training run includes it).
