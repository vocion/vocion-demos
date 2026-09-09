#!/usr/bin/env python3
"""Seed kit-template + inspection business objects from data/images/index.jsonl.

Backfills the manufacturer's own labelled sample pack as the SHADOW-MODE BASELINE:
verdict follows the label the manufacturer supplied (good → pass, bad → hold), source is
`labelled_history`, confidence is null — these are NOT model verdicts. Live
runs of vision_compare_reference upsert the same rows (keyed on image_key) and
flip `source` to `model`. Idempotent: existing rows (by image_key) are skipped.

Usage: python3 scripts/seed-inspections.py --org <project-id> --bucket <bucket> | psql ...
"""
import argparse, json, os, sys, datetime
ap = argparse.ArgumentParser(); ap.add_argument('--org', required=True); ap.add_argument('--bucket', required=True); ap.add_argument('--user', default='seed:sample-pack')
a = ap.parse_args()
here = os.path.dirname(os.path.abspath(__file__)); idx = os.path.join(here, '..', 'data', 'images', 'index.jsonl')
rows = [json.loads(l) for l in open(idx)]
def q(v): return "'" + str(v).replace("'", "''") + "'"
def j(v): return q(json.dumps(v))
TEMPLATES = {
  'C-PM-134-PC': {'item_number': '39586', 'regions': [
      {'part': '15980 (GSM21109)', 'desc': 'console housing'}, {'part': '37860 (10-013095)', 'desc': 'bracket (mirrored pair)'}, {'part': '37859 (10-013094)', 'desc': 'bracket (mirrored pair)'},
      {'part': '23447 (10-010818)', 'desc': 'rail'}, {'part': '41573 (10-014475)', 'desc': 'base plate'}, {'part': '17506 (HW-EL-0044)', 'desc': 'cable, bagged'}, {'part': '37554', 'desc': 'harness'},
      {'part': '13780 (HS93535-30)', 'qty': 2, 'desc': 'extrusions'}, {'part': '13405 (CM86508)', 'qty': 4, 'desc': 'screws, boxed'}, {'part': '17805 (HW-MS-2799)', 'qty': 2, 'desc': 'screws, boxed'}, {'part': '16425 (GSM33178)', 'qty': 8, 'desc': 'screws, boxed'}, {'part': 'HK Production Order Label', 'desc': 'label'}],
      'known_defects': ['one screw short in 17805 (HW-MS-2799) QTY=2 (staged, secondary station)']},
  'C-VS-1012-INUT-2-H': {'item_number': None, 'regions': [
      {'part': '23047 (10-010574)', 'qty': 2, 'desc': 'speaker grilles, logo face-up'}, {'part': '24134 (C-HK-361)', 'desc': 'hardware kit bag + instructions'}, {'part': '43871 (E100448)', 'desc': 'mounting kit, bagged'},
      {'part': '25520 (30-011897)', 'desc': 'fastener bag'}, {'part': '13852 (CMC-E2)', 'desc': 'wiring harness'}, {'part': 'HK Production Order Label', 'desc': 'label'}],
      'known_defects': ['grilles placed face-down, logo hidden (staged, secondary station)']},
}
out = [f"-- seed generated {datetime.datetime.now(datetime.UTC).isoformat()}", "BEGIN;"]
for tid, t in TEMPLATES.items():
    good = sum(1 for r in rows if r['template_id']==tid and r['label']=='good'); bad = sum(1 for r in rows if r['template_id']==tid and r['label']=='bad')
    meta = {'kit_id': tid, 'item_number': t['item_number'], 'regions': t['regions'], 'region_count': len(t['regions']), 'good_examples': good, 'bad_examples': bad, 'known_defects': t['known_defects'], 'reference_prefix': f"templates/{tid}/good/", 'bucket': a.bucket, 'fixture': False, 'source': 'sample-pack-2026-08-31'}
    out.append(f"""INSERT INTO business_object (org_id, type_id, title, status, metadata, created_by)
SELECT {q(a.org)}, t.id, {q(tid + ' Hardware Kit')}, 'enrolled', {j(meta)}::jsonb, {q(a.user)} FROM business_object_type t
WHERE t.org_id={q(a.org)} AND t.slug='kit-template' AND NOT EXISTS (SELECT 1 FROM business_object b WHERE b.org_id={q(a.org)} AND b.type_id=t.id AND b.metadata->>'kit_id'={q(tid)});""")
for r in rows:
    key = f"templates/{r['template_id']}/{r['label']}/{r['file'].split('/')[-1]}"
    po = r.get('production_order') or r.get('camera_id')
    # No verdict before a model has looked: status pending, the manufacturer's label kept aside as known_label (cheat sheet / eval only).
    status = 'pending'
    meta = {'template_id': r['template_id'], 'production_order': po, 'captured_at': r['captured_at'], 'station_view': r['view'], 'image_key': key, 'bucket': a.bucket,
            'image_url': f"/api/v1/s3/object?bucket={a.bucket}&key={key.replace('/', '%2F')}", 'known_label': r['label'], 'verdict': None, 'confidence': None, 'findings': [],
            'explanation': None,
            'source': 'labelled_history', 'checks': {}, 'fixture': False}
    title = f"{r['template_id']} · {po}"
    out.append(f"""INSERT INTO business_object (org_id, type_id, title, status, metadata, created_by)
SELECT {q(a.org)}, t.id, {q(title)}, {q(status)}, {j(meta)}::jsonb, {q(a.user)} FROM business_object_type t
WHERE t.org_id={q(a.org)} AND t.slug='inspection' AND NOT EXISTS (SELECT 1 FROM business_object b WHERE b.org_id={q(a.org)} AND b.metadata->>'image_key'={q(key)});""")
out.append("COMMIT;"); print("\n".join(out))
print(f"-- {len(TEMPLATES)} templates, {len(rows)} inspections", file=sys.stderr)
