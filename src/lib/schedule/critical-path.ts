import type { ScheduleTaskData, TaskDependencyData } from "./types"
import { countBusinessDays } from "./business-days"

interface CpmNode {
  id: string
  duration: number
  earlyStart: number
  earlyFinish: number
  lateStart: number
  lateFinish: number
  totalFloat: number
}

export function findCriticalPath(
  tasks: ScheduleTaskData[],
  dependencies: TaskDependencyData[]
): Set<string> {
  if (tasks.length === 0) return new Set()

  const nodes = new Map<string, CpmNode>()
  const successors = new Map<string, string[]>()
  const predecessors = new Map<string, string[]>()

  for (const task of tasks) {
    nodes.set(task.id, {
      id: task.id,
      duration: task.workdays,
      earlyStart: 0,
      earlyFinish: 0,
      lateStart: Infinity,
      lateFinish: Infinity,
      totalFloat: 0,
    })
    successors.set(task.id, [])
    predecessors.set(task.id, [])
  }

  // only FS dependencies for CPM calculation
  const fsDeps = dependencies.filter((d) => d.type === "FS")
  for (const dep of fsDeps) {
    if (nodes.has(dep.predecessorId) && nodes.has(dep.successorId)) {
      successors.get(dep.predecessorId)!.push(dep.successorId)
      predecessors.get(dep.successorId)!.push(dep.predecessorId)
    }
  }

  // topological sort
  const sorted = topologicalSort(tasks.map((t) => t.id), fsDeps)
  if (!sorted) return new Set()

  // forward pass
  for (const id of sorted) {
    const node = nodes.get(id)!
    const preds = predecessors.get(id)!

    if (preds.length === 0) {
      node.earlyStart = 0
    } else {
      node.earlyStart = Math.max(
        ...preds.map((p) => nodes.get(p)!.earlyFinish)
      )
    }
    node.earlyFinish = node.earlyStart + node.duration
  }

  // project duration
  const projectEnd = Math.max(...Array.from(nodes.values()).map((n) => n.earlyFinish))

  // backward pass
  for (let i = sorted.length - 1; i >= 0; i--) {
    const id = sorted[i]
    const node = nodes.get(id)!
    const succs = successors.get(id)!

    if (succs.length === 0) {
      node.lateFinish = projectEnd
    } else {
      node.lateFinish = Math.min(
        ...succs.map((s) => nodes.get(s)!.lateStart)
      )
    }
    node.lateStart = node.lateFinish - node.duration
    node.totalFloat = node.lateStart - node.earlyStart
  }

  // critical path = nodes with zero float
  const critical = new Set<string>()
  for (const [id, node] of nodes) {
    if (Math.abs(node.totalFloat) < 0.001) {
      critical.add(id)
    }
  }

  return critical
}

function topologicalSort(
  nodeIds: string[],
  deps: TaskDependencyData[]
): string[] | null {
  const inDegree = new Map<string, number>()
  const adjacency = new Map<string, string[]>()

  for (const id of nodeIds) {
    inDegree.set(id, 0)
    adjacency.set(id, [])
  }

  for (const dep of deps) {
    if (!inDegree.has(dep.predecessorId) || !inDegree.has(dep.successorId)) {
      continue
    }
    adjacency.get(dep.predecessorId)!.push(dep.successorId)
    inDegree.set(dep.successorId, inDegree.get(dep.successorId)! + 1)
  }

  const queue: string[] = []
  for (const [id, degree] of inDegree) {
    if (degree === 0) queue.push(id)
  }

  const result: string[] = []
  while (queue.length > 0) {
    const current = queue.shift()!
    result.push(current)
    for (const next of adjacency.get(current)!) {
      const newDegree = inDegree.get(next)! - 1
      inDegree.set(next, newDegree)
      if (newDegree === 0) queue.push(next)
    }
  }

  // cycle detected
  if (result.length !== nodeIds.length) return null

  return result
}
