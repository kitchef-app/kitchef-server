const router = require("express").Router();
const Controller = require("../controllers/invoiceController");

// router.get("/", (req, res, next) => {
//   res.send("hello World ini invoices");
// });

router.post("/", Controller.addInvoice);

router.get("/:userId", Controller.getInvoiceByUserId);

router.get("/:driverId", Controller.getInvoiceByDriverId);

module.exports = router;
