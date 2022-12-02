const router = require("express").Router();
const Controller = require("../controllers/invoiceController");

// router.get("/", (req, res, next) => {
//   res.send("hello World ini invoices");
// });

router.post("/", Controller.addInvoice);

router.get("/:UserId", Controller.getInvoiceByUserId);

router.get("/driver/:DriverId", Controller.getInvoiceByDriverId);

router.post("/", Controller.addInvoice);

module.exports = router;
