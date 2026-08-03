# Operating workflow

On this workstation, launch **OpenCode (Tailored OMO)** from the Windows Start
menu. It opens OpenCode Desktop connected to the native Ubuntu WSL runtime on
`http://localhost:4096`; no terminal UI is required. The workspace-level
`FIRST-PROJECT-RUNBOOK.md` contains the one-time connection procedure.

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

For a real project, keep durable knowledge in a dedicated Obsidian vault and
export only reviewed, task-relevant pages into a project-local context folder.
Do not auto-load a whole vault. WikiLLM is optional and requires an explicit
choice between its hybrid-cloud service and a separately audited local tool;
it is not a Tailored OMO dependency. The workspace-level
`FIRST-PROJECT-RUNBOOK.md` defines the complete operating procedure.

This extra agent-selection step is intentional. Current OpenCode hard-codes
`plan_exit` to its built-in `build` agent. Tailored OMO does not override that
upstream transition or impersonate the built-in Build role.
