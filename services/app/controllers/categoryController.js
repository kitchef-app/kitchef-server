const { Category, ProductDish, Product } = require("../models/index");

class Controller {
  static async getCategory(req, res, next) {
    try {
      const data = await Category.findAll();
      res.status(200).json(data);
    } catch (error) {}
  }
}

module.exports = Controller;
