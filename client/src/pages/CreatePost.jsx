// CreatePost.jsx
import React, { useContext, useEffect, useState } from "react";
import "../styles/Dashboard.css";
import { UserContext } from "../usercontext/UserContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

function CreatePost() {
  const { user, token } = useContext(UserContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    destinationFrom: "",
    destinationTo: "",
    timeOfRideShare: "",
    seatsAvailable: "",
    price: "",
  });

  useEffect(() => {
    if (!token) {
      toast.warn("Please login first to create posts");
      navigate("/login");
    }
  }, [token, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/posts",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Post created successfully!");
      navigate("/dashboard"); // Assuming you have a dashboard route
    } catch (error) {
      toast.error(error.response?.data?.msg || "Error creating post");
    }
  };

  return (
    <div>
      {user ? (
        <div>
          <h2>Create a New Post</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="destinationFrom"
              placeholder="From"
              value={formData.destinationFrom}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="destinationTo"
              placeholder="To"
              value={formData.destinationTo}
              onChange={handleChange}
              required
            />
            <input
              type="datetime-local"
              name="timeOfRideShare"
              value={formData.timeOfRideShare}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="seatsAvailable"
              placeholder="Available Seats"
              value={formData.seatsAvailable}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              required
            />
            <button type="submit">Create Post</button>
          </form>
        </div>
      ) : (
        <p>No user data available</p>
      )}
    </div>
  );
}

export default CreatePost;
