const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Admin } = require("../models/Admin");

const router = express.Router();

// Admin Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email });

  if (!admin || !bcrypt.compareSync(password, admin.password)) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ id: admin._id }, "secretKey", { expiresIn: "1h" });
  res.json({ token, admin });
});

// Verify Admin Auth
router.get("/auth", async (req, res) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, "secretKey");
    const admin = await Admin.findById(decoded.id);
    res.json(admin);
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
});

module.exports = router;
