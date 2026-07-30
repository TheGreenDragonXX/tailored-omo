# Tailored OMO contributor guidance

Tailored OMO is a lean, maintained fork of OMO Slim for OpenCode. Preserve the
upstream Orchestrator's scheduling and integration behavior; do not add a
separate merge agent or an alternate orchestration layer.

## Retained system

- Orchestrator: primary execution and integration agent.
- Explorer: read-only repository search.
- Librarian: external research through web search, Context7, and grep.app.
- Fixer: bounded implementation work.
- Observer: read-only visual analysis.
- Oracle: manual-only architecture/review advice.
- Native background jobs, continuation, fallback, session reuse, sidebar,
  multiplexer panes, and the optional Companion.

Keep removed features absent. Before restoring upstream code, compare it with
`docs/tailored-removal-manifest.md` and justify why it is required.

## Working rules

- Prefer the smallest change that preserves native OMO behavior.
- Never dispatch two writing Fixers concurrently unless the Orchestrator has
  assigned exact, provably disjoint paths. Serialize ambiguous or overlapping
  edits. Read-only agents may run concurrently.
- The Orchestrator integrates child work; specialists do not merge branches.
- Keep prompts and automatically injected context short and stable.
- Do not put timestamps, random IDs, or other volatile data before cached
  prompt content.
- Update user documentation when behavior or configuration changes.

## Commands

```text
bun run check:ci
bun run typecheck
bun test
bun run verify:release
bun run verify:host-smoke
```

Run all five before release. Use `bun test -t "name"` for a focused test while
developing.

## Layout

- `src/agents/`: retained agent definitions and Orchestrator prompt.
- `src/config/`: schema, defaults, presets, and MCP permissions.
- `src/hooks/`: OpenCode lifecycle, fallback, continuation, and cache-safe
  prompt injection.
- `src/mcp/`: retained research integrations.
- `src/multiplexer/`: terminal-pane support.
- `src/tools/`: normal search, patch, and workflow tools.
- `companion/`: optional local status overlay.
- `config/tailored-omo.production.json`: maintained production profile.

## OpenCode Plan mode

Native Plan mode exits to OpenCode's generic Build agent. For Tailored OMO,
decline that handoff, manually select Orchestrator in the same session, and ask
it to execute the saved plan. Do not override this in plugin code.

## Upstream maintenance

Follow `docs/upstream-maintenance.md`. Review upstream changes in small batches,
retain the removal boundary, and rerun the full verification suite.
