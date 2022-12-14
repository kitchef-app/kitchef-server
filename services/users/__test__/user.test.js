const { sequelize } = require("../models/index");
const { queryInterface } = sequelize;
const { User } = require("../models/index");
const request = require("supertest");
const app = require("../app");
// const { createToken } = require("../helpers/jwt");

beforeAll(() => {
  queryInterface.bulkDelete(
    "Users",
    {},
    {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    }
  );
  queryInterface.bulkDelete(
    "Drivers",
    {},
    {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    }
  );
});

beforeEach(() => {
  jest.restoreAllMocks();
});

describe("/POST/users/register", () => {
  const objCustomer = {
    fullName: "IdamIdam",
    username: "Idam",
    email: "hahaha@mail.com",
    phoneNumber: "12314135151",
    password: "amanaa",
    address: "disana",
    longitude: "-6.277533",
    latitude: "106.779493",
  };

  test("201 - success add customer", async () => {
    let response = await request(app).post("/users/register").set("Accept", "application/x-www-form-urlencoded").send(objCustomer);

    console.log(response.body, "<<<<<<<<");
    expect(response.statusCode).toBe(201);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("id", 1);
    expect(response.body).toHaveProperty("email", "hahaha@mail.com");
  });

  test("400 - email cannot be null", async () => {
    objCustomer.email = null;
    let response = await request(app).post("/users/register").set("Accept", "application/x-www-form-urlencoded").send(objCustomer);
    console.log(response.body, "<<<<<<<<");
    expect(response.statusCode).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "email cannot be null");
    objCustomer.email = "hahaha@mail.com";
  });

  test("400 - password cannot be empty", async () => {
    objCustomer.password = "";
    let response = await request(app).post("/users/register").set("Accept", "application/x-www-form-urlencoded").send(objCustomer);
    expect(response.statusCode).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "password cannot be empty");
    objCustomer.password = "amanaa";
  });

  test("400 - password cannot be null", async () => {
    objCustomer.password = null;
    let response = await request(app).post("/users/register").set("Accept", "application/x-www-form-urlencoded").send(objCustomer);
    expect(response.statusCode).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "password cannot be null");
    objCustomer.password = "amanaa";
  });

  test("400 - input must be an email format", async () => {
    objCustomer.email = "hahahamail.com";
    let response = await request(app).post("/users/register").set("Accept", "application/x-www-form-urlencoded").send(objCustomer);
    expect(response.statusCode).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "input must be an email format");
    objCustomer.email = "hahaha@mail.com";
  });

  test("400 - email must be unique", async () => {
    objCustomer.username = "Adama";
    objCustomer.email = "hahaha@mail.com";
    let response = await request(app).post("/users/register").set("Accept", "application/x-www-form-urlencoded").send(objCustomer);
    expect(response.statusCode).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "email must be unique");
    objCustomer.email = "hahaha@mail.com";
  });

  test("400 - location cannot be null", async () => {
    objCustomer.longitude = null;
    let response = await request(app).post("/users/register").set("Accept", "application/x-www-form-urlencoded").send(objCustomer);
    console.log(response.body, "<<<<<<<<");
    expect(response.statusCode).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "please input location (longitude & latitude) correctly");
    objCustomer.longitude = "106.779493";
  });
});

describe("POST /users/login", () => {
  const objCustomerLogin = {
    email: "hahaha@mail.com",
    password: "amanaa",
  };

  test("200 - success login customer", async () => {
    let response = await request(app).post("/users/login").set("Accept", "application/x-www-form-urlencoded").send(objCustomerLogin);
    console.log(response.body);
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("access_token", response.body.access_token);
  });

  test("401 - Invalid username or password", async () => {
    objCustomerLogin.password = "amanau";
    let response = await request(app).post("/users/login").set("Accept", "application/x-www-form-urlencoded").send(objCustomerLogin);
    console.log(response.body);
    expect(response.statusCode).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Invalid username or password");
    objCustomerLogin.password = "amanaa";
  });

  test("401 - Invalid username or password", async () => {
    objCustomerLogin.email = "xixixi@mail.com";
    let response = await request(app).post("/users/login").set("Accept", "application/x-www-form-urlencoded").send(objCustomerLogin);
    console.log(response.body);
    expect(response.statusCode).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Invalid username or password");
    objCustomerLogin.email = "hahaha@mail.com";
  });

  test("400 - not inputting email", async () => {
    objCustomerLogin.password = null;
    let response = await request(app).post("/users/login").set("Accept", "application/x-www-form-urlencoded").send(objCustomerLogin);
    expect(response.statusCode).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "input email and password required for login");

    objCustomerLogin.password = "amanaa";
  });
});

