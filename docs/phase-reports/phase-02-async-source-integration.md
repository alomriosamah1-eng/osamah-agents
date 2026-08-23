# Phase 02 — Async Original Source Integration

## Status

**Completed:** 2026-08-24

## What changed

The exact pinned Async IDE source was vendored into `integrations/async/` without Git metadata, dependencies, or generated output. The original source files for the renderer, Electron main process, preload bridge, editor, Explorer, tabs, terminal, Git, agent activity, composer, workspace indexing, and native IPC are now present in the Osamah Agent repository.

The root project exposes source-backed commands:

```bash
pnpm async:install
pnpm async:typecheck
pnpm async:build
pnpm async:desktop
```

`pnpm async:typecheck` passed against the vendored original source. `pnpm async:build` passed and produced the original Async Vite renderer. The Async source documents its two-process architecture: React/Vite/Monaco/xterm.js in the renderer and agent loop, tool execution, Git, workspace, LSP, and PTY services in the Electron main process. Those boundaries were preserved.

## Original UI and engine evidence

| Surface | Original source now present | Engine owner |
| --- | --- | --- |
| App shell and workspace routing | `integrations/async/src/App.tsx` | `integrations/async/main-src/index.ts`, IPC registration, settings, workspace services |
| Editor | `integrations/async/src/EditorMainPanel.tsx` | Monaco and Async editor hooks |
| Explorer | `integrations/async/src/EditorLeftSidebar.tsx`, `WorkspaceExplorer.tsx` | Async workspace file index and filesystem services |
| Tabs | `integrations/async/src/EditorTabBar.tsx`, `hooks/useEditorTabs.ts` | Async editor state and file operations |
| Terminal | `integrations/async/src/DrawerPtyTerminal.tsx`, `PtyTerminalView.tsx` | `main-src/terminalSessionService.ts`, `terminalSessionIpc.ts`, `node-pty` |
| Git | `integrations/async/src/GitScmVirtualLists.tsx`, `GitBranchPickerDropdown.tsx` | `main-src/gitService.ts`, `workspace.ts` |
| Agent UI | `integrations/async/src/AgentChatPanel.tsx`, `AgentActivityGroup.tsx`, `AgentToolCard.tsx`, `ToolApprovalCard.tsx` | Async agent IPC and runtime services |
| Composer | `integrations/async/src/ChatComposer.tsx`, `ComposerRichInput.tsx`, `ComposerSkillMenu.tsx` | Async streaming chat and agent session hooks |

## Deliberate boundary

This checkpoint does not yet claim that the Osamah shell has replaced its transitional React/Vite center view with the Async renderer. It establishes the original source and buildable engine as the Development integration boundary. The next stages must wire this source into the single shell and then add Presenton through the same source-backed strategy. Keeping the transitional prototype visible outside the original workspaces is temporary and explicitly tracked for removal.

## License

Async’s root license at the pinned commit is Apache-2.0. The project-level attribution and source path requirements are recorded in [`THIRD_PARTY_INTEGRATIONS.md`](../../THIRD_PARTY_INTEGRATIONS.md).

## Next phase

Vendor the pinned Presenton source, preserve its original Next.js/FastAPI/Electron composition, and verify its original slide editor and export pipeline before writing any presentation wrapper.
