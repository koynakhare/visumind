import { NextRequest, NextResponse } from "next/server";
import { apiHandler } from "@/lib/apiHandler";
import { getProjectById, updateProjectById, deleteProjectById } from "@/services/project.service";
import { errorResponse } from "@/lib/responses";

export const GET = apiHandler(async (_req: NextRequest, { params }) => {
  if (!params?.id) return errorResponse("Project ID is required", 400);
  return await getProjectById(params.id);
});

export const PUT = apiHandler(async (req: NextRequest, { params }) => {
  if (!params?.id) return errorResponse("Project ID is required", 400);
  const formData = await req.formData();
  return await updateProjectById(params.id, formData);
});

export const DELETE = apiHandler(async (_req: NextRequest, { params }) => {
  if (!params?.id) return errorResponse("Project ID is required", 400);
  return await deleteProjectById(params.id);
});
