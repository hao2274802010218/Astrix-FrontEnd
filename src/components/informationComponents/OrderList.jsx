import React, { useState, useEffect } from "react";
import { useId } from "../../context/RoleContext";
import { Link } from "react-router-dom";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { whatYouId } = useId();

  const getStatusBadgeColor = (status) => {
    const statusColors = {
      "Đang xử lý": "warning",
      "Đã xác nhận": "info",
      "Đang chuẩn bị hàng": "primary",
      "Đang giao": "secondary",
      "Đã giao": "success",
      "Đã hủy": "danger",
    };
    return statusColors[status] || "light";
  };

  useEffect(() => {
    const fetchOrdersData = async () => {
      try {
        if (!whatYouId) {
          throw new Error("Vui lòng đăng nhập để xem đơn hàng");
        }

        setIsLoading(true);
        const response = await fetch(
          `http://localhost:5000/api/checkout/order/user/${whatYouId}`
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Lỗi không xác định từ server");
        }

        const data = await response.json();
        if (!data.success) {
          throw new Error(data.message || "Không thể tải danh sách đơn hàng");
        }
        setOrders(Array.isArray(data.data?.orders) ? data.data.orders : []);
      } catch (err) {
        setError(err.message);
        setOrders([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrdersData();
  }, [whatYouId]);

  if (isLoading) {
    return <div className="text-center mt-3">Đang tải dữ liệu...</div>;
  }

  if (error) {
    return <div className="alert alert-danger mt-3">{error}</div>;
  }

  if (orders.length === 0) {
    return (
      <div className="alert alert-warning mt-3">Không có đơn hàng nào!</div>
    );
  }

  return (
    <div className="container mt-3">
      <table className="table table-bordered text-center align-middle">
        <thead className="table-light">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Tên sản phẩm</th>
            <th scope="col">Tổng tiền</th>
            <th scope="col">Trạng thái</th>
            <th scope="col">Chi tiết</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={order._id || index}>
              <td>{index + 1}</td>
              <td>
                <table className="table table-bordered mb-0">
                  <thead>
                    <tr>
                      <th style={{ width: "70%" }}>Tên sản phẩm</th>
                      <th style={{ width: "30%" }}>Kích thước</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(order.cart) && order.cart.length > 0 ? (
                      order.cart.map((item, idx) => (
                        <tr key={`${order._id}-${idx}`}>
                          <td>{item.name || "Không xác định"}</td>
                          <td>{item.size || "N/A"}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="2">Không có sản phẩm</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </td>
              <td>
                {order.total
                  ? `${order.total.toLocaleString()} VND`
                  : "Chưa cập nhật"}
              </td>
              <td>
                <span
                  className={`badge bg-${getStatusBadgeColor(order.status)}`}
                >
                  {order.status || "Chưa cập nhật"}
                </span>
              </td>
              <td>
                <Link to={`/view-order-detail/${order._id}`}>
                  <button className="btn btn-primary btn-sm">
                    Xem chi tiết
                  </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderList;
