import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";

function Home() {
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

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
    </div>
  );
}

export default Home;
