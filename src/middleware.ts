import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getAccessTokenCookie } from "./cookies/access-token/get-access-token.cookie";

export async function middleware(request: NextRequest) {
  const accessToken = await getAccessTokenCookie();

  if (!accessToken) {
    if (request.nextUrl.pathname.startsWith("/signin")) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  if (accessToken) {
    if (request.nextUrl.pathname.startsWith("/admin/")) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
  }
}

export const config = {
  matcher: ["/", "/signin", "/admin/:path*"],
};
