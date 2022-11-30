const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);

const hashPassword = (password) => bcrypt.hashSync(password, salt);
const comparedPassword = (password, hashedPassword) => bcrypt.compareSync(password, hashedPassword);

module.exports = { hashPassword, comparedPassword };
