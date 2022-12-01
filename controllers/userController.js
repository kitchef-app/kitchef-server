class Controller {
  static getUserById(req, res, next) {
    const { id } = req.params;
    try {
    } catch (error) {
      next(error);
    }
  }
  static userLogin(req, res, next) {
    const {} = req.body;
    try {
    } catch (error) {
      next(error);
    }
  }
  static userRegister(req, res, next) {
    const {} = req.body;
    try {
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
