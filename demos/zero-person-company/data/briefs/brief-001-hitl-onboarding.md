# Brief 001 — Onboarding an agent workforce with human-in-the-loop review

**Query it answers:** "how do you run a team of AI agents in production
without letting them send things nobody reviewed?"

**Why now:** every capability claim in the draft this brief produces must
cite a file in this workspace: `workspace/zero-person-company/trust.yaml`
for what may auto-execute, and `workflows/publish-post/workflow.yaml` for
the approval gate itself.

**Required citations:**
- `workflows/publish-post/workflow.yaml` — the `review` (approve) step
- `trust.yaml` — the two rules, one enabled at a high threshold, one
  disabled outright
- `missions/content-pipeline.yaml` — autonomy level 2, "ask before action"

**What the draft must NOT claim:** a specific accuracy number for catching
mistakes (none exists in this workspace), or that any post has published
without a human approval.
