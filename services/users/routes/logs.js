const router = require("express").Router();
const Controller = require("../controllers/logsController");

router.post("/", Controller.createLog);

module.exports = router;
