import React, { useState, useEffect } from "react";
import { useId } from "../../context/RoleContext";
import { Link } from "react-router-dom";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { whatYouId } = useId();

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

  useEffect(() => {
    const fetchOrdersData = async () => {
      setIsLoading(true);
      try {
        if (!whatYouId) {
          setError("Vui lòng đăng nhập để xem đơn hàng");
          return;
        }

        const response = await fetch(
          `http://localhost:5000/api/checkout/order/user/${whatYouId}` // Đúng route
        );

        if (!response.ok) {
          throw new Error("Không thể tải danh sách đơn hàng");
        }

        const data = await response.json();
        setOrders(Array.isArray(data.orders) ? data.orders : []);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrdersData();
  }, [whatYouId]);

  if (isLoading) return <p>Đang tải dữ liệu...</p>;
  if (error) return <p className="text-danger">{error}</p>;
  if (!Array.isArray(orders) || orders.length === 0)
    return <div className="alert alert-info mt-3">Không có đơn hàng nào!</div>;

  return (
    <div>
      <table className="table table-bordered mt-3 text-center align-middle">
        <thead>
          <tr className="text-center">
            <th>#</th>
            <th>Tên sản phẩm</th>
            <th>Tổng tiền</th>
            <th>Trạng thái</th>
            <th>Chi tiết</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={order._id}>
              <td>{index + 1}</td>
              <td>
                <table className="table table-bordered text-start align-middle">
                  <thead>
                    <tr>
                      <th style={{ width: "70%" }}>Product Name</th>
                      <th style={{ width: "30%" }}>Size</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.cart.map((item, idx) => (
                      <tr key={idx}>
                        <td>{item.name}</td>
                        <td>{item.size || "N/A"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </td>
              <td>{order.total?.toLocaleString()} VND</td>
              <td>
                <span
                  className={`btn btn-${getStatusBadgeColor(
                    order.status
                  )} btn-sm`}
                  style={{ pointerEvents: "none" }}
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
