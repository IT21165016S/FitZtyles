import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./slices/post.slice";
import recipeReducer from "./slices/recipe.slice";
import userReducer from "./slices/user.slice";
import workoutReducer from "./slices/workout.slice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    post: postReducer,
    recipe: recipeReducer,
    workout: workoutReducer,
  },
});
