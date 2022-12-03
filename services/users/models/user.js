"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "full name cannot be null" },
          notEmpty: { msg: "full name cannot be empty" },
        },
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "username cannot be null" },
          notEmpty: { msg: "username cannot be empty" },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: { msg: "email must be unique" },
        validate: {
          isEmail: { msg: "input must be an email format" },
          notNull: { msg: "email cannot be null" },
          notEmpty: { msg: "email cannot be empty" },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "password cannot be null" },
          notEmpty: { msg: "password cannot be empty" },
        },
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: { msg: "address cannot be null" },
          notEmpty: { msg: "address cannot be empty" },
        },
      },
      location: {
        type: DataTypes.GEOMETRY,
        allowNull: false,
        validate: {
          notNull: { msg: "location cannot be null" },
          notEmpty: { msg: "location cannot be empty" },
        },
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "phone number cannot be null" },
          notEmpty: { msg: "phone number cannot be empty" },
        },
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "role cannot be null" },
          notEmpty: { msg: "role cannot be empty" },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  User.beforeCreate((user, options) => {
    user.password = hashPassword(user.password);
  });

  return User;
};
