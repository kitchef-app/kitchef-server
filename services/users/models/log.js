"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Log extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Log.init(
    {
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "UserId cannot be null" },
          notEmpty: { msg: "UserId cannot be empty" },
        },
      },
      messageNotification: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: { msg: "notification cannot be null" },
          notEmpty: { msg: "notification cannot be empty" },
        },
      },
    },
    {
      sequelize,
      modelName: "Log",
    }
  );
  return Log;
};
