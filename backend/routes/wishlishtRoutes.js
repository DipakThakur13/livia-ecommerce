const express = require("express");
const Wishlist = require("../models/Wishlist");
const router = express.Router();

// Add to Wishlist
router.post("/:userId/add", async (req, res) => {
  try {
    const { productId } = req.body;
    const wishlistItem = await Wishlist.create({ userId: req.params.userId, productId });
    res.json(wishlistItem);
  } catch (err) {
    res.status(500).json({ error: "Error adding to wishlist" });
  }
});

// Get Wishlist
router.get("/:userId", async (req, res) => {
  try {
    const wishlist = await Wishlist.findAll({ where: { userId: req.params.userId } });
    res.json(wishlist);
  } catch (err) {
    res.status(500).json({ error: "Error fetching wishlist" });
  }
});

module.exports = router;
