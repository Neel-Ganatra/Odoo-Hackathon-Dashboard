import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Books from "./components/books/Books";
import AddBooks from "./components/books/AddBooks";
import UpdateBooks from "./components/books/UpdateBooks";

import User from "./components/user/user";
import AddUser from "./components/user/AddUser";
import UpdateUser from "./components/user/UpdateUser";
import DASHBOARD1 from "./components/dashboard/dashboard";

import ProtectedRoute from "./constants/ProtectedRoute";
import { ROUTES } from "./constants/routes";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Logout = () => {
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    window.location.href = ROUTES.LOGIN;
  };

  React.useEffect(() => {
    handleLogout();
  }, []);

  return null;
};

function App() {
  return (
    <BrowserRouter>
      <Dashboard>
        <Routes>
          <Route
            path={ROUTES.DASHBOARD1}
            element={
              <ProtectedRoute>
                <DASHBOARD1 />
              </ProtectedRoute>
            }
          />
          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route path={ROUTES.BOOKS} element={<Books />} />
          <Route path={ROUTES.ADD_BOOKS} element={<AddBooks />} />
          <Route path={ROUTES.UPDATE_BOOKS} element={<UpdateBooks />} />
          <Route path={ROUTES.UPDATE_USER} element={<UpdateUser />} />
          <Route
            path={ROUTES.USER}
            element={
              <ProtectedRoute>
                <User />
              </ProtectedRoute>
            }
          />

          <Route path={ROUTES.ADD_USER} element={<AddUser />} />
          <Route path={ROUTES.LOGOUT} element={<Logout />} />
        </Routes>
      </Dashboard>
    </BrowserRouter>
  );
}

export default App;
