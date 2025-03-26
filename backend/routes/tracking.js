const express = require("express");
const Order = require("../models/Order");

const router = express.Router();

// Get Order Tracking Details
router.get("/:orderId", async (req, res) => {
  try {
    const order = await Order.findOne({ where: { id: req.params.orderId } });

    if (!order) return res.status(404).json({ error: "Order not found" });

    res.json({
      orderId: order.id,
      status: order.status,
      estimatedDelivery: getEstimatedDelivery(order.status, order.createdAt),
      trackingId: order.trackingId || "Not Assigned",
    });
  } catch (error) {
    console.error("Error fetching tracking details:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Function to estimate delivery date
function getEstimatedDelivery(status, createdAt) {
  let estimatedDays = 5; // Default 5 days
  if (status === "Processing") estimatedDays = 7;
  if (status === "Shipped") estimatedDays = 3;
  if (status === "Out for Delivery") estimatedDays = 1;
  
  let deliveryDate = new Date(createdAt);
  deliveryDate.setDate(deliveryDate.getDate() + estimatedDays);
  return deliveryDate.toDateString();
}

module.exports = router;
