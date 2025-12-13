const user = require("../models/userModel.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    // Validate role if provided
    if (role && !["user", "admin"].includes(role)) {
      return res.status(400).json({ message: "Invalid role. Must be 'user' or 'admin'" });
    }

    const existingUser = await user.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const users = await user.create({
      name,
      email,
      password: hashedPassword,
      role: role || "user", // Default to "user" if not provided
    });
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message || "Registration failed" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const users = await user.findOne({ email });
    if (!users) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, users.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: users._id, role: users.role },
      "supersecretkey",
      { expiresIn: "1d" }
    );

    res.json({ token, role: users.role });
  } catch (err) {
    res.status(500).json({ message: err.message || "Login failed" });
  }
};