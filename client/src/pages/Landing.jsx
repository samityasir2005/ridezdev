import React from "react";
import "../styles/Landing.css";
import { Link } from "react-router-dom";
import { useLoadScript } from "@react-google-maps/api";
import { Autocomplete } from "@react-google-maps/api";
import abs from "../assets/pp.jpg";
import redCar from "../assets/red_car.png"; // Import the red car image

const libraries = ["places"];

const Landing = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className="landing-main">
      <div className="left-side">
        <img src={abs} alt="Campus" className="campus-image" />
      </div>
      <div className="right-side">
        <img src={redCar} alt="Red Car" className="red-car" />{" "}
        {/* Add the red car image */}
        <h1>Uridez: Your Campus, Your Commute, Your Community!</h1>
        <form className="ride-form">
          <label htmlFor="from">From:</label>
          <Autocomplete>
            <input
              type="text"
              id="from"
              name="from"
              placeholder="Enter starting location"
            />
          </Autocomplete>

          <label htmlFor="to">To:</label>
          <Autocomplete>
            <input
              type="text"
              id="to"
              name="to"
              placeholder="Enter destination"
            />
          </Autocomplete>

          <button type="submit">Find a Ride</button>
        </form>
      </div>
    </div>
  );
};

export default Landing;
