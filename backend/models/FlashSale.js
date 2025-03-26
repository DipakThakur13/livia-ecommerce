const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const FlashSale = sequelize.define("FlashSale", {
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  discount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  startTime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  endTime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

module.exports = FlashSale;
