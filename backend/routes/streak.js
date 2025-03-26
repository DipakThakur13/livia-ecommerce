const express = require("express");
const Order = require("../models/Order");

const router = express.Router();

// Check User's Shopping Streak
router.get("/:userId/streak", async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: { userId: req.params.userId },
      order: [["createdAt", "DESC"]],
      limit: 3,
    });

    if (orders.length < 3) {
      return res.json({ streakActive: false, discount: 0 });
    }

    let discount = 10; // ₹10 discount for streak shoppers
    res.json({ streakActive: true, discount });
  } catch (error) {
    res.status(500).json({ error: "Error checking streak" });
  }
});

module.exports = router;
