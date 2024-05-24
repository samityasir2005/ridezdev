import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/register", { name, email, password })
      .then((res) => {
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage("An error occurred while registering."); // Set a generic error message
      });
  };

  return (
    <div style={styles.container}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <label>Name:</label>
          <input
            type="text"
            placeholder="Enter Name"
            autoComplete="off"
            className="form-control"
            onChange={(e) => setName(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label>Email:</label>
          <input
            type="email"
            placeholder="Enter Email"
            autoComplete="off"
            className="form-control"
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label>Password:</label>
          <input
            type="password"
            placeholder="Enter Password"
            className="form-control"
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.button}>
          Register
        </button>
        {errorMessage && <p style={styles.error}>{errorMessage}</p>}
        <p>Already Have an Account?</p>
        <Link
          to="/login"
          style={styles.linkButton}
          className="text-decoration-none"
        >
          Login
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

export default Register;
