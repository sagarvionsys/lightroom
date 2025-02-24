import axios from "axios";
import mongoose from "mongoose";
import { ObjectId } from "mongoose";

export const getNotifications = async () => {
  const response = await axios.get("/api/notification");
  return response.data;
};

export const createNotifications = async (title: string) => {
  const response = await axios.post("/api/notification", { title });
  return response.data;
};

export const deleteNotification = async (id: string) => {
  const response = await axios.delete(`/api/notification/?id=${id}`);
  return response.data;
};

export const updateNotifications = async ({
  id,
  title,
}: {
  id: string;
  title: string;
}) => {
  const response = await axios.patch(`/api/notification/?id=${id}`, {
    title,
  });
  return response.data;
};

export const markNotifications = async ({
  receiver,
  nexusId,
}: {
  receiver: mongoose.Types.ObjectId;
  nexusId: string;
}) => {
  const response = await axios.put(
    `/api/notification?receiver=${receiver}&nexusId=${nexusId}`
  );
  return response.data;
};
