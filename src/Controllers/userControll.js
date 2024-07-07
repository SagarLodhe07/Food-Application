const { registerUser } = require("../Services/userServices");

async function createUser(req, res) {
  console.log(`Created User Function called`);

  try {
    const response = await registerUser(req.body);
    return res.status(201).json({
      message: "Successfully register user",
      success: true,
      data: response,
      error: {},
    });
  } catch (error) {
    return res.status(error.statusCode).json({
      message: error.reason,
      success: false,   
      data: {},
      error: error,
    });
  }
}
module.exports = {
  createUser,
};
