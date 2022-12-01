class Controller {
  static getDish(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }

  static getDishDetail(req, res, next) {
    const { id } = req.params;
    try {
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
