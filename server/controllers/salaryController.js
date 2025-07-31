const Salary = require("../models/Salary");
const Employee = require("../models/Employee");

exports.createSalary = async (req, res) => {
  try {
    // Calculate net salary
    const basic = parseFloat(req.body.basic) || 0;
    const allowances = parseFloat(req.body.allowances) || 0;
    const deductions = parseFloat(req.body.deductions) || 0;
    const net = basic + allowances - deductions;

    const salaryData = {
      ...req.body,
      net: net
    };

    const salary = await Salary.create(salaryData);
    res.json({ msg: "Salary created", data: salary });
  } catch (err) {
    console.error('Create salary error:', err);
    res.status(500).json({ msg: err.message });
  }
};

exports.getAllSalaries = async (req, res) => {
  try {
    const salaries = await Salary.find().populate("employeeid");
    res.json({ data: salaries });
  } catch (err) {
    console.error('Get all salaries error:', err);
    res.status(500).json({ msg: err.message });
  }
};

exports.getSalary = async (req, res) => {
  try {
    const salary = await Salary.findById(req.params.id).populate("employeeid");
    if (!salary) {
      return res.status(404).json({ msg: "Salary not found" });
    }
    res.json({ data: salary });
  } catch (err) {
    console.error('Get salary error:', err);
    res.status(500).json({ msg: err.message });
  }
};

exports.updateSalary = async (req, res) => {
  try {
    // Calculate net salary
    const basic = parseFloat(req.body.basic) || 0;
    const allowances = parseFloat(req.body.allowances) || 0;
    const deductions = parseFloat(req.body.deductions) || 0;
    const net = basic + allowances - deductions;

    const salaryData = {
      ...req.body,
      net: net
    };

    const updated = await Salary.findByIdAndUpdate(req.params.id, salaryData, { new: true });
    if (!updated) {
      return res.status(404).json({ msg: "Salary not found" });
    }
    res.json({ msg: "Updated", data: updated });
  } catch (err) {
    console.error('Update salary error:', err);
    res.status(500).json({ msg: err.message });
  }
};

exports.deleteSalary = async (req, res) => {
  try {
    const deleted = await Salary.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ msg: "Salary not found" });
    }
    res.json({ msg: "Deleted" });
  } catch (err) {
    console.error('Delete salary error:', err);
    res.status(500).json({ msg: err.message });
  }
};

exports.getMySalary = async (req, res) => {
  try {
    const userId = req.user._id;
    
    // Find employee profile for this user
    const employee = await Employee.findOne({ userId });
    if (!employee) {
      return res.status(404).json({ msg: "Employee profile not found" });
    }
    
    // Find salary for this employee
    const salary = await Salary.findOne({ employeeid: employee._id }).populate("employeeid");
    if (!salary) {
      return res.status(404).json({ msg: "Salary not found for this employee" });
    }
    
    res.json({ data: salary });
  } catch (err) {
    console.error('Get my salary error:', err);
    res.status(500).json({ msg: err.message });
  }
};
