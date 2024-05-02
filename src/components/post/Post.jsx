import "./Post.scss";
import React from "react";
import Avatar from "../avatar/Avatar";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { likeAndUnlikePost } from "../../Redux/Slices/postSlice";
import { useNavigate } from "react-router";

function Post({ post }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  async function handlePostLike() {
    dispatch(
      likeAndUnlikePost({
        postId: post._id,
      })
    );
  }
  return (
    <div className="Post">
      <div
        className="heading"
        onClick={() => {
          navigate(`/profile/${post.owner._id}`);
        }}
      >
        <Avatar src={post?.owner?.avatar?.url} />
        <h4>{post.owner?.name}</h4>
      </div>
      <div className="content">
        <img src={post?.image?.url} alt="Post" />
      </div>
      <div className="footer">
        <div className="like" onClick={handlePostLike}>
          {post.isLiked ? (
            <FaHeart className="icon" style={{ color: "red" }} />
          ) : (
            <FaRegHeart className="icon" />
          )}

          <h4>{`${post.likesCount} Likes`}</h4>
        </div>
        <p className="caption">{post.caption}</p>
        <h6 className="time-ago">{post?.timeAgo}</h6>
      </div>
    </div>
  );
}

export default Post;
