"use strict";
const fs = require("fs");
const { Sequelize } = require("../models/index");
const { hashPassword } = require("../helpers/bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    const dataUsers = JSON.parse(fs.readFileSync("./data/users.json", "utf-8"));
    // console.log(dataDish);

    dataUsers.forEach((e) => {
      e.location = Sequelize.fn("ST_GeomFromText", `POINT(${e.location})`);
      // console.log(e.location);
      e.password = hashPassword(e.password);
      e.createdAt = e.updatedAt = new Date();
    });
    // console.log(dataDish);
    await queryInterface.bulkInsert("Users", dataUsers);

    const dataDrivers = JSON.parse(
      fs.readFileSync("./data/drivers.json", "utf-8")
    );
    // console.log(dataDish);

    dataDrivers.forEach((e) => {
      e.location = Sequelize.fn("ST_GeomFromText", `POINT(${e.location})`);
      // console.log(e.location);
      e.password = hashPassword(e.password);
      e.createdAt = e.updatedAt = new Date();
    });
    // console.log(dataDish);
    await queryInterface.bulkInsert("Drivers", dataDrivers);

    const dataCategoryUser = JSON.parse(
      fs.readFileSync("./data/categoryUser.json", "utf-8")
    );
    // console.log(dataDish);

    dataCategoryUser.forEach((e) => {
      e.createdAt = e.updatedAt = new Date();
    });
    // console.log(dataDish);
    await queryInterface.bulkInsert("CategoryUsers", dataCategoryUser);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Users", null, {});
  },
};
