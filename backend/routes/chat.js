const express = require("express");
const Chat = require("../models/Chat");
const router = express.Router();

// Get chat history for a user
router.get("/:userId", async (req, res) => {
  try {
    const chatHistory = await Chat.findAll({ where: { userId: req.params.userId } });
    res.json(chatHistory);
  } catch (error) {
    res.status(500).json({ error: "Error fetching chat history." });
  }
});

// Store a new chat message
router.post("/", async (req, res) => {
  try {
    const { userId, message, sender } = req.body;
    const chat = await Chat.create({ userId, message, sender });
    res.json(chat);
  } catch (error) {
    res.status(500).json({ error: "Error sending message." });
  }
});

module.exports = router;
