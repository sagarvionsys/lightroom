import { markNotifications } from "@/services/NotificationsApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import mongoose from "mongoose";
import toast from "react-hot-toast";

const useMarkNotification = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: ({
      receiver,
      nexusId,
    }: {
      receiver: mongoose.Types.ObjectId | string;
      nexusId: string;
    }) => markNotifications({ receiver, nexusId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      toast.success("Notification marked successfully!");
    },
    onError: (err: any) => toast.error(err.response.data.error),
  });
  return {
    markNotification: mutate,
    markNotificationPending: isPending,
  };
};

export default useMarkNotification;
