"use client"

import { useState, useCallback } from "react"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { IconPencil, IconPlus } from "@tabler/icons-react"
import { GanttChart } from "./gantt-chart"
import { TaskFormDialog } from "./task-form-dialog"
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
  const [showPhases, setShowPhases] = useState(false)
  const [showCriticalPath, setShowCriticalPath] = useState(false)
  const [taskFormOpen, setTaskFormOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<ScheduleTaskData | null>(
    null
  )

  const filteredTasks = showCriticalPath
    ? tasks.filter((t) => t.isCriticalPath)
    : tasks

  const frappeTasks = transformToFrappeTasks(filteredTasks, dependencies)

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

  const scrollToToday = () => {
    const todayEl = document.querySelector(".gantt-container .today-highlight")
    if (todayEl) {
      todayEl.scrollIntoView({ behavior: "smooth", inline: "center" })
    }
  }

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
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
          <Button
            variant="outline"
            size="sm"
            onClick={scrollToToday}
          >
            Today
          </Button>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <Switch
              checked={showPhases}
              onCheckedChange={setShowPhases}
              className="scale-75"
            />
            <span className="text-xs text-muted-foreground">
              Phases
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Switch
              checked={showCriticalPath}
              onCheckedChange={setShowCriticalPath}
              className="scale-75"
            />
            <span className="text-xs text-muted-foreground">
              Critical Path
            </span>
          </div>
        </div>
      </div>

      <ResizablePanelGroup
        orientation="horizontal"
        className="border rounded-md flex-1 min-h-[300px]"
      >
        <ResizablePanel defaultSize={30} minSize={20}>
          <div className="h-full overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">Title</TableHead>
                  <TableHead className="text-xs w-[80px]">
                    Start
                  </TableHead>
                  <TableHead className="text-xs w-[60px]">
                    Days
                  </TableHead>
                  <TableHead className="w-[60px]" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTasks.map((task) => (
                  <TableRow key={task.id}>
                    <TableCell className="text-xs py-1.5 truncate max-w-[140px]">
                      <span
                        className={
                          showPhases
                            ? "border-l-2 pl-1.5 border-primary"
                            : ""
                        }
                      >
                        {task.title}
                      </span>
                    </TableCell>
                    <TableCell className="text-xs py-1.5 text-muted-foreground">
                      {task.startDate.slice(5)}
                    </TableCell>
                    <TableCell className="text-xs py-1.5">
                      {task.workdays}
                    </TableCell>
                    <TableCell className="py-1.5">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-6"
                        onClick={() => {
                          setEditingTask(task)
                          setTaskFormOpen(true)
                        }}
                      >
                        <IconPencil className="size-3" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={4} className="py-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs w-full justify-start"
                      onClick={() => {
                        setEditingTask(null)
                        setTaskFormOpen(true)
                      }}
                    >
                      <IconPlus className="size-3 mr-1" />
                      Add Task
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle />

        <ResizablePanel defaultSize={70} minSize={40}>
          <div className="h-full overflow-auto p-2">
            <GanttChart
              tasks={frappeTasks}
              viewMode={viewMode}
              onDateChange={handleDateChange}
            />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>

      <TaskFormDialog
        open={taskFormOpen}
        onOpenChange={setTaskFormOpen}
        projectId={projectId}
        editingTask={editingTask}
      />
    </div>
  )
}
