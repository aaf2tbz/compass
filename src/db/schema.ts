import {
  sqliteTable,
  text,
  integer,
} from "drizzle-orm/sqlite-core"

export const projects = sqliteTable("projects", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  status: text("status").notNull().default("OPEN"),
  address: text("address"),
  clientName: text("client_name"),
  projectManager: text("project_manager"),
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
  percentComplete: integer("percent_complete").notNull().default(0),
  assignedTo: text("assigned_to"),
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

export const workdayExceptions = sqliteTable("workday_exceptions", {
  id: text("id").primaryKey(),
  projectId: text("project_id")
    .notNull()
    .references(() => projects.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  startDate: text("start_date").notNull(),
  endDate: text("end_date").notNull(),
  type: text("type").notNull().default("non_working"),
  category: text("category").notNull().default("company_holiday"),
  recurrence: text("recurrence").notNull().default("one_time"),
  notes: text("notes"),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
})

export const scheduleBaselines = sqliteTable("schedule_baselines", {
  id: text("id").primaryKey(),
  projectId: text("project_id")
    .notNull()
    .references(() => projects.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  snapshotData: text("snapshot_data").notNull(),
  createdAt: text("created_at").notNull(),
})

export const customers = sqliteTable("customers", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email"),
  phone: text("phone"),
  createdAt: text("created_at").notNull(),
})

export const vendors = sqliteTable("vendors", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  category: text("category").notNull().default("Subcontractor"),
  email: text("email"),
  phone: text("phone"),
  address: text("address"),
  createdAt: text("created_at").notNull(),
})

export type Project = typeof projects.$inferSelect
export type ScheduleTask = typeof scheduleTasks.$inferSelect
export type NewScheduleTask = typeof scheduleTasks.$inferInsert
export type TaskDependency = typeof taskDependencies.$inferSelect
export type NewTaskDependency = typeof taskDependencies.$inferInsert
export type WorkdayException = typeof workdayExceptions.$inferSelect
export type NewWorkdayException = typeof workdayExceptions.$inferInsert
export type ScheduleBaseline = typeof scheduleBaselines.$inferSelect
export type NewScheduleBaseline = typeof scheduleBaselines.$inferInsert
export type Customer = typeof customers.$inferSelect
export type NewCustomer = typeof customers.$inferInsert
export type Vendor = typeof vendors.$inferSelect
export type NewVendor = typeof vendors.$inferInsert
