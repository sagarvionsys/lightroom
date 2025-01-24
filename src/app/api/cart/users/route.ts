import { authOptions } from "@/lib/auth";
import cart from "@/models/cart.model";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session)
      return NextResponse.json(
        { error: "Unauthorized Access" },
        { status: 401 }
      );
    const cartItems = await cart
      .find({ userId: session.user.id })
      .populate({
        path: "productId",
        select: "name imageUrl description",
        options: { strictPopulate: false },
      })
      .lean();

    if (!cartItems)
      return NextResponse.json(
        { error: "No cart item found" },
        { status: 404 }
      );

    return NextResponse.json({ cartItems }, { status: 200 });
  } catch (error) {
    console.log("get user cart error", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
