const { Log } = require("../models/index");

class Controller {
  static async createLog(req, res, next) {
    const { messageNotification, UserId } = req.body;
    try {
      const data = await Log.create({ messageNotification, UserId });

      res.status(201).json({ UserId: data.UserId, messageNotification: data.messageNotification });
    } catch (error) {
      next(error);
    }
  }

  static async getLogs(req, res, next) {
    const { UserId } = req.params;
    try {
      const data = await Log.findAll({ where: { UserId } });

      res.status(200).json(data)
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
