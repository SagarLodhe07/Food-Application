const { createCart } = require("../Repository/cartRepository");
const { findUser, createUser } = require("../Repository/userRepo");

async function registerUser(userDetails) {
  // it wil create brand new user

  /**Check Email and Number from user  */
  const user = await findUser({
    email: userDetails.email,
    mobileNumber: userDetails.mobileNumber,
  });
  /**If User Found */
  if (user) {
    throw {
      reason: "User Already Exist With Given Email and Mobilenumber",
      statusCode: 400,
    };
  }

  /**If User not Found than create new user*/
  const newUser = await createUser({
    email: userDetails.email,
    mobileNumber: userDetails.mobileNumber,
    firstName: userDetails.firstName,
    lastName: userDetails.lastName,
    password: userDetails.password,
  });
  if (!newUser) {
    throw {
      reason: "Something went wrong Can not create user",
      statusCode: 500,
    };
  }

  await createCart(newUser._id)
  return newUser;
}

module.exports = {
  registerUser,
};
