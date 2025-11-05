import { v2 as cloudinary } from "cloudinary";
import File from "@/models/file";
import { CLOUDINARY_CONFIG } from "../lib/constants";


cloudinary.config({
  cloud_name: CLOUDINARY_CONFIG.cloud_name,
  api_key: CLOUDINARY_CONFIG.api_key,
  api_secret: CLOUDINARY_CONFIG.api_secret,
});

function getResourceTypeFromExtension(filename: string): "image" | "video" | "raw" | "auto" {
  const ext = filename.split(".").pop()?.toLowerCase() || "";
  const imageExts = ["jpg", "jpeg", "png", "gif", "bmp", "webp", "tiff", "svg", "heic"];
  const videoExts = ["mp4", "mov", "avi", "wmv", "flv", "mkv", "webm"];
  const pdfExts = ["pdf"];

  if (imageExts.includes(ext)) return "image";
  if (videoExts.includes(ext)) return "video";
  if (pdfExts.includes(ext)) return "raw";


  return "raw";
}

export const uploadBufferToCloudinary = (
  buffer: Buffer,
  filename: string,
  folder = "projects"
) => {
  const resourceType = getResourceTypeFromExtension(filename);

  return new Promise<any>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: resourceType, type: "upload", },
      (error, result) => (error ? reject(error) : resolve(result))
    );

    stream.end(buffer);
  });
};

export async function processAndUploadFiles(files: unknown[]): Promise<string[]> {
  const savedFileIds = await Promise.all(
    (files as File[]).map(async (file) => {

      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const originalName = file.name || "unknown";

      const uploadResult = await uploadBufferToCloudinary(buffer, file?.name);
      console.log(uploadResult, 'uploadResult')
      const savedFile = await File.create({
        filename: originalName,
        url: uploadResult.secure_url,
        public_id: uploadResult.public_id,
      });

      return savedFile._id;
    })
  );
  console.log(savedFileIds, 'savedFileIds')
  return savedFileIds.filter((id): id is string => id !== null);
}