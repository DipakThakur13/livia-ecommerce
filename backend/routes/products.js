const express = require("express");
const Product = require("../models/Product");
const { Op } = require("sequelize");

const router = express.Router();

// Get product by ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Calculate Discount Percentage
    product.discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Get recommended products
router.get("/recommended/:id", async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const recommended = await Product.findAll({
      where: { category: product.category, id: { [Op.ne]: product.id } },
      limit: 6,
    });

    res.json(recommended);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
