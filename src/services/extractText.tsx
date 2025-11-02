import pdf from "pdf-parse";
import mammoth from "mammoth";
import { GEMINI_CONFIG } from "../lib/constants";

const { apiKey,modelId } = GEMINI_CONFIG;
interface GeminiConfig {
  apiKey: string;
  modelId: string;
}

const GEMINI: GeminiConfig = {
  apiKey:apiKey,
  modelId: modelId,
};

async function fetchImageAsBase64(imageUrl: string): Promise<string> {
  const resp = await fetch(imageUrl);
  if (!resp.ok) {
    throw new Error(`Could not fetch image: ${resp.status}`);
  }
  const arrayBuffer = await resp.arrayBuffer();
  const bytes = new Uint8Array(arrayBuffer);
  const base64 = Buffer.from(bytes).toString("base64");
  return base64;
}

export async function extractTextFromImage(imageUrl: string): Promise<string> {
  const { apiKey, modelId } = GEMINI;
  if (!apiKey) {
    console.warn("Gemini API key is missing");
    return "";
  }

  const base64Data = await fetchImageAsBase64(imageUrl);

  const body = {
    contents: [
      {
        parts: [
          {
            inline_data: {
              mime_type: "image/jpeg",
              data: base64Data,
            },
          },
          {
            text: "Extract all the text from this image.",
          },
        ],
      },
    ],
  };

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${modelId}:generateContent`;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": apiKey,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gemini API error: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  const firstCandidate = data.candidates?.[0];
  const parts = firstCandidate?.content?.parts || [];

  return parts.map((p: any) => p.text || "").join("");
}


export async function extractTextFromUrl(fileUrl: string, filename: string): Promise<string> {
  try {
    const response = await fetch(fileUrl);
    if (!response.ok) {
      console.warn(`Failed to fetch ${fileUrl}: ${response.status}`);
      return "";
    }

    const buffer = Buffer.from(await response.arrayBuffer());
    const ext = filename.split(".").pop()?.toLowerCase() ?? "";

    switch (ext) {
      case "pdf":
        let test=await pdf(buffer)|| ""
        console.log(ext, 'ext')
        return (await pdf(buffer)).text || "";

      case "docx":
      case "doc":
        return (await mammoth.extractRawText({ buffer })).value || "";

      case "txt":
      case "md":
      case "js":
      case "ts":
      case "json":
      case "html":
      case "css":
        return buffer.toString("utf-8");

      case "png":
      case "jpg":
      case "jpeg":
      case "bmp":
      case "tiff":
        return extractTextFromImage(fileUrl);

      default:
        return "";
    }
  } catch (error) {
    console.error(`Error extracting text from ${filename}:`, error);
    return "";
  }
}
