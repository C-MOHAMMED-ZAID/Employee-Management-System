import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { user, logout, isAdmin, isEmployee, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <i className="fas fa-users me-2"></i>
          EmpManager
        </Link>
        
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
          data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                <i className="fas fa-home me-1"></i>
                Home
              </Link>
            </li>

            {/* Admin Navigation */}
            {isAdmin() && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/dashboard">
                    <i className="fas fa-tachometer-alt me-1"></i>
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/admin/users">
                    <i className="fas fa-user-cog me-1"></i>
                    Users
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/employees">
                    <i className="fas fa-users me-1"></i>
                    Employees
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/salaries">
                    <i className="fas fa-money-bill-wave me-1"></i>
                    Salaries
                  </Link>
                </li>
              </>
            )}

            {/* Employee Navigation */}
            {isEmployee() && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/my-profile">
                    <i className="fas fa-user me-1"></i>
                    My Profile
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/my-salary">
                    <i className="fas fa-dollar-sign me-1"></i>
                    My Salary
                  </Link>
                </li>
              </>
            )}
          </ul>

          <ul className="navbar-nav">
            {isAuthenticated() ? (
              <>
                <li className="nav-item">
                  <span className="navbar-text text-light me-3">
                    <i className="fas fa-user-circle me-1"></i>
                    Welcome, {user.name.split(" ")[0]}!
                    <span className="badge bg-secondary ms-2">
                      {user.role === 'admin' ? 'Admin' : 'Employee'}
                    </span>
                  </span>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-outline-light btn-sm"
                    onClick={handleLogout}
                  >
                    <i className="fas fa-sign-out-alt me-1"></i>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    <i className="fas fa-sign-in-alt me-1"></i>
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    <i className="fas fa-user-plus me-1"></i>
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
