const { Invoice, Log, InvoiceProduct } = require("../models/index");
class Controller {
  static async getInvoiceByUserId(req, res, next) {
    const { UserId } = req.params;
    try {
      const data = await Invoice.findAll({ where: { UserId } });
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
  static async getInvoiceByDriverId(req, res, next) {
    const { DriverId } = req.params;
    try {
      const data = await Invoice.findAll({ where: { DriverId } });
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
  static async addInvoice(req, res, next) {
    const { UserId, DriverId, total, isPaid, subTotal, shippingCost, cart } =
      req.body;

    const invoice = await Invoice.create({
      UserId,
      DriverId,
      total,
      isPaid,
      subTotal,
      shippingCost,
    });
    cart.forEach((el) => {
      el.InvoiceId = invoice.id;
    });
    console.log(cart);

    await InvoiceProduct.bulkCreate(cart);

    await Log.create({
      UserId,
      messageNotification: "Pesananmu siap dikirim",
    });

    res.status(200).json("Invoice Success Create");

    try {
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
