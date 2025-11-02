import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProject extends Document {
  name: string;
  description: string;
  createdAt: Date;
  files: mongoose.Types.ObjectId[];
}

const ProjectSchema: Schema<IProject> = new Schema({
  name: { type: String,  },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
  files: [{ type: Schema.Types.ObjectId, ref: "File" }],
});

const Project: Model<IProject> = mongoose.models.Project || mongoose.model("Project", ProjectSchema);
export default Project;
