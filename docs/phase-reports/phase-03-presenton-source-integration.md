# Phase 03 — Presenton and Starry Slides Source Integration

## Status

**Completed:** 2026-08-24

## What changed

The original Presenton source was vendored into `integrations/presenton/` with Git metadata, dependency trees, generated builds, model caches, and demo video output excluded. The original Starry Slides/StarryKit source was vendored into `integrations/starry-slides/` with its canonical skill, MCP configuration, plugin manifests, assets, and integrity tests preserved.

The original Presenton presentation UI and engine paths now exist in the repository, including the dashboard and presentation routes, Template V2 slide editor, Konva surface, element toolbars, selection/transformers, model/import contracts, HTML preview/export renderer, FastAPI server, and Electron desktop composition. The Starry Slides skill and hosted-MCP boundary remain separate from Presenton and do not embed credentials.

## Validation evidence

| Source | Validation | Result |
| --- | --- | --- |
| Presenton root | `npm test` | 6 tests passed, covering template conversion, metadata, and export synchronization. |
| Presenton Next.js UI | `npm run build` in `servers/nextjs` | Production build passed; presentation, editor, export, template, upload, and API routes compiled. |
| Starry Slides | `npm test` | 8 plugin integrity tests passed, including manifests, MCP credential boundary, canonical skill, and documentation links. |

## Original UI and engine preserved

No replacement canvas, slide model, export renderer, or design workflow was written in this phase. The source paths are recorded in `UI_SOURCE_MAP.md` and are now marked vendored/build-verified. The repository retains the original Presenton runtime split between Next.js, FastAPI, and Electron so the next phase can wrap its lifecycle rather than imitate it.

## Runtime and license boundary

Presenton is Apache-2.0 and includes a NOTICE file for third-party packages. Starry Slides is MIT and its public source exposes a hosted MCP contract rather than a complete local authoring backend. The required notices and no-credential rule remain in `THIRD_PARTY_INTEGRATIONS.md`. Any future adaptation must preserve these obligations and record the exact copied/adapted file.

## Next phase

Integrate the original Async and Presenton runtimes behind one Osamah Agent desktop shell, with OpenCode connected as the central Agent Core. The shell may own branding, top-level navigation, project routing, and shared context only; the internal source UX remains authoritative.
