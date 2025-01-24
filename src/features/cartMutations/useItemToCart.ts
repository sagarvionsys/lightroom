import { addToCartApi, addToCartProps } from "@/services/cartApi";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useItemToCart = () => {
  const { mutate, isPending, isError } = useMutation({
    mutationFn: ({ productId, variant }: addToCartProps) =>
      addToCartApi({ productId, variant }),

    onSuccess: () => toast.success("item added successfully!"),
    onError: (err) => toast.error(err.response.data.error),
  });
  return {
    addItemToCart: mutate,
    addItemToPending: isPending,
    addItemToCartError: isError,
  };
};

export default useItemToCart;
