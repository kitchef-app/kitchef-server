const { User, Driver, Sequelize } = require("../models/index");
const { comparedPassword } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");

class Controller {
  static async driverLogin(req, res, next) {
    const { email, password } = req.body;
    console.log(email, password);
    try {
      console.log("masuk login pub");
      if (!email || !password) {
        throw { name: "bad_request_login" };
      }
      const foundDriver = await Driver.findOne({
        where: {
          email,
        },
      });

      // console.log(foundDriver, "dari controller pub");

      if (!foundDriver) {
        throw { name: "invalid_credentials" };
      }

      const comparePassword = comparedPassword(password, foundDriver.password);

      // if (foundDriver.role !== "Driver") {
      //   throw { name: "invalid_log_role" };
      // }

      if (!comparePassword) {
        throw { name: "invalid_credentials" };
      }

      const payload = {
        id: foundDriver.id,
      };

      const token = createToken(payload);

      res.status(200).json({
        access_token: token,
        email: foundDriver.email,
        role: foundDriver.role,
        username: foundDriver.username,
        id: foundDriver.id,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async driverRegister(req, res, next) {
    const { fullName, username, email, password, address, phoneNumber, longitude = 0, latitude = 0 } = req.body;
    try {
      if (longitude === 0 || latitude === 0 || !longitude || !latitude) throw { name: "INPUT_LOCATION" };
      const createdDriver = await Driver.create({
        fullName,
        username,
        email,
        password,
        location: Sequelize.fn("ST_GeomFromText", `POINT(${latitude} ${longitude})`),
        phoneNumber,
        address,
      });
      res.status(201).json({
        id: createdDriver.id,
        email: createdDriver.email,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async findDriverById(req, res, next) {
    const { id } = req.params;
    try {
      const driver = await Driver.findByPk(id);

      if (!driver) throw { name: "DATA_NOT_FOUND", data: "driver", id };

      res.status(200).json(driver);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
