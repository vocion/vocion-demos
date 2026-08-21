#!/usr/bin/env python3
"""Seed *processed* applicant business objects for the DTE demo pages — v2, depth.

Every record must survive being opened on a projector: availability and shift
preferences, certifications, an experience summary, and the actual screening
rationale — all deterministic functions of the committed fixtures (same input
→ same output, re-runnable). Arrival times spread across a ~30-day window
derived from each id, never one stamped batch.

Adds four deliberate edge cases (fixture-only, tagged in metadata):
  EDGE-OVERQUALIFIED  ex-store-manager applying for Cashier — scores high,
                      rationale flags retention risk
  EDGE-CONFLICT       strong candidate whose stated availability contradicts
                      the role's weekend need — 71 with an explicit caveat
  EDGE-NEARMISS       exactly 68 — the "second look" band, held with reason
  EDGE-DUP-A/B        the same person applying via Indeed AND the website —
                      the second is flagged duplicate_of the first

Curated APP-IN-041/042/043 stay pinned at 88/81/74 (the proposal's trace).
Idempotent: wipes rows tagged seeded_by=this script, then re-inserts.

Usage: python3 seed-processed-applicants.py | docker exec -i vocion-postgres \
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

KEYWORDS = [  # job-related signals only, mirroring the scoring-rubric playbook
    ("grocery", 10, "grocery-floor experience"), ("deli", 8, "deli-counter experience"),
    ("produce", 6, "produce handling"), ("retail", 6, "retail background"),
    ("register", 5, "register work"), ("pos", 5, "POS familiarity"),
    ("food-handler", 5, "a current food-handler card"), ("customer", 4, "customer-facing history"),
    ("inventory", 5, "inventory experience"), ("stock", 3, "stocking work"),
    ("supervisor", 4, "supervisory experience"), ("kitchen", 4, "kitchen experience"),
]

EDGES = [
    {
        "id": "EDGE-OVERQUALIFIED", "name": "Renata Okafor — Cashier (Honolulu)",
        "role_applied": "Cashier", "level": "level-2", "store_preference": "honolulu",
        "source": "indeed", "availability": "full-time, any shift",
        "plant_based_ack": "acknowledged", "smokes_or_vapes": "no",
        "body": "RESUME\nRenata Okafor · Oahu, HI\nExperience: 9 years grocery — 4 as store manager (32-person team), P&L owner, inventory systems, register + POS training lead. Food-handler card current. References from two district managers.\nAPPLICATION ANSWERS\nStore preference: Honolulu\nAvailability: full-time, any shift\nWhy Down to Earth: relocating and want to step back from management for a while.",
        "edge": "overqualified",
        "pin": 93,
        "note": "Scores at the top of the pool — and the history is a store manager applying two levels down. Strong hire on paper; flag the retention question for the manager conversation rather than the score.",
    },
    {
        "id": "EDGE-CONFLICT", "name": "Dario Vela — Deli Clerk (Kailua)",
        "role_applied": "Deli Clerk", "level": "level-2", "store_preference": "kailua",
        "source": "website", "availability": "weekdays only, ends 3pm",
        "plant_based_ack": "acknowledged", "smokes_or_vapes": "no",
        "body": "RESUME\nDario Vela · Kailua, HI\nExperience: 3 years deli counter + kitchen prep, food-handler card, register work.\nAPPLICATION ANSWERS\nStore preference: Kailua\nAvailability: weekdays only, must leave by 3pm (childcare)\nWhy Down to Earth: closest store to home, love the deli.",
        "edge": "scheduling-conflict",
        "pin": 71,
        "note": "Experience is exactly the role — but the Kailua deli's open need is weekend closing shifts, and the stated availability is weekday-until-3pm. Routed at 71 with the conflict called out; the manager decides whether a schedule can be built.",
    },
    {
        "id": "EDGE-NEARMISS", "name": "Tomas Iwata — Sales Associate (Pearlridge)",
        "role_applied": "Sales Associate", "level": "level-2", "store_preference": "pearlridge",
        "source": "indeed", "availability": "evenings + weekends",
        "plant_based_ack": "acknowledged", "smokes_or_vapes": "no",
        "body": "RESUME\nTomas Iwata · Aiea, HI\nExperience: 18 months movie-theater concessions — register, food handling, closing duties.\nAPPLICATION ANSWERS\nStore preference: Pearlridge\nAvailability: evenings and weekends\nWhy Down to Earth: switching to daytime retail long-term, shopping here since high school.",
        "edge": "near-miss",
        "pin": 68,
        "note": "Two points under threshold: real register and food-handling history, but short tenure and no grocery or deli exposure. Held in the 60–69 second-look band — a manager can reopen this with one click if Pearlridge is short-staffed.",
    },
    {
        "id": "EDGE-DUP-A", "name": "Keila Moreno — Deli Clerk (Kakaako)",
        "role_applied": "Deli Clerk", "level": "level-2", "store_preference": "kakaako",
        "source": "indeed", "availability": "full-time, any shift",
        "plant_based_ack": "acknowledged", "smokes_or_vapes": "no",
        "body": "RESUME\nKeila Moreno · Honolulu, HI\nExperience: 2 years café barista + food prep, food-handler card, customer service award.\nAPPLICATION ANSWERS\nStore preference: Kakaako\nAvailability: full-time, any shift\nWhy Down to Earth: plant-based at home, want work to match.",
        "edge": None, "pin": 77,
        "note": "Café prep and customer-facing history line up with the deli role; availability is fully open. Routed to Kakaako.",
    },
    {
        "id": "EDGE-DUP-B", "name": "Keila Moreno — Deli Clerk (Kakaako)",
        "role_applied": "Deli Clerk", "level": "level-2", "store_preference": "kakaako",
        "source": "website", "availability": "full-time, any shift",
        "plant_based_ack": "acknowledged", "smokes_or_vapes": "no",
        "body": "Same applicant as EDGE-DUP-A, submitted again through the website Careers page two days later.",
        "edge": "duplicate", "duplicate_of": "EDGE-DUP-A", "pin": 77,
        "note": "Same name, same email, same role as the Indeed application two days earlier — merged rather than double-routed. The manager sees one candidate, not two.",
    },
]


def h(s: str) -> int:
    """Deterministic small hash (stable across runs, unlike hash())."""
    v = 0
    for c in s:
        v = (v * 31 + ord(c)) % 100003
    return v


def score(app: dict) -> int:
    if app["id"] in CURATED:
        return CURATED[app["id"]]
    if app.get("pin") is not None:
        return app["pin"]
    s = 52
    body = app.get("body", "").lower()
    for kw, pts, _ in KEYWORDS:
        if kw in body:
            s += pts
    avail = (app.get("availability") or "").lower()
    if "full-time" in avail or "any shift" in avail:
        s += 8
    elif "weekend" in avail or "evening" in avail:
        s += 4
    if app.get("plant_based_ack") == "acknowledged":
        s += 6
    if "reference" in body:
        s += 3
    s += (h(app["id"]) % 7) - 3
    return max(41, min(96, s))


def band(n: int) -> str:
    return "strong" if n >= 85 else "qualified" if n >= 70 else "near-miss" if n >= 60 else "held"


def rationale(app: dict, n: int) -> str:
    if app.get("note"):
        return app["note"]
    body = app.get("body", "").lower()
    hits = [label for kw, _, label in KEYWORDS if kw in body][:3]
    avail = app.get("availability") or "availability not stated"
    parts = []
    if hits:
        parts.append(f"Scored {n}/100 on {', '.join(hits)}")
    else:
        parts.append(f"Scored {n}/100 — no directly relevant food or retail history on the application")
    parts.append(f"availability: {avail}")
    if app.get("smokes_or_vapes", "").startswith("yes"):
        parts.append("smoking answer attaches a CEO-approval flag per policy — score unaffected")
    if n < 70:
        parts.append("held below threshold with this reasoning recorded; recoverable by any reviewer")
    elif n < 75:
        parts.append("low-70s: routed, marked as the manager's judgment call")
    return ". ".join(parts) + "."


def certs(app: dict) -> list:
    body = app.get("body", "").lower()
    out = []
    if "food-handler" in body:
        out.append("Food-handler card (current)")
    if "supervisor" in body or "manager" in body:
        out.append("Supervisory experience")
    return out


def experience(app: dict) -> str:
    for line in app.get("body", "").splitlines():
        if line.lower().startswith("experience:"):
            return line.split(":", 1)[1].strip()
    return "See application body"


def esc(v: str) -> str:
    return v.replace("'", "''")


apps = []
for fname in ("applicants-indeed.jsonl", "applicants-website.jsonl"):
    for line in (DATA / fname).read_text().splitlines():
        if line.strip():
            apps.append(json.loads(line))
apps.extend(EDGES)

print("BEGIN;")
print(f"""DELETE FROM business_object WHERE org_id='{ORG}'
  AND metadata->>'seeded_by'='seed-processed-applicants';""")

for a in apps:
    n = score(a)
    store = a.get("store_preference", "not-stated")
    mgr = MANAGERS.get(store)
    smokes = a.get("smokes_or_vapes", "")
    # Arrival: spread across a 30-day window, business hours, from the id.
    day = h(a["id"]) % 30
    hour = 7 + (h(a["id"] + "h") % 12)
    minute = h(a["id"] + "m") % 60
    arrival = f"now() - interval '{day} days {23 - hour} hours {59 - minute} minutes'"
    is_dup = a.get("edge") == "duplicate"
    routed = n >= 70 and not is_dup
    meta = {
        "seeded_by": "seed-processed-applicants",
        "external_id": a["id"],
        "name": a["name"].split(" — ")[0],
        "role": a.get("role_applied"),
        "level": a.get("level"),
        "store": store.title() if store != "not-stated" else "Not stated",
        "source": a.get("source"),
        "score": n,
        "band": band(n),
        "ceo_flag": smokes.startswith("yes"),
        "routed_to": f"{mgr} · {store.title()}" if (mgr and routed) else None,
        "availability": a.get("availability") or "not stated",
        "shift_preference": ("any" if "any shift" in (a.get("availability") or "")
                             else "evenings/weekends" if any(w in (a.get("availability") or "") for w in ("evening", "weekend"))
                             else "weekday"),
        "certifications": certs(a),
        "experience_summary": experience(a),
        "rationale": rationale(a, n),
        "edge_case": a.get("edge"),
        "duplicate_of": a.get("duplicate_of"),
        "application_body": a.get("body", "")[:1200],
    }
    status = "duplicate" if is_dup else ("routed" if n >= 70 else "held")
    title = f"{meta['name']} — {meta['role']}"
    print(
        "INSERT INTO business_object (org_id, project_id, type_id, title, status, metadata, created_by, created_at, updated_at) "
        f"SELECT '{ORG}', '{ORG}', t.id, '{esc(title)}', '{status}', "
        f"'{esc(json.dumps(meta))}'::jsonb, 'seed-script', {arrival}, now() "
        f"FROM business_object_type t WHERE t.org_id='{ORG}' AND t.slug='applicant';"
    )

print("COMMIT;")
print(f"-- seeded {len(apps)} applicants ({len(EDGES)} edge cases)", flush=True)
