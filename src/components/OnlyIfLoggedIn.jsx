import React from "react";
import { KEY_ACCESS_TOKEN, getItem } from "../pages/utils/localStorageManager";
import { Navigate, Outlet } from "react-router-dom";

function OnlyIfLoggedIn() {
  const user = getItem(KEY_ACCESS_TOKEN);
  return user ? <Navigate to="/" /> : <Outlet />;
}

export default OnlyIfLoggedIn;
