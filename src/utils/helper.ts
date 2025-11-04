import mongoose from "mongoose";

type ExtractedFormData = {
  name: string;
  description: string;
  files: unknown[];
};

export function extractFormData(formData: FormData): ExtractedFormData | { error: string } {
  const nameRaw = formData.get("name");
  if (typeof nameRaw !== "string" || !nameRaw.trim()) {
    return { error: "Invalid form data: 'name' is required" };
  }
  const name = nameRaw.trim();

  const descriptionRaw = formData.get("description");
  const description = typeof descriptionRaw === "string" ? descriptionRaw.trim() : "";

  const oldFiles = formData.getAll("oldFiles[]"); // string[] of file IDs or URLs
  const newFiles = formData.getAll("newFiles[]"); // actual File objects

  return { name, description, oldFiles, newFiles };
}

export function isValidObjectId(id: string) {
  return mongoose.Types.ObjectId.isValid(id);
}