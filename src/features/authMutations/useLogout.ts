import { useMutation } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";

const useLogOut = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: () => signOut(),
    onSuccess: () => toast.success("user logOut successful"),
    onError: () => toast.error("there error while logOut"),
  });
  return {
    logOut: mutate,
    logOutPending: isPending,
  };
};

export default useLogOut;
