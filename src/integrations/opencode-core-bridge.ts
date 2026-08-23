export type AgentWorkspace = 'development' | 'presentations';

export type DevelopmentContext = {
	workspace: 'development';
	projectPath?: string;
	currentFile?: string;
	openFiles?: string[];
	selection?: string;
	gitState?: string;
	terminalState?: string;
	diagnostics?: string;
};

export type PresentationContext = {
	workspace: 'presentations';
	presentationId?: string;
	currentSlide?: number;
	selectedObject?: string;
	slideStructure?: string;
	theme?: string;
	assets?: string[];
	notes?: string;
	presentationState?: string;
};

export type AgentContext = DevelopmentContext | PresentationContext;

export type OpenCodeSession = {
	id: string;
	[key: string]: unknown;
};

export type OpenCodePromptPart = {
	type: 'text';
	text: string;
};

export type OpenCodePromptResponse = {
	sessionID?: string;
	[key: string]: unknown;
};

export type OpenCodeCoreBridgeOptions = {
	baseUrl?: string;
	workspaceDirectory?: string;
	fetchImpl?: typeof fetch;
};

function cleanBaseUrl(value: string): string {
	return value.replace(/\/+$/, '');
}

function compact(value: unknown): string {
	if (value === undefined || value === null || value === '') return '';
	if (Array.isArray(value)) return value.filter(Boolean).join(', ');
	return String(value);
}

export function contextInstruction(context: AgentContext): string {
	const fields =
		context.workspace === 'development'
			? [
					['projectPath', context.projectPath],
					['currentFile', context.currentFile],
					['openFiles', context.openFiles],
					['selection', context.selection],
					['gitState', context.gitState],
					['terminalState', context.terminalState],
					['diagnostics', context.diagnostics],
				]
			: [
					['presentationId', context.presentationId],
					['currentSlide', context.currentSlide],
					['selectedObject', context.selectedObject],
					['slideStructure', context.slideStructure],
					['theme', context.theme],
					['assets', context.assets],
					['notes', context.notes],
					['presentationState', context.presentationState],
				];

	const lines = fields
		.map(([key, value]) => [key, compact(value)] as const)
		.filter(([, value]) => value.length > 0)
		.map(([key, value]) => `${key}: ${value}`);

	return [`Osamah Agent workspace: ${context.workspace}`, ...lines].join('\n');
}

export class OpenCodeCoreBridge {
	private readonly baseUrl: string;
	private readonly workspaceDirectory?: string;
	private readonly fetchImpl: typeof fetch;
	private session?: OpenCodeSession;

	constructor(options: OpenCodeCoreBridgeOptions = {}) {
		this.baseUrl = cleanBaseUrl(options.baseUrl ?? 'http://127.0.0.1:4096');
		this.workspaceDirectory = options.workspaceDirectory;
		this.fetchImpl = options.fetchImpl ?? fetch;
	}

	private headers(): HeadersInit {
		return {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			...(this.workspaceDirectory ? { 'x-opencode-directory': this.workspaceDirectory } : {}),
		};
	}

	private async request<T>(path: string, init: RequestInit = {}): Promise<T> {
		const response = await this.fetchImpl(`${this.baseUrl}/api${path}`, {
			...init,
			headers: { ...this.headers(), ...(init.headers ?? {}) },
		});
		if (!response.ok) {
			const body = await response.text().catch(() => '');
			throw new Error(`OpenCode request failed (${response.status}): ${body || response.statusText}`);
		}
		return (await response.json()) as T;
	}

	async health(): Promise<boolean> {
		try {
			await this.request('/session?limit=1');
			return true;
		} catch {
			return false;
		}
	}

	async ensureSession(): Promise<OpenCodeSession> {
		if (this.session) return this.session;
		const result = await this.request<OpenCodeSession>('/session', { method: 'POST', body: JSON.stringify({}) });
		this.session = result;
		return result;
	}

	async prompt(text: string, context: AgentContext): Promise<OpenCodePromptResponse> {
		const session = await this.ensureSession();
		const prompt: OpenCodePromptPart = {
			type: 'text',
			text: `${text.trim()}\n\n<context>\n${contextInstruction(context)}\n</context>`,
		};
		return this.request<OpenCodePromptResponse>(`/session/${encodeURIComponent(session.id)}/prompt`, {
			method: 'POST',
			body: JSON.stringify({ parts: [prompt] }),
		});
	}

	resetSession(): void {
		this.session = undefined;
	}
}
