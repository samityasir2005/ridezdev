import React, { useEffect, useState } from "react";
import "../styles/Dashboard.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const Dashboard = () => {
  const [token, setToken] = useState(
    JSON.parse(localStorage.getItem("auth")) || ""
  );
  const [data, setData] = useState({});
  const navigate = useNavigate();

  const fetchGreeting = async () => {
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
      setData({ msg: response.data.msg });
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchGreeting();
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
        <img src={data.user?.profilePicture} alt="Profile" className="profile-pic" />
        <h2>{data.user?.name}</h2>
        <p>Email: {data.user?.email}</p>
        <p>{data.msg}</p>
      </div>
      <div className="dashboard-nav">
        <Link to="/book-ride" className="nav-button">Book a Ride</Link>
        <Link to="/my-rides" className="nav-button">My Rides</Link>
        <Link to="/messages" className="nav-button">Messages</Link>
        <Link to="/settings" className="nav-button">Settings</Link>
      </div>
    </div>
  );
};

export default Dashboard;
