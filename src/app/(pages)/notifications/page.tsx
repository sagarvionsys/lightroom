"use client";

import React from "react";
import { BellDot } from "lucide-react";
import { useQueryFunction } from "@/features/useQuery";
import { getNotifications } from "@/services/NotificationsApi";
import { INotification } from "@/types/notification.types";
import NotificationList from "@/components/NotificationList";
import { NotificationSkeleton } from "@/components/Skeletons";
import useMarkNotification from "@/features/notificationMutations/useMarkNotification";
import Spinner from "@/components/Spinner";
import { useSession } from "next-auth/react";

const NotificationsPage = () => {
  const { data: notifications, isLoading } = useQueryFunction(
    ["notifications"],
    getNotifications
  );
  const { markNotification, markNotificationPending } = useMarkNotification();
  const { data: session } = useSession();

  return (
    <div className=" text-white flex flex-col items-center px-3">
      {/* Header */}
      <header className="w-full max-w-2xl flex  items-center justify-between border-b border-gray-700 pb-4">
        <h1 className="text-2xl font-bold">Notifications</h1>
        <div className="flex justify-center items-center gap-3">
          <button
            className="bg-gray-100 hover:bg-white transition-colors text-black p-2 rounded-md flex items-center gap-2"
            disabled={markNotificationPending}
            onClick={() =>
              markNotification({
                nexusId: "",
                receiver: session?.user.id as string,
              })
            }
          >
            {markNotificationPending ? <Spinner /> : <span>Mark all </span>}
          </button>
          <BellDot className="text-primary-500" size={28} />
        </div>
      </header>

      {/* Notifications List */}
      <section className="hideBar w-full max-w-2xl mt-6 space-y-4 max-h-[23rem] overflow-y-scroll">
        {isLoading &&
          Array.from({ length: 4 }).map((_, idx) => (
            <NotificationSkeleton key={idx} />
          ))}

        {!isLoading && notifications?.length > 0
          ? notifications.map((note: INotification) => (
              <NotificationList key={note._id as string} notes={note} />
            ))
          : !isLoading && (
              <p className="text-gray-400 text-sm text-center">
                No notifications yet.
              </p>
            )}
      </section>
    </div>
  );
};

export default NotificationsPage;
