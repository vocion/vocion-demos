#!/usr/bin/env bash
# Run the Havis demo against the pinned vocion-core submodule on
# PORT 3004. Assumes the umbrella's docker-compose Postgres is up; we use
# `dev:next` so the embedded pglite-server never starts and collides on 5432.
#
# Ports in the umbrella: 3000 vocion-core, 3001 support-reply, 3002 www,
# 3003 down-to-earth, 3004 here.
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DEMO_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
REPO_ROOT="$(cd "$DEMO_DIR/../.." && pwd)"
# This demo runs on the UMBRELLA core checkout (vocion-local/vocion-core, main)
# rather than the demos-pinned core: it needs the s3 connector, the vision tools
# and the qc.* actions that landed on core main in Sep 2026. Re-pin to a tagged
# core once one ships with them. Override with VOCION_CORE_DIR.
UMBRELLA_CORE="$(cd "$REPO_ROOT/.." 2>/dev/null && pwd)/vocion-core/packages/core"
if [ -n "${VOCION_CORE_DIR:-}" ]; then
  CORE_DIR="$VOCION_CORE_DIR"
elif [ -d "$UMBRELLA_CORE/src/libs/sources" ] && [ -f "$UMBRELLA_CORE/src/libs/sources/s3.ts" ]; then
  CORE_DIR="$UMBRELLA_CORE"
else
  CORE_DIR="$REPO_ROOT/vocion-core/packages/core"
fi

if [ ! -d "$CORE_DIR" ]; then
  echo "ERROR: vocion-core submodule not found at $CORE_DIR" >&2
  echo "Run: git submodule update --init --recursive" >&2
  exit 1
fi

if [ ! -f "$DEMO_DIR/.env.local" ]; then
  echo "ERROR: $DEMO_DIR/.env.local not found." >&2
  echo "Run: cp $DEMO_DIR/.env.example $DEMO_DIR/.env.local  (then fill in AUTH_SECRET)" >&2
  exit 1
fi

# Umbrella-root .env is the single source of truth for LLM provider keys
# (ANTHROPIC_API_KEY, OPENAI_API_KEY, …). Source into the shell BEFORE
# anything else so file-based env precedence in the nested vocion-core
# can't shadow them — Next.js won't override a shell var.
UMBRELLA_ROOT="$(cd "$REPO_ROOT/.." && pwd)"
if [ -f "$UMBRELLA_ROOT/.env" ]; then
  set -a
  # shellcheck source=/dev/null
  source "$UMBRELLA_ROOT/.env"
  set +a
fi

# Load demo env (PORT, AUTH_SECRET, DATABASE_URL, demo creds, etc.) into the
# shell. Demo-specific values only — never put LLM keys here; use the
# umbrella .env above so they live in one place.
set -a
# shellcheck source=/dev/null
source "$DEMO_DIR/.env.local"
set +a

export PORT="${PORT:-3004}"
# Pinned core is v2.x: the context system is now "workspaces" and reads
# WORKSPACE_PATH (fileImport resolves fixture paths relative to it too).
export WORKSPACE_PATH="$DEMO_DIR/workspace/havis"

echo "→ vocion-core:    $CORE_DIR"
echo "→ WORKSPACE_PATH: $WORKSPACE_PATH"
echo "→ PORT:         $PORT"
echo "→ DATABASE_URL: ${DATABASE_URL:-<unset>}"
echo ""
echo "Tip: this demo uses its own database (vocion_havis). If sign-in 500s,"
echo "     see the README — the DB may need creating + migrating first."
echo ""

cd "$CORE_DIR"
exec npm run dev:next
