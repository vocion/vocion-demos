# Support reply drafting — walkthrough

Prospect-neutral demo for the query "build an AI support agent that drafts replies for human
approval." What it shows: a support agent that drafts a reply, and a human who must approve it
before anything goes out.

**The one-sentence frame:** "The agent reads the ticket and drafts a reply; nothing is sent until a
person approves the exact text."

## Setup (once)

```bash
cd $VOCION_LOCAL/vocion-demos/vocion-core && npm install && cd ..
cd demos/support-reply
cp .env.example .env.local     # fill in CLERK_* and an Anthropic key
./scripts/dev.sh               # → http://localhost:3001
```

Sign in (Clerk dev org). `CONTEXT_PATH` resolves to `context/support-demo`.

## Beat 1 — Prove the workspace loads

Before touching the UI, run the same loader the app uses, against this demo's own files:

```bash
cd $VOCION_LOCAL/vocion-core/packages/core
npx tsx -e "import {loadWorkspace} from './src/libs/workspace/loader'; \
const ws = loadWorkspace(process.argv[1]); \
console.log('workflows', ws.workflows.map(w=>({slug:w.slug, steps:w.steps.map(s=>s.type)})));" \
$VOCION_LOCAL/vocion-demos/demos/support-reply/context/support-demo
```

Talking point: this is `loadWorkspace()`, the real entry point (the same one the MCP workspace
tools and `apply-workspace.ts` call) — not a fixture, not a schema-only parse. It prints one
workflow, `support_triage`, with steps `sync, ask, approve, action`.

## Beat 2 — The agent drafts (chat)

Open the `support-assistant` agent in chat and paste a sample ticket (`data/tickets.jsonl` has
synthetic examples). Ask it to summarize the ticket, then draft a reply.

Talking point: those are two separate skills — `summarize_ticket` (cheap/fast model, classification
only) and `draft_reply` (the model that writes customer-facing text). The agent's `skills:` list
in `agents/support-assistant.yaml` is what wires them in; a workflow step cannot call a skill
directly in the current framework, so this drafting step happens here, in chat, not inside the
workflow you just validated in Beat 1.

## Beat 3 — The human gate (the workflow)

Start the `support-triage` workflow with the ticket and the draft you just got from the agent
(`draft_reply` input, or type it fresh at the `ask` step if you skip Beat 2). Walk through:

1. `sync` — refreshes the ticket fixture source.
2. `ask` — either already satisfied by `draft_reply`, or pauses for you to paste the text.
3. `approve` — **the HITL moment.** The run stops here. Nothing is sent until a person reviews the
   exact reply text and approves it. This is the review-queue UI, not a hidden background job.
4. `action` (`gmail.send`) — a real registered action, gated behind approval. This demo does not
   configure Gmail credentials, so say plainly that a real send needs a `gmail` source wired up;
   the point being made on stage is the gate, not the delivery mechanism.

## What this demo does not do (say so if asked)

- It does not stream tickets from a live Zendesk/Intercom/Front account — the source is a JSONL
  fixture (`sources/zendesk.yaml`, `data/tickets.jsonl`).
- It does not chain "summarize → draft" inside one workflow run — that would need a workflow step
  that invokes a skill, which does not exist in the current schema.
- It does not actually send email in this configuration — `gmail.send` requires credentials this
  demo does not ship.
