import React, { useContext, useEffect, useState } from "react";
import "../styles/createpost.css";
import { UserContext } from "../usercontext/UserContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useLoadScript, Autocomplete } from "@react-google-maps/api";

const libraries = ["places"];

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

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
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

  const handlePlaceSelect = (place, field) => {
    if (place && place.formatted_address) {
      setFormData((prev) => ({
        ...prev,
        [field]: place.formatted_address,
      }));
    }
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
      navigate("/rideposts");
    } catch (error) {
      toast.error(error.response?.data?.msg || "Error creating post");
    }
  };

  if (!isLoaded) return <div className="create-post__loading-spinner"></div>;

  return (
    <div className="create-post">
      <h2 className="create-post__title">Create a New Post</h2>
      <form onSubmit={handleSubmit} className="create-post__form">
        <Autocomplete
          onLoad={(autocomplete) => {
            autocomplete.addListener("place_changed", () => {
              const place = autocomplete.getPlace();
              handlePlaceSelect(place, "destinationFrom");
            });
          }}
        >
          <input
            type="text"
            name="destinationFrom"
            placeholder="From"
            value={formData.destinationFrom}
            onChange={handleChange}
            required
            className="create-post__input create-post__input--from"
          />
        </Autocomplete>
        <Autocomplete
          onLoad={(autocomplete) => {
            autocomplete.addListener("place_changed", () => {
              const place = autocomplete.getPlace();
              handlePlaceSelect(place, "destinationTo");
            });
          }}
        >
          <input
            type="text"
            name="destinationTo"
            placeholder="To"
            value={formData.destinationTo}
            onChange={handleChange}
            required
            className="create-post__input create-post__input--to"
          />
        </Autocomplete>
        <input
          type="datetime-local"
          name="timeOfRideShare"
          value={formData.timeOfRideShare}
          onChange={handleChange}
          required
          className="create-post__input create-post__input--time"
        />
        <input
          type="number"
          name="seatsAvailable"
          placeholder="Available Seats"
          value={formData.seatsAvailable}
          onChange={handleChange}
          required
          className="create-post__input create-post__input--seats"
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
          className="create-post__input create-post__input--price"
        />
        <button type="submit" className="create-post__submit-btn">
          Create Post
        </button>
      </form>
    </div>
  );
}

export default CreatePost;
