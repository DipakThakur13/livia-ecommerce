const mongoose = require("mongoose");

const DiscountSchema = new mongoose.Schema({
  code: { type: String, unique: true },
  discountPercent: Number,
  minPurchase: Number,
  expiryDate: Date,
});

module.exports = mongoose.model("Discount", DiscountSchema);
