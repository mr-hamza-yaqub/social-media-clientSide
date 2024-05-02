import React, { useEffect, useState } from "react";
import "./UpdateProfile.scss";
import { updateProfile } from "../../Redux/Slices/appConfigSlice";
import { useDispatch, useSelector } from "react-redux";
import dummyImg from "../../assets/user.png";
import { useNavigate } from "react-router-dom";

function UpdateProfile() {
  // Selecting myProfile Info
  const myProfile = useSelector((state) => state.appConfigReducer.myProfile);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [userImg, setUserImg] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Set the Profile Data to Input Fields
  useEffect(() => {
    setName(myProfile?.name || "");
    setBio(myProfile?.bio || "");
    setUserImg(myProfile?.avatar?.url);
  }, [myProfile]);

  // THis Function is USEd to Set Image in the Selected Field when we are trying to change the previous image with new image the new image take place of previous image
  function handelImgchng(e) {
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      if (fileReader.readyState === fileReader.DONE) {
        setUserImg(fileReader.result);
      }
    };
  }
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(
      updateProfile({
        name,
        bio,
        userImg,
      })
    );
    navigate(`/`);
  }

  return (
    <div className="UpdateProfile">
      <div className="container">
        <div className="left-side">
          {/* Taking Image as an input From user: */}
          <div className="input-user-img">
            <label htmlFor="inputImg" className="labelImg">
              <img src={userImg ? userImg : dummyImg} alt={name} />
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
        <div className="right-side">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={name}
              placeholder="Your Name"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <input
              type="text"
              value={bio}
              placeholder=" Your Bio"
              onChange={(e) => {
                setBio(e.target.value);
              }}
            />
            <input
              type="submit"
              className=" btn-primary"
              onClick={handleSubmit}
            />
          </form>
          <button className="delete btn-primary">Delete Account</button>
        </div>
      </div>
    </div>
  );
}

export default UpdateProfile;
