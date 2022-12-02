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
  static async editStock(req, res, next) {
    const { id } = req.params;
    const { total } = req.body;
    const data = await Product.findByPk(id);
    const stock = data.stock - total;
    await Product.update({ where: { stock } });

    res.status(200).json("berhasil di update");
    try {
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
