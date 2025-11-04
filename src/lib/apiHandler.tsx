import dbConnect from "./mongodb";
import { NextRequest, NextResponse } from "next/server";
import { errorResponse } from "./responses";

type HandlerContext = { params?: { [key: string]: string } };
type Handler = (req: NextRequest, context?: HandlerContext) => Promise<NextResponse>;

export function apiHandler(handler: Handler) {
  return async function wrappedHandler(req: NextRequest, context?: HandlerContext): Promise<NextResponse> {
    try {
      await dbConnect();
      return await handler(req, context);
    } catch (error: any) {
      console.error("API error:", error);
      return errorResponse(error.message || "Internal Server Error", 500);
    }
  };
}
