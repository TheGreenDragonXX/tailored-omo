# Tailored OMO context

Tailored OMO is a token-conscious OpenCode orchestration plugin derived from
OMO Slim. It coordinates cloud and local models while keeping OMO's native
Orchestrator responsible for delegation, reconciliation, and final integration.

## Runtime flow

1. Use OpenCode's native Plan agent for discussion when a task needs planning.
2. Decline Plan's generic Build-agent handoff.
3. Select Tailored OMO's Orchestrator in the same session.
4. Orchestrator delegates bounded work and integrates the result.

## Agent roles

- **Orchestrator**: plans execution, assigns work, resolves conflicts, merges
  child results, and verifies the final state.
- **Explorer**: searches and explains the repository without editing.
- **Librarian**: researches current external information using web search,
  Context7, and grep.app.
- **Fixer**: edits only the assigned paths and runs relevant checks.
- **Observer**: interprets screenshots and other visual evidence without editing.
- **Oracle**: manual-only high-capability advice for difficult architecture or
  review questions.

At most two Fixers may write concurrently, and only when their assigned paths
are exact and provably disjoint. Otherwise writes are sequential. Read-only
roles may run in parallel.

## Configuration and cost control

`config/tailored-omo.production.json` is the maintained non-secret profile.
OpenCode's auth store holds credentials. `opencode stats` is the token/cost
monitor; do not add custom LLM-based telemetry. Reuse native sessions and keep
retrieved research/context narrowly relevant.

The optional Companion is only a local visual status overlay. It does not
perform orchestration or consume LLM tokens. Terminal sidebar and multiplexer
panes work independently of it.

See `README.md`, `docs/operating-workflow.md`, and
`docs/tailored-removal-manifest.md` for the maintained behavior boundary.
