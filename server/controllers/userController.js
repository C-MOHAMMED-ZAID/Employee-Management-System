const Employee = require("../models/Employee");
const Salary = require("../models/Salary");

exports.getMyProfile = async (req, res) => {
  try {
    const employee = await Employee.findOne({ userId: req.userId });
    if (!employee) return res.status(404).json({ msg: "Employee not found" });
    res.json(employee);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.getMySalary = async (req, res) => {
  try {
    const employee = await Employee.findOne({ userId: req.userId });
    if (!employee) return res.status(404).json({ msg: "Employee not found" });
    const salary = await Salary.find({ employeeid: employee._id });
    res.json(salary);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};