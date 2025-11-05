// app/api/chat-history/route.ts
import { NextRequest, NextResponse } from "next/server";
import { apiHandler } from "@/lib/apiHandler";
import { getChatHistoryByProjectId } from "@/services/chat.service";
import { errorResponse, successResponse } from "@/lib/responses";

export const GET = apiHandler(async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const projectId = searchParams.get("projectId");

  if (!projectId) {
    return errorResponse("projectId is required", 400);
  }

  const chatHistory = await getChatHistoryByProjectId(projectId);

  return successResponse(chatHistory, {
    action: "fetched",
    model: "Chat",
  });
});
