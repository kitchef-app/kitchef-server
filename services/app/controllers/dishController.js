const { Dish, ProductDish, Product } = require("../models/index");
class Controller {
  static async getDish(req, res, next) {
    try {
      const { CategoryId } = req.query;
      const data = await Dish.findAll({ where: { CategoryId } });
      res.status(200).json(data);
    } catch (error) {
    }
  }

  static async getDishDetail(req, res, next) {
    const { id } = req.params;
    try {
      const data = await Dish.findByPk(id, { include: [Product] });

      if (!data) throw { name: "DATA_NOT_FOUND", id, data: "data" };

      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
