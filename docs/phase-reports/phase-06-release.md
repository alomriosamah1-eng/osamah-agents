# Phase 06 — Release Ledger and Source-First Handoff

## Status

**Completed:** 2026-08-24

## Published checkpoints

| Phase | Scope | Published commit | Verification |
| --- | --- | --- | --- |
| 01 | Original-source audit, source maps, architecture, worklog, licensing records | `7a37edc43318eeab9f520f6fca325a3006506721` | Maps and documentation published to `origin/main`. |
| 02 | Pinned Async source vendored, OAuth credentials removed from unpublished history, original renderer typecheck/build | `bf2102517a3b7334d5643fb18c42a6c166c9be35` and map update `9ee18959da0e15db23194469f927686c5e631ac2` | Async typecheck and renderer build passed; sanitized push accepted by GitHub. |
| 03 | Pinned Presenton source and Starry Slides source vendored, original presentation tests/build | `b275679785636e915b12179305a50f581753f26b` | Presenton root tests, Next.js production build, and Starry Slides integrity tests passed. |
| 04 | OpenCode core vendored, Async IPC bridge, Osamah shell bootstrap, original-source default commands | `45240772e8786825ef5fb368928c17a598c380fd` and shell cleanup `5f38f559f65971a5391e003b653f3957749e152a` | OpenCode core typecheck, original server API probe, Async main/renderer builds, and combined validation passed. |
| 05 | No-fake-UI migration, source acceptance tests, browser smoke evidence | `f23cc8f23f8878dc9037491d807601163a41fc57` | Four source acceptance tests passed; Async and Presenton original routes were observed in browser. |
| 06 | Final maps, workflow policy, changelog, and this release ledger | Pending this checkpoint | Final clean-tree and remote verification are the release gate. |

## Final architecture

Osamah Agent is a shell around **Async IDE** for Development, **Presenton** for Presentations, and **Starry Slides/StarryKit** where its visual-authoring contract is compatible. **OpenCode** is the central Agent Core. The product-owned code is limited to the shell, branding, routing, source maps, shared adapters, and context boundaries. The prior root-level mock UI and duplicate engines have been removed.

## Known boundaries

The current source-backed implementation intentionally distinguishes source integration from full production orchestration. Async’s original Electron runtime is required for native PTY, filesystem, Git, and IPC behavior. Presenton’s original Next.js/FastAPI/Electron services must be supervised by the desktop lifecycle for generation, editing, and export. The OpenCode bridge starts the real headless server and sends real prompts, while complete translation of OpenCode event envelopes into Async’s streaming/tool/approval contracts remains the next engineering increment.

No OAuth credential was retained from the Async source. Provider secrets must be supplied through runtime environment configuration or a secure settings boundary. The source maps and licensing records identify the Apache-2.0 and MIT obligations for each vendored project.

## Release gate

The repository is ready for the next integration increment when `pnpm typecheck`, `pnpm test`, `pnpm build`, `pnpm presenton:build`, `pnpm async:main`, and `pnpm async:renderer` pass from a clean checkout, and the desktop lifecycle starts both original workspaces without replacing their UI or engine.
