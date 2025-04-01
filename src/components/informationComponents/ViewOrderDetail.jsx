import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ViewOrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    const fetchOrderDetail = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/checkout/order/${id}`
        );
        if (!response.ok) {
          throw new Error(
            "Không thể lấy chi tiết đơn hàng. Vui lòng thử lại sau."
          );
        }
        const data = await response.json();
        setOrder(data.order);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-5 text-danger">
        <strong>Lỗi:</strong> {error}
      </div>
    );
  }

  if (!order) {
    return <div className="text-center mt-5">Không tìm thấy đơn hàng nào.</div>;
  }

  return (
    <div className="container mt-3 mb-5">
      <h1 className="text-center">Chi Tiết Đơn Hàng</h1>
      <div className="card p-4 mt-3 shadow-sm">
        <p>
          <strong>Khách hàng:</strong> {order.username || "N/A"}
        </p>
        <p>
          <strong>Số điện thoại:</strong> {order.phone || "N/A"}
        </p>
        <p>
          <strong>Email:</strong> {order.email || "N/A"}
        </p>
        <p>
          <strong>Địa chỉ:</strong> {order.address || "N/A"}
        </p>
        <p>
          <strong>Ghi chú:</strong> {order.note || "Không có ghi chú"}
        </p>
        <p>
          <strong>Phương thức thanh toán:</strong>{" "}
          {order.paymentMethod || "Không xác định"}
        </p>
        <p>
          <strong>Trạng thái:</strong>{" "}
          <span className={`badge bg-${getStatusBadgeColor(order.status)}`}>
            {order.status || "Chưa cập nhật"}
          </span>
        </p>
        <p>
          <strong>Ngày tạo:</strong>{" "}
          {order.createdAt
            ? new Date(order.createdAt).toLocaleString()
            : "Không xác định"}
        </p>
      </div>
      <div className="card mt-4 p-4 shadow-sm">
        <h4 className="fw-bold">Sản phẩm trong đơn hàng</h4>
        <table className="table  mt-3">
          <thead>
            <tr>
              <th className="text-center">Hình ảnh</th>
              <th>Tên sản phẩm</th>
              <th>Kích cỡ</th>
              <th>Giá</th>
              <th>Số lượng</th>
              <th>Tổng</th>
            </tr>
          </thead>
          <tbody>
            {order.cart && order.cart.length > 0 ? (
              order.cart.map((item) => (
                <tr key={item._id}>
                  <td className="text-center">
                    <img
                      src={`http://localhost:5000${item.pic}`}
                      alt={item.name}
                      className="img-thumbnail"
                      style={{ width: "100px", height: "100px" }}
                    />
                  </td>
                  <td>{item.name}</td>
                  <td>{item.size || "Không có"}</td>
                  <td>{item.price.toLocaleString()} VND</td>
                  <td>{item.quantity}</td>
                  <td className="text-danger fw-bold">
                    {(item.price * item.quantity).toLocaleString()} VND
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  Không có sản phẩm trong đơn hàng.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="d-flex justify-content-between align-items-center">
          <h4 className="fw-bold text-danger ms-auto">
            Tổng: {order.total.toLocaleString()} VND
          </h4>
        </div>
      </div>
      <div className="d-flex justify-content-between align-items-center">
        <button
          className="btn btn-secondary mt-4 ms-auto"
          onClick={() => navigate(-1)}
        >
          Quay lại danh sách đơn hàng
        </button>
      </div>
    </div>
  );
};

export default ViewOrderDetail;
