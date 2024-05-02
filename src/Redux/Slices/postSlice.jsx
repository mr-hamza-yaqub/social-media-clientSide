// this files is used  to configure all over the app
// ❤🧡Loading Slice Set Globally:-
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosClient } from "../../pages/utils/AxiosClient";

export const getUserProfile = createAsyncThunk(
  "user/getUserProfile",
  async (body) => {
    try {
      const response = await AxiosClient.post("/user/getUserProfile", body);
      return response.result;
    } catch (error) {
      return Promise.reject(error);
    }
  }
);

export const likeAndUnlikePost = createAsyncThunk(
  "user/likeAndUnlike",
  async (body) => {
    try {
      const response = await AxiosClient.post("/posts/like", body);
      return response.result.post;
    } catch (error) {
      return Promise.reject(error);
    }
  }
);

const postsSlice = createSlice({
  name: "postsSlice",
  initialState: {
    userProfile: {},
  },

  extraReducers: (builder) => {
    builder
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.userProfile = action.payload;
      })
      .addCase(likeAndUnlikePost.fulfilled, (state, action) => {
        const post = action.payload;
        const index = state?.userProfile?.posts?.findIndex(
          (item) => item._id == post._id
        );
        if (index != undefined && index != -1) {
          state.userProfile.posts[index] = post;
        }
      });
  },
});
export default postsSlice.reducer;
