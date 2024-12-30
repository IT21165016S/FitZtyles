import { createSlice } from "@reduxjs/toolkit";
import {
  createRecipe,
  deleteRecipe,
  getRecipes,
  getUserRecipes,
  updateRecipe,
} from "../actions/recipe.action";

const recipeSilce = createSlice({
  name: "recipe",
  initialState: {
    recipes: [],
  },
  reducers: {
    setRecipes: (state, action) => {
      console.log("actiop", action.payload);
      state.recipes.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createRecipe.fulfilled, (state, action) => {
      state.recipes.push(action.payload);
    });
    builder.addCase(getRecipes.fulfilled, (state, action) => {
      state.recipes = action.payload;
    });
    builder.addCase(getUserRecipes.fulfilled, (state, action) => {
      state.recipes = action.payload;
    });
    builder.addCase(updateRecipe.fulfilled, (state, action) => {
      console.log("updated recipe data", action.payload);
      const updatedRecipes = state.recipes.map((recipe) => {
        if (recipe.id === action.payload.id) return action.payload;
        return recipe;
      });
      state.recipes = updatedRecipes;
    });
    builder.addCase(deleteRecipe.fulfilled, (state, action) => {
      const afterDeleteRecipes = state.recipes.filter(
        (recipe) => action.payload.id !== recipe.id
      );
      state.recipes = afterDeleteRecipes;
    });
  },
});

export const { setRecipes } = recipeSilce.actions;

export default recipeSilce.reducer;
