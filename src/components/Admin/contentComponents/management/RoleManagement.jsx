import React, { useState, useEffect } from "react";
import axios from "axios";

const RoleManagement = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [pendingRoles, setPendingRoles] = useState({});

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/auth/alluser"
        );
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  // Update user role
  const handleRoleUpdate = async (userId) => {
    const newRole = pendingRoles[userId];
    if (!newRole) {
      alert("Không phát hiện sự thay đổi vai trò.");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:5000/api/auth/${userId}`,
        { role: newRole }
      );
      if (response.status === 200) {
        alert(`Vai trò được cập nhật thành ${newRole}`);
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === userId ? { ...user, role: newRole } : user
          )
        );
        setPendingRoles((prevPendingRoles) => {
          const updatedPendingRoles = { ...prevPendingRoles };
          delete updatedPendingRoles[userId];
          return updatedPendingRoles;
        });
      } else {
        alert("Không cập nhật được vai trò. Vui lòng thử lại.");
      }
    } catch (error) {
      console.error("Error updating role:", error);
      alert("Đã xảy ra lỗi khi cập nhật vai trò.");
    }
  };

  // Filter users by search term
  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <h1 className="mb-3">Quản lý Phân quyền</h1>

      <div className="d-flex align-items-center justify-content-between mb-3">
        <input
          type="text"
          className="form-control w-50"
          placeholder="Tìm kiếm theo tên người dùng..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <table className="table table-bordered">
        <thead>
          <tr className="text-center">
            <th>#</th>
            <th>Tên người dùng</th>
            <th>Email</th>
            <th>Vai trò</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user, index) => (
              <tr key={user._id} className="text-center">
                <td>{index + 1}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  <select
                    className="form-select"
                    value={pendingRoles[user._id] || user.role}
                    onChange={(e) =>
                      setPendingRoles((prevPendingRoles) => ({
                        ...prevPendingRoles,
                        [user._id]: e.target.value,
                      }))
                    }
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                    <option value="stranger">Stranger</option>
                  </select>
                </td>
                <td>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => handleRoleUpdate(user._id)}
                    disabled={index === 0}
                  >
                    Confirm
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                Không tìm thấy người dùng nào.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RoleManagement;
