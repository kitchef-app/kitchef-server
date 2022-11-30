const router = require("express").Router();
const errors = require("../middlewares/error");

router.get("/", (req, res, next) => {
  // res.status(200).json("hello world");
  res.send("hello world");
});

router.use(errors);

module.exports = router;