const AppError = require("./appError");

class BadRequest extends AppError {
  constructor(invalidparams) {
    let message = "";
    invalidparams.forEach(params => message += `${params}\n`);
    console.log(message);
    super(`the request has the following ${invalidparams}`,400);
  }
}

module.exports = BadRequest;
