const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");
require("dotenv").config();

async function createAdminUser() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    // Check if admin user already exists
    const existingAdmin = await User.findOne({ email: "mohammedzaid.connect@gmail.com" });
    
    if (existingAdmin) {
      console.log("Admin user already exists");
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash("12345678", 10);

    // Create admin user
    const adminUser = new User({
      name: "Admin User",
      email: "mohammedzaid.connect@gmail.com",
      password: hashedPassword,
      role: "admin"
    });

    await adminUser.save();
    console.log("Admin user created successfully!");
    console.log("Email: mohammedzaid.connect@gmail.com");
    console.log("Password: 12345678");

  } catch (error) {
    console.error("Error creating admin user:", error);
  } finally {
    mongoose.connection.close();
  }
}

createAdminUser(); 