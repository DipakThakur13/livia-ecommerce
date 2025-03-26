const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const authenticate = require("../middleware/authMiddleware");

const router = express.Router();

// Get user profile
router.get("/profile", authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("wishlist orders");
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Error fetching profile" });
  }
});

// Update profile
router.put("/profile", authenticate, async (req, res) => {
  try {
    const { name, mobile, profilePicture } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { name, mobile, profilePicture },
      { new: true }
    );
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Error updating profile" });
  }
});

// Change password
router.put("/profile/password", authenticate, async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = await User.findById(req.user.id);
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    
    if (!isMatch) return res.status(400).json({ error: "Incorrect old password" });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();
    
    res.json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error updating password" });
  }
});

// Manage addresses
router.put("/profile/address", authenticate, async (req, res) => {
  try {
    const { addresses } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { addresses },
      { new: true }
    );
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Error updating address" });
  }
});

module.exports = router;
