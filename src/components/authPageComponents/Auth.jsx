import React, { useState } from "react";
import Logo from "../../assets/images/Logo.png";

function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  const toggleMode = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div
        className="card shadow p-4"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <div className="text-center mb-4">
          <img
            src={Logo}
            alt="Logo"
            className="img-fluid"
            style={{ maxWidth: "100px" }}
          />
        </div>
        <h2 className="text-center mb-4">{isLogin ? "Log In" : "Sign Up"}</h2>
        <form>
          {!isLogin && (
            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your full name"
              />
            </div>
          )}
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
            />
          </div>
          {!isLogin && (
            <div className="mb-3">
              <label className="form-label">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Re-enter your password"
              />
            </div>
          )}
          <button
            type="submit"
            className={`btn btn-${isLogin ? "primary" : "success"} w-100`}
          >
            {isLogin ? "Log In" : "Sign Up"}
          </button>
        </form>
        <hr className="my-4" />
        <button
          onClick={toggleMode}
          className="btn btn-outline-secondary w-100"
        >
          {isLogin ? "Sign Up" : "Log In"}
        </button>
      </div>
    </div>
  );
}

export default Auth;
