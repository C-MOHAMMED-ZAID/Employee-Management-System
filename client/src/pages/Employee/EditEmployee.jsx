import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../services/api";

const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    empno: "",
    phone: "",
    designation: "",
    department: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchEmployee = async () => {
    try {
      setLoading(true);
      console.log("Fetching employee with ID:", id);
      const res = await API.get(`/employees/${id}`);
      console.log("Employee data:", res.data);
      setForm(res.data.data);
    } catch (err) {
      console.error("Fetch employee error:", err);
      console.error("Error response:", err.response);
      console.error("Error status:", err.response?.status);
      console.error("Error data:", err.response?.data);
      setError(err.response?.data?.msg || "Failed to fetch employee");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployee();
  }, [id]);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setError(""); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      console.log("Updating employee with data:", form);
      await API.put(`/employees/${id}`, form);
      alert("Employee updated successfully!");
      navigate("/employees");
    } catch (err) {
      console.error("Update employee error:", err);
      setError(err.response?.data?.msg || "Failed to update employee");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading employee data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          <i className="fas fa-exclamation-triangle me-2"></i>
          {error}
        </div>
        <button 
          className="btn btn-secondary" 
          onClick={() => navigate("/employees")}
        >
          <i className="fas fa-arrow-left me-2"></i>
          Back to Employees
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow">
            <div className="card-header bg-warning text-dark">
              <h3 className="mb-0">
                <i className="fas fa-edit me-2"></i>
                Edit Employee
              </h3>
            </div>
            <div className="card-body">
              {error && (
                <div className="alert alert-danger" role="alert">
                  <i className="fas fa-exclamation-triangle me-2"></i>
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">
                        <i className="fas fa-user me-2"></i>
                        Full Name *
                      </label>
                      <input
                        className="form-control"
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Enter full name"
                        value={form.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">
                        <i className="fas fa-envelope me-2"></i>
                        Email *
                      </label>
                      <input
                        className="form-control"
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter email address"
                        value={form.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="empno" className="form-label">
                        <i className="fas fa-id-card me-2"></i>
                        Employee Number
                      </label>
                      <input
                        className="form-control"
                        id="empno"
                        name="empno"
                        type="text"
                        placeholder="Enter employee number"
                        value={form.empno}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="phone" className="form-label">
                        <i className="fas fa-phone me-2"></i>
                        Phone Number
                      </label>
                      <input
                        className="form-control"
                        id="phone"
                        name="phone"
                        type="text"
                        placeholder="Enter phone number"
                        value={form.phone}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="designation" className="form-label">
                        <i className="fas fa-briefcase me-2"></i>
                        Designation
                      </label>
                      <input
                        className="form-control"
                        id="designation"
                        name="designation"
                        type="text"
                        placeholder="Enter designation"
                        value={form.designation}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="department" className="form-label">
                        <i className="fas fa-building me-2"></i>
                        Department
                      </label>
                      <input
                        className="form-control"
                        id="department"
                        name="department"
                        type="text"
                        placeholder="Enter department"
                        value={form.department}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                  <button
                    type="button"
                    className="btn btn-secondary me-md-2"
                    onClick={() => navigate("/employees")}
                  >
                    <i className="fas fa-times me-2"></i>
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-warning"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                        Updating...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-save me-2"></i>
                        Update Employee
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditEmployee;
