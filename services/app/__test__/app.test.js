const { sequelize } = require("../models/index");
const { queryInterface } = sequelize;
const request = require("supertest");
const app = require("../app");
const fs = require("fs");

beforeAll(() => {
  queryInterface.bulkDelete(
    "Categories",
    {},
    {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    }
  );
  queryInterface.bulkDelete(
    "Products",
    {},
    {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    }
  );
  queryInterface.bulkDelete(
    "Dishes",
    {},
    {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    }
  );

  // ini data category

  let dataCategories = JSON.parse(fs.readFileSync("./data/categories.json", "utf-8"));

  dataCategories.forEach((el) => {
    delete el.id;
    el.createdAt = new Date();
    el.updatedAt = new Date();
  });

  queryInterface.bulkInsert("Categories", dataCategories);

  // ini data products

  let dataProducts = JSON.parse(fs.readFileSync("./data/products.json", "utf-8"));

  dataProducts.forEach((e) => {
    delete e.id;
    e.createdAt = e.updatedAt = new Date();
  });

  queryInterface.bulkInsert("Products", dataProducts);

  // ini data dishes

  let dataDishes = JSON.parse(fs.readFileSync("./data/dishes.json", "utf-8"));

  dataDishes.forEach((e) => {
    delete e.id;
    e.listIngredients = JSON.stringify(e.listIngredients);
    e.listTools = JSON.stringify(e.listTools);
    e.steps = JSON.stringify(e.steps);
    e.createdAt = e.updatedAt = new Date();
  });
  queryInterface.bulkInsert("Dishes", dataDishes);
});
// afterAll(() => {});

describe("GET/categories", () => {
  test("200 - success getting all categories", async () => {
    let response = await request(app).get("/categories");

    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body[0]).toHaveProperty("name", "Masakan Indonesia");
    expect(response.body[0]).toHaveProperty("imageUrl", "https://img-global.cpcdn.com/recipes/fc61c7ff25651d8e/312x200cq70/photo.jpg");
  });
});

describe("/GET/products", () => {
  test("200 - success getting products data", async () => {
    let response = await request(app).get("/products");

    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body[0]).toHaveProperty("name", "Fiber Creame");
    expect(response.body[0]).toHaveProperty("price", 2000);
    expect(response.body[0]).toHaveProperty("stock", 10);
    expect(response.body[0]).toHaveProperty("imageUrl", "https://cf.shopee.co.id/file/805d410a993c7e772683cd4d4af9034d");
    expect(response.body[0]).toHaveProperty("description", "blablablablabla");
  });
});

describe("POST/products/stok/:id", () => {
  test("200 - success updating stock", async () => {
    let response = await request(app).put("/products/stok/1").set("Accept", "application/x-www-form-urlencoded").send({ total: 1 });

    expect(response.statusCode).toBe(200);
    expect(response.body).toBe("berhasil di update");
  });

  test("404 - data product not found", async () => {
    let response = await request(app).put("/products/stok/40").set("Accept", "application/x-www-form-urlencoded").send({ total: 1 });

    expect(response.statusCode).toBe(404);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "data with id 40 is not found");
  });
});

describe("GET/dishes", () => {
  test("200 - success fetching dishes", async () => {
    let response = await request(app).get("/dishes?CategoryId=1");

    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body[0]).toHaveProperty("name", "Gudeg Sehat");
    expect(response.body[0]).toHaveProperty("CategoryId", 1);
    expect(response.body[0]).toHaveProperty("videoUrl", "https://www.youtube.com/watch?v=Ofkv5fOqtOY");
    expect(response.body[0]).toHaveProperty("description", "Gudeg sehat dengan bumbu yang sedikit. Namun hasilnya tetap tidak kalah dengan gudeg asli");
    expect(response.body[0].listIngredients).toBeInstanceOf(Array);
    expect(response.body[0].listTools).toBeInstanceOf(Array);
  });
});

describe("GET/dishes/:id", () => {
  test("200 - success fetching dish detail", async () => {
    let response = await request(app).get("/dishes/1");

    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("name", "Gudeg Sehat");
    expect(response.body).toHaveProperty("CategoryId", 1);
    expect(response.body).toHaveProperty("videoUrl", "https://www.youtube.com/watch?v=Ofkv5fOqtOY");
    expect(response.body).toHaveProperty("description", "Gudeg sehat dengan bumbu yang sedikit. Namun hasilnya tetap tidak kalah dengan gudeg asli");
    expect(response.body.listIngredients).toBeInstanceOf(Array);
    expect(response.body.listTools).toBeInstanceOf(Array);
  });

  test("404 - dish data not found", async () => {
    let response = await request(app).get("/dishes/99");

    expect(response.statusCode).toBe(404);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "data with id 99 is not found");
  });

  test("404 - dish data not found", async () => {
    let response = await request(app).get("/dishes/99");

    expect(response.statusCode).toBe(404);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "data with id 99 is not found");
  });
});
