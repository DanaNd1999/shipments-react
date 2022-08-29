import React, { useState } from "react";
import AuthUser from "./AuthUser";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const { http } = AuthUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  function register(e) {
    e.preventDefault();
    http
      .post("/register", { name: name, email: email, password: password })
      .then(() => {
        navigate("/login");
      });
  }

  return (
    <div className="container align-items-center">
      <h1 className="mt-5">Register!</h1>
      <form className="mt-3 mb-3" onSubmit={register}>
        <div className="mb-3" controlId="formBasicEmail">
          <label>Name</label>
          <input
            type="text"
            placeholder="Enter name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3" controlId="formBasicEmail">
          <label>Email address</label>
          <input
            type="email"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-3" controlId="formBasicPassword">
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary col-xs-12 col-sm-12 col-lg-1 col-xl-1"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Register;
