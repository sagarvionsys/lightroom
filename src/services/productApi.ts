import { IProduct } from "@/types/product.types";
import axios from "axios";

export const getProductApi = async () => {
  const response = await axios.get("/api/products");
  return response.data;
};

export const addProductApi = async (data: IProduct) => {
  const response = await axios.post("/api/products", data);
  return response.data;
};

export const getProductApiById = async (id: string) => {
  const response = await axios.get(`/api/products/${id}`);
  return response.data;
};

export const deleteProductApi = async (id: string) => {
  const response = await axios.delete(`/api/products/${id}`);
  return response.data;
};
