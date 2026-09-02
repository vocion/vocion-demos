---
slug: quality-trends
name: Quality trends
description: Aggregate inspections into pass rate, hold rate, recurring regions and the near-miss band, by kit and by day.
version: 1
playbooks:
  - inspection-standard
resources: []
---
# Quality trends

1. `lookup_objects` type `inspection` (page through if needed). Group by `template_id` and by `captured_at` day.
2. Compute: inspected, passed, held, released, rework; pass rate; near-miss count (0.60 ≤ confidence < 0.85).
3. Separate `source: labelled_history` rows (Havis's own Good/Bad samples, shadow-mode baseline) from model verdicts. Report both, labelled.
4. Recurring regions: count findings by `region` per kit. Three or more across different production orders = a pattern; say whether it smells like template, station, or supplier.
5. Close with the one thing to fix first.
