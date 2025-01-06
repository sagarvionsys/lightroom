import mongoose from "mongoose";

export interface IUser {
  email: string;
  password: string;
  role: "user" | "admin";
  _id?: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}
