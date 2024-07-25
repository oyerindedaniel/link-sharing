DO $$ BEGIN
 CREATE TYPE "public"."platform" AS ENUM('github', 'frontendMentor', 'twitter', 'linkedin', 'youtube', 'facebook', 'twitch', 'devto', 'codewars', 'codepen', 'freeCodeCamp', 'gitlab', 'hashnode', 'stackoverflow');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "links" (
	"id" serial PRIMARY KEY NOT NULL,
	"platform" "platform",
	"link" varchar(256),
	"user_id" integer
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "links" ADD CONSTRAINT "links_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "email_idx" ON "users" USING btree ("email_address");--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_email_address_unique" UNIQUE("email_address");