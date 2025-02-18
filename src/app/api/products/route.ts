import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/db";
import Product from "@/models/product.model";
import { IProduct } from "@/types/product.types";
import Notification from "@/models/notification.model";

export async function GET() {
  try {
    await dbConnect();
    const productList = await Product.find({}).lean();

    if (!productList)
      return NextResponse.json({ error: "no Products Found" }, { status: 404 });

    return NextResponse.json({ productList }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== "admin")
      return NextResponse.json(
        { error: "Unauthorized Access" },
        { status: 401 }
      );

    await dbConnect();
    const body: IProduct = await req.json();

    if (
      !body.name ||
      !body.description ||
      !body.imageUrl ||
      body.variants.length === 0
    )
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );

    const newProduct = await Product.create(body);

    // notification for new product
    const newNotification = await Notification.create({
      title: `New image added: ${newProduct?.name}`,
      imageId: newProduct?._id,
    });

    return NextResponse.json({ newProduct, newNotification }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
