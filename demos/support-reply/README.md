# Support reply drafting

**Catalog row #3 · Level 1 · Drafting · Featured**
> Turn support tickets into reply drafts. Help-desk ticket in → support reply draft out.

This is the **L1 stub** — single source, one approval gate before send. Two skills, one workflow.

## What's in this demo

```
demos/support-reply/
├── context/support-demo/
│   ├── workspace.yaml                            # org manifest
│   ├── skills/
│   │   ├── summarize-ticket/SKILL.md
│   │   └── draft-reply/SKILL.md
│   ├── sources/zendesk.yaml                      # ticket fixture (file-import)
│   └── workflows/
│       └── support-triage/workflow.yaml          # sync → ask → approve → action
├── .env.example
└── scripts/dev.sh
```

The two skills:

- `summarize_ticket` — fast classification of the user's issue, meant for a cheaper/faster model.
- `draft_reply` — drafts a reply using the summary as context.

Both skills are things the **`support-assistant` agent** can invoke as tools in a chat turn (see
its `skills:` list in `agents/support-assistant.yaml`) — a workflow step cannot call a skill
directly in the current schema (there is no `type: skill` step; see "What the workflow actually
does" below). The human-approval gate lives on the workflow's `approve` step
(`workflows/support-triage/workflow.yaml`), not on a skill — there is no per-skill approval field
in the current skill shape.

## What the workflow actually does

`workflows/support-triage/workflow.yaml` has four steps, all of real, registered types
(`sync | ask | approve | action` — the only four `WorkflowStepSchema` accepts):

1. **`sync`** — refreshes the `zendesk` source (the JSONL ticket fixture) so the run reads live data.
2. **`ask`** — pauses for a human to paste a drafted reply, unless the caller already supplied one
   via `input.draft_reply` (an automated caller — or a person who first asked the
   `support-assistant` agent to run `summarize_ticket` then `draft_reply` in chat and copied the
   result in) skips the pause entirely.
3. **`approve`** — a human reviews the reply text before it goes out.
4. **`action`** — `gmail.send`, a real registered action. **Sending actually requires Gmail
   credentials this demo does not configure** (no `gmail` source/vault entry is set up here); until
   you wire one, expect the `send` step to fail at execution, not at load. The workflow still
   *validates* and *loads* with this step in it — see "Prove it loads" below.

This is a smaller shape than "summarize, then draft, then approve" in one workflow run, because a
workflow step cannot invoke a skill in the current framework — only `sync`/`ask`/`approve`/`action`
are valid step types. Drafting is something you do with the agent in chat today; this workflow
picks up after a draft exists, and gates sending it.

## Prove it loads

This is the real `loadWorkspace()` entry point (the same one `apply-workspace.ts` and the MCP
workspace tools call), run against this demo's own context directory — no fixture copy, no
schema-only parse:

```bash
cd $VOCION_LOCAL/vocion-core/packages/core
npx tsx -e "import {loadWorkspace} from './src/libs/workspace/loader'; \
const ws = loadWorkspace(process.argv[1]); \
console.log('agents', ws.agents.map(a=>a.slug)); \
console.log('skills', ws.skills.map(s=>s.slug)); \
console.log('workflows', ws.workflows.map(w=>({slug:w.slug, steps:w.steps.map(s=>s.type)}))); \
console.log('sources', ws.sources.map(s=>s.slug));" \
$VOCION_LOCAL/vocion-demos/demos/support-reply/context/support-demo
```

Output:

```
agents [ 'support-assistant' ]
skills [ 'draft_reply', 'summarize_ticket' ]
workflows [
  {
    slug: 'support_triage',
    steps: [ 'sync', 'ask', 'approve', 'action' ]
  }
]
sources [ 'zendesk' ]
```

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
- **The `gmail.send` action step needs real Gmail credentials this demo doesn't set up.** The
  workflow loads and validates with the `send` step in it (see "Prove it loads" above); running it
  through to a real send additionally needs a `gmail` source with a vault entry, which is out of
  scope for this stub. Stop at `approve` if you just want to see the HITL gate work.
- **A workflow step cannot invoke a skill.** The two skills (`summarize_ticket`, `draft_reply`) are
  tools the `support-assistant` agent calls in chat; `workflows/support-triage/workflow.yaml`
  starts after a draft exists (`sync` → `ask` → `approve` → `action`), it does not produce the
  draft itself. There is no `type: skill` workflow step in the current schema.
