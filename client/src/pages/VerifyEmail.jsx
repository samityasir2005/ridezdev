import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "../styles/VerifyEmail.css";
const VerifyEmail = () => {
  const [verificationStatus, setVerificationStatus] = useState("Verifying...");
  const { token } = useParams();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/verify-email/${token}`
        );
        setVerificationStatus("Email verified successfully");
        toast.success("Email verified successfully");
      } catch (error) {}
    };

    verifyEmail();
  }, [token]);

  return (
    <div className="verify-email-container">
      <h2>{verificationStatus}</h2>
      {verificationStatus === "Email verified successfully" && (
        <p>
          Your email has been verified successfully. You may now{" "}
          <Link to="/login">login</Link> to your account.
        </p>
      )}
      {verificationStatus === "Email verification failed" && (
        <p>
          The verification link may have expired or is invalid. Please try to{" "}
          <Link to="/register">register</Link> again.
        </p>
      )}
    </div>
  );
};

export default VerifyEmail;
