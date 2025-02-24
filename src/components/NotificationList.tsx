"use client";

import React from "react";
import Link from "next/link";
import Spinner from "./Spinner";
import useMarkNotification from "@/features/notificationMutations/useMarkNotification";
import { INotification } from "@/types/notification.types";
import {
  Image,
  Info,
  Mail,
  MailCheck,
  SquareArrowOutUpRight,
} from "lucide-react";
import { formatDate } from "@/utils/formatDate";

const NotificationList = ({ notes }: { notes: INotification }) => {
  const { title, createdAt, imageId, isRead, nexusId, receiver } = notes;
  const { markNotification, markNotificationPending } = useMarkNotification();

  return (
    <div
      className={`flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between p-3 ${
        isRead ? "bg-black" : "bg-gray-700"
      } border border-gray-700 rounded-lg shadow-md w-full`}
    >
      <div className="flex items-start sm:items-center gap-3 w-full sm:w-auto">
        {imageId ? (
          <Image className="text-purple-500 w-5 h-5 sm:w-6 sm:h-6" />
        ) : (
          <Info className="text-blue-500 w-5 h-5 sm:w-6 sm:h-6" />
        )}
        <div className="flex-1">
          <p className="text-sm sm:text-md text-white">{title}</p>
          <p className="text-xs text-gray-400 mt-1">
            {formatDate(createdAt as string)}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap justify-end sm:justify-center items-center gap-3 w-full sm:w-auto">
        {imageId && (
          <Link
            href={`product/${imageId}`}
            className="bg-gray-100 hover:bg-white transition-colors text-black p-2 rounded-md flex items-center gap-2 text-sm sm:text-base"
          >
            <SquareArrowOutUpRight />
          </Link>
        )}
        <button
          className="bg-gray-100 hover:bg-white transition-colors text-black p-2 rounded-md flex items-center gap-2 text-sm sm:text-base"
          disabled={markNotificationPending}
          onClick={() => markNotification({ nexusId, receiver })}
        >
          {markNotificationPending ? (
            <Spinner />
          ) : isRead ? (
            <MailCheck />
          ) : (
            <Mail />
          )}
        </button>
      </div>
    </div>
  );
};

export default NotificationList;
