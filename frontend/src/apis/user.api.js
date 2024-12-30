import axios from "axios";

const BASE_URL = process.env.REACT_APP_BACKEND_API_URL;

const config = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
  },
};

export const USERAPI = {
  login: (data) => axios.post(`${BASE_URL}/api/users/login`, data),
  signup: (data) => axios.post(`${BASE_URL}/api/users/signup`, data),
  getUser: (id) => axios.get(`${BASE_URL}/api/users/${id}`, config),
  updateUser: (data) => axios.put(`${BASE_URL}/api/users/`, data, config),
  deleteUser: (id) => axios.delete(`${BASE_URL}/api/users/${id}`, config),
};
