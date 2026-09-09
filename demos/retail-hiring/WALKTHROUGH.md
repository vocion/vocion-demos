# Retail Hiring Workforce — Hiring Workforce demo walkthrough

The demo script for presenting to the HR lead (and the HR manager). Each beat maps to a page of the **hiring workforce proposal** (a phased monthly commercial structure · two AI coworkers), so the demo *shows* what the doc *says*. Total runtime ~15 minutes. Setup must be done beforehand (see README — DB, migrate, seed, workspace apply, source sync, the processed-applicant seed for the workspace pages, and at least two pre-run workflow runs so the review queue isn't empty — start with `APP-IN-041`).

**The one-sentence frame to open with:** "Two AI coworkers read, score, and route every applicant from Indeed and your website against a standard written with you — and a person approves every step. Your managers hire."

**Video version:** `assets/retail-hiring-demo.mp4` is a ~3-minute rendered reel of these same beats, with voiceover and a light music bed (stylized "illustrative interface," watermarked, synthetic data) — use it as the send-ahead with the proposal or the leave-behind after the live demo. It is *not* a recording of the real product; say so if asked.

---

## The four workspace pages (added 2026-08-20)

The demo now carries four Retail Hiring Workforce-branded pages in the sidebar's **Hiring**
section, built as workspace files on vocion-core's workspace-pages mechanism
(PR #58). **Run with `scripts/dev-pages.sh`, not `dev.sh`** — the pinned core
predates the mechanism. Seed the back-catalog first:
`python3 scripts/seed-processed-applicants.py | docker exec -i vocion-postgres psql -U postgres -d vocion_retail_hiring`

| Page | Route | Use in the demo |
|---|---|---|
| **Hiring Command Center** | `/dashboard/p/command-center` | the NEW Beat 1 opener — 63 applicants, avg score, % qualified, CEO flags, score distribution |
| **Store Manager Inbox** | `/dashboard/p/store-inbox` | Beat 5 companion — each store's 70+ shortlist with routing, exactly the proposal's manager email as a screen |
| **Screening Activity** | `/dashboard/p/screening-activity` | after Beat 4 — the full trail (with core thumbs-up/down feedback on runs) **plus the embedded core Review queue including paused workflow runs**: approve/decline here or in Review, one queue |
| **Agent Registry** | `/dashboard/p/agent-registry` | Beat 8 — live core agent records (2 active + 7 bench); no pricing on the page by design |

These are config + markdown + one custom React widget inside
`workspace/retail-hiring/pages/` — worth saying out loud to the hiring lead's technical
reviewer if one appears: *the client's own pages live in the client's own
workspace folder, versioned like everything else they own.* Every applicant
row **clicks through to the core record** (`/dashboard/objects/<id>`), which
now carries an **Agent activity panel**: every run that touched the record
with its written rationale, feedback, the owning agent — and any pending
decision approvable right there, through the same core queue. Review items
are **core Review items** everywhere (never a parallel queue); run feedback
is core `skill_run` ratings. Seed data includes four deliberate edge cases —
an overqualified ex-store-manager, a weekday/weekend scheduling conflict, a
68 near-miss, and a duplicate application merged rather than double-routed —
and arrivals spread over ~30 days.

**The in-app guided tour** (`pages/tour.yaml`, **9 steps** — the proposal
narrative: arrive → click the record → the two coworkers → run one live →
the human gate → the manager inbox → feedback becomes a learning → the
bench): the floating
**▸ Guided demo** button or any dashboard URL + `?tour=1`. Spotlight mask
keeps the audience on rails; two steps are interactive (click into Marisol's
record; click a store-inbox name); Esc always exits. Seed the trail first:
`python3 scripts/seed-screening-runs.py | docker exec -i vocion-postgres psql -U postgres -d vocion_retail_hiring`
— it also parks **two pending routes (Marisol, Keone) in Review** so the
queue is never empty on stage.

## Beat 1 — Sign in → the portal (proposal p.2, "your hiring, on one screen")

- `http://localhost:3003/sign-in` → autofilled demo creds → dashboard.
- Talking point: this is the command center from proposal p.2 — corporate's view of the whole workforce: what was read, what was scored, what's waiting on a person, what was held. **Store managers never need it; it exists so you always know.** Managers keep email.
- Don't tour the nav yet. Go straight to the story: an application arriving.

## Beat 2 — Sources: Indeed + website (proposal p.6, "your systems, your data")

- **Dashboard → Sources.** Show `Indeed` and `Careers — Join our Team` connected, last sync, ~60 documents.
- Talking point: "Both of your channels land in one queue. Nothing changes about how applicants apply — Indeed arrives by the same email delivery you use today. This is the demo fixture at your real volume, sixty-odd applicants a month; the plan includes 150."
- Also on screen: `retailhiring.example.com` as a source — the platform reads the company's own standards pages. Quick aside, don't dwell.
- If asked about writes: nothing writes into your systems. ADP gets an export you trigger on hire; **the existing performance-review system has no connection of any kind, on purpose.**

## Beat 3 — The two coworkers (the proposal)

- **Dashboard → Agents.** The two active coworkers, named exactly as the proposal names them:
  - **Applicant Screener** — reads every application within minutes, scores 1–100 against your standard, explains every score, applies deal-breakers, flags policy exceptions, drafts follow-ups for missing info.
  - **Store Router** — right store, right manager, by email; corporate cc'd on management levels; tracks status and keeps the pipeline visible chain-wide.
- Open the **Applicant Screener** → show the system prompt lives in a governed, versioned record — "your criteria are written down and applied the same way in every store. Today it's subjective, in each manager's head. This is the fix."
- Point at Playbooks (`hiring-standards`, `scoring-rubric`): "Your two deal-breakers from our call are encoded — the plant-based on-property policy, and smoking flagged for CEO approval, never auto-rejected. The threshold is 70, per role and store, and you can tighten it any time."

## Beat 4 — Run an application through, live (the proposal, "one applicant, end to end")

- **Dashboard → Workflows → Applicant Intake → Run.** Paste **`APP-IN-041` (Marisol Torres — Deli Clerk, Harborview)** — the fixture authored to reproduce the the proposal's own trace: 2 yrs café + deli counter, food-handler card, weekends, plant-based acknowledged, light on inventory systems → should land ≈88 and route to the Harborview manager.
- Narrate as it runs: **read** (raw application → structured profile) → **score** (1–100 + the "why" in plain English) → **route** (right store, right manager, shortlist email drafted) → **pause**.
- It stops at the approval gate. "Nothing was sent. It's waiting for a person. That's page 4 of your proposal, running live."

### Cheat-sheet applications (from the fixtures — pick two or three)

| Case | Use | What it demonstrates |
|---|---|---|
| `APP-IN-041` Marisol Torres — Deli Clerk, Harborview | **open with this** | the proposal's own trace: ≈88, explained, routed to Harborview |
| `APP-IN-042` / `APP-IN-043` (Nakamura 81 / Silva 74 profiles) | the shortlist | the full proposal's manager email — three explained candidates, low-70s marked "your call" |
| `smokes_or_vapes: yes` applicant with strong cashier history (e.g. APP-IN-001) | **the money moment** | high score UNCHANGED, flag attached: "CEO approval required per policy" — exactly how the HR lead described their process |
| Butcher-shop/seafood-counter history (e.g. APP-IN-002) | the nuance | history counts as *relevant food-handling experience*; policy is about property, not past jobs |
| Rideshare driver applying for Store Manager | the HR lead's own example from the call | held below threshold with the reason recorded — visible, never auto-rejected |
| Missing availability | the follow-up | scored as "unknown" with the swing quantified across the 70 line; one email asks for everything |

## Beat 5 — The review queue (the proposal's review-queue and supervision sections)

- **Dashboard → Review.** The pre-run items + the one just created, side-by-side: original application, profile, score + why, drafted shortlist email.
- **Approve one live.** "That's the whole human gate — approve, adjust, or decline. Every decision is logged in the decision log, and every decision trains the standard."
- The three destinations, per the proposal: **routed** (70+, emailed to the manager) · **held** (below 70, listed for corporate with score and reason, any hold reopenable) · **flagged** (sensitive answers and management levels go to a person — never auto-rejected).
- Talking point on supervision: "Everything starts Reviewed — every score and routing waits for your team. When recommendations keep matching your decisions, routine steps run lighter — *your* call, reviewed against the measured match rate. The hiring decision is never automated, at any level."

## Beat 6 — Chat with the Store Router (proposal p.2 command center)

- Open the **Store Router** agent chat. Ask, live: *"What does the pipeline look like this week, by store?"* then *"Which stores have shortlists sitting unreviewed?"*
- Talking point: "This is the view a two-person corporate team has never had across six stores — and the same numbers feed the monthly report against the baseline we record in week one." (It will caveat that the data is synthetic — that's by design; let it.)

## Beat 7 — The standard learns, with approval (proposal p.6, "how the standard learns")

- **Dashboard → Learnings** (or the `scoring-rubric` playbook's calibration section). Show the seeded example — the proposal's own: *"Applicants who listed prior food-service shift work stayed longer in deli roles → weight shift-work slightly higher for Deli Clerk levels 1–2."*
- Talking point: "Your approves, adjusts, and declines are captured. When a pattern has enough evidence and is job-related, the system **proposes** the change in plain language — and nothing changes until you approve it. Approved once, applied in all six stores the same day, versioned and reversible. History informs proposals; people change the rules."
- Point at Evals (`candidate-scoring-baseline`): "And these eight cases re-run after any change — the smoking flag, the butcher-history rule, and the fairness case are stop-ship. The standard can't silently drift."

## Beat 8 — The registry tease (proposal p.12)

- Back to **Agents**: the seven **inactive** coworkers, matching the proposal's Agent Registry line for line — Onboarding Guide, Certifications & Policy, Performance & Coaching, Sourcing Agent, SOP Assistant, Scheduling Support, Vendor Communications.
- "Hiring is the first job, not the last. Each of these joins the same subscription by a one-line amendment — fixed quote in writing first, weeks not a project, same supervision and audit trail. Nothing on this screen is in the current price, and nothing activates until you say so."
- Close: what's placeholder vs. real — the rubric criteria, the 70 threshold, manager routing, and application wording are demo baselines; setup weeks 1–2 replace them with Retail Hiring Workforce's real job descriptions in the criteria sessions (the ones the HR lead is sending inputs for).

---

## Q&A landmines — know these cold

- **"Can it reject people automatically?"** No — and it's built so it *can't*. Below-threshold applicants are held, visible, reason recorded, recoverable. Sensitive answers route to a person. Declines are human decisions.
- **"What about smokers?"** Flag, never a filter. Score unaffected, manager still sees them, CEO approves per your existing policy. Show the flag in the review queue if asked.
- **"Is this fair / legal to use for hiring?"** It applies the same approved, job-related criteria to every applicant and logs every decision with its reasoning — more consistent and more auditable than today. It never scores on personal attributes, no automated adverse action is ever taken, and your counsel can review the rubric at any time. (Don't go further than this; hiring-tool compliance formalities — e.g. notice requirements in some jurisdictions — are an engagement-scope conversation, noted in the data room.)
- **"What does it cost?"** Per the the proposal: **a phased monthly commercial structure — quote nothing else cold.
- **"What if we want out?"** 30-day cancellation right on every term — written notice any time, full export of criteria, data, and decision history. The term sets the rate; the exit right stays.
- **"Can managers still get emails like Indeed sends?"** Yes — that *is* the delivery. The portal is corporate's view; managers need no new tool, and any manager who wants a login for their own store can have one.
- **"Does this touch ADP or your review system?"** No writes into either. ADP receives hired-candidate details as an export you trigger; the existing performance-review system has no connection of any kind and stays exactly as it is.
- **"Who owns the data / what do we own in year three?"** Retail Hiring Workforce owns the scoring standard, the applicant data, and the decision history — exportable at any time, with a documented self-host path (the platform core is open source, MPL-2.0). "With a rented ATS the year-three answer is a login; here it's a standard trained by three years of your own decisions."
- **"How do we buy it?"** Order Form signature, then either a monthly Metacto invoice (net-30) or AWS Marketplace private offer — identical product, price, and terms; switchable at renewal.

## Known demo limitations (be upfront if touched)

- Applicant data, manager names, and store emails are synthetic fixtures.
- The final "send to manager" step is a stub — it records the send; v2 wires real email.
- Source sync needs `OPENAI_API_KEY` (embeddings); run it before the meeting, not during.
- Scores come from the demo rubric, not Retail Hiring Workforce's real criteria — say so proactively at Beat 8.
- The curated fixtures target the proposal's 88/81/74, but scores come from a live model run — treat "≈88" as a band, not a promise, and dry-run before the meeting.
