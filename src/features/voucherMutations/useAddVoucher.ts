import { addVoucher } from "@/services/voucher";
import { IVoucher } from "@/types/voucher.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useAddVoucher = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending, isError } = useMutation({
    mutationFn: (data: IVoucher) => addVoucher(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["voucher"] });
      toast.success("Voucher is added");
    },
    onError: (err: any) => toast.error(err.response.data.error),
  });
  return {
    addVoucher: mutate,
    addVoucherPending: isPending,
    addVoucherError: isError,
  };
};

export default useAddVoucher;
