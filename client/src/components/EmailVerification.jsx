import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const EmailVerification = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [verificationStatus, setVerificationStatus] = useState("Verifying...");

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/verify-email/${token}`
        );
        setVerificationStatus(response.data.msg);
        toast.success(response.data.msg);
        setTimeout(() => navigate("/login"), 3000);
      } catch (error) {
        console.error(error);
        setVerificationStatus("Email verification failed. Please try again.");
        toast.error("Email verification failed. Please try again.");
      }
    };

    verifyEmail();
  }, [token, navigate]);

  return (
    <div>
      <h1>{verificationStatus}</h1>
    </div>
  );
};

export default EmailVerification;
