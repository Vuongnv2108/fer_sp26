import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import { Link, useNavigate } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { FaUser, FaShoppingCart } from "react-icons/fa"; // Import icon giỏ hàng

function Headers() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container fluid>
        {/* Logo và tiêu đề */}
        <div className="flex-grow-1 d-flex justify-content-center align-items-center">
          <FaShoppingCart size={30} className="me-2 text-primary" />
          <h1 className="text-center m-0">Hoà Lạc Phone</h1>
        </div>

        {/* Phần tài khoản bên phải */}
        <Nav className="ms-auto">
          {isLoggedIn ? (
            <>
              <Link to="/profile" className="nav-link">
                <FaUser style={{ marginRight: "8px" }} /> Profile
              </Link>
              <Link to="/" onClick={handleSignOut} className="nav-link">
                Sign Out
              </Link>
            </>
          ) : (
            <>
              <Link to="/auth/Sign-up" className="nav-link">Sign Up</Link>
              <Link to="/auth/Sign-in" className="nav-link">Sign In</Link>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Headers;
