const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Product = sequelize.define("Product", {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
  price: { type: DataTypes.FLOAT, allowNull: false },
  brand: { type: DataTypes.STRING, allowNull: false },
  category: { type: DataTypes.STRING, allowNull: false },
  stock: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  discount: { type: DataTypes.FLOAT, defaultValue: 0 },
  images: { type: DataTypes.JSON, allowNull: false }, // Stores multiple images
  rating: { type: DataTypes.FLOAT, defaultValue: 0 },
  reviewsCount: { type: DataTypes.INTEGER, defaultValue: 0 },
});

module.exports = Product;
