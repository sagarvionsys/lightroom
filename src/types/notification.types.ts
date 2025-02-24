import mongoose from "mongoose";

export interface INotification {
  receiver: mongoose.Types.ObjectId;
  _id: mongoose.Types.ObjectId | string;
  nexusId: string;
  title: string;
  createdAt?: string;
  updateAt?: string;
  imageId?: string;
  isRead: false;
}
