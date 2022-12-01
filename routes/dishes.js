const router = require("express").Router();
const Controller = require("../controllers/dishController");

// router.get("/", (req, res, next) => {
//   res.send("hello World ini dishes");
// });

router.get("/", Controller.getDish);

router.get("/:id", Controller.getDishDetail);

module.exports = router;
