import { Link } from "react-router-dom";
import { useEffect, useCallback, useState } from "react";
import "../../styles/ListProduct.scss";

const OutstandingProducts = () => {
  const [productsList, setProductsList] = useState([]);
  const [error, setError] = useState(null);

  const fetchTopProducts = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:5000/api/home/top");
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      setProductsList(data);
      setError(null);
    } catch (error) {
      console.error("Error fetching top products:", error.message);
      setError(error.message);
    }
  }, []);

  useEffect(() => {
    fetchTopProducts();
  }, [fetchTopProducts]);

  return (
    <div
      className="container"
      style={{ marginTop: "50px", marginBottom: "30px" }}
    >
      <h1>Sản Phẩm Nổi Bật</h1>

      {error && (
        <p className="error-message">Không thể tải sản phẩm: {error}</p>
      )}

      {!error && productsList.length === 0 && (
        <p className="no-products">Hiện tại không có sản phẩm nổi bật nào.</p>
      )}

      <div className="list-product">
        {productsList.map((product) => (
          <Link
            key={product._id}
            to={`/products/${product._id}`}
            style={{ textDecoration: "none" }}
          >
            <div className="product">
              <img
                src={`http://localhost:5000${product.pic}`}
                alt={product.name || "Sản phẩm"}
                onError={(e) => (e.target.src = "/fallback-image.jpg")}
              />
              <h3>{product.name || "Tên sản phẩm không có"}</h3>
              <p>{(product.price || 0).toLocaleString()} VND</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default OutstandingProducts;
