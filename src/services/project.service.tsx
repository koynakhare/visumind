import Project from "@/models/project";
import File from "@/models/file";
import { extractFormData } from "@/utils/helper";
import { validateRequest } from "@/validations/validate";
import { addProjectSchema } from "@/validations/project.validate";
import { processAndUploadFiles } from "@/services/uploadToCloudinary";
import { successResponse, errorResponse } from "@/lib/responses";
import mongoose, { isValidObjectId } from "mongoose";

export async function getAllProjects(userId: string) {
  const projects = await Project.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(userId) } },
    { $addFields: { noOfFiles: { $size: "$files" } } },
  ]);

  return successResponse(projects, { action: "fetched", model: "project" });
}

export async function addProject(formData: FormData, userId: string) {
  const formFields = extractFormData(formData);
  if ("error" in formFields) return errorResponse(formFields.error, 400);

  const validation = await validateRequest(formFields, addProjectSchema);
  if (!validation.success) return errorResponse(validation.error, 400);

  const { name, description, newFiles: files } = validation.data;

  const savedFileIds = await processAndUploadFiles(files || []);

  const project = await Project.create({
    name,
    description,
    files: savedFileIds,
    createdBy: new mongoose.Types.ObjectId(userId),
  });

  return successResponse(project, { action: "created", model: "project" }, 201);
}

export async function getProjectById(id: string, userId: string) {
  if (!isValidObjectId(id)) return errorResponse("Invalid project ID", 400);

  const project = await Project.findOne({ _id: id, createdBy: userId }).populate("files");
  if (!project) return errorResponse("Project not found or access denied", 404);

  return successResponse(project, { action: "fetched", model: "project" });
}

export async function updateProjectById(id: string, formData: FormData, userId: string) {
  if (!isValidObjectId(id)) return errorResponse("Invalid project ID", 400);

  const formFields = extractFormData(formData);
  if ("error" in formFields) return errorResponse(formFields.error, 400);

  const validation = await validateRequest(formFields, addProjectSchema);
  if (!validation.success) return errorResponse(validation.error, 400);

  const { name, description, oldFiles = [], newFiles = [] } = validation.data;
  const savedFileIds = newFiles.length ? await processAndUploadFiles(newFiles) : [];
  const allFiles = [...oldFiles, ...savedFileIds].filter(Boolean);

  const project = await Project.findOneAndUpdate(
    { _id: id, createdBy: userId },
    { name, description, files: allFiles },
    { new: true }
  );

  if (!project) return errorResponse("Project not found or access denied", 404);

  return successResponse(project, { action: "updated", model: "project" });
}

export async function deleteProjectById(id: string, userId: string) {
  if (!isValidObjectId(id)) return errorResponse("Invalid project ID", 400);

  const project = await Project.findOne({ _id: id, createdBy: userId });
  if (!project) return errorResponse("Project not found or access denied", 404);

  if (project.files?.length) {
    await File.deleteMany({ _id: { $in: project.files } });
  }

  await Project.deleteOne({ _id: id, createdBy: userId });

  return successResponse(
    { message: "Project and associated files successfully deleted" },
    { action: "deleted", model: "project" },
    200
  );
}
