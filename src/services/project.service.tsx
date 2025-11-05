import Project from "@/models/project";
import File from "@/models/file";
import { extractFormData } from "@/utils/helper";
import { validateRequest } from "@/validations/validate";
import { addProjectSchema } from "@/validations/project.validate";
import { processAndUploadFiles } from "@/services/uploadToCloudinary";
import { successResponse, errorResponse } from "@/lib/responses";
import mongoose, { isValidObjectId } from "mongoose";

export async function getAllProjects() {
  const projects = await Project.aggregate([
    {
      $addFields: {
        noOfFiles: { $size: "$files" }
      }
    }
  ]);

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

  const { name, description, newFiles: files } = validation.data;

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

  const { name, description, oldFiles = [], newFiles = [] } = validation.data;

  let savedFileIds: string[] = [];
  if (newFiles.length > 0) {
    savedFileIds = await processAndUploadFiles(newFiles);
  }

  const allFiles = [...oldFiles, ...savedFileIds].filter(Boolean);

  const updateData: any = {
    name,
    description,
    files: allFiles,
  };

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

  // Find project first
  const project = await Project.findById(id);
  if (!project) {
    return errorResponse("Project not found", 404);
  }

  // Delete all associated files
  if (project.files && project.files.length > 0) {
    await File.deleteMany({ _id: { $in: project.files } });
  }

  // Delete project itself
  await Project.findByIdAndDelete(id);

  return successResponse(
    { message: "Project and associated files successfully deleted" },
    { action: "deleted", model: "project" },
    200
  );
}
