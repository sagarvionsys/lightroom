import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/db";
import { razorInstance } from "@/lib/razorInstance";
import Order from "@/models/order.model";
import Voucher from "@/models/voucher.model";
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

    const { productId, variant, voucherAmount, voucherId } = await rea.json();
    if (!productId || !variant)
      return NextResponse.json(
        { error: "product with variant needed." },
        { status: 400 }
      );

    await dbConnect();
    const ProductPrice = variant?.price - voucherAmount;
    const order = await razorInstance.orders.create({
      amount: Math.round(ProductPrice * 100),
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
      amount: ProductPrice,
      status: "pending",
    });

    if (voucherAmount > 0) {
      await Voucher.findOneAndUpdate(
        { _id: voucherId },
        {
          $inc: { voucherNumber: -1 },
        }
      );
    }

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      dbOrderId: newOrder._id,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
