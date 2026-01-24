import {
  sqliteTable,
  text,
  integer,
} from "drizzle-orm/sqlite-core"

export const projects = sqliteTable("projects", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  createdAt: text("created_at").notNull(),
})

export const scheduleTasks = sqliteTable("schedule_tasks", {
  id: text("id").primaryKey(),
  projectId: text("project_id")
    .notNull()
    .references(() => projects.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  startDate: text("start_date").notNull(),
  workdays: integer("workdays").notNull(),
  endDateCalculated: text("end_date_calculated").notNull(),
  phase: text("phase").notNull(),
  status: text("status").notNull().default("PENDING"),
  isCriticalPath: integer("is_critical_path", { mode: "boolean" })
    .notNull()
    .default(false),
  isMilestone: integer("is_milestone", { mode: "boolean" })
    .notNull()
    .default(false),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
})

export const taskDependencies = sqliteTable("task_dependencies", {
  id: text("id").primaryKey(),
  predecessorId: text("predecessor_id")
    .notNull()
    .references(() => scheduleTasks.id, { onDelete: "cascade" }),
  successorId: text("successor_id")
    .notNull()
    .references(() => scheduleTasks.id, { onDelete: "cascade" }),
  type: text("type").notNull().default("FS"),
  lagDays: integer("lag_days").notNull().default(0),
})

export type Project = typeof projects.$inferSelect
export type ScheduleTask = typeof scheduleTasks.$inferSelect
export type NewScheduleTask = typeof scheduleTasks.$inferInsert
export type TaskDependency = typeof taskDependencies.$inferSelect
export type NewTaskDependency = typeof taskDependencies.$inferInsert
