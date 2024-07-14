import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "../../utils/axios";
import { ROUTES } from "../../constants/routes";

const dashboard = () => {
  const [dashboard, setDashboard] = useState([]);
  useEffect(() => {
    const authToken = localStorage.getItem("authToken");

    axios
      .get("/v1/borrow", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((result) => {
        setDashboard(result.data.data.borrows);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="px-5 mt-5">
      <div className="d-flex justify-content-center">
        <h3>dashboard List</h3>
      </div>

      <div className="mt-3">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {dashboard.map((c) => (
              <tr>
                <td>{c.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default dashboard;