describe("/POST/drivers/register", () => {
  const objDriver = {
    fullName: "sudin adin",
    username: "sudin",
    email: "sudin@mail.com",
    phoneNumber: "12314135151",
    password: "amanaa",
    address: "disana",
    longitude: "-6.277533",
    latitude: "106.779493",
  };

  test("201 - success add driver", async () => {
    let response = await request(app).post("/drivers/register").set("Accept", "application/x-www-form-urlencoded").send(objDriver);

    console.log(response.body, "<<<<<<<<");
    expect(response.statusCode).toBe(201);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("id", 1);
    expect(response.body).toHaveProperty("email", "sudin@mail.com");
  });

  test("400 - email cannot be null", async () => {
    objDriver.email = null;
    let response = await request(app).post("/drivers/register").set("Accept", "application/x-www-form-urlencoded").send(objDriver);
    console.log(response.body, "<<<<<<<<");
    expect(response.statusCode).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "email cannot be null");
    objDriver.email = "sudin@mail.com";
  });

  test("400 - password cannot be empty", async () => {
    objDriver.password = "";
    let response = await request(app).post("/drivers/register").set("Accept", "application/x-www-form-urlencoded").send(objDriver);
    expect(response.statusCode).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "password cannot be empty");
    objDriver.password = "amanaa";
  });

  test("400 - password cannot be null", async () => {
    objDriver.password = null;
    let response = await request(app).post("/drivers/register").set("Accept", "application/x-www-form-urlencoded").send(objDriver);
    expect(response.statusCode).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "password cannot be null");
    objDriver.password = "amanaa";
  });

  test("400 - input must be an email format", async () => {
    objDriver.email = "hahahamail.com";
    let response = await request(app).post("/drivers/register").set("Accept", "application/x-www-form-urlencoded").send(objDriver);
    expect(response.statusCode).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "input must be an email format");
    objDriver.email = "sudin@mail.com";
  });

  test("400 - email must be unique", async () => {
    objDriver.username = "Adama";
    objDriver.email = "sudin@mail.com";
    let response = await request(app).post("/drivers/register").set("Accept", "application/x-www-form-urlencoded").send(objDriver);
    expect(response.statusCode).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "email must be unique");
    objDriver.email = "sudin@mail.com";
  });

  test("400 - location cannot be null", async () => {
    objDriver.longitude = null;
    let response = await request(app).post("/drivers/register").set("Accept", "application/x-www-form-urlencoded").send(objDriver);
    console.log(response.body, "<<<<<<<<");
    expect(response.statusCode).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "please input location (longitude & latitude) correctly");
    objDriver.longitude = "106.779493";
  });
});

describe("POST /drivers/login", () => {
  const objDriverLogin = {
    email: "sudin@mail.com",
    password: "amanaa",
  };

  test("200 - success login customer", async () => {
    let response = await request(app).post("/drivers/login").set("Accept", "application/x-www-form-urlencoded").send(objDriverLogin);
    console.log(response.body);
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("access_token", response.body.access_token);
  });

  test("401 - Invalid username or password", async () => {
    objDriverLogin.password = "amanau";
    let response = await request(app).post("/drivers/login").set("Accept", "application/x-www-form-urlencoded").send(objDriverLogin);
    console.log(response.body);
    expect(response.statusCode).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Invalid username or password");
    objDriverLogin.password = "amanaa";
  });

  test("401 - Invalid username or password", async () => {
    objDriverLogin.email = "xixixi@mail.com";
    let response = await request(app).post("/drivers/login").set("Accept", "application/x-www-form-urlencoded").send(objDriverLogin);
    console.log(response.body);
    expect(response.statusCode).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Invalid username or password");
    objDriverLogin.email = "hahaha@mail.com";
  });

  test("400 - not inputting email", async () => {
    objDriverLogin.password = null;
    let response = await request(app).post("/drivers/login").set("Accept", "application/x-www-form-urlencoded").send(objDriverLogin);
    expect(response.statusCode).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "input email and password required for login");

    objDriverLogin.password = "amanaa";
  });
});

