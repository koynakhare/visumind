import fs from "fs";
import path from "path";

export async function saveFileLocally(file: File) {
  const uploadsDir = path.join(process.cwd(), "public", "uploads");
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const filePath = path.join(uploadsDir, (file as any).name);
  fs.writeFileSync(filePath, buffer);

  return filePath; // absolute path for pdf-parse
}
