const router = require("express").Router();
const errors = require("../middlewares/error");
const userRouter = require("./users");
const driverRouter = require("./driver");
const logRouter = require('./logs')

router.use("/users", userRouter);

router.use("/drivers", driverRouter);

router.use("/logs", logRouter);

router.use(errors);

module.exports = router;
