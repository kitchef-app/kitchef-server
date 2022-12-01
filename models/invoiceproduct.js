"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class InvoiceProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  InvoiceProduct.init(
    {
      InvoiceId: DataTypes.INTEGER,
      ProductId: DataTypes.INTEGER,
      total: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "InvoiceProduct",
    }
  );
  return InvoiceProduct;
};
