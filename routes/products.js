const ProductController = require("../controllers/product");

const router = require("express").Router();

router.get("/", ProductController.readAllProduct);

module.exports = router;
