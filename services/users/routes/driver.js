const router = require("express").Router();
const Controller = require("../controllers/driverController");

// router.get("/", (req, res, next) => {
//   res.send("hello World ini user");
// });

router.post("/register", Controller.driverRegister);

router.post("/login", Controller.driverLogin);

router.get("/:id", Controller.findDriverById);

module.exports = router;
