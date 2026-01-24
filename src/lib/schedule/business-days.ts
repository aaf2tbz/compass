import { addDays, isWeekend, parseISO, format } from "date-fns"

export function calculateEndDate(
  startDate: string,
  workdays: number
): string {
  if (workdays <= 0) return startDate

  let current = parseISO(startDate)
  let remaining = workdays

  // start date counts as day 1 if it's a business day
  if (!isWeekend(current)) {
    remaining--
  }

  while (remaining > 0) {
    current = addDays(current, 1)
    if (!isWeekend(current)) {
      remaining--
    }
  }

  return format(current, "yyyy-MM-dd")
}

export function countBusinessDays(
  startDate: string,
  endDate: string
): number {
  let current = parseISO(startDate)
  const end = parseISO(endDate)
  let count = 0

  while (current <= end) {
    if (!isWeekend(current)) {
      count++
    }
    current = addDays(current, 1)
  }

  return count
}

export function addBusinessDays(
  date: string,
  days: number
): string {
  let current = parseISO(date)
  let remaining = Math.abs(days)
  const direction = days >= 0 ? 1 : -1

  while (remaining > 0) {
    current = addDays(current, direction)
    if (!isWeekend(current)) {
      remaining--
    }
  }

  return format(current, "yyyy-MM-dd")
}
