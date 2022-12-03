const router = require("express").Router();
const errors = require("../middlewares/error");
const invoiceRouter = require("./invoices");
const paymentRouter = require("./payment");

router.use("/invoices", invoiceRouter);
router.use("/payments", paymentRouter);

router.use(errors);

module.exports = router;
