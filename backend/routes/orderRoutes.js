const express = require("express");
const Order = require("../models/Order");
const User = require("../models/user");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// Place Order & Add Loyalty Points
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { items, totalAmount, paymentMethod } = req.body;
    const userId = req.user.id;

    const order = new Order({ user: userId, items, totalAmount, paymentMethod });
    await order.save();

    // Calculate loyalty points (1 point per ₹100 spent)
    const pointsEarned = Math.floor(totalAmount / 100);
    await User.findByIdAndUpdate(userId, { $inc: { loyaltyPoints: pointsEarned } });

    res.json({ message: "Order placed successfully!", order, pointsEarned });
  } catch (err) {
    res.status(500).json({ error: "Failed to place order" });
  }
});

// Get User Loyalty Points
router.get("/loyalty", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json({ loyaltyPoints: user.loyaltyPoints });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch loyalty points" });
  }
});

// Update Order Status
router.put("/:orderId/status", async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByPk(req.params.orderId);
    if (!order) return res.status(404).json({ error: "Order not found" });

    order.status = status;
    await order.save();

    res.json({ message: `Order status updated to ${status}` });
  } catch (err) {
    res.status(500).json({ error: "Failed to update order" });
  }
});

// Cancel Order
router.put("/:orderId/cancel", async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.orderId);
    if (!order) return res.status(404).json({ error: "Order not found" });

    if (order.status === "Shipped" || order.status === "Delivered") {
      return res.status(400).json({ error: "Cannot cancel order after shipment" });
    }

    order.status = "Cancelled";
    await order.save();
    res.json({ message: "Order cancelled successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error cancelling order" });
  }
});

module.exports = router;
