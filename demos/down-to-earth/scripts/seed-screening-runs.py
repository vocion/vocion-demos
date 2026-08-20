#!/usr/bin/env python3
"""Seed skill runs — the screening trail behind Screening Activity + Review.

Everything is CORE data: rows in core's `skill_run` table, with core's own
status lifecycle (pending → approved/rejected) and core's feedback fields
(rating / feedback_note) — nothing bespoke. The demo pages and the core
Review page read the same rows.

Seeds, deterministically:
- read+score+route runs for the top-scored applicants (approved, reviewed)
- core FEEDBACK on several completed runs — thumbs ratings + notes, including
  the shift-work note that becomes the proposal's learning example
- two PENDING route_candidate runs (Marisol Torres + Keone Nakamura) so the
  demo opens with real items waiting in Review / the embedded queue

Idempotent: deletes rows tagged created_by='seed:screening' first.

Usage: python3 seed-screening-runs.py | docker exec -i vocion-postgres \
         psql -U postgres -d vocion_dte
"""
import json
import pathlib

HERE = pathlib.Path(__file__).resolve().parent
DATA = HERE.parent / "workspace" / "down-to-earth" / "data"
ORG = "proj-3a44f54e-f3a1-4045-96cd-de80e5f3b99d"

MANAGERS = {
    "kahului": "P. Kealoha", "honolulu": "R. Santos", "kakaako": "M. Ikaika",
    "kailua": "L. Fonoti", "pearlridge": "D. Choy", "kapolei": "T. Agbayani",
}
CURATED = {"APP-IN-041": 88, "APP-IN-042": 81, "APP-IN-043": 74}
PENDING_ROUTE = {"APP-IN-041", "APP-IN-042"}  # waiting in Review for the demo

FEEDBACK = {  # core skill_run.rating / feedback_note — the learning loop's raw material
    "APP-IN-041": ("up", "Exactly right — the deli counter history is what we hire for."),
    "APP-IN-043": ("up", "Good call marking the low 70s as our call to make."),
    "APP-IN-003": ("up", "Shift work at a drive-through held up well in our deli — weight that a bit higher for Deli Clerk."),
    "APP-IN-007": ("down", "Scored availability too generously — 'weekends maybe' is not weekend coverage."),
}


def esc(v: str) -> str:
    return v.replace("'", "''")


apps = {}
for fname in ("applicants-indeed.jsonl", "applicants-website.jsonl"):
    for line in (DATA / fname).read_text().splitlines():
        if line.strip():
            a = json.loads(line)
            apps[a["id"]] = a

# same deterministic score derivation as seed-processed-applicants.py
KEYWORDS = [("grocery", 10), ("deli", 8), ("produce", 6), ("retail", 6), ("register", 5), ("pos", 5),
            ("food-handler", 5), ("customer", 4), ("inventory", 5), ("stock", 3), ("supervisor", 4), ("kitchen", 4)]


def score(a):
    if a["id"] in CURATED:
        return CURATED[a["id"]]
    s = 52
    body = a.get("body", "").lower()
    for kw, pts in KEYWORDS:
        if kw in body:
            s += pts
    av = (a.get("availability") or "").lower()
    s += 8 if ("full-time" in av or "any shift" in av) else 4 if ("weekend" in av or "evening" in av) else 0
    s += 6 if a.get("plant_based_ack") == "acknowledged" else 0
    s += 3 if "reference" in body else 0
    s += (sum(ord(c) for c in a["id"]) % 7) - 3
    return max(41, min(96, s))


# the trail covers the ten strongest applicants + all curated
picks = sorted(apps.values(), key=score, reverse=True)[:10]
for cid in list(CURATED) + list(FEEDBACK):
    if cid in apps and all(p["id"] != cid for p in picks):
        picks.append(apps[cid])

print("BEGIN;")
print(f"DELETE FROM skill_run WHERE org_id='{ORG}' AND created_by='seed:screening';")

day = 0
for a in picks:
    aid = a["id"]
    n = score(a)
    name = a["name"].split(" — ")[0]
    store = a.get("store_preference", "not-stated")
    mgr = MANAGERS.get(store, "corporate")
    day += 1
    ts = f"now() - interval '{max(1, 14 - day)} days'"

    def run(skill, inp, out, status, extra_cols="", extra_vals=""):
        print(
            "INSERT INTO skill_run (org_id, project_id, skill_id, input, output, status, confidence, created_by, created_at"
            + (", " + extra_cols if extra_cols else "")
            + f") SELECT '{ORG}', '{ORG}', s.id, '{esc(json.dumps(inp))}'::jsonb, '{esc(out)}', '{status}', 'confident', 'seed:screening', {ts}"
            + (", " + extra_vals if extra_vals else "")
            + f" FROM skill s WHERE s.org_id='{ORG}' AND s.slug='{skill}';"
        )

    reviewed = "reviewed_by, reviewed_at", f"'dte@example.com', {ts} + interval '2 hours'"

    run("review_application", {"title": f"{name} — application intake", "applicant": aid},
        json.dumps({"applicant": aid, "profile": f"{name}: {a.get('role_applied')} · {store.title()} · {a.get('availability') or 'availability not stated'}", "plant_based_ack": a.get("plant_based_ack"), "smokes_or_vapes": a.get("smokes_or_vapes")}),
        "approved", *reviewed)

    fb = FEEDBACK.get(aid)
    fb_cols = ", rating, feedback_note, feedback_by, feedback_at" if fb else ""
    fb_vals = f", '{fb[0]}', '{esc(fb[1])}', 'dte@example.com', {ts} + interval '1 day'" if fb else ""
    print(
        "INSERT INTO skill_run (org_id, project_id, skill_id, input, output, status, confidence, created_by, created_at, reviewed_by, reviewed_at"
        + fb_cols
        + f") SELECT '{ORG}', '{ORG}', s.id, '{esc(json.dumps({'title': f'{name} — score', 'applicant': aid}))}'::jsonb, "
        + f"'{esc(json.dumps({'applicant': aid, 'score': n, 'band': 'strong' if n >= 85 else 'qualified' if n >= 70 else 'near-miss', 'why': f'{n}/100 — experience and availability weighed per the scoring rubric; policy answers recorded, nothing auto-rejected.'}))}', "
        + f"'approved', 'confident', 'seed:screening', {ts} + interval '10 minutes', 'dte@example.com', {ts} + interval '2 hours'"
        + fb_vals
        + f" FROM skill s WHERE s.org_id='{ORG}' AND s.slug='score_candidate';"
    )

    if n >= 70:
        route_out = json.dumps({"applicant": aid, "routed_to": f"{mgr} · {store.title()}", "email_draft": f"Shortlist: {name} ({n}/100) for {a.get('role_applied')} — full scoring rationale attached. Reply to schedule."})
        if aid in PENDING_ROUTE:
            run("route_candidate", {"title": f"{name} — route to {store.title()}", "applicant": aid}, route_out, "pending")
        else:
            run("route_candidate", {"title": f"{name} — route to {store.title()}", "applicant": aid}, route_out, "approved", *reviewed)

print("COMMIT;")
