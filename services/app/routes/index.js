const router = require("express").Router();
const errors = require("../middlewares/error");
const dishRouter = require("./dishes");
const categoryRouter = require("./categories");
const productRouter = require("./products");

router.use("/dishes", dishRouter);

router.use("/categories", categoryRouter);

router.use("/products", productRouter);
// router.use("/products", productRouter);

router.use(errors);

module.exports = router;
