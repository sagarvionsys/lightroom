import { deleteCartItem } from "@/services/cartApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useDeleteCartItem = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending, isError } = useMutation({
    mutationFn: (id: string) => deleteCartItem(id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success("cart item deleted successfully!");
    },
    onError: (err) => toast.error(err.response.data.error),
  });
  return {
    deleteItem: mutate,
    deleteItemPending: isPending,
    deleteItemError: isError,
  };
};

export default useDeleteCartItem;
