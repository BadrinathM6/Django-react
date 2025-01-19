import React, { useState, } from "react";
import {useNavigate} from 'react-router-dom'
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const baseurl = "http://127.0.0.1:8000";
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [alert, setAlert] = useState({ message: "", type: "" });

  const validatePassword = (password) => {
    const minLength = /.{8,15}/;
    const hasNumber = /[0-9]/;
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;

    if (!minLength.test(password)) {
      showAlert("Password must be between 8 and 15 characters.", "error");
      return false;
    }
    if (!hasNumber.test(password)) {
      showAlert("Password must include at least one number.", "error");
      return false;
    }
    if (!hasSpecialChar.test(password)) {
      showAlert("Password must include at least one special character.", "error");
      return false;
    }
    return true;
  };

  const submit = async (e) => {
    e.preventDefault();

    if (!username || !password || !confirmPassword) {
      showAlert("Please fill all fields.", "error");
      setPassword("");
      setConfirmPassword("");
      return;
    }

    if (!validatePassword(password)) {
      setPassword("");
      setConfirmPassword("");
      return;
    }

    if (password !== confirmPassword) {
      showAlert("Password and Confirm Password mismatch.", "error");
      setPassword("");
      setConfirmPassword("");
      return;
    }

    try {
      const response = await axios.post(`${baseurl}/register/`, {
        username: username,
        password: password,
        password2: confirmPassword
      });
      showAlert("Registration successful!", "success");
      setUsername("");
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        navigate("/login")
      }, 2000);
    } catch (err) {
      const errorMessage =
        err.response?.data?.error ||
        "An unexpected error occurred. Please try again.";
      showAlert(errorMessage, "error");
    }
  };

  const showAlert = (message, type) => {
    setAlert({ message, type });
    setTimeout(() => {
      setAlert({ message: "", type: "" });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#1E2025] flex items-center justify-center">
      <div className="min-w-[33.3%] space-y-3">
        <div className="flex justify-center mb-6">
          <h2 className="text-3xl text-[#00c2b8] font-serif">Sign-up</h2>
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
        <form className="flex-col items-center" onSubmit={submit}>
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
          <div className="space-y-3 mb-6">
            <label className="block text-[#ccd6f6] text-xl lg:text-2xl font-mono">
              Confirm Password:
            </label>
            <input
              type="password"
              className="inline-block text-xl text-white p-4 rounded w-full bg-[#1E2025] border-2 border-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00c2b8] focus:border-transparent"
              value={confirmPassword}
              placeholder="Re-type your password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="flex justify-center items-center mb-3">
            <button className="block bg-[#1E2025] text-[#00c2b8] p-3 border-2 border-[#00c2b8] text-xl rounded-md hover:scale-110 hover:bg-[#00c2b8] hover:text-[#1E2025] transition duration-300">
              Register
            </button>
          </div>
          <div className="flex justify-center items-center mb-3">
            <h3 className="inline-block text-[#ccd6f6] text-xl">
              Already have an account?{" "}
              <a href="/login" className="text-[#00c2b8]">
                Login
              </a>
            </h3>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
