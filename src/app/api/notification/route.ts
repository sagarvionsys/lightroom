import { authOptions } from "@/lib/auth";
import { v4 as uuidv4 } from "uuid";
import dbConnect from "@/lib/db";
import Notification from "@/models/notification.model";
import User from "@/models/user.model";
import { IUser } from "@/types/user.types";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

// to add notification from admin panel
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

    const theUsers: IUser[] = await User.find({});
    const nexusId = uuidv4();

    const promise = await Promise.all(
      theUsers?.map(async (user) => {
        return await Notification.create({
          receiver: user?._id,
          title,
          nexusId,
        });
      })
    );
    console.log(promise);

    return NextResponse.json(
      { message: "notification added", nexusId },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// to fetch notification by userId
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session)
      return NextResponse.json(
        { error: "Unauthorized Access, please login" },
        { status: 401 }
      );
    if (!session) await dbConnect();
    const allNotifications = await Notification.find({
      receiver: session?.user.id,
    });

    return NextResponse.json(allNotifications, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// to delete notification by nexusId
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

    const deleteNotifications = await Notification.deleteMany({ nexusId: id });

    if (!deleteNotifications)
      return NextResponse.json(
        { error: "Notification not  found or already deleted" },
        { status: 404 }
      );

    return NextResponse.json(deleteNotifications, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// to update notification by nexusId
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

    const updatedNotifications = await Notification.updateMany(
      { nexusId: id },
      { $set: { title } }
    );

    if (!updatedNotifications)
      return NextResponse.json(
        { error: "Notification not found, cannot update" },
        { status: 404 }
      );

    return NextResponse.json(updatedNotifications, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// to mark notification read or unread
export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized Access, please login" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const receiver = searchParams.get("receiver");
    const nexusId = searchParams.get("nexusId");

    if (!receiver || !nexusId) {
      return NextResponse.json(
        { error: "Notification not found" },
        { status: 404 }
      );
    }

    // Fetch notification first
    const notification = await Notification.findOne({ nexusId, receiver });

    if (!notification) {
      return NextResponse.json(
        { error: "Notification not found" },
        { status: 404 }
      );
    }

    notification.isRead = !notification.isRead;
    await notification.save();

    return NextResponse.json(notification, { status: 200 });
  } catch (error) {
    console.error("Error updating notification:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
