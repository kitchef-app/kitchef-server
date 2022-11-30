const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.send("hello World ini category");
});

module.exports = router;
