import { useMemo, useState } from "react"
import {
  Activity,
  ArrowUpRight,
  Check,
  ChevronDown,
  Code2,
  Copy,
  FileCode2,
  FolderOpen,
  GitBranch,
  Layers3,
  LayoutTemplate,
  Minus,
  MoreHorizontal,
  PanelRight,
  Play,
  Plus,
  Presentation,
  Redo2,
  RotateCcw,
  Save,
  Search,
  Send,
  Settings2,
  ShieldCheck,
  Sparkles,
  TerminalSquare,
  Trash2,
  Undo2,
  X,
} from "lucide-react"
import { activeSlide, applyApproval, createDeckFromPrompt, initialState, updateFileContent, updateSlideElement } from "./core"
import type { ActivityItem, Mode, SlideElement, WorkspaceState } from "./types"
import "./styles.css"

function App() {
  const [state, setState] = useState<WorkspaceState>(initialState)
  const [prompt, setPrompt] = useState("")
  const [agentInput, setAgentInput] = useState("")
  const [showApproval, setShowApproval] = useState(true)
  const [isSaved, setIsSaved] = useState(true)

  const slide = activeSlide(state)
  const selectedFile = state.project.files.find((file) => file.path === state.selectedFilePath) ?? state.project.files[0]
  const selectedElement = slide.elements.find((element) => element.id === state.selectedElementId) ?? null
  const pendingApprovals = state.approvals.filter((approval) => approval.status === "pending")

  const setMode = (mode: Mode) => setState((current) => ({ ...current, mode }))

  const updateActivity = (label: string, detail: string, kind: ActivityItem["kind"] = "tool") => {
    setState((current) => ({
      ...current,
      activities: [
        ...current.activities.map((activity) => (activity.status === "active" ? { ...activity, status: "done" as const } : activity)),
        { id: `activity-${Date.now()}`, label, detail, kind, status: "active" },
      ],
      history: [...current.history, label],
    }))
  }

  const runAgent = () => {
    const request = agentInput.trim() || "Review the active workspace"
    updateActivity("Understanding request", request, "understanding")
    setAgentInput("")
    window.setTimeout(() => updateActivity("Context synchronized", "Project, session, skills, and active selection are available", "context"), 250)
    window.setTimeout(() => updateActivity("Proposal ready", "The local runtime prepared an observable change plan", "complete"), 600)
  }

  const generatePresentation = () => {
    const next = createDeckFromPrompt(prompt)
    setState((current) => ({ ...current, mode: "presentations", presentation: next, selectedElementId: null, history: [...current.history, `Generated presentation: ${next.title}`] }))
    setPrompt("")
  }

  const updateSelectedElement = (patch: Partial<SlideElement>) => {
    if (!selectedElement) return
    setState((current) => ({
      ...current,
      presentation: updateSlideElement(current.presentation, slide.id, selectedElement.id, patch),
      history: [...current.history, `Edited ${selectedElement.id}`],
    }))
    setIsSaved(false)
  }

  const addSlide = () => {
    const nextNumber = state.presentation.slides.length + 1
    const id = `slide-${Date.now()}`
    setState((current) => ({
      ...current,
      presentation: { ...current.presentation, activeSlideId: id, slides: [...current.presentation.slides, { id, title: `New slide ${nextNumber}`, subtitle: "Add a concise supporting idea.", elements: [] }] },
      history: [...current.history, `Added slide ${nextNumber}`],
    }))
  }

  const requestDeleteSlide = () => {
    if (state.presentation.slides.length <= 1) return
    setState((current) => ({
      ...current,
      approvals: current.approvals.map((approval) => (approval.id === "approval-delete-slide" ? { ...approval, title: `Delete ${slide.title}`, description: "The selected slide will be removed from the deck.", status: "pending" as const } : approval)),
    }))
    setShowApproval(true)
  }

  const approveDelete = (status: "approved" | "rejected") => {
    if (status === "rejected") {
      setState((current) => applyApproval(current, "approval-delete-slide", "rejected"))
      setShowApproval(false)
      return
    }
    setState((current) => {
      const index = current.presentation.slides.findIndex((item) => item.id === current.presentation.activeSlideId)
      const remaining = current.presentation.slides.filter((item) => item.id !== current.presentation.activeSlideId)
      const nextActive = remaining[Math.max(0, index - 1)]?.id ?? remaining[0].id
      return { ...applyApproval(current, "approval-delete-slide", "approved"), presentation: { ...current.presentation, slides: remaining, activeSlideId: nextActive }, selectedElementId: null }
    })
    setShowApproval(false)
  }

  const saveFile = () => {
    setState((current) => ({ ...current, project: { ...current.project, files: updateFileContent(current.project.files, selectedFile.path, selectedFile.content) }, history: [...current.history, `Saved ${selectedFile.path}`] }))
    setIsSaved(true)
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <div className="brand-lockup">
          <div className="brand-mark"><Sparkles size={16} /></div>
          <div><strong>OSAMAH AGENT</strong><span>وكيل أسامة</span></div>
        </div>
        <nav className="mode-switch" aria-label="Workspace mode">
          <button className={state.mode === "development" ? "mode-button active" : "mode-button"} onClick={() => setMode("development")}><Code2 size={15} /> Development</button>
          <button className={state.mode === "presentations" ? "mode-button active" : "mode-button"} onClick={() => setMode("presentations")}><Presentation size={15} /> Presentations</button>
        </nav>
        <div className="top-actions">
          <span className="connection-pill"><span className="status-dot" /> Local runtime ready</span>
          <button className="icon-button" title="Settings"><Settings2 size={17} /></button>
          <div className="avatar">OA</div>
        </div>
      </header>

      <section className="workspace-header">
        <div className="breadcrumbs"><FolderOpen size={15} /><span>{state.project.name}</span><ChevronDown size={14} /><span className="muted">{state.mode === "development" ? "Development Studio" : "Presentation Studio"}</span></div>
        <div className="workspace-actions">
          {state.mode === "development" ? <><button className="quiet-button"><GitBranch size={15} /> {state.project.branch}</button><button className="primary-button" onClick={runAgent}><Play size={14} /> Run agent</button></> : <><button className="quiet-button"><RotateCcw size={15} /> Undo</button><button className="quiet-button"><Redo2 size={15} /> Redo</button><button className="primary-button" onClick={() => setState((current) => ({ ...current, history: [...current.history, "Presentation preview opened"] }))}><Play size={14} /> Present</button></>}
        </div>
      </section>

      {state.mode === "development" ? <DevelopmentWorkspace state={state} selectedFile={selectedFile} agentInput={agentInput} setAgentInput={setAgentInput} runAgent={runAgent} setState={setState} saveFile={saveFile} isSaved={isSaved} /> : <PresentationWorkspace state={state} slide={slide} selectedElement={selectedElement} prompt={prompt} setPrompt={setPrompt} generatePresentation={generatePresentation} setState={setState} updateSelectedElement={updateSelectedElement} addSlide={addSlide} requestDeleteSlide={requestDeleteSlide} />}

      <footer className="statusbar"><div><span className="status-dot" /> Workspace synced</div><div className="status-links"><span>{state.skills.filter((skill) => skill.enabled).length} skills enabled</span><span>{state.providers.filter((provider) => provider.status !== "not-configured").length} providers ready</span><span>UTF-8</span><span>Linux-first</span></div></footer>

      {showApproval && pendingApprovals.length > 0 && state.mode === "presentations" && <ApprovalCard approval={pendingApprovals[0]} onApprove={() => approveDelete("approved")} onReject={() => approveDelete("rejected")} />}
    </main>
  )
}

