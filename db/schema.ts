import {
  index,
  pgTable,
  bigint,
  varchar,
  serial,
  text,
} from "drizzle-orm/pg-core";

export const users = pgTable(
  "users",
  {
    id: serial("id").primaryKey(),
    emailAddress: varchar("email_address", { length: 256 }).notNull(),
    password: varchar("password", { length: 256 }).notNull(),
    imgSrc: varchar("img_src", { length: 256 }),
  },
  (users) => ({
    // nameIdx: index("name_idx").on(users.fullName),
  })
);

// export const authOtps = pgTable("auth_otp", {
//   id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
//   phone: varchar("phone", { length: 256 }),
//   userId: int("user_id").references(() => users.id),
// });
