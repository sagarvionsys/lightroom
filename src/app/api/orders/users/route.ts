import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/db";
import Order from "@/models/order.model";
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

    await dbConnect();
    const userOrder = await Order.find({ userId: session.user.id })
      .populate({
        path: "productId",
        select: "name imageUrl",
        options: { strictPopulate: false },
      })
      .sort({ createdAt: -1 })
      .lean();

    if (!userOrder)
      return NextResponse.json({ error: "No orders found" }, { status: 404 });

    return NextResponse.json({ userOrder }, { status: 200 });
  } catch (error) {
    console.log("API Error at api/orders/users:GET", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
