import { NextRequest, NextResponse } from "next/server";
import { handleAssistantQuery } from "@/services/handleAssistantQuery";
import { successResponse } from "@/lib/responses";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const { projectId, question } = await req.json();

    if (!projectId || !question) {
      return NextResponse.json(
        { error: "projectId and question are required" },
        { status: 400 }
      );
    }

    const result = await handleAssistantQuery(projectId, question);

    return successResponse(result, {
    action: "fetched",
    model: "Anwer",
  });
  } catch (error: any) {
    console.error("Assistant route error:", error);
    return NextResponse.json(
      { error: error.message || "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
