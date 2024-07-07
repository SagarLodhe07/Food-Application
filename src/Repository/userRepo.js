const User = require("../Schema/schema");

async function findUser(parameters) {
  const response = await User.findOne({ ...parameters });
  return response;
}
async function createUser(userDetails) {
  const response = await User.create(userDetails);
  return response;
}

module.exports = {
  createUser,
  findUser, 
};
