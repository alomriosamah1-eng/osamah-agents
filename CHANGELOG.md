# Changelog

## Unreleased — Original source integration

The integration architecture is now explicitly source-first. Async IDE is the Development environment and its original UI and engine must be used. Presenton is the Presentation environment and its original UI and engine must be used. Starry Slides/StarryKit supplies compatible WYSIWYG and visual-authoring capabilities where technically compatible. OpenCode is the Agent Core and is not used as the primary IDE interface.

The repository now includes `UI_SOURCE_MAP.md`, `INTEGRATION_MAP.md`, `ARCHITECTURE.md`, `WORKLOG.md`, and `THIRD_PARTY_INTEGRATIONS.md` to make every future UI and engine integration traceable to original source files and licenses.

## 0.1.0 — Functional foundation

Added a first product-owned workspace foundation with Development and Presentations routes, local deterministic contracts, an Electron shell, and smoke-tested interactions. Under the revised architecture, this foundation is transitional and will not replace the original Async or Presenton workspaces.
