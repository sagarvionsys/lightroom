import dbConnect from "@/lib/db";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email, password, userName } = await req.json();
    if (!email || !password || !userName)
      return NextResponse.json(
        { error: "Email, password and userName are required" },
        { status: 400 }
      );

    await dbConnect();

    const alreadyExists = await User.findOne({ email });
    if (alreadyExists)
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );

    const newUser = await User.create({ email, password, userName });

    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.log("register error", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
