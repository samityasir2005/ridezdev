import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

export default function Header() {
  const [token, setToken] = useState(
    JSON.parse(localStorage.getItem("auth")) || ""
  );

  const updateToken = () => {
    setToken(JSON.parse(localStorage.getItem("auth")) || "");
  };

  useEffect(() => {
    window.addEventListener("storage", updateToken);
    return () => {
      window.removeEventListener("storage", updateToken);
    };
  }, []);

  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary" fixed="top">
        <Container>
          <Navbar.Brand href="/">
            <img
              src="/logo.svg"
              width="40"
              height="40"
              className="d-inline-block align-top"
            />{" "}
            Urid
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/faq">FAQ</Nav.Link>
              <NavDropdown title="Rides" id="basic-nav-dropdown">
                <NavDropdown.Item href="/createpost">
                  Post Rides
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/rideposts">
                  Find Rides
                </NavDropdown.Item>
              </NavDropdown>
              {token ? (
                <Nav.Link href="/dashboard">Dashboard</Nav.Link>
              ) : (
                <Nav.Link href="/register">Register/Login</Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
