const mongoose = require("mongoose");

const ReturnSchema = new mongoose.Schema({
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  reason: { type: String, required: true },
  returnOption: { type: String, enum: ["Refund", "Replacement"], required: true },
  status: { type: String, enum: ["Pending", "Approved", "Rejected", "Completed"], default: "Pending" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Return", ReturnSchema);
