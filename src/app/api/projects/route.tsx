import dbConnect from "@/lib/mongodb";
import Project from "@/models/project";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  await dbConnect();
  const projects = await Project.find()
  return NextResponse.json(projects);
}

export async function POST(req: NextRequest) {
  await dbConnect();
  const body = await req.json();
  const { name, description } = body;

  if (!name) return NextResponse.json({ error: "Name is required" }, { status: 400 });

  const project = await Project.create({ name, description });
  return NextResponse.json(project);
}
