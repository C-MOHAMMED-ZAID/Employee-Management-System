const Employee = require("../models/Employee");
const User = require("../models/User");

exports.createEmployee = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "No registered user with this email. Ask them to register first." });
    }

    const existingEmployee = await Employee.findOne({ userId: user._id });
    if (existingEmployee) {
      return res.status(400).json({ msg: "Employee already exists for this user." });
    }

    const newEmp = await Employee.create({
      ...req.body,
      userId: user._id,
    });

    res.json({ msg: "Employee created", data: newEmp });
  } catch (err) {
    console.error('Create employee error:', err);
    res.status(500).json({ msg: err.message });
  }
};


exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find().populate('userId', 'name email role');
    res.json({ data: employees });
  } catch (err) {
    console.error('Get all employees error:', err);
    res.status(500).json({ msg: err.message });
  }
};

exports.getEmployee = async (req, res) => {
  try {
    const emp = await Employee.findById(req.params.id).populate('userId', 'name email role');
    if (!emp) {
      return res.status(404).json({ msg: "Employee not found" });
    }
    res.json({ data: emp });
  } catch (err) {
    console.error('Get employee error:', err);
    res.status(500).json({ msg: err.message });
  }
};

exports.updateEmployee = async (req, res) => {
  try {
    const updated = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ msg: "Employee not found" });
    }
    res.json({ msg: "Updated", data: updated });
  } catch (err) {
    console.error('Update employee error:', err);
    res.status(500).json({ msg: err.message });
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    const deleted = await Employee.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ msg: "Employee not found" });
    }
    res.json({ msg: "Deleted" });
  } catch (err) {
    console.error('Delete employee error:', err);
    res.status(500).json({ msg: err.message });
  }
};

exports.getMyProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const employee = await Employee.findOne({ userId }).populate('userId', 'name email role');
    
    if (!employee) {
      // Return user info if no employee profile exists
      return res.json({ 
        data: {
          name: req.user.name,
          email: req.user.email,
          role: req.user.role,
          message: "Employee profile not found. Please contact administrator."
        }
      });
    }
    
    res.json({ data: employee });
  } catch (err) {
    console.error('Get my profile error:', err);
    res.status(500).json({ msg: err.message });
  }
};
