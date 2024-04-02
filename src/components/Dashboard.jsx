import "bootstrap-icons/font/bootstrap-icons.css";
import React from "react";
import { Link, Outlet } from "react-router-dom";
import { ROUTES } from "../constants/routes";

const Dashboard = ({ children }) => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
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
                  <span className="ms-1 d-none d-sm-inline"> Dashboard</span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to={ROUTES.ACADEMIC}
                  className="nav-link px-0 align-middle"
                >
                  <i className="fs-4 bi-journal-bookmark ms-2"></i>
                  <span className="ms-1 d-none d-sm-inline">Academics</span>
                </Link>
              </li>
              <li className="w-100">
                <Link to={ROUTES.BRANCH} className="nav-link px-0 align-middle">
                  <i className="fs-4 bi-table ms-2"></i>
                  <span className="ms-1 d-none d-sm-inline">Branches</span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to={ROUTES.CATEGORY}
                  className="nav-link px-0 align-middle"
                >
                  <i class="fs-4 bi bi-tag ms-2"></i>
                  <span className="ms-1 d-none d-sm-inline">Categories</span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to={ROUTES.FACULTY}
                  className="nav-link px-0 align-middle"
                >
                  <i class="fs-4 bi bi-person-check ms-2"></i>
                  <span className="ms-1 d-none d-sm-inline">Faculties</span>
                </Link>
              </li>
              <li className="w-100">
                <Link to={ROUTES.GROUP} className="nav-link px-0 align-middle">
                  <i className="fs-4 bi-people ms-2"></i>
                  <span className="ms-1 d-none d-sm-inline">Groups</span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to={ROUTES.PROJECT}
                  className="nav-link px-0 align-middle"
                >
                  <i class="fs-4 bi bi-android ms-2"></i>
                  <span className="ms-1 d-none d-sm-inline">Projects</span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to={ROUTES.TECHNOLOGIES}
                  className="nav-link px-0 align-middle"
                >
                  <i className="fs-4 bi-table ms-2"></i>
                  <span className="ms-1 d-none d-sm-inline">Technologies</span>
                </Link>
              </li>
              <li className="w-100">
                <Link to={ROUTES.LOGOUT} className="nav-link px-0 align-middle">
                  <i class="fs-4 bi bi-box-arrow-left ms-2"></i>
                  <span className="ms-1 d-none d-sm-inline">Logout</span>
                </Link>
              </li>
              {/* <li>
                            <Link to="/dashboard">Categories</Link>
                        </li>
                        <li>
                            <Link to="/dashboard">Faculties</Link>
                        </li>
                        <li>
                            <Link to="/dashboard">Groups</Link>
                        </li>
                        <li>
                            <Link to="/dashboard">Projects</Link>
                        </li>
                        <li>
                            <Link to="/dashboard/technologies">Technologies</Link> */}
            </ul>
          </div>
        </div>
        <div className="col m-0 p-0">
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
