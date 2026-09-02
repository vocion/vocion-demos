# Havis — blank demo project

**Prospect demo · status: BLANK (intake pending) · Manufacturing / visual QC (candidate)**

[Havis Inc.](https://www.havis.com/) — Warminster, PA. Rugged in-vehicle consoles,
mounting solutions, tablet and laptop docking, and transport solutions for public
safety, energy & utilities, warehouse & logistics, field operations, transportation,
healthcare, and military/defense/aerospace.

This directory is the scaffold for a Havis demo on the pinned vocion-core. **Nothing
is authored yet** — no agents, skills, playbooks, objects, sources, fixtures, or
walkthrough. It exists so intake material has a home and so the environment (port,
database, env, dev script) is allocated before the content work starts.

| | |
|---|---|
| Port | `3004` |
| Database | `vocion_havis` (own DB on the umbrella docker-compose Postgres) |
| Demo login | `havis@example.com / demo123` (once seeded) |
| Workspace | `workspace/havis/` (`WORKSPACE_PATH`, exported by `scripts/dev.sh`) |

## What's here

```
demos/havis/
├── README.md                    # this file
├── WALKTHROUGH.md               # stub — written after intake
├── .env.example                 # copy to .env.local; PORT 3004, vocion_havis
├── scripts/dev.sh               # → http://localhost:3004 on the pinned core
├── workspace/havis/
│   ├── workspace.yaml           # tenant manifest (the only authored file)
│   └── agents/ playbooks/ workflows/ objects/ sources/
│       learnings/ evals/ data/ pages/        # empty, .gitkeep'd
├── docs/
│   └── BRIEF-visual-qc-demo.md  # solution brief: visual QC of package assembly
│                                #   layouts on Vocion + AWS — FOR REVIEW
├── research/
│   └── aws-computer-vision-automl.md   # AWS AutoML / CV options (Rekognition
│                                       #   Custom Labels, SageMaker Canvas, AutoGluon)
└── assets/                      # reel + images, later
```

## What the proposal says

Not yet — there is no proposal. Fill this in per Phase 1 of
`../../docs/CLIENT-DEMO-PLAYBOOK.md` before authoring anything.

| Field | What the proposal says |
|---|---|
| Agent roster | — |
| Per-agent skills | — |
| The decision rule | — |
| Guardrails / non-negotiables | — |
| Named entities | — |
| Untouched systems | — |
| Volume | — |
| Worked example | — |
| Any shown output | — |
| Learning story | — |
| Roadmap | — |
| Commercials | — |

What we do know (discovery, 2026-09-02): Havis has **images organized by template
id, with Good and Bad labelled examples for each template**, and wants to detect
**wrong or missing parts in a package assembly layout**. See `docs/BRIEF-visual-qc-demo.md`.

## Bring the environment up

```bash
# 1. Postgres (shared container, one DB per demo). On an existing volume:
docker exec vocion-postgres psql -U postgres -d postgres -c 'CREATE DATABASE vocion_havis'
docker exec vocion-postgres psql -U postgres -d vocion_havis -c 'CREATE EXTENSION IF NOT EXISTS vector'

# 2. Env, migrate, seed
cp .env.example .env.local            # AUTH_SECRET from vocion-local/.bootstrap-secret
cd ../../vocion-core/packages/core
export DATABASE_URL=postgresql://postgres:postgres@127.0.0.1:5432/vocion_havis
npm run db:migrate
npm run seed:demo -- --email havis@example.com --password demo123 --name "Havis Demo" \
  --account-name "Havis" --project-slug havis --project-name "Havis Inc."

# 3. Workspace (currently just the manifest)
export WORKSPACE_PATH=$(cd ../../demos/havis/workspace/havis && pwd)
npm run workspace:check && npm run workspace:apply

# 4. Run
cd ../../demos/havis && ./scripts/dev.sh     # → http://localhost:3004
```
