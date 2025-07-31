import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="layout-wrapper">
    <div className="content-wrapper text-center">
      <h1 className="display-4">404</h1>
      <p className="lead">Page not found.</p>
      <Link to="/" className="btn btn-primary">Go Home</Link>
    </div>
  </div>
);

export default NotFound;
