// ProtectedRoute.js
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import { useEffect } from "react";
import axios from "../utils/axios";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("authToken");
    if (!isAuthenticated) {
      navigate(ROUTES.LOGIN);
    }

    axios.defaults.headers.common["Authorization"] = `Bearer ${isAuthenticated}`
  }, [navigate]);

  return children
};

export default ProtectedRoute;
