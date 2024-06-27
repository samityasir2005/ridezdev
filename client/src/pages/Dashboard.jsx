// src/Dashboard.jsx
import React, { useContext, useEffect, useState } from "react";
import "../styles/Dashboard.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../usercontext/UserContext";
import defaultProfilePic from "../assets/profile-pictures/default.jpg";
import CustomSidebar from "./Sidebar";
import { universities } from "../data/universities";

const Dashboard = () => {
  const { user, token } = useContext(UserContext);
  const navigate = useNavigate();
  const [activePanel, setActivePanel] = useState("userSettings");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      toast.warn("Please login first to access dashboard");
    }
  }, [token, navigate]);

  const renderPanel = () => {
    switch (activePanel) {
      case "userSettings":
        return <UserSettings user={user} />;
      case "preferences":
        return <Preferences />;
      case "postSettings":
        return <PostSettings />;
      default:
        return <UserSettings user={user} />;
    }
  };

  return (
    <div className="dashboard-container">
      <CustomSidebar setActivePanel={setActivePanel} />
      <div className="dashboard-content">
        <div className="dashboard-header">
          <h1>Welcome to Your Dashboard</h1>
          <Link to="/logout" className="logout-button">
            Logout
          </Link>
        </div>
        <div className="user-profile">
          {user ? (
            <>
              <img
                src={defaultProfilePic}
                alt="Profile"
                className="profile-pic"
              />
              <p>Name: {user.name}</p>
              <p>Email: {user.email}</p>
            </>
          ) : (
            <p>Loading user data...</p>
          )}
        </div>
        {renderPanel()}
      </div>
    </div>
  );
};

const UserSettings = ({ user }) => {
  const [formData, setFormData] = useState({
    university: "",
    enrolled: false,
    year: "",
    dob: "",
    program: "",
    address: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  if (!user) {
    return <p>Loading user settings...</p>;
  }

  return (
    <div>
      <h2>User Settings</h2>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <button
        className="reset-password-button"
        onClick={() => (window.location.href = "/forgot-password")}
      >
        Reset Password
      </button>
      <form className="user-settings-form"></form>
    </div>
  );
};

const Preferences = () => (
  <div>
    <h2>Preferences</h2>
    <p>Here you can set your preferences.</p>
  </div>
);

const PostSettings = () => (
  <div>
    <h2>Post Settings</h2>
    <p>Here you can manage your post settings.</p>
  </div>
);

export default Dashboard;
