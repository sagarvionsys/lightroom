import { ImageVariant } from "@/types/product.types";
import axios from "axios";

export interface addToCartProps {
  productId: string;
  variant: ImageVariant;
}

export const addToCartApi = async ({ productId, variant }: addToCartProps) => {
  const response = await axios.post("/api/cart", { productId, variant });
  return response.data;
};

export const getCartItems = async () => {
  const response = await axios.get("/api/cart/users");
  return response.data;
};
