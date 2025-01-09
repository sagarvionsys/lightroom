import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/db";
import { razorInstance } from "@/lib/razorInstance";
import Order from "@/models/order.model";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(rea: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session)
      return NextResponse.json(
        { error: "Unauthorized Access" },
        { status: 401 }
      );

    const { productId, variant } = await rea.json();
    if (!productId || !variant)
      return NextResponse.json(
        { error: "product with variant needed." },
        { status: 400 }
      );

    await dbConnect();

    const order = await razorInstance.orders.create({
      amount: Math.round(variant.price * 100),
      currency: "INR",
      receipt: `receipt-${Date.now()}`,
      notes: {
        productId: productId.toString(),
        userId: session.user.id.toString(),
      },
    });

    const newOrder = await Order.create({
      userId: session.user.id,
      productId,
      variant,
      razorpayOrderId: order.id,
      amount: Math.round(variant.price * 100),
      status: "pending",
    });

    return NextResponse.json(
      { newOrder, razorPayOrder: order },
      { status: 201 }
    );
  } catch (error) {
    console.log("API Error at api/orders:POST", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