function DevelopmentWorkspace({ state, selectedFile, agentInput, setAgentInput, runAgent, setState, saveFile, isSaved }: { state: WorkspaceState; selectedFile: WorkspaceState["project"]["files"][number]; agentInput: string; setAgentInput: (value: string) => void; runAgent: () => void; setState: React.Dispatch<React.SetStateAction<WorkspaceState>>; saveFile: () => void; isSaved: boolean }) {
  return <div className="workspace-grid development-grid">
    <aside className="sidebar left-sidebar">
      <div className="panel-heading"><span>PROJECT EXPLORER</span><MoreHorizontal size={15} /></div>
      <div className="search-field"><Search size={14} /><span>Search files</span><kbd>⌘ P</kbd></div>
      <div className="tree-root"><FolderOpen size={14} className="accent-icon" /><span>{state.project.name}</span></div>
      <div className="file-tree">{state.project.files.map((file) => <button className={selectedFile.path === file.path ? "tree-item selected" : "tree-item"} key={file.path} onClick={() => setState((current) => ({ ...current, selectedFilePath: file.path }))}><FileCode2 size={14} /><span>{file.path}</span></button>)}</div>
      <div className="sidebar-section"><div className="section-label">WORKSPACE</div><button className="tree-item"><Layers3 size={14} /><span>Tasks</span><span className="count-badge">4</span></button><button className="tree-item"><GitBranch size={14} /><span>Git changes</span><span className="count-badge amber">2</span></button><button className="tree-item"><Sparkles size={14} /><span>Skills</span><span className="count-badge">12</span></button></div>
      <div className="sidebar-footer"><span className="mini-avatar">OA</span><div><strong>Osamah workspace</strong><span>Local project</span></div><ChevronDown size={14} /></div>
    </aside>
    <section className="editor-column">
      <div className="editor-tabs"><div className="editor-tab active"><FileCode2 size={14} /> {selectedFile.path}<span className="unsaved-dot">{isSaved ? "" : "•"}</span></div><div className="editor-tab-spacer" /><button className="icon-button"><Copy size={15} /></button><button className="icon-button" onClick={saveFile}><Save size={15} /></button></div>
      <div className="code-editor"><div className="line-numbers">{selectedFile.content.split("\n").map((_, index) => <span key={index}>{String(index + 1).padStart(2, "0")}</span>)}</div><textarea value={selectedFile.content} onChange={(event) => setState((current) => ({ ...current, project: { ...current.project, files: updateFileContent(current.project.files, selectedFile.path, event.target.value) } }))} spellCheck={false} aria-label="Code editor" /></div>
      <div className="terminal-panel"><div className="terminal-heading"><div><TerminalSquare size={14} /> TERMINAL</div><span>bash · osamah-agent</span></div><div className="terminal-output"><p><span className="terminal-prompt">➜</span> osamah-agent <span className="terminal-command">git status --short</span></p><p className="terminal-muted">On branch main · workspace clean</p><p><span className="terminal-prompt">➜</span> osamah-agent <span className="terminal-command">agent ready</span></p></div><div className="terminal-input"><span>➜</span><input placeholder="Run a command locally..." /><ArrowUpRight size={14} /></div></div>
    </section>
    <AgentPanel state={state} input={agentInput} setInput={setAgentInput} onRun={runAgent} />
  </div>
}

