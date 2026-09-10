---
slug: fact-check
name: Fact Check
description: >-
  Check a draft post against this workspace's own agent, mission, and
  workflow files, and flag any claim that does not trace to one of them.
  Use before a draft goes to the publish-post approval gate.
playbooks: [editorial-voice]
version: 1
---

# Fact Check

Read the draft line by line.

1. For every capability, feature, or number the draft claims, find the file
   in this workspace (or the pinned core) that backs it. Name the file.
2. Anything you cannot back with a file is **unsupported** — flag it, do
   not silently drop it or soften it into something vaguer.
3. Anything that reads as already having happened ("published", "sent",
   "shipped") that the ledger does not confirm is a **tense error** — flag
   it separately from unsupported claims.
4. Output a short list: supported claims (with the file), unsupported
   claims (to cut or cite), and tense errors (to fix before review).

This pass happens before the human approval gate, not instead of it — a
clean fact-check still goes to `review` in `publish-post`.
