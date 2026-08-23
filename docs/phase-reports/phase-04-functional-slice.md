# Phase 04 — Functional Core and Workspace UI

## Status

**Completed:** 2026-08-24

## Delivered

The repository now contains a real TypeScript/React workspace renderer and a minimal Electron shell for Linux-first desktop execution. The app has one shared navigation model with two modes: Development and Presentations.

| Capability | Implementation status |
| --- | --- |
| Shared Development/Presentations navigation | Implemented. |
| Development project explorer | Implemented with selectable files. |
| Code editing and save state | Implemented with a real textarea-backed file model and save history. |
| Terminal surface | Implemented as a local workspace panel with command-entry affordance. |
| Agent activity | Implemented with observable activity items and context state. |
| Deterministic local agent request | Implemented with activity transitions; no credentials required. |
| Skill metadata | Implemented for `.opencode/skills`, `.claude/skills`, and `.agents/skills` sources. |
| Provider catalog | Implemented as local/provider-neutral metadata. |
| Presentation generation | Implemented from a prompt with a deterministic three-slide local engine. |
| Editable slide model | Implemented with stable slide and element IDs, text editing, and geometry fields. |
| Slide add/delete | Add is immediate; delete is approval-gated and recorded in history. |
| Human approval | Implemented for destructive slide deletion with Approve and Cancel. |
| History | Implemented as a visible state log for generated, edited, saved, and approval actions. |
| Electron shell | Implemented with context isolation and disabled Node integration in the renderer. |

## Validation

The following checks passed after dependency installation:

```text
TypeScript typecheck: passed
Core unit tests: 3 passed
Vite production build: passed
Browser smoke test: Development Studio passed
Browser smoke test: Presentation Studio and approval card passed
```

The first browser smoke test exposed a proxied-host restriction in Vite. The configuration was corrected and the second navigation rendered successfully. The details are recorded in [`docs/validation/browser-smoke-phase-04.md`](../validation/browser-smoke-phase-04.md).

## Deliberate scope boundary

This phase does not pretend that OpenCode, Presenton, or a hosted StarryKit service has been fully embedded. The product-owned contracts and local vertical slice are now in place so those engines can be integrated behind the documented adapters. Full file-system permissions, a production terminal process, OpenCode session transport, Presenton API/export runtime, WYSIWYG drag/resize gestures, and provider credentials remain subsequent integration work rather than fake buttons.

## Next phase

Harden the test and build workflow, add interaction-level checks for the two workspaces, verify the Electron launch path, and document known limitations and follow-up integration tasks.
