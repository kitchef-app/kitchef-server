const router = require("express").Router();
const Controller = require("../controllers/productController");

// router.get("/", (req, res, next) => {
//   res.send("hello World ini products");
// });

router.get("/", Controller.getProduct);

router.put("/stok/:id", Controller.editStock);

module.exports = router;
