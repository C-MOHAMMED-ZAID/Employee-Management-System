const express = require("express");
const router = express.Router();
const { requireLogin, requireAdmin } = require('../middleware/authMiddleware');
const User = require("../models/User");

// Get all users (admin only)
router.get("/", requireLogin, requireAdmin, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json({ data: users });
  } catch (err) {
    console.error('Get users error:', err);
    res.status(500).json({ msg: err.message });
  }
});

// Get user by ID (admin only)
router.get("/:id", requireLogin, requireAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.json({ data: user });
  } catch (err) {
    console.error('Get user error:', err);
    res.status(500).json({ msg: err.message });
  }
});

// Update user (admin only)
router.put("/:id", requireLogin, requireAdmin, async (req, res) => {
  try {
    const { name, email, role } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, role },
      { new: true }
    ).select('-password');
    
    if (!updatedUser) {
      return res.status(404).json({ msg: "User not found" });
    }
    
    res.json({ msg: "User updated", data: updatedUser });
  } catch (err) {
    console.error('Update user error:', err);
    res.status(500).json({ msg: err.message });
  }
});

// Delete user (admin only)
router.delete("/:id", requireLogin, requireAdmin, async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.json({ msg: "User deleted" });
  } catch (err) {
    console.error('Delete user error:', err);
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;
