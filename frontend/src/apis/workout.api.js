import axios from "axios";

const BASE_URL = process.env.REACT_APP_BACKEND_API_URL;

const config = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
  },
};

export const WORKOUTAPI = {
  createWorkout: (data) =>
    axios.post(`${BASE_URL}/api/workouts/`, data, config),
  getWorkouts: () => axios.get(`${BASE_URL}/api/workouts/`, config),
  getWorkout: (id) => axios.get(`${BASE_URL}/api/workouts/${id}`, config),
  getUserWorkouts: (userId) =>
    axios.get(`${BASE_URL}/api/workouts/user/${userId}`, config),
  updateWorkout: (data) => axios.put(`${BASE_URL}/api/workouts/`, data, config),
  deleteWorkout: (id) => axios.delete(`${BASE_URL}/api/workouts/${id}`, config),
};
