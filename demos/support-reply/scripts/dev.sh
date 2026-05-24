#!/usr/bin/env bash
# Run the support-reply demo against the pinned vocion-core submodule on
# PORT 3001. Assumes the umbrella's docker-compose Postgres is up (the
# embedded pglite-server's `npm run dev` would otherwise collide on 5432);
# we use `dev:next` to skip that and let the umbrella DB serve both cores.
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
  echo "Run: cp $DEMO_DIR/.env.example $DEMO_DIR/.env.local  (then fill in keys)" >&2
  exit 1
fi

# Load demo env (PORT, AUTH_SECRET, LLM keys, etc.) into the shell so the
# pinned vocion-core picks them up.
set -a
# shellcheck source=/dev/null
source "$DEMO_DIR/.env.local"
set +a

export PORT="${PORT:-3001}"
export CONTEXT_PATH="$DEMO_DIR/context/support-demo"

echo "→ vocion-core: $CORE_DIR"
echo "→ CONTEXT_PATH:  $CONTEXT_PATH"
echo "→ PORT:          $PORT"
echo "→ DATABASE_URL:  ${DATABASE_URL:-<unset>}"
echo ""
echo "Tip: the umbrella's docker-compose Postgres should already be up."
echo "     If sign-in 500s, run \`docker compose up -d\` from vocion-local first."
echo ""

cd "$CORE_DIR"
# `dev:next` runs Next.js dev without the embedded pglite-server — Postgres
# lives in the umbrella docker-compose (vocion_demo database). Switching
# from `dev` to `dev:next` lets the demo run side-by-side with the umbrella
# dashboard on :3000 without colliding on host 5432.
exec npm run dev:next
