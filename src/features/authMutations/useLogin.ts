import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";

const useLogin = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      signIn("credentials", {
        email: email,
        password: password,
        redirect: false,
      }),
    onSuccess: () => toast.success("user login successful"),
    onError: () => toast.error("there error while logging"),
  });
  return {
    login: mutate,
    loginPending: isPending,
  };
};

export default useLogin;