function PresentationWorkspace({ state, slide, selectedElement, prompt, setPrompt, generatePresentation, setState, updateSelectedElement, addSlide, requestDeleteSlide }: { state: WorkspaceState; slide: WorkspaceState["presentation"]["slides"][number]; selectedElement: SlideElement | null; prompt: string; setPrompt: (value: string) => void; generatePresentation: () => void; setState: React.Dispatch<React.SetStateAction<WorkspaceState>>; updateSelectedElement: (patch: Partial<SlideElement>) => void; addSlide: () => void; requestDeleteSlide: () => void }) {
  const canvasScale = 0.68
  const slideStyle = useMemo(() => ({ width: `${1280 * canvasScale}px`, height: `${720 * canvasScale}px` }), [])
  return <div className="workspace-grid presentation-grid">
    <aside className="sidebar slide-sidebar"><div className="panel-heading"><span>SLIDES · {state.presentation.slides.length}</span><button className="icon-button" onClick={addSlide}><Plus size={15} /></button></div><div className="slide-list">{state.presentation.slides.map((item, index) => <button className={item.id === state.presentation.activeSlideId ? "slide-thumb active" : "slide-thumb"} key={item.id} onClick={() => setState((current) => ({ ...current, presentation: { ...current.presentation, activeSlideId: item.id }, selectedElementId: null }))}><div className="thumb-number">{String(index + 1).padStart(2, "0")}</div><div className="thumb-canvas"><div className="thumb-accent" /><strong>{item.title}</strong><span>{item.subtitle}</span></div></button>)}</div><div className="slide-sidebar-footer"><button className="quiet-button wide" onClick={addSlide}><Plus size={14} /> Add slide</button><button className="quiet-button wide danger-button" onClick={requestDeleteSlide}><Trash2 size={14} /> Delete selected</button></div></aside>
    <section className="canvas-column"><div className="canvas-toolbar"><div className="canvas-breadcrumb"><LayoutTemplate size={15} /> {state.presentation.title} <span>/</span> <strong>Slide {state.presentation.slides.findIndex((item) => item.id === slide.id) + 1}</strong></div><div className="canvas-tools"><button className="icon-button"><Undo2 size={15} /></button><button className="icon-button"><Redo2 size={15} /></button><span className="zoom-label">68%</span></div></div><div className="canvas-stage"><div className="slide-canvas" style={slideStyle}>{slide.elements.map((element) => <button key={element.id} className={selectedElement?.id === element.id ? "slide-element selected" : "slide-element"} style={{ left: element.x * canvasScale, top: element.y * canvasScale, width: element.width * canvasScale, height: element.height * canvasScale, color: element.color, background: element.type === "shape" ? element.color : undefined }} onClick={() => setState((current) => ({ ...current, selectedElementId: element.id }))}>{element.type === "shape" ? null : element.text}</button>)}{slide.elements.length === 0 && <div className="empty-slide"><Plus size={18} /> Select an element from the toolbar or ask the agent to design this slide.</div>}<div className="slide-footer-mark">OSAMAH AGENT · {String(state.presentation.slides.findIndex((item) => item.id === slide.id) + 1).padStart(2, "0")}</div></div></div><div className="canvas-bottom"><div><span className="status-dot" /> Autosave on</div><div className="canvas-hint">Select an element to edit · Drag and resize is next in the editor contract</div></div></section>
    <aside className="inspector-column"><div className="inspector-tabs"><button className="active">Inspector</button><button>Layers</button></div><div className="inspector-body">{selectedElement ? <><div className="inspector-title"><div><span className="eyebrow">SELECTED ELEMENT</span><strong>{selectedElement.type}</strong></div><span className="selection-chip"><Check size={12} /> synced</span></div><label className="field-label">Content<textarea value={selectedElement.text} onChange={(event) => updateSelectedElement({ text: event.target.value })} /></label><div className="field-grid"><label className="field-label">X<input type="number" value={selectedElement.x} onChange={(event) => updateSelectedElement({ x: Number(event.target.value) })} /></label><label className="field-label">Y<input type="number" value={selectedElement.y} onChange={(event) => updateSelectedElement({ y: Number(event.target.value) })} /></label><label className="field-label">Width<input type="number" value={selectedElement.width} onChange={(event) => updateSelectedElement({ width: Number(event.target.value) })} /></label><label className="field-label">Height<input type="number" value={selectedElement.height} onChange={(event) => updateSelectedElement({ height: Number(event.target.value) })} /></label></div><div className="inspector-divider" /><div className="inspector-row"><span>History</span><span className="muted">Manual change</span></div><div className="inspector-row"><span>Layer</span><span className="muted">{slide.elements.indexOf(selectedElement) + 1} of {slide.elements.length}</span></div></> : <div className="inspector-empty"><PanelRight size={21} /><strong>Select an element</strong><span>Choose text, metrics, or shapes on the canvas to edit their content and geometry.</span></div>}</div><div className="agent-mini-card"><div className="agent-mini-header"><span className="brand-mark small"><Sparkles size={13} /></span><strong>Ask Osamah Agent</strong></div><div className="agent-mini-input"><input value={prompt} onChange={(event) => setPrompt(event.target.value)} onKeyDown={(event) => event.key === "Enter" && generatePresentation()} placeholder="Create or refine this deck..." /><button onClick={generatePresentation}><Send size={14} /></button></div><div className="suggestion-row"><button onClick={() => setPrompt("Create a sharper opening slide")}>Redesign slide</button><button onClick={() => setPrompt("Review the narrative")}>Review deck</button></div></div></aside>
  </div>
}

