const router = require("express").Router();
const Controller = require("../controllers/categoryController");

// router.get("/", (req, res, next) => {
//   res.send("hello World ini category");
// });

router.get("/", Controller.getCategory);

module.exports = router;
