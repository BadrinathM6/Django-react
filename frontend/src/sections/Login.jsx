import React, { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState({ message: "", type: "" });

  const showAlert = (message, type) => {
    setAlert({ message, type });
    setTimeout(() => {
      setAlert({ message: "", type: "" });
    }, 2000);
  };

  const handlelogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      showAlert("Please fill in all fields", "error");
      setPassword("");
      return;
    }
    try {
      const response = await axiosInstance.post(`/login/`, {
        username: username,
        password: password,
      });
      const { Access_token, refresh_token } = response.data;

      localStorage.setItem("accessToken", Access_token);
      localStorage.setItem("refreshToken", refresh_token);

      showAlert("Login successful", "success");
      setUsername("");
      setPassword("");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        showAlert("Invalid credentials. Please try again.", "error");
      } else {
        showAlert("An error occurred. Please try again later.", "error");
      }
    }
  };
  return (
    <div className="min-h-screen bg-[#1E2025] flex items-center justify-center">
      <div className="min-w-[33.3%] space-y-3">
        <div className="flex justify-center mb-6">
          <h2 className="text-3xl text-[#00c2b8] font-serif">Sign-In</h2>
        </div>
        {alert.message && (
          <div
            className={`alert alert-${
              alert.type
            } fixed top-5 right-5 p-4 rounded flex justify-between items-center max-w-xs z-50 text-white ${
              alert.type === "success" ? "bg-green-500" : "bg-red-500"
            }`}
          >
            <span>{alert.message}</span>
            <button
              onClick={() => setAlert({ message: "", type: "" })}
              className="text-white text-lg ml-2"
            >
              &times;
            </button>
          </div>
        )}
        <form className="flex-col items-center" onSubmit={handlelogin}>
          <div className="space-y-3 mb-6">
            <label className="block text-[#ccd6f6] text-xl lg:text-2xl font-mono">
              Username:
            </label>
            <input
              className="inline-block text-xl text-white p-4 rounded w-full bg-[#1E2025] border-2 border-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00c2b8] focus:border-transparent"
              value={username}
              placeholder="Enter your username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="space-y-3 mb-6">
            <label className="block text-[#ccd6f6] text-xl lg:text-2xl font-mono">
              Password:
            </label>
            <input
              type="password"
              className="inline-block text-xl text-white p-4 rounded w-full bg-[#1E2025] border-2 border-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00c2b8] focus:border-transparent"
              value={password}
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex justify-center items-center mb-3">
            <button className="block bg-[#1E2025] text-[#00c2b8] px-6 py-3 border-2 border-[#00c2b8] text-xl rounded-md hover:scale-110 hover:bg-[#00c2b8] hover:text-[#1E2025] transition duration-300">
              Login
            </button>
          </div>
          <div className="flex justify-center items-center mb-3">
            <h3 className="inline-block text-[#ccd6f6] text-xl">
              Don't have an account?{" "}
              <a href="/register" className="text-[#00c2b8]">
                Register
              </a>
            </h3>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
