CREATE TABLE `schedule_baselines` (
	`id` text PRIMARY KEY NOT NULL,
	`project_id` text NOT NULL,
	`name` text NOT NULL,
	`snapshot_data` text NOT NULL,
	`created_at` text NOT NULL,
	FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `workday_exceptions` (
	`id` text PRIMARY KEY NOT NULL,
	`project_id` text NOT NULL,
	`title` text NOT NULL,
	`start_date` text NOT NULL,
	`end_date` text NOT NULL,
	`type` text DEFAULT 'non_working' NOT NULL,
	`category` text DEFAULT 'company_holiday' NOT NULL,
	`recurrence` text DEFAULT 'one_time' NOT NULL,
	`notes` text,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL,
	FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
ALTER TABLE `schedule_tasks` ADD `percent_complete` integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `schedule_tasks` ADD `assigned_to` text;