const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.js');

const router = express.Router();

// User Registration
router.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    
    User.findByEmail(email, (err, results) => {
        if (results.length > 0) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = bcrypt.hashSync(password, 10);
        User.create(name, email, hashedPassword, (err, result) => {
            if (err) return res.status(500).json(err);
            res.status(201).json({ message: "User registered successfully" });
        });
    });
});

// User Login
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    User.findByEmail(email, (err, results) => {
        if (results.length === 0) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const user = results[0];
        const isMatch = bcrypt.compareSync(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
    });
});

module.exports = router;
