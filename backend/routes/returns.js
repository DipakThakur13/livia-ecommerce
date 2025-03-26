const express = require("express");
const Return = require("../models/Return");
const Order = require("../models/Order");

const router = express.Router();

// Request a Return
router.post("/", async (req, res) => {
  try {
    const { orderId, userId, reason, returnOption } = req.body;

    const existingOrder = await Order.findById(orderId);
    if (!existingOrder) return res.status(400).json({ error: "Order not found" });

    const returnRequest = await Return.create({ orderId, userId, reason, returnOption });
    res.json({ message: "Return request submitted!", returnRequest });
  } catch (error) {
    res.status(500).json({ error: "Error processing return request" });
  }
});

// Get Return Requests for a User
router.get("/:userId", async (req, res) => {
  try {
    const returns = await Return.find({ userId: req.params.userId }).populate("orderId");
    res.json(returns);
  } catch (error) {
    res.status(500).json({ error: "Error fetching returns" });
  }
});

// Update Return Status (Admin Only)
router.put("/:returnId", async (req, res) => {
  try {
    const { status } = req.body;
    await Return.findByIdAndUpdate(req.params.returnId, { status });
    res.json({ message: "Return status updated successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Error updating return status" });
  }
});

module.exports = router;
