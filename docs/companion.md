# Desktop Companion

Companion is an optional native status overlay. It displays active agents but
does not orchestrate work or call an LLM. The maintained production profile
keeps it disabled because terminal panes already provide status and control.

Enable it only when wanted:

```jsonc
{
  "companion": {
    "enabled": true,
    "position": "bottom-right",
    "size": "medium",
    "gifPack": "default",
    "loopStyle": "classic",
    "speed": 1,
    "debug": false
  }
}
```

The interactive installer defaults to not installing Companion. Use
`--companion=yes` to download and enable it or `--companion=no` to omit it.

## Binary and updates

The default binary path is:

```text
$XDG_DATA_HOME/opencode/storage/tailored-omo/bin/tailored-omo-companion
```

When `XDG_DATA_HOME` is unset, it resolves below
`~/.local/share/opencode/storage/tailored-omo/`. Set `binaryPath` to use a
manually managed binary; automatic updates never replace custom paths.

The packaged manifest currently identifies Companion `0.1.3` and contains the
release asset checksums. Automatic downloads accept only assets named in that
manifest. The release workflow is manual-only and should run only when the Rust
code or protocol changes; see [release process](release.md).

## Platform note

Wayland compositors may not support mouse click-through for this ordinary
floating window. Disable Companion if it blocks interaction. Window position is
remembered per project and clamped to the visible screen.

Run `tailored-omo doctor` when diagnosing installation or launch problems.
