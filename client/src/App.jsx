import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "../src/pages/Home";
import Register from "../src/pages/Register";
import Login from "../src/pages/Login";
import AboutUs from "../src/pages/AboutUs";
import Profiles from "../src/pages/Profiles";
import "bootstrap/dist/css/bootstrap.min.css";
function App() {
  return (
    <>
      <Header />

      <Routes style={{ marginTop: "56px" }}>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/profiles" element={<Profiles />} />
      </Routes>
    </>
  );
}

export default App;
