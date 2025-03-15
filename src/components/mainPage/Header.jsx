import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/Logo.png";

const Header = () => {
  const [login, setLogin] = useState(false);
  return (
    <div>
      <header className="bg-light shadow-sm">
        <div className="container d-flex justify-content-between align-items-center py-2">
          {/* Logo */}
          <div className="logo">
            <Link to="/home">
              <img
                src={Logo}
                alt="Logo"
                className="img-fluid"
                style={{ height: "40px" }}
              />
            </Link>
          </div>

          {/* Navigation */}
          <nav>
            <ul className="nav ">
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
          </nav>
          <div className="d-flex align-items-center">
            {/* Icon */}
            <Link to={"/card"}>
              <i
                className="bi bi-cart3"
                style={{
                  fontSize: "24px",
                  marginRight: "30px",
                  textDecoration: "none",
                  color: "black",
                }}
              ></i>
            </Link>

            {/* Login Button */}
            <button
              className="btn btn-primary"
              onClick={() => setLogin(!login)}
            >
              {login ? "Xin Chào Nhật Hào" : "Đăng nhập"}
            </button>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
