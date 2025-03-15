import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import products from "../../assets/images/product.png";

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState(null);

  const fakeData = [
    {
      id: "1",
      pic: products,
      content: "Sản phẩm",
      name: "Áo thun nam",
      price: 300000,
      category: "ao",
      description:
        "Áo thun nam chất liệu cotton cao cấp, thoáng mát và dễ chịu.",
      sizes: ["S", "M", "L", "XL"],
    },
    {
      id: "2",
      pic: products,
      content: "Sản phẩm",
      name: "Quần jeans nam",
      price: 500000,
      category: "quan",
      description: "Quần jeans nam kiểu dáng trẻ trung, chất liệu co giãn tốt.",
      sizes: ["28", "30", "32", "34"],
    },
    {
      id: "3",
      pic: products,
      content: "Sản phẩm",
      name: "Áo sơ mi nam",
      price: 400000,
      category: "ao",
      description: "Áo sơ mi nam vải lụa cao cấp, phù hợp môi trường công sở.",
      sizes: ["M", "L", "XL"],
    },
    {
      id: "4",
      pic: products,
      content: "Sản phẩm",
      name: "Áo khoác nam",
      price: 700000,
      category: "ao",
      description: "Áo khoác nam chống gió, phù hợp cho mùa đông lạnh giá.",
      sizes: ["M", "L", "XL"],
    },
    {
      id: "5",
      pic: products,
      content: "Sản phẩm",
      name: "Giày thể thao",
      price: 800000,
      category: "giay",
      description: "Giày thể thao nam năng động, đế êm ái và bền bỉ.",
      sizes: ["39", "40", "41", "42", "43"],
    },
    {
      id: "6",
      pic: products,
      content: "Sản phẩm",
      name: "Mũ lưỡi trai",
      price: 150000,
      category: "mu",
      description: "Mũ lưỡi trai nam thời trang, chất liệu vải thoáng khí.",
      sizes: [],
    },
    {
      id: "7",
      pic: products,
      content: "Sản phẩm",
      name: "Balo laptop",
      price: 600000,
      category: "balo",
      description: "Balo laptop chống nước, phù hợp cho công việc và du lịch.",
      sizes: [],
    },
    {
      id: "8",
      pic: products,
      content: "Sản phẩm",
      name: "Quần short nam",
      price: 250000,
      category: "quan",
      description:
        "Quần short nam thoải mái, phù hợp cho các hoạt động ngoài trời.",
      sizes: ["S", "M", "L", "XL"],
    },
    {
      id: "9",
      pic: products,
      content: "Sản phẩm",
      name: "Dép nam",
      price: 200000,
      category: "giay",
      description: "Dép nam kiểu dáng hiện đại, đế cao su chống trơn trượt.",
      sizes: ["39", "40", "41", "42", "43"],
    },
    {
      id: "10",
      pic: products,
      content: "Sản phẩm",
      name: "Túi đeo chéo",
      price: 450000,
      category: "balo",
      description: "Túi đeo chéo nam thời trang, chất liệu chống thấm nước.",
      sizes: [],
    },
  ];

  const chooseProduct = fakeData.find((product) => product.id === productId);

  if (!chooseProduct) {
    return (
      <div className="container mt-5 mb-5">
        <h1 className="text-center text-danger">Sản phẩm không tồn tại</h1>
        <button
          className="btn btn-secondary mt-3"
          onClick={() => navigate(-1)}
          style={{ display: "block", margin: "0 auto" }}
        >
          Quay lại
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (chooseProduct.sizes?.length && !selectedSize) {
      alert("Vui lòng chọn size trước khi thêm vào giỏ hàng!");
      return;
    }
    alert(
      `${chooseProduct.name}${
        selectedSize ? ` size (${selectedSize})` : ""
      } đã được thêm vào giỏ hàng!`
    );
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="row align-items-center">
        <div className="col-md-6 text-center">
          <img
            src={chooseProduct.pic}
            alt={chooseProduct.name}
            className="img-fluid rounded shadow"
            style={{ maxWidth: "80%", border: "1px solid #ddd" }}
          />
        </div>
        <div className="col-md-6">
          <h1 className="text-start fw-bold">{chooseProduct.name}</h1>
          <h4 className="text-danger fw-bold mb-3">
            {chooseProduct.price.toLocaleString()} VND
          </h4>
          <p className="text-muted">{chooseProduct.description}</p>

          {chooseProduct.sizes?.length > 0 && (
            <div className="mb-4">
              <label htmlFor="sizeSelect" className="form-label fw-semibold">
                Chọn size:
              </label>
              <div className="d-flex gap-2 justify-content-start">
                {chooseProduct.sizes.map((size, index) => (
                  <button
                    key={index}
                    className={`btn ${
                      selectedSize === size
                        ? "btn-primary"
                        : "btn-outline-secondary"
                    }`}
                    style={{ width: "60px" }}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          <button
            className="btn btn-primary w-100 py-2 fw-bold mb-3"
            onClick={handleAddToCart}
            style={{
              borderRadius: "10px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            Thêm vào giỏ hàng
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
