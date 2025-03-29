import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useId } from "../../context/RoleContext";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { whatYouId } = useId();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [selectedSize, setSelectedSize] = useState(null);
  const [addingToCart, setAddingToCart] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/products/${id}`
        );
        if (!response.ok) {
          throw new Error("Không tìm thấy sản phẩm hoặc lỗi server!");
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (product?.sizes?.length && !selectedSize) {
      setError("Vui lòng chọn size trước khi thêm vào giỏ hàng!");
      return;
    }

    setError("");
    setAddingToCart(true);

    try {
      const response = await fetch("http://localhost:5000/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: whatYouId,
          productId: product._id,
          pic: product.pic,
          name: product.name,
          size: selectedSize || "Default",
          price: product.price,
          quantity: 1,
        }),
      });

      if (!response.ok) {
        throw new Error("Bạn chưa đăng nhập nên không thể thêm vào giỏ hàng!");
      }

      setSuccessMessage(
        `🛒 ${product.name} size (${
          selectedSize || "Default"
        }) đã thêm vào giỏ hàng!`
      );
      setTimeout(() => setSuccessMessage(), 3000);
    } catch (error) {
      setError(error.message);
    } finally {
      setAddingToCart(false);
    }
  };

  if (loading) {
    return <div className="text-center mt-5">Đang tải dữ liệu...</div>;
  }

  return (
    <div className="container mt-4 mb-3">
      <div className="row align-items-center">
        <div className="col-md-6 text-center">
          <img
            src={`http://localhost:5000${product.pic}`}
            alt={product.content}
            className="img-fluid rounded shadow"
            style={{
              maxWidth: "80%",
              border: "1px solid #ddd",
              marginBottom: "20px",
            }}
          />
        </div>
        <div className="col-md-6">
          {successMessage && (
            <div className="alert alert-success text-center">
              {successMessage}
            </div>
          )}
          <h1 className="text-start fw-bold">{product.name}</h1>
          <h4 className="text-danger fw-bold mb-3">
            {product.price.toLocaleString()} VND
          </h4>
          <p className="text-muted">{product.description}</p>

          {product.sizes?.length > 0 && (
            <div className="mb-4">
              <label htmlFor="sizeSelect" className="form-label fw-semibold">
                Chọn size:
              </label>
              <div className="d-flex gap-2 justify-content-start">
                {product.sizes.map((size, index) => (
                  <button
                    key={index}
                    className={`btn ${
                      selectedSize === size
                        ? "btn-secondary"
                        : "btn-outline-secondary"
                    }`}
                    style={{ width: "60px" }}
                    onClick={() => {
                      setSelectedSize(size);
                      setError("");
                    }}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {error && (
                <div style={{ color: "red", marginTop: "8px" }}>{error}</div>
              )}
            </div>
          )}

          <button
            className="btn btn-success w-100 py-2 fw-bold mb-3"
            onClick={handleAddToCart}
            disabled={addingToCart}
            style={{
              borderRadius: "10px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              opacity: addingToCart ? 0.6 : 1,
            }}
          >
            {addingToCart ? "Đang thêm..." : "Thêm vào giỏ hàng"}
          </button>

          <button
            className="btn btn-outline-secondary w-100 py-2 fw-bold"
            onClick={() => navigate(-1)}
            style={{ borderRadius: "10px" }}
          >
            Quay lại
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
