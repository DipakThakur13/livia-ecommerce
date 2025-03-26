const mongoose = require("mongoose");

const OrderTrackingSchema = new mongoose.Schema({
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true },
  status: { 
    type: String, 
    enum: ["Placed", "Packed", "Shipped", "Out for Delivery", "Delivered", "Cancelled"], 
    default: "Placed" 
  },
  estimatedDelivery: { type: Date },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("OrderTracking", OrderTrackingSchema);
