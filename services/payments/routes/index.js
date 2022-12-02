const router = require("express").Router();
const errors = require("../middlewares/error");
const invoiceRouter = require("./invoices");
const paymentRouter = require("./payment");

router.get("/", (req, res, next) => {
  res.send("hello world");
});

router.use("/invoices", invoiceRouter);
router.use("/payment", paymentRouter);

router.use(errors);

module.exports = router;
