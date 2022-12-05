const router = require("express").Router();
const Controller = require("../controllers/logsController");

router.post("/", Controller.createLog);

router.get("/:UserId", Controller.getLogs);

module.exports = router;
