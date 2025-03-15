import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import products from "../../assets/images/product.png";
import "../../styles/ListProduct.scss";

const ProductList = () => {
  const fakeData = useMemo(
    () => [
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
        description:
          "Quần jeans nam kiểu dáng trẻ trung, chất liệu co giãn tốt.",
        sizes: ["28", "30", "32", "34"],
      },
      {
        id: "3",
        pic: products,
        content: "Sản phẩm",
        name: "Áo sơ mi nam",
        price: 400000,
        category: "ao",
        description:
          "Áo sơ mi nam vải lụa cao cấp, phù hợp môi trường công sở.",
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
        description:
          "Balo laptop chống nước, phù hợp cho công việc và du lịch.",
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
    ],
    []
  );

  const [productsList, setProductsList] = useState(fakeData);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const handleFilterAndSort = useCallback(() => {
    let filteredProducts = [...fakeData];

    if (searchTerm) {
      filteredProducts = filteredProducts.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (priceFilter) {
      filteredProducts = filteredProducts.filter((product) => {
        const price = product.price;
        if (priceFilter === "<100000") return price < 100000;
        if (priceFilter === "100000-200000")
          return price >= 100000 && price <= 200000;
        if (priceFilter === "200000-300000")
          return price >= 200000 && price <= 300000;
        if (priceFilter === "300000-500000")
          return price >= 300000 && price <= 500000;
        if (priceFilter === ">500000") return price > 500000;
        return true;
      });
    }

    if (categoryFilter) {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === categoryFilter
      );
    }

    if (sortOrder === "asc") {
      filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "desc") {
      filteredProducts.sort((a, b) => b.price - a.price);
    }

    setProductsList(filteredProducts);
  }, [searchTerm, priceFilter, categoryFilter, sortOrder, fakeData]);

  useEffect(() => {
    handleFilterAndSort();
  }, [handleFilterAndSort]);

  return (
    <div className="container" style={{ marginTop: "30px" }}>
      <div className="d-flex align-items-center gap-3">
        <div className="input-group w-50">
          <input
            type="text"
            className="form-control"
            placeholder="Nhập từ khóa tìm kiếm..."
            aria-label="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div>
          <select
            className="form-select"
            aria-label="Filter by price"
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
          >
            <option value="">Lọc theo giá</option>
            <option value="<100000">Giá dưới 100.000 VND</option>
            <option value="100000-200000">100.000 VND - 200.000 VND</option>
            <option value="200000-300000">200.000 VND - 300.000 VND</option>
            <option value="300000-500000">300.000 VND - 500.000 VND</option>
            <option value=">500000">Giá trên 500.000 VND</option>
          </select>
        </div>
        <div>
          <select
            className="form-select"
            aria-label="Filter by category"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">Loại sản phẩm</option>
            <option value="ao">Áo</option>
            <option value="quan">Quần</option>
            <option value="mu">Mũ</option>
            <option value="giay">Giầy</option>
            <option value="balo">Balo</option>
          </select>
        </div>
        <div>
          <select
            className="form-select"
            aria-label="Sort order"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="">Thứ tự</option>
            <option value="asc">Giá tăng dần</option>
            <option value="desc">Giá giảm dần</option>
          </select>
        </div>
      </div>
      <div className="list-product mt-4">
        {productsList.length ? (
          productsList.map((product) => (
            <Link
              key={product.id}
              to={`/products/${product.id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="product">
                <img src={product.pic} alt={product.content} />
                <h3>{product.name}</h3>
                <p>{product.price.toLocaleString()} VND</p>
              </div>
            </Link>
          ))
        ) : (
          <p>Không tìm thấy sản phẩm.</p>
        )}
      </div>
    </div>
  );
};

export default ProductList;
