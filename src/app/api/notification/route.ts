import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/db";
import Notification from "@/models/notification.model";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== "admin")
      return NextResponse.json(
        { error: "Unauthorized Access" },
        { status: 401 }
      );
    const { title } = await req.json();
    if (!title)
      return NextResponse.json(
        { error: "title required to create notifications" },
        { status: 404 }
      );

    await dbConnect();

    const notifications = await Notification.create({ title });
    return NextResponse.json({ notifications }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await dbConnect();
    const allNotifications = await Notification.find({});

    return NextResponse.json({ allNotifications }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== "admin")
      return NextResponse.json(
        { error: "Unauthorized Access" },
        { status: 401 }
      );

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id)
      return NextResponse.json(
        { error: "notification Id not found" },
        { status: 404 }
      );

    const deleteNotifications = await Notification.findByIdAndDelete(id);

    if (!deleteNotifications)
      return NextResponse.json(
        { error: "Notification not  found or already deleted" },
        { status: 404 }
      );

    return NextResponse.json({ deleteNotifications }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== "admin")
      return NextResponse.json(
        { error: "Unauthorized Access" },
        { status: 401 }
      );

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const { title } = await req.json();

    if (!id || !title)
      return NextResponse.json(
        { error: "notification Id or title not found" },
        { status: 404 }
      );

    const updatedNotifications = await Notification.findByIdAndUpdate(id, {
      title,
    });
    if (!updatedNotifications)
      return NextResponse.json(
        { error: "Notification not found, cannot update" },
        { status: 404 }
      );

    return NextResponse.json({ updatedNotifications }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
