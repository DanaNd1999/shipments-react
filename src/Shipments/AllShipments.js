import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import AuthUser from "../User/AuthUser";

const AllShipments = () => {
  const { httpAuth, logout } = AuthUser();
  const [shipmentState, setShipmentState] = useState({
    shipmentsData: [],
    loading: true,
  });

  const getShipments = () => {
    const res = httpAuth
      .get("/shipments")
      .then((res) => {
        setShipmentState({
          shipmentsData: res.data.shipments,
          loading: false,
        });
      })
      .catch(function (error) {
        if (error.response.status == 401) {
          logout();
        }
      });
  };

  useEffect(() => {
    getShipments();
  }, []);

  const cancelShipment = (id) => {
    httpAuth
      .delete(`/shipments/${id}`)
      .then((res) => {
        getShipments();
      })
      .catch(function (error) {
        if (error.response.status == 401) {
          logout();
        }
      });
  };

  let shipments = "";
  if (shipmentState.loading) {
    shipments = (
      <tr>
        <td colSpan="7">
          <h2>Loading...</h2>
        </td>
      </tr>
    );
  } else {
    shipments = shipmentState.shipmentsData.map((item) => {
      return (
        <tr key={item.id}>
          <td>{item.waybill}</td>
          <td>{item.customer_name}</td>
          <td>{item.customer_address}</td>
          <td>{item.phone_number}</td>
          <td>{item.is_canceled}</td>
          <td>
            <Link
              to={{
                pathname: `${item.id}/edit`,
              }}
              className="btn btn-success btn-sm"
            >
              Edit
            </Link>
          </td>
          <td>
            <button
              type="submit"
              className="btn btn-danger btn-sm"
              onClick={() => cancelShipment(item.id)}
            >
              Cancel
            </button>
          </td>
        </tr>
      );
    });
  }
  return (
    <>
      <div className="card-header">
        <h4>
          All Shipments
          <Link
            to={"/shipments/add"}
            className="btn btn-primary btn-sm float-end"
          >
            Add Shipment
          </Link>
        </h4>
      </div>
      <div className="card-body">
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Waybill</th>
              <th>Customer Name</th>
              <th>Customer Address</th>
              <th>Customer Phone Number</th>
              <th>Canceled</th>
              <th>Edit</th>
              <th>Cancel</th>
            </tr>
          </thead>
          <tbody>{shipments}</tbody>
        </table>
      </div>
    </>
  );
};

export default AllShipments;
