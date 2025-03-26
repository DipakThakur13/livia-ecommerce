const express = require("express");
const Review = require("../models/Review");
const router = express.Router();

router.post("/:productId", async (req, res) => {
  const { rating, comment } = req.body;
  const userId = req.user.id;
  
  const review = new Review({ user: userId, product: req.params.productId, rating, comment });
  await review.save();

  res.json({ message: "Review submitted successfully!" });
});

router.get("/:productId", async (req, res) => {
  const reviews = await Review.find({ product: req.params.productId }).populate("user", "name");
  res.json(reviews);
});

module.exports = router;
