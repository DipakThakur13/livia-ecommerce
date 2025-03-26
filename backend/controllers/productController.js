const Product = require('../models/Product');

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: "Error fetching products" });
    }
};

exports.createProduct = async (req, res) => {
    try {
        const { name, description, price, stock, image } = req.body;
        const product = await Product.create({ name, description, price, stock, image });
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ error: "Error creating product" });
    }
};
