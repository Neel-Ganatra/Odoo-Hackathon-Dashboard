import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../utils/axios";
import { ROUTES } from "../../constants/routes";

const User = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [usersPerPage] = useState(2);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/v1/users")
      .then((result) => {
        setUsers(result.data.data);
        setTotalPages(Math.ceil(result.data.data.length / usersPerPage));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`/v1/users/${id}`)
      .then(() => {
        setUsers(users.filter((u) => u.id !== id));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdate = (id) => {
    navigate(ROUTES.UPDATE_USER.replace(":id", id));
  };

  // Search filter
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const totalFilteredPages = Math.ceil(filteredUsers.length / usersPerPage);

  return (
    <div className="px-5 mt-5">
      <div className="d-flex justify-content-center">
        <h3>User List</h3>
      </div>
      <Link to={ROUTES.ADD_USER} className="btn btn-success mb-3">
        Add User
      </Link>
      <input
        type="text"
        placeholder="Search by name..."
        className="form-control mb-3"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="mt-4">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              {/* <th>Password</th> */}
              <th>Address</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.password}</td>
                <td>{user.address}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.role}</td>
                <td>
                  <button
                    onClick={() => handleUpdate(user.id)}
                    className="btn btn-primary me-2"
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    onClick={() =>
                      confirm("Are you sure?") && handleDelete(user.id)
                    }
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <nav aria-label="Page navigation">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Previous
            </button>
          </li>
          {[...Array(totalFilteredPages)].map((_, index) => (
            <li
              key={index}
              className={`page-item ${
                currentPage === index + 1 ? "active" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            </li>
          ))}
          <li
            className={`page-item ${
              currentPage === totalFilteredPages ? "disabled" : ""
            }`}
          >
            <button
              className="page-link"
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default User;
