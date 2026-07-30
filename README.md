# Tailored OMO

Tailored OMO is a personally maintained, token-conscious fork of
[`oh-my-opencode-slim`](https://github.com/alvinunreal/oh-my-opencode-slim).
It keeps the upstream scheduler, model fallback, background jobs, session reuse,
terminal panes, Companion, and the five specialist roles needed by this setup:

- Orchestrator: plans, delegates, integrates, and verifies.
- Explorer: read-only local code search.
- Librarian: current web, Context7, and grep.app research.
- Fixer: bounded code changes; two Fixers may write concurrently only when their
  paths are explicitly disjoint.
- Observer: image and document inspection.
- Oracle: manual, high-cost architecture or review escalation.

The package intentionally excludes Designer, multi-model consensus, the browser
ideation flow, external-agent protocol wrappers, AST-grep, Deepwork, and
Clonedeps. Normal OpenCode Plan mode is the planning front-end. When the plan is
ready, switch the primary agent to Orchestrator and tell it to execute the saved
plan; OpenCode's built-in Plan exit otherwise targets its generic Build agent.

The optional local Companion animation is retained but disabled in the
production profile. Sidebar and terminal-pane status remain available without
it.

## Local development

```bash
bun install --frozen-lockfile
bun run check:ci
bun run typecheck
bun test
bun run verify:release
```

The production installation is pinned from this checkout in Ubuntu WSL2. Windows
Ollama is reached at `http://127.0.0.1:11434/v1` through WSL mirrored networking.
Cloud credentials remain in OpenCode's auth store and never belong in this repo.

See [configuration](docs/configuration.md), [operating workflow](docs/operating-workflow.md),
and [upstream maintenance](docs/upstream-maintenance.md).

## Provenance

The pruning baseline is upstream version 2.2.8 at commit
`1c0e1f4abe217b6965997201c37ff1de6720c13d`, tagged locally as
`upstream-baseline-2.2.8`. The MIT license is retained.
