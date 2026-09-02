# Havis — Data Room · Combined Context
Single-file export of the Havis data room: the README overview followed by every transcript, email, and attachment in full text. Generated for pasting into an LLM (ChatGPT / Claude).
Source: clients/havis/data-room/


══════════════════════════════════════════
OVERVIEW — README / INDEX
══════════════════════════════════════════

# Havis — data room

**Havis Inc.** (Warminster, PA) manufactures in-vehicle and mobile-workspace hardware — docking stations,
vehicle-specific consoles, mounts, storage and power systems — for public safety, utilities, logistics,
healthcare, retail and defense fleets. **Joe Alderfer, Manufacturing Engineer**, came in **inbound** on
**2026-08-24** through a Metacto Google paid-search ad on the keyword *"ai consultant"*. The intro call was
held **2026-08-28**. The problem is **missing or incorrect parts in hardware kits** across ~2,000 SKUs,
which Joe calls *"our biggest problem"* — roughly one customer complaint a day, at least half kit-related.
The engagement on the table is a **custom computer-vision kit verification system** replacing per-kit
programming with reference-based matching.

> **Status as of 2026-08-31.** ✅ **The images arrived.** Chris sent the follow-up himself Fri Aug 28
> 16:13 PT; Joe replied Mon Aug 31 07:15 ET with a fileshare link after his zip was blocked by size in his
> own outbox on Friday. **`https://fileshare.havis.com/s/95A6cRPQ8sgi62B`** — ⚠ **not yet downloaded,
> counted or inspected.** Everything upstream is filed: the Zoom VTT as the authoritative transcript,
> channel sweep, company/budget research, the 9-sheet AWS technical brief and the 13-sheet proposal, both
> render-verified with PDFs, neither sent.
>
> 🔴 **Next, and it is the whole job: download the pack, count it, build the prototype.** Committed to Joe
> for **Fri 2026-09-04** — which is already a four-meeting day. Ask the CAD-versus-hand-drawn question on
> the walkthrough; it was cut from the shortened email and is still the highest-value unknown.
>
> 🔴 **Correction:** Joe is **Sr. Manufacturing Engineer**, per his own signature — not "Manufacturing
> Engineer" as HubSpot, Andrew's tracker and this room have carried since Aug 24.
>
> ⚠ **Two decisions for Chris.** The brief uses a gated **$28K proof → $120K launch (NTE) → $20K/mo →
> $15K completion incentive**; the proposal still carries a flat $120K/$20K, still names the vendor three
> times, and still describes the superseded edge-appliance architecture. **The brief is the current
> document.** HubSpot: contact `243974146582` at **Lead**, company `57722214256`, **0 deals**, **no
> owner**, **nothing logged from the call**.
## Structure

| Path | Holds |
|---|---|
| `attachments/` | Company profile, lead origin, technical research, channel sweep |
| `emails/` | Email threads |
| `transcripts/` | Call transcripts |
| `assets/` | Logos, screenshots |

## Index

### Transcripts
- **2026-08-28** · [Havis & Metacto intro — discovery call](transcripts/2026-08-28-havis-metacto-intro.md) — ⭐⭐⭐ **The whole engagement, from the Zoom VTT with real speaker labels.** 129 turns verbatim plus a 23-item decision log: 2,000 kit SKUs, ~1 complaint/day, the silhouette system as recorder not gate, why the vision sensor fails on screws, Joe's own words that he wants an alternative, and the Teams/Microsoft signal. Supersedes the Granola read. Raw file: [`.vtt`](transcripts/2026-08-28-havis-metacto-intro.vtt).
- **2026-08-28** · [Zoom VTT — raw](transcripts/2026-08-28-havis-metacto-intro.vtt) — The unedited Zoom cloud transcript with timestamps, kept as the primary source behind the markdown above.

### Emails
- **2026-08-31** · [Joe sends the sample pack — the prototype is unblocked](emails/2026-08-31-joe-sends-the-sample-pack.md) — ⭐⭐⭐ **The images arrived.** The fileshare link, why the three-day gap was a mail-size failure rather than hesitation, the Sr. Manufacturing Engineer title correction, and the Sophos link-rewriting to expect on anything sent to Havis.
- **2026-08-28** · [Follow-up to Joe — thanks, and the sample pack (DRAFT)](emails/2026-08-28-chris-followup-sample-pack-DRAFT.md) — ⭐⭐ 🔴 **Unsent Gmail draft**, verified through Vocion. Thanks with evidence it was heard, excitement earned on Havis's own groundwork, **trust built by naming the one thing we will not promise**, the de-risked ask, and three numbered next steps. Also records the **full inbox trawl**: Joe has sent nothing, and the photos he mentioned went to Andrew, not Chris.
- **2026-08-24** · [Inbound form submission and intro invite](emails/2026-08-24-hubspot-form-submission-and-intro-invite.md) — ⭐⭐ The paid-search click on "ai consultant", the medium-intent form on /ai-implementation-agency, and Andrew booking the intro 34 minutes after it hit the inbox. The HubSpot notification is still unread.

### Attachments
- **2026-08-28** · [Company scale, ownership, and how the estimate lands](attachments/2026-08-28-company-size-and-budget-frame.md) — ⭐⭐⭐ 🔴 **Internal only.** Havis is **PE-backed (Guardian Capital Partners, Dec 2020)**; ~$81–126M revenue and ~290–400 people (Apollo contradicts itself on both); **23 in IT and 0 in data science**; **SOLIDWORKS in the stack**, so the silhouettes are probably CAD-derived; a Microsoft/Azure footprint to expect pushback from; and where $28K, $120K and $360K land against a benchmarked discretionary IT budget.
- **2026-08-28** · [KEYENCE integration surface research](attachments/2026-08-28-keyence-integration-surface-research.md) — ⭐⭐⭐ What is and is not possible around KEYENCE hardware, verified claim by claim against KEYENCE's own IV3/IV4 spec pages, plus the claim we must never make. Carries a supersession block at the top: the Aug 28 call flipped its strategic conclusion from wrapper to alternative.
- **2026-08-28** · [Havis channel sweep](attachments/2026-08-28-ziggy-channel-sweep.md) — ⭐⭐ Gmail, Calendar, Zoom, HubSpot, Slack, Drive and web, all seven channels, with every HubSpot figure cross-checked through Vocion's typed reads. Records the Zoom recording-scope blocker and the HubSpot hygiene gaps.
- **2026-08-28** · [Havis company profile](attachments/2026-08-28-havis-company-profile.md) — ⭐⭐ What Havis makes, the nine verticals, HQ, 80+ years of manufacturing heritage and their own crash/airbag/EMI validation regime, and why vehicle-specific consoles are literally kits.
- **2026-08-24** · [Lead origin and first read](attachments/2026-08-24-lead-origin-and-first-read.md) — ⭐⭐ Joe's HubSpot record and the single second-hand statement of the use case that existed before the call.

## Deliverables

- **2026-08-28** · [Kit verification technical brief](../2026-08-28-havis-kit-verification-technical-brief.html) — ⭐⭐⭐ **9 sheets.** Build-versus-buy with the crossover arithmetic, the four checks, the **AWS architecture and service map**, run cost against stated assumptions, a break-even table on Havis's own complaint volume, the **gated $28K/$120K price**, and an honest read on **AWS MAP / Modernization SPI / the new customer incentive / MDF / Marketplace**. **AWS is pushed on the co-sell rationale** (AWS's account team engages alongside us; the funding exists only inside that relationship) **with a stated Azure fallback**, since Havis is a Microsoft shop. ⭐ **Revised to an all-AWS architecture with no edge appliance** per Chris: the existing capture program uploads to S3, inference runs in Lambda or a scheduled SageMaker GPU endpoint, and the verdict returns to the station browser over a WebSocket API. Nothing installed on the plant floor. Vendor deliberately unnamed. Render-verified, PDF exported. **Not sent.**
- **2026-08-28** · [Kit Verification Launch proposal](../2026-08-28-havis-kit-verification-launch-proposal.html) — 13 sheets, the full launch document. Render-verified, PDF exported. **Not sent**, and **superseded on pricing structure by the brief**; it also still names the vendor.
- **2026-08-28** · [Technical approach](../2026-08-28-technical-approach.md) — Internal. Six-layer architecture, the resolution arithmetic, what we will not say, nine open technical questions.


## Notes

- ⭐⭐ **Havis is PE-backed** (Guardian Capital Partners, Dec 2020). That is why the gated structure is right: $28K is an operational decision, $120K is sponsor-visible. **Shadow mode is the PE-friendly feature** — it produces a board-reportable baseline where today there is an estimate.
- ⭐⭐ **23 people in IT, zero in data science.** That single pair answers "why don't we build this ourselves?" — Havis can run and maintain it, and cannot build it. Exactly the shape Metacto sells.
- ⭐⭐ **SOLIDWORKS is in the stack**, so the silhouettes are probably generated from CAD/BOM rather than drawn. If true, region maps for the long tail are derivable and the 2,000-SKU problem shrinks. **Never say we saw this** — the drafted email asks Joe as a question.
- 🔴 **Havis is a Microsoft shop with an Azure signal** (M365, Exchange, Power BI, SQL Server, Azure VM Scale Sets, Teams). ⭐ **The brief's position, per Chris: push AWS on the co-sell rationale** — a registered co-sell brings AWS's own account team and solution architects in alongside Metacto, and the funding paths exist only inside that relationship, which is a genuine customer-side benefit rather than a Metacto one. **Then state the fallback plainly:** every component is portable (containers, PostgreSQL, open formats), the only AWS-specific piece is the edge runtime, Azure IoT Edge is a direct equivalent, and if Havis IT is standardised on Azure we build it there and say so before signature, not after. Also worth knowing: **there is no managed shortcut on either cloud** — Lookout for Vision is gone and both Rekognition Custom Labels and Azure Custom Vision train per label set.
- ⭐⭐ **No edge appliance — everything runs in AWS** (Chris, 2026-08-28). Two costs to state plainly rather than bury: **latency moves from sub-2s to roughly 2–4s**, dominated by image upload and dependent on the Warminster link (measuring it is a Stage 1 deliverable), and **inference becomes metered per scan instead of effectively zero**, so kit volume is now the main cost driver. What it buys: no capex, nothing to patch or refresh on the plant floor, and no physical asset for a 23-person IT function to own. ⚠ Over three years the GPU design costs more than the appliance would have — recorded in the technical approach, not hidden.
- ⭐ **Cloud run cost is now $215–790/month** for one site, the spread being the CPU-Lambda design versus a scheduled GPU endpoint. Stage 1 decides which. **No hardware to buy at all.**
- ⭐ **AWS has no managed shortcut here.** **Lookout for Vision was discontinued 31 Oct 2025**, and Rekognition Custom Labels trains per label set, reproducing the same per-kit wall. Custom models on SageMaker is the available path, not a preference. This kills the "why not just use the managed service" question before it is asked.
- **AWS funding must be registered before work starts** and is rarely retroactive. Registering the opportunity ahead of Stage 1 is the action; MAP is the best fit (it covers modernization, not just migration), Modernization SPI plausible, MDF irrelevant to delivery.
- **Multiple US sites plus the UK, and three subsidiaries** (Vanner, Pro-gard, Engineered Network Solutions). The call assumed Warminster only. Vanner maps to the Power Management line — expansion surface, and a reason not to hard-code one site.

- ⭐ **The constraint is cost-per-SKU-enrolled, not accuracy.** 6 kits programmed in KEYENCE against 2,000 SKUs. Any architecture needing per-kit authoring dies at the same wall. Reference-based matching (enrol by one photograph) is the whole proposition.
- ⭐ **The Pareto is extreme:** ~400 existing silhouettes cover **~80% of assembly hours** at ~10% of SKUs. Phase 1 never needs 2,000 kits.
- ⭐ **Havis already owns the hard input.** Thousands of good images per kit, captured daily, named with production order + serial, joinable to complaints. That is a labelling pipeline already running, and it is the reason this is tractable.
- 🔴 **Never claim we can retrain a KEYENCE camera through an API.** No documented headless interface exists. The proposal builds an alternative, and its FAQ says this in plain terms.
- 🔴 **No zero-defect promise.** Joe wants zero; the commitment is the capability plus a measured baseline established in shadow mode.
- **Registration before recognition** is the highest-leverage design choice: glare, camera angle and background are geometry and photometry problems, solved deterministically so the models never spend capacity on them.
- **Crop before you count.** 4K across 36 inches leaves a quarter-inch screw head ~28px. Detectable — but only if the region is cropped before detection, never after.
- **Budget is open and Joe is not the buyer.** *"Not really… whatever the best solution to solve this issue is, that's really what we want to go after."* And *"if that comes at a higher cost, I'm sure I can probably sell that… the leadership wants to know that just the best solution."* **Leadership is unnamed.** Sell Joe the argument he will carry.
- **Havis IT is a real dependency, not a courtesy.** No known cloud footprint; Joe must bring them in. Next-steps step 2 makes that an explicit ask.
- Employee count (271) is aggregator-modelled. Never quote it back to Havis.
- Granola diarizes only "Me" and "Them", so Andrew and Joe share a label. Attributions in the transcript are reconstructed and flagged.

## Open questions / to finish

0. ✅ **Sent Fri Aug 28, answered Mon Aug 31.** Superseded item: Sits unsent in Chris's Gmail Drafts (`r-2625247590206543305`), rewritten 2026-08-28 to carry thanks, excitement, trust, the ask and three numbered next steps. It is the chase for item 1.
0b. ⭐ 🔴 **Ask Andrew for the photos Joe already sent him.** A full trawl of Chris's mailbox found **none** — no message from Joe at all, nothing in spam, and the HubSpot form carried no uploads. Andrew said Joe *"reached out along with the photos"*, so Andrew is holding them. **If he has usable samples the prototype can start immediately** rather than waiting on Joe.
1. 🔴 **Download, count and inspect the sample pack**, then build the prototype for Fri Sep 4. The link is filed and unopened; the actual good/bad split is unverified.
2. 🔴 **Build the prototype** — registration + per-region presence + one fastener region, against Joe's images. Due with the proposal **Fri 2026-09-04**.
3. 🔴 **Reconcile the two price structures.** The brief uses the gated **$28K proof → $120K launch (NTE) → $20K/mo → $15K completion incentive**; the proposal carries a flat $120K/$20K with no proof stage. **The brief's structure is the better one** and matches Chris's stated pattern. Pick one, then align the other document.
3b. ⚠ **The proposal names KEYENCE three times.** Chris's framing directive is to leave the vendor unnamed. The brief complies; the proposal needs a pass if it is going to be sent.
4. 🔴 **Which KEYENCE VS model exactly?** Joe said "VS series". The model decides whether any additional AI learning is actually available as an interim option.
5. **Which system holds the kit bills of material?** ERP unnamed. The proposal deliberately says "your system of record" rather than guessing.
6. ⭐ **Are silhouettes generated from CAD/BOM data or drawn by hand?** If generated, region maps for the long tail are derivable programmatically. Single highest-value question on the list.
7. Where do the ~1/day complaints live, and are they linked to serial? That join is the negative training set.
8. Fixed station lighting or ambient? A controlled light per station may be the cheapest accuracy point available.
9. How many capture stations, at how many sites? Only Warminster confirmed.
10. Are bagged fasteners counted through the bag or laid out loose? Materially different vision problems.
11. **Who is the economic buyer?** Joe is the only named contact. No sponsor, no budget holder, no timeline.
12. **Kickoff date of Monday 2026-09-15 in the proposal is proposed, not agreed.**
13. **No send email built yet** — deliberate. It would open on the prototype, which does not exist. Build the light-themed copy page once the prototype is done.
14. HubSpot hygiene: **no owner** on the Havis company, **nothing logged from the Aug 28 call**, lead status still NEW, Andrew's sheet still says "Qualified: No". All stale as of the call.
15. Zoom cloud-recording scopes are missing on both Ziggy's and Vocion's credentials (`cloud_recording:read:list_recording_files`). Worth fixing once — this will recur on every call.
16. 🔴 **Fix Joe's title to Sr. Manufacturing Engineer** in HubSpot and anywhere a document names him.
17. No Havis logo asset on file; both covers use a text lockup. Fine, but a mark would be better.
17. 🔴 **How many sites assemble kits, and does the problem exist at Vanner or Pro-gard?** Apollo shows multiple US sites plus the UK. The call assumed Warminster.
18. **Confirm revenue and headcount from a non-aggregator source.** Apollo contradicts itself on both ($81M vs $126.2M; 290 vs 400). None of it may inform pricing until verified.
19. Who is the **CFO / VP Operations / VP Engineering**, and is a Guardian Capital operating partner involved in capex? Joe is still the only named contact.
20. **Get Chris into AWS Partner Central and Payee Central** (Jamie was sorting portal access on Aug 3). Funding cannot be registered without it, and registration must precede Stage 1.
21. Station count and daily kit volume are assumptions in the brief (8 stations, 1,000 kits/day, ~22,000 scans/month). **Now load-bearing for cost**, since inference is metered. Replace with real numbers.
22. 🔴 **Measure the Warminster internet link.** The all-AWS design puts image upload on the critical path for station latency. Stage 1 deliverable.
23. **Confirm Joe can modify the capture program** to upload to S3. If not, an AWS Storage Gateway VM on existing Havis hardware is the fallback.
24. ⚠ **The proposal still describes the earlier edge-appliance architecture** and needs reconciling with the brief if it is going to be sent.


