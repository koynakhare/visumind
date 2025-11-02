import ChatHistory, { IChatHistory } from "@/models/chatHistory";

export async function getChatHistoryByProjectId(projectId: string) {
  const chatHistory = await ChatHistory.findOne({ projectId })
    .lean<IChatHistory | null>(); // 👈 important typing

  return chatHistory?.messages ?? null;
}
