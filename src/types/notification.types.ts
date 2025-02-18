import mongoose from "mongoose";

export interface INotification {
  _id: mongoose.Types.ObjectId | string;
  title: string;
  createdAt?: string;
  updateAt?: string;
  imageId?: string;
}
