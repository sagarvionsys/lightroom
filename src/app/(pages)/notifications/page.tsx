"use client";

import React from "react";
import { BellDot } from "lucide-react";
import { useQueryFunction } from "@/features/useQuery";
import { getNotifications } from "@/services/NotificationsApi";
import { INotification } from "@/types/notification.types";
import NotificationList from "@/components/NotificationList";
import { NotificationSkeleton } from "@/components/Skeletons";

const NotificationsPage = () => {
  const { data: notifications, isLoading } = useQueryFunction(
    ["notifications"],
    getNotifications
  );

  return (
    <div className="min-h-screen text-white flex flex-col items-center">
      {/* Header */}
      <header className="w-full max-w-2xl flex items-center justify-between border-b border-gray-700 pb-4">
        <h1 className="text-2xl font-bold">Notifications</h1>
        <BellDot className="text-primary-500" size={28} />
      </header>

      {/* Notifications List */}
      <section className="w-full max-w-2xl mt-6 space-y-4">
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
