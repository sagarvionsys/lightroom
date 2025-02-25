import { IVoucher } from "@/types/voucher.types";
import axios from "axios";

export const verifyVoucher = async (code: FormDataEntryValue | null) => {
  const response = await axios.post("/api/voucher/verify", { code });
  return response.data;
};

export const getVouchers = async () => {
  const response = await axios.get("/api/voucher");
  return response.data;
};

export const addVoucher = async (data: IVoucher) => {
  const response = await axios.post("/api/voucher", data);
  return response.data;
};

export const deleteVoucher = async (id: string) => {
  const response = await axios.delete(`/api/voucher/?id=${id}`);
  return response.data;
};

export const updateVoucher = async (id: string, data: IVoucher) => {
  const response = await axios.put(`/api/voucher/?id=${id}`, data);
  return response.data;
};
