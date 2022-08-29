import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const AuthUser = () => {
  const navigate = useNavigate();

  const getToken = () => {
    const tokenString = sessionStorage.getItem("token");
    const userToken = JSON.parse(tokenString);
    return userToken;
  };

  const getUser = () => {
    const userString = sessionStorage.getItem("user");
    const userDetail = JSON.parse(userString);
    return userDetail;
  };

  const [token, setToken] = useState(getToken());
  const [user, setUser] = useState(getUser());

  const saveToken = (user, token) => {
    sessionStorage.setItem("token", JSON.stringify(token));
    sessionStorage.setItem("user", JSON.stringify(user));

    setUser(user);
    setToken(token);
  };

  const logout = () => {
    sessionStorage.clear();
    navigate("/login");
  };

  const httpAuth = axios.create({
    baseURL: "http://127.0.0.1:8000/api",
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + getToken(),
    },
  });

  const http = axios.create({
    baseURL: "http://127.0.0.1:8000/api",
    headers: { "Content-type": "application/json" },
  });

  return {
    setToken: saveToken,
    token,
    user,
    getToken,
    http,
    httpAuth,
    logout,
  };
};

export default AuthUser;
