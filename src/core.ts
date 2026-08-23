import type {
  ActivityItem,
  ApprovalRequest,
  Presentation,
  Project,
  ProjectFile,
  Slide,
  SlideElement,
  WorkspaceState,
} from "./types"

export const initialProject: Project = {
  id: "osamah-workspace",
  name: "osamah-agent",
  branch: "main",
  files: [
    {
      path: "src/agent-runtime.ts",
      language: "TypeScript",
      content: "export interface AgentRuntime {\n  run(request: string): AsyncIterable<AgentEvent>\n}\n",
    },
    {
      path: "presentations/architecture.json",
      language: "JSON",
      content: "{\n  \"title\": \"Osamah Agent Architecture\",\n  \"slides\": 8\n}\n",
    },
    {
      path: "README.md",
      language: "Markdown",
      content: "# Osamah Agent\n\nAI Development + Presentation Engineering Workspace.\n",
    },
  ],
}

const initialSlides: Slide[] = [
  {
    id: "slide-1",
    title: "One workspace. Two modes.",
    subtitle: "Development intelligence meets presentation craft.",
    elements: [
      { id: "el-1", type: "text", x: 72, y: 92, width: 560, height: 88, text: "One workspace.\nTwo modes.", color: "#f8fafc" },
      { id: "el-2", type: "text", x: 76, y: 220, width: 420, height: 40, text: "OSAMAH AGENT / 2026", color: "#8b9ab1" },
      { id: "el-3", type: "shape", x: 76, y: 346, width: 168, height: 10, text: "", color: "#8b5cf6" },
    ],
  },
  {
    id: "slide-2",
    title: "The agent understands the room",
    subtitle: "Project, file, slide, skill, session, and provider context travel together.",
    elements: [
      { id: "el-4", type: "metric", x: 76, y: 110, width: 180, height: 128, text: "01\nShared context", color: "#23d5ab" },
      { id: "el-5", type: "metric", x: 286, y: 110, width: 180, height: 128, text: "02\nApproval gates", color: "#8b5cf6" },
      { id: "el-6", type: "metric", x: 496, y: 110, width: 180, height: 128, text: "03\nEditable output", color: "#f59e0b" },
    ],
  },
  {
    id: "slide-3",
    title: "Open architecture by design",
    subtitle: "Product-owned contracts keep engines replaceable and workflows observable.",
    elements: [
      { id: "el-7", type: "text", x: 76, y: 110, width: 520, height: 50, text: "OpenCode → Agent Core", color: "#f8fafc" },
      { id: "el-8", type: "text", x: 76, y: 188, width: 520, height: 50, text: "Presenton → Presentation Engine", color: "#f8fafc" },
      { id: "el-9", type: "text", x: 76, y: 266, width: 520, height: 50, text: "StarryKit → Skill-driven visual workflow", color: "#f8fafc" },
    ],
  },
]

export const initialPresentation: Presentation = {
  id: "architecture-deck",
  title: "Osamah Agent Architecture",
  subtitle: "AI Development + Presentation Engineering Workspace",
  slides: initialSlides,
  activeSlideId: "slide-1",
}

export const initialActivities: ActivityItem[] = [
  { id: "activity-1", label: "Understanding request", detail: "Ready for a development or presentation task", kind: "understanding", status: "active" },
  { id: "activity-2", label: "Project context loaded", detail: "osamah-agent / main", kind: "context", status: "done" },
  { id: "activity-3", label: "Skills indexed", detail: "12 skills available across 3 roots", kind: "analysis", status: "done" },
  { id: "activity-4", label: "Approval boundary ready", detail: "Destructive operations require confirmation", kind: "approval", status: "done" },
]

export const initialApprovals: ApprovalRequest[] = [
  {
    id: "approval-delete-slide",
    title: "Delete slide 3",
    description: "The agent proposed removing the selected slide from the presentation.",
    risk: "medium",
    status: "pending",
  },
]

export const initialState: WorkspaceState = {
  mode: "development",
  project: initialProject,
  presentation: initialPresentation,
  selectedFilePath: initialProject.files[0].path,
  selectedElementId: null,
  activities: initialActivities,
  approvals: initialApprovals,
  skills: [
    { id: "development", name: "development", description: "Plan, implement, debug, test, and review code changes.", source: ".opencode/skills", enabled: true },
    { id: "presentation-create", name: "presentation-create", description: "Shape a narrative and create an editable deck.", source: ".claude/skills", enabled: true },
    { id: "presentation-review", name: "presentation-review", description: "Review story, hierarchy, density, and visual consistency.", source: ".agents/skills", enabled: true },
  ],
  providers: [
    { id: "ollama", name: "Ollama · local", kind: "local", status: "ready" },
    { id: "openai-compatible", name: "OpenAI-compatible", kind: "openai-compatible", status: "configured" },
    { id: "anthropic", name: "Anthropic", kind: "cloud", status: "not-configured" },
  ],
  history: ["Workspace initialized", "Reference engines mapped", "Approval gates enabled"],
}

export function activeSlide(state: WorkspaceState): Slide {
  return state.presentation.slides.find((slide) => slide.id === state.presentation.activeSlideId) ?? state.presentation.slides[0]
}

export function updateSlideElement(presentation: Presentation, slideId: string, elementId: string, patch: Partial<SlideElement>): Presentation {
  return {
    ...presentation,
    slides: presentation.slides.map((slide) =>
      slide.id !== slideId
        ? slide
        : { ...slide, elements: slide.elements.map((element) => (element.id === elementId ? { ...element, ...patch } : element)) },
    ),
  }
}

export function createDeckFromPrompt(prompt: string): Presentation {
  const normalized = prompt.trim() || "A focused AI strategy"
  return {
    id: `deck-${Date.now()}`,
    title: normalized,
    subtitle: "Generated locally from the active workspace context",
    activeSlideId: "generated-1",
    slides: [
      { id: "generated-1", title: normalized, subtitle: "A clear opening frame for the story.", elements: [{ id: "generated-el-1", type: "text", x: 76, y: 100, width: 620, height: 92, text: normalized, color: "#f8fafc" }] },
      { id: "generated-2", title: "Why it matters", subtitle: "Turn the request into one memorable proof point.", elements: [{ id: "generated-el-2", type: "metric", x: 76, y: 120, width: 260, height: 140, text: "01\nSignal", color: "#23d5ab" }] },
      { id: "generated-3", title: "The next move", subtitle: "Close with an action the audience can remember.", elements: [{ id: "generated-el-3", type: "text", x: 76, y: 124, width: 560, height: 72, text: "Make the next step\nvisible.", color: "#f59e0b" }] },
    ],
  }
}

export function applyApproval(state: WorkspaceState, approvalId: string, status: "approved" | "rejected"): WorkspaceState {
  return {
    ...state,
    approvals: state.approvals.map((approval) => (approval.id === approvalId ? { ...approval, status } : approval)),
    history: [...state.history, `${status === "approved" ? "Approved" : "Rejected"}: ${approvalId}`],
  }
}

export function updateFileContent(files: ProjectFile[], path: string, content: string): ProjectFile[] {
  return files.map((file) => (file.path === path ? { ...file, content } : file))
}
