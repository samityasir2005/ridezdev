import React, { useContext, useEffect, useState } from "react";
import "../styles/createpost.css";
import { UserContext } from "../usercontext/UserContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useLoadScript, Autocomplete } from "@react-google-maps/api";
import CurrencyInput from "react-currency-input-field";

const libraries = ["places"];

function CreatePost() {
  const { user, token } = useContext(UserContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    destinationFrom: "",
    destinationTo: "",
    timeOfRideShare: "",
    seatsAvailable: "1",
    price: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validatePrice = (price) => {
    const numericPrice = parseFloat(price);
    return !isNaN(numericPrice) && numericPrice <= 300;
  };

  const handlePriceChange = (value, name) => {
    if (validatePrice(value)) {
      setFormData({ ...formData, [name]: value });
    } else {
      toast.warning("Price must not exceed $300.00");
      setFormData({ ...formData, [name]: "300.00" });
    }
  };

  const handlePlaceSelect = (place, field) => {
    if (place && place.formatted_address) {
      setFormData((prev) => ({
        ...prev,
        [field]: place.formatted_address,
      }));
    }
  };

  const validateAddress = async (address) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          address
        )}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`
      );
      return response.data.results.length > 0;
    } catch (error) {
      console.error("Error validating address:", error);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const isFromValid = await validateAddress(formData.destinationFrom);
    const isToValid = await validateAddress(formData.destinationTo);

    if (!isFromValid || !isToValid) {
      toast.error(
        "Please enter valid addresses for both 'From' and 'To' fields."
      );
      setIsSubmitting(false);
      return;
    }

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
    } finally {
      // Add a delay before re-enabling the button
      setTimeout(() => {
        setIsSubmitting(false);
      }, 5000); // 5 seconds delay
    }
  };

  if (!isLoaded) return <div className="create-post__loading-spinner"></div>;

  return (
    <div className="create-post">
      <h2 className="create-post__title">Create a New Ride Share</h2>
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
        <select
          name="seatsAvailable"
          value={formData.seatsAvailable}
          onChange={handleChange}
          required
          className="create-post__input create-post__input--seats"
        >
          <option value="1">1 seat</option>
          <option value="2">2 seats</option>
          <option value="3">3 seats</option>
          <option value="4">4 seats</option>
        </select>
        <CurrencyInput
          id="price"
          name="price"
          placeholder="Enter price (max $300.00)"
          defaultValue={formData.price}
          decimalsLimit={2}
          onValueChange={(value, name) => handlePriceChange(value, name)}
          prefix="$"
          maxLength={6}
          className="create-post__input create-post__input--price"
        />
        <button
          type="submit"
          className="create-post__submit-btn"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Create Ride Share" : "Create Ride Share"}
        </button>
      </form>
    </div>
  );
}

export default CreatePost;
