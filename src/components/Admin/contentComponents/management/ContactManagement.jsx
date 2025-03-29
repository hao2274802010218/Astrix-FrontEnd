import React, { useState, useEffect } from "react";
import axios from "axios";

const ContactManagement = () => {
  const [contacts, setContacts] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

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

  const handleReply = (contactId) => {
    console.log("Replying to contact with ID:", contactId);
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-3">Quản lý Liên hệ</h1>

      <div className="d-flex align-items-center justify-content-between mb-3">
        <input
          type="text"
          className="form-control w-50"
          placeholder="Search by name..."
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
                    onClick={() => handleReply(contact._id)}
                  >
                    Reply
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No contacts found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ContactManagement;
