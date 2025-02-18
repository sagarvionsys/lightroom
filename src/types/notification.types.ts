import mongoose from "mongoose";

export interface INotification {
  _id: mongoose.Types.ObjectId | string;
  title: string;
  createdAt?: Date;
  updateAt?: Date;
  imageId?: string;
}
