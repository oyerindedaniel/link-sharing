"use server";

import db from "@db/drizzle";
import { links } from "@db/schema";
import { eq } from "drizzle-orm";
import { unstable_cache as next_cache } from "next/cache";
import { redirect } from "next/navigation";

export const getLinksByUserId = async ({
  userId,
}: {
  userId: number | undefined;
}) => {
  if (!userId) {
    return redirect("/login");
  }

  return next_cache(
    async (userId: number) => {
      try {
        const userLinks = await db.query.links.findMany({
          where: eq(links.userId, userId),
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
};
