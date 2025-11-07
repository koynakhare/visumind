// /api/projects/[id]/route.ts
import { NextRequest } from "next/server";
import { apiHandler } from "@/lib/apiHandler";
import {
  getProjectById,
  updateProjectById,
  deleteProjectById,
} from "@/services/project.service";
import { errorResponse } from "@/lib/responses";

export const GET = apiHandler(async (req: NextRequest, context) => {
  const { id } = await context.params;
  const userId = req.headers.get("x-user-id");
  if (!userId) return errorResponse("Unauthorized", 401);
  if (!id) return errorResponse("Project ID is required", 400);

  return await getProjectById(id, userId);
});

export const PUT = apiHandler(async (req: NextRequest, context) => {
  const { id } = await context.params;
  const userId = req.headers.get("x-user-id");
  if (!userId) return errorResponse("Unauthorized", 401);
  if (!id) return errorResponse("Project ID is required", 400);

  const formData = await req.formData();
  return await updateProjectById(id, formData, userId);
});

export const DELETE = apiHandler(async (req: NextRequest, context) => {
  const { id } = await context.params;
  const userId = req.headers.get("x-user-id");
  if (!userId) return errorResponse("Unauthorized", 401);
  if (!id) return errorResponse("Project ID is required", 400);

  return await deleteProjectById(id, userId);
});
