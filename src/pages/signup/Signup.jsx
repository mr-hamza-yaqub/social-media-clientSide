import React, { useState } from "react";
import "./Signup.scss";
import { Link, useNavigate } from "react-router-dom";
import { AxiosClient } from "../utils/AxiosClient";

function Signup() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  // COnnencting to the Backend
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await AxiosClient.post("/auth/signup", {
        name,
        email,
        password,
      });
    } catch (error) {}
  }
  return (
    <div className="signup">
      <div className="signup-box">
        <h2 className="heading">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="name"
            id="name"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="email"
            id="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="password"
            id="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <input type="submit" className="submit" />
          <p className="subheading">
            Already have an Account? <Link to={"/login"}>Log In</Link>{" "}
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
