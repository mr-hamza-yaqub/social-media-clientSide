import React, { useEffect, useState } from "react";
import "./Follower.scss";
import Avatar from "../avatar/Avatar";
import { useDispatch, useSelector } from "react-redux";
import { followAndUnfollowUser } from "../../Redux/Slices/feedSlice";
import { useNavigate } from "react-router";

function Follower({ user }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isFollowing, setIsFollowing] = useState();

  const feedData = useSelector((state) => state.feedDataReducer.feedData);

  useEffect(() => {
    setIsFollowing(feedData.followings.find((item) => item._id === user._id));
  }, [feedData]);

  // WE are not MAking it Async because Async call is happen in asyncThunk
  function handleUserFollow() {
    dispatch(
      followAndUnfollowUser({
        userIdToFollow: user._id,
      })
    );
  }
  return (
    <div className="Follower">
      <div
        className="user-info"
        onClick={() => {
          navigate(`/profile/${user._id}`);
        }}
      >
        <Avatar src={user?.avatar?.url} />
        <h4 className="name">{user?.name}</h4>
      </div>

      <h5
        style={{ marginLeft: "20px" }}
        onClick={handleUserFollow}
        className={isFollowing ? "hover-link follow-link" : "btn-primary"}
      >
        {isFollowing ? "Unfollow" : "Follow"}
      </h5>
    </div>
  );
}

export default Follower;
