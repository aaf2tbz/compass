ALTER TABLE `projects` ADD `status` text DEFAULT 'OPEN' NOT NULL;--> statement-breakpoint
ALTER TABLE `projects` ADD `address` text;--> statement-breakpoint
ALTER TABLE `projects` ADD `client_name` text;--> statement-breakpoint
ALTER TABLE `projects` ADD `project_manager` text;