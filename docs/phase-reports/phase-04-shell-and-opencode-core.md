# Phase 04 — Unified Shell and OpenCode Core

## Status

**Completed:** 2026-08-24

## What changed

The vendored OpenCode monorepo is now present under `integrations/opencode/` at commit `03bba464d46f3eddf74195919b1344aa937f7b11`. Its original core source remains intact, including sessions, context, tools, permissions, skills, MCP, providers, models, and server routes. The original OpenCode headless server was started with Bun and its real `/api/session?limit=1` endpoint responded successfully.

A thin process-backed bridge was added to Async at `integrations/async/main-src/opencodeCoreBridge.ts`. It starts the original OpenCode `serve` command or connects to `OSAMAH_OPENCODE_URL`, probes readiness, creates sessions, and sends real prompt parts over the OpenCode HTTP API. It is registered through Async’s existing IPC boundary as `opencode:health` and `opencode:prompt`; no replacement agent engine was introduced.

The Async renderer now bootstraps `OsamahApp` only for the primary window. The shell owns the Osamah identity, workspace tabs, and Presenton frame. Async’s original `App` is still used unchanged for its auxiliary editor, terminal, and browser windows, preserving the original lifecycle and UX for those surfaces. Development loads the original Async app body; Presentations loads the original Presenton `/presentation` route when its service is running.

## Validation evidence

| Surface | Validation | Result |
| --- | --- | --- |
| Async renderer | `npm run typecheck` and `npm run build:renderer` | Passed after shell bootstrap. |
| Async main process | `npm run typecheck` and `npm run build:main` | Passed with the OpenCode bridge registered. |
| OpenCode Core | `bun run --cwd packages/core typecheck` | Passed. |
| OpenCode Server | Bun headless server plus `GET /api/session?limit=1` | Responded with the original server session envelope. |
| Presenton | Original Next.js build and root tests | Passed in phase 03. |

## Boundary and remaining work

The bridge is real and source-backed, but the existing Async chat stream still owns the `chat:send` renderer event path. Rebinding that stream to OpenCode requires translating OpenCode event envelopes into Async’s existing agent/session/tool/approval event contracts; this is intentionally the next integration task, not a fake fallback. Likewise, the Presenton frame requires its original Next.js/FastAPI services to be started by the desktop lifecycle rather than silently substituting a local editor.

## Next phase

Run integration and no-duplicate tests against the vendored source, then wire the remaining service lifecycle and event translation while preserving original shortcuts, selection behavior, terminal behavior, slide editing, and export behavior.
