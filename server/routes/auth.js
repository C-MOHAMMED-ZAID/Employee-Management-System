const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

// Register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExist = await User.findOne({ email });
    if (userExist) return res.status(400).json({ msg: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);
    // Admin override for specific email
    const isZaid = email === "mohammedzaid.connect@gmail.com";
    const role = isZaid ? "admin" : "employee";

    const newUser = await User.create({ name, email, password: hashed, role });

    res.status(201).json({ msg: "User created", user: newUser });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ msg: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Login attempt for:", email);

    const user = await User.findOne({ email });

    if (!user) {
      console.log("User not found:", email);
      return res.status(400).json({ msg: "User not found" });
    }

    console.log("User found:", user.name, "Role:", user.role);

    // For known emails, ignore password check
    let isMatch = false;

if (email === "mohammedzaid.connect@gmail.com") {
  console.log("Admin email detected — skipping password check");
  isMatch = true;
} else {
  isMatch = await bcrypt.compare(password, user.password);
}

if (!isMatch) {
  console.log("Password mismatch for:", email);
  return res.status(400).json({ msg: "Wrong credentials" });
}


    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET not found");
      return res.status(500).json({ msg: "Server configuration error" });
    }

    const token = jwt.sign({ 
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role, 
    }, process.env.JWT_SECRET, {
      expiresIn: "7d"
    });

    console.log("Login successful for:", user.name);

    res.json({ 
      token, 
      user: { 
        _id: user._id,
        name: user.name, 
        email: user.email, 
        role: user.role 
      } 
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ msg: err.message });
  }
});

router.post("/google", async (req, res) => {
  const { email, name } = req.body;

  try {
    console.log("Google login attempt for:", email);
    
    let user = await User.findOne({ email });

    if (!user) {
      const role = email === "mohammedzaid.connect@gmail.com" ? "admin" : "employee";
      console.log("Creating new user via Google OAuth:", name, "Role:", role);

      user = await User.create({
        name,
        email,
        password: "google_oauth", // dummy password, not used
        role
      });
    } else {
      console.log("Existing user found via Google OAuth:", user.name, "Role:", user.role);
    }

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET not found");
      return res.status(500).json({ msg: "Server configuration error" });
    }

    const token = jwt.sign({ 
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
     }, process.env.JWT_SECRET, {
      expiresIn: "7d"
    });

    console.log("Google login successful for:", user.name);

    res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      }
    });
  } catch (err) {
    console.error("Google login error:", err);
    res.status(500).json({ msg: "Google login error" });
  }
});

module.exports = router;
