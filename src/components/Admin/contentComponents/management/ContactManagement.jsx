import React, { useState, useEffect } from "react";
import axios from "axios";

const ContactManagement = () => {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [replyMessage, setReplyMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/contact/");
        setContacts(response.data);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };
    fetchContacts();
  }, []);

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleReply = (contact) => {
    setSelectedContact(contact);
    setReplyMessage("");
    setShowModal(true);
  };

  const handleSendReply = async () => {
    if (!replyMessage.trim()) {
      alert("Vui lòng nhập nội dung phản hồi!");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/contact/reply",
        {
          contactId: selectedContact._id,
          replyMessage,
        }
      );

      if (response.data.success) {
        alert("Phản hồi đã được gửi thành công!");
        setShowModal(false);
      } else {
        throw new Error(response.data.message || "Không thể gửi phản hồi");
      }
    } catch (error) {
      console.error("Error sending reply:", error);
      alert(`Gửi phản hồi thất bại: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-3">Quản lý Liên hệ</h1>

      <div className="d-flex align-items-center justify-content-between mb-3">
        <input
          type="text"
          className="form-control w-50"
          placeholder="Tìm kiếm theo tên..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <table className="table table-bordered">
        <thead>
          <tr className="text-center">
            <th>#</th>
            <th>Tên khách hàng</th>
            <th>Email</th>
            <th>Tin nhắn</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {filteredContacts.length > 0 ? (
            filteredContacts.map((contact, index) => (
              <tr key={contact._id} className="text-center">
                <td>{index + 1}</td>
                <td>{contact.name}</td>
                <td>{contact.email}</td>
                <td>{contact.message}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => handleReply(contact)}
                  >
                    Reply
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                Không tìm thấy liên hệ nào.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {showModal && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
          tabIndex="-1"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  Phản hồi tới {selectedContact?.name}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>
                  <strong>Email:</strong> {selectedContact?.email}
                </p>
                <p>
                  <strong>Tin nhắn:</strong> {selectedContact?.message}
                </p>
                <textarea
                  className="form-control"
                  rows="5"
                  placeholder="Nhập nội dung phản hồi..."
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                ></textarea>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Đóng
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSendReply}
                  disabled={loading}
                >
                  {loading ? "Đang gửi..." : "Gửi"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactManagement;
