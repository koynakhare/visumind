// models/ChatHistory.ts
import mongoose from "mongoose";

export interface IMessage {
  sender: string;
  content: string;
  timestamp: Date;
}
export interface IChatHistory extends Document {
  projectId: string;
  messages: IMessage[];
}
const MessageSchema = new mongoose.Schema({
  role: { type: String, enum: ["user", "assistant"], required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const ChatHistorySchema = new mongoose.Schema({
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
  messages: [MessageSchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const ChatHistory = mongoose.models.ChatHistory || mongoose.model("ChatHistory", ChatHistorySchema);
export default ChatHistory;
    