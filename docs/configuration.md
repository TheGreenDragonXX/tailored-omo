# Tailored OMO configuration

The user-level plugin file is `~/.config/opencode/tailored-omo.json`. Project
files under `.opencode/` are only for genuine overrides.

The production setup uses these presets:

| Preset | Orchestrator | Fixer | Purpose |
|---|---|---|---|
| `balanced` | `opencode-go/minimax-m3` | Qwen 27B IQ4_XS | Default balance |
| `parallel-small` | `opencode-go/minimax-m3` | GPT-OSS 20B 2x32k | Two fast local workers |
| `fast-local` | `opencode-go/minimax-m3` | Qwen 35B | Faster single local worker |
| `quality-local` | `opencode-go/minimax-m3` | Qwen 27B IQ4_XS | Higher coding quality |
| `hq-manual` | `opencode-go/minimax-m3` | Qwen 27B Q4_K_XL | Manual high-quality lane |

Specialists stay constant across presets: Explorer and Librarian use
`opencode-go/deepseek-v4-flash`; Observer uses `opencode-go/mimo-v2.5`; Oracle
uses `opencode-go/qwen3.7-max` and is invoked manually.

Important non-model settings:

- `autoUpdate: false` pins this fork.
- `disabled_agents: []` enables Observer.
- `image_routing: "auto"` routes visual files to Observer.
- `compactSidebar: false` shows the expanded status display.
- `backgroundJobs.continueOnIdle: true` enables the upstream continuation path.
- `fallback.enabled: true`, `retry_on_empty: true`, `maxRetries: 2`, and
  `timeoutMs: 180000` bound retries before moving through each model chain.
- `companion.enabled: false` keeps the optional animation off; change it to
  `true` only when wanted. `multiplexer.type: "auto"` retains terminal panes.

Librarian alone receives `websearch`, `context7`, and `gh_grep`. This allows it
to combine current web results, version-specific library documentation, and
real public-code examples while returning only a compressed answer to the
Orchestrator.
