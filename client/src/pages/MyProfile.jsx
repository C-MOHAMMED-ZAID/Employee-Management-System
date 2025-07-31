import React, { useEffect, useState } from "react";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";

const MyProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        // First try to get employee profile
        const res = await API.get("/employees/me");
        setProfile(res.data.data);
      } catch (err) {
        console.error("Profile fetch error:", err);
        // If no employee profile, show user info
        setProfile({
          name: user?.name,
          email: user?.email,
          role: user?.role,
          message: "Employee profile not found. Please contact administrator."
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <h3 className="mb-0">
                <i className="fas fa-user me-2"></i>
                My Profile
              </h3>
            </div>
            <div className="card-body">
              {profile ? (
                <div className="row">
                  <div className="col-md-6">
                    <h5 className="text-primary mb-3">Personal Information</h5>
                    <div className="mb-3">
                      <strong>Name:</strong>
                      <p className="text-muted">{profile.name}</p>
                    </div>
                    <div className="mb-3">
                      <strong>Email:</strong>
                      <p className="text-muted">{profile.email}</p>
                    </div>
                    <div className="mb-3">
                      <strong>Role:</strong>
                      <span className="badge bg-secondary">
                        {profile.userId?.role || profile.role || "N/A"}
                        </span>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <h5 className="text-primary mb-3">Work Information</h5>
                    <div className="mb-3">
                      <strong>Employee Number:</strong>
                      <p className="text-muted">{profile.empno || "Not assigned"}</p>
                    </div>
                    <div className="mb-3">
                      <strong>Phone:</strong>
                      <p className="text-muted">{profile.phone || "Not provided"}</p>
                    </div>
                    <div className="mb-3">
                      <strong>Designation:</strong>
                      <p className="text-muted">{profile.designation || "Not assigned"}</p>
                    </div>
                    <div className="mb-3">
                      <strong>Department:</strong>
                      <p className="text-muted">{profile.department || "Not assigned"}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <i className="fas fa-user-slash fa-3x text-muted mb-3"></i>
                  <p className="text-muted">No profile information available</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
