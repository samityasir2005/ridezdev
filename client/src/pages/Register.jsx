// client/src/pages/Register.jsx
import React, { useEffect, useState } from "react";
import Image from "../assets/laurier-logo.jpg";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import "../styles/Register.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import zxcvbn from "zxcvbn";
import PasswordStrengthBar from "react-password-strength-bar";
import { bannedWords } from "../data/bannedwords";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordScore, setPasswordScore] = useState(0);
  const navigate = useNavigate();
  const [token, setToken] = useState(
    JSON.parse(localStorage.getItem("auth")) || ""
  );

  const validateName = (name) => {
    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!nameRegex.test(name)) {
      toast.error("Name should not contain special characters or numbers");
      return false;
    }
    if (
      bannedWords.some((word) =>
        name.toLowerCase().includes(word.toLowerCase())
      )
    ) {
      toast.error("Name contains inappropriate words");
      return false;
    }
    return true;
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    let name = e.target.name.value;
    let lastname = e.target.lastname.value;
    let email = e.target.email.value;

    if (!validateName(name) || !validateName(lastname)) {
      return;
    }

    if (
      name.length > 0 &&
      lastname.length > 0 &&
      email.length > 0 &&
      password.length > 0 &&
      confirmPassword.length > 0
    ) {
      if (password === confirmPassword) {
        if (passwordScore < 3) {
          toast.error(
            "Password is too weak. Please choose a stronger password."
          );
          return;
        }
        const formData = {
          username: name + " " + lastname,
          email,
          password,
        };
        try {
          const response = await axios.post(
            "http://localhost:3000/api/v1/register",
            formData
          );
          toast.success("Registration successful");
          toast.success("Please check your email to verify your account");
        } catch (err) {
          if (err.response && err.response.data) {
            const errorMessage = err.response.data.msg;
            if (errorMessage === "Email already in use") {
              toast.error("Email already in use");
            } else {
              toast.error(errorMessage);
            }
          } else {
            toast.error("An error occurred. Please try again.");
          }
        }
      } else {
        toast.error("Passwords don't match");
      }
    } else {
      toast.error("Please fill all inputs");
    }
  };

  useEffect(() => {
    if (token !== "") {
      toast.success("You are already logged in");
      navigate("/dashboard");
    }
  }, [token, navigate]);

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    const result = zxcvbn(newPassword);
    setPasswordScore(result.score);
  };

  return (
    <div className="register-main">
      <div className="register-left">
        <img src={Image} alt="" />
      </div>
      <div className="register-right">
        <div className="register-right-container">
          <div className="register-logo">
            <img src="/logo.svg" alt="" />
          </div>
          <div className="register-center">
            <h2>Welcome to Ridez!</h2>
            <p>Please enter your details</p>
            <form onSubmit={handleRegisterSubmit}>
              <input
                type="text"
                placeholder="First Name"
                name="name"
                required={true}
              />
              <input
                type="text"
                placeholder="Last Name"
                name="lastname"
                required={true}
              />
              <input
                type="email"
                placeholder="Email"
                name="email"
                required={true}
              />
              <div className="pass-input-div">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={handlePasswordChange}
                  required={true}
                />
                {showPassword ? (
                  <FaEyeSlash
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                  />
                ) : (
                  <FaEye
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                  />
                )}
              </div>
              <PasswordStrengthBar password={password} />
              <div className="pass-input-div">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required={true}
                />
                {showPassword ? (
                  <FaEyeSlash
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                  />
                ) : (
                  <FaEye
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                  />
                )}
              </div>
              <div className="register-center-buttons">
                <button type="submit">Sign Up</button>
              </div>
            </form>
          </div>

          <p className="login-bottom-p">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
