const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const LoyaltyPoints = sequelize.define("LoyaltyPoints", {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  points: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});

module.exports = LoyaltyPoints;
