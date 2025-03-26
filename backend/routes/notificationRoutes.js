const express = require("express");
const admin = require("firebase-admin");

const router = express.Router();

// Send Push Notification
router.post("/send", async (req, res) => {
  try {
    const { title, body, token } = req.body;

    const message = {
      notification: { title, body },
      token,
    };

    await admin.messaging().send(message);
    res.json({ message: "Notification sent!" });
  } catch (err) {
    res.status(500).json({ error: "Error sending notification" });
  }
});

module.exports = router;
