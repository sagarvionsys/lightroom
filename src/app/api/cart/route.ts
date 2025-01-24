import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/db";
import cart from "@/models/cart.model";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session)
      return NextResponse.json(
        { error: "Unauthorized Access" },
        { status: 401 }
      );

    const { productId, variant } = await req.json();
    const { type, price, license } = variant;

    await dbConnect();
    const existingCartItem = await cart.findOne({
      userId: session?.user.id,
      productId,
      variant: {
        type,
        price,
        license,
      },
    });

    if (existingCartItem)
      return NextResponse.json(
        { error: "product with this variant already exist in cart." },
        { status: 400 }
      );

    const newCartItem = await cart.create({
      userId: session?.user.id,
      productId,
      variant,
    });

    return NextResponse.json(
      { message: "item added cart", newCartItem },
      { status: 201 }
    );
  } catch (error) {
    console.log("add cart error", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
