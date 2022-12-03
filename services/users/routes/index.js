const router = require("express").Router();
const errors = require("../middlewares/error");
const userRouter = require("./users");
const driverRouter = require("./driver");

router.use("/users", userRouter);

router.use("/drivers", driverRouter);

router.use(errors);

module.exports = router;
