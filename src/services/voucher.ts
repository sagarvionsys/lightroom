import axios from "axios";

export const verifyVoucher = async (code: FormDataEntryValue | null) => {
  const response = await axios.post("/api/voucher/verify", { code });
  return response.data;
};
