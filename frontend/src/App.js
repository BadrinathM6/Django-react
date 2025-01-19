import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import Register from "./sections/register";
import Login from "./sections/Login";
import Home from "./sections/home";

const app = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/" element={<Home />} />
        </Routes>
    </BrowserRouter>
  );
};

export default app;
