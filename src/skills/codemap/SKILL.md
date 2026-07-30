---
name: codemap
description: Create or refresh a compact map of an unfamiliar repository. Run only when the user explicitly requests repository mapping or durable codebase documentation.
---

# Codemap

This is a manual, potentially token-heavy workflow. Do not run it automatically
for ordinary tasks. Prefer normal search for a bounded question.

## Scope

Map core source and configuration only. Exclude tests, documentation,
translations, dependencies, generated output, and ignored files unless the user
specifically needs them. Keep every summary short enough for small-context local
models and retrieve only the map relevant to the current task.

## Initialize

If `.slim/codemap.json` does not exist, inspect the repository and choose narrow
include patterns. Then run:

```bash
node ~/.config/opencode/skills/codemap/scripts/codemap.mjs init \
  --root ./ \
  --include "src/**/*.ts" \
  --exclude "**/*.test.ts" --exclude "dist/**" --exclude "node_modules/**"
```

The command creates hash state and `codemap.md` templates for relevant folders.
Fill only the folders needed to explain the project. Each map should state:

- responsibility;
- important entry points;
- data/control flow;
- dependencies and consumers.

The root `codemap.md` is a compact index to the useful folder maps, not a copy
of them. Do not inject its contents into every session or add an automatic
`AGENTS.md` loading rule unless the user explicitly requests that tradeoff.

## Refresh

When state already exists, detect changes first:

```bash
node ~/.config/opencode/skills/codemap/scripts/codemap.mjs changes --root ./
```

Update only affected maps, then persist the new hashes:

```bash
node ~/.config/opencode/skills/codemap/scripts/codemap.mjs update --root ./
```

If legacy `.slim/cartography.json` exists, rename it to
`.slim/codemap.json` before running change detection.
