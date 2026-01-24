CREATE TABLE `feedback` (
	`id` text PRIMARY KEY NOT NULL,
	`type` text NOT NULL,
	`message` text NOT NULL,
	`name` text,
	`email` text,
	`page_url` text,
	`user_agent` text,
	`viewport_width` integer,
	`viewport_height` integer,
	`ip_hash` text,
	`github_issue_url` text,
	`created_at` text NOT NULL
);
