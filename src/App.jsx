import "./App.css";
import Login from "./pages/login/Login";
import { Routes, Route } from "react-router-dom";
import Signup from "./pages/signup/Signup";
import Home from "./pages/home/Home";
import RequireUser from "./components/RequireUser";
import Feed from "./components/feed/Feed";
import Profile from "./components/Profile/Profile";
import UpdateProfile from "./components/UpdateProfile/UpdateProfile";
import { useSelector } from "react-redux";
import LoadingBar from "react-top-loading-bar";
import toast, { Toaster } from "react-hot-toast";

import { useEffect, useRef } from "react";
import OnlyIfLoggedIn from "./components/OnlyIfLoggedIn";
export const TOAST_SUCCESS = "toast_success";
export const TOAST_FAILURE = "toast_failure";

function App() {
  const loadingRef = useRef(null);
  const toastData = useSelector((state) => state.appConfigReducer.toastData);
  const isLoading = useSelector((state) => state.appConfigReducer.isLoading);

  useEffect(() => {
    if (isLoading) {
      loadingRef.current?.continuousStart();
    } else {
      loadingRef.current?.complete();
    }
  }, [isLoading]);
  // SHow Toast
  useEffect(() => {
    switch (toastData.type) {
      case TOAST_SUCCESS:
        toast.success(toastData.message);
        break;
      case TOAST_FAILURE:
        toast.error(toastData.message);

        break;
    }
  }, [toastData]);
  return (
    <>
      <LoadingBar height={4} color="#458eff" ref={loadingRef} />
      <div>
        <Toaster />
      </div>
      <Routes>
        <Route element={<RequireUser />}>
          <Route element={<Home />}>
            <Route path="/" element={<Feed />} />
            <Route path="/profile/:userId" element={<Profile />} />
            <Route path="/UpdateProfile" element={<UpdateProfile />} />
          </Route>
        </Route>
        <Route element={<OnlyIfLoggedIn />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
