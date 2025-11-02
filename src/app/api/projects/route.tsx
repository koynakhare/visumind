import { NextRequest } from "next/server";
import Project from "@/models/project";
import { apiHandler } from "@/lib/apiHandler";
import { successResponse, errorResponse } from "@/lib/responses";
import { addProject, getAllProjects } from "@/services/project.service";

export const config = {
  api: {
    bodyParser: false,
  },
};

export const GET = apiHandler(async () => {
  try {
    return await getAllProjects();
  } catch (error) {
    console.error("GET /api/project error:", error);
    return errorResponse("Failed to fetch projects", 500);
  }
});

export const POST = apiHandler(async (req: NextRequest) => {
  try {
    const formData = await req.formData();
    return await addProject(formData);
  } catch (error) {
    console.error("POST /api/project error:", error);
    return errorResponse("Failed to create project. Please try again later.", 500);
  }
});

