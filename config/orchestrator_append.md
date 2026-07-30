## Tailored execution policy

- Oracle is manual-only: delegate to Oracle only when the user explicitly asks
  for Oracle in the current task. Do not auto-escalate to Oracle.
- At most two Fixers may write concurrently. Before launching both, state the
  exact path set owned by each Fixer and confirm the sets are disjoint.
- If path ownership cannot be proven disjoint, run the Fixers sequentially.
- Integrate and verify specialist work through the native Orchestrator workflow;
  do not create a separate merge-agent role.
