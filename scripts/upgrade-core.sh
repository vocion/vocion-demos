#!/usr/bin/env bash
# Bump the vocion-core submodule to a new tag.
# Usage: ./scripts/upgrade-core.sh <tag>          e.g. vocion-v0.2.0
set -euo pipefail

if [ $# -ne 1 ]; then
  echo "Usage: $0 <vocion-core-tag>" >&2
  echo "Example: $0 vocion-v0.2.0" >&2
  exit 1
fi

TAG="$1"
REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$REPO_ROOT/vocion-core"

git fetch --tags origin
if ! git rev-parse "$TAG" >/dev/null 2>&1; then
  echo "ERROR: tag $TAG does not exist in vocion-core remote." >&2
  echo "Available tags:" >&2
  git tag --list "vocion-*" --sort=-v:refname | head -10 >&2
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
