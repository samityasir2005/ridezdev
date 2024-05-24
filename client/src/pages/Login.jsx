import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
function Login({ setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/login", { email, password })
      .then((res) => {
        console.log("Response from backend:", res.data);
        if (res.data.Status === "Success") {
          setIsLoggedIn(true); // Update isLoggedIn state to true
          localStorage.setItem("role", res.data.role); // Set the user's role in local storage
          if (res.data.role === "admin") {
            navigate("/home");
          } else {
            navigate("/profile");
          }
        } else {
          setErrorMessage(res.data); // Set the error message from the response
          setIsLoggedIn(false); // Update isLoggedIn state to false
        }
      })
      .catch((err) => {
        console.log("Error during login:", err);
        setErrorMessage("An error occurred while logging in."); // Set a generic error message
        setIsLoggedIn(false); // Update isLoggedIn state to false
      });
  };

  return (
    <div style={styles.container}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.button}>
          Login
        </button>
        {errorMessage && <p style={styles.error}>{errorMessage}</p>}
        <p>Don't Have an Account?</p>
        <Link
          to="/register"
          style={styles.linkButton}
          className="text-decoration-none"
        >
          Register
        </Link>
      </form>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "60vh",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    backgroundColor: "#fff",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    borderRadius: "8px",
    width: "300px",
  },
  inputGroup: {
    marginBottom: "15px",
    width: "100%",
  },
  input: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    boxSizing: "border-box",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    color: "#fff",
    backgroundColor: "#007bff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    width: "100%",
  },
  linkButton: {
    display: "block",
    padding: "10px 20px",
    fontSize: "16px",
    color: "#007bff",
    backgroundColor: "#f8f9fa",
    border: "1px solid #ced4da",
    borderRadius: "4px",
    textAlign: "center",
    marginTop: "10px",
  },
  error: {
    color: "red",
    marginTop: "10px",
  },
};

export default Login;
