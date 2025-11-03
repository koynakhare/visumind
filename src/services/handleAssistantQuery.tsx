import dbConnect from "@/lib/mongodb";
import Project from "@/models/project";
import ChatHistory from "@/models/chatHistory";
import File from "@/models/file";
import OpenAI from "openai";
import { extractTextFromFile } from "./readFileFromCloudinary";
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function handleAssistantQuery(projectId: string, question: string) {
  await dbConnect();

  const project = await Project.findById(projectId).lean();
  if (!project) throw new Error("Project not found");
  const fileIds = project?.files || [];
  const files = await File.find({ _id: { $in: fileIds } });

  const extractedTexts = await Promise.all(
    files.map(async (file) => {
      try {
        console.log("🟢 Extracting:", file.filename, file.url);
        const text = await extractTextFromFile(file.url, file.filename);
        console.log("✅ Extracted text length:", text.length);
        return `📄 ${file.filename}:\n${text.substring(0, 1000)}...`;
      } catch (err) {
        console.error(`❌ Error reading ${file.filename}:`, err);
        return `⚠️ Could not extract text from ${file.filename}`;
      }
    })
  );

  let chatHistory = await ChatHistory.findOne({ projectId });
  if (!chatHistory) chatHistory = new ChatHistory({ projectId, messages: [] });

  const messages = [
    {
      role: "system",
      content:
        "You are an intelligent assistant that answers questions about software projects and their attached files. Use file data if it helps answer the question accurately.",
    },
    {
      role: "user",
      content: `Project Info:\n${JSON.stringify(project, null, 2)}\n\nAttached Files:\n${extractedTexts.join(
        "\n\n"
      )}\n\nUser Question: ${question}`,
    },
  ];

  // 🤖 Ask OpenAI
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages,
    temperature: 0.7,
  });

  const aiAnswer = completion.choices[0]?.message?.content || "Sorry, I couldn’t generate a response.";

  // 💾 Save to chat history
  chatHistory.messages.push(
    { role: "user", content: question, timestamp: new Date() },
    { role: "assistant", content: aiAnswer, timestamp: new Date() }
  );
  chatHistory.updatedAt = new Date();
  await chatHistory.save();

  return {
    answer: aiAnswer,
    chatId: chatHistory._id,
    projectFiles: files.map((f) => f.filename), // optional debug info
  };
}
