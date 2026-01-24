"use client"

import { useState, useCallback, useEffect } from "react"
import {
  useReactTable,
  getCoreRowModel,
  getGroupedRowModel,
  flexRender,
  type ColumnDef,
} from "@tanstack/react-table"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  IconPlus,
  IconLink,
  IconGripVertical,
  IconTrash,
} from "@tabler/icons-react"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { TaskFormDialog } from "./task-form-dialog"
import { DependencyDialog } from "./dependency-dialog"
import {
  deleteTask,
  updateTaskStatus,
  reorderTasks,
} from "@/app/actions/schedule"
import { getPhaseColor } from "@/lib/schedule/phase-colors"
import type {
  ScheduleTaskData,
  TaskDependencyData,
  TaskStatus,
} from "@/lib/schedule/types"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface ScheduleListViewProps {
  projectId: string
  tasks: ScheduleTaskData[]
  dependencies: TaskDependencyData[]
}

const statusOptions: { value: TaskStatus; label: string }[] = [
  { value: "PENDING", label: "Pending" },
  { value: "IN_PROGRESS", label: "In Progress" },
  { value: "COMPLETE", label: "Complete" },
  { value: "BLOCKED", label: "Blocked" },
]

function SortableRow({
  row,
  children,
}: {
  row: { id: string }
  children: React.ReactNode
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: row.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <TableRow ref={setNodeRef} style={style}>
      <TableCell className="w-8">
        <IconGripVertical
          className="size-4 text-muted-foreground cursor-grab"
          {...attributes}
          {...listeners}
        />
      </TableCell>
      {children}
    </TableRow>
  )
}

export function ScheduleListView({
  projectId,
  tasks,
  dependencies,
}: ScheduleListViewProps) {
  const router = useRouter()
  const [taskFormOpen, setTaskFormOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<ScheduleTaskData | null>(null)
  const [depDialogOpen, setDepDialogOpen] = useState(false)
  const [localTasks, setLocalTasks] = useState(tasks)

  useEffect(() => {
    setLocalTasks(tasks)
  }, [tasks])

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleStatusChange = useCallback(
    async (taskId: string, status: TaskStatus) => {
      const result = await updateTaskStatus(taskId, status)
      if (result.success) {
        router.refresh()
      } else {
        toast.error(result.error)
      }
    },
    [router]
  )

  const handleDelete = useCallback(
    async (taskId: string) => {
      const result = await deleteTask(taskId)
      if (result.success) {
        router.refresh()
      } else {
        toast.error(result.error)
      }
    },
    [router]
  )

  const handleDragEnd = useCallback(
    async (event: DragEndEvent) => {
      const { active, over } = event
      if (!over || active.id === over.id) return

      const oldIndex = localTasks.findIndex((t) => t.id === active.id)
      const newIndex = localTasks.findIndex((t) => t.id === over.id)
      const reordered = arrayMove(localTasks, oldIndex, newIndex)
      setLocalTasks(reordered)

      const items = reordered.map((t, i) => ({ id: t.id, sortOrder: i }))
      await reorderTasks(projectId, items)
      router.refresh()
    },
    [localTasks, projectId, router]
  )

  const columns: ColumnDef<ScheduleTaskData>[] = [
    {
      accessorKey: "title",
      header: "Task",
      cell: ({ row }) => (
        <button
          className="text-left font-medium hover:underline"
          onClick={() => {
            setEditingTask(row.original)
            setTaskFormOpen(true)
          }}
        >
          {row.original.title}
          {row.original.isMilestone && (
            <span className="ml-2 text-xs text-muted-foreground">◆</span>
          )}
        </button>
      ),
    },
    {
      accessorKey: "startDate",
      header: "Start",
      cell: ({ row }) => (
        <span className="text-sm text-muted-foreground">
          {row.original.startDate}
        </span>
      ),
    },
    {
      accessorKey: "endDateCalculated",
      header: "End",
      cell: ({ row }) => (
        <span className="text-sm text-muted-foreground">
          {row.original.endDateCalculated}
        </span>
      ),
    },
    {
      accessorKey: "workdays",
      header: "Days",
      cell: ({ row }) => (
        <span className="text-sm">{row.original.workdays}</span>
      ),
    },
    {
      accessorKey: "phase",
      header: "Phase",
      cell: ({ row }) => {
        const colors = getPhaseColor(row.original.phase)
        return (
          <Badge variant="secondary" className={colors.badge}>
            {row.original.phase}
          </Badge>
        )
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <Select
          value={row.original.status}
          onValueChange={(val) =>
            handleStatusChange(row.original.id, val as TaskStatus)
          }
        >
          <SelectTrigger className="h-7 w-[120px] text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {statusOptions.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ),
    },
    {
      id: "criticalPath",
      header: "CP",
      cell: ({ row }) =>
        row.original.isCriticalPath ? (
          <Badge variant="destructive" className="text-xs">
            Critical
          </Badge>
        ) : null,
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <Button
          variant="ghost"
          size="icon"
          className="size-7"
          onClick={() => handleDelete(row.original.id)}
        >
          <IconTrash className="size-4" />
        </Button>
      ),
    },
  ]

  const table = useReactTable({
    data: localTasks,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (row) => row.id,
  })

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <Button
          size="sm"
          onClick={() => {
            setEditingTask(null)
            setTaskFormOpen(true)
          }}
        >
          <IconPlus className="size-4 mr-1" />
          Add Task
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => setDepDialogOpen(true)}
          disabled={localTasks.length < 2}
        >
          <IconLink className="size-4 mr-1" />
          Add Dependency
        </Button>
      </div>

      <div className="rounded-md border">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  <TableHead className="w-8" />
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              <SortableContext
                items={localTasks.map((t) => t.id)}
                strategy={verticalListSortingStrategy}
              >
                {table.getRowModel().rows.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length + 1}
                      className="text-center py-8 text-muted-foreground"
                    >
                      No tasks yet. Click &quot;Add Task&quot; to get started.
                    </TableCell>
                  </TableRow>
                ) : (
                  table.getRowModel().rows.map((row) => (
                    <SortableRow key={row.id} row={row}>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </SortableRow>
                  ))
                )}
              </SortableContext>
            </TableBody>
          </Table>
        </DndContext>
      </div>

      <TaskFormDialog
        open={taskFormOpen}
        onOpenChange={setTaskFormOpen}
        projectId={projectId}
        editingTask={editingTask}
      />

      <DependencyDialog
        open={depDialogOpen}
        onOpenChange={setDepDialogOpen}
        projectId={projectId}
        tasks={localTasks}
        dependencies={dependencies}
      />
    </div>
  )
}
