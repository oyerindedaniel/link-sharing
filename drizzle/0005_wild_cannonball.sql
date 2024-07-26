ALTER TABLE "links" DROP CONSTRAINT "links_platform_unique";--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "email_address" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "password" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "first_name" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "last_name" text;--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "user_platform_idx" ON "links" USING btree ("user_id","platform");