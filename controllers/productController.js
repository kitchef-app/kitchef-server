const { Product } = require("../models/index");
class Controller {
  static async getProduct(req, res, next) {
    const data = await Product.findAll();
    res.status(200).json(data);
    try {
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
