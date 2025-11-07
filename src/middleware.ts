// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { getToken } from "next-auth/jwt";

const JWT_SECRET = process.env.JWT_SECRET as string;

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  const token = await getToken({ req, secret: JWT_SECRET });
  const accessToken = token?.accessToken
console.log(accessToken,'access token')
  if (!accessToken) {
    return NextResponse.json({ error: "Unauthorized: No token provided" }, { status: 401 });
  }

  return NextResponse.next();

}
export const config = {
  matcher: ["/api/:path*"],
};
