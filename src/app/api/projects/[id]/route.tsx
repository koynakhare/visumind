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
  if (!id) return errorResponse("Project ID is required", 400);
  return await getProjectById(id);
});

export const PUT = apiHandler(async (req: NextRequest, context) => {
  const { id } = await context.params;
  if (!id) return errorResponse("Project ID is required", 400);
  const formData = await req.formData();
  return await updateProjectById(id, formData);
});

export const DELETE = apiHandler(async (_req: NextRequest, context) => {
  const { id } = await context.params;
  if (!id) return errorResponse("Project ID is required", 400);
  return await deleteProjectById(id);
});
