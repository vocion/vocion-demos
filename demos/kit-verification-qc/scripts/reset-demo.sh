#!/usr/bin/env bash
# Reset the the manufacturer demo data to a clean baseline and (optionally) replay the live checks.
#
#   ./scripts/reset-demo.sh            # wipe inspections, qc proposals, learning candidates; re-seed baseline
#   ./scripts/reset-demo.sh --live     # …then re-run the reference comparison on the 9 staged bad kits (~4 min, ~$0.50)
#
# Leaves alone: the workspace (agents, pages…), the synced photo documents, the seeded user, AWS.
set -euo pipefail
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"; DEMO="$(cd "$HERE/.." && pwd)"
UMBRELLA="$(cd "$DEMO/../../.." && pwd)"; CORE="$UMBRELLA/vocion-core/packages/core"
DB=vocion_kit_verification_qc; PSQL="docker exec -i vocion-postgres psql -U postgres -d $DB"
ORG=$($PSQL -tAc "select id from project where slug='kitqc' limit 1" | tr -d '[:space:]')
[ -n "$ORG" ] || { echo "no project 'kitqc' in $DB — run seed:demo first"; exit 1; }
BUCKET=$(grep -E '^KITQC_S3_BUCKET=' "$DEMO/.env.local" | cut -d= -f2)

echo "→ org $ORG — clearing inspections, qc action runs, learning candidates, kit tool calls"
$PSQL -q <<SQL
delete from action_run where org_id='$ORG' and action_id in ('qc.hold','qc.release','qc.request_rework','dataset.add_example');
delete from learning_candidate where org_id='$ORG';
delete from tool_call where org_id='$ORG' and tool in ('vision_compare_reference','vision_detect_labels');
delete from business_object b using business_object_type t where b.type_id=t.id and b.org_id='$ORG' and t.slug in ('inspection','kit-template');
SQL
echo "→ re-seeding the labelled-history baseline (72 inspections, 2 templates)"
python3 "$HERE/seed-inspections.py" --org "$ORG" --bucket "$BUCKET" | $PSQL -q
$PSQL -tAc "select status, count(*) from business_object where org_id='$ORG' and metadata ? 'image_key' group by 1"

if [ "${1:-}" = "--live" ]; then
  echo "→ live reference comparison on the staged bad kits"
  set -a; source "$UMBRELLA/.env"; source "$DEMO/.env.local"; set +a
  export WORKSPACE_PATH="$DEMO/workspace/kit-verification-qc" VOCION_REKOGNITION_PROJECT_ARN="${KITQC_REKOGNITION_PROJECT_ARN:-}"
  (cd "$CORE" && npm run kit:inspect -- --project kit-verification-qc --prefix templates/C-PM-134-PC/bad/ 2>&1 | grep -E "^[✓✗≠?] |agreement")
  (cd "$CORE" && npm run kit:inspect -- --project kit-verification-qc --prefix templates/C-VS-1012-INUT-2-H/bad/ 2>&1 | grep -E "^[✓✗≠?] |agreement")
fi
echo "done — reload http://localhost:3004/dashboard/p/command-center"
