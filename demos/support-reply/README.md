# Support reply drafting

**Catalog row #3 · Level 1 · Drafting · Featured**
> Turn support tickets into reply drafts. Help-desk ticket in → support reply draft out.

This is the **L1 stub** — single source, single draft, one approval gate. Two operations and one workflow.

## What's in this demo

```
demos/support-reply/
├── context/support-demo/
│   ├── context.yaml                              # org manifest
│   ├── operations/
│   │   ├── summarize-ticket/{skill.yaml, prompt.md}
│   │   └── draft-reply/{skill.yaml, prompt.md}
│   └── workflows/
│       └── support-triage/workflow.yaml          # summary → draft → approve
├── .env.example
└── scripts/dev.sh
```

The two operations:

- `summarize_ticket` — Haiku-class model, fast classification of the user's issue
- `draft_reply` — Sonnet, drafts a reply using the summary as context. `requiresApproval: true` so it lands in the review queue rather than auto-sending.

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

When evolving this stub: add a `confidence-gate` operation that returns a numeric score, branch in the workflow on that score, and add a `zendesk-source.ts` plugin under a sibling `plugins/` dir loaded via `VOCION_PLUGINS`.

## Caveats

- **Clerk org**: the demo will redirect to Clerk sign-up on first boot. Either create a Clerk dev org and add yourself, or set Clerk to "dev mode" with auto-org creation. Once signed in, the org's `CONTEXT_PATH` resolves to this demo's `support-demo/` context.
- **LLM keys**: you'll need an Anthropic API key (default models are `claude-sonnet-4-6` for drafting + `claude-haiku-4-5-20251001` for summary). Put it in `.env.local`.
