import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import axios from "../utils/axios";
import photo from "../assets/library.png";
import "./style.css";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await axios.post("v1/auth/login", values);
      localStorage.setItem("authToken", result.data.data.authToken);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${result.data.data.authToken}`;
      navigate(ROUTES.DASHBOARD);
    } catch (err) {
      setError("Login failed. Please check your credentials and try again.");
      console.log(err);
    }
  };

  return (
    <div className="Login-section-main-div">
      <form className="Login-section-parent-div" onSubmit={handleSubmit}>
        <div className="login-section-all-input-div">
          <div className="Logo_work_main_divv">
            <div className="Logo_sec_divv">
              <img className="Logo_main_imgg" src={photo} alt="Logo" />
            </div>
          </div>
          <div className="submit-div-he">
            <div>
              <span className="login-span-first">Login</span>
            </div>
            <div className="adjusted-div">
              <div className="email-logo-container">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_3_765)">
                    <path
                      d="M3 3H21C21.2652 3 21.5196 3.10536 21.7071 3.29289C21.8946 3.48043 22 3.73478 22 4V20C22 20.2652 21.8946 20.5196 21.7071 20.7071C21.5196 20.8946 21.2652 21 21 21H3C2.73478 21 2.48043 20.8946 2.29289 20.7071C2.10536 20.5196 2 20.2652 2 20V4C2 3.73478 2.10536 3.48043 2.29289 3.29289C2.48043 3.10536 2.73478 3 3 3ZM20 7.238L12.072 14.338L4 7.216V19H20V7.238ZM4.511 5L12.061 11.662L19.502 5H4.511Z"
                      fill="#101216"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_3_765">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <input
                type="text"
                placeholder="Email"
                name="email"
                value={values.email}
                onChange={handleChange}
                className="same-class-input-field Login-input"
              />
            </div>
            <div className="Passowrd_svg_divvv mt-2">
              <div>
                <svg
                  className="svg-margin"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_26_1789)">
                    <path
                      d="M6 8V7C6 5.4087 6.63214 3.88258 7.75736 2.75736C8.88258 1.63214 10.4087 1 12 1C13.5913 1 15.1174 1.63214 16.2426 2.75736C17.3679 3.88258 18 5.4087 18 7V8H20C20.2652 8 20.5196 8.10536 20.7071 8.29289C20.8946 8.48043 21 8.73478 21 9V21C21 21.2652 20.8946 21.5196 20.7071 21.7071C20.5196 21.8946 20.2652 22 20 22H4C3.73478 22 3.48043 21.8946 3.29289 21.7071C3.10536 21.5196 3 21.2652 3 21V9C3 8.73478 3.10536 8.48043 3.29289 8.29289C3.48043 8.10536 3.73478 8 4 8H6ZM19 10H5V20H19V10ZM11 15.732C10.6187 15.5119 10.3207 15.1721 10.1522 14.7653C9.98376 14.3586 9.9542 13.9076 10.0681 13.4823C10.1821 13.057 10.4332 12.6813 10.7825 12.4132C11.1318 12.1452 11.5597 11.9999 12 11.9999C12.4403 11.9999 12.8682 12.1452 13.2175 12.4132C13.5668 12.6813 13.8179 13.057 13.9319 13.4823C14.0458 13.9076 14.0162 14.3586 13.8478 14.7653C13.6793 15.1721 13.3813 15.5119 13 15.732V18H11V15.732ZM8 8H16V7C16 5.93913 15.5786 4.92172 14.8284 4.17157C14.0783 3.42143 13.0609 3 12 3C10.9391 3 9.92172 3.42143 9.17157 4.17157C8.42143 4.92172 8 5.93913 8 7V8Z"
                      fill="#101216"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_26_1789">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <input
                className="pass-t-a Login-input"
                type="password"
                placeholder="Password"
                name="password"
                value={values.password}
                onChange={handleChange}
              />
              <span
                className="eye-icon"
                onClick={() => setclose(!close)}
              ></span>
            </div>
            {error && <p className="mastu-to-eroor mt-2">{error}</p>}
            {/* <div>
              <span
                className="Forgot-Password-span"
                onClick={() => navigate("/ForgotPassword")}
              >
                Forgot Password?
              </span>
            </div> */}
            <div className="Login_link_divv">
              <button type="submit" className="login-btn-single">
                Login
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
