"use client";

import React from "react";
import { BellDot } from "lucide-react";
import { useQueryFunction } from "@/features/useQuery";
import { getNotifications } from "@/services/NotificationsApi";
import { INotification } from "@/types/notification.types";
import NotificationList from "@/components/NotificationList";

const NotificationsPage = () => {
  const { data: notifications, isLoading: notificationsLoading } =
    useQueryFunction(["notifications"], getNotifications);

  return (
    <div className="min-h-screen  text-white flex flex-col items-center">
      {/* Header */}
      <div className="w-full max-w-2xl flex items-center justify-between border-b border-gray-700 pb-4">
        <h1 className="text-2xl font-bold">Notifications</h1>
        <BellDot className="text-primary-500" size={28} />
      </div>

      {/* Notifications List */}
      <div className="w-full max-w-2xl mt-6 space-y-4">
        {notifications?.length > 0 ? (
          notifications?.map((notes: INotification, idx: number) => (
            <NotificationList key={idx} notes={notes} />
          ))
        ) : (
          <p className="text-gray-400 text-sm text-center">
            No notifications yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
