const router = require("express").Router();
const Controller = require("../controllers/invoiceController");

// router.get("/", (req, res, next) => {
//   res.send("hello World ini invoices");
// });

router.post("/", Controller.addInvoice);
router.put("/statusPaid/:id", Controller.changeStatusInvoice);
router.put("/statusDeliveredComplete/:id", Controller.changeStatusInvoice);
router.put(
  "/statusDeliveredOngoing/:id",
  Controller.changeStatusDeliverOngoingInvoice
);

router.get("/:UserId", Controller.getInvoiceByUserId);

router.get("/driver/:DriverId", Controller.getInvoiceByDriverId);

module.exports = router;
