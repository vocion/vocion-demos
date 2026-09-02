#!/usr/bin/env bash
# Bump the vocion-core submodule to a new tag.
# Usage: ./scripts/upgrade-core.sh <tag>          e.g. v2.36.0
set -euo pipefail

if [ $# -ne 1 ]; then
  echo "Usage: $0 <vocion-core-tag>" >&2
  echo "Example: $0 v2.36.0" >&2
  exit 1
fi

TAG="$1"
REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$REPO_ROOT/vocion-core"

# --force: the 2026-08 history rewrite re-pointed existing tags, so a plain
# --tags fetch aborts on "would clobber existing tag" and takes the script
# down with it before the checkout below ever runs.
git fetch --tags --force origin
if ! git rev-parse "$TAG" >/dev/null 2>&1; then
  echo "ERROR: tag $TAG does not exist in vocion-core remote." >&2
  echo "Available tags:" >&2
  git tag --sort=-creatordate | head -10 >&2
  exit 1
fi

OLD_REF=$(git describe --tags --exact-match HEAD 2>/dev/null || git rev-parse --short HEAD)
git checkout "$TAG"

cd "$REPO_ROOT"
git add vocion-core
git status --short

echo ""
echo "vocion-core: $OLD_REF → $TAG"
echo "Review and commit:"
echo "  git commit -m \"chore: bump vocion-core to $TAG\""
