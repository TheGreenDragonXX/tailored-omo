# Installation

Tailored OMO is installed once in the Ubuntu WSL2 user's normal OpenCode config,
then inherited by every project opened in that distribution.

Prerequisites: Bun, OpenCode, Git, and access to Windows Ollama at
`http://127.0.0.1:11434/v1`.

From this checkout:

```bash
bun install --frozen-lockfile
bun run build
bun ./dist/cli/index.js install --preset=opencode-go --companion=yes --background-subagents=yes
```

Pin the plugin entry in `~/.config/opencode/opencode.json` to this checkout or a
specific release, then place the production presets in
`~/.config/opencode/tailored-omo.json`. Authenticate cloud providers with
`opencode auth login`; do not copy API keys into either config file.

Validate with:

```bash
bun ./dist/cli/index.js doctor
opencode models opencode-go
opencode stats
```
