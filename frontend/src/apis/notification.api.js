import axios from "axios";

const BASE_URL = process.env.REACT_APP_BACKEND_API;

const config = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
  },
};

export const NOTIFICATIONAPI = {
  saveNotification: (data) =>
    axios.post(`${BASE_URL}/api/notifications`, data, config),
  getNotificationsByUserId: (id) =>
    axios.get(`${BASE_URL}/api/notifications/user/${id}`, config),
  updateNotificationsById: (id, data) =>
    axios.get(`${BASE_URL}/api/notifications/user/${id}`, data, config),
};
