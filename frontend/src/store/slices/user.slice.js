import { createSlice } from "@reduxjs/toolkit";
import {
  deleteUser,
  getUser,
  login,
  signup,
  updateUser,
} from "../actions/user.action";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    users: [],
    friends: [],
    isLogin: false,
    loginError: null,
    signupError: null,
  },
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLogin = true;
      localStorage.setItem("UserId", action.payload.userId);
      localStorage.setItem("Authorization", action.payload.accessToken);
    },
    setLogout: (state) => {
      window.location.href = "/login";
      localStorage.removeItem("UserId");
      localStorage.removeItem("Authorization");
      state.user = null;
      state.isLogin = false;
      state.authError = null;
      state.friends = null;
    },
    setFriends: (state, action) => {
      if (state.user) {
        console.log("action payload friends", action.payload);
        state.friends = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.isLogin = true;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loginError = "Invalid username or password";
    });
    builder.addCase(signup.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.isLogin = true;
    });
    builder.addCase(signup.rejected, (state, action) => {
      state.signupError = action.payload;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isLogin = true;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isLogin = true;
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      window.location.href = "/login";
      localStorage.removeItem("UserId");
      localStorage.removeItem("Authorization");
      state.user = null;
      state.isLogin = false;
      state.friends = null;
    });
  },
});

export const { setLogin, setLogout, setFriends } = userSlice.actions;

export default userSlice.reducer;
