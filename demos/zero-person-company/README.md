# Zero-person company

**A small autonomous company, with a human in the loop on everything that leaves the building.**

This demo answers: *how do you run a team of AI agents in production — with an agent registry,
autonomy levels, an approval gate, and a learning loop — without anyone reviewing it having to
trust the model blindly?*

It maps to "how to build a team of AI agents", "AI agent approval workflow", and "human-in-the-loop
AI agents in production" (see `company/KEYWORDS.md` in the umbrella repo).

## What's in this demo

```
demos/zero-person-company/
├── workspace/zero-person-company/
│   ├── workspace.yaml                       # manifest: lead ceo, one accountable human
│   ├── trust.yaml                           # what may auto-execute, and above what confidence
│   ├── agents/                              # board, ceo, strategist, writer, qa-editor, distribution
│   ├── teams/company.yaml                   # ceo leads strategist/writer/qa-editor/distribution
│   ├── missions/                            # 3 standing responsibilities, autonomyPolicy.level 1-3
│   ├── workflows/publish-post/               # draft -> fact-check -> HUMAN APPROVAL -> publish (stub)
│   ├── skills/{write-post,fact-check}/       # the two units of work the writer and QA editor read
│   ├── playbooks/editorial-voice/            # standing house style, attached to both
│   ├── learnings/editorial_standards.yaml    # whitelisted bucket for accumulated QA rules
│   └── evals/writer-baseline.yaml            # 2 test cases: grounding, no fabricated numbers
├── data/                                     # synthetic fixtures — briefs, a draft, a short ledger
├── .env.example
└── scripts/dev.sh
```

## The agents

| Agent | Role | Parent | Autonomy (via its mission) |
|---|---|---|---|
| `board` | Quarterly governance — reviews mission autonomy levels, never executes anything | none | level 1 (draft only) |
| `ceo` | Runs the daily queue, workspace lead | none (team lead of `company`) | level 2 (ask before action) |
| `strategist` | Turns a topic into a citable content brief | `ceo` | — |
| `writer` | Drafts a post from a brief, grounded in this workspace's own files | `ceo` | — |
| `qa-editor` | Fact-checks a draft before it reaches the human gate | `ceo` | — |
| `distribution` | Drafts channel copy for an *approved* post — never sends it itself | `ceo` | level 3 (act within rules) |

The agent hierarchy is one level deep in this core (`docs/entities/agent.md`), so `board` and `ceo`
are modeled as peers rather than a literal three-tier reporting line. Board reviews the CEO's
charter and the ledger through separate missions, not by managing the team directly — the same
split this repo's own `CLAUDE.md` describes for its own board/CEO/worker roles.

## The one HITL moment

The `publish-post` workflow (`workflows/publish-post/workflow.yaml`) is the whole point:

```
fact-check (ask)  →  review (approve)  →  publish (action, stub)
```

Every draft the writer produces pauses at `review` — a human reads the draft alongside the QA
editor's fact-check notes and decides. Nothing downstream runs until that step clears. See
`WALKTHROUGH.md` for how to trigger and watch this in the dashboard.

`trust.yaml` shows the other half of the same idea: one low-risk, reversible action
(`dataset.add_example`, filing a QA-approved correction to the training set) may auto-execute
above a 0.97 confidence threshold; `gmail.send` is listed at 0.99 but `enabled: false` — the rule
exists to document the ceiling, not to fire.

## Setup (5 minutes)

```bash
# from vocion-demos/ root, first time only:
cd vocion-core && npm install && cd ..

# Postgres (umbrella docker-compose), if not already up:
cd .. && docker compose up -d && cd vocion-demos

# this demo needs its own database — vocion_zpc — so seed:demo doesn't collide
# with the databases used by the other demos in this repo:
docker exec vocion-postgres psql -U postgres -d postgres -c 'CREATE DATABASE vocion_zpc'
docker exec vocion-postgres psql -U postgres -d vocion_zpc -c 'CREATE EXTENSION vector'
```

```bash
cd demos/zero-person-company
cp .env.example .env.local            # fill in AUTH_SECRET and an LLM key
./scripts/dev.sh                      # -> http://localhost:3005
```

`scripts/dev.sh`:
1. Sources `.env.local` from this directory (and the umbrella root `.env` for LLM keys)
2. `cd`s into the pinned `vocion-core` submodule
3. Sets `PORT=3005` and `WORKSPACE_PATH` at `workspace/zero-person-company`
4. Runs `npm run dev:next` (never plain `npm run dev` — that starts an embedded PGlite server
   that collides with the shared Postgres on 5432)

First boot: run the core's migrations and apply this workspace once —

```bash
cd ../../vocion-core/packages/core
DATABASE_URL=postgresql://postgres:postgres@127.0.0.1:5432/vocion_zpc npm run db:migrate
cd ../../..
npm run workspace:check -- demos/zero-person-company/workspace/zero-person-company
npm run workspace:apply -- demos/zero-person-company/workspace/zero-person-company \
  --project zero-person-company
```

Sign up once through the dashboard's sign-in screen (this core uses NextAuth, not Clerk — see
`.env.example`), then re-run `workspace:apply` so `accountableUser` resolves to that user.

## `@vocion/core`

`@vocion/core` is `private: true` and not published to npm. This demo runs against the `vocion-core`
git submodule pinned inside `vocion-demos` (currently `v2.36.0`) — there is no `npm install
@vocion/core` step; `npm install` at the `vocion-core` submodule root is what pulls in the app.

## Verified against

Pinned core `v2.36.0`. Every entity file in `workspace/zero-person-company/` was checked against
`docs/entities/*.md` in that tag and validated with a dry-run `workspace:apply` against a live
Postgres instance — see `WALKTHROUGH.md` for the exact commands and output.

## Caveats

- **LLM keys**: you need an Anthropic API key in `.env.local` (default model `claude-sonnet-4-6`,
  with `claude-haiku-4-5-20251001` for the QA editor).
- **Publish step is a stub**: `content.publish_stub` in `publish-post/workflow.yaml` is not a
  registered connector action in this core (same pattern as support-reply's `stub.log_only`) —
  wiring it to a real publish path (a git PR against a blog, a CMS API) is v2 work.
- **No live send anywhere**: nothing in this workspace has a tool that posts to a third-party
  platform. `distribution` only ever produces text for a human to copy and send.
