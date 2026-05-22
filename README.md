# vocion-demos

A collection of demo applications built on **[vocion-core](https://github.com/vocion/vocion-core)**.

Each demo lives under `demos/<slug>/` and consumes a **pinned version** of vocion-core (vendored here as a git submodule at `vocion-core/`). This keeps demos reproducible — future core changes won't silently break shipped demos until the pin is bumped.

## Layout

```
vocion-demos/
├── vocion-core/         # git submodule — pinned to a specific vocion-core tag
├── demos/
│   └── support-reply/   # one directory per demo (context + scripts)
└── scripts/
    ├── upgrade-core.sh  # bump the submodule to a new tag
    └── new-demo.sh      # scaffold a new demos/<slug>/ dir
```

## Quickstart — run a demo

```bash
git clone --recurse-submodules git@github.com:vocion/vocion-demos.git
cd vocion-demos/vocion-core && npm install     # install core deps once
cd ../demos/support-reply
cp .env.example .env.local                     # fill in Clerk + LLM keys
./scripts/dev.sh                               # → http://localhost:3001
```

If you forgot `--recurse-submodules`:

```bash
git submodule update --init --recursive
```

## Current pin

vocion-core is pinned at **`vocion-v0.1.0`**. See `vocion-core/` for the actual commit.

## Demos

| Slug | Title | Level | Status |
|------|-------|-------|--------|
| `support-reply` | Support reply drafting from tickets | L1 (Drafting) | Stub |

## Upgrading the core pin

```bash
./scripts/upgrade-core.sh vocion-v0.2.0
# (verifies the tag exists upstream, checks out the submodule, commits)
```
