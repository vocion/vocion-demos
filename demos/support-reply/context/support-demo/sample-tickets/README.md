# Sample tickets

Realistic inbound support tickets used to seed the support-reply demo. Loaded by `scripts/seed-tickets.ts` (lands in Phase 2.2) to populate a few completed workflow runs on first boot, and exposed as a "Pick a sample" dropdown on the workflow runner UI (Phase 1).

## File format

One ticket per `.md` file. Filename: `<id>-<short-slug>.md`. Frontmatter is required:

```yaml
---
id: T-1001                       # short stable id; used as the ticket reference
customer_name: Maya Chen         # display name; passed into the workflow as customer_name
subject: "Where's order #SR-48201?"
received_at: 2026-05-20T14:22:00Z  # ISO 8601 UTC
---

<ticket body — markdown allowed but the workflow treats it as plain text>
```

## Coverage

The eight current samples span the kinds of tickets the L1 demo should handle gracefully:

- **T-1001** Shipping delay — calm, factual, clear ask
- **T-1002** Refund — broken product, no replacement wanted
- **T-1003** Feature broken — technical, includes error trace + account id
- **T-1004** Billing question — possible duplicate charge
- **T-1005** Account access — time-pressured, password reset stuck
- **T-1006** Vague — minimal information, needs a clarifying question
- **T-1007** Angry escalation — repeat customer, threatening chargeback, demands manager
- **T-1008** Thank you — positive feedback, no action needed

The `draft_reply` operation should recognize when **no draft is appropriate** (T-1008) and when **a clarifying question is the right output** (T-1006), not always plow ahead with a fix.
