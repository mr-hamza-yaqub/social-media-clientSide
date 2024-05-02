import React, { useEffect, useState } from "react";
import "./Profile.scss";
import Post from "../post/Post";
import dummyImg from "../../assets/user.png";

import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CreatePost from "../CreatePost/CreatePost";
import { getUserProfile } from "../../Redux/Slices/postSlice";
import { followAndUnfollowUser } from "../../Redux/Slices/feedSlice";

function Profile() {
  const navigate = useNavigate();
  const [isMyProfile, setIsMyProfile] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  // Id in the link
  const params = useParams();
  // Select the userProfile
  const userProfile = useSelector((state) => state.postReducer.userProfile);
  // Select the MyProfile to check wheather the current user is mine or not
  const myProfile = useSelector((state) => state.appConfigReducer.myProfile);
  const feedData = useSelector((state) => state.feedDataReducer.feedData);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserProfile({ userId: params.userId }));
    setIsMyProfile(myProfile?._id === params.userId);
    setIsFollowing(
      feedData?.followings?.find((item) => item._id === params.userId)
    );
  }, [myProfile, params.userId, feedData]);

  function handleUserFollow() {
    dispatch(
      followAndUnfollowUser({
        userIdToFollow: params.userId,
      })
    );
  }

  return (
    <div className="Profile">
      <div className="container">
        <div className="left-part">
          {isMyProfile && <CreatePost />}
          {/* MAP all Posts of the User */}
          {userProfile?.posts?.map((post) => (
            <Post key={post._id} post={post} />
          ))}
        </div>
        <div className="right-part">
          <div className="profile-card">
            <img
              className="user-img"
              src={
                userProfile?.avatar?.url ? userProfile?.avatar?.url : dummyImg
              }
              alt="Profile-Picture"
            />

            <h3 className="user-name">{userProfile?.name}</h3>
            <p className="bio"> {userProfile?.bio} </p>

            <div className="follower-info">
              <h4>{`${userProfile?.followers?.length} Followers`}</h4>
              <h4>{`${userProfile?.followings?.length} Followings`}</h4>
            </div>
            {!isMyProfile && (
              <h5
                style={{ marginTop: "10px" }}
                onClick={handleUserFollow}
                className={
                  isFollowing ? "hover-link follow-link" : "btn-primary"
                }
              >
                {isFollowing ? "Unfollow" : "Follow"}
              </h5>
            )}
            {isMyProfile && (
              <button
                className="update-profile btn-secondary"
                onClick={() => {
                  navigate("/updateProfile");
                }}
              >
                Update Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
