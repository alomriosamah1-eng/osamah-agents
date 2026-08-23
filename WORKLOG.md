# Osamah Agent Worklog

## 2026-08-24 — Requirement revision

The project direction was revised by the user. The Development environment source of truth is now **Async IDE**, not OpenCode’s UI. Presenton remains the source of truth for the Presentation environment, Starry Slides is an additional WYSIWYG/visual-authoring source, and OpenCode is the Agent Core only.

## Phase 01 — Source audit

The reference repositories were inspected in isolated checkouts. Async is an Electron/React application with original source owners for the workspace shell, editor, Explorer, tabs, terminal, Git, agent activity, composer, and native IPC services. Presenton is a composed Electron + Next.js + FastAPI application with an original presentation editor, Template V2 model, preview/export renderers, and generation services. Starry Slides is a plugin/skill/MCP package rather than a standalone local authoring backend. OpenCode is a large Bun/TypeScript agent core with sessions, context, tools, permissions, skills, MCP, models, and providers.

`UI_SOURCE_MAP.md` was created before writing any new integration UI. The existing product-owned React/Vite mock surface is marked transitional in `ARCHITECTURE.md` and must not be treated as the final Development or Presentation environment.

## Phase 02 — Async integration

Planned: bring the original Async source into the monorepo or an explicit source workspace, preserve its renderer and native main-process services, and add only the Osamah Agent shell wrapper and route. The source commit and file-level license boundary must be recorded before the stage is marked complete.

## Phase 03 — Presenton and Starry Slides integration

Planned: bring the original Presenton UI and engine composition into the source workspace, preserve the slide editor and export pipeline, and add the compatible Starry Slides skill/MCP layer without embedding credentials or pretending the plugin contains the hosted authoring backend.

## Phase 04 — OpenCode core and shell

Planned: connect the shared composer and context routing to a real OpenCode session/core process. Async remains the Development UI; Presenton remains the Presentation UI. Osamah Agent owns only branding, navigation, routing, cross-workspace context, global settings, and adapters.

## Phase 05 — Verification

Planned: prove that the original UI and engine owners are running, test the no-duplicate rule, preserve source shortcuts and interaction behavior, and update `INTEGRATION_MAP.md` with evidence.

## GitHub checkpoint policy

After every successful phase: implement → test → update this file and the phase report → commit → push → verify remote → continue. No force push and no remote deletion.


## 2026-08-24 — Source-of-truth correction completed

The third specification confirms the final role separation: Async IDE is the Development UI and engine; Presenton is the Presentation UI and engine; Starry Slides/StarryKit is an additional WYSIWYG/visual-authoring layer; OpenCode is Agent Core only. Async was cloned at commit `2c18a43c0711d1f991a6eabd913831f9c82794b0` and its root license was verified as Apache-2.0. The source-size and role audit is recorded in `docs/phase-reports/phase-01-original-source-audit.md` and the file-level owners are recorded in `UI_SOURCE_MAP.md`.


## Phase 03 — Presenton and Starry Slides source integration completed

The original Presenton source is now vendored under `integrations/presenton/` and the original Starry Slides/StarryKit source under `integrations/starry-slides/`. Presenton root tests passed, the original Next.js presentation workspace production build passed, and all Starry Slides plugin integrity tests passed. The original slide editor, Template V2 model, Konva surface, preview/export renderer, FastAPI server, Electron composition, canonical StarryKit skill, and credential-free MCP configuration are preserved. The Shell route and OpenCode core binding remain the next phases; no look-alike presentation editor was added.


## Phase 04 — Unified shell and OpenCode Core checkpoint completed

The pinned OpenCode monorepo is vendored under `integrations/opencode/`. Its original core typecheck passed, and the original headless server responded through its real session API. A process-backed OpenCode bridge is registered inside Async’s original IPC boundary, exposing `opencode:health` and `opencode:prompt` without replacing Async’s native services. Async’s original renderer now boots the thin Osamah shell for the primary window, keeps its original auxiliary surfaces, loads the original Async app for Development, and routes Presentations to the original Presenton `/presentation` service. The remaining work is event translation from OpenCode into Async’s existing streaming/session/tool contracts and desktop lifecycle management for Presenton; these are tracked as integration work, not simulated fallbacks.
