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
  }, [token]);

  return (
    <div className="dashboard-main">
      <h1>Dashboard</h1>
      <p>{data.msg}! </p>
      <Link to="/logout" className="logout-button">
        Logout
      </Link>
    </div>
  );
};

export default Dashboard;
