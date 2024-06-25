// client/src/pages/EmailVerification.jsx
import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const EmailVerification = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/verify-email/${token}`
        );
        toast.success(response.data.msg);
        navigate("/login");
      } catch (error) {
        console.error(error);
        toast.error("Email verification failed. Please try again.");
      }
    };

    verifyEmail();
  }, [token, navigate]);

  return (
    <div>
      <h1>Verifying your email...</h1>
    </div>
  );
};

export default EmailVerification;
