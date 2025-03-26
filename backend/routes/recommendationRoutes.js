const express = require("express");
const Product = require("../models/Product");
const Order = require("../models/Order");
const Wishlist = require("../models/Wishlist");
const { Op } = require("sequelize");

const router = express.Router();

// Get Personalized Recommendations
router.get("/:userId", async (req, res) => {
  try {
    // Fetch user's orders & wishlist items
    const orders = await Order.findAll({ where: { userId: req.params.userId } });
    const wishlist = await Wishlist.findAll({ where: { userId: req.params.userId } });

    let purchasedCategories = new Set();
    let wishlistCategories = new Set();

    orders.forEach((order) => purchasedCategories.add(order.category));
    wishlist.forEach((item) => wishlistCategories.add(item.category));

    // Recommend products from purchased or wishlist categories
    const recommendedProducts = await Product.findAll({
      where: {
        category: { [Op.or]: [...purchasedCategories, ...wishlistCategories] },
      },
      limit: 10,
    });

    res.json(recommendedProducts);
  } catch (err) {
    res.status(500).json({ error: "Error fetching recommendations" });
  }
});

module.exports = router;
