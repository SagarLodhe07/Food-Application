const { loginUser } = require("../Services/authService");

async function logOut(req, res) {
  console.log('Cookie From FrontEnd',req.cookies  );
  res.cookie("authToken", "");
  return res.status(200).json({
    message: "Log Out Successfull",
    success: true,
    data: {},
    error: {},
  });
}

async function login(req, res) {
  try {
    const loginPayload = req.body;
    const response = await loginUser(loginPayload);
    res.cookie("authToken", response.token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      secure: false,
    });
    return res.status(200).json({
      success: true,
      message: "Successfully Login",
      data: { userRole: response.userRole, userData: response.userData },
      error: {},
    });
  } catch (error) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
      data: {},
      error: error,
    });
  }
}

module.exports = {
  login,
  logOut,
};
