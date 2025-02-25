import { deleteVoucher, updateVoucher } from "@/services/voucher";
import { IVoucher } from "@/types/voucher.types";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useUpdateVoucher = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending, isError } = useMutation({
    mutationFn: ({ id, data }: { id: string; data: IVoucher }) =>
      updateVoucher(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["voucher"] });
      toast.success("Voucher is updated");
    },
    onError: (err: any) => toast.error(err.response.data.error),
  });
  return {
    updatedVoucher: mutate,
    updatedVoucherPending: isPending,
    updatedVoucherError: isError,
  };
};

export default useUpdateVoucher;
