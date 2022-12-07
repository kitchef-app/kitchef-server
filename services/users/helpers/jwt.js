const jwt = require("jsonwebtoken");

const createToken = (payload) => jwt.sign(payload, process.env.SECRET);

module.exports = { createToken };
