"use client"

import { useRef, useEffect, useState } from "react"
import type { FrappeTask } from "@/lib/schedule/gantt-transform"
import "./gantt.css"

type ViewMode = "Day" | "Week" | "Month"

interface GanttChartProps {
  tasks: FrappeTask[]
  viewMode: ViewMode
  onDateChange?: (
    task: FrappeTask,
    start: Date,
    end: Date
  ) => void
  onProgressChange?: (task: FrappeTask, progress: number) => void
}

export function GanttChart({
  tasks,
  viewMode,
  onDateChange,
  onProgressChange,
}: GanttChartProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const ganttRef = useRef<any>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (!containerRef.current || tasks.length === 0) return

    let cancelled = false

    async function initGantt() {
      const { default: Gantt } = await import("frappe-gantt")
      if (cancelled || !containerRef.current) return

      // clear previous gantt instance by removing child nodes
      while (containerRef.current.firstChild) {
        containerRef.current.removeChild(containerRef.current.firstChild)
      }

      const ganttTasks = tasks.map((t) => ({
        id: t.id,
        name: t.name,
        start: t.start,
        end: t.end,
        progress: t.progress,
        dependencies: t.dependencies,
        custom_class: t.custom_class,
      }))

      ganttRef.current = new Gantt(containerRef.current, ganttTasks, {
        view_mode: viewMode,
        on_date_change: (task: any, start: Date, end: Date) => {
          if (onDateChange) {
            const original = tasks.find((t) => t.id === task.id)
            if (original) onDateChange(original, start, end)
          }
        },
        on_progress_change: (task: any, progress: number) => {
          if (onProgressChange) {
            const original = tasks.find((t) => t.id === task.id)
            if (original) onProgressChange(original, progress)
          }
        },
      })

      // remove overflow from inner gantt-container so popup isn't clipped
      // the parent wrapper handles horizontal scrolling instead
      const ganttContainer = containerRef.current.querySelector(
        ".gantt-container"
      ) as HTMLElement | null
      if (ganttContainer) {
        ganttContainer.style.overflow = "visible"
      }

      setLoaded(true)
    }

    initGantt()
    return () => { cancelled = true }
  }, [tasks, viewMode, onDateChange, onProgressChange])

  useEffect(() => {
    if (ganttRef.current && loaded) {
      ganttRef.current.change_view_mode(viewMode)
    }
  }, [viewMode, loaded])

  if (tasks.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        Add tasks in the List view to see them on the Gantt chart.
      </div>
    )
  }

  return (
    <div className="gantt-wrapper relative overflow-x-auto">
      <div ref={containerRef} />
    </div>
  )
}
