import { createAsyncThunk } from "@reduxjs/toolkit";
import { RECIPEAPI } from "../../apis/recipe.api";

export const createRecipe = createAsyncThunk("recipe/create", async (data) => {
  const response = await RECIPEAPI.createRecipe(data);
  return response.data;
});

export const getRecipes = createAsyncThunk(
  "recipe/getRecipes",
  async (category) => {
    const response = await RECIPEAPI.getRecipes(category);
    return response.data;
  }
);

export const getUserRecipes = createAsyncThunk(
  "recipe/getUserRecipes",
  async (userId) => {
    const response = await RECIPEAPI.getUserRecipes(userId);
    return response.data;
  }
);

export const updateRecipe = createAsyncThunk(
  "recipe/updateRecipe",
  async (data) => {
    const response = await RECIPEAPI.updateRecipe(data);
    return response.data;
  }
);

export const deleteRecipe = createAsyncThunk(
  "recipe/deleteRecipe",
  async (id) => {
    const response = await RECIPEAPI.deleteRecipe(id);
    return response.data;
  }
);
