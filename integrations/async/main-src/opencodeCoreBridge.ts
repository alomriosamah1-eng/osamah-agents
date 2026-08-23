import { app, ipcMain, type IpcMainInvokeEvent } from 'electron';
import { spawn, type ChildProcess } from 'node:child_process';
import * as path from 'node:path';

const DEFAULT_PORT = Number(process.env.OSAMAH_OPENCODE_PORT ?? 4096);
const DEFAULT_URL = `http://127.0.0.1:${DEFAULT_PORT}`;
let serverProcess: ChildProcess | null = null;
let startPromise: Promise<string> | null = null;

function opencodeRoot(): string {
	return path.resolve(process.env.OSAMAH_OPENCODE_ROOT ?? path.join(app.getAppPath(), '../opencode'));
}

async function waitForServer(baseUrl: string, timeoutMs = 15_000): Promise<void> {
	const startedAt = Date.now();
	while (Date.now() - startedAt < timeoutMs) {
		try {
			const response = await fetch(`${baseUrl}/api/session?limit=1`);
			if (response.ok) return;
		} catch {
			// The original OpenCode server is still booting.
		}
		await new Promise((resolve) => setTimeout(resolve, 250));
	}
	throw new Error(`OpenCode server did not become ready at ${baseUrl}`);
}

async function ensureOpenCodeServer(): Promise<string> {
	const externalUrl = process.env.OSAMAH_OPENCODE_URL;
	if (externalUrl) {
		await waitForServer(externalUrl.replace(/\/+$/, ''));
		return externalUrl.replace(/\/+$/, '');
	}
	if (startPromise) return startPromise;
	startPromise = (async () => {
		const baseUrl = DEFAULT_URL;
		serverProcess = spawn(
			process.env.BUN_BIN ?? 'bun',
			['run', '--cwd', 'packages/opencode', 'src/index.ts', 'serve', '--hostname', '127.0.0.1', '--port', String(DEFAULT_PORT)],
			{ cwd: opencodeRoot(), stdio: 'ignore', env: process.env },
		);
		serverProcess.once('exit', () => {
			serverProcess = null;
			startPromise = null;
		});
		await waitForServer(baseUrl);
		return baseUrl;
	})().catch((error) => {
		startPromise = null;
		throw error;
	});
	return startPromise;
}

async function request<T>(pathname: string, init: RequestInit = {}): Promise<T> {
	const baseUrl = await ensureOpenCodeServer();
	const response = await fetch(`${baseUrl}/api${pathname}`, {
		...init,
		headers: { Accept: 'application/json', 'Content-Type': 'application/json', ...(init.headers ?? {}) },
	});
	if (!response.ok) {
		throw new Error(`OpenCode request failed (${response.status}): ${await response.text()}`);
	}
	return (await response.json()) as T;
}

export function registerOpenCodeCoreIpc(): void {
	ipcMain.handle('opencode:health', async () => {
		try {
			await ensureOpenCodeServer();
			return { ok: true };
		} catch (error) {
			return { ok: false, error: String(error) };
		}
	});

	ipcMain.handle('opencode:prompt', async (_event: IpcMainInvokeEvent, payload: { sessionID?: string; text: string; context?: string }) => {
		const session = payload.sessionID
			? { id: payload.sessionID }
			: await request<{ id: string }>('/session', { method: 'POST', body: JSON.stringify({}) });
		const result = await request(`/session/${encodeURIComponent(session.id)}/prompt`, {
			method: 'POST',
			body: JSON.stringify({
				parts: [{ type: 'text', text: [payload.text, payload.context ? `\n\n<context>\n${payload.context}\n</context>` : ''].join('') }],
			}),
		});
		return { sessionID: session.id, result };
	});
}

export function stopOpenCodeCore(): void {
	serverProcess?.kill();
	serverProcess = null;
	startPromise = null;
}
