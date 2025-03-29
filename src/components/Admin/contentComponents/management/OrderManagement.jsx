import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const OrderManagement = () => {
  const [orderData, setOrderData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "Đang xử lý":
        return "warning";
      case "Đã xác nhận":
        return "info";
      case "Đang chuẩn bị hàng":
        return "primary";
      case "Đang giao":
        return "secondary";
      case "Đã giao":
        return "success";
      case "Đã hủy":
        return "danger";
      default:
        return "light";
    }
  };

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:5000/api/checkout/order"
      );
      setOrderData(response.data.checkouts || []);
    } catch (err) {
      alert("Có lỗi xảy ra khi lấy dữ liệu đơn hàng.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const filteredOrder = orderData.filter((order) =>
    order.username?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUpdateStatus = async (id, status) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/checkout/order/${id}/status`,
        { status }
      );
      if (response.data && response.data.order) {
        setOrderData((prevData) =>
          prevData.map((order) =>
            order._id === id
              ? { ...order, status: response.data.order.status }
              : order
          )
        );
        alert("Cập nhật trạng thái thành công!");
      } else {
        throw new Error("Phản hồi API không hợp lệ");
      }
    } catch (error) {
      console.error("Lỗi cập nhật trạng thái:", error);
      alert("Cập nhật trạng thái thất bại.");
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status"></div>
        <p>Đang tải dữ liệu...</p>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h1 className="mb-3">Quản lý đơn hàng</h1>
      <div className="mb-3">
        <input
          type="text"
          className="form-control w-50"
          placeholder="Tìm kiếm khách hàng..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <table className="table table-bordered text-center">
        <thead>
          <tr>
            <th>#</th>
            <th>Khách hàng</th>
            <th>Thanh toán</th>
            <th>Trạng thái</th>
            <th>Tổng tiền</th>
            <th>Chi tiết</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrder.length > 0 ? (
            filteredOrder.map((order, index) => (
              <tr key={order._id}>
                <td>{index + 1}</td>
                <td>{order.username}</td>
                <td>{order.paymentMethod}</td>
                <td>
                  <span
                    className={`btn btn-${getStatusBadgeColor(
                      order.status
                    )} btn-sm`}
                    style={{ pointerEvents: "none" }}
                  >
                    {order.status || "N/A"}
                  </span>
                </td>
                <td>{order.total.toLocaleString()} VND</td>
                <td>
                  <Link to={`/admin/view-order-detail/${order._id}`}>
                    <button className="btn btn-primary btn-sm">Xem</button>
                  </Link>
                </td>
                <td>
                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleUpdateStatus(order._id, e.target.value)
                    }
                    className="form-select form-select-sm"
                  >
                    <option value="Đang xử lý">Đang xử lý</option>
                    <option value="Đã xác nhận">Đã xác nhận</option>
                    <option value="Đang chuẩn bị hàng">
                      Đang chuẩn bị hàng
                    </option>
                    <option value="Đang giao">Đang giao</option>
                    <option value="Đã giao">Đã giao</option>
                    <option value="Đã hủy">Đã hủy</option>
                  </select>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                Bạn chưa có đơn hàng nào.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OrderManagement;
