const router = require("express").Router();
const errors = require("../middlewares/error");
const userRouter = require("./users");
const dishRouter = require("./dishes");
const categoryRouter = require("./categories");
const invoiceRouter = require("./invoices");
const productRouter = require("./products");

router.get("/", (req, res, next) => {
  res.send("hello world");
});

router.use("/users", userRouter);

router.use("/dishes", dishRouter);

router.use("/categories", categoryRouter);

router.use("/invoices", invoiceRouter);

router.use("/products", productRouter);

router.use(errors);

module.exports = router;
