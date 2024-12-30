import { createAsyncThunk } from "@reduxjs/toolkit";
import { USERAPI } from "../../apis/user.api";

export const login = createAsyncThunk("user/login", async (data, thunkAPI) => {
  try {
    const response = await USERAPI.login(data);
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.errors);
  }
});

export const signup = createAsyncThunk(
  "user/signup",
  async (data, thunkAPI) => {
    try {
      const response = await USERAPI.signup(data);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.errors);
    }
  }
);

export const getUser = createAsyncThunk(
  "user/getUser",
  async (i_, thunkAPI) => {
    try {
      const userId = localStorage.getItem("UserId");
      const response = await USERAPI.getUser(userId);
      console.log("thunk", response.data);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.errors);
    }
  }
);

export const updateUser = createAsyncThunk("user/updateUser", async (data) => {
  const response = await USERAPI.updateUser(data);
  return response.data;
});

export const deleteUser = createAsyncThunk("user/deleteUser", async (id) => {
  const response = await USERAPI.deleteUser(id);
  return response.data;
});
