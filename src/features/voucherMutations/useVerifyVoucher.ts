import { verifyVoucher } from "@/services/voucher";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useVerifyVoucher = () => {
  const { mutate, isPending, isError } = useMutation({
    mutationFn: (code: FormDataEntryValue | null) => verifyVoucher(code),
    onSuccess: () => toast.success("Voucher is verified"),
    onError: (err: any) => toast.error(err.response.data.error),
  });
  return {
    verifyVoucher: mutate,
    verifyVoucherPending: isPending,
    verifyVoucherError: isError,
  };
};

export default useVerifyVoucher;
