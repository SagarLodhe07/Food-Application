const AppError = require("./appError");

class UnauthorizedError extends AppError {
  constructor() {
    super(
      `User not authorized`,
      401
    );
  }
}

module.exports = UnauthorizedError;
