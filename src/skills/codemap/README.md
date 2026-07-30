# Codemap skill

Manual, compact repository mapping for unfamiliar codebases.

The helper stores hashes in `.slim/codemap.json` so later runs can update only
changed folders. It should be invoked explicitly and its generated maps should
be loaded selectively; normal bounded work should use search instead.

```bash
node codemap.mjs init --root /repo --include "src/**/*.ts" --exclude "**/*.test.ts"
node codemap.mjs changes --root /repo
node codemap.mjs update --root /repo
```
