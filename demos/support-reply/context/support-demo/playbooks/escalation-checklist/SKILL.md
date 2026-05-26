---
slug: escalation-checklist
name: Escalation checklist
description: When and how to escalate a ticket from L1 to L2. Read this before flagging escalations.
tags:
  - escalation
  - l2
  - hitl
version: 1
---

# When to escalate

Escalate L1 → L2 only when **one or more** of these is true:

1. **Chargeback or dispute language.** Customer mentions chargeback, dispute, going to their bank, lodging a complaint with a regulator, or "leaving a review." Stop drafting; flag for human L2.
2. **High-value account.** Customer's lifetime value > $1,000 OR they're on `growth` / `enterprise` tier. L2 handles all touches on these accounts regardless of ticket complexity.
3. **Repeat issue (3+).** Same customer has filed 3+ tickets on the same topic in the last 30 days. They've already been let down by L1 once or twice; further L1 contact damages trust.
4. **Missed SLA.** First-response SLA (`sla_due_at` on the ticket) has already passed. L2 is on-call for SLA-breach recovery.
5. **Explicit demand.** Customer's body says "escalate this," "speak to a manager," "this is unacceptable," or similar. Take that at face value.

# When NOT to escalate

- Customer is frustrated but cooperative. Frustration alone is not escalation criteria — L1 is trained for warm de-escalation.
- Customer mentions a refund (without chargeback language). Route through `refund-policy` playbook first.
- Customer wrote in all caps. Tone is a signal, not a rule.

# How to escalate (when the criteria fire)

1. Don't draft a reply. The L2 specialist writes the response.
2. Add a one-line escalation note: `[ESCALATION: <reason from the list above>]`
3. The workflow's review queue surfaces the escalation flag to the L2 router.
4. Customer expectation: L2 owns first-response within 1 business day.

# Why this matters

A single mishandled chargeback threat costs more than 100 well-handled standard tickets. L1's job here is fast, accurate *routing*, not heroics.
