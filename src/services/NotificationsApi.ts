import axios from "axios";

export const getNotifications = async () => {
  const response = await axios.get("/api/notification");
  return response.data;
};

export const createNotifications = async (title: string) => {
  const response = await axios.post("/api/notification", { title });
  return response.data;
};

export const deleteNotification = async (id: string) => {
  const response = await axios.delete(`/api/delete/id=${id}`);
  return response.data;
};

export const updateNotifications = async ({
  id,
  title,
}: {
  id: string;
  title: string;
}) => {
  const response = await axios.patch(`/api/delete/id=${id}`, { title });
  return response.data;
};
