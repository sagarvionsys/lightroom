import axios from "axios";

export const getProductApi = async () => {
  const response = await axios.get("/api/products");
  return response.data;
};
