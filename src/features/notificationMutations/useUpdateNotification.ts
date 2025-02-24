import { updateNotifications } from "@/services/NotificationsApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useUpdateNotification = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: ({ id, title }: { id: string; title: string }) =>
      updateNotifications({ id, title }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      toast.success("Notification updated successfully!");
    },
    onError: (err: any) => toast.error(err.response.data.error),
  });
  return {
    updateNotification: mutate,
    updateNotificationPending: isPending,
  };
};

export default useUpdateNotification;
