const express = require("express");
const Order = require("../models/Order");
const LoyaltyPoints = require("../models/LoyaltyPoints");
const User = require("../models/user");

const router = express.Router();

// Place Order & Earn Loyalty Points
router.post("/", async (req, res) => {
  try {
    const { userId, items, paymentMethod, totalAmount } = req.body;
    if (!userId || !items || !paymentMethod || !totalAmount) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Check user exists
    const user = await User.findOne({ where: { id: userId } });
    if (!user) return res.status(404).json({ error: "User not found" });

    // Order Creation
    const order = await Order.create({ userId, items, paymentMethod, totalAmount, status: "Placed" });

    // Earn 1 point per ₹100 spent
    let earnedPoints = Math.floor(totalAmount / 100);
    let loyalty = await LoyaltyPoints.findOne({ where: { userId } });

    if (!loyalty) {
      loyalty = await LoyaltyPoints.create({ userId, points: 0 });
    }
    loyalty.points += earnedPoints;
    await loyalty.save();

    res.status(201).json({
      message: "Order placed successfully!",
      orderId: order.id,
      earnedPoints,
      status: "Placed",
    });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Get User Orders (Order History)
router.get("/:userId", async (req, res) => {
  try {
    const orders = await Order.findAll({ where: { userId }, order: [["createdAt", "DESC"]] });
    if (!orders.length) return res.status(404).json({ message: "No orders found" });

    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Get Order Details
router.get("/details/:orderId", async (req, res) => {
  try {
    const order = await Order.findOne({ where: { id: req.params.orderId } });
    if (!order) return res.status(404).json({ error: "Order not found" });

    res.json(order);
  } catch (error) {
    console.error("Error fetching order details:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Cancel Order (Allowed within 2 hours of placement)
router.put("/cancel/:orderId", async (req, res) => {
  try {
    const order = await Order.findOne({ where: { id: req.params.orderId } });
    if (!order) return res.status(404).json({ error: "Order not found" });

    const timeDifference = (new Date() - new Date(order.createdAt)) / 3600000; // Convert to hours
    if (timeDifference > 2) {
      return res.status(400).json({ error: "Cancellation period expired (2 hours)" });
    }

    order.status = "Cancelled";
    await order.save();

    res.json({ message: "Order cancelled successfully", orderId: order.id });
  } catch (error) {
    console.error("Error cancelling order:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Get Loyalty Points
router.get("/loyalty/:userId", async (req, res) => {
  try {
    const loyalty = await LoyaltyPoints.findOne({ where: { userId } });
    if (!loyalty) return res.status(404).json({ message: "No loyalty points found" });

    res.json({ points: loyalty.points });
  } catch (error) {
    console.error("Error fetching loyalty points:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
