import { createAsyncThunk } from "@reduxjs/toolkit";
import { WORKOUTAPI } from "../../apis/workout.api";

export const createWorkout = createAsyncThunk(
  "workout/create",
  async (data) => {
    const response = await WORKOUTAPI.createWorkout(data);
    return response.data;
  }
);

export const getWorkouts = createAsyncThunk("workout/getWorkouts", async () => {
  const response = await WORKOUTAPI.getWorkouts();
  return response.data;
});

export const updateWorkout = createAsyncThunk(
  "workout/updateWorkout",
  async (data) => {
    const response = await WORKOUTAPI.updateWorkout(data);
    return response.data;
  }
);

export const deleteWorkout = createAsyncThunk(
  "workout/deleteWorkout",
  async (id) => {
    const response = await WORKOUTAPI.deleteWorkout(id);
    return response.data;
  }
);