══════════════════════════════════════════
CALL TRANSCRIPTS — Havis & Metacto intro — discovery call  (Aug 28)
Participants / provider: Chris Fitkin (Metacto), Andrew Troya (Metacto), Joe Alderfer (Havis, Manufacturing Engineer)
Source: transcripts/2026-08-28-havis-metacto-intro.md
══════════════════════════════════════════

# Havis & Metacto Intro — discovery call

**Date:** 2026-08-28, 10:30–11:00 PDT (13:30 ET) · 32 min · Zoom `82809547675`
**Participants:** Chris Fitkin (Metacto), Andrew Troya (Metacto), **Joe Alderfer** (Havis, Manufacturing Engineer)
**Source:** ⭐ **Zoom cloud VTT, provided by Chris 2026-08-28** — the authoritative record. Raw file filed
alongside as [`2026-08-28-havis-metacto-intro.vtt`](2026-08-28-havis-metacto-intro.vtt). 129 speaker turns,
timestamps preserved (mm:ss from recording start). ⭐⭐⭐

> **This file supersedes the Granola-derived version** that was filed earlier the same day. Granola
> diarized only "Me" and "Them", collapsing Andrew and Joe into one label; the Zoom VTT carries real
> speaker names for all three. The substance agreed, and every figure in the decision log below is
> confirmed by the VTT. Granola's transcription garbles that the VTT corrects: "two-scale outlines" is
> **to-scale outlines**, "can's / TNS / key ants / key inch" are all **KEYENCE**, and "Jerry" was Chris
> addressing **Joe**. Granola's structured summary remains a useful second read at
> `https://notes.granola.ai/d/3ab235c7-2dac-40f1-81b6-170881b950c2`.

---

## Decision log

| # | What was established | Attribution |
|---|---|---|
| 1 | Havis assembles **~2,000 distinct hardware kits**: sheet metal, plastic, purchased parts, bagged and loose hardware mixed in one kit. | Joe, 2026-08-28 |
| 2 | **The biggest problem in the business** is missing or incorrect parts in those kits. Assemblers *"put the wrong screw in… forget a component."* | Joe |
| 3 | Volume: **~1 customer complaint per day on average, at least half kit-related.** True rate unknown because product ships to distributors and resellers who warehouse it before shipping on. | Joe |
| 4 | Current control: printed **to-scale silhouettes** at each station, assembler lays parts out, presses a USB button, a **4K webcam** photographs the tray, image lands on a **network-drive folder**. Operator types and scans the **production order** into Joe's program; **production order + date + time are written into the photo filename**, and the serial number is captured. Joe built **an Excel tool that analyses it for compliance**. | Joe |
| 5 | ⭐ **That system gives traceability, not prevention.** Joe: *"there's still that level of error that could happen where this isn't really checking anything."* Chris: *"You're being responsive rather than proactive."* It has already exonerated Havis on complaints: *"we actually did put everything in there, they must have just lost a screw."* | Joe / Chris |
| 6 | Silhouette coverage: **~300–400 built**, covering **"at least 80% of the total hours we're spending on jobs"** but only **"10 or something percent of the SKUs."** | Joe |
| 7 | Havis bought a **KEYENCE VS-series** vision camera. **~6 SKUs programmed** so far: *"we'll make them, we have to deploy them, go back and make tweaks, and all that."* | Joe |
| 8 | It works reliably where a kit has **no small hardware** — the driver/passenger mirror-image brackets, which assemblers **still mix up even with the silhouette present**. | Joe |
| 9 | 🔴 **It fails on small hardware.** *"There's really no tools in the software side that can really count hardware like this… little bits of glare, changes in lighting, there's just not a lot of data for the tools to go off of… there's no AI for those tools, so I can't go back and add additional images to retrain it."* | Joe |
| 10 | 🔴 **Per-item programming does not scale.** *"We have to program each individual item in the kit, and inspect for it. And then we have to do that for, like, 2,000 kits, which is… pretty insane."* | Joe |
| 11 | Physical constraint: silhouettes are **24 × 36 inches**; the camera must hold that field of view **and** resolve a screw. Station webcams are **4K**; the KEYENCE camera is **3.2 MP**, though it has true optical (lens-moving) zoom. | Joe |
| 12 | ⭐ Vendor product-line split is a live obstacle: *"every different camera that they come out with, they come out with a different software."* A **lower-resolution model has exactly the software features Havis wants**; the one they bought has the hardware and not the software. *"Which is kind of crazy to me."* | Joe |
| 13 | ⭐⭐ **Havis is not committed to the incumbent.** *"We're looking mostly for an alternative, not even… it doesn't even have to use their cameras."* And: *"We're definitely not tied, like, married to that, 100%."* The camera retains value for other applications *"more geared towards what it's meant for."* | Joe |
| 14 | ⭐ **Joe arrived at the architecture himself**: an AI trained on whole-kit good images that flags anomalies — *"would it then be able to say, oh, hey, this one looks odd, we should check this out, without us having to program thousands of different… each individual."* He also framed the economics: *"that works great for if we had 20 SKUs."* | Joe |
| 15 | Chris proposed a **holistic custom CV model** trained good-versus-bad at scale rather than per-item templates, improved by reinforcement over time, with historical complaint images feeding the negative set. | Chris |
| 16 | Chris named the hard parts without discounting them: background and camera-angle variation, glare, mirrored parts, fine screw counts — *"this is the exact case of custom computer vision model training"* — but flagged the honest sequence as **train, deploy, confirm, test, add more training data.** | Chris |
| 17 | Closest Metacto precedent: **G-Sight** — a custom CV model trained against printed laser dry-fire target sheets, read through an iPhone camera to score which zone a laser hit. Same structure: a pre-designed board, identify what is present and absent. | Chris |
| 18 | The incumbent-wrapper option was raised and downgraded live: an agent automating setup and correction is possible, but *"their software and APIs are not great, and they're very different from hardware to hardware."* Joe did not pursue it. | Chris |
| 19 | 🔴 **No timeline and no budget.** *"Whatever the best solution to solve this issue is, that's really what we want to go after… if that comes at a higher cost, I'm sure I can probably sell that. It's just, you know, the leadership wants to know that just the best solution to this."* | Joe |
| 20 | Havis has **no known custom cloud software**: *"Not that I know of, I'd have to involve our IT team."* Chris's stated reason for asking is to align to what Havis IT can maintain long-term. | Joe / Chris |
| 21 | ⚠ **Havis runs Microsoft Teams** (*"Usually we use Teams, and we share screens"*) and Chris referenced OneDrive without correction. A Microsoft-leaning shop, which is worth knowing when proposing an AWS deployment. | Joe |
| 22 | 🔴 **Havis needs "down to zero."** *"We're really just trying to get this down to zero. Like, we really just want to completely kick any possibility that a mistake could be made."* | Joe |
| 23 | Joe is in **Warminster, PA**; Chris's family is from the Philadelphia area. Andrew is in New Jersey. | — |

## Committed next steps

| Owner | Commitment | Due |
|---|---|---|
| **Joe** | Send a **sample image pack — ~15 good and ~5 bad** kit silhouette photos, as a zip or hosted link, by email. Good images exist in the thousands; bad ones he *"will have to physically get."* | *"today or Monday"* — 2026-08-28 or 2026-08-31 |
| **Chris** | Return with **how he would approach and price it**, plus a **working prototype** showing a CV scan of Joe's sample images. | **Within one week — by Fri 2026-09-04** |

---

## Transcript

Timestamps are mm:ss from the start of the recording. Consecutive turns by one speaker are merged.
Ellipses and repetition are Zoom's verbatim capture, left as recorded.

**[02:44] Andrew Troya:** Hello, Chris.

**[02:52] Chris Fitkin:** Hello, Andrew.

**[03:34] Andrew Troya:** How was your day today, Chris?

**[03:37] Chris Fitkin:** It's good. Been in meetings, but… And had to run to the post office at 8 AM.

**[03:43] Andrew Troya:** Oh, wow.

**[03:45] Chris Fitkin:** Just… dropping… dropping stuff up, package off that I had to send out.

**[03:51] Andrew Troya:** Better to get it up today. beginning, then try.

**[03:55] Chris Fitkin:** At least it's done.

**[03:57] Andrew Troya:** Great.

**[03:59] Chris Fitkin:** Who are we waiting for on this call?

**[04:02] Andrew Troya:** We're waiting for Joe Alderfer. He confirmed to that call. But he was actually the inbound lead. He wanted, I believe, Some type of, visual guide.

**[04:15] Chris Fitkin:** Yeah, okay.

**[04:18] Andrew Troya:** For, like, some type of visual, but I just emailed him. Oh, he's… yeah. Great. Hey, Joe, can you hear us?

**[07:08] Joe Alderfer:** Hello? Can you hear me?

**[07:10] Andrew Troya:** Yeah. How's it going?

**[07:12] Joe Alderfer:** Hang on, I think I'm on two devices. Alright. Is that better?

**[07:29] Andrew Troya:** Much better.

**[07:30] Joe Alderfer:** Alright, there we go. Sorry I'm late, I got caught up in some things.

**[07:34] Chris Fitkin:** Busy working?

**[07:36] Joe Alderfer:** Yeah, yeah. Bam.

**[07:38] Chris Fitkin:** How you doing, Joe? Good morning.

**[07:40] Joe Alderfer:** Good morning, how you doing?

**[07:42] Chris Fitkin:** Very good.

**[07:43] Joe Alderfer:** I guess good afternoon, we'd say.

**[07:45] Chris Fitkin:** Is it… where are you? What time is it?

**[07:47] Joe Alderfer:** We're in Pennsylvania, so it's, like, 1.30.

**[07:52] Chris Fitkin:** And you're over with Andrew, he's in New Jersey.

**[07:56] Joe Alderfer:** Yeah, pretty close.

**[07:57] Chris Fitkin:** Me, I'm in sunny Southern California, and it's still Friday morning over here.

**[08:03] Joe Alderfer:** Nice, nice.

**[08:06] Chris Fitkin:** I wonder…

**[08:07] Andrew Troya:** Yo,

**[08:08] Chris Fitkin:** Oh, sorry, I was just gonna talk.

**[08:10] Andrew Troya:** I'm sorry, man.

**[08:11] Chris Fitkin:** I don't need to.

**[08:14] Andrew Troya:** I was just gonna say, I just, Joe, I filled Chris in a little bit on, You know, you reaching out, along with the photos. So, I kind of filled him in a bit there, but I kind of just wanted to ask you again, just so we have better detail as to, like, what you were needing help with, exactly.

**[08:31] Joe Alderfer:** Okay. Let me… Usually we use Teams, and we share screens on here.

**[08:39] Andrew Troya:** Yeah, you should have permissions.

**[08:41] Joe Alderfer:** There we go. You guys see that?

**[08:44] Andrew Troya:** Yep.

**[08:46] Joe Alderfer:** This is an example of what we're doing now. So we make a bunch of these, hardware kits, so that might be, you know, some sheet metal parts, that might be plastic parts, purchase parts, you know, bags of hardware, loose hardware, kind of all mixed together, in one kit. And our biggest issue that we run into is, missing or incorrect parts in these kits, so the assemblers might, you know, put the wrong screw in, they might, forget a component. So what we did is we made these silhouettes of all the different variations of kits.

**[09:24] Chris Fitkin:** Man.

**[09:25] Joe Alderfer:** you know, we're… there's… and we have, like, you know, thousands and thousands of different kits. Not thousands, we probably have, like. 2,000 total, something like that.

**[09:35] Chris Fitkin:** Yeah.

**[09:35] Joe Alderfer:** So we're still working through making all these silhouettes. But at the same time, we have… we made, like, this pretty simple program that just has a webcam hanging over their workstation, and a little USB button, so the assembler will put all their items on these silhouettes that have the two-scale outlines of each component. Take a photo, it'll upload to our database, And then they'll package it, that's it. So then, if we have an issue, we have traceability to go back and look at these images to see if… because we have the serial number there, too, so if they.

**[10:11] Chris Fitkin:** Good.

**[10:11] Joe Alderfer:** Customer, you know, submits a complaint, they can… we'll ask for the serial number, and then we can go back and check, like, hey. This number, we have the…

**[10:21] Chris Fitkin:** I gotcha.

**[10:21] Joe Alderfer:** Yeah, and sometimes we've had a few that have been like, oh, hey, we actually did put everything in there, they must have just lost a screw or something. Or, you know… But still, you know, there's some… and the silhouettes help the assembler, too, it's… Just so they don't forget things, it makes it a little easier. But there's still that level of error that could happen where this isn't really checking anything. So, I mean, I'll go.

**[10:47] Chris Fitkin:** Yeah, it's just taking a picture, and…

**[10:49] Joe Alderfer:** Yeah.

**[10:49] Chris Fitkin:** Historical information, you're being responsive rather than…

**[10:53] Joe Alderfer:** Right?

**[10:54] Chris Fitkin:** You see.

**[10:55] Joe Alderfer:** So we… gee, I don't have it open. Maybe I can open it. We actually also purchased a… Keyance vision system? one of their VS series cameras. Nice. Let me open this one, see if it'll come up with the… I don't think I have this one active right now, but… We'll see if there's anything I can show, just to kind of give an example. And basically the… That we're able to… Inspect these silhouettes after making a program, and give the operator a pass-fail. The only issue is we've had some trouble With certain portions of it, So, I'm letting this load for a sec. The small hardware this tends to struggle with. There's, there's really no tools, in… in the software side that can really count hardware like this. Like, there's different shape tools, but… you know. Little bits of glare, changes in lighting, there's just not a lot of data for the tools to go off of, so… if they run into an issue where they can't… like, we can't detect a screw, there's… like, there's no AI for those tools, so I can't go back and add additional images to retrain it. So we were just kind of looking at… Different option what's out there, either different vision systems with… some more AI capabilities that we could train, or even, We're thinking some… some sort of AI tool that could be That could review a large amount of images and just kind of look for anomalies. So if we had… if we trained, you know, AI that this certain kit, is supposed to look this way, and we give it this… This image, and then we give it a bunch of others, and then you get… of the same kit. would it then be able to tell if we give it another image. That has an item missing, would it then be able to say, oh, hey, this one looks odd, we should check this out without us having to program Thousands of different… Yeah. like… Each individual… because that's the other thing, when we make these. It's… we're programming… like, this is… this is, one of the vision system kits we made.

**[13:16] Chris Fitkin:** Yep.

**[13:17] Joe Alderfer:** We have to program each individual item In the kit, and inspect for it. And then we have to do that for, like, 2,000 kits, which is… pretty insane. If there's some sort of tool that we could train it on just… The entire thing. That might… that would be a little more doable, and we could deploy that a little quicker.

**[13:39] Chris Fitkin:** That software that you're in is… that's the Keyance software?

**[13:43] Joe Alderfer:** Yes, this is the… this is the Keyance software.

**[13:47] Chris Fitkin:** Let me ask you this, sorry if I'm jumping into questions. Is your goal to use this better, faster, or looking for an alternative to use with their cameras, or kind of open… open-ended?

**[13:59] Joe Alderfer:** Open-ended, I mean, we're looking mostly for an alternative, not even… it doesn't even have to use their cameras, so the cameras were just because, you know, this is our biggest issue right now, we're just trying to throw, like, whatever we can to solve it. So we had them in for a demo, it seemed pretty promising, and we can do, like this one, for example. Is a pretty good candidate, because we've… even with the silhouettes. This is the driver and passenger side bracket, they're mirror images of each other. They're very easy, even with the silhouette, to mix up, and we've even had a few instances where they're still mixing these up. So we're really pushing to use our TNS camera to inspect these, and it works great, because there's no hardware in this kit, so we're pretty reliably able to do this one. Then some of the others, like… like this one, for example. We'd struggle with this, trying to count that… They have these 4 screws exactly, and that it's the correct screw. Or, you know, especially these. These are the… probably one of the tiniest ones we have.

**[15:04] Chris Fitkin:** Those look like Lair themselves.

**[15:06] Joe Alderfer:** And it's… it's hard, because they're so… some of the kits are fairly big, so it's… Like, like this, yeah, this is the same one that was on the vision system. It's fairly big. Like, this is a 24x36 silhouette, so a camera has to be able to see that entire field of view. And then also be able to inspect a screw that's Only this big So you need a fairly good camera to be able to see that. Right now, we just have 4K webcams set up for all these, like, simple stations that are taking the photos. And the Keyens camera is, like, a 3.2 megapixel. But we're just trying to see what's out there, see what options we have to try and solve this issue.

**[15:58] Chris Fitkin:** That's really cool. What's the… what's the size of this issue? What's your, like, return rate, fail rate? On these right now, and what kind of… how big of a business problem is that?

**[16:11] Joe Alderfer:** I mean, it's… our biggest problem, I can say we're probably getting, on average, I'd say we're averaging about one customer complaint per day. And we'll say… at least half of them are related to this. Now, we've solved… it's hard to say, because we get… so we're… we're shipping our products to sometimes distributors or resellers, who then will warehouse it and then ship it out later. So if we… if we ship the kit with an incorrect item.

