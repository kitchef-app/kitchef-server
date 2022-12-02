"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class Driver extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Driver.init(
    {
      fullName: DataTypes.STRING,
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      address: DataTypes.TEXT,
      location: DataTypes.GEOMETRY,
      phoneNumber: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Driver",
    }
  );
  Driver.beforeCreate((driver, options) => {
    driver.password = hashPassword(driver.password);
  });

  return Driver;
};
