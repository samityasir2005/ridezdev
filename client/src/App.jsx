import { useState } from "react"; // Import useState
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "../src/pages/Home";
import Register from "../src/pages/Register";
import Login from "../src/pages/Login";
import AboutUs from "../src/pages/AboutUs";
import Profile from "../src/pages/Profile";
import "bootstrap/dist/css/bootstrap.min.css";
import { UserContextProvider } from "../context/userContext";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  return (
    <>
      <UserContextProvider>
        <Header />

        <Routes style={{ marginTop: "56px" }}>
          <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />{" "}
          {/* Pass isLoggedIn as prop */}
          <Route path="/register" element={<Register />} />
          <Route
            path="/login"
            element={<Login setIsLoggedIn={setIsLoggedIn} />}
          />{" "}
          {/* Pass setIsLoggedIn as prop */}
          <Route path="/about" element={<AboutUs />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </UserContextProvider>
    </>
  );
}

export default App;
