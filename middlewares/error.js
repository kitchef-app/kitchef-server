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
    case "SequelizeForeignKeyConstraintError":
      code = 400;
      message = "Cannot get tags because of news doesnt exist";
      break;
    // bad_request_login
    case "SequelizeUniqueConstraintError":
      code = 400;
      message = error.errors[0].message;
      break;
    case "bad_request_login":
      code = 400;
      message = "input email and password required for login";
      break;
    case "DATA_NOT_FOUND":
      code = 404;
      message = `${error.data} with id ${error.id} is not found`;
      break;
    case "TAG_NOT_FOUND":
      code = 404;
      message = `${error.data} with id ${error.id} tags is not found`;
      break;
    case "invalid_credentials":
      code = 401;
      message = "Invalid username or password";
      break;
    case "TAG_FILL":
      code = 400;
      message = "please fill the tags form correctly";
      break;
    // JsonWebTokenError
    case "Unauthorized":
    case "JsonWebTokenError":
      code = 401;
      message = "Please Login Firsts";
      break;
    case "FORBIDDEN":
      code = 403;
      message = "User is not permitted to allow this access";
      break;
    case "AxiosError":
      code = 401;
      message = "Error in processing axios";
      break;
    default:
      code = 500;
      message = "Internal Server Error";
      break;
  }
  res.status(code).json({ message });
}

module.exports = errors;
