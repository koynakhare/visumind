// models/project.ts
import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProject extends Document {
  name: string;
  description: string;
  createdAt: Date;
  files: mongoose.Types.ObjectId[];
  createdBy: mongoose.Types.ObjectId; // 👈 Add this
}

const ProjectSchema: Schema<IProject> = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
  files: [{ type: Schema.Types.ObjectId, ref: "File" }],
  createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true }, // 👈 Add this
});

const Project: Model<IProject> =
  mongoose.models.Project || mongoose.model("Project", ProjectSchema);

export default Project;
