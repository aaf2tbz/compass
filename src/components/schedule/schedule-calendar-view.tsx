"use client"

import { useState, useMemo } from "react"
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  addMonths,
  subMonths,
  isToday,
  isSameMonth,
  isWeekend,
  isSameDay,
  parseISO,
  isWithinInterval,
} from "date-fns"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  IconChevronLeft,
  IconChevronRight,
} from "@tabler/icons-react"
import type {
  ScheduleTaskData,
  WorkdayExceptionData,
} from "@/lib/schedule/types"

interface ScheduleCalendarViewProps {
  projectId: string
  tasks: ScheduleTaskData[]
  exceptions: WorkdayExceptionData[]
}

function isExceptionDay(
  date: Date,
  exceptions: WorkdayExceptionData[]
): boolean {
  return exceptions.some((ex) => {
    const start = parseISO(ex.startDate)
    const end = parseISO(ex.endDate)
    return isWithinInterval(date, { start, end })
  })
}

function getTaskColor(task: ScheduleTaskData): string {
  if (task.status === "COMPLETE") return "bg-green-500"
  if (task.status === "IN_PROGRESS") return "bg-blue-500"
  if (task.status === "BLOCKED") return "bg-red-500"
  if (task.isCriticalPath) return "bg-orange-500"
  return "bg-gray-400"
}

const MAX_VISIBLE_TASKS = 3

export function ScheduleCalendarView({
  tasks,
  exceptions,
}: ScheduleCalendarViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [expandedCells, setExpandedCells] = useState<Set<string>>(
    new Set()
  )

  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(currentDate)
  const calendarStart = startOfWeek(monthStart)
  const calendarEnd = endOfWeek(monthEnd)

  const days = useMemo(
    () => eachDayOfInterval({ start: calendarStart, end: calendarEnd }),
    [calendarStart.getTime(), calendarEnd.getTime()]
  )

  const tasksByDate = useMemo(() => {
    const map = new Map<string, ScheduleTaskData[]>()
    for (const task of tasks) {
      const key = task.startDate
      if (!map.has(key)) map.set(key, [])
      map.get(key)!.push(task)
    }
    return map
  }, [tasks])

  const toggleExpand = (dateKey: string) => {
    setExpandedCells((prev) => {
      const next = new Set(prev)
      if (next.has(dateKey)) {
        next.delete(dateKey)
      } else {
        next.add(dateKey)
      }
      return next
    })
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentDate(new Date())}
          >
            Today
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="size-7"
            onClick={() => setCurrentDate(subMonths(currentDate, 1))}
          >
            <IconChevronLeft className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="size-7"
            onClick={() => setCurrentDate(addMonths(currentDate, 1))}
          >
            <IconChevronRight className="size-4" />
          </Button>
          <h2 className="text-lg font-medium">
            {format(currentDate, "MMMM, yyyy")}
          </h2>
        </div>
        <Select defaultValue="month">
          <SelectTrigger className="h-7 w-[100px] text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="month">Month</SelectItem>
            <SelectItem value="day">Day</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="border rounded-md overflow-hidden">
        <div className="grid grid-cols-7 border-b">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
            (day) => (
              <div
                key={day}
                className="text-center text-xs font-medium text-muted-foreground py-2 border-r last:border-r-0"
              >
                {day}
              </div>
            )
          )}
        </div>

        <div className="grid grid-cols-7">
          {days.map((day) => {
            const dateKey = format(day, "yyyy-MM-dd")
            const dayTasks = tasksByDate.get(dateKey) || []
            const isNonWork =
              isWeekend(day) || isExceptionDay(day, exceptions)
            const inMonth = isSameMonth(day, currentDate)
            const expanded = expandedCells.has(dateKey)
            const visibleTasks = expanded
              ? dayTasks
              : dayTasks.slice(0, MAX_VISIBLE_TASKS)
            const overflow = dayTasks.length - MAX_VISIBLE_TASKS

            return (
              <div
                key={dateKey}
                className={`min-h-[90px] border-r border-b last:border-r-0 p-1 ${
                  !inMonth ? "bg-muted/30" : ""
                } ${isNonWork ? "bg-muted/50" : ""}`}
              >
                <div className="flex items-center justify-between mb-0.5">
                  <span
                    className={`text-xs ${
                      isToday(day)
                        ? "bg-primary text-primary-foreground rounded-full size-5 flex items-center justify-center font-bold"
                        : inMonth
                          ? "text-foreground"
                          : "text-muted-foreground"
                    }`}
                  >
                    {format(day, "d")}
                  </span>
                  {isNonWork && (
                    <span className="text-[9px] text-muted-foreground">
                      Non-workday
                    </span>
                  )}
                </div>
                <div className="space-y-0.5">
                  {visibleTasks.map((task) => (
                    <div
                      key={task.id}
                      className={`${getTaskColor(task)} text-white text-[9px] px-1 py-0.5 rounded truncate`}
                      title={task.title}
                    >
                      {task.title}
                    </div>
                  ))}
                  {!expanded && overflow > 0 && (
                    <button
                      className="text-[9px] text-primary hover:underline"
                      onClick={() => toggleExpand(dateKey)}
                    >
                      +{overflow} more
                    </button>
                  )}
                  {expanded && dayTasks.length > MAX_VISIBLE_TASKS && (
                    <button
                      className="text-[9px] text-primary hover:underline"
                      onClick={() => toggleExpand(dateKey)}
                    >
                      Show less
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
