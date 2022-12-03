const express = require("express");
const cors = require("cors");
// const port = process.env.PORT || 3005;
const app = express();
const router = require("./routes/index");

app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use("/", router);

module.exports = app;