**[16:50] Chris Fitkin:** You might not find out until…

**[16:51] Joe Alderfer:** Yeah, so it's hard to say how much of this we've actually solved with the… simple program, and I'd say we… we've solved a fair bit of it, but we're really just trying to get this down to zero. Like, we really just want to completely Like, kick any possibility that a mistake could be made.

**[17:13] Chris Fitkin:** Do you like the Kant software? If you thought you could train the master silhouettes Faster, or in some automated way, and find a way to… Add training to support that hardware counting?

**[17:36] Joe Alderfer:** Kind of. I mean, the thing that sucks about the Kian software is they… every, like, different camera that they come out with, they come out with, like, a different software, so none of the… so if we wanted to use an additional, like, one of their other products in tandem with this. It uses, like, completely different software, and it… which is kind of frustrating, because they actually have… they have a lower, like, cap… like, a camera with, like, lower resolution, less hardware capabilities, And it has those exact… the exact software features that we want. But it just doesn't have the hardware to back it up, and then this one, with the hardware, just doesn't have the software side. Which is kind of crazy to me, but… Yeah, so this one also has, like, optical zoom and all that, so we can… Like, some of these we can actually zoom in. On, like, certain portions if you need extra detail. And that's not just a digital zoom, it's like a physical optical zoom, like the lens is moving.

**[18:40] Chris Fitkin:** It's really cool. So, I don't know how much… background you got about us from Andrew or our website, but we built custom software, AI agents, and AI workforce teams for companies that you then host and own yourself, but it gives you an option to customize the software and get the capabilities to exactly what you need, so… when you come to me with a problem like this, kind of the two ways we could approach this is, can we build, maybe a thinner AI-first End-to-end solution that does this with the existing hardware. That you have. That is less… Less, kind of like, draw silhouettes, drag, drop, custom, and more…

**[19:29] Joe Alderfer:** Right, right.

**[19:30] Chris Fitkin:** holistic, intelligent, LLM-supported, Rather than having those hard, strict boundaries on it. Time being able to do… apply a custom computer vision model to it that we can then improve through reinforcement training, right? Give me, you know, 100 examples of… I can see that there's 4 screws here on this… on this…

**[19:54] Joe Alderfer:** Kind of what I was thinking. Yeah, for something like this, it would… it would be… Yeah, you're just… you're just training it en masse with specific, rather than trying to… program each individual thing, and that's kind of, like, that works great for if we had… if we had 20 SKUs, this wouldn't… like, we would spend all this time to make these programs perfect, and…

**[20:15] Chris Fitkin:** Yeah, fine-tune it, and…

**[20:16] Joe Alderfer:** Yeah, yeah, and it wouldn't… we wouldn't really have… need to move beyond the key on, so we could probably make it work. Just because we have so many SKUs, we can't, like…

**[20:26] Chris Fitkin:** How many SKUs have you set up these master templates for in Keyance already?

**[20:31] Joe Alderfer:** the Kian's probably only, like, 6, just because we've, you know, we'll make them, we have to deploy them, go back and make tweaks, and all that. The silhouettes, we might have, like. Maybe, like, 300 to 400. But we're doing the ones that are the majority of our hours, so we're probably at, like, at least 80% of the total hours we're spending. on jobs out there. But it's just… it's only maybe, like, Yeah. 10 or something percent of the… SKUs.

**[21:08] Chris Fitkin:** Yeah, I know I saw some examples in your… artifacts that came through, do you think I could get a sample pack of 10, 15, 20? Photos of these silhouettes, maybe including good or bad versions of them.

**[21:26] Joe Alderfer:** Of course, yeah.

**[21:27] Chris Fitkin:** Correct? I love that. So, what I'd love to be able to do… so I think I… I got an understanding of the problem, and I told you one way we could do that is a custom solution where we're building a holistic scanner, rather than building these templates, it's we train it on good versus bad, and just give it a very large set of data for what looks good. That is very similar to, like, when you think about how Tesla cars are programmed, it's not… here's a picture of a traffic light, here's green, here's red. It's captured millions of hours of video footage, and uses that to compile what it thinks is a good example of when a car should be driving, not having a human draw diagrams on good, bad images. So I can show you and price what an option like that would be, and I can show you a little prototype of what does that, like, good-bad scanning process look like, and walk you through how we would create an initial training set, and then be able to improve that over time, release new versions of that model. As you're scanning and using this system, we'll build up a library of You know, red-green versions of this, and then when we come back.

**[22:40] Joe Alderfer:** I knew.

**[22:41] Chris Fitkin:** hey, we got a QC problem, or… or… Feedback or customer support question, we can pull those from historical and add to the negative set to train against. So I'd love to be able to propose and present that, and if you send me that sample pack of images that you have, I'll be able to put that together. The other thing that we could do.

**[23:02] Joe Alderfer:** You'll need bad ones too, correct?

**[23:04] Chris Fitkin:** Yes, please.

**[23:05] Joe Alderfer:** cut.

**[23:06] Chris Fitkin:** The other thing that, we could do, if you're really leaning into that Keyence system, is… talk about building a AI agent or tool that does the work of the setup drawing and correction on there. And I saw that Keyance has some API systems. When I researched them, I got the same feedback that their software and APIs are not great, and they're very different from… Hardware to hardware. Something's that… look like they're possible when you actually get into, like, the API inspects of the specific camera you have may not be, so…

**[23:50] Joe Alderfer:** Hmm.

**[23:51] Chris Fitkin:** difficult to.

**[23:51] Joe Alderfer:** We're definitely not tied, like, married to that, 100%, even though we've already invested in it for… like, we have other applications we can use it in that, like, are definitely more geared towards what it's meant for. It's just this specific application seems to be a little more complex, and it's just not really built for that.

**[24:12] Chris Fitkin:** Last question I have is, you said you were doing historical capture of… the packages as they're getting assembled, you said, when people click that little USB button. Where is that getting captured and stored, and how do you… Get access to this.

**[24:28] Joe Alderfer:** So that's just… we just have a folder on our network drive that just… all of the photos go there. Every one of these jobs have a production order number, and so we have… whenever they clock into my program, or… they don't clock into it, they just… they open it, they type in the production order, scan it. And that's then assigned to any pictures that are exported are then assigned to that, and there's also, date and time stamps as well. And that's just in the name of the photo, like, the photo file name. So then we… we can go back, and I made, like, an Excel thing that analyzes that, and You know, so we can check, like, compliance and all that. And then, you know, that's how they'll find it if they have an issue. They can go back and use the production order and the date and time.

**[25:15] Chris Fitkin:** Cool, so I'd love to find a way to integrate with that, and if we're building something that's doing analysis of the photos, tie them together in a nice, you know, database or web interface that you have to look them up on. And we can do that still supporting that nice named hierarchy system that you have storing in your OneDrive or whatever. What are you using on that?

**[25:39] Joe Alderfer:** Okay.

**[25:41] Chris Fitkin:** Alright, Technical question, do you guys have any custom software databases that you have hosted in the cloud right now on AWS or Azure?

**[25:53] Joe Alderfer:** Not that I know of, I'd have to… I'd have to involve our IT team to get more involved with that, and, like, get you guys any sort of access to any of that.

**[26:02] Chris Fitkin:** Yeah, I only ask because if we're going to propose a solution, I try to align it to technologies that you use in-house, so that if you have internal teams in IT, that they're comfortable and capable of maintaining, supporting, long-term.

**[26:15] Joe Alderfer:** as well. Okay.

**[26:18] Chris Fitkin:** Joe, this was really cool. Go ahead. Sorry.

**[26:20] Joe Alderfer:** Have you guys built anything like this before? Like, for some sort of similar application?

**[26:25] Chris Fitkin:** We've built a lot of… AI auditing and analysis systems. Most of them are text-based, document-based. The closest thing we've done to this is we built a… A mobile application for gamified dry-fire laser bullets, which is, like.

**[26:47] Joe Alderfer:** Is it the Strike Fire, or one of those? I've seen some of those.

**[26:52] Chris Fitkin:** Yeah, I've got it, let me see if I can pull it up. side. Have you used them? Have you done that, like, laser?

**[27:02] Joe Alderfer:** I've never done them myself, I've actually been looking into them a little bit, though. So that'll be cool to hear if you guys have… We're actually the ones behind it. Are you allowed to say which one it is? Or is that, like, proprietary?

**[27:15] Chris Fitkin:** Yeah, the one we did is called, G-Site. Jeez.

**[27:19] Joe Alderfer:** Okay, I haven't heard of that one, okay.

**[27:20] Chris Fitkin:** They're a big player in the game, but what we did is they produced a bunch of those, like, hanging sheets that you would put up on your wall, and then we built a custom computer vision model against all of their target sheets, and trained it so that you could use an iPhone camera. pointed at that on a little stand, watch where the laser shows up on that, and track against. what's the specific part on the page, the 10-point, 50-point, 100-point section that got lit up, and send that back to the iPhone for, you know, this area got blown up, and then we do a little fun little animation on the screen.

**[27:58] Joe Alderfer:** Nice.

**[27:59] Chris Fitkin:** Similar to this in that we're looking at a pre-designed board of sections and identifying different parts for what has content on it, what doesn't have content on it, and. Right number.

**[28:13] Joe Alderfer:** Okay. Do you see, like, as you can see, if I go through a bunch of these issues, we have… Like, a variety of different setups, so there's… there's, like, differences in some of the background, the lighting, like, like this one, for example, has some glare from the overhead lighting. you know, The camera might not be at the exact same angle. Do you see that being a concern?

**[28:41] Chris Fitkin:** Not a concern. Like, this is the exact case of… Custom computer vision model. training, like, this is the ideal use case for it. And so when you talk about When you get into the details of… you've got some background and camera angle differences, you've got complexity around mirrored parts, you've got complexity around some really fine parts, like those screw counts. That's solved through… large… Training sets. And training over time, but that only means that in order to get that correct, it's a longer-term process of… Train, deploy, confirm, test, add more training data. To get there, but at the end of the day, it's exactly what… This type of solution is designed to solve.

**[29:30] Joe Alderfer:** Okay. And again, how many images do you set… did you say you wanted? Because I have… I'll have to get… like, I'll have to physically get some bad images, but for the good images, I… like, we're doing this every day, so we have, like, thousands and thousands and thousands of… Ideally good image.

**[29:48] Chris Fitkin:** Yeah, oh, I'm asking for, like, 20. If I could get, like… 20 good, or 15 good, and 5 bad.

**[29:55] Joe Alderfer:** Okay.

**[29:55] Chris Fitkin:** Something like that. I just want to be able to pull together, like, a real quick prototype and show you what it would look like doing the holistic image matching and training. Okay. Using one of the computer vision model tools, either on the Microsoft or the AWS Oh, I'm great.

**[30:16] Joe Alderfer:** Okay, awesome.

**[30:19] Chris Fitkin:** Joe, you got a timeline or budget for solving a problem like this?

**[30:25] Joe Alderfer:** Not… not really.

**[30:27] Chris Fitkin:** Trying to find the answer?

**[30:29] Joe Alderfer:** Yeah, this is… this is our… like, whatever the… it's our biggest issue, so whatever the… the best solution to solve this issue is, that's really what we want to go after. you know, if that comes at a higher cost, I can… I'm sure I can probably sell that. It's just, you know, the leadership wants to know that just the best solution to this.

**[30:52] Chris Fitkin:** Awesome. Well, Joe, I think I've got everything I need. I can promise you in… if you give me a week, I can come back with you at… to you with how I would… approach and price, solution like this. And in that time, I'll also be able to put together a quick little prototype that shows you what the computer vision scan of those Image sets look like, if you can provide me that sample data set and image set.

**[31:17] Joe Alderfer:** Okay, you just want that through email? I can send that to you?

**[31:19] Chris Fitkin:** Email, send it as a zip, or host it, whatever's easier.

**[31:22] Joe Alderfer:** Alright, sounds good.

**[31:24] Chris Fitkin:** And for what it's worth, my, my family's from Philadelphia. I haven't been back 25 years, but my mom grew up there in, say, Upper Derby, King of Prussia, something like that.

**[31:41] Joe Alderfer:** Nice, nice. It's not too far. We're in Warminster, yeah, by Philly, so…

**[31:46] Chris Fitkin:** Oh, very cool, yeah, both of them. Awesome. Well, Joe, thank you for your time today. I hope this was a good conversation for you, it was awesome for me, and I'll look forward to that zip file from you today or Monday.

**[31:57] Joe Alderfer:** Awesome. Thank you very much.

**[31:59] Chris Fitkin:** Thank you, sir. Have a great weekend.

**[32:02] Joe Alderfer:** You too. See ya.


══════════════════════════════════════════
CALL TRANSCRIPTS — Zoom VTT — raw  (Aug 28)
Participants / provider: —
Source: transcripts/2026-08-28-havis-metacto-intro.vtt
══════════════════════════════════════════

WEBVTT

1
00:02:44.940 --> 00:02:46.050
Andrew Troya: Hello, Chris.

2
00:02:52.710 --> 00:02:53.850
Chris Fitkin: Hello, Andrew.

3
00:03:34.840 --> 00:03:36.100
Andrew Troya: How was your day today, Chris?

4
00:03:37.080 --> 00:03:39.460
Chris Fitkin: It's good. Been in meetings, but…

5
00:03:39.780 --> 00:03:43.180
Chris Fitkin: And had to run to the post office at 8 AM.

6
00:03:43.890 --> 00:03:44.930
Andrew Troya: Oh, wow.

7
00:03:45.270 --> 00:03:50.160
Chris Fitkin: Just… dropping… dropping stuff up, package off that I had to send out.

8
00:03:51.460 --> 00:03:53.009
Andrew Troya: Better to get it up today.

9
00:03:54.040 --> 00:03:55.280
Andrew Troya: beginning, then try.

10
00:03:55.280 --> 00:03:56.929
Chris Fitkin: At least it's done.

11
00:03:57.430 --> 00:03:58.120
Andrew Troya: Great.

12
00:03:59.660 --> 00:04:01.630
Chris Fitkin: Who are we waiting for on this call?

13
00:04:02.360 --> 00:04:06.879
Andrew Troya: We're waiting for Joe Alderfer. He confirmed to that call.

14
00:04:07.140 --> 00:04:15.089
Andrew Troya: But he was actually the inbound lead. He wanted, I believe, Some type of, visual guide.

15
00:04:15.810 --> 00:04:16.800
Chris Fitkin: Yeah, okay.

16
00:04:18.380 --> 00:04:21.719
Andrew Troya: For, like, some type of visual, but I just emailed him.

17
00:06:52.670 --> 00:06:54.259
Andrew Troya: Oh, he's… yeah.

18
00:06:54.990 --> 00:06:55.780
Andrew Troya: Great.

19
00:07:06.700 --> 00:07:08.170
Andrew Troya: Hey, Joe, can you hear us?

20
00:07:08.170 --> 00:07:09.490
Joe Alderfer: Hello? Can you hear me?

21
00:07:10.340 --> 00:07:11.899
Andrew Troya: Yeah. How's it going?

22
00:07:12.040 --> 00:07:14.420
Joe Alderfer (Manufacturing Engineer): Hang on, I think I'm on two devices.

23
00:07:25.150 --> 00:07:25.960
Joe Alderfer (Manufacturing Engineer): Alright.

24
00:07:26.260 --> 00:07:27.409
Joe Alderfer (Manufacturing Engineer): Is that better?

25
00:07:29.080 --> 00:07:29.830
Andrew Troya: Much better.

26
00:07:30.270 --> 00:07:31.420
Joe Alderfer (Manufacturing Engineer): Alright, there we go.

27
00:07:31.890 --> 00:07:34.349
Joe Alderfer (Manufacturing Engineer): Sorry I'm late, I got caught up in some things.

28
00:07:34.580 --> 00:07:35.850
Chris Fitkin: Busy working?

29
00:07:36.190 --> 00:07:37.729
Joe Alderfer (Manufacturing Engineer): Yeah, yeah. Bam.

30
00:07:38.360 --> 00:07:39.909
Chris Fitkin: How you doing, Joe? Good morning.

31
00:07:40.090 --> 00:07:41.640
Joe Alderfer (Manufacturing Engineer): Good morning, how you doing?

32
00:07:42.110 --> 00:07:43.400
Chris Fitkin: Very good.

33
00:07:43.400 --> 00:07:45.100
Joe Alderfer (Manufacturing Engineer): I guess good afternoon, we'd say.

34
00:07:45.100 --> 00:07:47.140
Chris Fitkin: Is it… where are you? What time is it?

35
00:07:47.820 --> 00:07:51.600
Joe Alderfer (Manufacturing Engineer): We're in Pennsylvania, so it's, like, 1.30.

36
00:07:52.550 --> 00:07:55.560
Chris Fitkin: And you're over with Andrew, he's in New Jersey.

37
00:07:56.500 --> 00:07:57.620
Joe Alderfer (Manufacturing Engineer): Yeah, pretty close.

38
00:07:57.940 --> 00:08:02.850
Chris Fitkin: Me, I'm in sunny Southern California, and it's still Friday morning over here.

39
00:08:03.510 --> 00:08:05.030
Joe Alderfer (Manufacturing Engineer): Nice, nice.

40
00:08:06.520 --> 00:08:07.190
Chris Fitkin: I wonder…

