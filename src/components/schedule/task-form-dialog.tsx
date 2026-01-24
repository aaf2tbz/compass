"use client"

import { useEffect, useMemo } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { createTask, updateTask } from "@/app/actions/schedule"
import { calculateEndDate } from "@/lib/schedule/business-days"
import type { ScheduleTaskData, ConstructionPhase } from "@/lib/schedule/types"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

const phases: { value: ConstructionPhase; label: string }[] = [
  { value: "preconstruction", label: "Preconstruction" },
  { value: "sitework", label: "Sitework" },
  { value: "foundation", label: "Foundation" },
  { value: "framing", label: "Framing" },
  { value: "roofing", label: "Roofing" },
  { value: "electrical", label: "Electrical" },
  { value: "plumbing", label: "Plumbing" },
  { value: "hvac", label: "HVAC" },
  { value: "insulation", label: "Insulation" },
  { value: "drywall", label: "Drywall" },
  { value: "finish", label: "Finish" },
  { value: "landscaping", label: "Landscaping" },
  { value: "closeout", label: "Closeout" },
]

const taskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  startDate: z.string().min(1, "Start date is required"),
  workdays: z.number().min(1, "Must be at least 1 day"),
  phase: z.string().min(1, "Phase is required"),
  isMilestone: z.boolean(),
  percentComplete: z.number().min(0).max(100),
  assignedTo: z.string(),
})

type TaskFormValues = z.infer<typeof taskSchema>

interface TaskFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  projectId: string
  editingTask: ScheduleTaskData | null
}

export function TaskFormDialog({
  open,
  onOpenChange,
  projectId,
  editingTask,
}: TaskFormDialogProps) {
  const router = useRouter()
  const isEditing = !!editingTask

  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      startDate: new Date().toISOString().split("T")[0],
      workdays: 5,
      phase: "preconstruction",
      isMilestone: false,
      percentComplete: 0,
      assignedTo: "",
    },
  })

  useEffect(() => {
    if (editingTask) {
      form.reset({
        title: editingTask.title,
        startDate: editingTask.startDate,
        workdays: editingTask.workdays,
        phase: editingTask.phase,
        isMilestone: editingTask.isMilestone,
        percentComplete: editingTask.percentComplete,
        assignedTo: editingTask.assignedTo ?? "",
      })
    } else {
      form.reset({
        title: "",
        startDate: new Date().toISOString().split("T")[0],
        workdays: 5,
        phase: "preconstruction",
        isMilestone: false,
        percentComplete: 0,
        assignedTo: "",
      })
    }
  }, [editingTask, form])

  const watchedStart = form.watch("startDate")
  const watchedWorkdays = form.watch("workdays")

  const calculatedEnd = useMemo(() => {
    if (!watchedStart || !watchedWorkdays || watchedWorkdays < 1) return ""
    return calculateEndDate(watchedStart, watchedWorkdays)
  }, [watchedStart, watchedWorkdays])

  async function onSubmit(values: TaskFormValues) {
    let result
    if (isEditing) {
      result = await updateTask(editingTask.id, {
        ...values,
        assignedTo: values.assignedTo || null,
      })
    } else {
      result = await createTask(projectId, {
        ...values,
        assignedTo: values.assignedTo || undefined,
      })
    }

    if (result.success) {
      onOpenChange(false)
      router.refresh()
    } else {
      toast.error(result.error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Edit Task" : "New Task"}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Task title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="workdays"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Workdays</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={1}
                        value={field.value}
                        onChange={(e) =>
                          field.onChange(Number(e.target.value) || 0)
                        }
                        onBlur={field.onBlur}
                        ref={field.ref}
                        name={field.name}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {calculatedEnd && (
              <p className="text-sm text-muted-foreground">
                Calculated end date: <strong>{calculatedEnd}</strong>
              </p>
            )}

            <FormField
              control={form.control}
              name="phase"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phase</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select phase" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {phases.map((p) => (
                        <SelectItem key={p.value} value={p.value}>
                          {p.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="percentComplete"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Complete: {field.value}%
                  </FormLabel>
                  <FormControl>
                    <Slider
                      min={0}
                      max={100}
                      step={5}
                      value={[field.value]}
                      onValueChange={([val]) => field.onChange(val)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="assignedTo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Assigned To</FormLabel>
                  <FormControl>
                    <Input placeholder="Person name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isMilestone"
              render={({ field }) => (
                <FormItem className="flex items-center gap-2">
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="!mt-0">Milestone</FormLabel>
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit">
                {isEditing ? "Save" : "Create"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
