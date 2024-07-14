import "bootstrap-icons/font/bootstrap-icons.css";
import React from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { ROUTES } from "../constants/routes";

const Dashboard = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate(ROUTES.LOGIN);
  };

  if (location.pathname === ROUTES.LOGIN) {
    return children;
  }
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 col-lg-2 d-md-block bg-dark">
          <div className="d-flex flex-column align-items-center px-3 pt-2 text-white min-vh-100">
            <Link
              to={ROUTES.DASHBOARD}
              className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none"
            >
              <span className="fs-5 d-none d-sm-inline">Admin Panel</span>
            </Link>
            <ul
              className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
              id="menu"
            >
              <li className="w-100">
                <Link
                  to={ROUTES.DASHBOARD}
                  className="nav-link px-0 align-middle"
                >
                  <i className="fs-4 bi-speedometer2 ms-2"></i>
                  <span className="ms-1 d-none d-sm-inline">Dashboard</span>
                </Link>
              </li>
              <li className="w-100">
                <Link to={ROUTES.USER} className="nav-link px-0 align-middle">
                  <i className="fs-4 bi-people ms-2"></i>
                  <span className="ms-1 d-none d-sm-inline">User</span>
                </Link>
              </li>
              <li className="w-100">
                <Link to={ROUTES.BOOKS} className="nav-link px-0 align-middle">
                  <i className="fs-4 bi-journal-bookmark ms-2"></i>
                  <span className="ms-1 d-none d-sm-inline">Books</span>
                </Link>
              </li>

              <li className="w-100">
                <button
                  onClick={handleLogout}
                  className="nav-link px-0 align-middle btn btn-link text-white"
                >
                  <i className="fs-4 bi bi-box-arrow-left ms-2"></i>
                  <span className="ms-1 d-none d-sm-inline">Logout</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-md-9 col-lg-10 col-xl-10">
          <div className="p-2 d-flex justify-content-center align-items-center shadow">
            <h4>Management System</h4>
          </div>
          <Outlet />
          {children}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
