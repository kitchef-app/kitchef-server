"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Invoice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Invoice.init(
    {
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { msg: "UserId cannot Empty" },
          notNull: { msg: "UserId cannot Null" },
        },
      },
      DriverId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { msg: "DriverId cannot Empty" },
          notNull: { msg: "DriverId cannot Null" },
        },
      },
      total: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { msg: "total cannot Empty" },
          notNull: { msg: "total cannot Null" },
        },
      },
      isPaid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { msg: "isPaid cannot Empty" },
          notNull: { msg: "isPaid cannot Null" },
        },
      },
      isDelivered: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { msg: "isDelivered cannot Empty" },
          notNull: { msg: "isDelivered cannot Null" },
        },
      },
      subTotal: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { msg: "subTotal cannot Empty" },
          notNull: { msg: "subTotal cannot Null" },
        },
      },
      shippingCost: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { msg: "shippingCost cannot Empty" },
          notNull: { msg: "shippingCost cannot Null" },
        },
      },
    },
    {
      sequelize,
      modelName: "Invoice",
    }
  );
  return Invoice;
};
