import { addOrderApi, IAddOrder } from "@/services/orderApi";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useAddOrder = () => {
  const { mutate, isPending, isError, data } = useMutation({
    mutationFn: ({ productId, variant }: IAddOrder) =>
      addOrderApi({ productId, variant }),

    onSuccess: () => toast.success("order created successfully!"),
    onError: (err) => toast.error(err.response.data.error),
  });

  return {
    orderData: data,
    addOrder: mutate,
    addOrderLoading: isPending,
    addOrderError: isError,
  };
};

export default useAddOrder;
