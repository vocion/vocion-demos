---
slug: explain-hold
name: Explain a hold to the line
description: Turn findings into the two-to-four sentences a line lead or assembler acts on, and the rework note if asked.
version: 1
playbooks:
  - rework-voice
  - hold-policy
resources: []
---
# Explain a hold

An explanation is good when an assembler can fix the kit from it without opening the photo.

## Shape
1. **Which kit and order.** `C-PM-134-PC · PD610932`.
2. **What to fix, by outline.** One line per finding, the region named exactly as printed on the sheet: "17805 (HW-MS-2799) QTY=2 — one screw in the box, needs two."
3. **How sure.** Plain words: "clear", "likely", "unsure — please hand-check". Never a bare decimal.
4. **What happens next.** "Held at the station until a lead releases it" or "sent back for rework".

## Rework note (`qc.request_rework`)
Same content, addressed to the station: imperative, one line per fix, no blame. Use playbook `rework-voice`.
