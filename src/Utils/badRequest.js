const AppError = require("./appError");

class BadRequest extends AppError {
  constructor(invalidparams) {
    let message = "";
    invalidparams.forEach((params) => (message += `${params}\n`));
    super(`the request has the following invalid params`,404);
  }
}

module.exports = BadRequest;
