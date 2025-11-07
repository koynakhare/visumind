import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { JWT_SECRET } from "./lib/constants";

interface CustomToken {
  accessToken?: string;
  id?: string;
  name?: string;
  email?: string;
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  const token = (await getToken({ req, secret: JWT_SECRET })) as CustomToken | null;

  const accessToken = token?.accessToken;
  if (!accessToken) {
    return NextResponse.json({ error: "Unauthorized: No token provided" }, { status: 401 });
  }

  const userId = token?.id;
  if (!userId) {
    return NextResponse.json({ error: "Invalid token: no user ID" }, { status: 403 });
  }

  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-user-id", userId);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ["/api/:path*"],
};
