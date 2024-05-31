import React, { useEffect, useState } from "react";
import "../styles/Dashboard.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import defaultProfilePic from "../assets/profile-pictures/default.jpg";

const Dashboard = () => {
  const [token, setToken] = useState(
    JSON.parse(localStorage.getItem("auth")) || ""
  );
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  const fetchUserData = async () => {
    let axiosConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/dashboard",
        axiosConfig
      );
      setUserData(response.data.user);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchUserData();
    if (token === "") {
      navigate("/login");
      toast.warn("Please login first to access dashboard");
    }
  }, [token, navigate]);

  return (
    <div className="dashboard-main">
      <div className="dashboard-header">
        <h1>Welcome to Your Dashboard</h1>
        <Link to="/logout" className="logout-button">
          Logout
        </Link>
      </div>
      <div className="user-profile">
        {userData ? (
          <>
            <img
              src={defaultProfilePic}
              alt="Profile"
              className="profile-pic"
            />
            <p>Name: {userData.name}</p>
            <p>Email: {userData.email}</p>
            <p>ID: {userData.id}</p>
          </>
        ) : (
          <p>Loading user data...</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
