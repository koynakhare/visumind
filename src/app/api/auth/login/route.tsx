import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/models/users";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    await dbConnect();

    const user = await User.findOne({ email });
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return NextResponse.json({ error: "Invalid password" }, { status: 401 });

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET as string, { expiresIn: "1d" });

    return NextResponse.json({ message: "Login successful", token });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
