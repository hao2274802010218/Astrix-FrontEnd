import React, { useState, useEffect } from "react";
import axios from "axios";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const filteredProducts = products.filter((product) =>
    product?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          axios.get("http://localhost:5000/api/products"),
          axios.get("http://localhost:5000/api/categories"),
        ]);

        if (Array.isArray(productsRes.data)) {
          setProducts(productsRes.data);
        } else {
          console.error("Dữ liệu sản phẩm không hợp lệ:", productsRes.data);
        }

        if (Array.isArray(categoriesRes.data)) {
          setCategories(categoriesRes.data);
        } else {
          console.error("Dữ liệu loại hàng không hợp lệ:", categoriesRes.data);
        }
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
      }
    };

    fetchData();
  }, []);

  const handleAdd = async (newProduct) => {
    try {
      const formData = new FormData();
      formData.append("name", newProduct.name || "");
      formData.append("price", newProduct.price || 0);
      formData.append("category", newProduct.category || "");
      formData.append("description", newProduct.description || "");
      const sizes =
        newProduct.sizes.length > 0
          ? newProduct.sizes.join(",").toUpperCase()
          : "Free Size";
      formData.append("sizes", sizes);
      formData.append("content", newProduct.content || "Default content");
      if (imageFile) {
        formData.append("pic", imageFile);
      }

      const response = await axios.post(
        "http://localhost:5000/api/products",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setProducts([...products, response.data]);
      setEditingProduct(null);
      setImageFile(null);
    } catch (error) {
      console.error(
        "Lỗi khi thêm sản phẩm:",
        error.response?.data || error.message
      );
      alert(
        "Không thể thêm sản phẩm. Vui lòng thử lại. Chi tiết lỗi: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  const handleEdit = async (updatedProduct) => {
    try {
      const formData = new FormData();
      formData.append("name", updatedProduct.name);
      formData.append("price", updatedProduct.price);
      formData.append("category", updatedProduct.category);
      formData.append("description", updatedProduct.description);
      const sizes =
        updatedProduct.sizes.length > 0
          ? updatedProduct.sizes.join(",").toUpperCase()
          : "Free Size";
      formData.append("sizes", sizes);
      if (imageFile) {
        formData.append("pic", imageFile);
      }

      const response = await axios.put(
        `http://localhost:5000/api/products/${updatedProduct._id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product._id === updatedProduct._id ? response.data.product : product
        )
      );
      setEditingProduct(null);
      setImageFile(null);
    } catch (error) {
      console.error("Lỗi khi cập nhật sản phẩm:", error);
      alert("Không thể cập nhật sản phẩm, vui lòng thử lại.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      setProducts(products.filter((product) => product._id !== id));
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-3">Quản lý sản phẩm</h1>
      <div className="d-flex align-items-center justify-content-between mb-3">
        <input
          type="text"
          className="form-control w-50"
          placeholder="Nhập từ khóa tìm kiếm..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="btn btn-success"
          onClick={() =>
            setEditingProduct({
              pic: "",
              name: "",
              price: 0,
              category: "",
              description: "",
              sizes: [],
            })
          }
        >
          Thêm sản phẩm
        </button>
      </div>

      <table className="table table-bordered">
        <thead>
          <tr className="text-center">
            <th>#</th>
            <th>Hình ảnh</th>
            <th>Tên</th>
            <th style={{ width: "130px" }}>Giá</th>
            <th>Size</th>
            <th>Loại</th>
            <th>Mô tả</th>
            <th style={{ width: "100px" }}>Chức năng</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product, index) => (
            <tr key={product._id}>
              <td>{index + 1}</td>
              <td>
                <img
                  src={`http://localhost:5000${product.pic}`}
                  alt={product.name}
                  style={{ width: "150px", height: "150px" }}
                  onError={(e) => (e.target.src = "/fallback-image.jpg")}
                  className="text-center"
                />
              </td>
              <td>{product.name}</td>
              <td className="text-center">
                {product.price.toLocaleString()} VND
              </td>
              <td>
                {product.sizes.map((size, index) => (
                  <span key={index} className="badge bg-secondary me-1">
                    {size.toUpperCase()}
                  </span>
                ))}
              </td>
              <td className="text-center">{product.category}</td>
              <td>{product.description}</td>
              <td>
                <div className="d-flex flex-column justify-content-center align-items-center gap-2">
                  <button
                    className="btn btn-outline-primary btn-sm d-flex align-items-center gap-1 w-75"
                    onClick={() => setEditingProduct(product)}
                  >
                    <i className="bi bi-pencil-square"></i> Edit
                  </button>
                  <button
                    className="btn btn-outline-danger btn-sm d-flex align-items-center gap-1 w-75"
                    onClick={() => handleDelete(product._id)}
                  >
                    <i className="bi bi-trash"></i> Xóa
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingProduct && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
          tabIndex="-1"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {editingProduct._id
                    ? "Chỉnh sửa sản phẩm"
                    : "Thêm sản phẩm mới"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => {
                    setEditingProduct(null);
                    setImageFile(null);
                  }}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <input
                    type="file"
                    className="form-control"
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files[0])}
                  />
                  {editingProduct.pic && !imageFile && (
                    <img
                      src={`http://localhost:5000${editingProduct.pic}`}
                      alt="Preview"
                      style={{ width: "100px", marginTop: "10px" }}
                      onError={(e) => (e.target.src = "/fallback-image.jpg")}
                    />
                  )}
                </div>
                <input
                  type="text"
                  className="form-control mb-3"
                  placeholder="Tên sản phẩm"
                  value={editingProduct.name}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      name: e.target.value,
                    })
                  }
                />
                <input
                  type="number"
                  className="form-control mb-3"
                  placeholder="Giá sản phẩm"
                  value={editingProduct.price}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      price: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  className="form-control mb-3"
                  placeholder="Các size (ngăn cách bởi dấu phẩy)"
                  value={editingProduct.sizes.join(",").toUpperCase()}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      sizes: e.target.value
                        .split(",")
                        .map((size) => size.trim()),
                    })
                  }
                />
                <select
                  className="form-control mb-3"
                  value={editingProduct.category}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      category: e.target.value,
                    })
                  }
                >
                  <option value="">Chọn loại hàng</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <textarea
                  className="form-control mb-3"
                  placeholder="Mô tả sản phẩm"
                  value={editingProduct.description}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      description: e.target.value,
                    })
                  }
                ></textarea>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    setEditingProduct(null);
                    setImageFile(null);
                  }}
                >
                  Hủy
                </button>
                <button
                  className="btn btn-success"
                  onClick={() =>
                    editingProduct._id
                      ? handleEdit(editingProduct)
                      : handleAdd(editingProduct)
                  }
                >
                  Lưu
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductManagement;
