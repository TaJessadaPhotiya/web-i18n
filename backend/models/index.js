const sequelize = require("../config/db");
const Product = require("./ProductModel");
const ProductTranslation = require("./ProductTranslation");

// ตั้งค่า relations
Product.hasMany(ProductTranslation, {
  foreignKey: "product_id",
  as: "translations",
});
ProductTranslation.belongsTo(Product, {
  foreignKey: "product_id",
});

module.exports = {
  sequelize,
  Product,
  ProductTranslation,
};
