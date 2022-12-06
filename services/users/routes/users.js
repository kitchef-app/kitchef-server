const router = require("express").Router();
const Controller = require("../controllers/userController");

// router.get("/", (req, res, next) => {
//   res.send("hello World ini user");
// });

router.post("/register", Controller.userRegister);

router.post("/login", Controller.userLogin);

router.get("/:id", Controller.findUserById);
router.get("/", Controller.allUser);

module.exports = router;
