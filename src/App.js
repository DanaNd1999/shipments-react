import React from "react";
import Login from "./User/Login";
import Main from "./Main";
import AuthUser from "./User/AuthUser";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AllShipments from "./Shipments/AllShipments";
import AddShipment from "./Shipments/AddShipment";
import EditShipment from "./Shipments/EditShipment";
import Register from "./User/Register";

const App = () => {
  const { getToken, token, logout } = AuthUser();

  if (!getToken()) {
    return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Routes>
    );
  }
  const logoutUser = () => {
    if (token != undefined) {
      logout();
    }
  };

  return (
    <div>
      <nav className="navbar navbar-expand-sm navbar-light bg-light">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to={"/shipments"}>
              Shipments
            </Link>
          </li>
          <li className="nav-item">
            <span className="nav-link" role="button" onClick={logoutUser}>
              Logout
            </span>
          </li>
        </ul>
      </nav>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-12">
            <Routes>
              <Route path="" element={<Main />} />
              <Route path="register" element={<Register />} />
              <Route path="shipments">
                <Route index element={<AllShipments />} />
                <Route path="add" element={<AddShipment />} />
                <Route path=":id/edit" element={<EditShipment />} />
              </Route>
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
