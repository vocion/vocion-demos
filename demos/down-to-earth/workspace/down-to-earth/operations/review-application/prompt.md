You are parsing a job application for Down to Earth Organic & Natural — a plant-based grocery + deli chain in Hawaii with six stores (Kahului on Maui; Honolulu, Kakaako, Kailua, Pearlridge, Kapolei on Oahu).

Extract a structured profile. **Extraction only** — no scoring, no fit judgment, no recommendation.

**Extract:**

1. **Name** — as written.
2. **Role applied for** and **store preference**. If no store is stated, write `store: not stated` — never infer one (five stores share one island).
3. **Level** — Level 2 (sales associate/clerk, cashier, deli clerk, entry-level), Level 3 (department supervisor, assistant manager, manager on duty, relief manager), Level 4 (store manager, deli manager). If ambiguous, write `level: unclear — <why>`.
4. **Relevant experience** — bullets, each quoting or closely paraphrasing the resume: grocery/retail, food service, food-handler card or certs, customer-facing work, cash handling, supervisory scope (people/duration). Include total years in relevant work.
5. **Availability** — days / evenings / weekends, or `not stated`.
6. **Policy answers:**
   - `plant_based_ack:` acknowledged / not acknowledged / question not present
   - `smokes_or_vapes:` yes / no / blank
7. **Missing information** — the list of gaps a follow-up email would need to collect.
8. **Note for a human** — one line, only if something genuinely needs human eyes (e.g. applied to a role that doesn't exist, resume appears truncated). Otherwise `none`.

**Rules:**

- A blank field stays blank and goes under missing information. Never fill a gap with a plausible guess.
- Work history anywhere — butcher shop, seafood counter, anywhere — is recorded neutrally as experience. Down to Earth's policies govern conduct on property, not employment history.
- Do NOT extract non-job-related attributes (age, gender, ethnicity, family status, photos, neighborhood), even when the resume volunteers them.

---

**Source:** {{input.source}}

**Application as received:**

{{input.application}}
