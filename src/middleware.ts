import { getAuthUser } from "@/utils/auth";
import { NextRequest, NextResponse } from "next/server";

const GUEST_ROUTES = ["/login", "/create-account"];
const PROTECTED_ROUTES = ["/links", "/profile"];
const PROTECTED_ROUTE_REDIRECT = "/login";
const AUTHENTICATED_REDIRECT = "/links";

export async function middleware(req: NextRequest) {
  const tokenCookie = req.cookies.get(process.env.COOKIE_NAME!);
  const token = tokenCookie ? tokenCookie.value : null;

  if (token) {
    try {
      const decoded = await getAuthUser();

      if (GUEST_ROUTES.includes(req.nextUrl.pathname)) {
        return NextResponse.redirect(new URL(AUTHENTICATED_REDIRECT, req.url));
      }

      return NextResponse.next();
    } catch (error) {}
  }

  if (PROTECTED_ROUTES.includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL(PROTECTED_ROUTE_REDIRECT, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
