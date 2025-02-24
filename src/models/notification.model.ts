import { model, Schema, models } from "mongoose";
import { INotification } from "@/types/notification.types";

const notificationSchema = new Schema<INotification>(
  {
    receiver: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    nexusId: { type: String, required: true },
    imageId: { type: String },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Notification =
  models?.Notification ||
  model<INotification>("Notification", notificationSchema);

export default Notification;
