CREATE TABLE `projects` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `schedule_tasks` (
	`id` text PRIMARY KEY NOT NULL,
	`project_id` text NOT NULL,
	`title` text NOT NULL,
	`start_date` text NOT NULL,
	`workdays` integer NOT NULL,
	`end_date_calculated` text NOT NULL,
	`phase` text NOT NULL,
	`status` text DEFAULT 'PENDING' NOT NULL,
	`is_critical_path` integer DEFAULT false NOT NULL,
	`is_milestone` integer DEFAULT false NOT NULL,
	`sort_order` integer DEFAULT 0 NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL,
	FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `task_dependencies` (
	`id` text PRIMARY KEY NOT NULL,
	`predecessor_id` text NOT NULL,
	`successor_id` text NOT NULL,
	`type` text DEFAULT 'FS' NOT NULL,
	`lag_days` integer DEFAULT 0 NOT NULL,
	FOREIGN KEY (`predecessor_id`) REFERENCES `schedule_tasks`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`successor_id`) REFERENCES `schedule_tasks`(`id`) ON UPDATE no action ON DELETE cascade
);
