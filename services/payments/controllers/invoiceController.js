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
    try {
      const { UserId, DriverId, total, subTotal, shippingCost, cart } =
        req.body;
      const isPaid = "belum";
      const isDelivered = "none";
      const invoice = await Invoice.create({
        UserId,
        DriverId,
        isPaid,
        isDelivered,
        total,
        subTotal,
        shippingCost,
      });
      cart.forEach((el) => {
        el.InvoiceId = invoice.id;
      });
      // console.log(cart);

      await InvoiceProduct.bulkCreate(cart);

      res.status(201).json({ msg: "Invoice Success Create" });
    } catch (error) {
      // console.log(error);
      next(error);
    }
  }

  static async changeStatusInvoice(req, res, next) {
    try {
      const { id } = req.params;
      await Invoice.update(
        {
          isPaid: "Complete",
          isDelivered: "Ongoing",
        },
        { where: { id } }
      );

      res.status(200).json({ msg: "Invoice Success update" });
    } catch (error) {
      next(error);
    }
  }
  static async changeStatusDeliverInvoice(req, res, next) {
    try {
      const { id } = req.params;

      await Invoice.update(
        {
          isDelivered: "Complete",
        },
        { where: { id } }
      );

      res.status(200).json("Invoice Success update");
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
