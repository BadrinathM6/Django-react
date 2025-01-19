import { useState } from "react";
import axiosInstance from "../utils/axiosInstance";

const Home = () => {
  const [username, setUsername] = useState("");

  const fetchUserdetails = async () => {
    try {
      const response = await axiosInstance.get("/home/");
      const data = response.data.username;
      setUsername(data);
    } catch (err) {
      console.log(err);
    }
  };

  fetchUserdetails();

  return (
    <div className="bg-[#1E2025] flex justify-center items-center min-h-screen">
      <h2 className="text-3xl text-[#00c2b8] font-serif">
        {" "}
        Hello {username}{" "}
        <span
          className="inline-block origin-bottom-right"
          style={{
            animation: "wave 1.5s ease-in-out infinite",
            transformOrigin: "bottom right",
          }}
        >
          👋
        </span>
      </h2>
      <style>
        {`
      @keyframes wave {
        0%, 100% { transform: rotate(0deg); }
        50% { transform: rotate(20deg); }
      }
    `}
      </style>
    </div>
  );
};
export default Home;
