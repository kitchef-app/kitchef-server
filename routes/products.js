const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.send("hello World ini products");
});

module.exports = router;
