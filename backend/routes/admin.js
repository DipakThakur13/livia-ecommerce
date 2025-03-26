const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const dotenv = require("dotenv");
const User = require("../models/user");
const Product = require("../models/Product");
const Order = require("../models/Order");
const FlashSale = require("../models/FlashSale");

dotenv.config();
const router = express.Router();
const SECRET_KEY = process.env.JWT_SECRET;

// Middleware to verify admin
const verifyAdmin = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, SECRET_KEY);
    const admin = await User.findOne({ where: { id: decoded.id, role: "admin" } });

    if (!admin) return res.status(403).json({ error: "Access denied. Admins only." });

    req.admin = admin;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token." });
  }
};

/* =======================
   🛒 PRODUCT MANAGEMENT 
   ======================= */
// Add a new product
router.post("/products", verifyAdmin, async (req, res) => {
  try {
    const { name, price, image, category, stock } = req.body;
    const product = await Product.create({ name, price, image, category, stock });
    res.json({ message: "Product added successfully!", product });
  } catch (error) {
    res.status(500).json({ error: "Error adding product." });
  }
});

// Update a product
router.put("/products/:id", verifyAdmin, async (req, res) => {
  try {
    const { name, price, image, category, stock } = req.body;
    await Product.update({ name, price, image, category, stock }, { where: { id: req.params.id } });
    res.json({ message: "Product updated successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Error updating product." });
  }
});

// Delete a product
router.delete("/products/:id", verifyAdmin, async (req, res) => {
  try {
    await Product.destroy({ where: { id: req.params.id } });
    res.json({ message: "Product deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting product." });
  }
});

/* =======================
   👥 USER MANAGEMENT 
   ======================= */
// Get all users
router.get("/users", verifyAdmin, async (req, res) => {
  try {
    const users = await User.findAll({ attributes: ["id", "name", "email", "role", "createdAt"] });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Error fetching users." });
  }
});

// Delete a user
router.delete("/users/:id", verifyAdmin, async (req, res) => {
  try {
    await User.destroy({ where: { id: req.params.id } });
    res.json({ message: "User deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting user." });
  }
});

/* =======================
   📦 ORDER MANAGEMENT 
   ======================= */
// Get all orders
router.get("/orders", verifyAdmin, async (req, res) => {
  try {
    const orders = await Order.findAll({ order: [["createdAt", "DESC"]] });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "Error fetching orders." });
  }
});

// Update order status
router.put("/orders/:id", verifyAdmin, async (req, res) => {
  try {
    const { status } = req.body;
    await Order.update({ status }, { where: { id: req.params.id } });
    res.json({ message: "Order status updated successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Error updating order status." });
  }
});

/* =======================
   ⚡ FLASH SALES MANAGEMENT 
   ======================= */
// Get all active flash sales
router.get("/flash-sales", async (req, res) => {
  try {
    const now = new Date();
    const sales = await FlashSale.findAll({
      where: { startTime: { [Op.lte]: now }, endTime: { [Op.gte]: now } },
      include: [Product],
    });
    res.json(sales);
  } catch (error) {
    res.status(500).json({ error: "Error fetching flash sales." });
  }
});

// Add a flash sale
router.post("/flash-sales", verifyAdmin, async (req, res) => {
  try {
    const { productId, discount, startTime, endTime } = req.body;
    const sale = await FlashSale.create({ productId, discount, startTime, endTime });
    res.json({ message: "Flash sale added successfully!", sale });
  } catch (error) {
    res.status(500).json({ error: "Error adding flash sale." });
  }
});

// Delete a flash sale
router.delete("/flash-sales/:id", verifyAdmin, async (req, res) => {
  try {
    await FlashSale.destroy({ where: { id: req.params.id } });
    res.json({ message: "Flash sale removed successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Error removing flash sale." });
  }
});

/* =======================
   📅 EVENT SALES MANAGEMENT 
   ======================= */
// Schedule Event Sale (Festival, Black Friday, etc.)
router.post("/schedule-sale", verifyAdmin, async (req, res) => {
  try {
    const { products, discount, startTime, endTime } = req.body;

    for (const productId of products) {
      await FlashSale.create({ productId, discount, startTime, endTime });
    }

    res.json({ message: "Event sale scheduled successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Error scheduling event sale." });
  }
});

module.exports = router;
