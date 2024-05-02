// this files is used  to configure all over the app
// ❤🧡Loading Slice Set Globally:-
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosClient } from "../../pages/utils/AxiosClient";

import { likeAndUnlikePost } from "./postSlice";

export const getFeedData = createAsyncThunk("user/getFeedData", async () => {
  try {
    const response = await AxiosClient.get("/user/getFeedData");

    return response.result;
  } catch (error) {
    return Promise.reject(error);
  }
});

export const followAndUnfollowUser = createAsyncThunk(
  "user/followAndUnfollow",
  async (body) => {
    try {
      const response = await AxiosClient.post("/user/follow", body);

      return response.result.user;
    } catch (error) {
      console.log(error);

      return Promise.reject(error);
    }
  }
);
const feedSlice = createSlice({
  name: "feedSlice",
  initialState: {
    feedData: {},
  },

  extraReducers: (builder) => {
    builder
      .addCase(getFeedData.fulfilled, (state, action) => {
        state.feedData = action.payload;
      })
      .addCase(likeAndUnlikePost.fulfilled, (state, action) => {
        const post = action.payload;
        const index = state.feedData.posts.findIndex(
          (item) => item._id == post._id
        );
        if (index != undefined && index != -1) {
          state.feedData.posts[index] = post;
        }
      })
      // Handling Follow and Follow
      .addCase(followAndUnfollowUser.fulfilled, (state, action) => {
        const user = action.payload;
        const index = state?.feedData?.followings.findIndex(
          (item) => item._id == user._id
        );
        if (index != -1) {
          state?.feedData.followings.splice(index, 1);
        } else {
          state?.feedData.followings.push(user);
        }
      });
  },
});
export default feedSlice.reducer;
