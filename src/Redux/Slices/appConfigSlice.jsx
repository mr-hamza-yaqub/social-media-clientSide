// this files is used  to configure all over the app
// ❤🧡Loading Slice Set Globally:-
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosClient } from "../../pages/utils/AxiosClient";

export const getMyInfo = createAsyncThunk("user/getMyInfo", async () => {
  try {
    const response = await AxiosClient.get("/user/getMyInfo");
    return response.result;
  } catch (error) {
    return Promise.reject(error);
  }
});

export const updateProfile = createAsyncThunk(
  "user/updateProfile",
  async (body) => {
    try {
      const response = await AxiosClient.put("/user/", body);
      return response.result;
    } catch (error) {
      return Promise.reject(error);
    }
  }
);

const appConfigslice = createSlice({
  name: "appConfigSlice",
  initialState: {
    isLoading: false,
    toastData: {},
    myProfile: {},
  },
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    showToast: (state, action) => {
      state.toastData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMyInfo.fulfilled, (state, action) => {
        state.myProfile = action.payload.user;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.myProfile = action.payload.user;
      });
  },
});
export default appConfigslice.reducer;
export const { setLoading, showToast } = appConfigslice.actions;
