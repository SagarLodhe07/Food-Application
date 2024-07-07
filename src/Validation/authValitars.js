const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = require("../Config/serverConfig");
const UnauthorizedError = require("../Utils/unAuthorizedError");
async function isLoggedin(req, res, next) {
  const token = req.cookies["authToken"];
  if (!token) {
    return res.status(404).json({
      message: "Not Auth Token Provied",
      error: "Not Authanticate",
      data: {},
      success: false,
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    if (!decoded) {
      throw new UnauthorizedError();
    }

    req.user = {
      email: decoded.email,
      id: decoded.id,
      role: decoded.role,
    };
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid token provided",
      error: error,
      data: {},
      success: false,
    });
  }
}
function isAdmin(req, res, next) {
  const loggedInUser = req.user;
  if (loggedInUser.role == "ADMIN") {
    next();
  } else {
    return res.status(401).json({
      success: false,
      message: "You are not authorized for this action",
      data: {},
      error: {
        reason: "Unauthorized for this action",
        statusCode: 401,
      },
    });
  }
}

module.exports = {
  isLoggedin,
  isAdmin,
};
