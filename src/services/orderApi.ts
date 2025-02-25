import { ImageVariant } from "@/types/product.types";
import axios from "axios";

export interface IAddOrder {
  voucherAmount: number;
  productId?: string;
  voucherId?: string;
  variant: ImageVariant;
}
export const addOrderApi = async ({
  productId,
  variant,
  voucherAmount,
  voucherId,
}: IAddOrder) => {
  const response = await axios.post("/api/orders", {
    productId,
    variant,
    voucherAmount,
    voucherId,
  });
  return response.data;
};

export const getOrdersApi = async () => {
  const response = await axios.get("/api/orders/users/");
  return response.data;
};
