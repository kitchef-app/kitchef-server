const { Product, InvoiceProduct } = require("../models/index");
class Controller {
  static async getProduct(req, res, next) {
    const data = await Product.findAll();
    res.status(200).json(data);
    try {
    } catch (error) {}
  }

  static async getInvoiceProduct(req, res, next) {
    try {
      const { InvoiceId } = req.params;
      const data = await InvoiceProduct.findAll({
        where: { InvoiceId },
        include: Product,
      });
      // console.log(data);
      res.status(200).json(data);
    } catch (error) {
      next(error);
      console.log(error);
    }
  }
  static async editStock(req, res, next) {
    const { id } = req.params;
    const { total } = req.body;
    // console.log(id, total, "hehehe");
    try {
      const data = await Product.findByPk(id);

      if (!data) throw { name: "DATA_NOT_FOUND", id, data: "data" };

      const stock = data.stock - total;
      // console.log(stock, "ini stock");
      await Product.update({ stock }, { where: { id } });

      res.status(200).json("berhasil di update");
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
