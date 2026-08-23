# Osamah Agent Workflow

## Purpose

This document governs the implementation of **Osamah Agent** and is updated after every implementation stage. It records what was inspected, which original source was used, what was changed in the integration layer, what was validated, and which commit was published.

## Source-first rule

The repository must use the original production sources rather than redraw their interfaces. **Async IDE** is the Development UI and engine. **Presenton** is the Presentation UI and engine. **Starry Slides/StarryKit** is an optional compatible visual-authoring layer. **OpenCode** is the Agent Core for sessions, tools, skills, MCP, context, permissions, models, providers, and workflows; its UI is not the Development IDE.

Only the following may be created from scratch: the Osamah shell, unified navigation, workspace routing, project manager, adapters, shared context, agent routing, design tokens, settings, and cross-workspace communication. A new editor, terminal, canvas, slide editor, session engine, skill engine, or tool system is prohibited when an original implementation is available.

## Stage gate

Every stage follows this sequence:

1. Inspect the current state and the relevant original source files. Update `UI_SOURCE_MAP.md` before writing new UI.
2. Make the smallest coherent integration change. Preserve original shortcuts, selection behavior, drag behavior, editor behavior, panel behavior, slide behavior, and keyboard navigation.
3. Run the source project’s own typecheck, unit tests, build, and runtime smoke checks where available. If a check is unavailable or blocked, record that fact explicitly.
4. Update `WORKLOG.md`, the matching phase report, `ARCHITECTURE.md`, `UI_SOURCE_MAP.md`, `INTEGRATION_MAP.md`, and licensing records when affected.
5. Search for duplicate or fake surfaces. A source-backed route must be traceable to an original component and engine.
6. Review `git diff --check`, `git status`, the branch, and the files being committed. Never commit dependencies, generated builds, model caches, credentials, or access tokens.
7. Commit the complete stage, including documentation.
8. Push the commit to `origin/main` unless a dedicated feature branch is required for safety. Record the commit SHA and remote verification in the phase report.
9. Continue only after the published commit and clean working tree are verified.

## Runtime boundaries

Async’s Electron main process owns native filesystem, Git, PTY, workspace, and agent IPC behavior. Presenton’s Next.js, FastAPI, and Electron processes own presentation generation, slide editing, preview, PPTX, and PDF workflows. OpenCode’s headless server/core owns agent sessions, prompts, tools, permissions, skills, MCP, context, models, and providers. Osamah adapters may translate lifecycle, commands, events, context, and routing, but may not rewrite those engines.

## Documentation invariant

A stage is incomplete until its report is committed and pushed. Reports must distinguish **implemented**, **verified**, **not yet implemented**, and **blocked**. External projects must be cited with their URL, pinned commit, license, relevant components, and local modifications. The required maps are `UI_SOURCE_MAP.md` and `INTEGRATION_MAP.md`; the required operational record is `WORKLOG.md`.

## Safety invariant

Before a destructive or wide-ranging change, create a backup branch or tag, inspect the diff, and preserve existing source behavior unless it is demonstrably duplicated or incompatible. Never copy secrets from source repositories. OAuth client values must be supplied through runtime environment configuration or the product’s secure settings boundary.

## GitHub policy

The canonical remote is:

`git@github.com:alomriosamah1-eng/osamah-agents.git`

The working remote may be represented by GitHub CLI as the equivalent HTTPS URL. No force push is permitted, no remote deletion is permitted, and every completed stage must leave a reproducible commit on GitHub. If GitHub push protection blocks a source import, remove the flagged credential from the unpublished commit history, replace it with runtime configuration, revalidate the source, and push the sanitized commit.

## Current source-backed commands

The default `pnpm dev` and `pnpm desktop` commands delegate to the original Async toolchain. `pnpm async:typecheck`, `pnpm async:main`, and `pnpm async:renderer` validate the original Development source. `pnpm presenton:test` and `pnpm presenton:build` validate the original Presentation source. `pnpm starry:test` validates the original visual-authoring plugin boundary. `pnpm opencode:typecheck` validates the original OpenCode core.
