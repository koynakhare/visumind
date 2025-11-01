import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect";
import Project from "@/models/Project";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  const { id } = req.query;

  if (req.method === "GET") {
    const project = await Project.findById(id).populate("files");
    return res.status(200).json(project);
  }

  if (req.method === "PUT") {
    const project = await Project.findByIdAndUpdate(id, req.body, { new: true });
    return res.status(200).json(project);
  }

  if (req.method === "DELETE") {
    await Project.findByIdAndDelete(id);
    return res.status(204).end();
  }

  res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
