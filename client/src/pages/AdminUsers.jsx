import React, { useEffect, useState } from "react";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await API.get("/users");
      setUsers(res.data.data);
    } catch (err) {
      setError(err.response?.data?.msg || "Failed to fetch users");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await API.delete(`/users/${userId}`);
      alert("User deleted successfully!");
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.msg || "Failed to delete user");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>
          <i className="fas fa-user-cog me-2"></i>
          User Management
        </h2>
        <div className="text-muted">
          Total Users: {users.length}
        </div>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          <i className="fas fa-exclamation-triangle me-2"></i>
          {error}
        </div>
      )}

      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">
            <i className="fas fa-users me-2"></i>
            All Registered Users
          </h5>
        </div>
        <div className="card-body">
          {users.length > 0 ? (
            <div className="table-responsive">
              <table className="table table-striped table-hover">
                <thead className="table-dark">
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={user._id}>
                      <td>{index + 1}</td>
                      <td>
                        <i className="fas fa-user me-2"></i>
                        {user.name}
                      </td>
                      <td>
                        <i className="fas fa-envelope me-2"></i>
                        {user.email}
                      </td>
                      <td>
                        <span className={`badge ${user.role === 'admin' ? 'bg-danger' : 'bg-secondary'}`}>
                          <i className={`fas ${user.role === 'admin' ? 'fa-crown' : 'fa-user'} me-1`}></i>
                          {user.role}
                        </span>
                      </td>
                      <td>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDeleteUser(user._id)}
                          disabled={user.role === 'admin'}
                          title={user.role === 'admin' ? 'Cannot delete admin user' : 'Delete user'}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center">
              <i className="fas fa-users fa-3x text-muted mb-3"></i>
              <p className="text-muted">No users found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
