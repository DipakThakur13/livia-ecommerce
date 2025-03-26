const express = require("express");
const LoyaltyPoints = require("../models/LoyaltyPoints");

const router = express.Router();

// Get User's Loyalty Points
router.get("/:userId", async (req, res) => {
  try {
    const loyalty = await LoyaltyPoints.findOne({ where: { userId: req.params.userId } });
    res.json({ points: loyalty ? loyalty.points : 0 });
  } catch (error) {
    res.status(500).json({ error: "Error fetching points" });
  }
});

// Redeem Points for Discounts
router.post("/:userId/redeem", async (req, res) => {
  try {
    const { pointsToRedeem } = req.body;
    let loyalty = await LoyaltyPoints.findOne({ where: { userId: req.params.userId } });

    if (!loyalty || loyalty.points < pointsToRedeem) {
      return res.status(400).json({ error: "Not enough points" });
    }

    loyalty.points -= pointsToRedeem;
    await loyalty.save();

    let discountAmount = pointsToRedeem * 2; // ₹2 discount per point
    res.json({ message: "Points redeemed successfully!", discountAmount });
  } catch (error) {
    res.status(500).json({ error: "Error redeeming points" });
  }
});

module.exports = router;