41
00:08:07.190 --> 00:08:07.823
Andrew Troya: Yo,

42
00:08:08.440 --> 00:08:10.079
Chris Fitkin: Oh, sorry, I was just gonna talk.

43
00:08:10.080 --> 00:08:11.010
Andrew Troya: I'm sorry, man.

44
00:08:11.010 --> 00:08:11.910
Chris Fitkin: I don't need to.

45
00:08:14.460 --> 00:08:19.089
Andrew Troya: I was just gonna say, I just, Joe, I filled Chris in a little bit on,

46
00:08:19.190 --> 00:08:21.999
Andrew Troya: You know, you reaching out, along with the photos.

47
00:08:22.200 --> 00:08:30.739
Andrew Troya: So, I kind of filled him in a bit there, but I kind of just wanted to ask you again, just so we have better detail as to, like, what you were needing help with, exactly.

48
00:08:31.570 --> 00:08:32.179
Joe Alderfer (Manufacturing Engineer): Okay.

49
00:08:32.530 --> 00:08:38.380
Joe Alderfer (Manufacturing Engineer): Let me… Usually we use Teams, and we share screens on here.

50
00:08:39.870 --> 00:08:41.310
Andrew Troya: Yeah, you should have permissions.

51
00:08:41.669 --> 00:08:43.609
Joe Alderfer (Manufacturing Engineer): There we go. You guys see that?

52
00:08:44.739 --> 00:08:45.399
Andrew Troya: Yep.

53
00:08:46.289 --> 00:08:48.029
Joe Alderfer (Manufacturing Engineer): This is an example of

54
00:08:48.189 --> 00:09:05.539
Joe Alderfer (Manufacturing Engineer): what we're doing now. So we make a bunch of these, hardware kits, so that might be, you know, some sheet metal parts, that might be plastic parts, purchase parts, you know, bags of hardware, loose hardware, kind of all mixed together, in one kit.

55
00:09:05.819 --> 00:09:24.659
Joe Alderfer (Manufacturing Engineer): And our biggest issue that we run into is, missing or incorrect parts in these kits, so the assemblers might, you know, put the wrong screw in, they might, forget a component. So what we did is we made these silhouettes of all the different variations of kits.

56
00:09:24.660 --> 00:09:25.230
Chris Fitkin: Man.

57
00:09:25.230 --> 00:09:33.200
Joe Alderfer (Manufacturing Engineer): you know, we're… there's… and we have, like, you know, thousands and thousands of different kits. Not thousands, we probably have, like.

58
00:09:33.410 --> 00:09:35.230
Joe Alderfer (Manufacturing Engineer): 2,000 total, something like that.

59
00:09:35.230 --> 00:09:35.690
Chris Fitkin: Yeah.

60
00:09:35.690 --> 00:09:38.099
Joe Alderfer (Manufacturing Engineer): So we're still working through making all these silhouettes.

61
00:09:39.700 --> 00:09:56.710
Joe Alderfer (Manufacturing Engineer): But at the same time, we have… we made, like, this pretty simple program that just has a webcam hanging over their workstation, and a little USB button, so the assembler will put all their items on these silhouettes that have the two-scale outlines of each component.

62
00:09:56.910 --> 00:10:00.219
Joe Alderfer (Manufacturing Engineer): Take a photo, it'll upload to our database,

63
00:10:00.520 --> 00:10:02.859
Joe Alderfer (Manufacturing Engineer): And then they'll package it, that's it.

64
00:10:03.120 --> 00:10:11.169
Joe Alderfer (Manufacturing Engineer): So then, if we have an issue, we have traceability to go back and look at these images to see if… because we have the serial number there, too, so if they.

65
00:10:11.170 --> 00:10:11.680
Chris Fitkin: Good.

66
00:10:11.680 --> 00:10:18.660
Joe Alderfer (Manufacturing Engineer): Customer, you know, submits a complaint, they can… we'll ask for the serial number, and then we can go back and check, like, hey.

67
00:10:19.220 --> 00:10:21.129
Joe Alderfer (Manufacturing Engineer): This number, we have the…

68
00:10:21.130 --> 00:10:21.600
Chris Fitkin: I gotcha.

69
00:10:21.600 --> 00:10:28.990
Joe Alderfer (Manufacturing Engineer): Yeah, and sometimes we've had a few that have been like, oh, hey, we actually did put everything in there, they must have just lost a screw or something.

70
00:10:29.800 --> 00:10:37.859
Joe Alderfer (Manufacturing Engineer): Or, you know… But still, you know, there's some… and the silhouettes help the assembler, too, it's…

71
00:10:37.980 --> 00:10:40.849
Joe Alderfer (Manufacturing Engineer): Just so they don't forget things, it makes it a little easier.

72
00:10:40.960 --> 00:10:47.380
Joe Alderfer (Manufacturing Engineer): But there's still that level of error that could happen where this isn't really checking anything. So, I mean, I'll go.

73
00:10:47.380 --> 00:10:49.309
Chris Fitkin: Yeah, it's just taking a picture, and…

74
00:10:49.570 --> 00:10:49.890
Joe Alderfer (Manufacturing Engineer): Yeah.

75
00:10:49.890 --> 00:10:53.219
Chris Fitkin: Historical information, you're being responsive rather than…

76
00:10:53.610 --> 00:10:54.330
Joe Alderfer (Manufacturing Engineer): Right?

77
00:10:54.330 --> 00:10:55.080
Chris Fitkin: You see.

78
00:10:55.650 --> 00:10:58.580
Joe Alderfer (Manufacturing Engineer): So we… gee, I don't have it open.

79
00:11:00.880 --> 00:11:07.329
Joe Alderfer (Manufacturing Engineer): Maybe I can open it. We actually also purchased a… Keyance vision system?

80
00:11:07.520 --> 00:11:16.839
Joe Alderfer (Manufacturing Engineer): one of their VS series cameras. Nice. Let me open this one, see if it'll come up with the… I don't think I have this one active right now, but…

81
00:11:16.980 --> 00:11:19.970
Joe Alderfer (Manufacturing Engineer): We'll see if there's anything I can show, just to kind of give an example.

82
00:11:20.370 --> 00:11:24.429
Joe Alderfer (Manufacturing Engineer): And basically the… That we're able to…

83
00:11:24.770 --> 00:11:31.059
Joe Alderfer (Manufacturing Engineer): Inspect these silhouettes after making a program, and give the operator a pass-fail.

84
00:11:31.190 --> 00:11:36.190
Joe Alderfer (Manufacturing Engineer): The only issue is we've had some trouble

85
00:11:36.380 --> 00:11:39.579
Joe Alderfer (Manufacturing Engineer): With certain portions of it,

86
00:11:40.380 --> 00:11:43.369
Joe Alderfer (Manufacturing Engineer): So, I'm letting this load for a sec.

87
00:11:44.070 --> 00:11:46.790
Joe Alderfer (Manufacturing Engineer): The small hardware this tends to struggle with.

88
00:11:47.450 --> 00:11:50.599
Joe Alderfer (Manufacturing Engineer): There's, there's really no tools,

89
00:11:50.920 --> 00:11:58.280
Joe Alderfer (Manufacturing Engineer): in… in the software side that can really count hardware like this. Like, there's different shape tools, but…

90
00:11:58.780 --> 00:12:00.100
Joe Alderfer (Manufacturing Engineer): you know.

91
00:12:00.660 --> 00:12:07.319
Joe Alderfer (Manufacturing Engineer): Little bits of glare, changes in lighting, there's just not a lot of data for the tools to go off of, so…

92
00:12:07.580 --> 00:12:16.749
Joe Alderfer (Manufacturing Engineer): if they run into an issue where they can't… like, we can't detect a screw, there's… like, there's no AI for those tools, so I can't go back and add additional images to retrain it.

93
00:12:16.940 --> 00:12:18.930
Joe Alderfer (Manufacturing Engineer): So we were just kind of looking at…

94
00:12:19.130 --> 00:12:22.939
Joe Alderfer (Manufacturing Engineer): Different option what's out there, either different vision systems with…

95
00:12:23.110 --> 00:12:28.309
Joe Alderfer (Manufacturing Engineer): some more AI capabilities that we could train, or even,

96
00:12:28.520 --> 00:12:32.440
Joe Alderfer (Manufacturing Engineer): We're thinking some… some sort of AI tool that could be

97
00:12:32.620 --> 00:12:37.289
Joe Alderfer (Manufacturing Engineer): That could review a large amount of images and just kind of look for anomalies.

98
00:12:37.590 --> 00:12:43.869
Joe Alderfer (Manufacturing Engineer): So if we had… if we trained, you know, AI that this certain kit, is supposed to look this way, and we give it this…

99
00:12:44.110 --> 00:12:48.850
Joe Alderfer (Manufacturing Engineer): This image, and then we give it a bunch of others, and then you get… of the same kit.

100
00:12:49.090 --> 00:12:53.659
Joe Alderfer (Manufacturing Engineer): would it then be able to tell if we give it another image.

101
00:12:54.070 --> 00:13:02.650
Joe Alderfer (Manufacturing Engineer): That has an item missing, would it then be able to say, oh, hey, this one looks odd, we should check this out without us having to program

102
00:13:03.180 --> 00:13:05.650
Joe Alderfer (Manufacturing Engineer): Thousands of different… Yeah.

103
00:13:06.490 --> 00:13:11.120
Joe Alderfer (Manufacturing Engineer): like… Each individual… because that's the other thing, when we make these.

104
00:13:12.020 --> 00:13:16.959
Joe Alderfer (Manufacturing Engineer): It's… we're programming… like, this is… this is, one of the vision system kits we made.

105
00:13:16.960 --> 00:13:17.490
Chris Fitkin: Yep.

106
00:13:17.830 --> 00:13:20.610
Joe Alderfer (Manufacturing Engineer): We have to program each individual item

107
00:13:21.780 --> 00:13:24.520
Joe Alderfer (Manufacturing Engineer): In the kit, and inspect for it.

108
00:13:24.790 --> 00:13:28.429
Joe Alderfer (Manufacturing Engineer): And then we have to do that for, like, 2,000 kits, which is…

109
00:13:28.580 --> 00:13:34.469
Joe Alderfer (Manufacturing Engineer): pretty insane. If there's some sort of tool that we could train it on just… The entire thing.

110
00:13:35.180 --> 00:13:39.509
Joe Alderfer (Manufacturing Engineer): That might… that would be a little more doable, and we could deploy that a little quicker.

111
00:13:39.510 --> 00:13:43.140
Chris Fitkin: That software that you're in is… that's the Keyance software?

112
00:13:43.320 --> 00:13:46.230
Joe Alderfer (Manufacturing Engineer): Yes, this is the… this is the Keyance software.

113
00:13:47.620 --> 00:13:59.160
Chris Fitkin: Let me ask you this, sorry if I'm jumping into questions. Is your goal to use this better, faster, or looking for an alternative to use with their cameras, or kind of open… open-ended?

114
00:13:59.770 --> 00:14:13.819
Joe Alderfer (Manufacturing Engineer): Open-ended, I mean, we're looking mostly for an alternative, not even… it doesn't even have to use their cameras, so the cameras were just because, you know, this is our biggest issue right now, we're just trying to throw, like, whatever we can to solve it.

115
00:14:14.080 --> 00:14:21.019
Joe Alderfer (Manufacturing Engineer): So we had them in for a demo, it seemed pretty promising, and we can do, like this one, for example.

116
00:14:21.430 --> 00:14:24.920
Joe Alderfer (Manufacturing Engineer): Is a pretty good candidate, because we've… even with the silhouettes.

117
00:14:25.120 --> 00:14:29.370
Joe Alderfer (Manufacturing Engineer): This is the driver and passenger side bracket, they're mirror images of each other.

118
00:14:29.900 --> 00:14:37.219
Joe Alderfer (Manufacturing Engineer): They're very easy, even with the silhouette, to mix up, and we've even had a few instances where they're still mixing these up.

119
00:14:37.620 --> 00:14:48.790
Joe Alderfer (Manufacturing Engineer): So we're really pushing to use our TNS camera to inspect these, and it works great, because there's no hardware in this kit, so we're pretty reliably able to do this one.

120
00:14:49.210 --> 00:14:54.699
Joe Alderfer (Manufacturing Engineer): Then some of the others, like… like this one, for example. We'd struggle with this, trying to count that…

121
00:14:55.070 --> 00:14:59.479
Joe Alderfer (Manufacturing Engineer): They have these 4 screws exactly, and that it's the correct screw.

122
00:14:59.800 --> 00:15:04.069
Joe Alderfer (Manufacturing Engineer): Or, you know, especially these. These are the… probably one of the tiniest ones we have.

123
00:15:04.070 --> 00:15:05.979
Chris Fitkin: Those look like Lair themselves.

124
00:15:06.190 --> 00:15:13.670
Joe Alderfer (Manufacturing Engineer): And it's… it's hard, because they're so… some of the kits are fairly big, so it's…

125
00:15:15.150 --> 00:15:19.530
Joe Alderfer (Manufacturing Engineer): Like, like this, yeah, this is the same one that was on the vision system.

126
00:15:19.780 --> 00:15:27.059
Joe Alderfer (Manufacturing Engineer): It's fairly big. Like, this is a 24x36 silhouette, so a camera has to be able to see that entire field of view.

127
00:15:27.360 --> 00:15:33.100
Joe Alderfer (Manufacturing Engineer): And then also be able to inspect a screw that's Only this big

128
00:15:34.840 --> 00:15:43.819
Joe Alderfer (Manufacturing Engineer): So you need a fairly good camera to be able to see that. Right now, we just have 4K webcams set up for all these, like, simple stations that are taking the photos.

129
00:15:44.440 --> 00:15:48.439
Joe Alderfer (Manufacturing Engineer): And the Keyens camera is, like, a 3.2 megapixel.

130
00:15:52.290 --> 00:15:56.449
Joe Alderfer (Manufacturing Engineer): But we're just trying to see what's out there, see what options we have to try and solve this issue.

131
00:15:58.910 --> 00:16:06.060
Chris Fitkin: That's really cool. What's the… what's the size of this issue? What's your, like, return rate, fail rate?

132
00:16:06.580 --> 00:16:10.010
Chris Fitkin: On these right now, and what kind of… how big of a business problem is that?

133
00:16:11.110 --> 00:16:19.360
Joe Alderfer (Manufacturing Engineer): I mean, it's… our biggest problem, I can say we're probably getting, on average,

134
00:16:19.870 --> 00:16:24.930
Joe Alderfer (Manufacturing Engineer): I'd say we're averaging about one customer complaint per day.

135
00:16:25.340 --> 00:16:27.160
Joe Alderfer (Manufacturing Engineer): And we'll say…

136
00:16:27.750 --> 00:16:33.130
Joe Alderfer (Manufacturing Engineer): at least half of them are related to this. Now, we've solved… it's hard to say, because we get…

137
00:16:35.650 --> 00:16:48.629
Joe Alderfer (Manufacturing Engineer): so we're… we're shipping our products to sometimes distributors or resellers, who then will warehouse it and then ship it out later. So if we… if we ship the kit with an incorrect item.

138
00:16:50.090 --> 00:16:51.660
Chris Fitkin: You might not find out until…

139
00:16:51.660 --> 00:16:56.669
Joe Alderfer (Manufacturing Engineer): Yeah, so it's hard to say how much of this we've actually solved with the…

140
00:16:57.530 --> 00:16:59.800
Joe Alderfer (Manufacturing Engineer): simple program, and I'd say we…

141
00:16:59.990 --> 00:17:06.670
Joe Alderfer (Manufacturing Engineer): we've solved a fair bit of it, but we're really just trying to get this down to zero. Like, we really just want to completely

142
00:17:07.349 --> 00:17:12.020
Joe Alderfer (Manufacturing Engineer): Like, kick any possibility that a mistake could be made.

143
00:17:13.740 --> 00:17:21.630
Chris Fitkin: Do you like the Kant software? If you thought you could train the master silhouettes

144
00:17:21.839 --> 00:17:28.079
Chris Fitkin: Faster, or in some automated way, and find a way to…

145
00:17:28.780 --> 00:17:32.310
Chris Fitkin: Add training to support that hardware counting?

146
00:17:36.340 --> 00:17:52.199
Joe Alderfer (Manufacturing Engineer): Kind of. I mean, the thing that sucks about the Kian software is they… every, like, different camera that they come out with, they come out with, like, a different software, so none of the… so if we wanted to use an additional, like, one of their other products in tandem with this.

147
00:17:52.350 --> 00:18:05.940
Joe Alderfer (Manufacturing Engineer): It uses, like, completely different software, and it… which is kind of frustrating, because they actually have… they have a lower, like, cap… like, a camera with, like, lower resolution, less hardware capabilities,

148
00:18:06.070 --> 00:18:10.069
Joe Alderfer (Manufacturing Engineer): And it has those exact… the exact software features that we want.

149
00:18:10.470 --> 00:18:16.219
Joe Alderfer (Manufacturing Engineer): But it just doesn't have the hardware to back it up, and then this one, with the hardware, just doesn't have the software side.

150
00:18:17.110 --> 00:18:20.789
Joe Alderfer (Manufacturing Engineer): Which is kind of crazy to me, but…

