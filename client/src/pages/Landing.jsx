import React from "react";
import "../styles/Landing.css";
import { useLoadScript } from "@react-google-maps/api";
import { Autocomplete } from "@react-google-maps/api";
import abs from "../assets/pp.png";
import redCar from "../assets/red_car.png";

const libraries = ["places"];

const Landing = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  if (!isLoaded) return <div className="loading-spinner"></div>;

  return (
    <div className="landing-main">
      <div className="left-side">
        <img src={abs} alt="Campus" className="campus-image" />
      </div>
      <div className="right-side">
        <img src={redCar} alt="Red Car" className="red-car" />
        <h1>Your Campus, Your Commute, Your Community!</h1>
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
