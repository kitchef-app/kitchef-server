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

    const dataDish = JSON.parse(fs.readFileSync("./data/dishes.json", "utf-8"));
    // console.log(dataDish);

    dataDish.forEach((e) => {
      delete e.id;
      e.listIngredients = JSON.stringify(e.listIngredients);
      e.listTools = JSON.stringify(e.listTools);
      e.steps = JSON.stringify(e.steps);
      e.createdAt = e.updatedAt = new Date();
    });
    // console.log(dataDish);
    await queryInterface.bulkInsert("Dishes", dataDish);

    const dataProduct = JSON.parse(
      fs.readFileSync("./data/products.json", "utf-8")
    );
    // console.log(dataDish);
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
    dataProduct.forEach((e) => {
      delete e.id;
      e.createdAt = e.updatedAt = new Date();
    });
    // console.log(dataDish);
    await queryInterface.bulkInsert("Products", dataProduct);

    const dataProductDish = JSON.parse(
      fs.readFileSync("./data/productDish.json", "utf-8")
    );
    // console.log(dataDish);

    dataProductDish.forEach((e) => {
      delete e.id;
      e.createdAt = e.updatedAt = new Date();
    });
    // console.log(dataDish);
    await queryInterface.bulkInsert("ProductDishes", dataProductDish);

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
    await queryInterface.bulkDelete("Dishes", null, {});
  },
};
