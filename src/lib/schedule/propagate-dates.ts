import type {
  ScheduleTaskData,
  TaskDependencyData,
  WorkdayExceptionData,
} from "./types"
import { calculateEndDate, addBusinessDays } from "./business-days"

interface PropagationResult {
  updatedTasks: Map<string, { startDate: string; endDateCalculated: string }>
}

export function propagateDates(
  changedTaskId: string,
  tasks: ScheduleTaskData[],
  dependencies: TaskDependencyData[],
  exceptions: WorkdayExceptionData[] = []
): PropagationResult {
  const taskMap = new Map(tasks.map((t) => [t.id, { ...t }]))
  const updates = new Map<string, { startDate: string; endDateCalculated: string }>()

  // build successor map (only FS deps propagate dates)
  const successorDeps = new Map<string, TaskDependencyData[]>()
  for (const dep of dependencies) {
    if (dep.type !== "FS") continue
    if (!successorDeps.has(dep.predecessorId)) {
      successorDeps.set(dep.predecessorId, [])
    }
    successorDeps.get(dep.predecessorId)!.push(dep)
  }

  // BFS from changed task through successors
  const queue = [changedTaskId]
  const visited = new Set<string>()

  while (queue.length > 0) {
    const currentId = queue.shift()!
    if (visited.has(currentId)) continue
    visited.add(currentId)

    const current = taskMap.get(currentId)
    if (!current) continue

    const deps = successorDeps.get(currentId) || []
    for (const dep of deps) {
      const successor = taskMap.get(dep.successorId)
      if (!successor) continue

      // successor starts after predecessor ends + lag
      const newStart = addBusinessDays(
        current.endDateCalculated,
        1 + dep.lagDays,
        exceptions
      )
      const newEnd = calculateEndDate(newStart, successor.workdays, exceptions)

      if (newStart !== successor.startDate || newEnd !== successor.endDateCalculated) {
        successor.startDate = newStart
        successor.endDateCalculated = newEnd
        updates.set(successor.id, {
          startDate: newStart,
          endDateCalculated: newEnd,
        })
        queue.push(successor.id)
      }
    }
  }

  return { updatedTasks: updates }
}
