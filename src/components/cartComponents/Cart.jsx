import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useId } from "../../context/RoleContext";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { whatYouId } = useId();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        setLoading(true);
        setError(null);

        if (!whatYouId) {
          throw new Error("Vui lòng đăng nhập để xem giỏ hàng");
        }

        const response = await fetch(
          `http://localhost:5000/api/cart/${whatYouId}`
        );
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Lỗi khi tải giỏ hàng!");
        }

        const data = await response.json();
        setCart(Array.isArray(data.cart?.items) ? data.cart.items : []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [whatYouId]);

  const handleDelete = async (productId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/cart/${whatYouId}/${productId}`,
        { method: "DELETE" }
      );

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Xóa sản phẩm thất bại!");

      setCart((prevCart) =>
        prevCart.filter((item) => item.productId !== productId)
      );
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm:", error.message);
      setError(error.message);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <p>Đang tải giỏ hàng...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5 text-center">
        <h3 className="text-danger mb-3">{error}</h3>
        {error.includes("đăng nhập") ? (
          <div className="d-flex justify-content-center gap-3">
            <button
              className="btn btn-secondary px-4 py-2"
              onClick={() => navigate(-1)}
            >
              Quay lại
            </button>
            <Link to={"/login"}>
              <button className="btn btn-success px-4 py-2">
                Đến trang đăng nhập
              </button>
            </Link>
          </div>
        ) : (
          <Link to={"/products"}>
            <button className="btn btn-primary">Tiếp tục mua sắm</button>
          </Link>
        )}
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="text-center">
        <h1 className="fw-bold">Giỏ Hàng</h1>
        <p className="text-muted">Kiểm tra và tiến hành thanh toán</p>
      </div>

      {cart.length === 0 ? (
        <div className="text-center mb-3">
          <h5 className="text-muted mt-5 mb-3">Giỏ hàng của bạn đang trống.</h5>
          <Link to={"/products"}>
            <button className="btn btn-primary">Tiếp tục mua sắm</button>
          </Link>
        </div>
      ) : (
        <div className="shadow rounded bg-light p-4 mb-3">
          <table className="table table-bordered table-hover align-middle text-center">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Ảnh</th>
                <th>Tên sản phẩm</th>
                <th>Size</th>
                <th>Số lượng</th>
                <th>Giá</th>
                <th>Thành tiền</th>
                <th>Xóa</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => (
                <tr key={item.productId}>
                  <td>{index + 1}</td>
                  <td>
                    <img
                      src={`http://localhost:5000${item.pic}`}
                      alt={item.name}
                      className="img-fluid rounded shadow-sm"
                      style={{ maxWidth: "120px" }}
                    />
                  </td>
                  <td className="fw-bold">{item.name}</td>
                  <td>{item.size || "N/A"}</td>
                  <td>{item.quantity}</td>
                  <td className="text-primary fw-bold">
                    {item.price.toLocaleString()} VND
                  </td>
                  <td className="text-danger fw-bold">
                    {(item.price * item.quantity).toLocaleString()} VND
                  </td>
                  <td>
                    <button
                      className="btn btn-danger fw-bold rounded shadow-sm"
                      onClick={() => handleDelete(item.productId)}
                    >
                      <i className="bi bi-trash3-fill"></i> Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="d-flex justify-content-between align-items-center mt-4">
            <h4 className="fw-bold">
              Tổng:{" "}
              {cart
                .reduce(
                  (acc, item) => acc + item.price * (item.quantity || 1),
                  0
                )
                .toLocaleString()}{" "}
              VND
            </h4>

            <div>
              <Link to={"/products"}>
                <button className="btn btn-secondary me-2">
                  Tiếp tục mua sắm
                </button>
              </Link>
              <Link to={"/checkout"}>
                <button className="btn btn-success">Thanh toán</button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
