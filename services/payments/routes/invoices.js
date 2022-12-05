const router = require("express").Router();
const Controller = require("../controllers/invoiceController");

// router.get("/", (req, res, next) => {
//   res.send("hello World ini invoices");
// });

router.post("/", Controller.addInvoice);
router.put("/statusPaid/:id", Controller.changeStatusInvoice);
router.put("/statusDeliveredComplete/:id", Controller.changeStatusDeliverInvoice);

router.get("/usersid/:id", Controller.getInvoiceById);

router.get("/users/:UserId", Controller.getInvoiceByUserId);

router.get("/drivers/:DriverId", Controller.getInvoiceByDriverId);

module.exports = router;
