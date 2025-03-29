import React, { useState, useEffect } from "react";
import Logo from "../../assets/images/Logo.png";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useRole, useName, useId } from "../../context/RoleContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingToken, setIsCheckingToken] = useState(true);
  const navigate = useNavigate();
  const { setRole } = useRole();
  const { setName } = useName();
  const { setId } = useId();

  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = localStorage.getItem("authToken");
      if (token) {
        try {
          const response = await axios.get(
            "http://localhost:5000/api/auth/check-auth",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          const { user } = response.data;
          setRole(user.role);
          setName(user.username);
          setId(user.id);
          localStorage.setItem("role", user.role);
          localStorage.setItem("username", user.username);
          localStorage.setItem("id", user.id);
          if (user.role === "admin") {
            navigate("/admin/product-management");
          } else if (user.role === "user") {
            navigate("/products");
          }
        } catch (error) {
          console.error("Token không hợp lệ:", error);
          localStorage.removeItem("authToken");
          localStorage.removeItem("role");
          localStorage.removeItem("username");
          localStorage.removeItem("id");
        }
      }
      setIsCheckingToken(false);
    };
    checkAuthStatus();
  }, [navigate, setRole, setName, setId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );

      const { token, role, username, id, message } = response.data;

      localStorage.setItem("authToken", token);
      localStorage.setItem("role", role);
      localStorage.setItem("username", username);
      localStorage.setItem("id", id);
      setRole(role);
      setName(username);
      setId(id);

      if (role === "admin") {
        navigate("/admin/product-management");
      } else if (role === "user") {
        setSuccessMessage(message);
        setTimeout(() => navigate("/products"), 2000);
      } else {
        setErrorMessage("Tài khoản của bạn không có quyền truy cập.");
      }
    } catch (error) {
      console.error("Lỗi đăng nhập chi tiết:", {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
      setErrorMessage(
        error.response?.data?.message || "Đã xảy ra lỗi. Vui lòng thử lại."
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (isCheckingToken) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Đang kiểm tra...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <div
        className="card shadow p-4"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <div className="text-center mb-4">
          <img
            src={Logo}
            alt="Logo"
            className="img-fluid"
            style={{ maxWidth: "100px" }}
          />
        </div>
        <h2 className="text-center mb-4">Đăng Nhập</h2>
        {errorMessage && (
          <div className="alert alert-danger text-center">{errorMessage}</div>
        )}
        {successMessage && (
          <div className="alert alert-success text-center">
            {successMessage}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Nhập email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Mật khẩu</label>
            <input
              type="password"
              className="form-control"
              placeholder="Nhập mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={isLoading}
          >
            {isLoading ? "Đang xử lý..." : "Đăng Nhập"}
          </button>
          <div className="d-flex align-items-center mt-2 mb-2">
            <hr className="flex-grow-1" />
            <span className="mx-3 text-muted">hoặc</span>
            <hr className="flex-grow-1" />
          </div>
          <Link to={"/register"}>
            <button className="btn btn-success w-100 mb-2" disabled={isLoading}>
              Đăng ký
            </button>
          </Link>
          <button
            className="btn btn-outline-secondary w-100"
            onClick={() => navigate(-1)}
            disabled={isLoading}
          >
            Quay lại
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
