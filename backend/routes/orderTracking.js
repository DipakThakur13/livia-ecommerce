const express = require("express");
const OrderTracking = require("../models/OrderTracking");
const Order = require("../models/Order");
const sendNotification = require("../utils/notifyUser");
const router = express.Router();

// Create a new tracking entry
router.post("/", async (req, res) => {
  try {
    const { orderId, estimatedDelivery } = req.body;
    const tracking = await OrderTracking.create({ orderId, estimatedDelivery });
    res.json(tracking);
  } catch (error) {
    res.status(500).json({ error: "Error creating order tracking" });
  }
});

// Get tracking info by order ID
router.get("/:orderId", async (req, res) => {
  try {
    const tracking = await OrderTracking.findOne({ orderId: req.params.orderId });
    if (!tracking) return res.status(404).json({ error: "Tracking not found" });
    res.json(tracking);
  } catch (error) {
    res.status(500).json({ error: "Error fetching tracking details" });
  }
});

// Update order status (Admin Panel)
router.put("/:orderId", async (req, res) => {
  try {
    const { status } = req.body;
    const tracking = await OrderTracking.findOneAndUpdate(
      { orderId: req.params.orderId },
      { status, updatedAt: Date.now() },
      { new: true }
    );
    res.json(tracking);
  } catch (error) {
    res.status(500).json({ error: "Error updating order status" });
  }
});

//Order Status Send Notification
router.put("/:orderId", async (req, res) => {
    try {
      const { status } = req.body;
      const tracking = await OrderTracking.findOneAndUpdate(
        { orderId: req.params.orderId },
        { status, updatedAt: Date.now() },
        { new: true }
      );
  
      sendNotification(tracking.userId, `Your order is now ${status}`);
  
      res.json(tracking);
    } catch (error) {
      res.status(500).json({ error: "Error updating order status" });
    }
  });

module.exports = router;
