import React from "react";
import { motion } from "framer-motion";
import { useLoadScript } from "@react-google-maps/api";
import { Autocomplete } from "@react-google-maps/api";
import abs from "../assets/pp.png";
import redCar from "../assets/red_car.png";
import "../styles/Landing.css";

const libraries = ["places"];

const Landing = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  if (!isLoaded) return <div className="loading-spinner"></div>;

  return (
    <motion.div
      className="landing-main"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div className="left-side" variants={itemVariants}>
        <motion.img
          src={abs}
          alt="Campus"
          className="campus-image"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
      <motion.div className="right-side" variants={itemVariants}>
        <motion.img
          src={redCar}
          alt="Red Car"
          className="red-car"
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ duration: 4, repeat: Infinity, repeatType: "loop" }}
        />
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Your Campus, Your Commute, Your Community!
        </motion.h1>
        <motion.form
          className="ride-form"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <label htmlFor="from">From:</label>
          <Autocomplete>
            <motion.input
              whileFocus={{ scale: 1.05 }}
              type="text"
              id="from"
              name="from"
              placeholder="Enter starting location"
            />
          </Autocomplete>

          <label htmlFor="to">To:</label>
          <Autocomplete>
            <motion.input
              whileFocus={{ scale: 1.05 }}
              type="text"
              id="to"
              name="to"
              placeholder="Enter destination"
            />
          </Autocomplete>

          <motion.button type="submit">Find a Ride</motion.button>
        </motion.form>
      </motion.div>
    </motion.div>
  );
};

export default Landing;
