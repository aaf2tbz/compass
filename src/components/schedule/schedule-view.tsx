"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScheduleListView } from "./schedule-list-view"
import { ScheduleGanttView } from "./schedule-gantt-view"
import type { ScheduleData } from "@/lib/schedule/types"

interface ScheduleViewProps {
  projectId: string
  projectName: string
  initialData: ScheduleData
}

export function ScheduleView({
  projectId,
  projectName,
  initialData,
}: ScheduleViewProps) {
  const [activeTab, setActiveTab] = useState("list")

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">{projectName} - Schedule</h1>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="list">List</TabsTrigger>
          <TabsTrigger value="gantt">Gantt</TabsTrigger>
        </TabsList>

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
    </div>
  )
}
