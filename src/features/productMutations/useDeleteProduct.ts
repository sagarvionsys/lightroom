import { deleteProductApi } from "@/services/productApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending, isError } = useMutation({
    mutationFn: (id: string) => deleteProductApi(id),
    onSuccess: () => {
      toast.success("Product deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["query"] });
    },
    onError: (err: any) => toast.error(err.response.data.error),
  });
  return {
    deleteProduct: mutate,
    deleteProductPending: isPending,
    deleteProductError: isError,
  };
};

export default useDeleteProduct;
