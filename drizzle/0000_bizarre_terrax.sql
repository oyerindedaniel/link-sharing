CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email_address" varchar(256) NOT NULL,
	"password" varchar(256) NOT NULL,
	"img_src" varchar(256)
);
