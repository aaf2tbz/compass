export type TaskStatus = "PENDING" | "IN_PROGRESS" | "COMPLETE" | "BLOCKED"

export type DependencyType = "FS" | "SS" | "FF" | "SF"

export type ConstructionPhase =
  | "preconstruction"
  | "sitework"
  | "foundation"
  | "framing"
  | "roofing"
  | "electrical"
  | "plumbing"
  | "hvac"
  | "insulation"
  | "drywall"
  | "finish"
  | "landscaping"
  | "closeout"

export interface ScheduleTaskData {
  id: string
  projectId: string
  title: string
  startDate: string
  workdays: number
  endDateCalculated: string
  phase: string
  status: TaskStatus
  isCriticalPath: boolean
  isMilestone: boolean
  sortOrder: number
  createdAt: string
  updatedAt: string
}

export interface TaskDependencyData {
  id: string
  predecessorId: string
  successorId: string
  type: DependencyType
  lagDays: number
}

export interface ScheduleData {
  tasks: ScheduleTaskData[]
  dependencies: TaskDependencyData[]
}
