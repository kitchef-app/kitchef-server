const { Dish, ProductDish, Category, Product } = require("../models/index");
class Controller {
  static async getDish(req, res, next) {
    try {
      let options = { include: Category };
      const { CategoryId } = req.query;

      if (CategoryId) {
        options = {
          include: Category,
          where: {
            CategoryId,
          },
        };
      }

      const data = await Dish.findAll(options);

      if (data.length === 0) throw { name: "DATA_NOT_FOUND", id: CategoryId, data: "data" };

      res.status(200).json(data);
    } catch (error) {
      next(error);
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
