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
      className={`flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 ${
        isRead ? "bg-black" : "bg-gray-700"
      } border border-gray-700 rounded-lg shadow-md `}
    >
      <div className="flex items-center gap-4">
        {imageId ? (
          <Image className="text-purple-500" />
        ) : (
          <Info className="text-blue-500" />
        )}
        <div>
          <p className="text-md text-white">{title}</p>
          <p className="text-xs text-gray-200 mt-1">
            {formatDate(createdAt as string)}
          </p>
        </div>
      </div>

      {/* Button with Loading State */}
      <div className="flex justify-center items-center gap-4">
        {imageId && (
          <Link
            href={`product/${imageId}`}
            className="bg-gray-100 hover:bg-white transition-colors text-black p-2 rounded-md flex items-center gap-2"
          >
            <SquareArrowOutUpRight />
          </Link>
        )}
        <button
          className="bg-gray-100 hover:bg-white transition-colors text-black p-2 rounded-md flex items-center gap-2"
          disabled={markNotificationPending}
          onClick={() => markNotification({ nexusId, receiver })}
        >
          {markNotificationPending ? (
            <Spinner />
          ) : (
            <>{isRead ? <MailCheck /> : <Mail />}</>
          )}
        </button>
      </div>
    </div>
  );
};

export default NotificationList;
