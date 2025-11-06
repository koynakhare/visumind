import dbConnect from "./mongodb";
import { NextRequest, NextResponse } from "next/server";
import { errorResponse } from "./responses";

// ✅ Match Next.js' internal RouteContext signature exactly
export type HandlerContext = {
  params: Promise<Record<string, string>>;
};

// ✅ Handler that matches what Next.js expects
export type Handler = (req: NextRequest, context: HandlerContext) => Promise<NextResponse>;

export function apiHandler(handler: Handler) {
  return async function wrappedHandler(
    req: NextRequest,
    context: HandlerContext
  ): Promise<NextResponse> {
    try {
      await dbConnect();

      // Await params (since it's always Promise-based)
      const params = await context.params;

      // Call handler with resolved params
      return await handler(req, { params: Promise.resolve(params) });
    } catch (error: any) {
      console.error("API error:", error);
      return errorResponse(error.message || "Internal Server Error", 500);
    }
  };
}
