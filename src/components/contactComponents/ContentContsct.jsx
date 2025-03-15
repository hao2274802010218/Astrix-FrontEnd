import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted: ", formData);
    alert("Thank you for contacting us!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="py-5 m-5">
      <div className="container ">
        <div className="row">
          <div className="col-md-6">
            <h2 className="mb-4 text-center fw-bold">Liên hệ với chúng tôi</h2>
            <p>
              Hãy liên hệ với chúng tôi nếu bạn có bất kỳ thắc mắc hoặc phản hồi
              nào. Chúng tôi rất mong nhận được phản hồi từ bạn!
            </p>
            <ul className="list-unstyled">
              <li>
                <strong>Địa chỉ:</strong> Hồ Thị Kỷ, Thới Bình, Cà Mau
              </li>
              <li>
                <strong>Phone:</strong> +84 123 456 789
              </li>
              <li>
                <strong>Email:</strong> hao2274802010218@vanlanguni.vn
              </li>
            </ul>
          </div>
          <div className="col-md-6">
            <form onSubmit={handleSubmit} className="row g-2">
              {/* Name Field */}
              <div className="col-12 d-flex align-items-center">
                <label
                  htmlFor="name"
                  className="form-label me-3"
                  style={{ minWidth: "100px" }}
                >
                  Your Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                />
              </div>

              {/* Email Field */}
              <div className="col-12 d-flex align-items-center">
                <label
                  htmlFor="email"
                  className="form-label me-3"
                  style={{ minWidth: "100px" }}
                >
                  Your Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />
              </div>

              {/* Message Field */}
              <div className="col-12 d-flex">
                <label
                  htmlFor="message"
                  className="form-label me-3"
                  style={{ minWidth: "100px" }}
                >
                  Your Message
                </label>
                <textarea
                  className="form-control"
                  id="message"
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Enter your message"
                  required
                ></textarea>
              </div>

              {/* Submit Button */}
              <div className="col-12 text-end">
                <button type="submit" className="btn btn-primary mt-3">
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
