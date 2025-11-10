import { NextRequest } from "next/server";
import { handleAssistantQuery } from "@/services/handleAssistantQuery";
import { successResponse, errorResponse } from "@/lib/responses";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const { projectId, question } = await req.json();

    if (!projectId || !question) {
      return errorResponse("projectId and question are required", 400);
    }

    const result = await handleAssistantQuery(projectId, question);

    return successResponse(result, {
      action: "fetched",
      model: "Answer",
    });

  } catch (error: any) {
    if (error.status === 429) {
      return errorResponse(`Daily limit reached. You used all 20 queries for today. Try again in 24 hours`, 429);
    }

    return errorResponse(error.message || "An unexpected error occurred", 500);
  }
}
