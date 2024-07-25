import {
  integer,
  pgEnum,
  pgTable,
  serial,
  varchar,
  index,
} from "drizzle-orm/pg-core";
import { platformValues } from "@/types/platform";

export const users = pgTable(
  "users",
  {
    id: serial("id").primaryKey(),
    emailAddress: varchar("email_address", { length: 256 }).notNull().unique(),
    password: varchar("password", { length: 256 }).notNull(),
    imgSrc: varchar("img_src", { length: 256 }),
  },
  (users) => ({
    emailIdx: index("email_idx").on(users.emailAddress),
  })
);

export const platformEnum = pgEnum("platform", platformValues);

export const links = pgTable("links", {
  id: serial("id").primaryKey(),
  platform: platformEnum("platform"),
  link: varchar("link", { length: 256 }),
  userId: integer("user_id").references(() => users.id),
});
