const express = require("express");
const router = express.Router();

const faq = {
  "track order": "You can track your order from the 'Orders' section in your profile.",
  "return policy": "You can return items within 30 days of delivery.",
  "cancel order": "Orders can be canceled before they are shipped.",
  "delivery time": "Standard delivery takes 3-5 business days.",
};

router.post("/ask", (req, res) => {
  const { message } = req.body;
  const response = faq[message.toLowerCase()] || "Sorry, I didn't understand that. Contact support for help.";
  res.json({ response });
});

module.exports = router;
