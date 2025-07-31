const mongoose = require("mongoose");

const SalarySchema = new mongoose.Schema({
  basic: { type: Number, default: 0 },
  allowances: { type: Number, default: 0 },
  deductions: { type: Number, default: 0 },
  net: { type: Number, default: 0 },
  month: { type: String, required: true },
  year: { type: Number, required: true },
  employeeid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true
  }
});

module.exports = mongoose.model("Salary", SalarySchema);
