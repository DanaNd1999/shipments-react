import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthUser from "../User/AuthUser";
import { required } from "react-admin";

const AddShipment = () => {
  const { httpAuth, setToken, logout } = AuthUser();
  const navigate = useNavigate();
  const [waybill, setWaybill] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const saveShipment = async (e) => {
    e.preventDefault();
    let bodyJson = {
      waybill: waybill,
      customer_address: customerAddress,
      customer_name: customerName,
      phone_number: phoneNumber,
    };
    httpAuth
      .post("/shipments", bodyJson)
      .then((res) => {
        navigate(-1);
      })
      .catch(function (error) {
        console.log(error.response.status); // 401
        console.log(error.response.data.error); //Please Authenticate or whatever returned from server
        if (error.response.status == 401) {
          logout();
        }
      });
  };

  return (
    <>
      {/* <div className="card-header"> */}
        <h4>
          Add Shipment
          <Link to={"/shipments"} className="btn btn-primary btn-sm float-end">
            Back
          </Link>
        </h4>
      {/* </div> */}
      {/* <div className="card-body"> */}
        <form onSubmit={saveShipment}>
          <div className="form-group mb-3">
            <label>WayBill</label>
            <input
              type="text"
              name="waybill"
              onChange={(e) => setWaybill(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="form-group mb-3">
            <label>Customer Name</label>
            <input
              type="text"
              name="customer_name"
              onChange={(e) => setCustomerName(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="form-group mb-3">
            <label>Customer Address</label>
            <input
              type="text"
              name="customer_address"
              onChange={(e) => setCustomerAddress(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="form-group mb-3">
            <label>Customer Phone Number</label>
            <input
              type="text"
              name="phone_number"
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="form-group mb-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      {/* </div> */}
    </>
  );
};

export default AddShipment;
