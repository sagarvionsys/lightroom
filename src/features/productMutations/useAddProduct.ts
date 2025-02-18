import { addProductApi } from "@/services/productApi";
import { IProduct } from "@/types/product.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useAddProduct = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending, isError } = useMutation({
    mutationFn: (data: IProduct) => addProductApi(data),

    onSuccess: () => {
      toast.success("Product created successfully!");
      queryClient.invalidateQueries({ queryKey: ["query", "notifications"] });
    },
    onError: (err: any) => toast.error(err.response.data.error),
  });
  return {
    addProduct: mutate,
    addProductLoading: isPending,
    addProductError: isError,
  };
};

export default useAddProduct;
