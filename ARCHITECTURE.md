# Osamah Agent Architecture

## Final role separation

Osamah Agent is a single desktop shell. It does not replace the internal UX of the source applications.

```text
                           OSAMAH AGENT
                                │
                 ┌──────────────┴──────────────┐
                 │                             │
           DEVELOPMENT                   PRESENTATIONS
                 │                             │
                 ▼                             ▼
             ASYNC IDE                     PRESENTON
         Original UI + Engine          Original UI + Engine
                                               │
                                               ▼
                                         STARry Slides
                                        WYSIWYG layer
                 │                             │
                 └──────────────┬──────────────┘
                                ▼
                           OPENCODE CORE
                    Agents · Tools · Skills · MCP
                   Sessions · Context · Permissions
                         Models · Providers
```

## Responsibilities

| Layer | Source of truth | Osamah Agent responsibility |
| --- | --- | --- |
| Development environment | Async IDE | Load the original Async renderer and main-process services for Explorer, Monaco editor, tabs, terminal, Git, search, diagnostics, and workspace behavior. |
| Presentation environment | Presenton | Load the original Presenton Next.js/FastAPI/Electron composition for generation, templates, editing, preview, PPTX, and PDF. |
| Visual slide editing | Presenton plus applicable Starry Slides concepts/components | Reuse the original editable slide surface and integrate Starry Slides only where its visual-authoring layer is compatible. |
| Agent brain | OpenCode | Run OpenCode as the core for sessions, tools, skills, MCP, permissions, context, providers, and model routing. OpenCode UI is not the Development UI. |
| Product shell | Osamah Agent | Own branding, global navigation, project switching, workspace routing, shared sessions/context, settings, and cross-workspace communication. |

## State separation

Global state contains the current project, workspace, agent, session, theme, provider, and model. Async state contains open files, tabs, terminal, Git, and diagnostics. Presenton state contains the current presentation, slide, selection, layers, theme, assets, notes, and export state. Adapters synchronize lifecycle, commands, events, context, and routing without moving source UI responsibilities into a monolithic store.

## Non-negotiable constraint

The existing React/Vite prototype in the first implementation commit is considered transitional. It must not remain as a replacement for Async or Presenton once the original source workspaces are integrated. Any temporary compatibility surface must be clearly labeled and removed when the original surface is available.
