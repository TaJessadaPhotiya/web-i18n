const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const ProductTranslation = sequelize.define(
  "ProductTranslation",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    lang: {
      type: DataTypes.STRING(2),
      allowNull: false,
    },
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
  },
  {
    tableName: "product_translations",
    timestamps: true,
  }
);

module.exports = ProductTranslation;
