import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import dbConnect from "@/lib/mongodb";
import User from "@/models/users";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();
    await dbConnect();

    const existing = await User.findOne({ email });
    if (existing) return NextResponse.json({ error: "User already exists" }, { status: 400 });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed });

    return NextResponse.json({ message: "User registered successfully", user });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
