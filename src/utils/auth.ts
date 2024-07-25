"use server";

import { JwtPayloadType } from "@/app/_actions";
import db from "@db/drizzle";
import { users } from "@db/schema";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
// import { cache } from "react";

const COOKIE_NAME = process.env.COOKIE_NAME!;
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET!;

export async function getAuthUser() {
  const tokenCookie = cookies().get(COOKIE_NAME);
  const token = tokenCookie ? tokenCookie.value : null;

  if (!token) {
    return null;
  }

  try {
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET) as JwtPayloadType;

    const existingUser = await db.query.users.findFirst({
      where: eq(users.id, decoded.id),
    });

    return existingUser;
  } catch (error) {
    return null;
  }
}
