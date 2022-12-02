const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models/index");

async function authenticate(req, res, next) {
  try {
    let access_token = req.headers.access_token;
    if (!access_token) {
      throw { name: "Unauthorized" };
    }
    let payload = verifyToken(access_token);
    let user = await User.findByPk(payload.id);

    if (!user) {
      throw { name: "Unauthorized" };
    }

    req.user = {
      id: user.id,
      email: user.email,
      username: user.username,
    };

    next();
  } catch (error) {
    next(error);
  }
}

module.exports = authenticate;
