const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Recommendation = sequelize.define("Recommendation", {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  score: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

module.exports = Recommendation;
