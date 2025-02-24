import { deleteNotification } from "@/services/NotificationsApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useDeleteNotification = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (id: string) => deleteNotification(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      toast.success("Notification deleted successfully!");
    },
    onError: (err: any) => toast.error(err.response.data.error),
  });
  return {
    deleteNotification: mutate,
    deleteNotificationPending: isPending,
  };
};

export default useDeleteNotification;
