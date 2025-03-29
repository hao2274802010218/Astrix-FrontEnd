import React, { useState, useEffect } from "react";
import axios from "axios";

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newCategoryName, setNewCategoryName] = useState("");
  const [editCategory, setEditCategory] = useState(null);
  const [editName, setEditName] = useState("");

  // Lấy danh sách danh mục từ server
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/categories"
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Lỗi khi tải danh mục:", error);
      }
    };
    fetchCategories();
  }, []);

  // Lọc danh mục theo từ khóa tìm kiếm
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Thêm danh mục mới
  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) {
      alert("Tên danh mục không được để trống.");
      return;
    }
    try {
      const valuename = newCategoryName.toLowerCase().replace(/\s+/g, "-");
      const response = await axios.post(
        "http://localhost:5000/api/categories",
        {
          name: newCategoryName,
          valuename,
        }
      );
      setCategories([...categories, response.data]);
      setNewCategoryName("");
    } catch (error) {
      console.error("Lỗi khi thêm danh mục:", error);
    }
  };

  // Xóa danh mục
  const handleDeleteCategory = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa danh mục này?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/categories/${id}`);
      setCategories(categories.filter((category) => category._id !== id));
    } catch (error) {
      console.error("Lỗi khi xóa danh mục:", error);
    }
  };

  // Bắt đầu chỉnh sửa danh mục
  const startEditCategory = (category) => {
    setEditCategory(category);
    setEditName(category.name);
  };

  // Lưu danh mục đã chỉnh sửa
  const handleSaveEditCategory = async () => {
    if (!editName.trim()) {
      alert("Tên danh mục không được để trống.");
      return;
    }
    try {
      const valuename = editName.toLowerCase().replace(/\s+/g, "-");
      const response = await axios.put(
        `http://localhost:5000/api/categories/${editCategory._id}`,
        {
          name: editName,
          valuename,
        }
      );
      setCategories(
        categories.map((cat) =>
          cat._id === editCategory._id ? response.data : cat
        )
      );
      setEditCategory(null);
      setEditName("");
    } catch (error) {
      console.error("Lỗi khi cập nhật danh mục:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-3">Quản lý Danh Mục</h1>
      <div className="d-flex align-items-center justify-content-between mb-3">
        <input
          type="text"
          className="form-control w-50"
          placeholder="Nhập từ khóa tìm kiếm..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="d-flex gap-2">
          <input
            type="text"
            className="form-control"
            placeholder="Tên danh mục mới..."
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
          />
          <button className="btn btn-primary" onClick={handleAddCategory}>
            Thêm
          </button>
        </div>
      </div>

      <table className="table table-bordered">
        <thead>
          <tr className="text-center">
            <th>#</th>
            <th>Tên danh mục</th>
            <th>Chức năng</th>
          </tr>
        </thead>
        <tbody>
          {filteredCategories.length > 0 ? (
            filteredCategories.map((category, index) => (
              <tr key={category._id} className="text-center">
                <td>{index + 1}</td>
                <td>
                  {editCategory && editCategory._id === category._id ? (
                    <input
                      type="text"
                      className="form-control"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                    />
                  ) : (
                    category.name
                  )}
                </td>
                <td>
                  {editCategory && editCategory._id === category._id ? (
                    <button
                      className="btn btn-success btn-sm me-2"
                      onClick={handleSaveEditCategory}
                    >
                      Lưu
                    </button>
                  ) : (
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => startEditCategory(category)}
                    >
                      Sửa
                    </button>
                  )}
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDeleteCategory(category._id)}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                Không tìm thấy danh mục nào.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryManagement;
