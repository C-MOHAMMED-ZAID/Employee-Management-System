import React, { useEffect, useState } from "react";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";

const MySalary = () => {
  const [salary, setSalary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    const fetchSalary = async () => {
      try {
        setLoading(true);
        const res = await API.get("/salaries/me");
        setSalary(res.data.data);
      } catch (err) {
        console.error("Salary fetch error:", err);
        setError(err.response?.data?.msg || "Failed to load salary information");
      } finally {
        setLoading(false);
      }
    };

    fetchSalary();
  }, []);

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading salary information...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card shadow">
              <div className="card-header bg-warning text-dark">
                <h3 className="mb-0">
                  <i className="fas fa-exclamation-triangle me-2"></i>
                  Salary Information
                </h3>
              </div>
              <div className="card-body text-center">
                <i className="fas fa-money-bill-alt fa-3x text-muted mb-3"></i>
                <p className="text-muted">{error}</p>
                <small className="text-muted">
                  Please contact your administrator for salary details.
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow">
            <div className="card-header bg-success text-white">
              <h3 className="mb-0">
                <i className="fas fa-money-bill-wave me-2"></i>
                My Salary Details
              </h3>
            </div>
            <div className="card-body">
              {salary ? (
                <div className="row">
                  <div className="col-md-6">
                    <h5 className="text-success mb-3">Salary Information</h5>
                    <div className="mb-3">
                      <strong>Basic Salary:</strong>
                      <p className="text-muted">₹{salary.basic || "0"}</p>
                    </div>
                    <div className="mb-3">
                      <strong>Allowances:</strong>
                      <p className="text-muted">₹{salary.allowances || "0"}</p>
                    </div>
                    <div className="mb-3">
                      <strong>Deductions:</strong>
                      <p className="text-muted">₹{salary.deductions || "0"}</p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <h5 className="text-success mb-3">Payment Details</h5>
                    <div className="mb-3">
                      <strong>Net Salary:</strong>
                      <p className="text-success fw-bold fs-5">
                        ₹{salary.net || "0"}
                      </p>
                    </div>
                    <div className="mb-3">
                      <strong>Payment Month:</strong>
                      <p className="text-muted">{salary.month || "Not specified"}</p>
                    </div>
                    <div className="mb-3">
                      <strong>Payment Year:</strong>
                      <p className="text-muted">{salary.year || "Not specified"}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <i className="fas fa-money-bill-alt fa-3x text-muted mb-3"></i>
                  <p className="text-muted">No salary information available</p>
                  <small className="text-muted">
                    Please contact your administrator for salary details.
                  </small>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MySalary;