function AgentPanel({ state, input, setInput, onRun }: { state: WorkspaceState; input: string; setInput: (value: string) => void; onRun: () => void }) {
  return <aside className="agent-panel"><div className="agent-panel-header"><div><span className="eyebrow">OSAMAH AGENT</span><h2>Agent activity</h2></div><span className="live-chip"><span className="status-dot" /> live</span></div><div className="agent-context"><div className="context-icon"><ShieldCheck size={16} /></div><div><strong>Context loaded</strong><span>{state.project.name} · active file · 3 skills</span></div></div><div className="activity-list">{state.activities.slice(-6).map((activity) => <div className="activity-item" key={activity.id}><div className={activity.status === "active" ? "activity-marker active" : activity.status === "done" ? "activity-marker done" : "activity-marker"}>{activity.status === "done" ? <Check size={11} /> : activity.status === "active" ? <span /> : null}</div><div><strong>{activity.label}</strong><span>{activity.detail}</span></div></div>)}</div><div className="skills-block"><div className="section-label">AVAILABLE SKILLS</div><div className="skill-list">{state.skills.map((skill) => <div className="skill-row" key={skill.id}><span className="skill-dot" /><span>{skill.name}</span><span className="muted">{skill.source}</span></div>)}</div></div><div className="agent-composer"><textarea value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={(event) => event.key === "Enter" && !event.shiftKey && (event.preventDefault(), onRun())} placeholder="Ask Osamah Agent to plan, inspect, or change the workspace..." /><div className="composer-footer"><span><kbd>⌘ ↵</kbd> to run</span><button className="send-button" onClick={onRun}><Send size={15} /></button></div></div></aside>
}

function ApprovalCard({ approval, onApprove, onReject }: { approval: WorkspaceState["approvals"][number]; onApprove: () => void; onReject: () => void }) {
  return <div className="approval-overlay"><div className="approval-card"><div className="approval-icon"><ShieldCheck size={20} /></div><div className="approval-copy"><span className="eyebrow">HUMAN APPROVAL REQUIRED</span><h3>Agent wants to: {approval.title}</h3><p>{approval.description}</p><div className="approval-meta"><span className="risk-tag">{approval.risk} risk</span><span className="muted">This action will be recorded in history.</span></div></div><div className="approval-actions"><button className="quiet-button" onClick={onReject}><X size={14} /> Cancel</button><button className="primary-button" onClick={onApprove}><Check size={14} /> Approve</button></div></div></div>
}

export default App
