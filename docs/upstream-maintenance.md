# Upstream maintenance

`upstream` tracks `alvinunreal/oh-my-opencode-slim`; `origin` tracks the
maintained Tailored OMO fork. The untouched baseline is tagged
`upstream-baseline-2.2.8`.

For each upstream update:

1. Fetch upstream and review the diff before merging.
2. Merge on a maintenance branch.
3. Reapply the removal manifest if upstream reintroduces excluded feature
   registrations or assets.
4. Run formatting checks, type checking, the full test suite, release artifact
   verification, host smoke tests, and one live OpenCode role-routing smoke test.
5. Merge only after the generated schema and packed artifact contain no removed
   feature entry points.

The fork does not auto-update. Upstream changes are always reviewed manually.
