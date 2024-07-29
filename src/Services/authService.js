const { findUser } = require("../Repository/userRepo");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY, JWT_EXPIRES } = require("../Config/serverConfig");

async function loginUser(authdetails) {
  const email = authdetails.email;
  const plainPassword = authdetails.password;

  const user = await findUser({ email });

  if (!user) {
    throw {
      message: "User Not Found with given email",
      statusCode: 404,
    };
  }
  const isvalidatePassword = await bcrypt.compare(plainPassword, user.password);
  console.log(isvalidatePassword);

  if (!isvalidatePassword) {
    throw {
      message: "Invalid Password, Please Try Again",
      statusCode: 401,
    };
  }
    const userRole = user.role ? user.role:"USER"
   const token = jwt.sign({ email: user.email, id: user._id,role:userRole },JWT_SECRET_KEY,{
    expiresIn:JWT_EXPIRES
  });
  return {token,userRole,userData:{
    email:user.email,
    firstName:user.firstName
  }}
}

module.exports = {
  loginUser,
};
