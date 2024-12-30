import { createSlice } from "@reduxjs/toolkit";
import { getPosts, getPostsByUserId } from "../actions/post.action";

const postSlice = createSlice({
  name: "post",
  initialState: {
    posts: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
    });
    builder.addCase(getPostsByUserId.fulfilled, (state, action) => {
      state.posts = action.payload;
    });
  },
});

export default postSlice.reducer;
