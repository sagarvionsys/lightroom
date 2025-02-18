import { createNotifications } from "@/services/NotificationsApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useAddNotification = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (title: string) => createNotifications(title),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      toast.success("Notification added successfully!");
    },
    onError: (err: any) => toast.error(err.response.data.error),
  });
  return {
    createNotification: mutate,
    createNotificationPending: isPending,
  };
};

export default useAddNotification;
