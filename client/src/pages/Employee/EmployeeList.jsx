import React, { useEffect, useState } from "react";
import API from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const res = await API.get("/employees");
      setEmployees(res.data.data);
    } catch (err) {
      setError(err.response?.data?.msg || "Failed to load employees");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;
    try {
      await API.delete(`/employees/${id}`);
      alert("Employee deleted successfully!");
      fetchEmployees();
    } catch (err) {
      alert(err.response?.data?.msg || "Delete failed.");
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading employees...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>
          <i className="fas fa-users me-2"></i>
          Employee List
        </h2>
        <button 
          className="btn btn-success" 
          onClick={() => navigate("/create-employee")}
        >
          <i className="fas fa-plus me-2"></i>
          Add Employee
        </button>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          <i className="fas fa-exclamation-triangle me-2"></i>
          {error}
        </div>
      )}

      <div className="row">
        {employees.length > 0 ? (
          employees.map(emp => (
            <div className="col-md-6 col-lg-4 mb-4" key={emp._id}>
              <div className="card shadow-sm h-100">
                <div className="card-header bg-primary text-white">
                  <h5 className="card-title mb-0">
                    <i className="fas fa-user me-2"></i>
                    {emp.name}
                  </h5>
                </div>
                <div className="card-body">
                  <div className="mb-2">
                    <strong>Email:</strong>
                    <p className="text-muted mb-1">{emp.email}</p>
                  </div>
                  <div className="mb-2">
                    <strong>Employee ID:</strong>
                    <p className="text-muted mb-1">{emp.empno || "Not assigned"}</p>
                  </div>
                  <div className="mb-2">
                    <strong>Phone:</strong>
                    <p className="text-muted mb-1">{emp.phone || "Not provided"}</p>
                  </div>
                  <div className="mb-2">
                    <strong>Designation:</strong>
                    <p className="text-muted mb-1">{emp.designation || "Not assigned"}</p>
                  </div>
                  <div className="mb-3">
                    <strong>Department:</strong>
                    <p className="text-muted mb-1">{emp.department || "Not assigned"}</p>
                  </div>
                </div>
                <div className="card-footer bg-light">
                  <div className="d-flex justify-content-between">
                    <button 
                      className="btn btn-primary btn-sm" 
                      onClick={() => navigate(`/edit-employee/${emp._id}`)}
                    >
                      <i className="fas fa-edit me-1"></i>
                      Edit
                    </button>
                    <button 
                      className="btn btn-danger btn-sm" 
                      onClick={() => handleDelete(emp._id)}
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
              <i className="fas fa-users fa-3x text-muted mb-3"></i>
              <p className="text-muted">No employees found.</p>
              <button 
                className="btn btn-primary" 
                onClick={() => navigate("/create-employee")}
              >
                <i className="fas fa-plus me-2"></i>
                Add First Employee
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeList;
