import { configureStore } from "@reduxjs/toolkit";
import appConfigReducer from "./Slices/appConfigSlice";
import postReducer from "./Slices/postSlice";
import feedDataReducer from "./Slices/feedSlice";
export default configureStore({
  reducer: {
    appConfigReducer,
    postReducer,
    feedDataReducer,
  },
});
