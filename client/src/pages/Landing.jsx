import React from "react";
import "../styles/Landing.css";
import { Link } from "react-router-dom";
import { useLoadScript } from "@react-google-maps/api";
import { Autocomplete } from "@react-google-maps/api";
import abs from "../assets/pp.jpg";
const libraries = ["places"];

const Landing = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBwhOb8KvQ9-7XMHmExyBGUxqsj6f7rjKs",
    libraries,
  });

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className="landing-main">
      <div className="left-side">
        <img src={abs} alt="Campus" className="campus-image" />
      </div>
      <div className="right-side">
        <h1>UniRidez: Your Campus, Your Commute, Your Community!</h1>
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
