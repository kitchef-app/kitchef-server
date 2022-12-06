async function errors(error, req, res, next) {
  // console.log(error, "INI DI ERROR HANDLER");
  let name = error.name;
  let code;
  let message;
  switch (name) {
    case "SequelizeValidationError":
      code = 400;
      message = error.errors[0].message;
      break;
    // bad_request_login
    case "AMOUNT_CANNOT_EMPTY":
      code = 400;
      message = "amount cannot 0";
      break;
    case "INVOICE_NOT_FOUND":
      code = 404;
      message = `INVOICE_NOT_FOUND`;
      break;
    case "USER_NOT_FOUND":
      code = 404;
      message = `USER_NOT_FOUND`;
      break;
    default:
      code = 500;
      message = "Internal Server Error";
  }
  res.status(code).json({ message });
}

module.exports = errors;
