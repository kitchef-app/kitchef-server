const { Log } = require("../models/index");

class Controller {
  static async createLog(req, res, next) {
    const { messageNotification, UserId, InvoiceId } = req.body;
    try {
      const data = await Log.create({ messageNotification, UserId, InvoiceId });

      res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async getLogs(req, res, next) {
    const { UserId } = req.params;
    try {
      const data = await Log.findAll({ where: { UserId } });

      if (data.length === 0)
        throw { name: "DATA_NOT_FOUND", id: UserId, data: "logs" };

      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
