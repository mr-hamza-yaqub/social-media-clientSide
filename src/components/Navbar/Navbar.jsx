import React from "react";
import "./Navbar.scss";
import Avatar from "../avatar/Avatar";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";

import { useSelector } from "react-redux";

import { AxiosClient } from "../../pages/utils/AxiosClient";
import {
  KEY_ACCESS_TOKEN,
  removeItem,
} from "../../pages/utils/localStorageManager";

function Navbar() {
  const navigate = useNavigate();

  const myProfile = useSelector((state) => state.appConfigReducer.myProfile);

  async function handleLogoutClick() {
    try {
      await AxiosClient.post("/auth/logout");
      removeItem(KEY_ACCESS_TOKEN);
      navigate("/login");
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <div className="Navbar">
      <div className="Container">
        <h2 className="Banner hover-link" onClick={() => navigate("/")}>
          Mini Facebook{" "}
        </h2>
        <div className="right-side">
          <div className="User-name">
            <p className="Nav_Name"> {myProfile?.name}</p>
          </div>
          <div
            className="avatar hover-link"
            onClick={() => navigate(`/profile/${myProfile?._id}`)}
          >
            <Avatar src={myProfile?.avatar?.url} />
          </div>

          <div className="logout hover-link" onClick={handleLogoutClick}>
            <FiLogOut />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
