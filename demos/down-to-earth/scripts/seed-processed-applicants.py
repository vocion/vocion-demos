#!/usr/bin/env python3
"""Seed *processed* applicant business objects for the DTE demo pages.

The live pipeline (score_candidate → route_candidate through /dashboard/review)
is the demo's money moment — but the workspace pages (command center, store
inbox) need a believable back-catalog behind it. This script derives a
deterministic score for every fixture applicant with the same *shape* of
reasoning the rubric prompt uses (experience, availability, policy
acknowledgement — job-related criteria only), pins the three curated
applicants at the proposal's ≈88/81/74, and inserts them as `applicant`
business objects with score/band/routing metadata.

Deterministic: same fixtures → same rows. Idempotent: wipes and re-inserts
only rows tagged seeded_by=this script. All names are invented fixtures.

Usage: python3 seed-processed-applicants.py | docker exec -i vocion-postgres \
         psql -U postgres -d vocion_dte
"""
import json
import pathlib
import sys

HERE = pathlib.Path(__file__).resolve().parent
DATA = HERE.parent / "workspace" / "down-to-earth" / "data"

ORG = "proj-3a44f54e-f3a1-4045-96cd-de80e5f3b99d"

MANAGERS = {
    "kahului": "P. Kealoha", "honolulu": "R. Santos", "kakaako": "M. Ikaika",
    "kailua": "L. Fonoti", "pearlridge": "D. Choy", "kapolei": "T. Agbayani",
}

# The proposal's own trace (p.4/p.5): these three land exactly here.
CURATED = {"APP-IN-041": 88, "APP-IN-042": 81, "APP-IN-043": 74}

KEYWORDS = [  # job-related signals only, mirroring the scoring-rubric playbook
    ("grocery", 10), ("deli", 8), ("produce", 6), ("retail", 6),
    ("register", 5), ("pos", 5), ("food-handler", 5), ("customer", 4),
    ("inventory", 5), ("stock", 3), ("supervisor", 4), ("kitchen", 4),
]


def score(app: dict) -> int:
    if app["id"] in CURATED:
        return CURATED[app["id"]]
    s = 52
    body = app.get("body", "").lower()
    for kw, pts in KEYWORDS:
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
    # deterministic per-applicant jitter so bands spread naturally
    s += (sum(ord(c) for c in app["id"]) % 7) - 3
    return max(41, min(96, s))


def band(n: int) -> str:
    return "strong" if n >= 85 else "qualified" if n >= 70 else "near-miss" if n >= 60 else "held"


def status(n: int) -> str:
    return "routed" if n >= 70 else "held"


def esc(v: str) -> str:
    return v.replace("'", "''")


apps = []
for fname in ("applicants-indeed.jsonl", "applicants-website.jsonl"):
    for line in (DATA / fname).read_text().splitlines():
        if line.strip():
            apps.append(json.loads(line))

print("BEGIN;")
print(f"""DELETE FROM business_object WHERE org_id='{ORG}'
  AND metadata->>'seeded_by'='seed-processed-applicants';""")

for a in apps:
    n = score(a)
    store = a.get("store_preference", "not-stated")
    mgr = MANAGERS.get(store)
    smokes = a.get("smokes_or_vapes", "")
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
        "routed_to": f"{mgr} · {store.title()}" if (mgr and n >= 70) else None,
        "availability": a.get("availability") or "not stated",
        "received_at": a.get("received_at"),
    }
    title = f"{meta['name']} — {meta['role']}"
    print(
        "INSERT INTO business_object (org_id, project_id, type_id, title, status, metadata, created_by, created_at, updated_at) "
        f"SELECT '{ORG}', '{ORG}', t.id, '{esc(title)}', '{status(n)}', "
        f"'{esc(json.dumps(meta))}'::jsonb, 'seed-script', "
        f"COALESCE('{a.get('received_at', '')}'::timestamptz AT TIME ZONE 'UTC', now()), now() "
        f"FROM business_object_type t WHERE t.org_id='{ORG}' AND t.slug='applicant';"
    )

print("COMMIT;")
print(f"-- seeded {len(apps)} applicants", file=sys.stderr)
