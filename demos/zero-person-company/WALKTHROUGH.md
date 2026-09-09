# Walkthrough — Zero-person company

A presentation script: clone to a held approval, in about ten minutes.

## 0. Setup (see README.md for the full command list)

```bash
cd vocion-core && npm install && cd ..
docker compose up -d   # from vocion-local/
docker exec vocion-postgres psql -U postgres -d postgres -c 'CREATE DATABASE vocion_zpc'
docker exec vocion-postgres psql -U postgres -d vocion_zpc -c 'CREATE EXTENSION vector'
cd vocion-core/packages/core
DATABASE_URL=postgresql://postgres:postgres@127.0.0.1:5432/vocion_zpc npm run db:migrate
cd ../../..
cd demos/zero-person-company && cp .env.example .env.local   # fill in AUTH_SECRET + ANTHROPIC_API_KEY
./scripts/dev.sh   # -> http://localhost:3005
```

Sign up once, then from the `vocion-core` root:

```bash
npm run workspace:apply -- demos/zero-person-company/workspace/zero-person-company \
  --project zero-person-company
```

## 1. "Here's the company" (2 min)

Open `/dashboard/teams`. One team, `Company`, led by `ceo`, with four specialists:
`strategist`, `writer`, `qa-editor`, `distribution`. Open `/dashboard/agents` and click into
`board` — separate from the team, no parent, described in its own prompt as governance-only:
it recommends, it never executes.

Say: "Every one of these six agents is a YAML file plus a Markdown system prompt — no
application code. `agents/writer.yaml` names the skill it mounts (`write-post`) and the
playbook that's always present for it (`editorial-voice`)."

## 2. "Here's what it's allowed to do without asking" (2 min)

Open `workspace/zero-person-company/missions/`. Three files, three different
`autonomyPolicy.level` values:

- `board-charter-review.yaml` — level 1, draft only
- `content-pipeline.yaml` — level 2, ask before action
- `distribution-outreach.yaml` — level 3, act within rules

Say: "Autonomy is a property of the *mission*, not the agent. `distribution` is allowed to act
within rules at level 3 — but look at its agent file: `harness.excludeTools: [propose_action]`.
It has no tool that reaches a third party. Level 3 here means 'don't wait for a human to ask
for the draft', not 'skip the human'."

Then open `trust.yaml`: one rule enabled (`dataset.add_example`, 0.97 threshold, low-risk and
reversible), one rule disabled outright (`gmail.send`, 0.99 — exists to document the ceiling).

## 3. **The HITL moment** — trigger `publish-post` and watch it hold (4 min)

This is the moment to slow down.

1. Open `data/briefs/brief-001-hitl-onboarding.md` and `data/drafts/draft-001-hitl-onboarding.md`
   — a synthetic brief and a drafted post already sitting in the fixtures, frontmatter
   `fact_check: pending`.
2. From `/dashboard/workflows`, start a `publish-post` run with that draft as input (or
   `POST /api/v1/workflows/publish-post` with `{"brief_title": "...", "draft": "..."}`).
3. The `fact-check` step (`ask`) pauses for QA notes — paste something short, e.g. "0 unsupported
   claims, 1 tense error, fixed."
4. The run lands on `review` — an `approve` step — and **stops**. Open `/dashboard/review`.
   **This is the gate.** Nothing downstream — the `publish` action step — runs until a human
   clicks approve.
5. Approve it. Only now does the `publish` step (`content.publish_stub`) run — and say plainly
   that it's a stub in v1: no real CMS or git-PR connector is wired yet, exactly like
   support-reply's `stub.log_only`.

Say: "Everything upstream of `review` — the brief, the draft, the fact-check pass — is the model
doing real work. Nothing downstream of it runs without this exact click."

## 4. "It learns, and it's tested" (2 min)

Open `learnings/editorial_standards.yaml` — the whitelisted bucket the writer and QA editor read;
individual rules get added through the dashboard as QA rejects things. Then
`evals/writer-baseline.yaml` — two test cases, one checking the writer grounds every claim in a
workspace file, one checking it refuses to invent an accuracy number. Run them with
`npm run eval:run --workspace @vocion/core`.

## Close

"Six agents, one team, three autonomy levels, one approval gate, one trust rule, one learning
bucket, one eval set — twenty-four files, checked in, no code. That review-queue pause you just
watched is the same mechanism gating every action this whole company can take."
