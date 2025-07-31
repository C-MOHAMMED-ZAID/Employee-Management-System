import React from "react";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import animationData from "../assets/animation.json"; 


const Home = () => {
  return (
    <div className="container text-center mt-5">
      <h1 className="display-4">Welcome to EmpManager Portal</h1>
      <p className="lead">Manage your employees and their salaries efficiently</p>

      <div className="mt-4">
        <Link to="/login" className="btn btn-primary me-3">Login</Link>
        <Link to="/register" className="btn btn-success me-3">Register</Link>
        <Link to="/dashboard" className="btn btn-outline-dark">Dashboard</Link>
      </div>

      <div className="mt-5" style={{ maxWidth: "600px", margin: "0 auto" }}>
        <Lottie animationData={animationData} loop={true} />
      </div>
    </div>
  );
};

export default Home;