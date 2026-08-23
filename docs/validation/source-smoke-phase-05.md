# Phase 05 — Source-backed Browser Smoke Test

## Async Development workspace

The built renderer was served from `integrations/async/dist` and opened through the temporary preview host. The browser displayed the Osamah Agent shell with `Development` and `Presentations` navigation, followed by Async’s original top menu (`文件`, `编辑`, `视图`, `窗口`, `帮助`), editor layout control, Async settings control, and original welcome actions (`打开项目`, `克隆仓库`, `通过 SSH 连接`). The visible title was `Async Ultra · AI 编辑器`, confirming that the Development body is the original Async application rather than a root-level replacement editor.

The smoke test also confirms that the shell wrapper is outside the original Async body: the Osamah brand and workspace tabs occupy the top shell, while the original Async menu and welcome surface remain below it. The current browser preview has no Electron preload, so native workspace/PTY actions are not expected to execute in this browser-only check; those require `pnpm desktop` and Async’s original Electron main process.


## Presenton route

The browser switched the Shell to `Presentations` and the active tab changed correctly. The frame itself displayed a browser error because no Presenton Next.js service was running at the configured default `http://127.0.0.1:3000`; this is a service-lifecycle gap, not a substitute UI. The shell is requesting the original `/presentation` route, as recorded in `INTEGRATION_MAP.md`. The next implementation step is to start Presenton’s original Next.js/FastAPI services from the desktop lifecycle so the original editor appears in this frame.


## Live Presenton verification

After starting Presenton’s original Next.js service and rebuilding the Async renderer with its exposed URL, the `Presentations` tab loaded the original Presenton route. The browser displayed Presenton’s own loading/secure-instance flow and then its original `Create your admin login` form with Username, Password, Confirm password, and `Create account` controls inside the Osamah shell. This proves the frame is reaching the real Presenton service rather than a locally recreated presentation editor. No credentials were entered during the smoke test.