151
00:18:21.150 --> 00:18:25.540
Joe Alderfer (Manufacturing Engineer): Yeah, so this one also has, like, optical zoom and all that, so we can…

152
00:18:25.670 --> 00:18:28.420
Joe Alderfer (Manufacturing Engineer): Like, some of these we can actually zoom in.

153
00:18:28.660 --> 00:18:31.820
Joe Alderfer (Manufacturing Engineer): On, like, certain portions if you need extra detail.

154
00:18:33.450 --> 00:18:39.170
Joe Alderfer (Manufacturing Engineer): And that's not just a digital zoom, it's like a physical optical zoom, like the lens is moving.

155
00:18:40.190 --> 00:18:41.100
Chris Fitkin: It's really cool.

156
00:18:43.770 --> 00:18:45.380
Chris Fitkin: So, I don't know how much…

157
00:18:45.560 --> 00:19:02.620
Chris Fitkin: background you got about us from Andrew or our website, but we built custom software, AI agents, and AI workforce teams for companies that you then host and own yourself, but it gives you an option to customize the software and get the capabilities to

158
00:19:03.020 --> 00:19:04.830
Chris Fitkin: exactly what you need, so…

159
00:19:05.230 --> 00:19:15.429
Chris Fitkin: when you come to me with a problem like this, kind of the two ways we could approach this is, can we build, maybe a thinner AI-first

160
00:19:15.880 --> 00:19:19.549
Chris Fitkin: End-to-end solution that does this with the existing hardware.

161
00:19:19.700 --> 00:19:21.210
Chris Fitkin: That you have.

162
00:19:21.450 --> 00:19:29.530
Chris Fitkin: That is less… Less, kind of like, draw silhouettes, drag, drop, custom, and more…

163
00:19:29.530 --> 00:19:30.490
Joe Alderfer (Manufacturing Engineer): Right, right.

164
00:19:30.800 --> 00:19:37.700
Chris Fitkin: holistic, intelligent, LLM-supported, Rather than having those hard, strict boundaries on it.

165
00:19:38.810 --> 00:19:40.390
Chris Fitkin: Time being able to do…

166
00:19:40.950 --> 00:19:54.230
Chris Fitkin: apply a custom computer vision model to it that we can then improve through reinforcement training, right? Give me, you know, 100 examples of… I can see that there's 4 screws here on this… on this…

167
00:19:54.230 --> 00:19:57.709
Joe Alderfer (Manufacturing Engineer): Kind of what I was thinking. Yeah, for something like this, it would… it would be…

168
00:19:57.970 --> 00:20:02.860
Joe Alderfer (Manufacturing Engineer): Yeah, you're just… you're just training it en masse with specific, rather than trying to…

169
00:20:02.990 --> 00:20:08.840
Joe Alderfer (Manufacturing Engineer): program each individual thing, and that's kind of, like, that works great for

170
00:20:09.280 --> 00:20:15.109
Joe Alderfer (Manufacturing Engineer): if we had… if we had 20 SKUs, this wouldn't… like, we would spend all this time to make these programs perfect, and…

171
00:20:15.110 --> 00:20:16.660
Chris Fitkin: Yeah, fine-tune it, and…

172
00:20:16.660 --> 00:20:25.539
Joe Alderfer (Manufacturing Engineer): Yeah, yeah, and it wouldn't… we wouldn't really have… need to move beyond the key on, so we could probably make it work. Just because we have so many SKUs, we can't, like…

173
00:20:26.560 --> 00:20:31.489
Chris Fitkin: How many SKUs have you set up these master templates for in Keyance already?

174
00:20:31.800 --> 00:20:42.819
Joe Alderfer (Manufacturing Engineer): the Kian's probably only, like, 6, just because we've, you know, we'll make them, we have to deploy them, go back and make tweaks, and all that. The silhouettes, we might have, like.

175
00:20:43.400 --> 00:20:47.829
Joe Alderfer (Manufacturing Engineer): Maybe, like, 300 to 400.

176
00:20:49.110 --> 00:20:57.659
Joe Alderfer (Manufacturing Engineer): But we're doing the ones that are the majority of our hours, so we're probably at, like, at least 80% of the total hours we're spending.

177
00:20:57.810 --> 00:21:04.340
Joe Alderfer (Manufacturing Engineer): on jobs out there. But it's just… it's only maybe, like, Yeah.

178
00:21:04.480 --> 00:21:07.980
Joe Alderfer (Manufacturing Engineer): 10 or something percent of the… SKUs.

179
00:21:08.900 --> 00:21:13.290
Chris Fitkin: Yeah, I know I saw some examples in your…

180
00:21:14.190 --> 00:21:20.609
Chris Fitkin: artifacts that came through, do you think I could get a sample pack of 10, 15, 20?

181
00:21:21.050 --> 00:21:25.949
Chris Fitkin: Photos of these silhouettes, maybe including good or bad versions of them.

182
00:21:26.530 --> 00:21:27.469
Joe Alderfer (Manufacturing Engineer): Of course, yeah.

183
00:21:27.470 --> 00:21:28.010
Chris Fitkin: Correct?

184
00:21:28.500 --> 00:21:39.199
Chris Fitkin: I love that. So, what I'd love to be able to do… so I think I… I got an understanding of the problem, and I told you one way we could do that is a custom solution where we're building a holistic

185
00:21:39.330 --> 00:21:53.939
Chris Fitkin: scanner, rather than building these templates, it's we train it on good versus bad, and just give it a very large set of data for what looks good. That is very similar to, like, when you think about how Tesla cars are programmed, it's not…

186
00:21:54.060 --> 00:22:12.500
Chris Fitkin: here's a picture of a traffic light, here's green, here's red. It's captured millions of hours of video footage, and uses that to compile what it thinks is a good example of when a car should be driving, not having a human draw diagrams on good, bad images.

187
00:22:14.380 --> 00:22:30.240
Chris Fitkin: So I can show you and price what an option like that would be, and I can show you a little prototype of what does that, like, good-bad scanning process look like, and walk you through how we would create an initial training set, and then be able to

188
00:22:30.400 --> 00:22:37.620
Chris Fitkin: improve that over time, release new versions of that model. As you're scanning and using this system, we'll build up a library of

189
00:22:38.140 --> 00:22:40.850
Chris Fitkin: You know, red-green versions of this, and then when we come back.

190
00:22:40.850 --> 00:22:41.520
Joe Alderfer (Manufacturing Engineer): I knew.

191
00:22:41.980 --> 00:22:44.930
Chris Fitkin: hey, we got a QC problem, or… or…

192
00:22:45.630 --> 00:22:52.080
Chris Fitkin: Feedback or customer support question, we can pull those from historical and add to the negative set to train against.

193
00:22:53.650 --> 00:23:02.500
Chris Fitkin: So I'd love to be able to propose and present that, and if you send me that sample pack of images that you have, I'll be able to put that together. The other thing that we could do.

194
00:23:02.500 --> 00:23:04.290
Joe Alderfer (Manufacturing Engineer): You'll need bad ones too, correct?

195
00:23:04.290 --> 00:23:05.569
Chris Fitkin: Yes, please.

196
00:23:05.930 --> 00:23:06.430
Joe Alderfer (Manufacturing Engineer): cut.

197
00:23:06.950 --> 00:23:14.060
Chris Fitkin: The other thing that, we could do, if you're really leaning into that Keyence system, is…

198
00:23:15.180 --> 00:23:22.639
Chris Fitkin: talk about building a AI agent or tool that does the work of the setup

199
00:23:22.990 --> 00:23:29.929
Chris Fitkin: drawing and correction on there. And I saw that Keyance has some API systems.

200
00:23:30.730 --> 00:23:34.579
Chris Fitkin: When I researched them, I got the same feedback that their software

201
00:23:35.870 --> 00:23:41.400
Chris Fitkin: and APIs are not great, and they're very different from… Hardware to hardware.

202
00:23:41.770 --> 00:23:42.570
Chris Fitkin: Something's that…

203
00:23:43.780 --> 00:23:50.740
Chris Fitkin: look like they're possible when you actually get into, like, the API inspects of the specific camera you have may not be, so…

204
00:23:50.740 --> 00:23:51.320
Joe Alderfer (Manufacturing Engineer): Hmm.

205
00:23:51.320 --> 00:23:51.880
Chris Fitkin: difficult to.

206
00:23:51.880 --> 00:24:04.689
Joe Alderfer (Manufacturing Engineer): We're definitely not tied, like, married to that, 100%, even though we've already invested in it for… like, we have other applications we can use it in that, like, are definitely more geared towards what it's meant for.

207
00:24:06.170 --> 00:24:11.800
Joe Alderfer (Manufacturing Engineer): It's just this specific application seems to be a little more complex, and it's just not really built for that.

208
00:24:12.770 --> 00:24:17.690
Chris Fitkin: Last question I have is, you said you were doing historical capture of…

209
00:24:18.070 --> 00:24:25.530
Chris Fitkin: the packages as they're getting assembled, you said, when people click that little USB button. Where is that getting captured and stored, and how do you…

210
00:24:25.950 --> 00:24:27.380
Chris Fitkin: Get access to this.

211
00:24:28.000 --> 00:24:46.560
Joe Alderfer (Manufacturing Engineer): So that's just… we just have a folder on our network drive that just… all of the photos go there. Every one of these jobs have a production order number, and so we have… whenever they clock into my program, or… they don't clock into it, they just… they open it, they type in the production order, scan it.

212
00:24:46.970 --> 00:24:58.699
Joe Alderfer (Manufacturing Engineer): And that's then assigned to any pictures that are exported are then assigned to that, and there's also, date and time stamps as well. And that's just in the name of the photo, like, the photo file name.

213
00:24:59.000 --> 00:25:04.659
Joe Alderfer (Manufacturing Engineer): So then we… we can go back, and I made, like, an Excel thing that analyzes that, and

214
00:25:05.160 --> 00:25:14.439
Joe Alderfer (Manufacturing Engineer): You know, so we can check, like, compliance and all that. And then, you know, that's how they'll find it if they have an issue. They can go back and use the production order and the date and time.

215
00:25:15.780 --> 00:25:27.810
Chris Fitkin: Cool, so I'd love to find a way to integrate with that, and if we're building something that's doing analysis of the photos, tie them together in a nice, you know, database or web interface that you have to look them up on.

216
00:25:28.730 --> 00:25:35.760
Chris Fitkin: And we can do that still supporting that nice named hierarchy system that you have storing in your OneDrive or whatever.

217
00:25:36.680 --> 00:25:37.840
Chris Fitkin: What are you using on that?

218
00:25:39.360 --> 00:25:39.980
Joe Alderfer (Manufacturing Engineer): Okay.

219
00:25:41.080 --> 00:25:42.590
Chris Fitkin: Alright,

220
00:25:43.210 --> 00:25:51.700
Chris Fitkin: Technical question, do you guys have any custom software databases that you have hosted in the cloud right now on AWS or Azure?

221
00:25:53.040 --> 00:26:01.779
Joe Alderfer (Manufacturing Engineer): Not that I know of, I'd have to… I'd have to involve our IT team to get more involved with that, and, like, get you guys any sort of access to any of that.

222
00:26:02.430 --> 00:26:15.579
Chris Fitkin: Yeah, I only ask because if we're going to propose a solution, I try to align it to technologies that you use in-house, so that if you have internal teams in IT, that they're comfortable and capable of maintaining, supporting, long-term.

223
00:26:15.580 --> 00:26:16.260
Joe Alderfer (Manufacturing Engineer): as well.

224
00:26:17.330 --> 00:26:18.020
Joe Alderfer (Manufacturing Engineer): Okay.

225
00:26:18.260 --> 00:26:20.620
Chris Fitkin: Joe, this was really cool. Go ahead. Sorry.

226
00:26:20.620 --> 00:26:25.619
Joe Alderfer (Manufacturing Engineer): Have you guys built anything like this before? Like, for some sort of similar application?

227
00:26:25.870 --> 00:26:28.390
Chris Fitkin: We've built a lot of…

228
00:26:29.460 --> 00:26:37.210
Chris Fitkin: AI auditing and analysis systems. Most of them are text-based, document-based. The closest thing we've done to this is we built a…

229
00:26:37.750 --> 00:26:47.880
Chris Fitkin: A mobile application for gamified dry-fire laser bullets, which is, like.

230
00:26:47.880 --> 00:26:52.019
Joe Alderfer (Manufacturing Engineer): Is it the Strike Fire, or one of those? I've seen some of those.

231
00:26:52.860 --> 00:26:55.399
Chris Fitkin: Yeah, I've got it, let me see if I can pull it up.

232
00:26:57.580 --> 00:26:58.640
Chris Fitkin: side.

233
00:26:59.800 --> 00:27:02.529
Chris Fitkin: Have you used them? Have you done that, like, laser?

234
00:27:02.530 --> 00:27:05.709
Joe Alderfer (Manufacturing Engineer): I've never done them myself, I've actually been looking into them a little bit, though.

235
00:27:05.870 --> 00:27:09.269
Joe Alderfer (Manufacturing Engineer): So that'll be cool to hear if you guys have…

236
00:27:09.400 --> 00:27:11.210
Joe Alderfer (Manufacturing Engineer): We're actually the ones behind it.

237
00:27:11.510 --> 00:27:15.059
Joe Alderfer (Manufacturing Engineer): Are you allowed to say which one it is? Or is that, like, proprietary?

238
00:27:15.310 --> 00:27:18.150
Chris Fitkin: Yeah, the one we did is called, G-Site.

239
00:27:18.620 --> 00:27:19.180
Chris Fitkin: Jeez.

240
00:27:19.180 --> 00:27:20.940
Joe Alderfer (Manufacturing Engineer): Okay, I haven't heard of that one, okay.

241
00:27:20.940 --> 00:27:37.949
Chris Fitkin: They're a big player in the game, but what we did is they produced a bunch of those, like, hanging sheets that you would put up on your wall, and then we built a custom computer vision model against all of their target sheets, and trained it so that you could use an iPhone camera.

242
00:27:38.070 --> 00:27:42.820
Chris Fitkin: pointed at that on a little stand, watch where the laser shows up on that, and track against.

243
00:27:43.100 --> 00:27:58.410
Chris Fitkin: what's the specific part on the page, the 10-point, 50-point, 100-point section that got lit up, and send that back to the iPhone for, you know, this area got blown up, and then we do a little fun little animation on the screen.

244
00:27:58.410 --> 00:27:59.640
Joe Alderfer (Manufacturing Engineer): Nice.

245
00:27:59.640 --> 00:28:10.300
Chris Fitkin: Similar to this in that we're looking at a pre-designed board of sections and identifying different parts for what has content on it, what doesn't have content on it, and.

246
00:28:10.920 --> 00:28:11.790
Chris Fitkin: Right number.

247
00:28:13.130 --> 00:28:13.750
Joe Alderfer (Manufacturing Engineer): Okay.

248
00:28:14.700 --> 00:28:16.460
Joe Alderfer (Manufacturing Engineer): Do you see,

249
00:28:17.400 --> 00:28:21.280
Joe Alderfer (Manufacturing Engineer): like, as you can see, if I go through a bunch of these issues, we have…

250
00:28:21.980 --> 00:28:31.929
Joe Alderfer (Manufacturing Engineer): Like, a variety of different setups, so there's… there's, like, differences in some of the background, the lighting, like, like this one, for example, has some glare from the overhead lighting.

251
00:28:32.400 --> 00:28:38.199
Joe Alderfer (Manufacturing Engineer): you know, The camera might not be at the exact same angle.

252
00:28:38.330 --> 00:28:41.210
Joe Alderfer (Manufacturing Engineer): Do you see that being a concern?

253
00:28:41.210 --> 00:28:46.770
Chris Fitkin: Not a concern. Like, this is the exact case of… Custom computer vision model.

254
00:28:46.890 --> 00:28:51.970
Chris Fitkin: training, like, this is the ideal use case for it. And so when you talk about

255
00:28:52.900 --> 00:29:04.789
Chris Fitkin: When you get into the details of… you've got some background and camera angle differences, you've got complexity around mirrored parts, you've got complexity around some really fine parts, like those screw counts.

256
00:29:05.500 --> 00:29:10.899
Chris Fitkin: That's solved through… large… Training sets.

257
00:29:11.110 --> 00:29:18.730
Chris Fitkin: And training over time, but that only means that in order to get that correct, it's a longer-term process of…

258
00:29:19.120 --> 00:29:23.689
Chris Fitkin: Train, deploy, confirm, test, add more training data.

259
00:29:23.880 --> 00:29:26.940
Chris Fitkin: To get there, but at the end of the day, it's exactly what…

260
00:29:27.240 --> 00:29:29.850
Chris Fitkin: This type of solution is designed to solve.

261
00:29:30.670 --> 00:29:31.280
Joe Alderfer (Manufacturing Engineer): Okay.

262
00:29:31.400 --> 00:29:35.789
Joe Alderfer (Manufacturing Engineer): And again, how many images do you set… did you say you wanted? Because I have…

263
00:29:36.170 --> 00:29:46.550
Joe Alderfer (Manufacturing Engineer): I'll have to get… like, I'll have to physically get some bad images, but for the good images, I… like, we're doing this every day, so we have, like, thousands and thousands and thousands of…

