import arcjet, { protectSignup, shield } from "@/lib/arcjet";
import ip from "@arcjet/ip";
import dbConnect from "@/lib/db";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

const aj = arcjet
  .withRule(
    protectSignup({
      email: {
        mode: "LIVE",
        block: ["DISPOSABLE", "INVALID", "NO_MX_RECORDS"],
      },
      bots: { mode: "LIVE", allow: ["CATEGORY:SEARCH_ENGINE"] },
      rateLimit: { mode: "LIVE", interval: 60, max: 5 },
    })
  )
  .withRule(
    shield({
      mode: "LIVE",
    })
  );

export async function POST(req: NextRequest) {
  try {
    const userIp =
      process.env.NODE_ENV === "development"
        ? "127.0.0.1"
        : ip(req) || "0.0.0.0";
    const { email, password, userName } = await req.json();
    const decision = await aj.protect(req, { fingerprint: userIp, email });

    if (decision.isDenied()) {
      return NextResponse.json(
        {
          error: decision.reason.isRateLimit()
            ? "Too many requests - Please try again later"
            : "Email address is forbidden",
        },
        { status: decision.reason.isRateLimit() ? 429 : 403 }
      );
    }

    await dbConnect();

    if (await User.exists({ email })) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    await User.create({ email, password, userName });

    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Signup error:", error.message, { stack: error.stack });
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
