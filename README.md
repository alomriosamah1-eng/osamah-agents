# Osamah Agent

## AI Development & Presentation Workspace

**Osamah Agent** is a Linux-first workspace that unifies agentic software development and presentation engineering in one product. The target architecture shares projects, sessions, context, skills, model providers, permissions, and history across two workspaces: **Development** and **Presentations**.

The repository is being built incrementally. The staged implementation workflow is documented in [`docs/WORKFLOW.md`](docs/WORKFLOW.md), and each completed stage has a report under [`docs/phase-reports/`](docs/phase-reports/). The current source-of-truth architecture is documented in [`ARCHITECTURE.md`](ARCHITECTURE.md), [`UI_SOURCE_MAP.md`](UI_SOURCE_MAP.md), and [`INTEGRATION_MAP.md`](INTEGRATION_MAP.md).

## Current state

The repository audit is complete. The remote repository was empty at project start, so no existing application behavior was replaced. The revised integration now treats Async IDE as the original Development UI and engine, Presenton as the original Presentation UI and engine, Starry Slides as a compatible visual-authoring layer, and OpenCode as the Agent Core. Async’s pinned source is vendored under `integrations/async/` and is buildable with its original toolchain.

## Product direction

The application will provide a real desktop-oriented experience rather than a visual mockup. Planned capabilities include a Development Studio with project files, editor, terminal, Git, agent activity, skills, and context; a Presentation Studio with editable slides, canvas operations, themes, charts, agent-assisted editing, history, diff, and export; and a shared workspace that keeps the agent aware of the active project and presentation context.

## Development

Install dependencies and run the browser renderer with:

```bash
pnpm install
pnpm dev
```

The first slice can also be built and validated with:

```bash
pnpm typecheck
pnpm test
pnpm build
```

For the Linux-first Electron shell, start the Vite renderer and then launch Electron with `pnpm desktop`. To build or launch the original Async Development environment from the vendored source, use `pnpm async:install`, `pnpm async:typecheck`, `pnpm async:build`, and `pnpm async:desktop`. The Osamah shell loads the generated `dist/index.html`; its transitional center surface is being replaced by the original Async and Presenton workspaces in the integration phases. The Electron bridge keeps Node integration disabled and uses context isolation.

Implementation instructions, validation gates, licensing records, and integration decisions are recorded in the phase reports. See the phase-one audit at [`docs/phase-reports/phase-01-repository-audit.md`](docs/phase-reports/phase-01-repository-audit.md), the reference study at [`docs/phase-reports/phase-02-integration-study.md`](docs/phase-reports/phase-02-integration-study.md), and the current functional slice at [`docs/phase-reports/phase-04-functional-slice.md`](docs/phase-reports/phase-04-functional-slice.md).
