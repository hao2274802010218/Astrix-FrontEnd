import React, { useState, useEffect } from "react";
import { useId } from "../../context/RoleContext";
import { useNavigate } from "react-router-dom";

const UserInfo = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    address: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const { whatYouId } = useId();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      try {
        if (!whatYouId) {
          throw new Error(
            "Bạn chưa đăng nhập hoặc ID người dùng không hợp lệ!"
          );
        }

        const response = await fetch(
          `http://localhost:5000/api/auth/${whatYouId}`
        );
        if (!response.ok) {
          throw new Error("Không thể lấy thông tin người dùng!");
        }

        const userData = await response.json();
        setUser(userData);
        setFormData({
          username: userData.username || "",
          email: userData.email || "",
          phone: userData.phone || "",
          address: userData.address || "",
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [whatYouId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setError("Bạn chưa đăng nhập! Vui lòng đăng nhập lại.");
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/auth/update/${user._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Lỗi cập nhật!");

      alert("Cập nhật thành công!");
      setUser(data.user);
      setIsEditing(false);
    } catch (error) {
      console.error("Lỗi cập nhật:", error.message);
      alert("Lỗi cập nhật: " + error.message);
    }
  };

  if (isLoading) return <div className="alert alert-info">Đang tải...</div>;
  if (error) {
    return (
      <div className="container py-5 text-center">
        <div className="alert alert-danger">Lỗi: {error}</div>
        <button
          className="btn btn-secondary"
          onClick={() => navigate("/login")}
        >
          Quay lại đăng nhập
        </button>
      </div>
    );
  }

  return (
    <div className="container py-3">
      {user && user.username ? (
        !isEditing ? (
          <>
            <ul className="list-group">
              <li className="list-group-item">
                <strong>Tên:</strong> {user.username}
              </li>
              <li className="list-group-item">
                <strong>Email:</strong> {user.email}
              </li>
              <li className="list-group-item">
                <strong>Điện thoại:</strong> {user.phone || "Chưa cập nhật"}
              </li>
              <li className="list-group-item">
                <strong>Địa chỉ:</strong> {user.address || "Chưa cập nhật"}
              </li>
            </ul>
            <button
              onClick={() => setIsEditing(true)}
              className="btn btn-primary mt-3"
            >
              Cập nhật thông tin
            </button>
          </>
        ) : (
          <form>
            <div className="mb-3">
              <label className="form-label">Tên người dùng</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="form-control"
                placeholder="Tên người dùng"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="form-control"
                placeholder="Email"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Số điện thoại</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="form-control"
                placeholder="Số điện thoại"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Địa chỉ</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="form-control"
                placeholder="Địa chỉ"
              />
            </div>
            <button
              type="button"
              onClick={handleUpdate}
              className="btn btn-success"
            >
              Lưu
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="btn btn-secondary ms-2"
            >
              Hủy
            </button>
          </form>
        )
      ) : (
        <div className="alert alert-warning mt-3">
          Không tìm thấy thông tin người dùng!
        </div>
      )}
    </div>
  );
};

export default UserInfo;
