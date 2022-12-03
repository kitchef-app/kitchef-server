"use strict";
const fs = require("fs");

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

    const dataInvoice = JSON.parse(
      fs.readFileSync("./data/invoices.json", "utf-8")
    );
    // console.log(dataDish);

    dataInvoice.forEach((e) => {
      e.createdAt = e.updatedAt = new Date();
    });
    // console.log(dataDish);
    await queryInterface.bulkInsert("Invoices", dataInvoice);

    const dataInvoiceProduct = JSON.parse(
      fs.readFileSync("./data/invoiceProduct.json", "utf-8")
    );
    // console.log(dataDish);

    dataInvoiceProduct.forEach((e) => {
      e.createdAt = e.updatedAt = new Date();
    });
    // console.log(dataDish);
    await queryInterface.bulkInsert("InvoiceProducts", dataInvoiceProduct);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
