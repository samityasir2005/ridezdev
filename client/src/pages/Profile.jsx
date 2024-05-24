import React, { useContext, useEffect } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import Login from "../pages/Login";

export default function Profiles() {
  const { user, logout, isLoggedIn, setIsLoggedIn } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn || !user) {
      setIsLoggedIn(false);
      navigate("/login");
    }
  }, [isLoggedIn, navigate, user]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div>
      <h1>User Profile</h1>
      <p>Hi {user.name}</p>
      {isLoggedIn ? (
        <div>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <Login setIsLoggedIn={setIsLoggedIn} />
      )}
    </div>
  );
}
