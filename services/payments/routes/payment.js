const router = require("express").Router();
const Controller = require("../controllers/paymentController");

// router.get("/:UserId", Controller.getInvoiceByUserId);
router.post("/", Controller.payment);

module.exports = router;
