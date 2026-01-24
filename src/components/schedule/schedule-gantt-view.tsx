"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { GanttChart } from "./gantt-chart"
import "./gantt.css"
import { transformToFrappeTasks } from "@/lib/schedule/gantt-transform"
import { updateTask } from "@/app/actions/schedule"
import { countBusinessDays } from "@/lib/schedule/business-days"
import type {
  ScheduleTaskData,
  TaskDependencyData,
} from "@/lib/schedule/types"
import type { FrappeTask } from "@/lib/schedule/gantt-transform"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { format } from "date-fns"

type ViewMode = "Day" | "Week" | "Month"

interface ScheduleGanttViewProps {
  projectId: string
  tasks: ScheduleTaskData[]
  dependencies: TaskDependencyData[]
}

export function ScheduleGanttView({
  projectId,
  tasks,
  dependencies,
}: ScheduleGanttViewProps) {
  const router = useRouter()
  const [viewMode, setViewMode] = useState<ViewMode>("Week")

  const frappeTasks = transformToFrappeTasks(tasks, dependencies)

  const handleDateChange = useCallback(
    async (task: FrappeTask, start: Date, end: Date) => {
      const startDate = format(start, "yyyy-MM-dd")
      const endDate = format(end, "yyyy-MM-dd")
      const workdays = countBusinessDays(startDate, endDate)

      const result = await updateTask(task.id, {
        startDate,
        workdays: Math.max(1, workdays),
      })

      if (result.success) {
        router.refresh()
      } else {
        toast.error(result.error)
      }
    },
    [router]
  )

  return (
    <div>
      <div className="flex gap-1 mb-4">
        {(["Day", "Week", "Month"] as ViewMode[]).map((mode) => (
          <Button
            key={mode}
            size="sm"
            variant={viewMode === mode ? "default" : "outline"}
            onClick={() => setViewMode(mode)}
          >
            {mode}
          </Button>
        ))}
      </div>

      <GanttChart
        tasks={frappeTasks}
        viewMode={viewMode}
        onDateChange={handleDateChange}
      />
    </div>
  )
}
