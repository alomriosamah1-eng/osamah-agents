# Integration Boundaries

## Product-owned contracts

Osamah Agent owns the canonical workspace model, agent activity events, approval requests, skill registry, provider configuration, presentation document model, change history, and shared design tokens. These contracts are intentionally small enough to run in a local shell and test without external credentials.

## Adapter seams

| Contract | Responsibility | Initial implementation | Future integration point |
| --- | --- | --- | --- |
| `AgentRuntime` | Accept a request plus workspace context and emit activity, tool, approval, and change events. | Deterministic local runtime for the first vertical slice. | OpenCode session/server/client adapter. |
| `SkillRegistry` | Discover metadata from supported skill roots and load bodies only when requested. | Local filesystem discovery with explicit roots. | OpenCode-compatible discovery and permission service. |
| `PresentationEngine` | Create, edit, review, render, and export a canonical deck. | Local JSON-backed engine with SVG/HTML rendering. | Presenton API/service adapter. |
| `SlideEditor` | Apply bounded manual changes, maintain selection, and record undo/redo. | Product-owned editable canvas model. | Presenton-compatible Template V2 import/export adapter. |
| `ProviderCatalog` | Store provider metadata and resolve model settings without secrets. | Local provider catalog and environment-key references. | OpenAI-compatible, Ollama, Anthropic, Gemini, and LM Studio adapters. |
| `WorkspaceStore` | Persist projects, decks, sessions, skills, and history locally. | JSON files under the app data directory. | SQLite or a richer local persistence layer if required. |

## Approval boundary

The runtime may propose operations, but the UI must explicitly approve destructive file operations, destructive slide operations, dangerous terminal commands, Git actions, export overwrites, and broad changes. Approval decisions are recorded as activity events and must be replayable in the history view.

## Context boundary

The active workspace, project, file, deck, slide, selected element, current session, enabled skills, provider, and pending approvals form a structured context object. An adapter may render that context for a model, but the UI and storage layer retain the typed source of truth.
