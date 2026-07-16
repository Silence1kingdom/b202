import { NextResponse, type NextRequest } from "next/server";
import { ADMIN_COOKIE, sessionToken } from "@/lib/session";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isLogin = path === "/admin/login";

  const token = request.cookies.get(ADMIN_COOKIE)?.value;
  const expected = await sessionToken();
  const authed = token === expected;

  if (!authed && !isLogin) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    return NextResponse.redirect(url);
  }
  if (authed && isLogin) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin";
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
