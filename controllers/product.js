const { Product } = require("../models/index");
class Controller {
  static async readAllProduct(req, res, next) {
    try {
      const allProduct = await Product.findAll();
      res.status(200).json(allProduct);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
