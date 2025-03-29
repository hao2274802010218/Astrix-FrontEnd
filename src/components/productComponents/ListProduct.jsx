import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import "../../styles/ListProduct.scss";

const ProductList = () => {
  const [filteredProductsList, setFilteredProductsList] = useState([]);
  const [productsList, setProductsList] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 12;
  const totalPages = Math.ceil(filteredProductsList.length / productsPerPage);

  const fetchProducts = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:5000/api/products");
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const dataProducts = await response.json();
      setProductsList(dataProducts);
    } catch (error) {
      console.error("Error fetching products:", error.message);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const fetchCatelogy = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:5000/api/categories");
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const dataCatelogy = await response.json();
      setCategoriesList(dataCatelogy);
    } catch (error) {
      console.error("Error fetching products:", error.message);
    }
  }, []);

  useEffect(() => {
    fetchCatelogy();
  }, [fetchCatelogy]);

  const handleFilterAndSort = useCallback(() => {
    let filteredProducts = [...productsList];

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

    setFilteredProductsList(filteredProducts);
    setCurrentPage(1);
  }, [searchTerm, priceFilter, categoryFilter, sortOrder, productsList]);

  useEffect(() => {
    handleFilterAndSort();
  }, [handleFilterAndSort]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProductsList.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

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
            {categoriesList.length
              ? categoriesList.map((category) => (
                  <option key={category._id} value={category.name}>
                    {category.name}
                  </option>
                ))
              : ""}
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
        {currentProducts.length ? (
          currentProducts.map((product) => (
            <Link
              key={product._id}
              to={`/products/${product._id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="product">
                <img
                  src={`http://localhost:5000${product.pic}`}
                  alt={product.content}
                />
                <h3>{product.name}</h3>
                <p>{product.price.toLocaleString()} VND</p>
              </div>
            </Link>
          ))
        ) : (
          <p>Không tìm thấy sản phẩm.</p>
        )}
      </div>

      {totalPages > 1 && (
        <nav className="mt-4 mb-4">
          <ul className="pagination pagination-lg justify-content-end">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={() => handlePageChange(currentPage - 1)}
                aria-label="Previous"
              >
                <span aria-hidden="true">&laquo;</span>
              </button>
            </li>
            {pageNumbers.map((number) => (
              <li
                key={number}
                className={`page-item ${
                  currentPage === number ? "active" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(number)}
                >
                  {number}
                </button>
              </li>
            ))}
            <li
              className={`page-item ${
                currentPage === totalPages ? "disabled" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() => handlePageChange(currentPage + 1)}
                aria-label="Next"
              >
                <span aria-hidden="true">&raquo;</span>
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default ProductList;
