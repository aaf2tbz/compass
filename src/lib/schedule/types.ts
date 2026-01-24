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

export type ExceptionCategory =
  | "national_holiday"
  | "state_holiday"
  | "vacation_day"
  | "company_holiday"
  | "weather_day"

export type ExceptionRecurrence = "one_time" | "yearly"

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
  percentComplete: number
  assignedTo: string | null
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

export interface WorkdayExceptionData {
  id: string
  projectId: string
  title: string
  startDate: string
  endDate: string
  type: string
  category: ExceptionCategory
  recurrence: ExceptionRecurrence
  notes: string | null
  createdAt: string
  updatedAt: string
}

export interface ScheduleBaselineData {
  id: string
  projectId: string
  name: string
  snapshotData: string
  createdAt: string
}

export interface ScheduleData {
  tasks: ScheduleTaskData[]
  dependencies: TaskDependencyData[]
  exceptions: WorkdayExceptionData[]
}
