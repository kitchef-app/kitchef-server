async function errors(error, req, res, next) {
  // console.log(error, "INI DI ERROR HANDLER");
  let name = error.name;
  let code;
  let message;
  switch (name) {
    case "DATA_NOT_FOUND":
      code = 404;
      message = `${error.data} with id ${error.id} is not found`;
      break;
    default:
      code = 500;
      message = "Internal Server Error";
  }
  res.status(code).json({ message });
}

module.exports = errors;
