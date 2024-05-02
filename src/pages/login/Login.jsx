import React, { useState } from "react";
import "./Login.scss";
import { Link, useNavigate } from "react-router-dom";
import { AxiosClient } from "../utils/AxiosClient";
import { KEY_ACCESS_TOKEN, setItem } from "../utils/localStorageManager";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // COnnencting to the Backend
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await AxiosClient.post("/auth/login", {
        email,
        password,
      });

      // NAviagate to / Route if Successfully Login
      setItem(KEY_ACCESS_TOKEN, response.result.accessToken);
      navigate("/");
    } catch (error) {}
  }
  return (
    <div className="Login">
      <div className="login-box">
        <h2 className="heading">Login</h2>
        <form onSubmit={handleSubmit}>
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
            Do not have an account? <Link to={"/signup"}>Sign Up</Link>{" "}
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
