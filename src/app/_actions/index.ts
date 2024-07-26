"use server";

import { ICreateAccountInputs } from "@/types/account";
import { ILinksInputs } from "@/types/links";
import { User } from "@/types/users";
import { getAuthUser } from "@/utils/auth";
import db from "@db/drizzle";
import { links, users } from "@db/schema";
import bcrypt from "bcryptjs";
import { eq, inArray } from "drizzle-orm";
import jwt from "jsonwebtoken";
import _ from "lodash";
import { revalidatePath, revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const SALT_ROUNDS = 10;

const isProduction = process.env.NODE_ENV === "production";

export type JwtPayloadType = { id: number };

function generateAccessToken({ id }: JwtPayloadType): string {
  return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET!, {
    algorithm: "HS256",
  });
}

export const createUser = async (data: ICreateAccountInputs) => {
  const { emailAddress, password, confirmPassword } = data;

  if (password !== confirmPassword) {
    throw new Error("Passwords do not match.");
  }

  if (password.length < 8) {
    throw new Error("Password must be at least 8 characters long.");
  }

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  try {
    const [user] = await db
      .insert(users)
      .values({
        emailAddress,
        password: hashedPassword,
      })
      .returning();

    return { message: "User created successfully." };
  } catch (error) {
    console.error("Database error:", error);
    throw new Error(
      "There was an issue creating the user. Please try again later."
    );
  }
};

export const loginUser = async (
  data: Pick<ICreateAccountInputs, "password" | "emailAddress">
) => {
  const { emailAddress, password } = data;

  try {
    const existingUser = await db.query.users.findFirst({
      where: eq(users.emailAddress, emailAddress),
    });

    if (!existingUser) {
      throw new Error("User not found.");
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordValid) {
      throw new Error("Invalid credentials.");
    }

    const accessToken = generateAccessToken({ id: existingUser.id });

    cookies().set({
      name: process.env.COOKIE_NAME!,
      value: accessToken,
      httpOnly: true,
      secure: !!isProduction,
      sameSite: "lax",
      path: "/",
    });

    return _.omit(existingUser, ["password"]);
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Could not create user.");
  }
};

export const updateUser = async (
  id: number,
  data: Omit<User, "password" | "id">
) => {
  const { emailAddress, imgSrc, firstName, lastName } = data;

  const user = await getAuthUser();

  if (!user) {
    return redirect("/login");
  }

  try {
    const updateData = Object.assign(
      {
        firstName,
        lastName,
      },
      emailAddress !== user.emailAddress ? { emailAddress } : {},
      imgSrc ? { imgSrc } : {}
    );

    const updatedUser = await db
      .update(users)
      .set(updateData)
      .where(eq(users.id, user.id))
      .returning({
        emailAddress: users.emailAddress,
        id: users.id,
        firstName: users.firstName,
        lastName: users.lastName,
        imgSrc: users.imgSrc,
      });

    revalidatePath(`/profile`);

    return updatedUser;
  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error("Could not update user.");
  }
};

export const createLink = async (data: ILinksInputs) => {
  const { links: linkData, userId } = data;

  const user = await getAuthUser();

  if (!user) {
    return redirect("/login");
    // throw new Error("Unauthenticated");
  }

  try {
    const linkValues = linkData.map((linkItem) => ({
      platform: linkItem.platform,
      link: linkItem.link,
      brandColor: linkItem.brandColor,
      userId: user.id,
    }));

    const newLinks = await db.insert(links).values(linkValues).returning();

    revalidatePath(`/links`);
    revalidateTag("user_links");
    return newLinks;
  } catch (error) {
    console.error("Error creating links:", error);
    throw new Error("Could not create links.");
  }
};

export const updateLinks = async (data: ILinksInputs) => {
  const { links: linkData, userId } = data;

  console.log(linkData);

  const user = await getAuthUser();

  if (!user) {
    return redirect("/login");
  }

  try {
    // filters out duplicate platforms without ID (leaving newly created)
    const uniqueLinkData = linkData.reduce<ILinksInputs["links"]>(
      (acc, linkItem) => {
        const { platform, id } = linkItem;

        const existingIndex = acc.findIndex(
          (item) => item.platform === platform
        );
        if (existingIndex !== -1) {
          if (!id) {
            acc[existingIndex] = linkItem;
          }
        } else {
          acc.push(linkItem);
        }

        return acc;
      },
      []
    );

    const existingLinks = await db.query.links.findMany({
      where: eq(links.userId, user.id),
    });

    const existingLinksMap = new Map(
      existingLinks.map((link) => [link.id, link])
    );

    const linkDataIds = new Set(
      uniqueLinkData.filter((link) => link.id).map((link) => link.id)
    );

    const linksToDelete = existingLinks.filter(
      (link) => !linkDataIds.has(link.id)
    );

    if (linksToDelete.length > 0) {
      await db.delete(links).where(
        inArray(
          links.id,
          linksToDelete.map((link) => link.id)
        )
      );
    }

    // Ensure that uniqueLinkData does not contain links to be deleted

    const validLinkData = uniqueLinkData.filter(
      (link) => !linksToDelete.some((delLink) => delLink.id === link.id)
    );

    const updatedLinks = await Promise.all(
      validLinkData.map(async (linkItem) => {
        const { id, platform, link, brandColor } = linkItem;

        if (id) {
          const existingLink = existingLinksMap.get(id);

          if (!existingLink || existingLink.userId !== user.id) {
            throw new Error("Link not found or unauthorized");
          }

          if (
            existingLink.link === link &&
            existingLink.platform === platform
          ) {
            return existingLink;
          }

          const updatedLink = await db
            .update(links)
            .set({
              link,
              brandColor,
              platform,
            })
            .where(eq(links.id, id))
            .returning();

          return updatedLink;
        } else {
          const newLink = await db
            .insert(links)
            .values({
              platform,
              link,
              brandColor,
              userId: user.id,
            })
            .returning();

          return newLink;
        }
      })
    );

    console.log("updatedLinks", updatedLinks);

    revalidatePath(`/links`);
    revalidateTag("user_links");
    return updatedLinks;
  } catch (error) {
    console.error("Error updating links:", error);
    throw new Error("Could not update links.");
  }
};

export const updateLink = async (
  id: number,
  data: Partial<ILinksInputs["links"][number]>
) => {
  const { platform, link, brandColor } = data;

  try {
    const updatedLink = await db
      .update(links)
      .set({
        platform,
        link,
        brandColor,
      })
      .where(eq(links.id, id))
      .returning();

    revalidatePath(`/links`);
    revalidateTag("user_links");
    return updatedLink;
  } catch (error) {
    console.error("Error updating link:", error);
    throw new Error("Could not update link.");
  }
};
