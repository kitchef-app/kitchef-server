"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Dish extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Dish.belongsToMany(models.Product, { through: models.ProductDish });
    }
  }
  Dish.init(
    {
      name: DataTypes.STRING,
      CategoryId: DataTypes.STRING,
      videoUrl: DataTypes.TEXT,
      imageUrl: DataTypes.TEXT,
      description: DataTypes.TEXT,
      listIngredients: DataTypes.JSON,
      listTools: DataTypes.JSON,
      steps: DataTypes.JSON,
    },
    {
      sequelize,
      modelName: "Dish",
    }
  );
  return Dish;
};
