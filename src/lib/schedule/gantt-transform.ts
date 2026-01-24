import type { ScheduleTaskData, TaskDependencyData } from "./types"

export interface FrappeTask {
  id: string
  name: string
  start: string
  end: string
  progress: number
  dependencies: string
  custom_class: string
}

export function transformToFrappeTasks(
  tasks: ScheduleTaskData[],
  dependencies: TaskDependencyData[]
): FrappeTask[] {
  // build dep lookup: successorId -> predecessorIds (FS only for visual lines)
  const predMap = new Map<string, string[]>()
  for (const dep of dependencies) {
    if (dep.type !== "FS") continue
    if (!predMap.has(dep.successorId)) {
      predMap.set(dep.successorId, [])
    }
    predMap.get(dep.successorId)!.push(dep.predecessorId)
  }

  return tasks.map((task) => {
    const preds = predMap.get(task.id) || []
    const depString = preds.join(", ")

    let progress = 0
    if (task.status === "COMPLETE") progress = 100
    else if (task.status === "IN_PROGRESS") progress = 50

    // frappe-gantt uses classList.add() which throws on spaces,
    // so we can only pass a single class name
    let customClass = `phase-${task.phase}`
    if (task.isCriticalPath) customClass = "critical-path"
    if (task.isMilestone) customClass = "milestone"

    return {
      id: task.id,
      name: task.title,
      start: task.startDate,
      end: task.endDateCalculated,
      progress,
      dependencies: depString,
      custom_class: customClass,
    }
  })
}
