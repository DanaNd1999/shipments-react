import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import AuthUser from "./AuthUser";

const Login = () => {
  const { http, setToken } = AuthUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function login(e) {
    e.preventDefault();
    http.post("/login", { email: email, password: password }).then((res) => {
      setToken(res.data.user, res.data.access_token);
      navigate("/shipments");
    });
  }

  return (
    <div className="container align-items-center">
      <h1 className="mt-5">Login!</h1>
      <form className="mt-3 mb-3">
        <div className="form-group mb-3">
          <label>Email address</label>
          <input
            type="email"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
          />
        </div>

        <div className="form-group mb-3">
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
          />
        </div>
        <Button
          onClick={login}
          onCvariant="primary"
          type="submit"
          className="col-xs-12 col-sm-12 col-lg-1 col-xl-1"
        >
          Login
        </Button>
        <br />
        <p className="mt-2">
          Don't have an account? <Link to={"/register"}>Sign Up</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
