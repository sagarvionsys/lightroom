import { model, Schema, models } from "mongoose";
import { INotification } from "@/types/notification.types";

const notificationSchema = new Schema<INotification>(
  {
    title: { type: "string", required: true },
    imageId: { type: "string" },
  },
  { timestamps: true }
);

const Notification =
  models?.Notification ||
  model<INotification>("Notification", notificationSchema);

export default Notification;
