# Support reply drafting

**Catalog row #3 · Level 1 · Drafting · Featured**
> Turn support tickets into reply drafts. Help-desk ticket in → support reply draft out.

This is the **L1 stub** — single source, single draft, one approval gate. Two skills and one workflow.

## What's in this demo

```
demos/support-reply/
├── context/support-demo/
│   ├── workspace.yaml                            # org manifest
│   ├── skills/
│   │   ├── summarize-ticket/SKILL.md
│   │   └── draft-reply/SKILL.md
│   └── workflows/
│       └── support-triage/workflow.yaml          # summary → draft → approve
├── .env.example
└── scripts/dev.sh
```

The two skills:

- `summarize_ticket` — fast classification of the user's issue, meant for a cheaper/faster model
- `draft_reply` — drafts a reply using the summary as context. The human-approval gate lives on the workflow's `approve` step (`workflows/support-triage/workflow.yaml`), not on the skill itself — the current skill shape has no per-skill approval flag; see this repo's migration PR for detail.

## Run it

```bash
# from vocion-demos/ root, first time only:
cd vocion-core && npm install && cd ..

# then:
cd demos/support-reply
cp .env.example .env.local                # fill in CLERK_* and LLM keys
./scripts/dev.sh                          # → http://localhost:3001
```

The wrapper script:
1. Sources `.env.local` from this directory
2. `cd`s into the pinned vocion-core checkout
3. Sets `PORT=3001` and `CONTEXT_PATH` pointing at `context/support-demo`
4. Runs `npm run dev`

The demo gets its **own** PGlite DB (`vocion-demos/vocion-core/packages/core/local.db`) — isolated from any other vocion-core checkout you might have running on :3000.

## L1 → L4 evolution

The L4 version of this same demo is spec'd in vocion-core at `packages/core/src/app/[locale]/(marketing)/starters/[slug]/page.tsx` (slug `support-reply`). It adds:

- A confidence check on the draft (low confidence OR refund/legal keywords → escalate)
- Conditional routing in the workflow (`approve` gate only on high-risk)
- A Zendesk source plugin so tickets stream in via webhook
- Audit + traceability via the review queue

When evolving this stub: add a `confidence-gate` skill that returns a numeric score, branch in the workflow on that score, and add a `zendesk-source.ts` plugin under a sibling `plugins/` dir loaded via `VOCION_PLUGINS`.

## Caveats

- **Clerk org**: the demo will redirect to Clerk sign-up on first boot. Either create a Clerk dev org and add yourself, or set Clerk to "dev mode" with auto-org creation. Once signed in, the org's `CONTEXT_PATH` resolves to this demo's `support-demo/` context.
- **LLM keys**: you'll need an Anthropic API key (default model is `claude-sonnet-4-6`, set on the `support-assistant` agent). Put it in `.env.local`.
- **`npm run workspace:check` does not pass yet on the pinned core.** `workflows/support-triage/workflow.yaml`'s `summary` and `draft` steps use `type: skill` (invoke a skill, then feed its output to the next step) — that step type was removed from `WorkflowStepSchema` in the same commit that removed the operations layer (`packages/core/src/libs/workspace/schemas.ts`, commit `1daee5b2`) and never replaced. Only `approve` / `ask` / `action` / `sync` steps validate today. This demo's workflow cannot express "call this skill, then that skill" as a workflow step until core adds that step type back (or an equivalent). See the skills-migration PR for the exact `workspace:check` output and a flagged core-engineer backlog item.
