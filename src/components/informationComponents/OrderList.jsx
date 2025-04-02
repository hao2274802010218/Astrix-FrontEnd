import React, { useState, useEffect } from "react";
import { useId } from "../../context/RoleContext";
import { Link } from "react-router-dom";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cancelLoading, setCancelLoading] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
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

  const handleCancelOrder = async () => {
    try {
      setCancelLoading((prev) => ({ ...prev, [selectedOrderId]: true }));

      const response = await fetch(
        `http://localhost:5000/api/checkout/order/${selectedOrderId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: "Đã hủy" }),
        }
      );

      const result = await response.json();

      if (result.success && result.order) {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === selectedOrderId
              ? { ...order, status: "Đã hủy" }
              : order
          )
        );
        alert("Đơn hàng đã được hủy thành công!");
      } else {
        throw new Error(result.message || "Không thể hủy đơn hàng");
      }
    } catch (error) {
      console.error("Lỗi khi hủy đơn hàng:", error);
      alert(`Hủy đơn hàng thất bại: ${error.message}`);
    } finally {
      setCancelLoading((prev) => ({ ...prev, [selectedOrderId]: false }));
      setShowModal(false);
    }
  };

  const openCancelModal = (orderId) => {
    setSelectedOrderId(orderId);
    setShowModal(true);
  };

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
            <th scope="col">Chức năng</th>
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
                <div className="d-flex flex-column gap-2">
                  <Link
                    to={`/view-order-detail/${order._id}`}
                    className="w-100"
                  >
                    <button className="btn btn-primary btn-sm w-100 ">
                      Xem chi tiết
                    </button>
                  </Link>
                  <button
                    className="btn btn-danger btn-sm w-100"
                    onClick={() => openCancelModal(order._id)}
                    disabled={
                      cancelLoading[order._id] ||
                      order.status === "Đã hủy" ||
                      order.status === "Đã giao"
                    }
                  >
                    {cancelLoading[order._id] ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-1"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        Đang hủy...
                      </>
                    ) : (
                      "Hủy Đơn hàng"
                    )}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal xác nhận hủy đơn hàng */}
      {showModal && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
          tabIndex="-1"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Xác nhận hủy đơn hàng</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>Bạn có chắc chắn muốn hủy đơn hàng này không?</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Hủy
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleCancelOrder}
                  disabled={cancelLoading[selectedOrderId]}
                >
                  {cancelLoading[selectedOrderId] ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-1"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Đang hủy...
                    </>
                  ) : (
                    "Xác nhận"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderList;
