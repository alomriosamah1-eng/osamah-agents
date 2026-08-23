export type Mode = "development" | "presentations"

export type ActivityKind = "understanding" | "context" | "analysis" | "design" | "tool" | "approval" | "complete"

export type ActivityStatus = "done" | "active" | "pending"

export interface ActivityItem {
  id: string
  label: string
  detail: string
  kind: ActivityKind
  status: ActivityStatus
}

export interface ApprovalRequest {
  id: string
  title: string
  description: string
  risk: "low" | "medium" | "high"
  status: "pending" | "approved" | "rejected"
}

export interface SkillMeta {
  id: string
  name: string
  description: string
  source: ".opencode/skills" | ".claude/skills" | ".agents/skills"
  enabled: boolean
}

export interface ProviderMeta {
  id: string
  name: string
  kind: "local" | "openai-compatible" | "cloud"
  status: "ready" | "configured" | "not-configured"
}

export interface ProjectFile {
  path: string
  language: string
  content: string
}

export interface Project {
  id: string
  name: string
  branch: string
  files: ProjectFile[]
}

export interface SlideElement {
  id: string
  type: "text" | "shape" | "metric"
  x: number
  y: number
  width: number
  height: number
  text: string
  color?: string
}

export interface Slide {
  id: string
  title: string
  subtitle: string
  elements: SlideElement[]
}

export interface Presentation {
  id: string
  title: string
  subtitle: string
  slides: Slide[]
  activeSlideId: string
}

export interface WorkspaceState {
  mode: Mode
  project: Project
  presentation: Presentation
  selectedFilePath: string
  selectedElementId: string | null
  activities: ActivityItem[]
  approvals: ApprovalRequest[]
  skills: SkillMeta[]
  providers: ProviderMeta[]
  history: string[]
}
