const express = require("express");
const LoyaltyPoints = require("../models/LoyaltyPoints");
const User = require("../models/user");

const router = express.Router();

// User Referral Code Generation
router.get("/:userId/generate", async (req, res) => {
  try {
    const referralCode = `LIVIA-${req.params.userId}-${Date.now().toString().slice(-4)}`;
    res.json({ referralCode });
  } catch (error) {
    res.status(500).json({ error: "Error generating referral code" });
  }
});

// Apply Referral Code
router.post("/:userId/apply", async (req, res) => {
  try {
    const { referralCode } = req.body;
    const referredBy = referralCode.split("-")[1];

    if (!referredBy) {
      return res.status(400).json({ error: "Invalid referral code" });
    }

    let referrer = await LoyaltyPoints.findOne({ where: { userId: referredBy } });
    if (!referrer) {
      referrer = await LoyaltyPoints.create({ userId: referredBy, points: 0 });
    }

    referrer.points += 50; // 50 points for referring a new user
    await referrer.save();

    res.json({ message: "Referral applied successfully! Referrer earned 50 points." });
  } catch (error) {
    res.status(500).json({ error: "Error applying referral" });
  }
});

module.exports = router;
