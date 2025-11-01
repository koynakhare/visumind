import { NextResponse } from "next/server";

export async function POST() {
  // Clear cookies (adjust cookie name to your auth setup)
  const response = NextResponse.json({ message: "Logged out" });
  response.cookies.set("token", "", {
    path: "/",
    httpOnly: true,
    expires: new Date(0), // expire immediately
  });

  return response;
}
