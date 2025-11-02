// services/handleAssistantQuery.ts
import dbConnect from "@/lib/mongodb";
import Project from "@/models/project";
import File from "@/models/file";
import ChatHistory from "@/models/chatHistory";
import { extractTextFromUrl } from "@/services/extractText";
import { getAnswerFromTexts } from "@/services/qaChain";

export async function handleAssistantQuery(projectId: string, question: string) {
  await dbConnect();

  const project = await Project.findById(projectId).lean();
  if (!project) {
    throw new Error("Project not found");
  }

  // const files = await File.find({ _id: { $in: project.files } }).lean();
  // if (!files?.length) {
  //   throw new Error("No files found for this project");
  // }

  // const extractionPromises = files
  //   .filter((file) => file.url && file.filename)
  //   .map(async (file) => {
  //     const text = await extractTextFromUrl(file.url, file.filename);
  //     return text.trim().length > 10
  //       ? { text, meta: { filename: file.filename, fileId: String(file._id), url: file.url } }
  //       : null;
  //   });

  // const textsWithMeta = (await Promise.all(extractionPromises)).filter(Boolean) as {
  //   text: string;
  //   meta: { filename: string; fileId: string; url: string };
  // }[];

  // if (!textsWithMeta.length) {
  //   throw new Error("No readable text extracted from project files.");
  // }

  // const texts = textsWithMeta.map((t) => t.text);
  // const metadatas = textsWithMeta.map((t) => t.meta);

  // const answer = await getAnswerFromTexts(texts, metadatas, question);

  let chatHistory = await ChatHistory.findOne({ projectId });
  if (!chatHistory) {
    chatHistory = new ChatHistory({ projectId, messages: [] });
  }

  chatHistory.messages.push(
    { role: "user", content: question, timestamp: new Date() },
    { role: "assistant", content: 'answer', timestamp: new Date() }
  );

  chatHistory.updatedAt = new Date();
  await chatHistory.save();

  return {
    answer:'answer',
    sources: 'metadatas',
    chatId: chatHistory._id,
  };
}
