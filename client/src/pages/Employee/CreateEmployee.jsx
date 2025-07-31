import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";
import { useAuth } from "../../context/AuthContext";

const CreateEmployee = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    empno: "",
    phone: "",
    designation: "",
    department: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

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
      // Create employee without userId requirement
      const employeeData = {
        ...form,
      };

      console.log("Creating employee with data:", employeeData);
      await API.post("/employees", employeeData);
      alert("Employee Created Successfully!");
      navigate("/employees");
    } catch (err) {
      console.error("Create employee error:", err);
      setError(err.response?.data?.msg || "Failed to create employee");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <h3 className="mb-0">
                <i className="fas fa-user-plus me-2"></i>
                Create New Employee
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
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                        Creating...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-save me-2"></i>
                        Create Employee
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

export default CreateEmployee;
