import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useId } from "../../context/RoleContext";

const Checkout = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const { whatYouId } = useId();
  const [formData, setFormData] = useState({
    userId: whatYouId,
    username: "",
    phone: "",
    email: "",
    address: "",
    note: "",
    paymentMethod: "Cash on Delivery",
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        if (!whatYouId) {
          navigate("/login");
          return;
        }

        const cartResponse = await fetch(
          `http://localhost:5000/api/cart/${whatYouId}`
        );
        if (!cartResponse.ok) throw new Error("Lỗi khi tải giỏ hàng!");
        const cartData = await cartResponse.json();
        setCart(Array.isArray(cartData.cart?.items) ? cartData.cart.items : []);

        const userResponse = await fetch(
          `http://localhost:5000/api/auth/${whatYouId}`
        );
        if (!userResponse.ok)
          throw new Error("Lỗi khi tải thông tin người dùng!");
        const userData = await userResponse.json();
        setFormData((prevData) => ({
          ...prevData,
          username: userData.username || "",
          phone: userData.phone || "",
          email: userData.email || "",
          address: userData.address || "",
        }));
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchCart();
  }, [whatYouId, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.username ||
      !formData.phone ||
      !formData.email ||
      !formData.address
    ) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    setIsLoading(true);
    const orderData = {
      ...formData,
      cart,
      total: cart.reduce(
        (acc, item) => acc + item.price * (item.quantity || 1),
        0
      ),
    };

    try {
      const response = await fetch("http://localhost:5000/api/checkout/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Lỗi khi đặt hàng!");
      }

      await response.json();
      alert("Đơn hàng của bạn đã được đặt thành công!");
      await clearCart();
      navigate("/cart");
    } catch (error) {
      console.error("Checkout error:", error.message);
      alert(`Đã xảy ra lỗi: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const clearCart = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/cart/${whatYouId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Lỗi khi xóa giỏ hàng!");
      }

      setCart([]);
    } catch (error) {
      console.error("Error clearing cart:", error.message);
      alert(`Đã xảy ra lỗi khi xóa giỏ hàng: ${error.message}`);
    }
  };

  return (
    <div className="container mt-3 mb-5">
      <h2 className="text-center mb-4">Tiến hành thanh toán</h2>
      <form onSubmit={handleSubmit} className="border p-4 rounded shadow">
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Họ và Tên
          </label>
          <input
            type="text"
            id="username"
            name="username"
            className="form-control"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Số điện thoại
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            className="form-control"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">
            Địa chỉ
          </label>
          <textarea
            id="address"
            name="address"
            className="form-control"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Đơn hàng của bạn</label>
          <table className="table table-bordered align-middle text-center">
            <thead className="table-secondary">
              <tr>
                <th>#</th>
                <th>Ảnh</th>
                <th>Tên sản phẩm</th>
                <th>Size</th>
                <th>Số lượng</th>
                <th>Thành tiền</th>
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
                  <td className="text-danger fw-bold">
                    {(item.price * item.quantity).toLocaleString()} VND
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="d-flex justify-content-between align-items-center mt-3">
          <h4 className="fw-bold text-start ms-auto">
            Tổng tiền:{" "}
            {cart
              .reduce((acc, item) => acc + item.price * (item.quantity || 1), 0)
              .toLocaleString()}{" "}
            VND
          </h4>
        </div>
        <div className="mb-3">
          <label htmlFor="note" className="form-label">
            Ghi Chú
          </label>
          <textarea
            id="note"
            name="note"
            className="form-control"
            value={formData.note}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="paymentMethod" className="form-label">
            Phương thức thanh toán
          </label>
          <select
            id="paymentMethod"
            name="paymentMethod"
            className="form-select"
            value={formData.paymentMethod}
            onChange={handleChange}
            required
          >
            <option value="Cash on Delivery">Thanh toán khi nhận hàng</option>
            <option value="Zalo Pay">Zalo Pay</option>
            <option value="Momo">Momo</option>
            <option value="Payos">Payos</option>
          </select>
        </div>
        <div className="d-flex justify-content-center gap-3 mt-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="btn btn-outline-secondary w-50"
            disabled={isLoading}
          >
            Quay Lại
          </button>
          <button
            type="submit"
            className="btn btn-primary w-50"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                Đang xử lý...
              </>
            ) : (
              "Thanh toán"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
