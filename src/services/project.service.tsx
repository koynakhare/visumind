import Project from "@/models/project";
import { extractFormData } from "@/utils/helper";
import { validateRequest } from "@/validations/validate";
import { addProjectSchema } from "@/validations/project.validate";
import { processAndUploadFiles } from "@/services/uploadToCloudinary";
import { successResponse, errorResponse } from "@/lib/responses";
import mongoose, { isValidObjectId } from "mongoose";

export async function getAllProjects() {
  const projects = await Project.find();
  return successResponse(projects, {
    action: "fetched",
    model: "project",
  });
}

export async function addProject(formData: FormData) {
  const formFields = extractFormData(formData);

  if ("error" in formFields) {
    return errorResponse(formFields.error, 400);
  }

  const validation = await validateRequest(formFields, addProjectSchema);

  if (!validation.success) {
    return errorResponse(validation.error, 400);
  }

  const { name, description, files } = validation.data;

  const savedFileIds = await processAndUploadFiles(files || []);

  const project = await Project.create({
    name,
    description,
    files: savedFileIds,
  });

  return successResponse(project, {
    action: "created",
    model: "project",
  }, 201);
}

export async function getProjectById(id: string) {
  if (!isValidObjectId(id)) {
    return errorResponse("Invalid project ID", 400);
  }

  const project = await Project.findById(id).populate("files");
  if (!project) {
    return errorResponse("Project not found", 404);
  }

  return successResponse(project, { action: "fetched", model: "project" });
}

export async function updateProjectById(id: string, formData: FormData) {
  if (!isValidObjectId(id)) {
    return errorResponse("Invalid project ID", 400);
  }
  const formFields = extractFormData(formData);

  if ("error" in formFields) {
    return errorResponse(formFields.error, 400);
  }

  const validation = await validateRequest(formFields, addProjectSchema); 

  if (!validation.success) {
    return errorResponse(validation.error, 400);
  }

  const { name, description, files } = validation.data;

  let savedFileIds = [];
  if (files && files.length) {
    savedFileIds = await processAndUploadFiles(files);
  }

  const updateData: any = {
    name,
    description,
  };

  if (savedFileIds.length) {
    updateData.files = savedFileIds;
  }

  // Find and update the project
  const project = await Project.findByIdAndUpdate(id, updateData, { new: true });

  if (!project) {
    return errorResponse("Project not found", 404);
  }

  return successResponse(project, { action: "updated", model: "project" });
}

export async function deleteProjectById(id: string) {
  if (!isValidObjectId(id)) {
    return errorResponse("Invalid project ID", 400);
  }

  const deleted = await Project.findByIdAndDelete(id);
  if (!deleted) {
    return errorResponse("Project not found", 404);
  }

  return successResponse(
    { message: "Project successfully deleted" },
    { action: "deleted", model: "project" },
    200
  );
}