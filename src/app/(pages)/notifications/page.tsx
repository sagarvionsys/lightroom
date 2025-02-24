"use client";

import React, { useState } from "react";
import { BellDot, Image, Info, Filter, Bell } from "lucide-react";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";
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

  // Filter State
  const [filterType, setFilterType] = useState("all");
  const [selectedFilter, setSelectedFilter] = useState("All Notifications");

  // Filtered Notifications
  const filteredNotifications = notifications?.filter((note: INotification) => {
    if (filterType === "admin") return !note.imageId; // Admin messages (no imageId)
    if (filterType === "image") return note.imageId; // Image updates (has imageId)
    return true; // Show all
  });

  const handleFilterChange = (type: string, label: string) => {
    setFilterType(type);
    setSelectedFilter(label);
  };

  return (
    <div className="text-white flex flex-col items-center px-3">
      {/* Header */}
      <header className="w-full max-w-6xl flex items-center justify-between border-b border-gray-700 pb-4">
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
            {markNotificationPending ? <Spinner /> : <span>Mark all</span>}
          </button>
          <BellDot className="text-primary-500" size={28} />
        </div>
      </header>

      {/* Main Layout */}
      <div className="w-full md:max-w-6xl flex md:flex-row flex-col gap-6 mt-6">
        {/* Left Section */}
        <aside className="w-full md:w-1/3 bg-gray-900 p-4 rounded-lg space-y-6">
          {/* Notification Legend */}
          <div>
            <h1 className="text-lg font-semibold">Notification Legend</h1>
            <ul className="mt-3 space-y-2 text-gray-400 text-sm">
              <li className="flex items-center gap-2">
                <Info className="text-blue-500" />
                <span>Admin Message</span>
              </li>
              <li className="flex items-center gap-2">
                <Image className="text-purple-500" />
                <span>New Image Uploaded</span>
              </li>
            </ul>
          </div>

          {/* Filter Dropdown (Integrated) */}
          <div className="mt-4">
            <h1 className="text-lg font-semibold text-gray-300 py-2">
              Filter Notifications
            </h1>
            <Menu>
              <MenuHandler>
                <Button
                  variant="filled"
                  className="flex items-center justify-between w-full md:max-w-md bg-gray-800 text-white p-3 rounded-lg border border-gray-600 hover:bg-gray-700 transition duration-200"
                  placeholder=""
                  onPointerEnterCapture={() => {}}
                  onPointerLeaveCapture={() => {}}
                >
                  <Filter className="w-5 h-5 mr-2" /> {selectedFilter}
                </Button>
              </MenuHandler>
              <MenuList
                className="bg-gray-900 text-white border border-gray-700 rounded-lg w-full md:max-w-[22rem]"
                placeholder=""
                onPointerEnterCapture={() => {}}
                onPointerLeaveCapture={() => {}}
              >
                <MenuItem
                  placeholder=""
                  onPointerEnterCapture={() => {}}
                  onPointerLeaveCapture={() => {}}
                  className="flex items-center gap-2 hover:bg-gray-800 transition w-full p-2"
                  onClick={() => handleFilterChange("all", "All Notifications")}
                >
                  <Bell className="w-4 h-4 text-yellow-400" /> All Notifications
                </MenuItem>
                <MenuItem
                  placeholder=""
                  onPointerEnterCapture={() => {}}
                  onPointerLeaveCapture={() => {}}
                  className="flex items-center gap-2 hover:bg-gray-800 transition p-2"
                  onClick={() => handleFilterChange("admin", "Admin Messages")}
                >
                  <Info className="w-4 h-4 text-blue-500" /> Admin Messages
                </MenuItem>
                <MenuItem
                  placeholder=""
                  onPointerEnterCapture={() => {}}
                  onPointerLeaveCapture={() => {}}
                  className="flex items-center gap-2 hover:bg-gray-800 transition p-2"
                  onClick={() => handleFilterChange("image", "Image Updates")}
                >
                  <Image className="w-4 h-4 text-purple-500" /> Image Updates
                </MenuItem>
              </MenuList>
            </Menu>
          </div>
        </aside>

        {/* Notifications List */}
        <section className="hideBar w-full md:w-2/3 max-h-screen md:max-h-[23rem] overflow-y-scroll space-y-4">
          {isLoading &&
            Array.from({ length: 4 }).map((_, idx) => (
              <NotificationSkeleton key={idx} />
            ))}

          {!isLoading && filteredNotifications?.length > 0 ? (
            filteredNotifications.map((note: INotification) => (
              <NotificationList key={note?._id as string} notes={note} />
            ))
          ) : (
            <p className="text-gray-400 text-sm text-center">
              No notifications found.
            </p>
          )}
        </section>
      </div>
    </div>
  );
};

export default NotificationsPage;
