import axios from "axios";

const BASE_URL = process.env.REACT_APP_BACKEND_API_URL;

const config = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
  },
};

export const RECIPEAPI = {
  createRecipe: (data) => axios.post(`${BASE_URL}/api/recipes/`, data, config),
  getRecipes: (category) =>
    axios.get(`${BASE_URL}/api/recipes/${category}`, config),
  getRecipe: (id) => axios.get(`${BASE_URL}/api/recipes/${id}`, config),
  getUserRecipes: (userId) =>
    axios.get(`${BASE_URL}/api/recipes/user/${userId}`, config),
  updateRecipe: (data) => axios.put(`${BASE_URL}/api/recipes/`, data, config),
  deleteRecipe: (id) => axios.delete(`${BASE_URL}/api/recipes/${id}`, config),
};
