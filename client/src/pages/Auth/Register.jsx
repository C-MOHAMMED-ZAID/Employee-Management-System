import React, { useState } from "react";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError(""); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await API.post("/auth/register", form);
      alert("Registered successfully! Please login.");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || err.response?.data?.msg || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <div className="card shadow">
        <div className="card-body p-4">
          <h2 className="text-center mb-4">
            <i className="fas fa-user-plus me-2"></i>
            Register
          </h2>
          
          {error && (
            <div className="alert alert-danger" role="alert">
              <i className="fas fa-exclamation-triangle me-2"></i>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                <i className="fas fa-user me-2"></i>
                Full Name
              </label>
              <input 
                className="form-control" 
                type="text" 
                id="name"
                name="name" 
                placeholder="Enter your full name" 
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                <i className="fas fa-envelope me-2"></i>
                Email
              </label>
              <input 
                className="form-control" 
                type="email" 
                id="email"
                name="email" 
                placeholder="Enter your email" 
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                <i className="fas fa-lock me-2"></i>
                Password
              </label>
              <input 
                className="form-control" 
                type="password" 
                id="password"
                name="password" 
                placeholder="Enter your password" 
                onChange={handleChange}
                required
              />
            </div>
            
            <button 
              className="btn btn-primary w-100" 
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                  Registering...
                </>
              ) : (
                <>
                  <i className="fas fa-user-plus me-2"></i>
                  Register
                </>
              )}
            </button>
          </form>

          <div className="text-center mt-3">
            <p className="text-muted">
              Already have an account?{" "}
              <a href="/login" className="text-decoration-none">
                Login here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
