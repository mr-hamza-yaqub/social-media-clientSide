import axios from "axios";
import {
  KEY_ACCESS_TOKEN,
  getItem,
  removeItem,
  setItem,
} from "./localStorageManager";

// Showings Toast
import store from "../../Redux/store";
import { setLoading, showToast } from "../../Redux/Slices/appConfigSlice";
import { TOAST_FAILURE } from "../../App";
// Creating Axios For Requests
export const AxiosClient = axios.create({
  baseURL: import.meta.env.VITE_APP_SERVER_BASE_URL,
  // withCredentials: true-------->it means passing cookies in API call
  withCredentials: true,
});
//

// 👮‍♀️Request Interceptor
// It adds access Token to all Request(i.e, /all/post--request) from the frontend (hmy hr request me separate se accesstoken dalny ki zrorat nii prty)
AxiosClient.interceptors.request.use((request) => {
  const accessToken = getItem(KEY_ACCESS_TOKEN);
  request.headers["Authorization"] = `Bearer ${accessToken}`;
  store.dispatch(setLoading(true));
  return request;
});

// Response Interceptor// 👮‍♀️
// It deals with the 401 error(in case accessToken is expired )
AxiosClient.interceptors.response.use(
  async (response) => {
    store.dispatch(setLoading(false));

    const data = response.data;
    if (data.status === "ok") {
      return data;
    }

    const originalRequest = response.config;
    const statusCode = data.statusCode;
    const error = data.message;
    // THis is THe error HAndler which we are senting from server eg.res.send(error(500,'some Message'))
    store.dispatch(
      showToast({
        type: TOAST_FAILURE,
        message: error,
      })
    );

    if (
      //AccessToken Expires Regenerate it Calling API Of Refresh
      statusCode === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      const response = await axios
        .create({
          withCredentials: true,
        })
        .get(`${import.meta.env.VITE_APP_SERVER_BASE_URL}/auth/refresh`);
      if (response.data.status === "ok") {
        setItem(KEY_ACCESS_TOKEN, response.result.accessToken);
        // Updating Authorization Header in the Original Request if AccessToken Faileds
        originalRequest.headers[
          "Authorization"
        ] = `Bearer ${response.result.accessToken}`;
        // SEnd new Access TOken to user to originalRequest
        return axios(originalRequest);
      } else {
        removeItem(KEY_ACCESS_TOKEN);
        // this is used when you want to go some location  inside your page:

        window.location.replace("/login", "_self");
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  },
  async (error) => {
    store.dispatch(setLoading(false));

    store.dispatch(
      showToast({
        type: TOAST_FAILURE,
        message: error.message,
      })
    );
    //Handle Network errors and some other type of errors
    return Promise.reject(error);
  }
);
