import React, { useEffect, useState } from "react";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";

const SalaryList = () => {
  const [salaries, setSalaries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchSalaries = async () => {
    try {
      setLoading(true);
      const res = await API.get("/salaries");
      setSalaries(res.data.data);
    } catch (err) {
      setError(err.response?.data?.msg || "Failed to fetch salaries");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this salary record?")) return;
    try {
      await API.delete(`/salaries/${id}`);
      alert("Salary record deleted successfully!");
      fetchSalaries();
    } catch (err) {
      alert(err.response?.data?.msg || "Delete failed");
    }
  };

  useEffect(() => {
    fetchSalaries();
  }, []);

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading salary records...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>
          <i className="fas fa-money-bill-wave me-2"></i>
          Salary Records
        </h2>
        <button 
          className="btn btn-success" 
          onClick={() => navigate("/create-salary")}
        >
          <i className="fas fa-plus me-2"></i>
          Add Salary
        </button>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          <i className="fas fa-exclamation-triangle me-2"></i>
          {error}
        </div>
      )}

      <div className="row">
        {salaries.length > 0 ? (
          salaries.map((salary) => (
            <div className="col-md-6 col-lg-4 mb-4" key={salary._id}>
              <div className="card shadow-sm h-100">
                <div className="card-header bg-success text-white">
                  <h5 className="card-title mb-0">
                    <i className="fas fa-user me-2"></i>
                    {salary.employeeid?.name || "Unknown Employee"}
                  </h5>
                </div>
                <div className="card-body">
                  <div className="mb-2">
                    <strong>Period:</strong>
                    <p className="text-muted mb-1">
                      {salary.month} {salary.year}
                    </p>
                  </div>
                  <div className="mb-2">
                    <strong>Basic Salary:</strong>
                    <p className="text-muted mb-1">₹{salary.basic || "0"}</p>
                  </div>
                  <div className="mb-2">
                    <strong>Allowances:</strong>
                    <p className="text-muted mb-1">₹{salary.allowances || "0"}</p>
                  </div>
                  <div className="mb-2">
                    <strong>Deductions:</strong>
                    <p className="text-muted mb-1">₹{salary.deductions || "0"}</p>
                  </div>
                  <div className="mb-3">
                    <strong>Net Salary:</strong>
                    <p className="text-success fw-bold fs-5 mb-0">
                      ₹{salary.net || "0"}
                    </p>
                  </div>
                </div>
                <div className="card-footer bg-light">
                  <div className="d-flex justify-content-between">
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => navigate(`/edit-salary/${salary._id}`)}
                    >
                      <i className="fas fa-edit me-1"></i>
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(salary._id)}
                    >
                      <i className="fas fa-trash me-1"></i>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12">
            <div className="text-center">
              <i className="fas fa-money-bill-alt fa-3x text-muted mb-3"></i>
              <p className="text-muted">No salary records found.</p>
              <button 
                className="btn btn-primary" 
                onClick={() => navigate("/create-salary")}
              >
                <i className="fas fa-plus me-2"></i>
                Add First Salary Record
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SalaryList;
