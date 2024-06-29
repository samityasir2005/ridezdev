import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/resetpassword.css";
const ResetPassword = () => {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== password) {
      setError("Passwords do not match");
      return;
    }
    try {
      const response = await axios.post(
        `https://ridez-backend.onrender.com/api/v1/reset-password/${token}`,
        { newPassword }
      );
      setMessage(response.data.msg);
      setSuccess(true);
    } catch (error) {
      setMessage(error.response?.data?.msg || "An error occurred");
    }
  };

  if (success) {
    return (
      <div className="reset-password__body">
        <div className="reset-password__container">
          <h1 className="reset-password__success">
            Password reset successful!
          </h1>
          <div className="reset-password__back-link">
            <a href="/login">Back to Login</a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="reset-password__body">
      <div className="reset-password__container">
        <h1 className="reset-password__title">Reset Password</h1>
        <form className="reset-password__form" onSubmit={handleSubmit}>
          <label className="reset-password__label" htmlFor="password">
            New Password
          </label>
          <input
            type="password"
            id="password"
            className="reset-password__input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label className="reset-password__label" htmlFor="confirm-password">
            Confirm New Password
          </label>
          <input
            type="password"
            id="confirm-password"
            className="reset-password__input"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          {error && <p className="reset-password__error">{error}</p>}
          <button type="submit" className="reset-password__submit-btn">
            Reset Password
          </button>
        </form>
        <div className="reset-password__back-link">
          <a href="/login">Back to Login</a>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
