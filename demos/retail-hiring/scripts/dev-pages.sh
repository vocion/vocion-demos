#!/usr/bin/env bash
# Run the Retail Hiring demo against the TOP-LEVEL vocion-core checkout (branch
# feat/workspace-pages, PR #58) — required for the four workspace pages
# (/dashboard/p/*). The pinned submodule core (v2.0.1) predates the pages
# mechanism; plain dev.sh will serve the demo WITHOUT them.
#
# The vocion_retail_hiring database has been migrated forward to main's schema; the
# pinned core still runs against it (migrations are additive), but prefer
# this script until the PR merges and the pin is bumped.
set -euo pipefail
CORE=/private/var/www/vocion-local/vocion-core/packages/core
UMBRELLA=/private/var/www/vocion-local
DEMO="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

cd "$CORE"
set -a; . "$UMBRELLA/.env"; set +a                      # LLM keys
set -a; . "$DEMO/.env.local"; set +a                    # AUTH_SECRET etc.
export DATABASE_URL=postgresql://postgres:postgres@127.0.0.1:5432/vocion_retail_hiring
export WORKSPACE_PATH="$DEMO/workspace/retail-hiring"
exec npx next dev -p 3003
