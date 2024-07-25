"use server";

import { ICreateAccountInputs } from "@/types/account";
import { ILinksInputs } from "@/types/links";
import { getAuthUser } from "@/utils/auth";
import db from "@db/drizzle";
import { links, users } from "@db/schema";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";
import _ from "lodash";
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

// export const updateUser = async (
//   id: number,
//   data: ICreateAccountInputs & { imgSrc: string }
// ) => {
//   const { emailAddress, password, imgSrc } = data;

//   try {
//     const updatedUser = await db
//       .update(users)
//       .set({
//         emailAddress,
//         password,
//         imgSrc,
//       })
//       .where(eq(users.id, id))
//       .returning({
//         emailAddress: users.emailAddress,
//         id: users.id,
//         imgSrc: users.imgSrc,
//       });

//     return updatedUser;
//   } catch (error) {
//     console.error("Error updating user:", error);
//     throw new Error("Could not update user.");
//   }
// };

export const createLink = async (data: ILinksInputs) => {
  const { links: linkData, userId } = data;

  const user = await getAuthUser();

  if (!user) {
    redirect("/login");
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

    return newLinks;
  } catch (error) {
    console.error("Error creating links:", error);
    throw new Error("Could not create links.");
  }
};

export const getLinksByUserId = async (userId?: number) => {
  const user = await getAuthUser();

  if (!user) {
    redirect("/login");
  }

  try {
    const userLinks = await db.query.links.findMany({
      where: eq(users.id, user.id),
    });

    return userLinks;
  } catch (error) {
    console.error("Error fetching links:", error);
    throw new Error("Could not fetch links.");
  }
};

// export const updateLink = async (id: number, data: UpdateLinkInputs) => {
//   const { platform, link, brandColor } = data;

//   try {
//     const updatedLink = await db
//       .update(links)
//       .set({
//         platform,
//         link,
//         brandColor,
//       })
//       .where(eq(links.id, id))
//       .returning();

//     return updatedLink;
//   } catch (error) {
//     console.error("Error updating link:", error);
//     throw new Error("Could not update link.");
//   }
// };
