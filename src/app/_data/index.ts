"use server";

import db from "@db/drizzle";
import { links } from "@db/schema";
import { eq } from "drizzle-orm";
import { unstable_cache as next_cache } from "next/cache";
import { redirect } from "next/navigation";
import { cache } from "react";

export const getLinksByUserId = cache(
  async ({ userId }: { userId: number | undefined }) => {
    if (!userId) {
      return redirect("/login");
    }

    return next_cache(
      async (userId: number) => {
        try {
          const userLinks = await db.query.users.findFirst({
            where: (users, { eq }) => eq(users.id, userId),
            with: { links: true },
          });
          return userLinks;
        } catch (error) {
          console.error("Error fetching links:", error);
          throw new Error("Could not fetch links.");
        }
      },
      undefined,
      { tags: ["user_links"] }
    )(userId);
  }
);

export const getLinksByUserIdWithoutCache = async (userId: number) => {
  try {
    const userLinks = await db.query.links.findMany({
      where: eq(links.userId, 2),
    });
    return userLinks;
  } catch (error) {
    console.error("Error fetching links:", error);
    throw new Error("Could not fetch links.");
  }
};
