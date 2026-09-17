# AGENTS.md

## Repo state

- Empty starter repository: no source files, no manifests, no CI, no commits yet.
- Default branch is `master` (not `main`).
- Remote: `https://github.com/Subsystem2418/21Sep---Pri.git`.

## OpenCode config (`.opencode/`)

- `.opencode/` is OpenCode's own config directory, not application code.
- `.opencode/agents/` is where OpenCode agent definitions go (currently empty). There is no `agents/` at the repo root.
- `.opencode/package.json` depends on `@opencode-ai/plugin@1.18.31`.
- `.opencode/.gitignore` ignores `node_modules`, `package.json`, `package-lock.json`, `bun.lock`, and `.gitignore` itself — so these manifests are intentionally not committed.

## Guidance

- No build, test, or lint commands exist yet; do not assume a toolchain.
