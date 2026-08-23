# Phase 03 — Unified Architecture Plan

## Status

**Completed:** 2026-08-24

## Product architecture

Osamah Agent will be a Linux-first desktop application with a lightweight TypeScript renderer and a product-owned domain core. The first release will be runnable in a browser development surface and inside an Electron shell, which keeps the UI testable while preserving a desktop path for local files, terminal processes, and future embedded engines.

```text
Desktop shell
└── Renderer
    ├── Shared workspace state
    ├── Development Studio
    ├── Presentation Studio
    ├── Agent activity and approvals
    └── Design system

Product-owned core
├── WorkspaceStore
├── AgentRuntime adapter
├── SkillRegistry
├── PresentationEngine
├── History and diff
└── ProviderCatalog

Future adapters
├── OpenCode client/session adapter
├── Presenton generation/export adapter
└── StarryKit-style skill/MCP adapter
```

## Canonical state model

The application will keep one typed workspace state containing the active project, current mode, current session, discovered skills, provider metadata, agent activity, approval requests, and presentation document. Development and Presentations are views over the same state rather than separate products.

A presentation will use a stable JSON document with slide IDs, element IDs, element geometry, text, style, and semantic role. Manual changes and agent changes will flow through one reducer so that undo/redo, history, and before/after diff remain consistent. The initial editor will support selecting, moving, resizing, editing text, duplicating, deleting, and adding slides; later releases can add richer shapes, charts, images, and import/export adapters behind the same contract.

## First functional vertical slice

The next implementation phase will deliver the following real behavior:

| Area | First slice |
| --- | --- |
| Workspace | Switch between Development and Presentations while preserving shared state. |
| Development | Browse a virtual project, inspect a file, send an agent request, see streamed activity, and approve or reject a proposed change. |
| Presentations | Create a deck from a prompt using a deterministic local engine, select slides, edit titles/body text, add/delete slides with approval for deletion, and view history. |
| Skills | Discover supported local skill roots from a selected workspace model and show enabled skill metadata. |
| Providers | Show local/provider-neutral configuration metadata without committing secrets. |
| Git safety | Keep Git actions represented as approval-gated proposals; no automatic destructive Git operation is performed by the UI. |

## Performance and safety constraints

The renderer will use lazy-loaded workspace views, stable lists, small state updates, and no heavyweight engine dependency in the first slice. Presentation generation will be deterministic by default so tests do not require a network model. Any future provider or MCP connector will be opt-in and will not receive credentials through the renderer bundle.

## Stage sequence after this plan

The implementation will proceed through a functional core and UI, then a validation pass. Each stage will update its report and push a commit to the canonical GitHub remote before moving forward.
