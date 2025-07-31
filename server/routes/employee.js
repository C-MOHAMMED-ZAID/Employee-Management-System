const express = require("express");
const router = express.Router();
const { requireLogin, requireAdmin } = require('../middleware/authMiddleware');
const emp = require("../controllers/employeeController");

// Employee routes (must come first to avoid conflicts with /:id)
router.get("/me", requireLogin, emp.getMyProfile);

// Admin routes
router.post("/", requireLogin, requireAdmin, emp.createEmployee);
router.get("/", requireLogin, requireAdmin, emp.getAllEmployees);
router.get("/:id", requireLogin, requireAdmin, emp.getEmployee);
router.put("/:id", requireLogin, requireAdmin, emp.updateEmployee);
router.delete("/:id", requireLogin, requireAdmin, emp.deleteEmployee);

module.exports = router;
