const { Invoice, Log, InvoiceProduct } = require("../models/index");
class Controller {
  static async getInvoiceById(req, res, next) {
    console.log("lontong");
    const { id } = req.params;
    console.log(id);
    try {
      const data = await Invoice.findByPk(id);
      console.log(data);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async getInvoiceByUserId(req, res, next) {
    const { UserId } = req.params;
    try {
      const cekid = await Invoice.findByPk(UserId);
      // console.log(cekid);
      if (!cekid) {
        throw { name: "USER_NOT_FOUND" };
      }

      const data = await Invoice.findAll({
        where: { UserId },
        order: [["id", "DESC"]],
      });

      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  static async getInvoiceByDriverId(req, res, next) {
    const { DriverId } = req.params;
    try {
      console.log(DriverId);
      const cekid = await Invoice.findByPk(DriverId);
      // console.log(cekid);
      if (!cekid) {
        throw { name: "USER_NOT_FOUND" };
      }

      const data = await Invoice.findAll({
        where: { DriverId },
        order: [["id", "DESC"]],
      });
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
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

      res.status(201).json({ InvoiceId: invoice.id });
    } catch (error) {
      // console.log(error);
      next(error);
    }
  }

  static async changeStatusInvoice(req, res, next) {
    try {
      const { id } = req.params;
      console.log(req.params);
      const data = await Invoice.update(
        {
          isPaid: "Complete",
          isDelivered: "Ongoing",
        },
        { where: { id } }
      );
      console.log(data);
      if (data[0] === 0) {
        throw { name: "INVOICE_NOT_FOUND" };
      }
      // console.log("ihza");
      res.status(200).json({ msg: "Invoice Success update" });
    } catch (error) {
      next(error);
    }
  }
  static async changeStatusDeliverInvoice(req, res, next) {
    try {
      const { id } = req.params;

      const data = await Invoice.update(
        {
          isDelivered: "Complete",
        },
        { where: { id } }
      );
      if (data[0] === 0) {
        throw { name: "INVOICE_NOT_FOUND" };
      }
      // console.log("galgal");
      res.status(200).json({ msg: "Invoice Success update" });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = Controller;
