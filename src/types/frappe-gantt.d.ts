declare module "frappe-gantt" {
  interface GanttTask {
    id: string
    name: string
    start: string
    end: string
    progress: number
    dependencies?: string
    custom_class?: string
  }

  interface GanttOptions {
    view_mode?: string
    on_date_change?: (
      task: { id: string },
      start: Date,
      end: Date
    ) => void
    on_progress_change?: (
      task: { id: string },
      progress: number
    ) => void
  }

  export default class Gantt {
    constructor(
      element: HTMLElement,
      tasks: GanttTask[],
      options?: GanttOptions
    )
  }
}
