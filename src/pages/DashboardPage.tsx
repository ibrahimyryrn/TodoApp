import React from "react";
import { useNavigate } from "react-router-dom";
import { getAuthData, removeAuthData } from "../utils/cookies";
import axios from "axios";

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const { token } = getAuthData();

    try {
      await axios.post(
        "https://oznnkyasreusdkcvhggc.supabase.co/auth/v1/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            apikey: `${import.meta.env.VITE_SUPABASE_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      removeAuthData();

      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default DashboardPage;
