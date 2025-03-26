const express = require("express");
const FlashSale = require("../models/FlashSale");
const Product = require("../models/Product");
const router = express.Router();

// Get Active Flash Sales
router.get("/", async (req, res) => {
  try {
    const now = new Date();
    const sales = await FlashSale.findAll({
      where: { startTime: { [Op.lte]: now }, endTime: { [Op.gte]: now } },
      include: [Product],
    });

    res.json(sales);
  } catch (error) {
    res.status(500).json({ error: "Error fetching flash sales" });
  }
});

// Schedule a New Flash Sale (Admin Only)
router.post("/", async (req, res) => {
  try {
    const { productId, discount, startTime, endTime } = req.body;
    const sale = await FlashSale.create({ productId, discount, startTime, endTime });
    res.json({ message: "Flash sale added successfully!", sale });
  } catch (error) {
    res.status(500).json({ error: "Error adding flash sale" });
  }
});

module.exports = router;
