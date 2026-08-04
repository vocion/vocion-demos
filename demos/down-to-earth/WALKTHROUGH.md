# Down to Earth — Hiring Workforce demo walkthrough

The demo script for presenting to Amy (and the HR manager). Each beat maps to a page of the Jul 24 proposal, so the demo *shows* what the doc *says*. Total runtime ~15 minutes. Setup must be done beforehand (see README — DB, migrate, seed, context apply, source sync, and at least two pre-run workflow runs so the review queue isn't empty).

**The one-sentence frame to open with:** "Every applicant from Indeed and your website gets read, scored 1–100 against criteria you set, and routed to the right store and manager — and a person approves every step. Managers still decide."

**Video version:** `assets/dte-hiring-demo.mp4` is a 2.5-minute rendered reel of these same beats (stylized "illustrative interface," watermarked, synthetic data) — use it as the send-ahead with the proposal or the leave-behind after the live demo. It is *not* a recording of the real product; say so if asked.

---

## Beat 1 — Sign in → the portal (proposal p.1, "one portal")

- `http://localhost:3003/sign-in` → autofilled demo creds → dashboard.
- Talking point: this is the portal from the proposal cover — one place for corporate and store managers, **outside of ADP** (their words), look-and-feel theirs like Trackstar. Corporate sees every store; a manager login sees only their store's shortlist.
- Don't tour the nav yet. Go straight to the story: an application arriving.

## Beat 2 — Sources: Indeed + website (proposal p.3–4, context layer)

- **Dashboard → Sources.** Show `Indeed` and `Careers — Join our Team` connected, last sync, ~60 documents.
- Talking point: "Both of your channels land in one place. This is the demo fixture at your real volume — sixty applicants a month. Swapping in the live Indeed feed changes nothing downstream."
- Also on screen: `downtoearth.org` as a source — the platform reads the company's own standards pages. Quick aside, don't dwell.

## Beat 3 — The workforce (proposal p.5, the five agents)

- **Dashboard → Agents.** The five: Resume Review, Candidate Scoring, Store Routing, Hiring Coordinator, Hiring Analytics.
- Open **Candidate Scoring** → show the system prompt lives in a governed, versioned record — "your criteria are written down and applied the same way in every store. Today it's subjective, in each manager's head. This is the fix."
- Point at Playbooks (`hiring-standards`, `scoring-rubric`): "Your two deal-breakers from our call are encoded — the plant-based on-property policy, and smoking flagged for CEO approval, never auto-rejected."

## Beat 4 — Run an application through, live (proposal p.2 + p.6)

- **Dashboard → Workflows → Applicant Intake → Run.** Paste a fixture application (pick from the cheat sheet below).
- Narrate the steps as they run: **review** (raw application → structured profile) → **score** (1–100 + the "why" in plain English) → **route** (right store, right manager, shortlist email drafted) → **pause**.
- It stops at the approval gate. "Nothing was sent. It's waiting for a person."

### Cheat-sheet applications (from the fixtures — pick two or three)

| Case | Use | What it demonstrates |
|---|---|---|
| Deli/food-handler applicant with weekends stated, plant-based ack'd | the clean pass | score in the 80s, routed to their store, manager decides |
| `smokes_or_vapes: yes` applicant with strong cashier history (e.g. APP-IN-001) | **the money moment** | high score UNCHANGED, flag attached: "CEO approval required per policy" — exactly how Amy described their process |
| Butcher-shop/seafood-counter history (e.g. APP-IN-002) | the nuance | history counts as *relevant food-handling experience*; policy is about property, not past jobs |
| Rideshare driver applying for Store Manager | Amy's own example from the call | held below threshold — visible, not deleted, never auto-rejected |
| Missing availability | the Coordinator | scored as "unknown," follow-up email drafted, one email asks for everything |

## Beat 5 — The review queue (proposal p.6–7, trust model)

- **Dashboard → Review.** The pre-run items + the one just created, side-by-side: original application, profile, score + why, drafted shortlist email.
- **Approve one live.** "That's the whole human gate — approve, adjust, or decline. Every decision is logged, and every decision trains the rubric."
- Talking point on trust levels: "Everything starts here, fully supervised — Drafted. When the system's recommendations match your team's decisions consistently, *you* can promote routine steps to a lighter touch. The hiring decision itself is never automated, at any level."

## Beat 6 — Chat with Hiring Analytics (proposal p.5, corporate visibility)

- Open the **Hiring Analytics** agent chat. Ask, live: *"What does the pipeline look like this week, by store?"* then *"Which stores have shortlists sitting unreviewed?"*
- Talking point: "This is the view a two-person corporate team has never had across six stores." (It will caveat that the data is synthetic — that's by design; let it.)

## Beat 7 — The roadmap tease (proposal p.9 + p.13)

- Back to **Agents**: point out the three **inactive** agents (Store Concierge, Lifestyle Editor, Guest Feedback). "Same platform, same context layer, same review queue — this is what 'the platform grows with you' looks like. The performance-review tool you asked about, the Trackstar replacement, deploys the same way. Nothing to re-procure."
- Close: what's placeholder vs. real — the rubric criteria, threshold, manager routing, and application wording are demo baselines; weeks 1–3 of the engagement replace them with Down to Earth's real job descriptions (the ones Amy is sending).

---

## Q&A landmines — know these cold

- **"Can it reject people automatically?"** No — and it's built so it *can't*. Below-threshold applicants are held, visible, recoverable. Declines are human decisions.
- **"What about smokers?"** Flag, never a filter. Score unaffected, manager still sees them, CEO approves per your existing policy. Show the flag in the review queue if asked.
- **"Is this fair / legal to use for hiring?"** It applies the same job-related criteria to every applicant and logs every decision — that's more consistent and more auditable than today. It never scores on personal attributes, and no automated adverse action is taken. (Don't go further than this; hiring-tool compliance formalities — e.g. notice requirements in some jurisdictions — are an engagement-scope conversation, noted in the data room.)
- **"What does it cost to run?"** Per the proposal p.11: fixed platform fee; model usage billed at cost against a ceiling they set; at ~60 applicants/month it's a small line. Baseline in month one; never quote a number cold.
- **"Can managers still get emails like Indeed sends?"** Yes — that's the routing step; the portal is additive, not a forced change of habit.

## Known demo limitations (be upfront if touched)

- Applicant data, manager names, and store emails are synthetic fixtures.
- The final "send to manager" step is a stub — it records the send; v2 wires real email.
- Source sync needs `OPENAI_API_KEY` (embeddings); run it before the meeting, not during.
- Scores come from the demo rubric, not Down to Earth's real criteria — say so proactively at Beat 7.
