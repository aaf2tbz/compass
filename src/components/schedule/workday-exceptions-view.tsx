"use client"

import { useState, useCallback } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { IconPlus, IconPencil, IconTrash } from "@tabler/icons-react"
import { WorkdayExceptionFormDialog } from "./workday-exception-form-dialog"
import { deleteWorkdayException } from "@/app/actions/workday-exceptions"
import type { WorkdayExceptionData } from "@/lib/schedule/types"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { format, parseISO } from "date-fns"

interface WorkdayExceptionsViewProps {
  projectId: string
  exceptions: WorkdayExceptionData[]
}

function formatDate(dateStr: string): string {
  try {
    return format(parseISO(dateStr), "MMM d, yyyy")
  } catch {
    return dateStr
  }
}

function calcDuration(start: string, end: string): number {
  const s = parseISO(start)
  const e = parseISO(end)
  const diff = Math.ceil(
    (e.getTime() - s.getTime()) / (1000 * 60 * 60 * 24)
  )
  return diff + 1
}

const categoryLabels: Record<string, string> = {
  national_holiday: "National Holiday",
  state_holiday: "State Holiday",
  vacation_day: "Vacation Day",
  company_holiday: "Company Holiday",
  weather_day: "Weather Day",
}

export function WorkdayExceptionsView({
  projectId,
  exceptions,
}: WorkdayExceptionsViewProps) {
  const router = useRouter()
  const [formOpen, setFormOpen] = useState(false)
  const [editingException, setEditingException] =
    useState<WorkdayExceptionData | null>(null)

  const handleDelete = useCallback(
    async (id: string) => {
      const result = await deleteWorkdayException(id)
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
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium">Workday Exceptions</h2>
        <Button
          size="sm"
          onClick={() => {
            setEditingException(null)
            setFormOpen(true)
          }}
        >
          <IconPlus className="size-4 mr-1" />
          Workday Exception
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Start</TableHead>
              <TableHead>End</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Recurrence</TableHead>
              <TableHead>Notes</TableHead>
              <TableHead className="w-[80px]" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {exceptions.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="text-center py-8 text-muted-foreground"
                >
                  No workday exceptions defined.
                </TableCell>
              </TableRow>
            ) : (
              exceptions.map((ex) => (
                <TableRow key={ex.id}>
                  <TableCell className="font-medium text-sm">
                    {ex.title}
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {formatDate(ex.startDate)}
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {formatDate(ex.endDate)}
                  </TableCell>
                  <TableCell className="text-xs">
                    {calcDuration(ex.startDate, ex.endDate)} days
                  </TableCell>
                  <TableCell className="text-xs">
                    {categoryLabels[ex.category] ?? ex.category}
                  </TableCell>
                  <TableCell className="text-xs capitalize">
                    {ex.recurrence.replace("_", " ")}
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground truncate max-w-[120px]">
                    {ex.notes || "-"}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-7"
                        onClick={() => {
                          setEditingException(ex)
                          setFormOpen(true)
                        }}
                      >
                        <IconPencil className="size-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-7"
                        onClick={() => handleDelete(ex.id)}
                      >
                        <IconTrash className="size-3.5" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <WorkdayExceptionFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        projectId={projectId}
        editingException={editingException}
      />
    </div>
  )
}
