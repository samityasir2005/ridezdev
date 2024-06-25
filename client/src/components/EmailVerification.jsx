import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const EmailVerification = () => {
  const { token } = useParams();
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.get(`/api/verify-email/${token}`);
        const { msg } = response.data;
        setMessage(msg);
      } catch (error) {
        console.error("Email verification failed:", error);
        setMessage("Email verification failed. Please try again.");
      }
    };

    verifyEmail();
  }, [token]);

  return (
    <div>
      <h2>Email Verification</h2>
      {message ? <p>{message}</p> : <p>Verifying your email...</p>}
    </div>
  );
};

export default EmailVerification;
