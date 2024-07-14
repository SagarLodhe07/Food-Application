const User = require("../Schema/schema");
const BadRequest = require("../Utils/badRequest");
const InternalServer = require("../Utils/internalServer");

async function findUser(parameters) {
  try {
    const response = await User.findOne({ ...parameters });
    return response;
  } catch (error) {
    console.log(error);
  }
}
async function createUser(userDetails) {
  try {
    const response = await User.create(userDetails);
    return response;
  } catch (error) {
    if (error.name == "ValidationError") {
      const errorMessageList = Object.keys(error.errors).map((property) => {
        return error.errors[property].message;
      });

      console.log(errorMessageList);
      throw new BadRequest(errorMessageList);
    }
    console.log(error);
    throw new InternalServer();
  }
}

module.exports = {
  createUser,
  findUser,
};
