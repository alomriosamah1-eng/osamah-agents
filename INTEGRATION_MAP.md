# Integration Map

This map records how the unified shell will load the original environments. A row may be marked **integrated** only after the source is present in the repository, the original runtime starts, and a smoke test proves the route is using that source rather than a replacement.

| Osamah route | Original project | Original UI/component | Original engine | Adapter/wrapper responsibility | Evidence | Status |
| --- | --- | --- | --- | --- | --- | --- |
| `Development` | Async IDE | `src/App.tsx`, `src/EditorMainPanel.tsx`, `src/EditorLeftSidebar.tsx`, `src/EditorTabBar.tsx`, `src/AgentChatPanel.tsx` | Async Electron main process, workspace, Git, PTY, agent IPC | Mount original Async renderer, route workspace/project context, apply branding tokens only | Vendored at `bf2102517a3b7334d5643fb18c42a6c166c9be35`; original renderer typecheck/build passed; shell route pending | Source-backed; shell integration pending |
| `Development / Terminal` | Async IDE | `src/DrawerPtyTerminal.tsx`, `src/PtyTerminalView.tsx` | `main-src/terminalSessionService.ts`, `main-src/terminalSessionIpc.ts` | Preserve PTY lifecycle and IPC; expose shell routing only | Original files vendored; native runtime wiring remains pending | Source-backed; runtime integration pending |
| `Development / Git` | Async IDE | `src/GitScmVirtualLists.tsx`, `src/GitBranchPickerDropdown.tsx` | `main-src/gitService.ts`, `main-src/workspace.ts` | Pass the active workspace root; do not substitute a simulated Git service | Original files vendored; workspace-root routing remains pending | Source-backed; shell integration pending |
| `Development / Agent` | OpenCode via Async integration | Async `src/AgentChatPanel.tsx`, `src/AgentToolCard.tsx`, `src/ToolApprovalCard.tsx` | OpenCode `packages/core/src/session/`, `tool/`, `permission.ts` | Bind Async agent UI to OpenCode sessions, tool events, permissions, and context | Core/source mapping completed; runtime integration pending | Planned |
| `Presentations` | Presenton | `servers/nextjs/app/(presentation-generator)/presentation/page.tsx`, dashboard layout | Presenton Next.js + FastAPI + Electron composition | Mount the original Presenton workspace under the Osamah route; preserve generation and export runtime | Source audit completed; runtime integration pending | Planned |
| `Presentations / Editor` | Presenton | `servers/nextjs/components/slide-editor/surface/TemplateV2KonvaSlide.tsx` and its model/toolbars | Presenton Template V2 render/edit pipeline | Preserve selection, drag, resize, inline edit, undo/redo, and commit path | Source audit completed; runtime integration pending | Planned |
| `Presentations / WYSIWYG extension` | Starry Slides / StarryKit | `skills/starrykit/SKILL.md`, `skills/starrykit/references/mcp-workflow.md` | Optional hosted MCP boundary; no local backend in public repo | Add compatible skill and connector behavior only where Presenton supports it; no embedded credentials | Public repository scope verified; runtime integration pending | Planned |
| `Projects`, `Agents`, `Skills`, `Settings` | Osamah Agent shell + OpenCode core | Product-owned routing and settings screens | OpenCode provider/model/skill/MCP services | Build only missing global shell and routing layers; do not duplicate source workspaces | Architecture decision recorded | Planned |

## Acceptance rule

The integration is not considered complete if a row is supported only by a look-alike UI. Each original source path must be traceable in the checkout and linked to a runtime or integration test.
