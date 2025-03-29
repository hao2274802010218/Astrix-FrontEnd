import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()}/${
    currentDate.getMonth() + 1
  }/${currentDate.getFullYear()}`;

  return (
    <footer className="bg-dark text-white pt-4 pb-2">
      <div className="container">
        <div className="row">
          {/* About Us */}
          <div className="col-md-4 mb-3">
            <h5>About Us</h5>
            <ul className="list-unstyled">
              <li>
                <a
                  href="https://www.facebook.com/YoungboiCamau33"
                  className="text-white text-decoration-none"
                >
                  &#8209; Nguyễn Nhật Hào / 2274802010218
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/lehai.352892"
                  className="text-white text-decoration-none"
                >
                  &#8209; Phan Lê Minh Hải / 2274802010218
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="col-md-4 mb-3">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/home" className="text-white text-decoration-none">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="text-white text-decoration-none"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-white text-decoration-none">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white text-decoration-none">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div className="col-md-4 mb-3">
            <h5>Contact Us</h5>
            <p>
              <i className="fas fa-envelope me-2"></i>{" "}
              hao.2274802010218@vanlanguni.vn
            </p>
            <p>
              <i className="fas fa-phone me-2"></i> +84 234 567 890
            </p>
            <div>
              <a href="https://facebook.com" className="text-white me-3">
                <i className="fab fa-facebook fa-lg"></i>
              </a>
              <a href="https://twitter.com" className="text-white me-3">
                <i className="fab fa-twitter fa-lg"></i>
              </a>
              <a href="https://instagram.com" className="text-white">
                <i className="fab fa-instagram fa-lg"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="text-center mt-3">
          <p className="mb-0">&copy; {formattedDate} Lập Trình Web Nâng Cao</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
