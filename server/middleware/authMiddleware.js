const jwt = require('jsonwebtoken');
const User = require('../models/User');

const requireLogin = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // contains id, name, email, role
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Token invalid' });
  }
};

const requireAdmin = async (req, res, next) => {
  try {
    if (!req.user || req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied: Admins only' });
    }
    next();
  } catch (err) {
    res.status(500).json({ message: 'Middleware error' });
  }
};

module.exports = { requireLogin, requireAdmin };
