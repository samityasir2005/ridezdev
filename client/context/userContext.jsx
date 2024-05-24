import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3001/getUser", { withCredentials: true })
      .then((response) => {
        if (response.data) {
          setUser(response.data);
          setIsLoggedIn(true);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const logout = () => {
    axios
      .get("http://localhost:3001/logout", { withCredentials: true })
      .then(() => {
        setUser(null);
        setIsLoggedIn(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <UserContext.Provider
      value={{ user, setUser, isLoggedIn, setIsLoggedIn, logout }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
