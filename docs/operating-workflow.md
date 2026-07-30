# Operating workflow

1. Select the intended cloud model and enter OpenCode's native Plan agent.
2. Discuss the project and save the final plan.
3. When Plan offers to switch to the generic Build agent, decline; manually
   select the Tailored OMO Orchestrator in the same session instead.
4. Tell Orchestrator to execute the saved plan. It delegates discovery, research, bounded fixes, and
   visual inspection, then integrates the results itself.
5. Run `opencode stats` periodically to find expensive models or sessions.

Parallel read-only work is safe. Parallel writing is limited to two Fixers and
only when the Orchestrator assigns explicitly disjoint paths. Sessions are reused
through the upstream session manager without an extra reuse policy.

For the first real project, create a dedicated Obsidian/WikiLLM vault and only
retrieve small relevant pages into model context. The vault can be large on disk;
the retrieved context must stay bounded, especially for local models.

This extra agent-selection step is intentional. Current OpenCode hard-codes
`plan_exit` to its built-in `build` agent. Tailored OMO does not override that
upstream transition or impersonate the built-in Build role.
