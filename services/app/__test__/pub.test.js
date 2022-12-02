const { sequelize } = require("../models/index");
const { queryInterface } = sequelize;
const request = require("supertest");
const app = require("../app");
const { createToken } = require("../helpers/jwt");

beforeAll(() => {
  queryInterface.bulkDelete(
    "Customers",
    {},
    {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    }
  );

  const fs = require("fs");
  let dataMovies = JSON.parse(fs.readFileSync("./data/movie.json"));
  dataMovies.forEach((el) => {
    delete el.id;
    el.createdAt = new Date();
    el.updatedAt = new Date();
  });

  queryInterface.bulkInsert("Movies", dataMovies);
});

afterAll(() => {
  queryInterface.bulkDelete(
    "Movies",
    {},
    {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    }
  );
});

describe("/POST/pub/register", () => {
  const objCustomer = {
    username: "Idam",
    email: "hahaha@mail.com",
    role: "customer",
    phoneNumber: "12314135151",
    password: "amanaa",
    address: "disana",
  };

  test("201 - success add customer", async () => {
    let response = await request(app).post("/pub/register").set("Accept", "application/x-www-form-urlencoded").send(objCustomer);

    console.log(response.body, "<<<<<<<<");
    expect(response.statusCode).toBe(201);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("id", 1);
    expect(response.body).toHaveProperty("email", "hahaha@mail.com");
  });

  test("400 - email cannot be empty", async () => {
    objCustomer.email = "";
    let response = await request(app).post("/pub/register").set("Accept", "application/x-www-form-urlencoded").send(objCustomer);
    console.log(response.body, "<<<<<<<<");
    expect(response.statusCode).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "email cannot be empty");
    objCustomer.email = "hahaha@mail.com";
  });

  test("400 - email cannot be null", async () => {
    objCustomer.email = null;
    let response = await request(app).post("/pub/register").set("Accept", "application/x-www-form-urlencoded").send(objCustomer);
    console.log(response.body, "<<<<<<<<");
    expect(response.statusCode).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "email cannot be null");
    objCustomer.email = "hahaha@mail.com";
  });

  test("400 - password cannot be empty", async () => {
    objCustomer.password = "";
    let response = await request(app).post("/pub/register").set("Accept", "application/x-www-form-urlencoded").send(objCustomer);
    expect(response.statusCode).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "password cannot be empty");
    objCustomer.password = "amanaa";
  });

  test("400 - password cannot be null", async () => {
    objCustomer.password = null;
    let response = await request(app).post("/pub/register").set("Accept", "application/x-www-form-urlencoded").send(objCustomer);
    expect(response.statusCode).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "password cannot be null");
    objCustomer.password = "amanaa";
  });

  test("400 - input must be an email format", async () => {
    objCustomer.email = "hahahamail.com";
    let response = await request(app).post("/pub/register").set("Accept", "application/x-www-form-urlencoded").send(objCustomer);
    expect(response.statusCode).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "input must be an email format");
    objCustomer.email = "hahaha@mail.com";
  });

  test("400 - email must be unique", async () => {
    objCustomer.username = "Adama";
    objCustomer.email = "hahaha@mail.com";
    let response = await request(app).post("/pub/register").set("Accept", "application/x-www-form-urlencoded").send(objCustomer);
    expect(response.statusCode).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "email must be unique");
    objCustomer.email = "hahaha@mail.com";
  });
});

describe("POST /pub/login", () => {
  const objCustomerLogin = {
    email: "hahaha@mail.com",
    password: "amanaa",
  };

  test("200 - success login customer", async () => {
    let response = await request(app).post("/pub/login").set("Accept", "application/x-www-form-urlencoded").send(objCustomerLogin);
    console.log(response.body);
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("access_token", response.body.access_token);
  });

  test("401 - Invalid username or password", async () => {
    objCustomerLogin.password = "amanau";
    let response = await request(app).post("/pub/login").set("Accept", "application/x-www-form-urlencoded").send(objCustomerLogin);
    console.log(response.body);
    expect(response.statusCode).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Invalid username or password");
    objCustomerLogin.password = "amanaa";
  });

  test("401 - Invalid username or password", async () => {
    objCustomerLogin.email = "xixixi@mail.com";
    let response = await request(app).post("/pub/login").set("Accept", "application/x-www-form-urlencoded").send(objCustomerLogin);
    console.log(response.body);
    expect(response.statusCode).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Invalid username or password");
    objCustomerLogin.email = "hahaha@mail.com";
  });
});

