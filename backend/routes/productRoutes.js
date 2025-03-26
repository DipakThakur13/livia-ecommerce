const express = require("express");
const Product = require("../models/Product");
const router = express.Router();

// Search & Filter Products
router.get("/search", async (req, res) => {
  try {
    const { query, category, minPrice, maxPrice, brand, rating } = req.query;
    let filters = {};

    if (query) filters.name = { [Op.like]: `%${query}%` };
    if (category) filters.category = category;
    if (minPrice) filters.price = { [Op.gte]: minPrice };
    if (maxPrice) filters.price = { [Op.lte]: maxPrice };
    if (brand) filters.brand = brand;
    if (rating) filters.rating = { [Op.gte]: rating };

    const products = await Product.findAll({ where: filters });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Error fetching products" });
  }
});

module.exports = router;
