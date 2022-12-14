const router = require("express").Router();
const Controller = require("../controllers/userController");

// router.get("/", (req, res, next) => {
//   res.send("hello World ini user");
// });

router.post("/register", Controller.userRegister);

router.post("/login", Controller.userLogin);

router.get("/", Controller.allUser);
router.get("/:id", Controller.findUserById);
router.patch("/:id", Controller.editTokenUser);
// router.get("/", Controller.allUser);

module.exports = router;
