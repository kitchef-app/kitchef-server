const router = require("express").Router();
const errors = require("../middlewares/error");
const userRouter = require("./users");

router.get("/", (req, res, next) => {
  res.send("hello world");
});

router.use("/users", userRouter);

router.use(errors);

module.exports = router;
