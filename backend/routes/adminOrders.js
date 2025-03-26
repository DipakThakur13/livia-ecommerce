const express = require("express");
const Order = require("../models/Order");
const router = express.Router();

// Get All Orders for Admin
router.get("/", async (req, res) => {
  try {
    const orders = await Order.findAll({ order: [["createdAt", "DESC"]] });
    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Update Order Status (Processing, Shipped, Delivered, Cancelled)
router.put("/update/:orderId", async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findOne({ where: { id: req.params.orderId } });

    if (!order) return res.status(404).json({ error: "Order not found" });

    // Ensure valid status update
    const validStatuses = ["Processing", "Shipped", "Delivered", "Cancelled"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: "Invalid order status" });
    }

    order.status = status;
    await order.save();

    res.json({ message: "Order status updated successfully", order });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Get Orders by Status (Filter)
router.get("/status/:status", async (req, res) => {
  try {
    const orders = await Order.findAll({ where: { status: req.params.status } });
    res.json(orders);
  } catch (error) {
    console.error("Error filtering orders:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
