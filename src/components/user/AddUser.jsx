import axios from "../../utils/axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
  const [user, setUser] = useState({});
  const [roles] = useState(["LIBRARIAN", "USER", "ADMIN"]); // Role options
  // const [branch, setBranch] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Uncomment if you want to fetch branches
    // axios.get("/v1/branch")
    //   .then((result) => {
    //     setBranch(result.data.Result);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("/v1/users", {
        name: user.name,
        email: user.email,
        password: user.password,
        address: user.address,
        phone: user.number,
        role: user.role,
        enabled: true,
      })
      .then((result) => {
        navigate("/user");
      })
      .catch((err) => {
        console.log(err);
        alert("An error occurred while adding the user.");
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-75">
      <div className="p-4 rounded w-50 border">
        <h1>Add User</h1>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                placeholder="Enter name"
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
                placeholder="Enter email"
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
              placeholder="Enter address"
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
                placeholder="Enter phone"
                onChange={(e) => setUser({ ...user, number: e.target.value })}
                className="form-control rounded-0"
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter password"
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                className="form-control rounded-0"
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="role">Role</label>
            <select
              id="role"
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
            Add User
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
