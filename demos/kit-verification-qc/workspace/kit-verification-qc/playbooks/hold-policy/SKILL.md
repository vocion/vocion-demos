---
slug: hold-policy
name: Hold policy
description: Who may hold, release and rework, and what the agents may only propose.
version: 1
playbooks: []
resources: []
---
# Hold policy

| Decision | Who | How |
|---|---|---|
| Hold a kit | Proposed by the Pack Inspector, confirmed by a line lead | `qc.hold` → Review |
| Release a kit (incl. overriding a hold) | A person | `qc.release` → Review; the reason is recorded and feeds the learning loop |
| Send to rework | A person, on the Inspector's proposal | `qc.request_rework` → Review; the note is recorded (delivery stubbed in the demo) |
| Add a photo to the training set | Proposed by the Quality Analyst, approved by quality | `dataset.add_example` → Review; copies the photo into `templates/<kit>/<good|bad>/` in S3 |
| Ship, scrap, retrain, change a template | People only | Blocked for every agent (`approvalPolicy.block`) |

An override is not an error to hide. It is the most valuable signal the system gets — always file it.
