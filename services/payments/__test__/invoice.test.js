const { sequelize } = require("../models/index");
const { queryInterface } = sequelize;
const request = require("supertest");
const app = require("../app");
// const { createToken } = require("../");

beforeAll(() => {
  // queryInterface.bulkDelete(
  //   "Invoices",
  //   {},
  //   {
  //     truncate: true,
  //     cascade: true,
  //     restartIdentity: true,
  //   }
  // );

  const fs = require("fs");
  let dataInvoices = JSON.parse(fs.readFileSync("./data/invoices.json"));
  dataInvoices.forEach((el) => {
    delete el.id;
    el.createdAt = new Date();
    el.updatedAt = new Date();
  });

  queryInterface.bulkInsert("Invoices", dataInvoices);
});

afterAll(() => {
  queryInterface.bulkDelete(
    "Invoices",
    {},
    {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    }
  );
});

describe("/invoices", () => {
  const objInvoice = {
    UserId: 1,
    DriverId: 1,
    total: 1000,
    subTotal: 2000,
    shippingCost: 1000,
    cart: [
      { InvoicesId: 1, ProductId: 1, total: 5 },
      { InvoicesId: 1, ProductId: 2, total: 4 },
    ],
  };

  test("201 - success add customer", async () => {
    let response = await request(app)
      .post("/invoices")
      .set("Accept", "application/x-www-form-urlencoded")
      .send(objInvoice);

    // console.log(response.body, "<<<<<<<<");
    expect(response.statusCode).toBe(201);

    expect(response.body).toBeInstanceOf(Object);
    // expect(response.body.msg).toBe("Invoice Success Create");

    // expect(response.body).toHaveProperty("id", 1);
    // expect(response.body).toHaveProperty("email", "hahaha@mail.com");
  });

  test("200 - success change status ispaid complete", async () => {
    let response = await request(app)
      .put("/invoices/statusPaid/2")
      .set("Accept", "application/x-www-form-urlencoded")
      .send(objInvoice);

    // console.log(response.body, "<<<<<<<<");
    expect(response.statusCode).toBe(200);

    expect(response.body).toBeInstanceOf(Object);
    expect(response.body.msg).toBe("Invoice Success update");

    // expect(response.body).toHaveProperty("id", 1);
    // expect(response.body).toHaveProperty("email", "hahaha@mail.com");
  });

  test("200 - success change status isDelivere complete ", async () => {
    let response = await request(app)
      .put("/invoices/statusDeliveredComplete/2")
      .set("Accept", "application/x-www-form-urlencoded");
    // .send(objInvoice);

    // console.log(response.body, "<<<<<<<<");
    expect(response.statusCode).toBe(200);

    expect(response.body).toBeInstanceOf(Object);
    expect(response.body.msg).toBe("Invoice Success update");

    // expect(response.body).toHaveProperty("id", 1);
    // expect(response.body).toHaveProperty("email", "hahaha@mail.com");
  });

  test("200 - success get all invoice by UserId ", async () => {
    let response = await request(app)
      .get("/invoices/users/1")
      .set("Accept", "application/x-www-form-urlencoded");
    // .send(objInvoice);
    // console.log(response.body, "<<<<<<<<");
    expect(response.statusCode).toBe(200);

    expect(response.body).toBeInstanceOf(Object);
    expect(Array.isArray(response.body));
    expect(response.body[0]).toHaveProperty("id", 1);
    expect(response.body[0]).toHaveProperty("UserId", 1);
    expect(response.body[0]).toHaveProperty("DriverId", 1);
    expect(response.body[0]).toHaveProperty("total", 9000);
    expect(response.body[0]).toHaveProperty("isPaid", "lunas");
    expect(response.body[0]).toHaveProperty("isDelivered", "complete");
    expect(response.body[0]).toHaveProperty("subTotal", 8000);
    expect(response.body[0]).toHaveProperty("shippingCost", 1000);
  });

  test("200 - success get all invoice by DriverID ", async () => {
    let response = await request(app)
      .get("/invoices/drivers/1")
      .set("Accept", "application/x-www-form-urlencoded");
    // .send(objInvoice);

    // console.log(response.body, "<<<<<<<<");
    expect(response.statusCode).toBe(200);

    expect(response.body).toBeInstanceOf(Object);
    expect(Array.isArray(response.body));
    expect(response.body[0]).toHaveProperty("id", 1);
    expect(response.body[0]).toHaveProperty("UserId", 1);
    expect(response.body[0]).toHaveProperty("DriverId", 1);
    expect(response.body[0]).toHaveProperty("total", 9000);
    expect(response.body[0]).toHaveProperty("isPaid", "lunas");
    expect(response.body[0]).toHaveProperty("isDelivered", "complete");
    expect(response.body[0]).toHaveProperty("subTotal", 8000);
    expect(response.body[0]).toHaveProperty("shippingCost", 1000);
  });

  test("400 - UserId cannot be empty", async () => {
    objInvoice.UserId = "";
    // console.log("Ppppppppppppppppppppppppppppppp");
    let response = await request(app)
      .post("/invoices")
      .set("Accept", "application/x-www-form-urlencoded")
      .send(objInvoice);
    // console.log(response);
    // console.log(response.body, "<<<<<<<<");
    // console.log(response.statusCode, "<<<<<<<<");
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "UserId cannot Empty");
    // objCustomer.email = "hahaha@mail.com";
  });
  test("400 - UserId cannot be Null", async () => {
    objInvoice.UserId = null;
    console.log("Ppppppppppppppppppppppppppppppp");
    let response = await request(app)
      .post("/invoices")
      .set("Accept", "application/x-www-form-urlencoded")
      .send(objInvoice);
    // console.log(response);
    // console.log(response.body, "<<<<<<<<");
    // console.log(response.statusCode, "<<<<<<<<");
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "UserId cannot Null");
    // objCustomer.email = "hahaha@mail.com";
  });
  test("400 - DriverId cannot be empty", async () => {
    objInvoice.UserId = "1";
    objInvoice.DriverId = "";
    // console.log("Ppppppppppppppppppppppppppppppp");
    console.log(objInvoice);
    let response = await request(app)
      .post("/invoices")
      .set("Accept", "application/x-www-form-urlencoded")
      .send(objInvoice);
    // console.log(response);
    // console.log(response.body, "<<<<<<<<");
    // console.log(response.body, "<<<<<<<<");
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "DriverId cannot Empty");
  });
  test("400 - DriverId cannot be Null", async () => {
    objInvoice.UserId = "1";
    objInvoice.DriverId = null;
    // console.log("Ppppppppppppppppppppppppppppppp");
    console.log(objInvoice);
    let response = await request(app)
      .post("/invoices")
      .set("Accept", "application/x-www-form-urlencoded")
      .send(objInvoice);
    // console.log(response);
    // console.log(response.body, "<<<<<<<<");
    // console.log(response.body, "<<<<<<<<");
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "DriverId cannot Null");
  });
  test("400 - total cannot be Null", async () => {
    // objInvoice.UserId = "1";
    objInvoice.DriverId = "1";
    objInvoice.total = null;
    // console.log("Ppppppppppppppppppppppppppppppp");
    console.log(objInvoice);
    let response = await request(app)
      .post("/invoices")
      .set("Accept", "application/x-www-form-urlencoded")
      .send(objInvoice);
    // console.log(response);
    // console.log(response.body, "<<<<<<<<");
    // console.log(response.body, "<<<<<<<<");
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "total cannot Null");
  });

  test("400 - total cannot be Empty", async () => {
    // objInvoice.UserId = "1";
    objInvoice.DriverId = "1";
    objInvoice.total = "";
    // console.log("Ppppppppppppppppppppppppppppppp");
    console.log(objInvoice);
    let response = await request(app)
      .post("/invoices")
      .set("Accept", "application/x-www-form-urlencoded")
      .send(objInvoice);
    // console.log(response);
    // console.log(response.body, "<<<<<<<<");
    // console.log(response.body, "<<<<<<<<");
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "total cannot Empty");
  });
  test("400 - subtotal cannot be Null", async () => {
    // objInvoice.UserId = "1";
    // objInvoice.DriverId = "1";
    objInvoice.total = "1000";
    objInvoice.subTotal = null;
    // console.log("Ppppppppppppppppppppppppppppppp");
    console.log(objInvoice);
    let response = await request(app)
      .post("/invoices")
      .set("Accept", "application/x-www-form-urlencoded")
      .send(objInvoice);
    // console.log(response);
    // console.log(response.body, "<<<<<<<<");
    // console.log(response.body, "<<<<<<<<");
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "subTotal cannot Null");
  });

  test("400 - subtotal cannot be Empty", async () => {
    // objInvoice.UserId = "1";
    // objInvoice.DriverId = "1";
    objInvoice.total = "1000";
    objInvoice.subTotal = "";
    // console.log("Ppppppppppppppppppppppppppppppp");
    console.log(objInvoice);
    let response = await request(app)
      .post("/invoices")
      .set("Accept", "application/x-www-form-urlencoded")
      .send(objInvoice);
    // console.log(response);
    // console.log(response.body, "<<<<<<<<");
    // console.log(response.body, "<<<<<<<<");
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "subTotal cannot Empty");
  });
  test("400 - shippingCost cannot be Null", async () => {
    // objInvoice.UserId = "1";
    // objInvoice.DriverId = "1";
    // objInvoice.total = "1000";
    objInvoice.subTotal = "500";
    objInvoice.shippingCost = null;
    // console.log("Ppppppppppppppppppppppppppppppp");
    console.log(objInvoice);
    let response = await request(app)
      .post("/invoices")
      .set("Accept", "application/x-www-form-urlencoded")
      .send(objInvoice);
    // console.log(response);
    // console.log(response.body, "<<<<<<<<");
    // console.log(response.body, "<<<<<<<<");
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "shippingCost cannot Null");
  });

  test("400 - shippingCost cannot be Empty", async () => {
    // objInvoice.UserId = "1";
    // objInvoice.DriverId = "1";
    // objInvoice.total = "1000";
    objInvoice.subTotal = "500";
    objInvoice.shippingCost = "";
    // console.log("Ppppppppppppppppppppppppppppppp");
    console.log(objInvoice);
    let response = await request(app)
      .post("/invoices")
      .set("Accept", "application/x-www-form-urlencoded")
      .send(objInvoice);
    // console.log(response);
    // console.log(response.body, "<<<<<<<<");
    // console.log(response.body, "<<<<<<<<");
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty(
      "message",
      "shippingCost cannot Empty"
    );
  });

  test("404 - change Status with id not found", async () => {
    // console.log("Ppppppppppppppppppppppppppppppp");
    console.log(objInvoice);
    let response = await request(app)
      .put("/invoices/statusPaid/99")
      .set("Accept", "application/x-www-form-urlencoded");
    // .send(objInvoice);
    // console.log(response);
    // console.log(response.body, "<<<<<<<<");
    console.log(response.body, "<<<<<<<<");
    expect(response.status).toBe(404);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "INVOICE_NOT_FOUND");
  });
  test("404 - change Status deliver with id not found", async () => {
    // console.log("Ppppppppppppppppppppppppppppppp");
    console.log(objInvoice);
    let response = await request(app)
      .put("/invoices/statusDeliveredComplete/99")
      .set("Accept", "application/x-www-form-urlencoded");
    // .send(objInvoice);
    // console.log(response);
    // console.log(response.body, "<<<<<<<<");
    console.log(response.body, "<<<<<<<<");
    expect(response.status).toBe(404);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "INVOICE_NOT_FOUND");
  });

  test("404 - change Status deliver with id not found", async () => {
    // console.log("Ppppppppppppppppppppppppppppppp");
    console.log(objInvoice);
    let response = await request(app)
      .put("/invoices/statusDeliveredComplete/99")
      .set("Accept", "application/x-www-form-urlencoded");
    // .send(objInvoice);
    // console.log(response);
    // console.log(response.body, "<<<<<<<<");
    console.log(response.body, "<<<<<<<<");
    expect(response.status).toBe(404);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "INVOICE_NOT_FOUND");
  });
  test("404 - Get All Invoice By UserId", async () => {
    // console.log("Ppppppppppppppppppppppppppppppp");
    console.log(objInvoice);
    let response = await request(app)
      .get("/invoices/users/99")
      .set("Accept", "application/x-www-form-urlencoded");
    // .send(objInvoice);
    // console.log(response);
    // console.log(response.body, "<<<<<<<<");
    console.log(response.body, "<<<<<<<<");
    expect(response.status).toBe(404);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "USER_NOT_FOUND");
  });
  test("404 - Get All Invoice By DriverId", async () => {
    // console.log("Ppppppppppppppppppppppppppppppp");
    console.log(objInvoice);
    let response = await request(app)
      .get("/invoices/drivers/99")
      .set("Accept", "application/x-www-form-urlencoded");
    // .send(objInvoice);
    // console.log(response);
    // console.log(response.body, "<<<<<<<<");
    console.log(response.body, "<<<<<<<<");
    expect(response.status).toBe(404);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "USER_NOT_FOUND");
  });

  test("200 - Get All Invoice By DriverId", async () => {
    // console.log("Ppppppppppppppppppppppppppppppp");
    // console.log(objInvoice);
    let response = await request(app)
      .post("/payments")
      .set("Accept", "application/x-www-form-urlencoded")
      .send({ gross_amount: 1000 });
    // console.log(response);
    // console.log(response.body, "<<<<<<<<");
    console.log(response.body, "<<<<<<<<");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    // expect(response.body).toHaveProperty("message", "amount cannot 0");
  });
  test("400 - Get All Invoice By DriverId", async () => {
    // console.log("Ppppppppppppppppppppppppppppppp");
    // console.log(objInvoice);
    let response = await request(app)
      .post("/payments")
      .set("Accept", "application/x-www-form-urlencoded")
      .send({ gross_amount: 0 });
    // console.log(response);
    // console.log(response.body, "<<<<<<<<");
    console.log(response.body, "<<<<<<<<");
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "amount cannot 0");
  });
});