const { User, Driver, Sequelize } = require("../models/index");
const { comparedPassword } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");

class Controller {
  static async userLogin(req, res, next) {
    const { email, password } = req.body;
    try {
      if (!email || !password) {
        throw { name: "bad_request_login" };
      }
      const foundUser = await User.findOne({
        where: {
          email,
        },
      });

      // console.log(foundUser, "dari controller pub");

      if (!foundUser) {
        throw { name: "invalid_credentials" };
      }

      const comparePassword = comparedPassword(password, foundUser.password);

      // if (foundUser.role !== "user") {
      //   throw { name: "invalid_log_role" };
      // }

      if (!comparePassword) {
        throw { name: "invalid_credentials" };
      }

      const payload = {
        id: foundUser.id,
      };

      const token = createToken(payload);

      res.status(200).json({
        access_token: token,
        email: foundUser.email,
        role: foundUser.role,
        username: foundUser.username,
        id: foundUser.id,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async userRegister(req, res, next) {
    const {
      fullName,
      username,
      email,
      password,
      address,
      phoneNumber,
      longitude = 0,
      latitude = 0,
    } = req.body;
    let role = "user";
    try {
      if (longitude === 0 || latitude === 0 || !longitude || !latitude)
        throw { name: "INPUT_LOCATION" };
      const createdUser = await User.create({
        fullName,
        username,
        email,
        password,
        role,
        location: Sequelize.fn(
          "ST_GeomFromText",
          `POINT(${latitude} ${longitude})`
        ),
        phoneNumber,
        address,
      });
      res.status(201).json({
        id: createdUser.id,
        email: createdUser.email,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async findUserById(req, res, next) {
    console.log("lontonf");
    const { id } = req.params;
    try {
      const user = await User.findByPk(id);

      if (!user) throw { name: "DATA_NOT_FOUND", data: "user", id };

      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
