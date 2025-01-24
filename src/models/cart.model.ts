import { ICart } from "@/types/cart.types";
import { ImageVariantType } from "@/types/product.types";
import { Schema, model, models } from "mongoose";

const cartSchema = new Schema<ICart>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  variant: {
    type: {
      type: String,
      required: true,
      enum: ["SQUARE", "WIDE", "PORTRAIT"] as ImageVariantType[],
      set: (v: string) => v.toUpperCase(),
    },
    price: { type: Number, required: true },
    license: {
      type: String,
      required: true,
      enum: ["personal", "commercial"],
    },
  },
});

const cart = models?.cart || model<ICart>("cart", cartSchema);

export default cart;
