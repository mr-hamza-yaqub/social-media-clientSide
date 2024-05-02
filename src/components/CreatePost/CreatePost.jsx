import React, { useState } from "react";
import "./CreatePost.scss";
import Avatar from "../avatar/Avatar";
import { BsCardImage } from "react-icons/bs";
import { AxiosClient } from "../../pages/utils/AxiosClient";
import { useDispatch, useSelector } from "react-redux";

import { getUserProfile } from "../../Redux/Slices/postSlice";

function CreatePost() {
  const dispatch = useDispatch();
  const [postImg, setPostImg] = useState("");
  const [caption, setCaption] = useState("");
  const myProfile = useSelector((state) => state.appConfigReducer.myProfile);

  // HAndle Submit after choosing the image it shows in the container bcz of below code
  function handelImgchng(e) {
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      if (fileReader.readyState === fileReader.DONE) {
        setPostImg(fileReader.result);
      }
    };
  }
  const handlePostSubmit = async (e) => {
    try {
      const result = await AxiosClient.post("/posts", {
        caption,
        postImg,
      });
      console.log("post", result);

      dispatch(
        getUserProfile({
          userId: myProfile._id,
        })
      );
    } catch (error) {
      console.log(":Error", error);
      return Promise.reject(error);
    } finally {
      setPostImg("");
      setCaption("");
    }
  };
  return (
    <div className="CreatePost">
      <div className="left-part">
        <Avatar src={myProfile?.avatar?.url} />
      </div>
      <div className="right-part">
        <input
          value={caption}
          type="text"
          className="captionInput"
          placeholder="What's on your mind"
          onChange={(e) => setCaption(e.target.value)}
        />
        {/* If image is Selected then we have to show the below container otherwise Dont show */}
        {postImg && (
          <div className="img-container">
            <img className="post-img" src={postImg} alt="Post-image" />
          </div>
        )}

        <div className="bottom-part">
          <div className="input-post-img">
            <div className="input-user-img">
              <label htmlFor="inputImg" className="labelImg">
                <BsCardImage />
              </label>
              <input
                className="inputImg"
                type="file"
                accept="image/"
                onChange={handelImgchng}
                id="inputImg"
              />
            </div>
          </div>
          <button className="btn-primary post-btn" onClick={handlePostSubmit}>
            {" "}
            Post{" "}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
