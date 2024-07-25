import { getAuthUser } from "@/utils/auth";
import { NextRequest, NextResponse } from "next/server";

const isProduction = process.env.NODE_ENV === "production";
const GUEST_ROUTES = ["/login", "/create-account"];
const PROTECTED_ROUTE_REDIRECT = "/login";
const AUTHENTICATED_REDIRECT = "/links";

console.log("----------------------------------------------------middleware");

export async function middleware(req: NextRequest) {
  const tokenCookie = req.cookies.get(process.env.COOKIE_NAME!);
  const token = tokenCookie ? tokenCookie.value : null;

  console.log("middleware", token);

  if (!token) {
    if (!GUEST_ROUTES.includes(req.nextUrl.pathname)) {
      return NextResponse.redirect(new URL(PROTECTED_ROUTE_REDIRECT, req.url));
    }
    return NextResponse.next();
  }

  try {
    const decoded = await getAuthUser();
    req.user = decoded;

    if (GUEST_ROUTES.includes(req.nextUrl.pathname)) {
      return NextResponse.redirect(new URL(AUTHENTICATED_REDIRECT, req.url));
    }

    return NextResponse.next();
  } catch (error) {
    if (!GUEST_ROUTES.includes(req.nextUrl.pathname)) {
      return NextResponse.redirect(new URL(PROTECTED_ROUTE_REDIRECT, req.url));
    }
    return new NextResponse("Unauthorized", { status: 401 });
  }
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
