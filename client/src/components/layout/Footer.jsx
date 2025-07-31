import React from "react";

const Footer = () => {
  return (
    <footer className="bg-light text-center py-3 mt-5">
      <div className="container">
        <p className="mb-0">&copy; 2025 EmpManager. All rights reserved.</p>
        <small>
          <a href="https://github.com/c-mohammed-zaid" className="text-dark me-3">GitHub</a>
          <a href="mailto:mohammedzaid.connect@gmail.com" className="text-dark">Email</a>
        </small>
      </div>
    </footer>
  );
};

export default Footer;