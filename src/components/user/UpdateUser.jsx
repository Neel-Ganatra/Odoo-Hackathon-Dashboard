import axios from "../../utils/axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateUser = () => {
  const [user, setUser] = useState({});
  const [roles] = useState(["LIBRARIAN", "USER", "ADMIN"]); // Role options
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`/v1/users/${id}`);
        setUser(response.data.data); // Assuming data structure
      } catch (error) {
        console.error(error);
        alert("An error occurred while fetching user details.");
      }
    };

    fetchUserDetails();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`/v1/users/${id}`, {
        ...user,
        // Keep the enabled flag if needed
        enabled: true,
      });

      navigate("/user");
    } catch (error) {
      console.error(error);
      alert("An error occurred while updating the user.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-75">
      <div className="p-4 rounded w-50 border">
        <h1>Update User</h1>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                value={user.name || ""}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                className="form-control rounded-0"
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={user.email || ""}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                className="form-control rounded-0"
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              value={user.address || ""}
              onChange={(e) => setUser({ ...user, address: e.target.value })}
              className="form-control rounded-0"
              required
            />
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="number">Phone</label>
              <input
                type="number"
                id="number"
                value={user.phone || ""}
                onChange={(e) => setUser({ ...user, phone: e.target.value })}
                className="form-control rounded-0"
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter new password (leave blank to keep current)"
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                className="form-control rounded-0"
              />
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="role">Role</label>
            <select
              id="role"
              value={user.role || ""}
              onChange={(e) => setUser({ ...user, role: e.target.value })}
              className="form-control rounded-0"
              required
            >
              <option value="">Select Role</option>
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="btn btn-success w-100">
            Update User
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateUser;
