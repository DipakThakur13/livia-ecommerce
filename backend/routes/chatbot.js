const express = require("express");
const Order = require("../models/Order");
const router = express.Router();

// AI Chatbot Responses
const responses = {
  "hello": "Hello! How can I assist you today? 😊",
  "how are you": "I'm just a bot, but I'm here to help! 😊",
  "return policy": "We offer a 7-day easy return policy. You can return items from your account section.",
  "shipping time": "Orders are usually delivered within 3-5 business days.",
  "cancel order": "To cancel your order, please go to 'My Orders' and click 'Cancel Order'.",
  "customer care": "You can reach our customer support at support@livia.co.in.",
};

// AI Bot for FAQs & Order Tracking
router.post("/", async (req, res) => {
  try {
    const { userId, message } = req.body;
    const lowerMessage = message.toLowerCase();

    // Check predefined responses
    if (responses[lowerMessage]) {
      return res.json({ reply: responses[lowerMessage] });
    }

    // Order tracking based on user query
    if (lowerMessage.includes("track my order") || lowerMessage.includes("order status")) {
      const order = await Order.findOne({ where: { userId }, order: [["createdAt", "DESC"]] });

      if (order) {
        return res.json({ reply: `Your last order #${order.id} is currently '${order.status}'. 🚚` });
      } else {
        return res.json({ reply: "You have no recent orders to track." });
      }
    }

    // Default response
    return res.json({ reply: "I'm not sure about that. Try asking something else! 🤔" });

  } catch (error) {
    res.status(500).json({ error: "Error processing chatbot request." });
  }
});

module.exports = router;
