// /api/projects/route.ts
import { NextRequest } from "next/server";
import { apiHandler } from "@/lib/apiHandler";
import { addProject, getAllProjects } from "@/services/project.service";
import { errorResponse } from "@/lib/responses";

export const config = {
  api: { bodyParser: false },
};

export const GET = apiHandler(async (req: NextRequest) => {
  try {
    const userId = req.headers.get("x-user-id");
    if (!userId) return errorResponse("Unauthorized", 401);

    return await getAllProjects(userId);
  } catch (error) {
    console.error("GET /api/project error:", error);
    return errorResponse("Failed to fetch projects", 500);
  }
});

export const POST = apiHandler(async (req: NextRequest) => {
  try {
    const userId = req.headers.get("x-user-id");
    if (!userId) return errorResponse("Unauthorized", 401);

    const formData = await req.formData();
    return await addProject(formData, userId);
  } catch (error) {
    console.error("POST /api/project error:", error);
    return errorResponse("Failed to create project. Please try again later.", 500);
  }
});

