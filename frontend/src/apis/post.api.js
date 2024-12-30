import axios from "axios";

const BASE_URL = process.env.REACT_APP_BACKEND_API_URL;

const config = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
  },
};

export const POSTAPI = {
  getPosts: () => axios.get(`${BASE_URL}/api/posts/allposts`, config),
  getPostsByUserId: (userId) =>
    axios.get(`${BASE_URL}/api/posts/user/${userId}`, config),
};
