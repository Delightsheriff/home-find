import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

import { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });

  // Protect specific routes
  const protectedRoutes = ["/account", "/account/*"];

  if (protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route))) {
    if (!token) {
      return NextResponse.redirect(new URL("/auth/signin", req.url));
    }

    // Optionally: Check token expiration here and handle refresh if needed
  }

  return NextResponse.next();
}
