import axios from "axios";
import pdfParse from "pdf-parse";
import mammoth from "mammoth";

export async function extractTextFromFile(url: string, filename: string): Promise<string> {
console.log(url,'url')

  const ext = filename.split(".").pop()?.toLowerCase();
  const response = await axios.get(url, { responseType: "arraybuffer" });
  const buffer = Buffer.from(response.data);
console.log(url,'url')
  if (ext === "pdf") {
    const data = await pdfParse(buffer);
    return data.text.trim();
  }

  if (ext === "docx") {
    const { value } = await mammoth.extractRawText({ buffer });
    return value.trim();
  }

  if (["txt", "md", "csv", "json"].includes(ext || "")) {
    return buffer.toString("utf8").trim();
  }

  return `[Unsupported file type: ${ext}]`;
}
