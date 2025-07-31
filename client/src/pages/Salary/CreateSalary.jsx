import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";

const CreateSalary = () => {
  const navigate = useNavigate();

  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    basic: "",
    allowances: "",
    deductions: "",
    net: "",
    month: "",
    year: "",
    employeeid: "",
  });

  const fetchEmployees = async () => {
    try {
      const res = await API.get("/employees");
      setEmployees(res.data.data);
    } catch (err) {
      setError("Failed to load employees");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(""); // Clear error when user types
  };

  const calculateNet = () => {
    const basic = parseFloat(form.basic) || 0;
    const allowances = parseFloat(form.allowances) || 0;
    const deductions = parseFloat(form.deductions) || 0;
    return basic + allowances - deductions;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const salaryData = {
        ...form,
        net: calculateNet(),
      };

      await API.post("/salaries", salaryData);
      alert("Salary created successfully!");
      navigate("/salaries");
    } catch (err) {
      setError(err.response?.data?.msg || "Failed to create salary");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow">
            <div className="card-header bg-success text-white">
              <h3 className="mb-0">
                <i className="fas fa-money-bill-wave me-2"></i>
                Create Salary Record
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
                      <label htmlFor="employeeid" className="form-label">
                        <i className="fas fa-user me-2"></i>
                        Select Employee *
                      </label>
                      <select
                        className="form-control"
                        id="employeeid"
                        name="employeeid"
                        value={form.employeeid}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Choose an employee...</option>
                        {employees.map((emp) => (
                          <option key={emp._id} value={emp._id}>
                            {emp.name} - {emp.designation || "No designation"}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="month" className="form-label">
                        <i className="fas fa-calendar me-2"></i>
                        Month *
                      </label>
                      <select
                        className="form-control"
                        id="month"
                        name="month"
                        value={form.month}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select month...</option>
                        <option value="January">January</option>
                        <option value="February">February</option>
                        <option value="March">March</option>
                        <option value="April">April</option>
                        <option value="May">May</option>
                        <option value="June">June</option>
                        <option value="July">July</option>
                        <option value="August">August</option>
                        <option value="September">September</option>
                        <option value="October">October</option>
                        <option value="November">November</option>
                        <option value="December">December</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="year" className="form-label">
                        <i className="fas fa-calendar-year me-2"></i>
                        Year *
                      </label>
                      <input
                        className="form-control"
                        id="year"
                        name="year"
                        type="number"
                        placeholder="Enter year (e.g., 2024)"
                        value={form.year}
                        onChange={handleChange}
                        min="2020"
                        max="2030"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="basic" className="form-label">
                        <i className="fas fa-dollar-sign me-2"></i>
                        Basic Salary *
                      </label>
                      <input
                        className="form-control"
                        id="basic"
                        name="basic"
                        type="number"
                        placeholder="Enter basic salary"
                        value={form.basic}
                        onChange={handleChange}
                        min="0"
                        step="0.01"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="allowances" className="form-label">
                        <i className="fas fa-plus-circle me-2"></i>
                        Allowances
                      </label>
                      <input
                        className="form-control"
                        id="allowances"
                        name="allowances"
                        type="number"
                        placeholder="Enter allowances"
                        value={form.allowances}
                        onChange={handleChange}
                        min="0"
                        step="0.01"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="deductions" className="form-label">
                        <i className="fas fa-minus-circle me-2"></i>
                        Deductions
                      </label>
                      <input
                        className="form-control"
                        id="deductions"
                        name="deductions"
                        type="number"
                        placeholder="Enter deductions"
                        value={form.deductions}
                        onChange={handleChange}
                        min="0"
                        step="0.01"
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    <i className="fas fa-calculator me-2"></i>
                    Net Salary (Auto-calculated)
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    value={`₹${calculateNet().toFixed(2)}`}
                    readOnly
                    style={{ backgroundColor: "#f8f9fa" }}
                  />
                </div>

                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                  <button
                    type="button"
                    className="btn btn-secondary me-md-2"
                    onClick={() => navigate("/salaries")}
                  >
                    <i className="fas fa-times me-2"></i>
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-success"
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
                        Create Salary
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

export default CreateSalary;
