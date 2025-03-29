import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../../assets/images/Logo.png";
import { useRole, useName, useId } from "../../../context/RoleContext";

const SideNav = () => {
  const [ActiveIndex, setActiveIndex] = useState(1);
  const { whatYouName, setName } = useName();
  const { whoAreYou, setRole } = useRole();
  const { setId } = useId();
  const navigate = useNavigate();

  useEffect(() => {
    if (!whoAreYou || whoAreYou !== "admin") {
      navigate("/");
    }
  }, [whoAreYou, navigate]);

  const handleAction = (index) => {
    setActiveIndex(index);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    localStorage.removeItem("id");
    setName("");
    setRole("");
    setId("");
    alert("Bạn đã đăng xuất thành công!");
    navigate("/login");
  };

  if (!whoAreYou || whoAreYou !== "admin") {
    return null;
  }

  return (
    <div
      className="bg-light border-end d-flex flex-column"
      style={{ width: "20%", padding: "20px", height: "100vh" }}
    >
      <img
        style={{ width: "100px", display: "block", margin: "0 auto" }}
        src={Logo}
        alt="Astrix"
      />

      <h4 className="text-center mb-3">Astrix Panel</h4>

      <span className="d-flex align-items-center">
        <i
          className="bi bi-person-fill fs-2"
          style={{ marginRight: "10px" }}
        ></i>
        <p className="mb-0 fs-4">{whatYouName}</p>
      </span>
      <hr
        style={{
          maxWidth: "100%",
          display: "block",
          margin: "0px 0px 13px 0px",
        }}
      />
      <ul className="nav flex-column nav-pills flex-grow-1">
        <li>
          <Link
            to={"/admin/product-management"}
            style={{ textDecoration: "none" }}
          >
            <div
              className={`nav-link ${ActiveIndex === 1 ? "active" : ""} mb-1`}
              onClick={() => handleAction(1)}
              style={{ cursor: "pointer", textDecoration: "none" }}
            >
              Quản lý Sản phẩm
            </div>
          </Link>
        </li>

        <li>
          <Link
            to={"/admin/order-management"}
            style={{ textDecoration: "none" }}
          >
            <div
              className={`nav-link ${ActiveIndex === 2 ? "active" : ""} mb-1`}
              onClick={() => handleAction(2)}
              style={{ cursor: "pointer" }}
            >
              Quản lý Đơn hàng
            </div>
          </Link>
        </li>

        <li>
          <Link
            to={"/admin/category-management"}
            style={{ textDecoration: "none" }}
          >
            <div
              className={`nav-link ${ActiveIndex === 3 ? "active" : ""} mb-1`}
              onClick={() => handleAction(3)}
              style={{ cursor: "pointer" }}
            >
              Quản lý Danh mục
            </div>
          </Link>
        </li>

        <li>
          <Link
            to={"/admin/contact-management"}
            style={{ textDecoration: "none" }}
          >
            <div
              className={`nav-link ${ActiveIndex === 4 ? "active" : ""} mb-1`}
              onClick={() => handleAction(4)}
              style={{ cursor: "pointer" }}
            >
              Quản lý Liên hệ
            </div>
          </Link>
        </li>

        <li>
          <Link
            to={"/admin/role-management"}
            style={{ textDecoration: "none" }}
          >
            <div
              className={`nav-link ${ActiveIndex === 5 ? "active" : ""} mb-1`}
              onClick={() => handleAction(5)}
              style={{ cursor: "pointer" }}
            >
              Quản lý Phân quyền
            </div>
          </Link>
        </li>
      </ul>

      <div className="mt-auto">
        <button
          className="btn btn-danger text-center w-100"
          onClick={handleLogout}
          style={{ cursor: "pointer" }}
        >
          Đăng xuất
        </button>
      </div>
    </div>
  );
};

export default SideNav;
