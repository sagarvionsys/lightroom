import { INotification } from "@/types/notification.types";
import { Image, Info } from "lucide-react";
import Link from "next/link";
import React from "react";

const NotificationList = ({ notes }: { notes: INotification }) => {
  const { _id, title, createdAt, imageId } = notes;
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-gray-800 border border-gray-700 rounded-lg shadow-md">
      <div className="flex items-center gap-4">
        {imageId ? (
          <Image className="text-purple-500" />
        ) : (
          <Info className="text-blue-500" />
        )}
        <div>
          <p className="text-md text-gray-300">{title}</p>
          <p className="text-xs text-gray-500 mt-1">Date: {createdAt}</p>
        </div>
      </div>
      {imageId && (
        <Link
          href={`product/${imageId}`}
          className="text-md text-primary-500 hover:underline mt-2 sm:mt-0"
        >
          view
        </Link>
      )}
    </div>
  );
};

export default NotificationList;
