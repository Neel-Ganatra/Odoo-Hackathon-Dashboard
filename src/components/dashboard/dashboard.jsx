import React, { useEffect, useState } from "react";
import axios from "../../utils/axios";
import { ROUTES } from "../../constants/routes";

const Dashboard = () => {
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
        <h3>Dashboard List</h3>
      </div>

      <div className="mt-3">
        <table className="table">
          <thead>
            <tr>
              <th>Book Title</th>
              <th>Author</th>
              <th>Fees</th>
              <th>Fees Paid</th>
              <th>Borrowed At</th>
              <th>Return Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {dashboard.map((c) => (
              <tr key={c.id}>
                <td>{c.book.title}</td>
                <td>{c.book.author}</td>
                <td>{c.fees}</td>
                <td>{c.feesPaid ? "Yes" : "No"}</td>
                <td>{new Date(c.borrowedAt).toLocaleDateString()}</td>
                <td>{new Date(c.returnDate).toLocaleDateString()}</td>
                <td>{c.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