describe("GET/users", () => {
  test("200 - success get users", async () => {
    let response = await request(app).get("/users");

    const objCustomer = {
      fullName: "IdamIdam",
      username: "Idam",
      email: "hahaha@mail.com",
      phoneNumber: "12314135151",
      password: "amanaa",
      address: "disana",
      longitude: "-6.277533",
      latitude: "106.779493",
    };

    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body[0]).toHaveProperty("fullName", "IdamIdam");
    expect(response.body[0]).toHaveProperty("username", "Idam");
    expect(response.body[0]).toHaveProperty("email", "hahaha@mail.com");
    expect(response.body[0]).toHaveProperty("phoneNumber", "12314135151");
    expect(response.body[0]).toHaveProperty("address", "disana");
  });

  test("500 - cannot get data", async () => {
    jest.spyOn(User, "findAll").mockRejectedValue("Error");

    let response = await request(app).get("/users");

    expect(response.statusCode).toBe(500);
  });
});

describe("GET/users/:id", () => {
  test("200 - get user by id", async () => {
    let response = await request(app).get("/users/1");

    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("fullName", "IdamIdam");
    expect(response.body).toHaveProperty("username", "Idam");
    expect(response.body).toHaveProperty("email", "hahaha@mail.com");
    expect(response.body).toHaveProperty("phoneNumber", "12314135151");
    expect(response.body).toHaveProperty("address", "disana");
  });

  test("404 - user not found", async () => {
    let response = await request(app).get("/users/22");

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty("message", "user with id 22 is not found");
  });
});

describe("GET/drivers/:id", () => {
  test("200 - get driver by id", async () => {
    let response = await request(app).get("/drivers/1");

    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("fullName", "sudin adin");
    expect(response.body).toHaveProperty("username", "sudin");
    expect(response.body).toHaveProperty("email", "sudin@mail.com");
    expect(response.body).toHaveProperty("phoneNumber", "12314135151");
    expect(response.body).toHaveProperty("address", "disana");
  });

  test("404 - driver not found", async () => {
    let response = await request(app).get("/drivers/22");

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty("message", "driver with id 22 is not found");
  });
});

describe("POST/logs", () => {
  const objLog = {
    messageNotification: "hello world",
    UserId: 1,
    InvoiceId: 1,
  };

  test("201 - success adding invoices", async () => {
    let response = await request(app).post("/logs").set("Accept", "application/x-www-form-urlencoded").send(objLog);

    expect(response.statusCode).toBe(201);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("UserId", 1);
    expect(response.body).toHaveProperty("InvoiceId", 1);
    expect(response.body).toHaveProperty("messageNotification", "hello world");
  });

  test("400 - UserId is null", async () => {
    let response = await request(app).post("/logs").set("Accept", "application/x-www-form-urlencoded").send({
      messageNotification: "hello world",
      UserId: null,
    });

    expect(response.statusCode).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "UserId cannot be null");
  });
});

describe("GET/logs/:UserId", () => {
  test("200 - success get logs", async () => {
    let response = await request(app).get("/logs/1");

    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body[0]).toHaveProperty("UserId", 1);
    expect(response.body[0]).toHaveProperty("InvoiceId", 1);
    expect(response.body[0]).toHaveProperty("messageNotification", "hello world");
  });

  test("404 - cannot get logs", async () => {
    let response = await request(app).get("/logs/99");

    expect(response.statusCode).toBe(404);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "logs with id 99 is not found");
  });
});

describe("PATCH/users/:id", () => {
  test("200 - success update user token", async () => {
    let response = await request(app).patch("/users/1").set("Accept", "application/x-www-form-urlencoded").send({
      token: "testingtoken-xyz",
    });

    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("msg", "berhasil update");
  });

  test("404 - cannot find user", async () => {
    let response = await request(app).patch("/users/99").set("Accept", "application/x-www-form-urlencoded").send({
      token: "testingtoken-xyz",
    });

    expect(response.statusCode).toBe(404);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "user with id 99 is not found");
  });
});

describe("PATCH/drivers/:id", () => {
  test("200 - success update driver token", async () => {
    let response = await request(app).patch("/drivers/1").set("Accept", "application/x-www-form-urlencoded").send({
      token: "testingtoken-xyz",
    });

    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("msg", "berhasil update");
  });

  test("404 - cannot find driver", async () => {
    let response = await request(app).patch("/drivers/99").set("Accept", "application/x-www-form-urlencoded").send({
      token: "testingtoken-xyz",
    });

    expect(response.statusCode).toBe(404);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "user with id 99 is not found");
  });
});
