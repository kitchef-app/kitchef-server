class Controller {
  static getInvoiceByUserId(req, res, next) {
    const { userId } = req.params;
    try {
    } catch (error) {
      next(error);
    }
  }
  static getInvoiceByDriverId(req, res, next) {
    const { driverId } = req.params;
    try {
    } catch (error) {
      next(error);
    }
  }
  static addInvoice(req, res, next) {
    const {} = req.body;
    try {
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
