import mongoose, { Schema, Document, Model } from "mongoose";

export interface IFile extends Document {
  filename: string;
  url: string;
  public_id: string;
  size: number;
  createdAt: Date;
}

const FileSchema: Schema<IFile> = new Schema({
  filename: { type: String, required: true },
  url: { type: String, required: true },
  public_id: { type: String, required: true },
  size: { type: Number },
  createdAt: { type: Date, default: Date.now },
});

const File: Model<IFile> = mongoose.models.File || mongoose.model("File", FileSchema);
export default File;
