# Changelog

## Unreleased — Original source integration

The integration architecture is now explicitly source-first. Async IDE is the Development environment and its original UI and engine must be used. Presenton is the Presentation environment and its original UI and engine must be used. Starry Slides/StarryKit supplies compatible WYSIWYG and visual-authoring capabilities where technically compatible. OpenCode is the Agent Core and is not used as the primary IDE interface.

The repository now includes `UI_SOURCE_MAP.md`, `INTEGRATION_MAP.md`, `ARCHITECTURE.md`, `WORKLOG.md`, and `THIRD_PARTY_INTEGRATIONS.md` to make every future UI and engine integration traceable to original source files and licenses.

## 0.1.0 — Functional foundation

Added a first product-owned workspace foundation with Development and Presentations routes, local deterministic contracts, an Electron shell, and smoke-tested interactions. Under the revised architecture, this foundation is transitional and will not replace the original Async or Presenton workspaces.


## 2026-08-24 — Original-source integration checkpoints

Vendored the pinned Async IDE source and made its original renderer the Development body behind a thin Osamah shell. Vendored the pinned Presenton source and original Next.js/FastAPI/Electron presentation stack, plus the pinned Starry Slides/StarryKit skill and MCP boundary. Vendored the pinned OpenCode monorepo and added a process-backed headless bridge for real session and prompt API calls. Removed the previous root-level mock renderer and duplicate local editor/deck/agent surfaces.

Validation passed for Async renderer and main-process builds, OpenCode core typecheck and server API probe, Presenton source tests and Next.js production build, Starry Slides plugin integrity tests, and the no-duplicate source acceptance suite. Remaining work is supervised Presenton service startup in the desktop lifecycle and complete OpenCode event translation into Async’s existing streaming/tool/approval contracts.
