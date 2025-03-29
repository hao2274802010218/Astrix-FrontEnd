import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/images/Logo.png";
import { useName } from "../../context/RoleContext";
import axios from "axios";

const Header = () => {
  const { whatYouName, setName } = useName();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("authToken");
      if (token && !whatYouName) {
        try {
          const response = await axios.get(
            "http://localhost:5000/api/auth/check-auth",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          const { user } = response.data;
          setName(user.username);
          localStorage.setItem("username", user.username);
          localStorage.setItem("role", user.role);
          localStorage.setItem("id", user.id);
        } catch (error) {
          console.error("Token không hợp lệ:", error);
          localStorage.removeItem("authToken");
          localStorage.removeItem("username");
          localStorage.removeItem("role");
          localStorage.removeItem("id");
          navigate("/login");
        }
      }
    };
    checkAuth();
  }, [setName, navigate, whatYouName]);

  return (
    <header className="bg-light shadow-sm">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link to="/home" className="navbar-brand">
            <img
              src={Logo}
              alt="Logo"
              className="img-fluid"
              style={{ height: "50px" }}
            />
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mx-auto gap-5">
              <li className="nav-item">
                <Link className="nav-link text-black" to="/home">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-black" to="/products">
                  Products
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-black" to="/about">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-black" to="/contact">
                  Contact
                </Link>
              </li>
            </ul>

            <ul className="navbar-nav ms-auto align-items-center gap-3">
              <li className="nav-item">
                <Link to="/cart" className="nav-link p-0">
                  <button className="btn btn-outline-secondary d-flex align-items-center">
                    <i className="bi bi-cart3"></i>
                    <span className="ms-2">Giỏ hàng</span>
                  </button>
                </Link>
              </li>

              <li className="nav-item">
                {whatYouName ? (
                  <div className="d-flex gap-2">
                    <Link to="/information">
                      <button className="btn btn-secondary">
                        Xin Chào {whatYouName}
                      </button>
                    </Link>
                  </div>
                ) : (
                  <Link to="/login">
                    <button className="btn btn-primary">Đăng nhập</button>
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
