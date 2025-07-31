const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  name: String,
  empno: String,
  phone: String,
  email: String,
  designation: String,
  department: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false
  },
});

module.exports = mongoose.model("Employee", employeeSchema);