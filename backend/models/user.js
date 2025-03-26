const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema({
    fullName: String,
    phone: String,
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
    default: { type: Boolean, default: false },
  });
  
  const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    mobile: { type: String },
    profilePicture: { type: String, default: "" },
    addresses: [AddressSchema],
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
    loyaltyPoints: { type: Number, default: 0 },
  });
  
  module.exports = mongoose.model("User", UserSchema);