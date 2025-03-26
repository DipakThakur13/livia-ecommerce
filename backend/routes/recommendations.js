const express = require("express");
const { Op } = require("sequelize");
const Recommendation = require("../models/Recommendation");
const Product = require("../models/Product");
const Order = require("../models/Order");
const User = require("../models/user");

const router = express.Router();

// Fetch AI-Based Recommendations for a User
router.get("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    // Fetch recommended products based on collaborative filtering
    const recommendations = await Recommendation.findAll({
      where: { userId },
      order: [["score", "DESC"]],
      limit: 5,
      include: [Product],
    });

    res.json(recommendations);
  } catch (error) {
    res.status(500).json({ error: "Error fetching recommendations." });
  }
});

// Generate Recommendations (AI Simulation)
router.post("/generate/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    // Fetch past orders
    const pastOrders = await Order.findAll({ where: { userId } });

    // Simulate AI recommendations based on past purchases
    const recommendedProducts = pastOrders.map((order) => ({
      userId,
      productId: order.productId,
      score: Math.random() * 100, // Simulated AI score
    }));

    // Store recommendations
    await Recommendation.bulkCreate(recommendedProducts);

    res.json({ message: "AI Recommendations generated!" });
  } catch (error) {
    res.status(500).json({ error: "Error generating recommendations." });
  }
});

module.exports = router;
