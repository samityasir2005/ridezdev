import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "../styles/forgotpassword.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://ridez-backend.onrender.com/api/v1/forgot-password",
        {
          email,
        }
      );
      toast.success("Reset password email sent");
      setSubmitted(true);
    } catch (error) {
      toast.error("Error sending reset password email");
    }
  };

  return (
    <div className="forgot-password__body">
      <div
        className="forgot-password__container"
        id="forgot-password-container"
      >
        {submitted ? (
          <div
            className="forgot-password__message-container"
            id="forgot-password-message-container"
          >
            <FontAwesomeIcon
              icon={faEnvelope}
              className="forgot-password__icon"
            />
            <h1
              className="forgot-password__message"
              id="forgot-password-message"
            >
              We have sent a password reset link, Please check your inbox
            </h1>
          </div>
        ) : (
          <>
            <h1 className="forgot-password__title" id="forgot-password-title">
              Forgot Password
            </h1>
            <form
              className="forgot-password__form"
              id="forgot-password-form"
              onSubmit={handleSubmit}
            >
              <label
                className="forgot-password__label"
                id="forgot-password-label"
                htmlFor="forgot-password-email"
              >
                Email Address
              </label>
              <input
                type="email"
                id="forgot-password-email"
                className="forgot-password__input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {error && (
                <p
                  className="forgot-password__error"
                  id="forgot-password-error"
                >
                  {error}
                </p>
              )}
              <button
                type="submit"
                className="forgot-password__submit-btn"
                id="forgot-password-submit-btn"
              >
                Submit
              </button>
            </form>
            <div
              className="forgot-password__back-link"
              id="forgot-password-back-link"
            >
              <a href="/login">Back to Login</a>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
