import React, { useContext, useEffect } from "react";
import "../styles/Dashboard.css";
import { UserContext } from "../usercontext/UserContext";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function CreatePost() {
  const { user, token } = useContext(UserContext);
  const navigate = useNavigate();
  const toastId = React.useRef(null);

  useEffect(() => {
    if (!token) {
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.warn("Please login first to create posts");
      }
      navigate("/login");
    }
  }, [token, navigate]);

  return (
    <div>
      {user ? (
        <div>
          <br />
          <p>Logged in as, {user.name}</p>
        </div>
      ) : (
        <p>No user data available</p>
      )}
    </div>
  );
}

export default CreatePost;
