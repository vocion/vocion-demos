---
status: drafted
brief: brief-001-hitl-onboarding
author_agent: writer
fact_check: pending
---

# Nobody sends anything here without a human looking first

A company that runs mostly on AI agents still needs exactly one thing a
model can't grant itself: permission to leave the building. In this
workspace, that permission lives in two places, not one.

The first is `trust.yaml`. It lists two rules. Filing an approved
correction to the training set (`dataset.add_example`) may auto-execute
once confidence clears 0.97 — low-risk, reversible, still audited. Sending
an email (`gmail.send`) is listed too, at a 0.99 threshold, but `enabled:
false` — the rule exists to document the ceiling, not to fire.

The second is the `publish-post` workflow's `review` step. Every draft
this team produces passes through a QA fact-check and then pauses there —
type `approve` — until a human reads it alongside the fact-check notes and
decides. Nothing downstream of that step runs until it clears.

Draft status: **drafted**, fact-check **pending**. This post itself is a
worked example of the thing it describes — it has not passed `review` yet.
