const express = require("express");
const Discount = require("../models/Discount");
const Wishlist = require("../models/Wishlist");
const { v4: uuidv4 } = require("uuid");
const router = express.Router();

// Admin: Add new discount
router.post("/", async (req, res) => {
  try {
    const { code, discountPercent, minPurchase, expiryDate } = req.body;
    const discount = new Discount({ code, discountPercent, minPurchase, expiryDate });
    await discount.save();
    res.json({ message: "Discount added successfully!", discount });
  } catch (err) {
    res.status(500).json({ error: "Failed to create discount" });
  }
});

// Get all discounts
router.get("/", async (req, res) => {
  try {
    const discounts = await Discount.find();
    res.json(discounts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch discounts" });
  }
});

// Generate Discount for Wishlist Items
router.post("/:userId/generate-discount", async (req, res) => {
  try {
    const wishlistItems = await Wishlist.findAll({ where: { userId: req.params.userId } });

    if (wishlistItems.length === 0) {
      return res.status(400).json({ message: "No wishlist items found" });
    }

    const discountCode = uuidv4().slice(0, 8).toUpperCase();
    const discount = await Discount.create({
      userId: req.params.userId,
      code: discountCode,
      discountPercentage: 10, // Default discount for wishlist users
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Valid for 7 days
    });

    res.json({ message: "Discount generated!", code: discountCode });
  } catch (err) {
    res.status(500).json({ error: "Error generating discount" });
  }
});

module.exports = router;
