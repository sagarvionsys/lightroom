import React from "react";
import { BellDot, Info, Image } from "lucide-react";
import Link from "next/link";

const notifications = [
  {
    id: 1,
    message: "New update available for your account settings.",
    type: "info",
    icon: <Info className="text-blue-500" />,
  },
  {
    id: 2,
    message: "New image added: 'Sunset in the Mountains'.",
    date: "Feb 18, 2025",
    imageTitle: "Sunset in the Mountains",
    type: "image",
    icon: <Image className="text-purple-500" />,
    actionText: "View Image",
    actionLink: "/product/67a330fc5838ee22fa5ffab9",
  },
  {
    id: 3,
    message: "New image added: 'lost origin'.",
    date: "Jan 24, 2025",
    imageTitle: "lost origin'",
    type: "image",
    icon: <Image className="text-purple-500" />,
    actionText: "View Image",
    actionLink: "/product/67a330fc5838ee22fa5ffab9",
  },
];

const NotificationsPage = () => {
  return (
    <div className="min-h-screen  text-white flex flex-col items-center">
      {/* Feature Notice */}
      <div className="bg-yellow-200 text-black font-bold px-4 py-2 rounded-lg mb-4">
        <p className="text-sm font-medium">
          ⚠️ This is mock data. The developer is currently working on this
          feature.
        </p>
      </div>

      {/* Header */}
      <div className="w-full max-w-2xl flex items-center justify-between border-b border-gray-700 pb-4">
        <h1 className="text-2xl font-bold">Notifications</h1>
        <BellDot className="text-primary-500" size={28} />
      </div>

      {/* Notifications List */}
      <div className="w-full max-w-2xl mt-6 space-y-4">
        {notifications.length > 0 ? (
          notifications.map(
            ({ id, message, icon, date, actionText, actionLink }) => (
              <div
                key={id}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-gray-800 border border-gray-700 rounded-lg shadow-md"
              >
                <div className="flex items-center gap-4">
                  {icon}
                  <div>
                    <p className="text-sm text-gray-300">{message}</p>
                    {date && (
                      <p className="text-xs text-gray-500 mt-1">Date: {date}</p>
                    )}
                  </div>
                </div>
                {actionText && actionLink && (
                  <Link
                    href={actionLink}
                    className="text-xs text-primary-500 hover:underline mt-2 sm:mt-0"
                  >
                    {actionText}
                  </Link>
                )}
              </div>
            )
          )
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
