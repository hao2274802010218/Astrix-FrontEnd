import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserInfo from "./UserInfo";
import OrderList from "./OrderList";
import { useRole, useName, useId } from "../../context/RoleContext";

const Information = () => {
  const navigate = useNavigate();
  const { setRole } = useRole();
  const { whatYouName, setName } = useName();
  const { setId } = useId();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token || !whatYouName) {
      navigate("/login");
    }
  }, [navigate, whatYouName]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    localStorage.removeItem("id");
    setRole("");
    setName("");
    setId("");
    alert("Bạn đã đăng xuất thành công!");
    navigate("/login");
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="card shadow-sm">
        <div className="card-body">
          <h3 className="card-title text-center">Thông tin của bạn</h3>
          <UserInfo />
          <div className="d-flex align-items-center mt-2 mb-2">
            <hr className="flex-grow-1" />
          </div>
          <div>
            <h3 className="card-title text-center">
              Danh sách đơn hàng của bạn
            </h3>
            <OrderList />
          </div>
          <div className="d-flex justify-content-end">
            <button
              className="btn btn-danger shadow px-4 py-2"
              onClick={handleLogout}
            >
              Đăng xuất
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Information;
