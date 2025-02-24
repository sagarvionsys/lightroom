import React, { useState } from "react";
import Link from "next/link";
import {
  Edit2,
  Image,
  Info,
  SquareArrowOutUpRight,
  Trash2,
} from "lucide-react";
import Spinner from "../Spinner";
import { NotificationSkeleton } from "../Skeletons";

import useAddNotification from "@/features/notificationMutations/useAddNotification";
import useDeleteNotification from "@/features/notificationMutations/useDeleteNotification";
import useUpdateNotification from "@/features/notificationMutations/useUpdateNotification";
import { useQueryFunction } from "@/features/useQuery";
import { getNotifications } from "@/services/NotificationsApi";
import { INotification } from "@/types/notification.types";
import { formatDate } from "@/utils/formatDate";

const AdminNotification = () => {
  const [updateTitle, setUpdateTitle] = useState("");
  const [updateId, setUpdateId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { data: notifications, isLoading } = useQueryFunction(
    ["notifications"],
    getNotifications
  );

  const { createNotification, createNotificationPending } =
    useAddNotification();
  const { updateNotification, updateNotificationPending } =
    useUpdateNotification();
  const { deleteNotification, deleteNotificationPending } =
    useDeleteNotification();

  // Handle Add or Update Notification
  const handleAddAndUpdateNotification = () => {
    if (!updateTitle.trim()) return;

    updateId
      ? updateNotification({ id: updateId, title: updateTitle })
      : createNotification(updateTitle);

    setUpdateTitle("");
    setUpdateId(null);
  };

  // Handle Edit Click
  const handleEdit = (id: string, title: string) => {
    setUpdateId(id);
    setUpdateTitle(title);
  };

  return (
    <div className="w-full max-w-xl mt-6 space-y-4 p-2 hideBar">
      {/* Input & Add/Update Button */}
      <div className="w-full pb-4 flex justify-center items-center gap-3">
        <input
          value={updateTitle}
          onChange={(e) => setUpdateTitle(e.target.value)}
          className="text-black w-full bg-transparent placeholder:text-slate-400 text-sm border border-slate-300 rounded-md pl-3 py-2 transition focus:outline-none focus:border-slate-500 hover:border-slate-300 shadow-sm focus:shadow"
          placeholder="Enter notification title..."
        />
        <button
          disabled={
            !updateTitle ||
            createNotificationPending ||
            updateNotificationPending
          }
          onClick={handleAddAndUpdateNotification}
          className="border-slate-300 border p-2 rounded-md flex items-center justify-center gap-2"
        >
          {createNotificationPending || updateNotificationPending ? (
            <Spinner />
          ) : updateId ? (
            "Update"
          ) : (
            "Add"
          )}
        </button>
      </div>

      {/* Notifications List */}
      <div className="space-y-3 max-h-[20rem] overflow-y-scroll hideBar">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, idx) => (
            <NotificationSkeleton key={idx} />
          ))
        ) : notifications?.length ? (
          notifications?.map(
            ({ _id, title, createdAt, imageId, nexusId }: INotification) => (
              <div
                key={_id as string}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 bg-white border border-gray-200 rounded-lg shadow-md"
              >
                <div className="flex items-center gap-4">
                  {imageId ? (
                    <Image className="text-purple-500" />
                  ) : (
                    <Info className="text-blue-500" />
                  )}
                  <div>
                    <p className="text-md text-gray-800">{title}</p>
                    <p className="text-xs text-gray-600 mt-1">
                      {formatDate(createdAt as string)}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  {imageId && (
                    <Link
                      href={`product/${imageId}`}
                      className="bg-gray-100 hover:bg-white transition-colors text-black p-2 rounded-md flex items-center gap-2"
                    >
                      <SquareArrowOutUpRight />
                    </Link>
                  )}
                  <button
                    disabled={deleteNotificationPending}
                    onClick={() => {
                      setDeleteId(nexusId);
                      deleteNotification(nexusId);
                    }}
                    className="border p-2 rounded-md bg-gray-100 hover:bg-white transition-colors"
                  >
                    {deleteNotificationPending && deleteId === nexusId ? (
                      <Spinner />
                    ) : (
                      <Trash2 color="red" />
                    )}
                  </button>
                  <button
                    disabled={
                      createNotificationPending || updateNotificationPending
                    }
                    onClick={() => handleEdit(nexusId, title)}
                    className="border p-2 rounded-md bg-gray-100 hover:bg-white transition-colors"
                  >
                    <Edit2 color="blue" />
                  </button>
                </div>
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

export default AdminNotification;
