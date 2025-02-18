import { addToCartApi, addToCartProps } from "@/services/cartApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useItemToCart = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending, isError } = useMutation({
    mutationFn: ({ productId, variant }: addToCartProps) =>
      addToCartApi({ productId, variant }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success("item added successfully!");
    },
    onError: (err:any) => toast.error(err.response.data.error),
  });
  return {
    addItemToCart: mutate,
    addItemToPending: isPending,
    addItemToCartError: isError,
  };
};

export default useItemToCart;
