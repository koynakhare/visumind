import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { question, text } = await req.json();

    if (!question || !text) {
      return NextResponse.json({ error: "Missing question or text" }, { status: 400 });
    }

    if (!process.env.HUGGINGFACE_API_KEY) {
      return NextResponse.json({ error: "Hugging Face API key missing" }, { status: 500 });
    }
    if (!text.trim()) {
      return NextResponse.json({ answer: "No text extracted from PDF" });
    }

    const response = await fetch(
      "https://api-inference.huggingface.co/models/deepset/roberta-base-squad2",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputs: { question, context: text } }),
      }
    );

    const data = await response.json();

    const answer = data.answer?.trim();
    return NextResponse.json({
      answer: answer || "I couldn't find an answer in the PDF.",
    });
  } catch (err) {
    console.error("QA error:", err);
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
