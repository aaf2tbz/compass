"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScheduleToolbar } from "./schedule-toolbar"
import { ScheduleListView } from "./schedule-list-view"
import { ScheduleGanttView } from "./schedule-gantt-view"
import { ScheduleCalendarView } from "./schedule-calendar-view"
import { WorkdayExceptionsView } from "./workday-exceptions-view"
import { ScheduleBaselineView } from "./schedule-baseline-view"
import { TaskFormDialog } from "./task-form-dialog"
import type {
  ScheduleData,
  ScheduleBaselineData,
} from "@/lib/schedule/types"

type TopTab = "schedule" | "baseline" | "exceptions"
type ScheduleSubTab = "calendar" | "list" | "gantt"

interface ScheduleViewProps {
  projectId: string
  projectName: string
  initialData: ScheduleData
  baselines: ScheduleBaselineData[]
}

export function ScheduleView({
  projectId,
  projectName,
  initialData,
  baselines,
}: ScheduleViewProps) {
  const [topTab, setTopTab] = useState<TopTab>("schedule")
  const [subTab, setSubTab] = useState<ScheduleSubTab>("list")
  const [taskFormOpen, setTaskFormOpen] = useState(false)

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">
          {projectName} - Schedule
        </h1>
      </div>

      <Tabs
        value={topTab}
        onValueChange={(v) => setTopTab(v as TopTab)}
      >
        <TabsList>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
          <TabsTrigger value="baseline">Baseline</TabsTrigger>
          <TabsTrigger value="exceptions">
            Workday Exceptions
          </TabsTrigger>
        </TabsList>

        <TabsContent value="schedule" className="mt-0">
          <ScheduleToolbar onNewItem={() => setTaskFormOpen(true)} />

          <Tabs
            value={subTab}
            onValueChange={(v) => setSubTab(v as ScheduleSubTab)}
          >
            <TabsList className="bg-transparent border-b rounded-none h-auto p-0 gap-4">
              <TabsTrigger
                value="calendar"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none pb-2"
              >
                Calendar
              </TabsTrigger>
              <TabsTrigger
                value="list"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none pb-2"
              >
                List
              </TabsTrigger>
              <TabsTrigger
                value="gantt"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none pb-2"
              >
                Gantt
              </TabsTrigger>
            </TabsList>

            <TabsContent value="calendar" className="mt-4">
              <ScheduleCalendarView
                projectId={projectId}
                tasks={initialData.tasks}
                exceptions={initialData.exceptions}
              />
            </TabsContent>

            <TabsContent value="list" className="mt-4">
              <ScheduleListView
                projectId={projectId}
                tasks={initialData.tasks}
                dependencies={initialData.dependencies}
              />
            </TabsContent>

            <TabsContent value="gantt" className="mt-4">
              <ScheduleGanttView
                projectId={projectId}
                tasks={initialData.tasks}
                dependencies={initialData.dependencies}
              />
            </TabsContent>
          </Tabs>
        </TabsContent>

        <TabsContent value="baseline" className="mt-4">
          <ScheduleBaselineView
            projectId={projectId}
            baselines={baselines}
            currentTasks={initialData.tasks}
          />
        </TabsContent>

        <TabsContent value="exceptions" className="mt-4">
          <WorkdayExceptionsView
            projectId={projectId}
            exceptions={initialData.exceptions}
          />
        </TabsContent>
      </Tabs>

      <TaskFormDialog
        open={taskFormOpen}
        onOpenChange={setTaskFormOpen}
        projectId={projectId}
        editingTask={null}
      />
    </div>
  )
}
