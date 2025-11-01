import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import FileModel from "@/models/file";
import pdfParse from "pdf-parse";
import { saveFileLocally } from "@/utils/fileUtils";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const formData = await req.formData();
    const file = formData.get("file") as File;
    const userId = formData.get("userId") as string;

    if (!file) throw new Error("No file uploaded");
    if (!userId) throw new Error("Missing userId");

    // ✅ Save file to disk
    const absFilePath = await saveFileLocally(file);

    // ✅ Create public URL (Next.js serves from /public)
    const publicUrl = "/uploads/" + (file as any).name;

    // ✅ Extract text from PDF
    const pdfBuffer = await file.arrayBuffer().then((buf) => Buffer.from(buf));
    const pdfData = await pdfParse(pdfBuffer);
console.log(pdfData,'pdfData')
    // ✅ Save file info in DB
    const savedFile = await FileModel.create({
      userId,
      type: (file as any).type,      // e.g. "application/pdf"
      fileName: (file as any).name,  // actual filename
      url: publicUrl,                // "/uploads/filename.pdf"
      metadata: { size: (file as any).size }, // optional
    });

    return NextResponse.json({ file: savedFile, text: pdfData.text });
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
