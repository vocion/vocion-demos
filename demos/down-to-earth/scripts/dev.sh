#!/usr/bin/env bash
# Run the Down to Earth demo against the pinned vocion-core submodule on
# PORT 3003. Assumes the umbrella's docker-compose Postgres is up; we use
# `dev:next` so the embedded pglite-server never starts and collides on 5432.
#
# Ports in the umbrella: 3000 vocion-core, 3001 support-reply, 3002 www,
# 3003 here.
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DEMO_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
REPO_ROOT="$(cd "$DEMO_DIR/../.." && pwd)"
CORE_DIR="$REPO_ROOT/vocion-core/packages/core"

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

export PORT="${PORT:-3003}"
# Pinned core is v2.x: the context system is now "workspaces" and reads
# WORKSPACE_PATH (fileImport resolves fixture paths relative to it too).
export WORKSPACE_PATH="$DEMO_DIR/workspace/down-to-earth"

echo "→ vocion-core:    $CORE_DIR"
echo "→ WORKSPACE_PATH: $WORKSPACE_PATH"
echo "→ PORT:         $PORT"
echo "→ DATABASE_URL: ${DATABASE_URL:-<unset>}"
echo ""
echo "Tip: this demo uses its own database (vocion_dte). If sign-in 500s,"
echo "     see the README — the DB may need creating + migrating first."
echo ""

cd "$CORE_DIR"
exec npm run dev:next
