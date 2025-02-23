import { NextResponse } from "next/server";
import connectDB from "@/config/db";
import { User } from "@/models/userModel";

export async function GET() {
  await connectDB();
  const users = await User.find();
  return NextResponse.json({ users });
}