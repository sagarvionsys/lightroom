import mongoose from "mongoose";
import { ImageVariant } from "./product.types";

interface PopulatedUser {
  _id: mongoose.Types.ObjectId;
  email: string;
  userName: string;
}

interface PopulatedProduct {
  _id: mongoose.Types.ObjectId;
  name: string;
  imageUrl: string;
}

export interface ICart {
  _id?: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId | PopulatedUser;
  productId: mongoose.Types.ObjectId | PopulatedProduct | string;
  variant: ImageVariant;
  createdAt?: Date;
  updatedAt?: Date;
}
