import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import AuthUser from "../User/AuthUser";

const EditShipment = () => {
  const { httpAuth, setToken, logout } = AuthUser();
  const [waybill, setWaybill] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigate = useNavigate();

  let { id } = useParams();

  const updateShipment = (e) => {
    e.preventDefault();
    let bodyJson = {
      waybill: waybill,
      customer_address: customerAddress,
      customer_name: customerName,
      phone_number: phoneNumber,
    };
    httpAuth
      .put("/shipments/" + id, bodyJson)
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

  useEffect(() => {
    const res = httpAuth
      .get("/shipments/" + id)
      .then((res) => {
        setWaybill(res.data.shipment.waybill);
        setCustomerAddress(res.data.shipment.customer_address);
        setCustomerName(res.data.shipment.customer_name);
        setPhoneNumber(res.data.shipment.phone_number);
      })
      .catch(function (error) {
        if (error.response.status == 401) {
          logout();
        }
      });
  }, []);

  return (
    <>
      <h4>
        Edit Shipment
        <Link to={"/shipments"} className="btn btn-primary btn-sm float-end">
          Back
        </Link>
      </h4>
      <form onSubmit={updateShipment}>
        <div className="form-group mb-3">
          <label>WayBill</label>
          <input
            type="text"
            name="waybill"
            onChange={(e) => setWaybill(e.target.value)}
            className="form-control"
            defaultValue={waybill}
          />
        </div>
        <div className="form-group mb-3">
          <label>Customer Name</label>
          <input
            type="text"
            name="customer_name"
            defaultValue={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group mb-3">
          <label>Customer Address</label>
          <input
            type="text"
            name="customer_address"
            defaultValue={customerAddress}
            onChange={(e) => setCustomerAddress(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group mb-3">
          <label>Customer Phone Number</label>
          <input
            type="text"
            name="phone_number"
            defaultValue={phoneNumber}
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
    </>
  );
};

export default EditShipment;