264
00:29:46.880 --> 00:29:48.380
Joe Alderfer (Manufacturing Engineer): Ideally good image.

265
00:29:48.650 --> 00:29:51.669
Chris Fitkin: Yeah, oh, I'm asking for, like, 20. If I could get, like…

266
00:29:52.080 --> 00:29:55.020
Chris Fitkin: 20 good, or 15 good, and 5 bad.

267
00:29:55.020 --> 00:29:55.610
Joe Alderfer (Manufacturing Engineer): Okay.

268
00:29:55.800 --> 00:30:04.170
Chris Fitkin: Something like that. I just want to be able to pull together, like, a real quick prototype and show you what it would look like doing the holistic image matching and training.

269
00:30:04.670 --> 00:30:13.580
Chris Fitkin: Okay. Using one of the computer vision model tools, either on the Microsoft or the AWS Oh, I'm great.

270
00:30:16.250 --> 00:30:17.640
Joe Alderfer (Manufacturing Engineer): Okay, awesome.

271
00:30:19.850 --> 00:30:23.170
Chris Fitkin: Joe, you got a timeline or budget for solving a problem like this?

272
00:30:25.050 --> 00:30:27.370
Joe Alderfer (Manufacturing Engineer): Not… not really.

273
00:30:27.620 --> 00:30:29.050
Chris Fitkin: Trying to find the answer?

274
00:30:29.210 --> 00:30:40.389
Joe Alderfer (Manufacturing Engineer): Yeah, this is… this is our… like, whatever the… it's our biggest issue, so whatever the… the best solution to solve this issue is, that's really what we want to go after.

275
00:30:41.300 --> 00:30:43.990
Joe Alderfer (Manufacturing Engineer): you know, if that comes at a higher cost, I can…

276
00:30:44.140 --> 00:30:51.670
Joe Alderfer (Manufacturing Engineer): I'm sure I can probably sell that. It's just, you know, the leadership wants to know that just the best solution to this.

277
00:30:52.230 --> 00:31:01.649
Chris Fitkin: Awesome. Well, Joe, I think I've got everything I need. I can promise you in… if you give me a week, I can come back with you at… to you with how I would…

278
00:31:01.770 --> 00:31:12.000
Chris Fitkin: approach and price, solution like this. And in that time, I'll also be able to put together a quick little prototype that shows you what the computer vision scan of those

279
00:31:12.510 --> 00:31:16.879
Chris Fitkin: Image sets look like, if you can provide me that sample data set and image set.

280
00:31:17.090 --> 00:31:19.589
Joe Alderfer (Manufacturing Engineer): Okay, you just want that through email? I can send that to you?

281
00:31:19.590 --> 00:31:22.050
Chris Fitkin: Email, send it as a zip, or host it, whatever's easier.

282
00:31:22.600 --> 00:31:24.129
Joe Alderfer (Manufacturing Engineer): Alright, sounds good.

283
00:31:24.400 --> 00:31:40.380
Chris Fitkin: And for what it's worth, my, my family's from Philadelphia. I haven't been back 25 years, but my mom grew up there in, say, Upper Derby, King of Prussia, something like that.

284
00:31:41.530 --> 00:31:46.380
Joe Alderfer (Manufacturing Engineer): Nice, nice. It's not too far. We're in Warminster, yeah, by Philly, so…

285
00:31:46.610 --> 00:31:48.460
Chris Fitkin: Oh, very cool, yeah, both of them.

286
00:31:48.660 --> 00:31:57.150
Chris Fitkin: Awesome. Well, Joe, thank you for your time today. I hope this was a good conversation for you, it was awesome for me, and I'll look forward to that zip file from you today or Monday.

287
00:31:57.710 --> 00:31:59.540
Joe Alderfer (Manufacturing Engineer): Awesome. Thank you very much.

288
00:31:59.900 --> 00:32:00.440
Chris Fitkin: Thank you, sir.

289
00:32:00.820 --> 00:32:01.750
Chris Fitkin: Have a great weekend.

290
00:32:02.140 --> 00:32:03.169
Joe Alderfer (Manufacturing Engineer): You too. See ya.


══════════════════════════════════════════
EMAIL THREADS — Inbound form submission and intro invite  (Aug 24)
Participants / provider: Joe Alderfer (Havis), Andrew Troya (Metacto), Chris Fitkin (Metacto)
Source: emails/2026-08-24-hubspot-form-submission-and-intro-invite.md
══════════════════════════════════════════

# Havis — inbound form submission and intro invite

**Date:** 2026-08-24 · **Participants:** Joe Alderfer (Havis), Andrew Troya (Metacto), Chris Fitkin (Metacto)
**Source:** Gmail sweep via `bin/ziggy`, retrieved 2026-08-28 (channel: ziggy). Two threads, both dated
2026-08-24. Not independently re-read through `get_gmail_thread`. ⭐⭐

## Thread 1 — HubSpot form submission (the actual first touch)

**Mon 2026-08-24, 9:53 AM EDT** · From `noreply@notifications.hubspot.com` → `chris@metacto.com`
**Subject:** *"You've got a new submission on the HubSpot Form 'Site — Medium Intent'"*
**Status:** ⚠ still **UNREAD** in Chris's inbox as of 2026-08-28.

> *"Joe Alderfer submitted a form on the page AI Implementation Agency | AI Consulting &
> Implementation | Metacto"*
> *"Work Email: jalderfer@havis.com | Job Title: Manufacturing Engineer | Company Name: Havis Inc."*
> *"utm_term: ai consultant | utm_source: google | utm_medium: cpc"*

| Field | Value |
|---|---|
| Form | **Site — Medium Intent** |
| Landing page | **`/ai-implementation-agency`** |
| utm_source / medium / term | `google` / `cpc` / **`ai consultant`** |

⭐ Joe searched **"ai consultant"**, clicked a paid ad, landed on the AI Implementation Agency page, and
filled in a medium-intent form himself. Nobody referred him. He was already looking.

## Thread 2 — Calendar invite

**Mon 2026-08-24, 10:27 AM PDT** · From Andrew Troya → Chris Fitkin, `jalderfer@havis.com`
**Subject:** *"Invitation: Havis & Metacto Intro @ Fri Aug 28, 2026 10:30am – 11am (PDT)"*

> *"Havis & Metacto Intro — Friday Aug 28, 2026 ⋅ 10:30am – 11am — Pacific Time - Los Angeles"*
> *"Join Zoom Meeting: https://us06web.zoom.us/j/82809547675"*
> *"Meeting host: andrew@metacto.com"*
> *"Guests: Andrew Troya (organizer), Chris Fitkin, jalderfer@havis.com"*
> *"Your attendance is optional."*

**Zoom meeting ID: `82809547675`** · Passcode `384173` · UUID from link: `6SwKjOOXT6K3V+7Ow35Uag==`

⭐ **Andrew booked the intro 34 minutes after the form hit the inbox.** Form 9:53 EDT → invite 10:27 PDT
(13:27 EDT). Paid search to booked discovery, same morning.

## Notes

- No prior email history with anyone at havis.com. This is genuinely first contact.
- Chris was marked **optional** on the invite.


══════════════════════════════════════════
EMAIL THREADS — Follow-up to Joe — thanks, and the sample pack (DRAFT)  (Aug 28)
Participants / provider: Chris Fitkin (Metacto) → Joe Alderfer (Havis), cc Andrew Troya
Source: emails/2026-08-28-chris-followup-sample-pack-DRAFT.md
══════════════════════════════════════════

# Follow-up to Joe Alderfer — thanks, and the sample pack (DRAFT, unsent)

**Date:** 2026-08-28 · **Participants:** Chris Fitkin (Metacto) → Joe Alderfer (Havis), cc Andrew Troya
**Source:** Drafted in Gmail via `bin/ziggy` on Chris's instruction, 2026-08-28. **Independently verified**
through Vocion `get_gmail_thread` (`force_refresh`) at 22:53Z: one draft, correct body, unsent. ⭐⭐

