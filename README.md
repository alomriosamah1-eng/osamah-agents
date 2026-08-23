# Osamah Agent

## AI Development & Presentation Workspace

**Osamah Agent** is a Linux-first workspace that unifies agentic software development and presentation engineering in one product. The target architecture shares projects, sessions, context, skills, model providers, permissions, and history across two workspaces: **Development** and **Presentations**.

The repository is being built incrementally. The staged implementation workflow is documented in [`docs/WORKFLOW.md`](docs/WORKFLOW.md), and each completed stage has a report under [`docs/phase-reports/`](docs/phase-reports/).

## Current state

The repository audit is complete. The remote repository was empty at project start, so no existing application behavior was replaced. OpenCode, Presenton, and Starry Slides are being studied as isolated reference projects before adapters or reusable components are introduced.

## Product direction

The application will provide a real desktop-oriented experience rather than a visual mockup. Planned capabilities include a Development Studio with project files, editor, terminal, Git, agent activity, skills, and context; a Presentation Studio with editable slides, canvas operations, themes, charts, agent-assisted editing, history, diff, and export; and a shared workspace that keeps the agent aware of the active project and presentation context.

## Development

Implementation instructions, validation gates, licensing records, and integration decisions will be added as the corresponding phases are completed. See the phase-one audit at [`docs/phase-reports/phase-01-repository-audit.md`](docs/phase-reports/phase-01-repository-audit.md).