describe("Get /pub/", () => {
  test("test ok 200 all movies", async () => {
    let response = await request(app).get("/pub");
    console.log(response.body);
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("count");
    expect(response.body).toHaveProperty("rows");
    expect(response.body.rows[0]).toBeInstanceOf(Object);
    expect(response.body.rows[0]).toHaveProperty("id");
    expect(response.body.rows[0]).toHaveProperty("title");
    expect(response.body.rows[0]).toHaveProperty("synopsis");
    expect(response.body.rows[0]).toHaveProperty("trailerUrl");
    expect(response.body.rows[0]).toHaveProperty("imgUrl");
    expect(response.body.rows[0]).toHaveProperty("rating");
    expect(response.body.rows[0]).toHaveProperty("authorId");
    expect(response.body.rows[0]).toHaveProperty("genreId");
    expect(response.body.rows[0]).toHaveProperty("status");
    expect(response.body.rows[0]).toHaveProperty("createdAt");
    expect(response.body.rows[0]).toHaveProperty("updatedAt");
  });
});
describe("Get /pub/ with search", () => {
  test("test ok 200 all movies with search", async () => {
    let response = await request(app).get("/pub?search=Dumb");
    console.log(response.body);
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("count");
    expect(response.body).toHaveProperty("rows");
    expect(response.body.rows[0]).toBeInstanceOf(Object);
    expect(response.body.rows[0]).toHaveProperty("title", "Van Dumb");
  });
  describe("Get /pub/ movies length", () => {
    test("test ok 200 all movies", async () => {
      let response = await request(app).get("/pub?page[size]=5");
      console.log(response.body);
      expect(response.statusCode).toBe(200);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("count");
      expect(response.body).toHaveProperty("rows");
      expect(response.body.rows).toHaveLength(5);
    });
  });
  test("test ok 200 movie detail", async () => {
    let response = await request(app).get("/pub/movies/12");
    console.log(response.body);
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("id", 12);
  });

  test("test ok 400 cannot get movie detail (Not Found)", async () => {
    let response = await request(app).get("/pub/movies/27");
    console.log(response.body);
    expect(response.statusCode).toBe(404);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Movie with id 27 is not found");
  });
});

describe("/pub/bookmarks", () => {
  const payload = { id: 1, email: "hahaha@mail.com" };
  const token = createToken(payload);
  test("ok get all bookmarks", async () => {
    let response = await request(app).get("/pub/bookmarks").set("access_token", `${token}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
  test("Unathorize cannot get all bookmarks", async () => {
    let response = await request(app).get("/pub/bookmarks");
    expect(response.statusCode).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Please Login Firsts");
  });

  test("error cannot add bookmark", async () => {
    let response = await request(app).post("/pub/bookmarks/60").set("access_token", `${token}`);
    expect(response.statusCode).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Cannot get bookmark because of movie doesnt exist");
  });

  test("ok add bookmark", async () => {
    let response = await request(app).post("/pub/bookmarks/1").set("access_token", `${token}`);
    expect(response.statusCode).toBe(201);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Success adding bookmark for customer 1");
  });

  test("Unauthorize add bookmark", async () => {
    let response = await request(app).post("/pub/bookmarks/1").set("access_token", `hehehee`);
    expect(response.statusCode).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Please Login Firsts");
  });
});

// Cannot get bookmark because of movie doesnt exist
// test("function penjumlahan 1 + 2 adalah 3", () => {
//   expect(funcionPpenjumlahan(1, 2));
//   expected(value).toBe("3");
// });
