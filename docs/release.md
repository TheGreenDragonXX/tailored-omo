# Release process

Tailored OMO is currently installed from this maintained checkout. It is not
published as an npm package, so a normal update is a reviewed commit on
`tailored-main`, followed by a local rebuild.

## Plugin update

1. Review the exact diff and update user-facing documentation.
2. Run the complete gate:

   ```bash
   bun install --frozen-lockfile
   bun run check:ci
   bun run typecheck
   bun test
   bun run verify:release
   bun run verify:host-smoke
   ```

3. Commit and push only the intended files.
4. Pull the commit in the installed WSL2 checkout, rebuild, and run
   `tailored-omo doctor`.

Do not create an npm version or GitHub release unless distribution outside the
maintained checkout is deliberately introduced later.

## Companion update

The optional Rust Companion has independent versioning. Update it only when
`companion/` or the state protocol changes:

1. Run `cargo test --locked` in `companion/`.
2. Trigger `.github/workflows/companion-release.yml` manually for the required
   targets.
3. Verify the release assets and SHA-256 digests.
4. Update `src/companion/companion-manifest.json` and the matching runtime
   fallback in `src/companion/updater.ts`.
5. Rerun the plugin gate above.

Companion remains disabled in the production profile unless explicitly enabled.
