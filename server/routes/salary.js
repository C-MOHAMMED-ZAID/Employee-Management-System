const express = require("express");
const router = express.Router();
const { requireLogin, requireAdmin } = require('../middleware/authMiddleware');
const sal = require("../controllers/salaryController");

// Admin routes
router.post("/", requireLogin, requireAdmin, sal.createSalary);
router.get("/", requireLogin, requireAdmin, sal.getAllSalaries);
router.put("/:id", requireLogin, requireAdmin, sal.updateSalary);
router.delete("/:id", requireLogin, requireAdmin, sal.deleteSalary);

// Employee routes
router.get("/me", requireLogin, sal.getMySalary);
router.get("/:id", requireLogin, sal.getSalary);

module.exports = router;
