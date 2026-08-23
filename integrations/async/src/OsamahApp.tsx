import { useMemo, useState } from 'react';
import AsyncOriginalApp from './App';
import './styles/osamah-shell.css';

const PRESENTON_URL = import.meta.env.VITE_OSAMAH_PRESENTON_URL ?? 'http://127.0.0.1:3000';

type Workspace = 'development' | 'presentations';

const WORKSPACES: Array<{ id: Workspace; label: string }> = [
	{ id: 'development', label: 'Development' },
	{ id: 'presentations', label: 'Presentations' },
];

/**
 * Osamah owns only this outer shell. The Development body is the untouched
 * Async application, while Presentations is the original Presenton route.
 */
export default function OsamahApp() {
	const [workspace, setWorkspace] = useState<Workspace>('development');
	const presentationUrl = useMemo(() => {
		const url = new URL('/presentation', PRESENTON_URL);
		url.searchParams.set('osamahShell', '1');
		return url.toString();
	}, []);

	return (
		<div className="osamah-shell">
			<header className="osamah-shell__header" data-osamah-shell="true">
				<div className="osamah-shell__brand">
					<div className="osamah-shell__mark" aria-hidden="true">O</div>
					<div>
						<div className="osamah-shell__name">OSAMAH AGENT</div>
						<div className="osamah-shell__subtitle">وكيل أسامة</div>
					</div>
				</div>
				<nav className="osamah-shell__nav" aria-label="Osamah Agent workspaces">
					{WORKSPACES.map((item) => (
						<button
							key={item.id}
							className={`osamah-shell__tab${workspace === item.id ? ' is-active' : ''}`}
							type="button"
							onClick={() => setWorkspace(item.id)}
						>
							{item.label}
						</button>
					))}
					<span className="osamah-shell__coming-soon" title="Global shell routes will be connected to the original services in the next integration stage">
						Projects · Agents · Skills · Settings
					</span>
				</nav>
			</header>
			<main className={`osamah-shell__workspace osamah-shell__workspace--${workspace}`}>
				{workspace === 'development' ? (
					<div className="osamah-shell__original-surface" data-original-source="Async">
						<AsyncOriginalApp />
					</div>
				) : (
					<iframe
						className="osamah-shell__original-surface osamah-shell__presenton-frame"
						title="Presenton original presentation workspace"
						src={presentationUrl}
						data-original-source="Presenton"
					/>
				)}
			</main>
		</div>
	);
}
