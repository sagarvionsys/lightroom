import dbConnect from "@/lib/db";
import cart from "@/models/cart.model";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await props.params;
    await dbConnect();

    const removedItem = await cart.findByIdAndDelete(id);
    return NextResponse.json(
      { message: "cart item deleted", removedItem },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
