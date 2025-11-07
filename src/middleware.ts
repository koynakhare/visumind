import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { NEXTAUTH_SECRET } from "./lib/constants";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow next-auth routes and preflight CORS
  if (pathname.startsWith("/api/auth") || req.method === "OPTIONS") {
    return NextResponse.next();
  }

  // Use NEXTAUTH_SECRET (not JWT_SECRET)
  const token = await getToken({ req, secret: NEXTAUTH_SECRET });
  const accessToken = token?.accessToken;

  if (!accessToken) {
    return NextResponse.json({ error: "Unauthorized: No token provided" }, { status: 401 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*"],
};
