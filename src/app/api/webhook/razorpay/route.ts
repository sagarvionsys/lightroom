import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import dbConnect from "@/lib/db";
import Order from "@/models/order.model";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const signature = req.headers.get("x-razorpay-signature");

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET!)
      .update(JSON.stringify(body))
      .digest("hex");

    if (expectedSignature !== signature)
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });

    const event = body;
    await dbConnect();

    // payment success method
    if (event.event === "payment.captured") {
      const payment = event.payload.payment.entity;
      const order = await Order.findOneAndUpdate(
        { razorpayOrderId: payment.order_id },
        { razorpayPaymentId: payment.id, status: "completed" }
      ).populate([
        { path: "userId", select: "userName email" },
        { path: "productId", select: "name" },
      ]);
      console.log(order);
    }

    return NextResponse.json(
      { message: "success", status: "ok" },
      { status: 200 }
    );
  } catch (error) {
    console.log("API Error at api/webhook/razorpay:POST", error);
    return new Response("Internal server error", { status: 500 });
  }
}
