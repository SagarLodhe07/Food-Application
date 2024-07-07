const AppError = require("./appError");

class InternalServer extends AppError {
  constructor() {
    super(`Something went wrong`,500);
  }
}

module.exports = InternalServer;