> 🔴 **STATUS: UNSENT DRAFT.** In Chris's Gmail Drafts, threaded into *"Invitation: Havis & Metacto Intro"*.
> **Nothing has gone to Havis.** Chris sends it.
>
> This **replaces** an earlier, shorter draft written the same afternoon (subject *"Thanks for today — and
> the image pack"*). The earlier draft was **updated in place, not duplicated** — there is exactly one
> draft to `jalderfer@havis.com` in the account.

| Field | Value |
|---|---|
| Draft id | `r-2625247590206543305` |
| Message id | `1a04a935d28a3f46` (was `1a049b5ffcd9da45`) |
| Thread id | `1a034d071b67db80` |
| From | chris@metacto.com |
| To | jalderfer@havis.com |
| Cc | andrew@metacto.com |
| Subject | **Thanks for today, and the sample pack** |
| Drafted | 2026-08-28 15:52:46 -0700 |
| Labels | `DRAFT` only |

## Body as drafted

> Joe,
>
> Thanks for the time today, and for sharing your screen. Seeing the actual silhouettes, the mirrored
> brackets and the four-screw kits told me more in twenty minutes than a written brief would have.
>
> I will say plainly that I am looking forward to this one. Most companies who bring us a vision problem
> are starting from nothing. You already have to-scale silhouettes, a capture station at every bench,
> thousands of good images a day, and serial-level traceability tying every photo back to a production
> order. That is the expensive half of the problem and you have already built it. What is missing is the
> step that checks the tray before it gets packed.
>
> The one thing I will not promise before I have seen your images is the small hardware. Counting four
> specific screws across a 24 by 36 field is the hardest thing on your list, and it is why the tools you
> have tried fall over there. I would rather test it on your own pictures and tell you honestly what it
> does.
>
> So the ask is the sample pack we discussed: roughly 15 good and 5 bad, as a zip or a hosted link,
> whatever is easiest. The bad ones matter most, a missing part, a mixed up left and right, a short screw
> count, so if those take a day to stage that is fine.
>
> What happens once they land:
>
> 1. Within a week, a working prototype that scans your own images, and a walkthrough of where it succeeds
>    and where it struggles.
> 2. With it, an approach and pricing, structured so the first step is small and proves the hard part
>    before anyone commits to a build.
> 3. A short conversation with your IT team about hosting and long term ownership, so what we propose is
>    something your team can run.
>
> One question that would help in the meantime: are the silhouettes generated from your CAD or BOM data,
> or drawn by hand? If they are generated, bringing in the rest of the 2,000 gets considerably faster, and
> it changes what I would recommend.
>
> Thank you,
> Chris
>
> Chris Fitkin / Partner / Metacto
> We build AI and agent systems, custom to how a company already works.
> m. (949) 939-1251 · w. metacto.com

## What each paragraph is doing

Chris asked for four jobs: thanks, excitement, trust, the ask, and clear next steps.

- **Thanks, with evidence it was heard.** Not "thanks for your time" but the three specific things he
  showed: the silhouettes, the mirrored brackets, the four-screw kits. Proof of attention beats gratitude.
- ⭐ **Excitement, earned rather than asserted.** *"I am looking forward to this one"* is followed
  immediately by the reason: Havis already owns the expensive half. The enthusiasm is about **his work**,
  which is both true and flattering in the way that lands with an engineer.
- ⭐⭐ **Trust via a stated limit, not a claim.** *"The one thing I will not promise before I have seen
  your images is the small hardware."* Naming the hardest part, admitting it is unproven, and preferring a
  test to a description is the strongest trust move available and it is entirely consistent with the
  gated pricing structure. A vendor who says what they cannot yet do is believable about the rest.
- **The ask, de-risked.** Specific counts, either format, examples of what a "bad" one means, and explicit
  permission to take a day. Removes every reason a busy engineer defers it.
- **Next steps as three numbered commitments** with owners implied and a stated week. Step 2 previews the
  gated structure ("the first step is small") without naming a price. Step 3 makes the IT conversation an
  expected part of the process rather than a later ambush.
- ⭐ **The CAD question closes on the highest-value unknown.** ⚠ Asked as a question on purpose: Apollo
  shows Havis runs SOLIDWORKS, and that finding must never appear in client-facing wording. See
  [`../attachments/2026-08-28-company-size-and-budget-frame.md`](../attachments/2026-08-28-company-size-and-budget-frame.md).
- No pricing, no attachment, no proposal. Those wait for the prototype.

## Inbox state when this was drafted

Full trawl of Chris's Gmail (inbox, sent, drafts, spam, all mail) via Ziggy, 2026-08-28:

| Looked for | Result |
|---|---|
| Any message **from** `jalderfer@havis.com` | 🔴 **Nothing.** Joe has not replied and has sent nothing. |
| The sample pack | 🔴 **Not received.** Not in inbox, not in spam, not in all mail. |
| Andrew forwarding Joe's photos | 🔴 **Nothing.** No email from Andrew carries Havis images. |
| HubSpot form submission | Found (`1a0340bd2b8e9c03`, Aug 24 09:53 EDT). ⚠ **Still unread.** **No message body field and no file uploads** — the form captures contact details and ad params only. |
| Spam / All Mail | Nothing. |

⭐ **So where are "the photos"?** Andrew said on the call that Joe *"reached out along with the photos"*,
and Chris said he *"saw some examples in your artifacts that came through"* — but **no images ever reached
Chris's mailbox and the form carried none.** They almost certainly landed with **Andrew directly**.
🔴 **Ask Andrew before waiting on Joe:** if Andrew already holds sample images, the prototype can start
now instead of after the weekend.

## Notes

- Andrew cc'd: he owns the relationship in the SDR tracker and booked the meeting.
- The HubSpot notification for Joe is **still unread** five days on, and the Havis company record still has
  **no owner** and **nothing logged from the call**.


══════════════════════════════════════════
EMAIL THREADS — Joe sends the sample pack — the prototype is unblocked  (Aug 31)
Participants / provider: Joe Alderfer (Havis) → Chris Fitkin (Metacto), cc Andrew Troya
Source: emails/2026-08-31-joe-sends-the-sample-pack.md
══════════════════════════════════════════

# Joe Alderfer sends the sample pack — the prototype is unblocked

**Date:** 2026-08-31 · **Participants:** Joe Alderfer (Havis) → Chris Fitkin (Metacto), cc Andrew Troya
**Source:** Gmail thread `1a04a9c439f56f5a`, read through `vocion-mcp` `get_gmail_thread`
(`force_refresh`) 2026-08-31 18:53Z. ⭐⭐⭐

> ✅ **The images have arrived.** This closes the single item that gated everything downstream.

## 🔴 The fileshare link

**`https://fileshare.havis.com/s/95A6cRPQ8sgi62B`**

⚠ **Not yet downloaded or inspected as of filing.** Contents, count, and the good/bad split are unverified.
Download it, count what is actually in it, and record the real numbers here — the ask was ~15 good and
~5 bad, and what arrived may differ.

## What went out, and when

⭐ **Chris sent the follow-up himself on Fri 2026-08-28 at 16:13 PT**, lightly edited from the draft:
subject became **"Havis + Metacto: image sample pack"**, "working prototype" became "sample prototype",
and "a day to stage" became "a day to collect".

## Joe's reply, verbatim

**Mon 2026-08-31, 11:15 UTC (07:15 ET)** — to Chris, cc Andrew:

> My apologies Chris, I thought I sent this over on Friday but looks like the zipped file was too large
> and got blocked in my outbox. Below is a fileshare link.
>
> https://fileshare.havis.com/s/95A6cRPQ8sgi62B

⭐ **He tried to send it Friday.** The zip exceeded his outbound limit and stalled in his outbox, so the
three-day gap was a mail-size failure rather than hesitation. **Read that as intent, not drift:** he
staged the pack the same day he was asked and came back unprompted first thing Monday to fix it.

## Correction to the record

🔴 **Joe's title is "Sr. Manufacturing Engineer"**, from his own signature block — not "Manufacturing
Engineer" as HubSpot, Andrew's tracker and this room have carried it since Aug 24. Fix in HubSpot
(contact `243974146582`) and anywhere a document names him.

Full signature as it arrived:

> Joe Alderfer | Sr. Manufacturing Engineer | Havis, Inc.
> 75 Jacksonville Road | Warminster, PA 18974 | P: 215.394.4949
> E-Mail: jalderfer@havis.com | Web: www.havis.com

## Notes

- Phone `215.394.4949` matches the HubSpot record. Warminster address matches havis.com.
- Havis routes outbound mail through **Sophos** link protection (the rewritten `metacto.com` URL in the
  quoted reply). Worth knowing before sending anything link-heavy: a proposal delivered as a link may be
  rewritten or scanned, and a large attachment may be blocked in the other direction too.
- ⚠ **Andrew was cc'd and has not replied.** The separate question of whether Andrew already holds the
  photos Joe sent him pre-call is now moot for the prototype, but it is still unanswered.
- The CAD-versus-hand-drawn question was cut from the shortened email and remains **unasked**. It is the
  highest-value unknown left; raise it on the prototype walkthrough.


══════════════════════════════════════════
ATTACHMENTS — Lead origin and first read  (Aug 24)
Participants / provider: — (internal; no Havis participants)
Source: attachments/2026-08-24-lead-origin-and-first-read.md
══════════════════════════════════════════

# Havis — lead origin and first read

**Date:** 2026-08-24 (lead arrival) · **Filed:** 2026-08-28
**Participants:** — (internal; no Havis participants)
**Source:** Metacto founder GTM wiki, three internal records:
[`wiki/sources/2026-08-24-andrew-troya-sdr-1on1.md`](../../../../wiki/sources/2026-08-24-andrew-troya-sdr-1on1.md) (Zoom 1:1, Chris Fitkin + Andrew Troya, 2026-08-24),
[`wiki/crm-sources/2026-08-24-andrew-sdr-sheets.md`](../../../../wiki/crm-sources/2026-08-24-andrew-sdr-sheets.md),
[`wiki/crm-sources/2026-08-25-tuesday-sweep.md`](../../../../wiki/crm-sources/2026-08-25-tuesday-sweep.md).

## The contact

| Field | Value | Source |
|---|---|---|
| Name | **Joe Alderfer** | SDR tracker + Tuesday sweep |
| Title | **Manufacturing Engineer** | SDR tracker, Aug 24 |
| Company | **Havis Inc.** | HubSpot record, Aug 24 |
| Email | **jalderfer@havis.com** | Tuesday sweep, Aug 25 |
| HubSpot lifecycle | **Lead**, created Aug 24 | Tuesday sweep, verified against HubSpot |
| Source | **Paid Search — Google Ad, keyword `ai consultant`** | Tuesday sweep, Aug 25 |
| Booked by | **Andrew Troya** | Tuesday sweep |

## How he arrived

Inbound. Joe clicked a Metacto **Google paid-search ad on the keyword "ai consultant"** and landed in
HubSpot as a Lead on **Aug 24**. Andrew booked an intro for **Fri Aug 28, 10:30**. The Tuesday sweep
called out the speed explicitly:

> **Joe Alderfer — Havis Inc. — Paid Search, "ai consultant"** (Lead, Aug 24) — **and the Havis intro is
> already booked for Friday 10:30.** Paid search to booked intro in four days.

This makes Havis one of the ad-sourced records the Aug 24 source audit said were being under-counted —
a paid-inbound lead, not outbound, and not a partner or reseller.

## The only stated use case, verbatim

From the Aug 24 Chris/Andrew 1:1, Andrew's read after his first contact with Joe:

> *"he works in, like, the office and needs AI to help him with these kits and parts."*

⭐ That single line is the whole brief as of today. It is second-hand (Andrew relaying Joe), it names
**kits and parts** as the domain and **office work** as where the pain sits, and it has not been
confirmed by Joe directly. Everything else about the use case is inference until the Aug 28 intro.

## What this record does NOT establish

- No stated budget, timeline, authority, or decision process.
- No named stakeholders at Havis besides Joe.
- No confirmation that the KEYENCE vision-hardware angle (see the Aug 28 research note) is Havis's
  actual problem — that connection is a Metacto hypothesis, not something Joe has said.
- Joe's title is **Manufacturing Engineer**, which sits closer to the shop floor than to the office;
  worth reconciling with "works in the office" on the call.

## Notes

- Andrew counted Joe among "4 confirmed + 1 pending" meetings for the week of Aug 18–24; Joe is the
  **inbound** one of the four (the other three came from personalized outreach and Dripify).


══════════════════════════════════════════
ATTACHMENTS — Company scale, ownership, and how the estimate lands  (Aug 28)
Participants / provider: — (internal research)
Source: attachments/2026-08-28-company-size-and-budget-frame.md
══════════════════════════════════════════

# Havis — company scale, ownership, and how the estimate lands

**Date:** 2026-08-28 · **Participants:** — (internal research)
**Source:** Apollo.io org enrichment on `havis.com` (org id `54a1999d746869547557af00`), retrieved
2026-08-28 via `bin/apollo org` · plus the IT-spend benchmarks cited below. ⭐⭐⭐

> 🔴 **INTERNAL ONLY. Nothing on this page goes into a Havis-facing document.** Apollo's headcount and
> revenue are **modelled, not reported** — house rule: never quote them to the company they describe.
> The client brief carries a break-even built only on Havis's own numbers instead.

## Ownership — the most important finding

⭐⭐ **Havis is private-equity backed. Guardian Capital Partners, December 2020.** Apollo records it as the
only funding event, stage "Private Equity".

Why this changes the sale:

- A PE-owned manufacturer six years into a hold is **under value-creation pressure and reporting
  discipline**. A defect-escape rate that is currently *an estimate* is exactly the kind of unmeasured
  operational number a sponsor dislikes.
- **Capex and new-vendor spend go through a gate.** This validates the staged structure: a $28K proof is
  an operational decision; $120K is likely a capital or sponsor-visible request.
- ⭐ **Shadow mode is the PE-friendly feature.** It produces a measured baseline and a control on real
  production. That is board-reportable in a way "we bought a vision system" is not.
- Joe's *"I'm sure I can probably sell that… the leadership wants to know that just the best solution"*
  reads differently now: he is describing a sponsor-influenced leadership team that will fund the right
  answer if the case is made properly.

## Scale ⚠ (modelled, and internally inconsistent)

| Field | Apollo value | Note |
|---|---|---|
| Founded | **1928** | Consistent with havis.com's "80+ years" |
| Employees (structured field) | **290** | |
| Employees (Apollo's own description) | **"around 400 team members"** | ⚠ **Conflicts with 290** |
| Revenue (structured field) | **$126.2M** | |
| Revenue (Apollo's own description) | **"approximately $81 million"** | ⚠ **Conflicts with $126.2M** |
| HQ | 75 Jacksonville Rd, Warminster PA 18974 | Matches havis.com |
| Phone | +1 215-957-0720 | |
| ISO | ISO 9001 certified | Also on havis.com |
| Headcount growth | +1.5% (6mo) · +3.0% (12mo) · **+18.7% (24mo)** | Growing, and the two-year figure is real growth |
| Locations | Multiple US sites **plus the UK** | 🔴 **The call assumed Warminster only.** More sites changes the deployment story. |

⚠ **Apollo contradicts itself on both revenue and headcount inside a single response.** Treat the working
range as **~$81M–126M revenue** and **~290–400 people**, and treat any single figure as unsafe. The `state`
field caveat in CLAUDE.md applies to this grade of number generally.

## Group structure — Havis is a small group, not one plant

| Subsidiary | What it does | Apollo headcount |
|---|---|---|
| **Vanner Inc.** (`vanner.com`) | Power inverters / electrical manufacturing | 60 |
| **Pro-gard Products LLC** (`pro-gard.com`) | Law-enforcement vehicle equipment | 19 |
| Engineered Network Solutions | Construction | 1 |

⭐ **Vanner maps directly onto Havis's "Power Management" product line**, and Pro-gard onto public safety.
So the kit-assembly problem plausibly exists at **more than one entity**, which is expansion surface —
and a reason the architecture should not assume a single site.

## Departmental headcount (Apollo-modelled)

| Function | Count | Read |
|---|---|---|
| **Engineering** | **38** | Mechanical / electrical / design, not ML. They can integrate; they cannot build this. |
| Sales | 34 | |
| Operations | 24 | The population that lives with the kit problem |
| **Information Technology** | **23** | ⭐ A real IT function. Big enough to host, secure and maintain — which is exactly the handoff story. |
| Arts & design | 13 | |
| Support / Marketing | 11 / 11 | |
| Finance / Accounting | 8 / 5 | |
| Product mgmt / HR | 6 / 6 | |
| Business development | 2 | |
| **Data science** | **0** | 🔴 **The whole argument in one number.** |

⭐⭐ **23 in IT and 0 in data science is the answer to "why don't we build this ourselves?"** — a question
a PE-backed leadership team will ask. Havis has the capability to **run** this and no capability to
**build** it. That is precisely the shape Metacto sells: we build it, they own and operate it.

## Technology signals (Apollo `current_technologies`)

**The find that matters:**

⭐⭐⭐ **Dassault SOLIDWORKS.** Havis designs its own brackets, consoles and mounts in CAD. That makes it
**likely the silhouettes are generated from CAD/BOM geometry rather than drawn by hand** — the single
highest-value open question from the technical approach. If true, region maps for the 2,000-SKU long tail
become derivable programmatically and Stage 3 compresses substantially. **This is why the follow-up email
asks Joe the CAD question directly** (asked as a question, never as "we saw you use SOLIDWORKS").

**Other signals:**

- 🔴 **Microsoft-heavy, with an Azure footprint.** Microsoft 365, Exchange Online, Outlook, Power BI,
  Visio, **Microsoft SQL Server** (and a **SQL Server 2005** signal), and **Azure Virtual Machine Scale
  Sets**. Joe also said *"usually we use Teams."* **Chris has directed AWS, and AWS is defensible for a
  greenfield workload — but expect Havis IT to say "we are a Microsoft shop."** The brief must answer that
  on the merits rather than dodge it, and the honest answer is that the workload is greenfield, nothing is
  being migrated off Microsoft, and the AWS-specific reason is the edge-fleet runtime.
- **Salesforce** (Sales Cloud + CRM Analytics) **and HubSpot** both appear. Salesforce is likely the CRM of
  record; HubSpot may be marketing-side or stale.
- **Python** and **R** in the stack: there is scripting capability in-house, consistent with Joe having
  built his own capture program and Excel compliance analysis.
- **eMaint CMMS** (maintenance), **ADP Workforce Now** (HR), **Sophos** (security), **ConnectWise Control**
  (remote support, suggesting an MSP relationship or an internal helpdesk tool).
- ⚠ **A SQL Server 2005 signal** in 2026 is either stale aggregator data or genuine legacy debt. Do not
  raise it with Havis; note it as a possible sign that IT carries maintenance load.

## How the estimate lands against likely budget

**Benchmarks.** Discrete manufacturers typically spend **1.4%–3.2% of revenue on IT** (25th–75th
quartile), with Deloitte's historical manufacturing figure around **2.14%**; broader manufacturing ranges
**2–5%**, and IT/OT-converged discrete manufacturers run **3.4%–4.8%**. Sources:
[Avasant / Computer Economics](https://www.computereconomics.com/it-spending-and-staffing-benchmarks/) ·
[VendorBenchmark IT/OT 2026](https://vendorbenchmark.com/blog/manufacturing-it-ot-convergence-cost-benchmark) ·
[itbudgetcalculator by industry](https://itbudgetcalculator.com/by-industry).

**Applied to the range** (⚠ modelled revenue, so this is a bracket not a number):

| | at ~$81M revenue | at ~$126M revenue |
|---|---|---|
| IT spend at 2.14% | ~$1.7M | ~$2.7M |
| IT spend at 3.2% | ~$2.6M | ~$4.0M |
| **Discretionary / new-initiative slice** (typically 20–30% of IT spend) | **~$350K–780K** | **~$540K–1.2M** |

**Where our numbers sit:**

| Our ask | As % of revenue | As % of the discretionary IT slice |
|---|---|---|
| **Stage 1 proof · $28K** | ~0.02–0.03% | **~2–8%** |
| **Stage 2 launch · $120K** | ~0.10–0.15% | **~10–34%** |
| Stage 1 + Stage 2 + 12 months of Continuous AI · $360K | ~0.3–0.4% | ~30–100% |
| **AWS run cost · ~$3.2–5.6K/yr** | rounding error | rounding error |

**The read:**

- ⭐ **$28K is comfortably inside a manager-level or single-quarter operational decision.** It is small
  enough that Joe plus one leader can approve it. This is the whole reason to lead with the proof stage.
- ⭐ **$120K is a real but normal request** — roughly a tenth to a third of one year's discretionary IT
  capacity, for the company's self-declared biggest operational problem. That is a defensible proportion,
  and it is the sentence to hand Joe.
- 🔴 **$360K across a full year is a different conversation** and could consume most of a year's
  discretionary IT budget at the low end of the revenue range. **Do not lead with a year-one total.**
  Keep Continuous AI as the optional, quarterly, pre-priced thing it is.
- **The AWS run cost is not a budget objection at any point.** It is smaller than the software licences
  already on the page.

**The competing-spend risk:** a 23-person IT function at a PE-backed manufacturer with a SQL Server 2005
signal is likely already carrying modernization work. We are competing for the discretionary slice against
infrastructure debt, not against nothing.

## The buy-side hidden cost, which is the strongest budget argument

The packaged route's cost is not the camera, it is **engineering time, forever**. Using Havis's own
numbers (6 SKUs programmed; ~400 silhouettes carrying ~80% of hours) and one Metacto assumption
(~4 engineer-hours to author, deploy, tweak and validate one kit):

- **400 kits ≈ 1,600 engineer-hours ≈ ~0.8 engineer-years.** At a loaded cost in the region of $120K/yr,
  that is **roughly $95K of engineering time** to reach the same coverage the Launch targets — and it buys
  a system that still cannot count a screw.
- **2,000 kits ≈ 8,000 hours ≈ ~4 engineer-years.**

⭐ **So the honest comparison is not "$120K versus free." It is "$120K for a system that improves, versus
roughly a comparable amount of engineering time for one that is capped."** That belongs in the brief, with
the 4-hour assumption clearly labelled as ours for Havis to correct.

## Open questions this raises

1. 🔴 **How many sites actually run kit assembly?** Apollo says multiple US locations plus the UK, and
   there are three subsidiaries. The call assumed Warminster. Ask Joe.
2. Does the kit problem exist at **Vanner** or **Pro-gard** too? That is expansion surface.
3. **Confirm revenue and headcount from a non-aggregator source** before any of it informs pricing. Both
   Apollo figures are internally contradictory.
4. Who is the **CFO / VP Operations / VP Engineering**, and is there a sponsor-side operating partner from
   Guardian Capital involved in capex decisions?
5. Is the **Azure footprint** material, or incidental? It decides how hard the AWS conversation is.


══════════════════════════════════════════
ATTACHMENTS — KEYENCE integration surface research  (Aug 28)
Participants / provider: — (internal research)
Source: attachments/2026-08-28-keyence-integration-surface-research.md
══════════════════════════════════════════

# KEYENCE integration surface — what a closed-loop counting system can actually do

**Date:** 2026-08-28 · **Participants:** — (internal research)
**Source:** Two research passes provided by Chris Fitkin 2026-08-28 — (1) a Google AI Mode overview,
(2) Chris's corrective technical analysis with KEYENCE citations.
**Verification:** the load-bearing claims in pass 2 were checked directly against KEYENCE's own IV3 and
IV4 specification pages on 2026-08-28. Results in the **Verified** table below. ⭐⭐⭐

> **Standing caveat:** Havis has **not** told us they run KEYENCE hardware, or which models. The only
> use-case statement we hold is second-hand — *"he works in, like, the office and needs AI to help him
> with these kits and parts"* (Andrew Troya relaying Joe Alderfer, 2026-08-24). This note is a
> **capability map for a hypothesis**, not a description of Havis's environment. Confirm the hardware
> before any of it reaches a client-facing document.

---

## 🔴 SUPERSEDED IN PART BY THE AUG 28 CALL — read this first

This note was written **before** the intro call. The call
([`transcripts/2026-08-28-havis-metacto-intro.md`](../transcripts/2026-08-28-havis-metacto-intro.md))
changed two of its premises. What follows below is still accurate about KEYENCE hardware, and the
verification table is still good; but the **strategic conclusion has flipped.**

| This note assumed | The call established |
|---|---|
| Hardware unknown; **IV3/IV4** treated as the likely and best-case line | Havis runs a **KEYENCE VS-series** camera. **AI Count is an IV4 tool — Havis does not have it.** Joe: *"there's no AI for those tools. So I can't go back and add additional images to retrain it."* |
| The product is a **control plane wrapped around KEYENCE** — collect, evaluate, manage programs, deploy approved updates | Joe wants **an alternative to KEYENCE**, not a wrapper: *"we're looking mostly for an alternative. Not even, it doesn't even have to use their cameras."* *"We're definitely not tied, like, married to that 100."* |
| Per-SKU master/program management is the mechanism to improve | ⭐ **Per-SKU programming is the problem, not the mechanism.** 2,000 SKUs; **6 programmed in 18 months of trying.** Joe: *"which is pretty insane."* |
| KEYENCE's API surface is the integration path worth pricing | Chris raised the KEYENCE-agent option on the call and **downgraded it live** — *"their software and APIs are not great, and they're very different from hardware to hardware."* Joe did not pursue it. |

**What survives and still matters:**

1. The **VS line does document additional AI learning and an Auto Image Selector** (unverified sources
   below). That is worth one verification pass — if Havis's specific VS model supports it, there is a
   cheaper interim play. But Joe, who owns the system, says the counting tools he needs have no AI.
   **Believe the operator over the brochure until proven otherwise.**
2. **FTP/SFTP image egress and selectable NG / near-threshold logging** are real on this hardware family.
   If the KEYENCE camera stays in service for the kits it already handles well, that is how its images
   join the training corpus at no integration cost.
3. **The "claim we will NOT make" section stands unchanged and now matters more**, because the proposal
   is a custom CV build. Do not promise headless KEYENCE retraining.
4. The **human-approval gate before any inspection change goes live** is the right shape regardless of
   whose camera it is. Carry it into the custom architecture.

**Do not price a KEYENCE control plane.** Price the custom holistic scanner. Keep KEYENCE as a
side-by-side incumbent that keeps the kits it already passes reliably.

---

## The question

Can we push updated silhouette/master definitions to KEYENCE vision hardware, and feed it good/bad
images to improve hardware counting (e.g. "# of screws in a kit")?

## Pass 1 — the Google AI Mode answer (recorded, then superseded)

The Google overview answered essentially **no**:

> "No, you cannot use an API to dynamically push new silhouette/master definitions or feed good/bad
> images into Keyence hardware for live, automated AI retraining."

Its reasoning: industrial vision systems are deliberately closed deterministic loops; masters live
inside program files (`.clp` / `.gpe`) that must be round-tripped through VisionEditor or the
Simulation Software; training happens offline, then the configuration is uploaded back.

It did get three things right that survive into the final architecture: **the camera should stay
deterministic during production**, **images come out to FTP or a PC rather than in through an API**, and
**edge-learning needs only a handful of images** (it said 5–20).

⚠ Where it is wrong, or too narrow:

- It treats "no headless retraining REST API" as "no external master registration" — those are
  different things, and IV3/IV4 support the latter explicitly.
- It frames CV-X / XG-X as the reference architecture. For a counting problem the relevant lines are
  **IV3/IV4 and VS**, which carry purpose-built AI counting and additional-learning functions.
- It misses **AI Count** entirely — a KEYENCE tool built for exactly this job.

## Pass 2 — the corrected capability map

| Capability | Possible? | How |
|---|---|---|
| Pull inspection results | **Yes** | TCP/IP, EtherNet/IP, PROFINET |
| Pull / save inspection images | **Yes** | FTP/SFTP, VisionTerminal, ActiveX, internal storage |
| Automatically capture NG images | **Yes** | Native image-logging rules |
| Automatically capture borderline OKs | **Yes** | IV3/IV4 threshold-based logging |
| Change active inspection program | **Yes** | Program-switch commands / PLC / network |
| Maintain multiple inspection programs | **Yes** | 32 without SD card, 128 with |
| Register / update master images | **Yes, with caveats** | IV3/IV4 external master image registration; multiple masters |
| Train on additional OK/NG examples | **Yes** | IV3/IV4 and VS "Additional Learning" |
| Push arbitrary training examples via documented REST API | **No evidence found** | Training is mediated by KEYENCE software/workflows |
| Fully autonomous live retraining | **Not a supported public API** | Build a controlled deployment loop instead |

### Verified against KEYENCE's own spec pages, 2026-08-28

| Claim | IV4 spec page says | IV3 spec page says |
|---|---|---|
| AI counting tool | ✅ **"AI Count"** listed among tools | — (not listed) |
| Additional Learning | ✅ "Additional Learning (AI Differentiate, AI Identify, AI OCR, **AI Count**, AI Trigger. AI Through Count Mode: Count)" | ✅ "Additional learning, Mask outline, Masking function" |
| External master registration | ✅ "ext. master image registration" as an assignable input function; "adding multiple masters" under utilities | ✅ "External master image registration" — assignable function for inputs IN2–IN8 |
| Program capacity | ✅ "128 programs (with SD card) / 32 programs (without SD card)" | ✅ same: 128 with SD card / 32 without |
| Program switching | ✅ "high-speed program switching, automatic program switching" | ✅ "High-speed program switching, Auto program switching" |
| Image transfer | ✅ "Transfer destination: microSD card/FTP server/SFTP server – selectable" | ✅ "Selectable between SD card, FTP server, and SFTP server" |
| Selective logging | ✅ "Logging Settings 1: **NG only / OK near NG threshold / All** – selectable" | ✅ "Transfer conditions: NG only, **NG and OK near threshold**, All" |
| Settings backup/restore | ✅ "automatic settings backup/restore" under utilities | — (not listed on this page) |
| Comms | ✅ EtherNet/IP, PROFINET CC-B, TCP/IP non-procedural (×2 connections); PROFINET CC-C + EtherCAT via unit | ✅ EtherNet/IP, PROFINET, TCP/IP non-procedure; EtherCAT, CC-Link, DeviceNet, RS-232C, PROFIBUS via unit |

**Every load-bearing claim held.** The one material difference: **AI Count appears on IV4, not IV3.**
If Havis is on IV3, counting is done with Blob Count and outline tools rather than a dedicated AI
counting tool — which changes how much of the improvement loop is parameter tuning versus retraining.

**Max master-image count is not published on either specs page.** Both confirm multiple masters; neither
states a ceiling. Treat any specific number as unverified.

### Sources cited in pass 2 (not independently re-verified beyond IV3/IV4 above)

- IV3 specs — external master registration, multi-master, program switching, FTP/SFTP, TCP/IP: `keyence.com/products/sensor/vision-sensor/iv3/specs/` ✅ verified
- IV4 specs — AI Count, Additional Learning, backup/restore, masters, program switching, image transfer: `keyence.com/products/vision/vision-sensor/iv4/specs/` ✅ verified
- VS AI setup — collecting production images for additional AI learning; **Auto Image Selector**; "a few dozen images" for learning: `keyence.com/support/user/vision/vs/ai_setting/` ⚠ not re-verified
- VS-G — stores production images internally, **Auto Parameter Tuning** + **Auto Image Selector** using real production images: `keyence.com/products/vision/vision-sys/vs-g/pr/200185001.jsp` ⚠ not re-verified
- XG-X software — **ActiveX control** for operating controllers and collecting data/images; communication commands; reading/writing setting files: `keyence.com/support/user/xg-x/code/` ⚠ not re-verified
- CV-X software — ActiveX, command interfaces, FTP image output, program management: `keyence.com/support/user/cv-x/code/` ⚠ not re-verified

---

## The proposed architecture

⭐ **Silhouette management is not the core architecture.** The camera stays deterministic during
production; the Metacto system becomes the **learning and deployment control plane around it**.

```text
KEYENCE CAMERA
      |
      +-- count = 11
      +-- confidence / tool results
      +-- inspection image
             |
             v
       FTP / SFTP / PC
             |
             v
     Improvement Service
             |
       +-----+-----+
       |           |
   Production   Failure corpus
   metrics      + edge cases
                   |
                   v
             AI evaluator
                   |
          correct / incorrect
                   |
                   v
           Candidate dataset
           OK / NG / labels
                   |
                   v
        KEYENCE simulator /
        Additional Learning
                   |
                   v
           candidate config
                   |
             validation
                   |
             human approve
                   |
                   v
         deploy new program
                   |
                   v
        remotely switch program
```

For CV-X / XG-X estates, an on-prem Windows service is the adapter layer — a clean separation between
Metacto's system and proprietary KEYENCE interfaces:

```text
Cloud / Metacto
       |
       v
Site Agent / Windows Service
       |
       +-- ActiveX
       +-- TCP/IP
       +-- FTP/SFTP
       +-- KEYENCE software/files
                 |
                 v
             KEYENCE
```

## 🔴 The claim we will NOT make

Do not say, in any client-facing document or on any call:

> ~~"We can automatically send labeled images to KEYENCE and retrain the camera through an API."~~

No publicly documented interface supports that headless workflow. Say this instead:

> **We can automatically collect images and inspection outcomes, identify failure cases, manage new
> master/program definitions, validate candidate improvements, and deploy approved inspection updates
> back to the KEYENCE systems.**

Then pressure-test how much of the **Additional Learning → save configuration** step can be automated
for their exact hardware models.

## Where the opportunity is strongest

If Havis's installed units are **IV3/IV4**, this is a particularly strong fit. IV4 already ships AI
Count, Additional Learning, image export, program switching and multi-master support — and KEYENCE's own
direction of travel (VS-G's Auto Parameter Tuning and Auto Image Selector) confirms the loop is the right
shape. What KEYENCE does **not** appear to offer is a unified **fleet-level** API or cloud control plane.
That gap is the product.

## Open questions this note cannot answer

1. 🔴 **Exact KEYENCE model(s) installed at Havis.** Everything downstream depends on it — IV3 vs IV4
   alone changes whether AI Count is available. This is the first technical question on the call.
2. Rule-based tools (Blob Count) or built-in AI / Edge Learning tools today?
3. How many camera stations, at how many sites? (Fleet size decides whether a control plane pays for itself.)
4. Is there a PLC in the loop, and who owns program changes today?
5. What does the current miscount rate actually cost — rework, scrap, warranty, customer returns?
6. Who at Havis signs off on an inspection-criteria change, and what validation do they require?
7. Is KEYENCE even the right entry point, or is the "kits and parts" pain upstream in BOM/kit definition?


══════════════════════════════════════════
ATTACHMENTS — Havis channel sweep  (Aug 28)
Participants / provider: — (internal)
Source: attachments/2026-08-28-ziggy-channel-sweep.md
══════════════════════════════════════════

# Havis — full channel sweep

**Date:** 2026-08-28 · **Participants:** — (internal)
**Source:** `bin/ziggy` sweep across Gmail, Calendar, Zoom, HubSpot, Slack, Drive and web, run
2026-08-28 ~17:00Z (channel: ziggy). HubSpot figures cross-checked the same day against Vocion's typed
reads (`get_hubspot_contacts`, `get_hubspot_companies`, `get_hubspot_deals`) — **they agree**. ⭐⭐

## Per-channel result

| Channel | Result |
|---|---|
| **Gmail** | 2 threads, both 2026-08-24 — filed as [`emails/2026-08-24-hubspot-form-submission-and-intro-invite.md`](../emails/2026-08-24-hubspot-form-submission-and-intro-invite.md) |
| **Calendar** | 1 meeting: **Havis & Metacto Intro**, Fri 2026-08-28 10:30–11:00 PDT, organizer Andrew Troya, attendees Andrew + Chris (optional) + `jalderfer@havis.com`, Zoom `82809547675`. No prior meetings. |
| **Zoom** | ⚠ **Nothing found.** Ziggy's Zoom credential returned code 124 — client-credentials grant cannot enumerate user recordings. Vocion's `get_zoom_transcript` fails on the same class of problem: `code 4711, does not contain scopes: cloud_recording:read:list_recording_files`. **Neither path can fetch this recording live.** |
| **HubSpot** | Company + 1 contact, **0 deals**, **0 logged notes or calls**. Detail below. |
| **Slack** | **Nothing found.** All 7 channels searched (random, general, metacto-exec, marketing-website, andrew_production_release, kommu-builds, journey-builds). No mention of Havis anywhere. |
| **Drive** | 1 document — Andrew's Weekly Sales Status Dashboard. Detail below. |
| **Web** | Company profile — filed separately as [`2026-08-28-havis-company-profile.md`](2026-08-28-havis-company-profile.md). Additions below. |

## HubSpot state, 2026-08-28

**Company `57722214256`** — Havis · havis.com · Automotive · 271 employees ⚠ (modelled) · HQ Warminster,
PA · lifecycle **Lead** · **lead status not set** · ⚠ **no owner assigned** · created 2026-08-24 ·
last modified 2026-08-28 17:34 UTC · notes-last-contacted 2026-08-28 17:33 UTC.
`https://app.hubspot.com/contacts/46019532/record/0-2/57722214256`

**Contact `243974146582`** — Joe Alderfer · Manufacturing Engineer · `jalderfer@havis.com` ·
**215.394.4949** · lead status **NEW** · created 2026-08-24 · original source `PAID_SEARCH`.
`https://app.hubspot.com/contacts/46019532/record/0-1/243974146582`

**Deals: 0.** **Logged notes / call records: 0.**

⚠ Two gaps worth closing: **no HubSpot owner** on the company, and **nothing logged from the Aug 28
call** as of 17:34 UTC. The `notes_last_contacted` timestamp of 17:33 UTC moved during the call window,
so something touched the record — but no note body exists to read.

## Drive — Andrew's Weekly Sales Status Dashboard

Google Sheet `1Mth3DbZQXbkR3nvHbvIijfT5T3Y5G501yIUZFWLFwE8`, last modified 2026-08-28.
**Leads tab, row 11:**

| Column | Value |
|---|---|
| Name | Joe Alderfer |
| Company | Havis |
| Source | Inbound |
| Channel | Google Ad |
| Title | Manufacturing Engineer |
| Stage | **Discovery Booked** |
| Date | 8/24/2026 |
| Goal | Have meeting |
| Next | Aug 28th |
| **Qualified** | **No** |

## Web additions to the company profile

- **Founded 80+ years ago** (~1940s) per havis.com.
- **Mission:** *"To be the partner of choice for highly engineered and fully integrated mobility
  solutions through innovative designs, state-of-the-art manufacturing and relentless attention to
  quality."*
- **Vision:** *"To revolutionize industries by enabling technology at the Point of Interaction."*
- Differentiators claimed: 80+ years manufacturing heritage; safety testing (**crash simulation, airbag
  zone testing, IP / EMI / RF testing**); ergonomics; rugged construction.

⭐ **"State-of-the-art manufacturing" and "relentless attention to quality" are Havis's own words**, and
crash / airbag / IP / EMI / RF testing is a real validation regime. A company that already invests in
that kind of verification has both the culture and the budget line for inspection improvement — and a
higher cost of getting a kit wrong.

## 🔴 The blocker

**No automated path exists to the Aug 28 call recording.** Ziggy's Zoom credential and Vocion's both
lack `cloud_recording:read:list_recording_files`. Options, in order of preference:

1. Wait for **Vocion's Zoom sync** to ingest the recording, then read it from cache with
   `get_zoom_transcript("82809547675")`. Verified working for prior calls; it is the sync, not the live
   fetch, that has the access.
2. Chris downloads the VTT from the Zoom share link and drops it in.
3. Fix the Zoom app scopes so live fetch works — worth doing once, since this will recur.

## Notes

- ⚠ **Verify-don't-relay:** the Gmail and Drive contents above are Ziggy's summaries, not raw reads.
  HubSpot numbers were independently confirmed through Vocion and matched exactly.
- Ziggy searched 7 Slack channels. `#metacto-revops-client-gtm-vocion` — the channel CLAUDE.md names for
  client GTM summaries — is **not** in the list it reported. A Havis mention there would have been missed.


══════════════════════════════════════════
ATTACHMENTS — Havis company profile  (Aug 28)
Participants / provider: — (internal research)
Source: attachments/2026-08-28-havis-company-profile.md
══════════════════════════════════════════

# Havis Inc. — company profile

**Date:** 2026-08-28 · **Participants:** — (internal research)
**Source:** havis.com homepage, retrieved 2026-08-28 (channel: web) · HubSpot company record
`57722214256`, read via `vocion-mcp` 2026-08-28 (`as_of` 2026-08-28T17:00Z).

## What they make

Havis manufactures **in-vehicle and mobile-workspace hardware** — the physical layer that puts a
computer, a printer, a payment terminal or a storage system into a work vehicle. Seven product
categories on the site:

| Category | Examples |
|---|---|
| **Computing Solutions** | Docking stations, cradles, keyboards, mounts for laptops/tablets/mobile |
| **Mounting Solutions** | Vehicle and equipment mounts, payment-terminal stands, POS displays |
| **Consoles** | Vehicle-specific and universal console systems |
| **Storage Systems** | Trunk mounts, slide-out trays, storage boxes |
| **Transport Systems** | K9 and prisoner transport |
| **Power Management** | Inverters, power supplies, auto shut-off timers |
| **Carts / Kiosks** | Mobile retail and self-service |

⭐ **Vehicle-specific consoles and mounts are the tell.** A vehicle-specific console is not a catalog
part — it is a **kit**: a configured bill of materials assembled per vehicle platform, per customer, with
brackets, fasteners and accessories that vary by build. That is the shape of work Joe Alderfer named as
his problem ("kits and parts").

## Markets served

Public Safety (law enforcement, fire, EMS, DOT) · Energy & Utilities (gas, electric, water, waste, oil &
gas, telecom) · Warehouse & Distribution · Field Operations (service, construction, agriculture, mining) ·
Transportation & Logistics (bus, truck, railroad, last-mile) · Retail & Hospitality · Healthcare ·
Military, Defense & Aerospace · Aviation.

Nine verticals, most of them regulated or safety-critical. Public safety and defense in particular imply
**traceability and validation obligations** on what ships in a kit.

## Facts on file

| Field | Value | Source |
|---|---|---|
| HQ | **75 Jacksonville Road, Warminster, PA 18974** | havis.com |
| HubSpot industry | `AUTOMOTIVE` | HubSpot `57722214256` |
| Employees | **271** ⚠ | HubSpot — aggregator-modelled, not reported. Do not quote back to Havis. |
| Domain | havis.com | HubSpot |
| Company record created | 2026-08-24 | HubSpot |
| Open deals | **0** | `get_hubspot_deals`, total = 0, 2026-08-28 |

## What the site says about manufacturing

The homepage claims custom capability in its own words — *"we have the expertise and manufacturing
capabilities to streamline critical processes"* — and stresses "quality, custom solutions" and
custom-designed solutions to client specification. It does not describe the shop floor: no statement of
in-house machining, assembly lines, plant count, or inspection equipment.

⚠ **Nothing on the public site names KEYENCE or any vision-inspection vendor.** The KEYENCE line of
inquiry comes from Metacto, not from Havis.

## Open questions

1. How many manufacturing/assembly sites, and is Warminster the only one?
2. Where does kit assembly happen relative to engineering — same site?
3. What inspection equipment is on the line today, and who chose it?
4. Is Havis privately held? Ownership and any PE involvement is unknown, and it changes how a capital
   request gets approved.