import { createSlice } from "@reduxjs/toolkit";
import {
  createWorkout,
  deleteWorkout,
  getWorkouts,
  updateWorkout,
} from "../actions/workout.action";

const workoutSlice = createSlice({
  name: "workout",
  initialState: {
    workouts: [],
  },
  reducers: {
    setWorkouts: (state, action) => {
      console.log("actiop", action.payload);
      state.workouts.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createWorkout.fulfilled, (state, action) => {
      state.workouts.push(action.payload);
    });
    builder.addCase(getWorkouts.fulfilled, (state, action) => {
      state.workouts = action.payload;
    });
    builder.addCase(updateWorkout.fulfilled, (state, action) => {
      state.workouts = action.payload;
    });
    builder.addCase(deleteWorkout.fulfilled, (state, action) => {
      state.workouts = action.payload;
    });
  },
});

export const { setWorkouts } = workoutSlice.actions;

export default workoutSlice.reducer;
