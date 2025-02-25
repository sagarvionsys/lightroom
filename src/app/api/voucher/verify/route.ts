import dbConnect from "@/lib/db";
import Voucher from "@/models/voucher.model";
import { IVoucher } from "@/types/voucher.types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { code } = await req.json();

    if (!code) {
      return NextResponse.json(
        { error: "Voucher code is required" },
        { status: 400 }
      );
    }

    await dbConnect();

    const theVoucher: IVoucher | null = await Voucher.findOne(
      { code },
      "isActive name amount _id"
    );

    if (!theVoucher) {
      return NextResponse.json(
        { error: "Voucher does not exist, try another one" },
        { status: 404 }
      );
    }

    if (!theVoucher.isActive) {
      return NextResponse.json(
        { error: "Voucher is expired, try another one" },
        { status: 410 }
      );
    }

    if (theVoucher.voucherNumber === 0) {
      return NextResponse.json(
        { error: "Voucher limit reached, try another one" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { message: "Voucher is valid and active", voucher: theVoucher },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in API /voucher/verify: POST", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
