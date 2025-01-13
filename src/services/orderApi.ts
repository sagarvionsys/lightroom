import { ImageVariant } from "@/types/product.types";
import axios from "axios";
import { ObjectId } from "mongoose";

export interface IAddOrder {
  productId: string;
  variant: ImageVariant;
}
export const addOrderApi = async ({ productId, variant }: IAddOrder) => {
  const response = await axios.post("/api/orders", { productId, variant });
  return response.data;
};

export const getOrdersApi = async () => {
  const response = await axios.get("/api/orders/users/");
  return response.data;
};
