import axios from "axios";

const BASE_URL = process.env.REACT_APP_BACKEND_API;

const config = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
  },
};

export const COMMENTAPI = {
  saveComment: (data) => axios.post(`${BASE_URL}/api/comments`, data, config),
  getComments: () => axios.get(`${BASE_URL}/api/comments`, config),
  getCommentsByPostId: (id) =>
    axios.get(`${BASE_URL}/api/comments/post/${id}`, config),
  updateCommentById: (id, data) =>
    axios.put(`${BASE_URL}/api/comments/${id}`, data, config),
  deleteCommentById: (id) =>
    axios.delete(`${BASE_URL}/api/comments/${id}`, config),
};
