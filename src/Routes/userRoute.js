const express = require("express");
const { createUser } = require("../Controllers/userControll");
const userRouter = express.Router();

userRouter.post("/", createUser);

module.exports = userRouter;
