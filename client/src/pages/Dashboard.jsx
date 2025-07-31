import React, { useEffect, useState } from "react";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();
  const [summary, setSummary] = useState({
    totalEmployees: 0,
    totalSalary: 0,
    avgSalary: 0,
    totalUsers: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchSummary = async () => {
    try {
      setLoading(true);
      const [empRes, salRes, userRes] = await Promise.all([
        API.get("/employees"),
        API.get("/salaries"),
        API.get("/users"),
      ]);

      const totalEmployees = empRes.data.data.length;
      const totalSalary = salRes.data.data.reduce((acc, s) => acc + (parseFloat(s.net) || 0), 0);
      const avgSalary = totalEmployees > 0 ? (totalSalary / totalEmployees).toFixed(2) : 0;
      const totalUsers = userRes.data.data.length;

      setSummary({ totalEmployees, totalSalary, avgSalary, totalUsers });
    } catch (err) {
      setError("Failed to load dashboard stats");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>
          <i className="fas fa-tachometer-alt me-2"></i>
          Admin Dashboard
        </h2>
        <div className="text-muted">
          Welcome back, {user?.name}!
        </div>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          <i className="fas fa-exclamation-triangle me-2"></i>
          {error}
        </div>
      )}

      <div className="row">
        <div className="col-md-3 mb-4">
          <div className="card shadow-sm text-center border-primary">
            <div className="card-body">
              <i className="fas fa-users fa-2x text-primary mb-2"></i>
              <h5 className="card-title">Total Employees</h5>
              <h3 className="text-primary">{summary.totalEmployees}</h3>
            </div>
          </div>
        </div>
        
        <div className="col-md-3 mb-4">
          <div className="card shadow-sm text-center border-success">
            <div className="card-body">
              <i className="fas fa-money-bill-wave fa-2x text-success mb-2"></i>
              <h5 className="card-title">Total Salary Paid</h5>
              <h3 className="text-success">₹{summary.totalSalary.toLocaleString()}</h3>
            </div>
          </div>
        </div>
        
        <div className="col-md-3 mb-4">
          <div className="card shadow-sm text-center border-info">
            <div className="card-body">
              <i className="fas fa-chart-line fa-2x text-info mb-2"></i>
              <h5 className="card-title">Average Salary</h5>
              <h3 className="text-info">₹{summary.avgSalary}</h3>
            </div>
          </div>
        </div>
        
        <div className="col-md-3 mb-4">
          <div className="card shadow-sm text-center border-warning">
            <div className="card-body">
              <i className="fas fa-user-cog fa-2x text-warning mb-2"></i>
              <h5 className="card-title">Total Users</h5>
              <h3 className="text-warning">{summary.totalUsers}</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-12">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">
                <i className="fas fa-info-circle me-2"></i>
                Quick Actions
              </h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-3 mb-3">
                  <a href="/employees" className="btn btn-outline-primary w-100">
                    <i className="fas fa-users me-2"></i>
                    Manage Employees
                  </a>
                </div>
                <div className="col-md-3 mb-3">
                  <a href="/salaries" className="btn btn-outline-success w-100">
                    <i className="fas fa-money-bill-wave me-2"></i>
                    Manage Salaries
                  </a>
                </div>
                <div className="col-md-3 mb-3">
                  <a href="/admin/users" className="btn btn-outline-warning w-100">
                    <i className="fas fa-user-cog me-2"></i>
                    Manage Users
                  </a>
                </div>
                <div className="col-md-3 mb-3">
                  <a href="/create-employee" className="btn btn-outline-info w-100">
                    <i className="fas fa-user-plus me-2"></i>
                    Add Employee
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;