import React, { useState } from "react";
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import API from "../../services/api.js";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
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
      console.log("Attempting login with:", form);
      const res = await API.post("/auth/login", form);
      console.log("Login response:", res.data);
      
      login(res.data.user, res.data.token);

      const { role } = res.data.user;
      if (role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/my-profile");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || err.response?.data?.msg || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async (credentialResponse) => {
    setLoading(true);
    setError("");

    try {
      const decoded = jwtDecode(credentialResponse.credential);
      console.log("Google login attempt for:", decoded.email);
      
      const res = await API.post('/auth/google', {
        email: decoded.email,
        name: decoded.name,
      });
      
      console.log("Google login response:", res.data);
      login(res.data.user, res.data.token);

      const { role } = res.data.user;
      if (role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/my-profile");
      }
    } catch (err) {
      console.error("Google login error:", err);
      setError("Google login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <div className="card shadow">
        <div className="card-body p-4">
          <h2 className="text-center mb-4">
            <i className="fas fa-sign-in-alt me-2"></i>
            Login
          </h2>
          
          {error && (
            <div className="alert alert-danger" role="alert">
              <i className="fas fa-exclamation-triangle me-2"></i>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
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
              className="btn btn-success w-100" 
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                  Logging in...
                </>
              ) : (
                <>
                  <i className="fas fa-sign-in-alt me-2"></i>
                  Login
                </>
              )}
            </button>
          </form>

          <hr className="my-4" />
          
          <div className="text-center">
            <h6 className="text-muted mb-3">OR</h6>
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={() => {
                setError("Google login failed. Please try again.");
              }}
            />
          </div>

          <div className="text-center mt-3">
            <p className="text-muted">
              Don't have an account?{" "}
              <a href="/register" className="text-decoration-none">
                Register here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
