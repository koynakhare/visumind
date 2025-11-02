// src/config/constants.ts

if (!process.env.MONGODB_URI) throw new Error("⚠️ MONGODB_URI is not defined");
if (!process.env.NEXTAUTH_SECRET) throw new Error("⚠️ NEXTAUTH_SECRET is not defined");
if (!process.env.JWT_SECRET) throw new Error("⚠️ JWT_SECRET is not defined");
if (!process.env.CLOUDINARY_CLOUD_NAME) throw new Error("⚠️ CLOUDINARY_CLOUD_NAME is not defined");
if (!process.env.CLOUDINARY_API_KEY) throw new Error("⚠️ CLOUDINARY_API_KEY is not defined");
if (!process.env.CLOUDINARY_API_SECRET) throw new Error("⚠️ CLOUDINARY_API_SECRET is not defined");
if (!process.env.GEMINI_API_KEY) throw new Error("⚠️ GEMINI_API_KEY is not defined");
if (!process.env.GEMINI_PROJECT_ID) throw new Error("⚠️ GEMINI_PROJECT_ID is not defined");
if (!process.env.GEMINI_ENDPOINT_ID) throw new Error("⚠️ GEMINI_ENDPOINT_ID is not defined");

export const MONGODB_URI = process.env.MONGODB_URI as string;
export const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET as string;
export const JWT_SECRET = process.env.JWT_SECRET as string;

export const CLOUDINARY_CONFIG = {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME as string,
  api_key: process.env.CLOUDINARY_API_KEY as string,
  api_secret: process.env.CLOUDINARY_API_SECRET as string,
};

export const GEMINI_CONFIG = {
  apiKey: process.env.GEMINI_API_KEY as string,
  projectId: process.env.GEMINI_PROJECT_ID as string,
  modelId: process.env.GEMINI_MODEL_ID as string,
  endpointId: process.env.GEMINI_ENDPOINT_ID as string,
};

export const MAX_UPLOAD_SIZE_MB = 50;
