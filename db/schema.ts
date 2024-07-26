import { platformValues } from "@/types/platform";
import {
  index,
  integer,
  pgEnum,
  pgTable,
  serial,
  uniqueIndex,
  varchar,
  text,
} from "drizzle-orm/pg-core";

export const users = pgTable(
  "users",
  {
    id: serial("id").primaryKey(),
    emailAddress: text("email_address").notNull().unique(),
    firstName: text("first_name"),
    lastName: text("last_name"),
    password: text("password").notNull(),
    imgSrc: varchar("img_src", { length: 256 }),
  },
  (users) => ({
    emailIdx: index("email_idx").on(users.emailAddress),
  })
);

export const platformEnum = pgEnum("platform", platformValues);

export const links = pgTable(
  "links",
  {
    id: serial("id").primaryKey(),
    platform: platformEnum("platform").notNull(),
    link: varchar("link", { length: 256 }).notNull(),
    brandColor: varchar("brand_color", { length: 256 }).notNull(),
    userId: integer("user_id")
      .references(() => users.id)
      .notNull(),
  },
  (table) => {
    return {
      userPlatformIndex: uniqueIndex("user_platform_idx").on(
        table.userId,
        table.platform
      ),
    };
  }
);
