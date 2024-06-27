import React, { useContext, useEffect, useState } from "react";
import "../styles/Dashboard.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../usercontext/UserContext";
import axios from "axios";
import defaultProfilePic from "../assets/profile-pictures/default.jpg";
import CustomSidebar from "./Sidebar";

const Dashboard = () => {
  const { user, token } = useContext(UserContext);
  const navigate = useNavigate();
  const [activePanel, setActivePanel] = useState("userSettings");
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      toast.warn("Please login first to access dashboard");
    } else {
      fetchUserPosts();
    }
  }, [token, navigate]);

  const fetchUserPosts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/user/posts",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUserPosts(response.data.posts);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch user posts");
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/posts/${postId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Post deleted successfully");
      fetchUserPosts();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete post");
    }
  };

  const renderPanel = () => {
    switch (activePanel) {
      case "userSettings":
        return <UserSettings user={user} />;
      case "preferences":
        return <Preferences />;
      case "postSettings":
        return (
          <PostSettings userPosts={userPosts} onDeletePost={handleDeletePost} />
        );
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

const PostSettings = ({ userPosts, onDeletePost }) => (
  <div>
    <h2>Post Settings</h2>
    <p>Here you can manage your posts.</p>
    {userPosts.length === 0 ? (
      <p>You have no active posts!</p>
    ) : (
      <div className="post-list">
        {userPosts.map((post) => (
          <div key={post._id} className="post-card">
            <h2>
              {post.destinationFrom} to {post.destinationTo}
            </h2>
            <p>Date: {new Date(post.timeOfRideShare).toLocaleString()}</p>
            <p>Price: ${post.price}</p>
            <p>Seats Available: {post.seatsAvailable}</p>
            <p>Posted on: {new Date(post.createdAt).toLocaleString()}</p>
            <button onClick={() => onDeletePost(post._id)}>Delete</button>
          </div>
        ))}
      </div>
    )}
  </div>
);

export default Dashboard;
